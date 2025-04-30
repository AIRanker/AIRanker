"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
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

const ProfileDetail = ({ data }: ProfileDetailProps) => {
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
            <CardTitle className="text-primary">Profile Details</CardTitle>
          </CardHeader>
          <CardContent className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="You Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage>{errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>Your contact email address.</FormDescription>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Tell us about yourself" {...field} />
                  </FormControl>
                  <FormDescription>Brief description about yourself (max 500 characters).</FormDescription>
                  <FormMessage>{errors.description?.message}</FormMessage>
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

export default ProfileDetail
