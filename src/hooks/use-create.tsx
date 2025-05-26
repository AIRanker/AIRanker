import { readContract, simulateContract, waitForTransactionReceipt, writeContract } from "@wagmi/core"
import { useCallback, useState } from "react"
import { decodeEventLog, erc20Abi, formatUnits, getAddress, parseEther } from "viem"
import { useAccount, useConfig } from "wagmi"
import { env } from "~/env"
import rankManagerAbi from "~/lib/abi/RankManager.json"
import { defaultChain } from "~/lib/web3"
import type { CreateRankParams } from "~/server/schema"
import { api } from "~/trpc/react"

export function useCreateStepState() {
  const [launchStepState, setLaunchStepState] = useState({
    showSteps: false,
    now: 0,
    progress: -1,
    error: -1,
    description: undefined as string | boolean | undefined
  })
  const exitStep = useCallback(() => {
    setLaunchStepState((prevState) => ({
      ...prevState,
      showSteps: false
    }))
  }, [])
  const errorStep = useCallback(() => {
    setLaunchStepState((prevState) => ({
      ...prevState,
      error: prevState.now,
      progress: -1
    }))
  }, [])

  const updateDescription = useCallback((description: string | boolean) => {
    setLaunchStepState((prevState) => ({
      ...prevState,
      description
    }))
  }, [])

  const initStep = useCallback(() => {
    setLaunchStepState({
      showSteps: true,
      now: 0,
      progress: 0,
      error: -1,
      description: false
    })
  }, [])

  const nextStep = useCallback(() => {
    setLaunchStepState((prevState) => ({
      ...prevState,
      now: prevState.now + 1,
      progress: prevState.now + 1
    }))
  }, [])

  const finallyStep = useCallback(() => {
    setLaunchStepState((prevState) => ({
      ...prevState,
      progress: -1
    }))
  }, [])

  return {
    launchStepState,
    exitStep,
    updateDescription,
    initStep,
    nextStep,
    errorStep,
    finallyStep
  }
}

export function useApprovedTransaction({
  onApproveMessage,
  onApproveError,
  targetContractAddress = env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS,
  targetTokenAddress = env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS
}: {
  onApproveMessage: (message: string) => void
  onApproveError?: (error: Error) => void
  targetContractAddress?: `0x${string}`
  targetTokenAddress?: `0x${string}`
}) {
  const { address } = useAccount()
  const config = useConfig()
  const execute = useCallback(async <T,>(): Promise<T | undefined> => {
    if (!address) {
      onApproveError?.(new Error("Wallet not connected."))
      return
    }

    try {
      // 从 LeaderboardManager 合约中读取 createFee
      const createFee = (await readContract(config, {
        abi: rankManagerAbi,
        address: targetContractAddress,
        chainId: defaultChain.id,
        functionName: "createFee",
        args: []
      })) as bigint

      console.log(`Reading createFee from LeaderboardManager: ${createFee}`)

      const allowance = await readContract(config, {
        abi: erc20Abi,
        address: targetTokenAddress,
        chainId: defaultChain.id,
        functionName: "allowance",
        args: [address, targetContractAddress]
      })

      console.log(`token: ${targetTokenAddress}, allowance: ${allowance}, required: ${createFee}`)

      if (allowance >= createFee || createFee === 0n) {
        return
      }

      const { request, result } = await simulateContract(config, {
        abi: erc20Abi,
        address: targetTokenAddress,
        functionName: "approve",
        args: [targetContractAddress, createFee],
        account: address
      })

      if (!result) {
        onApproveError?.(new Error("Fail to approve spending cap."))
        return
      }

      onApproveMessage("Approval of spending cap in progress...")
      const hash = await writeContract(config, request)
      onApproveMessage("Waiting for approval transaction receipt...")
      await waitForTransactionReceipt(config, { hash })

      // 递归调用确保授权足够
      return execute()
    } catch (error) {
      if (error instanceof Error && "shortMessage" in error) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onApproveError?.(new Error((error as any).shortMessage))
      } else {
        onApproveError?.(new Error("Failed to approve spending cap", { cause: error }))
      }
      return
    }
  }, [address, config, targetContractAddress, targetTokenAddress, onApproveMessage, onApproveError])
  return {
    execute
  }
}

export function useCreateTransaction({
  onCreateMessage,
  onCreateError,
  targetContractAddress = env.NEXT_PUBLIC_MANAGER_CONTRACT_ADDRESS
}: {
  onCreateMessage: (message: string) => void
  onCreateError?: (error: Error) => void
  targetContractAddress?: `0x${string}`
}) {
  const { address } = useAccount()
  const config = useConfig()
  const execute = useCallback(async (): Promise<bigint | undefined> => {
    if (!address) {
      onCreateError?.(new Error("Wallet not connected."))
      return
    }

    try {
      // 调用 LeaderboardManager 合约的 createLeaderboard 方法
      const { request } = await simulateContract(config, {
        abi: rankManagerAbi,
        address: targetContractAddress,
        functionName: "createLeaderboard",
        args: [], // 没有参数
        account: address
      })

      onCreateMessage("Creating Rank on chain...")
      const hash = await writeContract(config, request)
      onCreateMessage("Waiting for transaction confirmation...")
      const receipt = await waitForTransactionReceipt(config, {
        hash
      })

      // 从交易日志中解析出leaderboardId
      const logs = receipt.logs
      const item = logs.find((log) => getAddress(log.address) === targetContractAddress)
      if (!item) {
        onCreateError?.(new Error("Failed to find rank creation event."))
        return
      }

      // 解析事件日志
      const { args } = decodeEventLog({
        ...item,
        abi: rankManagerAbi
      })

      console.log("Decoded event args:", args)

      // 假设 LeaderboardCreated 事件有 leaderboardId 和 owner 参数
      const { id: metadataId, creator } = args as unknown as {
        creator: `0x${string}`
        id: bigint
      }
      console.log("Parsed metadataId:", metadataId, "creator:", creator)
      if (!metadataId || !creator) {
        onCreateError?.(new Error("Failed to parse leaderboard creation event."))
        return
      }

      // 验证创建者是当前用户
      if (getAddress(creator) !== getAddress(address)) {
        onCreateError?.(new Error("Creator address mismatch."))
        return
      }

      return metadataId
    } catch (error) {
      if (error instanceof Error && "shortMessage" in error) {
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        onCreateError?.(new Error((error as any).shortMessage))
      } else {
        onCreateError?.(new Error("Leaderboard creation failed.", { cause: error }))
      }
      return
    }
  }, [address, config, targetContractAddress, onCreateMessage, onCreateError])

  return {
    execute
  }
}

export function useDataPersistence({
  onPersistenceMessage,
  onPersistenceError
}: {
  onPersistenceMessage: (message: string) => void
  onPersistenceError?: (error: Error) => void
}) {
  const { mutateAsync: createMutate } = api.rank.create.useMutation()
  const execute = useCallback(
    async (params: CreateRankParams, metadataId: string) => {
      try {
        onPersistenceMessage("Persisting Rank...")
        if (metadataId === undefined) {
          onPersistenceError?.(new Error("MetadataId is undefined."))
          return
        }
        return await createMutate({ forms: params })
      } catch (error) {
        if (error instanceof Error && "shortMessage" in error) {
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          onPersistenceError?.(new Error((error as any).shortMessage))
        } else {
          onPersistenceError?.(new Error("Failed to persist Rank data.", { cause: error }))
        }
      }
    },
    [createMutate, onPersistenceMessage, onPersistenceError]
  )
  return {
    execute
  }
}
