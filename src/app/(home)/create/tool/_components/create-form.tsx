"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, TrashIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useEffect, useMemo, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import CreatableSelect from "react-select/creatable"
import { toast } from "sonner"
import { uploadFile } from "~/app/(home)/actions"
import PictureSelectPopover from "~/components/picture-select-popover"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Separator } from "~/components/ui/separator"
import { Textarea } from "~/components/ui/textarea"
import { UPLOAD_PATH_POST } from "~/lib/const"
import { cn } from "~/lib/utils"
import { type SoftwareParams, softwareParamsSchema } from "~/server/schema"
import type { SoftwareCategoryResult } from "~/server/services/software-category"
import { api } from "~/trpc/react"

interface CreateFormProps {
  categoryList: SoftwareCategoryResult
}

const CreateForm = ({ categoryList }: CreateFormProps) => {
  const router = useRouter()
  const form = useForm<SoftwareParams>({
    resolver: zodResolver(softwareParamsSchema, { async: true }),
    reValidateMode: "onBlur",
    defaultValues: {}
  })
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = form
  const [tagSearch, setTagSearch] = useState("")
  const { data: tagList, isPending: tagLoading } = api.tag.pageTags.useQuery({
    search: tagSearch,
    pageable: {
      page: 0,
      size: 10
    }
  })
  const tagOptions = useMemo(() => {
    if (tagList && (tagList?.list?.length ?? 0) >= 0) {
      return tagList.list.map((item) => ({
        value: item.id,
        label: item.name
      }))
    }
    return []
  }, [tagList])
  const { mutate: createMutate, isPending } = api.software.create.useMutation({
    onSuccess: (tool) => {
      router.push(`/tool/${tool.id}`)
    },
    onError: () => {
      toast.error("Failed to create the tool", { duration: 3000 })
    }
  })
  const submit = async (data: SoftwareParams) => createMutate(data)
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
                  <FormDescription>Enter the name of your tool. Keep it concise and descriptive.</FormDescription>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              name={"categoryId"}
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryList.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Select the category that best describes your tool's functionality.</FormDescription>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="tags"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <CreatableSelect<{ value: string; label: string }, true>
                      inputValue={tagSearch}
                      onInputChange={(v) => setTagSearch(v)}
                      defaultValue={[]}
                      isMulti={true}
                      name="tags"
                      options={tagOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      isLoading={tagLoading}
                      onChange={(selectedOptions) => {
                        field.onChange(selectedOptions?.map((option) => option.value) || [])
                      }}
                      getNewOptionData={(inputValue) => {
                        return { value: inputValue, label: `Create "${inputValue}"` }
                      }}
                    />
                  </FormControl>
                  <FormDescription>Add relevant tags to help users discover your tool. You can create new tags if needed.</FormDescription>
                  <FormMessage />
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
                  <FormDescription>Enter the official website or landing page URL for your tool.</FormDescription>
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
                    <Textarea rows={5} placeholder="Enter tool description" {...field} />
                  </FormControl>
                  <FormDescription>Provide a detailed description of your tool, including its key features and benefits.</FormDescription>
                  <FormMessage>{errors.description?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className={"flex flex-row"}>
          <div className={"flex flex-col w-80"}>
            <div className={"text-xl font-bold"}>Actions</div>
            <div className={"text-sm text-destructive mt-4 font-bold"}>*Once submit, it cannot be modified or deleted</div>
          </div>
          <div className={"flex flex-col"}>
            <div className={"flex flex-row"}>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}
export default CreateForm
