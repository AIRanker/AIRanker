
import { HydrateClient } from "~/trpc/server"
import WalletButton from "~/components/auth/wallet-button";
import {Button} from "~/components/ui/button";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
            INIT app
          </h1>
          <WalletButton variant={"default"}/>
          <Button variant={"outline"}>test</Button>
        </div>
      </main>
    </HydrateClient>
  )
}
