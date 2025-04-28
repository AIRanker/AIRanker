"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, TrashIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { uploadFile } from "~/app/actions"
import PictureSelectPopover from "~/components/picture-select-popover"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"

import React from "react"
import AddDialog from "~/app/create/_components/add-dialog"
import RankSearch from "~/app/create/_components/rank-search"
import SoftwareItem from "~/app/create/_components/software-item"
import { TagsInput } from "~/components/extension/tags-input"
import { Input } from "~/components/ui/input"
import { MultiStepLoader } from "~/components/ui/multi-step-loader"
import { Separator } from "~/components/ui/separator"
import { Textarea } from "~/components/ui/textarea"
import { useCreateStepState } from "~/hooks/use-create"
import { UPLOAD_PATH_POST } from "~/lib/const"
import { cn } from "~/lib/utils"
import { type CreateRankParams, createRankParamsSchema } from "~/server/schema"

const CreateForm = () => {
  const form = useForm<CreateRankParams>({
    resolver: zodResolver(createRankParamsSchema, { async: true }),
    reValidateMode: "onBlur",
    defaultValues: {}
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    getValues
  } = form
  const [open, setOpen] = React.useState(true)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const { launchStepState, updateDescription, initStep, nextStep, errorStep, exitStep, finallyStep } = useCreateStepState()

  const submit = (data: CreateRankParams) => {
    initStep()
  }

  return (
    <Form {...form}>
      <MultiStepLoader
        loadingStates={[]}
        errorState={launchStepState.error}
        visible={launchStepState.showSteps}
        currentState={launchStepState.now}
        description={launchStepState.description}
        progressState={launchStepState.progress}
        onClose={exitStep}
        onFinish={() => {
          exitStep()
          // useUtils.dao.detail.invalidate()
        }}
      />
      <form onSubmit={handleSubmit(submit)} className={"pt-6 flex flex-col gap-12"}>
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Banner</div>
            <div className={"text-sm text-foreground/50"}>You can set base information</div>
          </div>
          <div className={"w-full max-w-2xl"}>
            <FormField
              control={control}
              name="image"
              render={({ field }) =>
                field.value ? (
                  <div className="flex gap-2">
                    <div
                      className="w-1/2 max-h-52 rounded-xl bg-gray-700 bg-cover bg-center bg-no-repeat shadow lg:w-4/5"
                      style={{
                        backgroundImage: `url(${field.value})`,
                        aspectRatio: "1 / 1"
                      }}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground"
                      onClick={() => {
                        field.onChange("")
                      }}
                    >
                      <TrashIcon className="text-primary mx-auto h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <PictureSelectPopover
                    onSelect={(url) => {
                      field.onChange(url)
                    }}
                    uploadPath={UPLOAD_PATH_POST}
                    onUpload={uploadFile}
                    side={"bottom"}
                  >
                    <button type={"button"} className={cn("flex h-36 cursor-pointer w-full flex-col items-center justify-center rounded-lg border border-dashed")}>
                      <ImagePlus className="text-primary h-14 w-14" />
                    </button>
                  </PictureSelectPopover>
                )
              }
            />
          </div>
        </div>
        <Separator />
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
                  <FormLabel>Rank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>A concise and descriptive title for this content block.</FormDescription>
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
                    <Textarea rows={5} placeholder="Enter Rank description" {...field} />
                  </FormControl>
                  <FormDescription>A concise and descriptive title for this content block.</FormDescription>
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
                  <FormDescription>Ranker tag</FormDescription>
                  <FormMessage>{errors.tags?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Rank list</div>
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
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Actions</div>
            <div className={"text-sm text-foreground/50"}>You can set base information</div>
          </div>
          <div className={"flex flex-row"}>
            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default CreateForm
