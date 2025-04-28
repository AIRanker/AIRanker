"use client"
import { StarIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

const Profile = () => {
  return (
    <div className="space-y-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Profile Details</CardTitle>
        </CardHeader>
        <CardContent className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-primary">
              First name
            </Label>
            <Input id="firstName" defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-primary">
              Last name
            </Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-primary">
              Email
            </Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-primary">
              Role
            </Label>
            <Input id="role" defaultValue="Product Designer" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-primary text-primary-foreground">Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Connected Accounts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <StarIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-primary font-medium">Wallet</p>
                <p className="text-muted-foreground">0x00000000000000000000000000</p>
              </div>
            </div>
            <Button variant="outline">Disconnect</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile
