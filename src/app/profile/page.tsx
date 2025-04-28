import { Heart, List, User } from "lucide-react"
import LikeFavorite from "~/app/profile/_components/like-favorite"
import MyRank from "~/app/profile/_components/my-rank"
import Profile from "~/app/profile/_components/profile"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

const ProfilePage = () => {
  return (
    <div className={"mt-4 space-y-6 max-w-4xl mx-auto"}>
      <div className={"flex flex-row gap-5 items-center"}>
        <Avatar className={"rounded-full size-20 border border-primary"}>
          <AvatarImage src="https://storage.googleapis.com/repofi/airanker/avatar/1745853400956__202504232.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
            <Heart /> Likes & Favorites
          </TabsTrigger>
          <TabsTrigger className={"transition-all cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-background font-bold"} value="rank">
            <List /> My Rank
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className={"mt-6"}>
          <Profile />
        </TabsContent>
        <TabsContent value="like" className={"mt-6"}>
          <LikeFavorite />
        </TabsContent>
        <TabsContent value="rank" className={"mt-6"}>
          <MyRank />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ProfilePage
