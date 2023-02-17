import { signOut } from "next-auth/react";

export default function Account() {
  return (
    <>
        <div className="account pt-20">
          <button onClick={() => signOut()}>Log Out</button>
        </div>
    </>
  )
}
