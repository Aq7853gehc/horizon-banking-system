
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import MobileNav from "../../components/MobileNav";
// import { getLoggedInUser } from "../../lib/actions/user.action";
import { redirect, useRouter } from "next/navigation";
import { getLoggedInUser } from "../../lib/actions/user.action";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  console.log('Layout',loggedIn);
  
  if(!loggedIn) redirect('/sign-in')
  return (
    <main className="h-screen w-full flex font-inter">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image
            src={"/icons/logo.svg"}
            width={30}
            height={30}
            alt="menu icon"
          />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
