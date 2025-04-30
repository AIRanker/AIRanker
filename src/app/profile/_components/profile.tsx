"use client"
import { StarIcon, Wallet2 } from "lucide-react"
import ProfileDetail from "~/app/profile/_components/profile-detail"
import ProfileSocial from "~/app/profile/_components/profile-social"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { api } from "~/trpc/react"

const Profile = () => {
  const { data } = api.user.me.useQuery()

  return (
    <div className="space-y-10">
      {data && <ProfileDetail data={data} />}
      {data && <ProfileSocial data={data} />}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <Wallet2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-primary font-medium">Web3 Wallet</p>
                <p className="text-muted-foreground">{data?.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
