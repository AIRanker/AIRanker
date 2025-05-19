"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { uploadFile } from "~/app/actions"
import PictureSelectPopover from "~/components/picture-select-popover"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { Textarea } from "~/components/ui/textarea"
import { UPLOAD_PATH_POST } from "~/lib/const"
import { cn } from "~/lib/utils"
import { type SoftwareParams, softwareParamsSchema } from "~/server/schema"

const CreateForm = () => {
  const router = useRouter()
  const form = useForm<SoftwareParams>({
    resolver: zodResolver(softwareParamsSchema, { async: true }),
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
  const submit = async (data: SoftwareParams) => {}
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submit)} className={"pt-6 flex flex-col gap-12"}>
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Logo</div>
            <div className={"text-sm text-foreground/50"}>Upload logo icon</div>
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
                  <FormLabel>Tool Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>Tool</FormDescription>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name={"url"}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
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
                  <FormDescription>Description</FormDescription>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
export default CreateForm
