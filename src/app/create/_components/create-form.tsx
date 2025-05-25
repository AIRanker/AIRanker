"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"

import { useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"
import AddDialog from "~/app/create/_components/add-dialog"
import RankSearch from "~/app/create/_components/rank-search"
import SoftwareItem from "~/app/create/_components/software-item"
import { TagsInput } from "~/components/extension/tags-input"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { Textarea } from "~/components/ui/textarea"
import { type CreateRankParams, createRankParamsSchema } from "~/server/schema"
import type { RankDetailsResult } from "~/server/services/rank"
import { api } from "~/trpc/react"

const CreateForm = ({ detail }: { detail?: RankDetailsResult }) => {
  const router = useRouter()
  const form = useForm<CreateRankParams>({
    resolver: zodResolver(createRankParamsSchema, { async: true }),
    reValidateMode: "onBlur",
    defaultValues: {
      name: detail?.name,
      description: detail?.description ?? "",
      tags: detail?.tags ?? [],
      softwareList: detail?.softwares.map((item) => ({
        softwareId: item.software.id,
        name: item.software.name ?? "",
        description: item.software.description ?? "",
        image: item.software.image ?? "",
        url: item.software.url ?? "",
        rankDescription: item.description ?? "",
        rankIndex: item.rankIndex ?? 0
      }))
    }
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    getValues
  } = form
  const { mutate, isPending } = api.rank.create.useMutation({
    onSuccess: async (data) => {
      if (data) {
        toast.success("Create success!")
        reset()
        router.push(`/rank/${data.id}`)
      } else {
        toast.error("Create failed!")
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error(`Failed to create message! ${error.message}`)
    }
  })
  const { mutate: updateMutate, isPending: updatePending } = api.rank.update.useMutation({
    onSuccess: async (data) => {
      if (data) {
        toast.success("Update success!")
        reset()
        router.push(`/rank/${data.id}`)
      } else {
        toast.error("Create failed!")
      }
    },
    onError: (error) => {
      console.error(error)
      toast.error(`Failed to create message! ${error.message}`)
    }
  })
  const submit = (data: CreateRankParams) => {
    if (detail) {
      updateMutate({
        rankId: detail.id,
        forms: data
      })
    } else {
      mutate({ forms: data })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className={"pt-6 flex flex-col gap-12"}>
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Information</div>
            <div className={"text-sm text-foreground/50"}>You can set base information</div>
          </div>
          <div className={"flex flex-col gap-4 w-full max-w-2xl"}>
            <FormField
              name={"name"}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collection Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Enter a clear and descriptive name for your collection.</FormDescription>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name={"description"}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Enter Collection" {...field} />
                  </FormControl>
                  <FormDescription>Provide a detailed explanation of your collection criteria and methodology.</FormDescription>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name={"tags"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput value={field.value ?? []} onValueChange={field.onChange} placeholder="Enter your tag" />
                  </FormControl>
                  <FormDescription>Add relevant tags to help users discover your collection.</FormDescription>
                  <FormMessage>{errors.tags?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Collection Content</div>
            <div className={"text-sm text-foreground/50"}>You can set base information</div>
            <FormMessage>{errors.softwareList?.message}</FormMessage>
          </div>
          <div className={"flex flex-col gap-4 w-full max-w-2xl"}>
            <FormField
              name={"softwareList"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Search exist software of{" "}
                    <AddDialog
                      onSubmit={(data) => {
                        const list: CreateRankParams["softwareList"] = field.value ?? []
                        list.push(data)
                        field.onChange(list)
                      }}
                    />
                  </FormLabel>
                  <FormControl>
                    <div className={"flex flex-col gap-6"}>
                      <RankSearch
                        onAdd={(item) => {
                          const list: CreateRankParams["softwareList"] = field.value ?? []
                          const data: CreateRankParams["softwareList"][number] = {
                            softwareId: item.id,
                            description: item.description ?? "",
                            name: item.name ?? "",
                            image: item.image ?? "",
                            url: item.url ?? "",
                            rankDescription: "",
                            rankIndex: 0
                          }
                          const find = list.find((s) => s.softwareId === data.softwareId)
                          if (!find) {
                            list.push(data)
                            field.onChange(list)
                          }
                        }}
                      />
                      {(field.value ?? []).map((item: CreateRankParams["softwareList"][number]) => (
                        <SoftwareItem
                          data={item}
                          key={`item-${item.softwareId}-${item.name}`}
                          onDelete={() => {
                            const list = [...(field.value ?? [])]
                            const index = list.findIndex((s) => s.softwareId === item.softwareId || (s.name === item.name && !s.softwareId))
                            if (index !== -1) {
                              list.splice(index, 1)
                              field.onChange(list)
                            }
                          }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>Search for existing tools or add new ones to include in your collection.</FormDescription>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Actions</div>
          </div>
          <div className={"flex flex-row"}>
            <Button type="submit" disabled={isPending || updatePending}>
              {updatePending || isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateForm
