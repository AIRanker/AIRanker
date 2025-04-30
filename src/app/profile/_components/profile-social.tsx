"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { SiGithub, SiInstagram, SiTelegram, SiX } from "@icons-pack/react-simple-icons"
import { Home, Loader } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { type CreateRankParams, type UpdateUserParams, updateUserParamsSchema } from "~/server/schema"
import type { UserWithPlatforms } from "~/server/services/user"
import { api } from "~/trpc/react"

interface ProfileDetailProps {
  data: UserWithPlatforms
}

const ProfileSocial = ({ data }: ProfileDetailProps) => {
  const form = useForm<z.infer<typeof updateUserParamsSchema>>({
    resolver: zodResolver(updateUserParamsSchema, { async: true }),
    reValidateMode: "onBlur",
    defaultValues: {
      name: data.name ?? "",
      description: data.description ?? "",
      email: data.email ?? "",
      github: data.github ?? "",
      instagram: data.instagram ?? "",
      telegram: data.telegram ?? "",
      website: data.website ?? "",
      x: data.x ?? "",
      avatar: data.avatar ?? ""
    }
  })
  const {
    handleSubmit,
    formState: { errors }
  } = form
  const useUtils = api.useUtils()
  const { mutate, isPending } = api.user.updateMe.useMutation({
    onSuccess: () => {
      void useUtils.user.me.refetch()
    }
  })

  const onSubmit = (data: UpdateUserParams) => {
    mutate(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Social Links</CardTitle>
          </CardHeader>
          <CardContent className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>
                    <Home size={16} /> Website
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourwebsite.com" {...field} />
                  </FormControl>
                  <FormDescription>Your personal or business website.</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <SiGithub size={16} />
                    GitHub
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="x"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <SiX size={16} />X / Twitter
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <SiInstagram size={16} />
                    Instagram
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telegram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <SiTelegram size={16} />
                    Telegram
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://t.me/username" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button disabled={isPending} className="bg-primary text-primary-foreground">
              {isPending ? (
                <>
                  <Loader className="size-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default ProfileSocial
