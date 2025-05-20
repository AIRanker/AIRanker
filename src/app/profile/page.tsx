import { Heart, List, User } from "lucide-react"
import LikeStar from "~/app/profile/_components/like-star"
import MyRank from "~/app/profile/_components/my-rank"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { api } from "~/trpc/server"

const ProfilePage = async () => {
  const user = await api.user.me()
  await api.user.me.prefetch()
  return (
    <div className={"mt-4 space-y-6 max-w-4xl mx-auto"}>
      <div className={"flex flex-row gap-5 items-center"}>
        {/*<Avatar className={"rounded-full size-20 border border-primary"}>*/}
        {/*<AvatarImage src={user?.avatar ?? "https://storage.googleapis.com/repofi-prod/launchpad/avatar/1745410111571_airanker.svg"} />*/}
        {/*<AvatarFallback>{user?.name}</AvatarFallback>*/}
        {/*</Avatar>*/}
        <div className={"flex flex-col gap-2"}>
          <div className={"text-2xl font-semibold"}>Account Settings</div>
          <div className={"text-muted-foreground text-sm"}>Manage your account settings and preferences</div>
        </div>
      </div>
      <Tabs defaultValue="profile">
        <TabsList className={"bg-background w-full"}>
          <TabsTrigger className={"transition-all cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background font-bold"} value="profile">
            <User /> Profile
          </TabsTrigger>
          <TabsTrigger className={"transition-all cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background font-bold"} value="like">
            <Heart /> Likes & Stars
          </TabsTrigger>
          <TabsTrigger className={"transition-all cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background font-bold"} value="rank">
            <List /> My Rank
          </TabsTrigger>
        </TabsList>
        <TabsContent value="like" className={"mt-6"}>
          <LikeStar />
        </TabsContent>
        <TabsContent value="rank" className={"mt-6"}>
          <MyRank />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage
