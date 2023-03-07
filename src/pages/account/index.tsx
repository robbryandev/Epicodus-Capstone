import { signOut } from "next-auth/react";

export default function Account() {
  return (
    <>
        <div className="account pt-20 ml-6">
          <button className="text-txt-main text-xl rounded-md bg-background-card py-1 px-2" onClick={() => signOut()}>Log Out</button>
        </div>
    </>
  )
}
