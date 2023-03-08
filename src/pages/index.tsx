import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const description = `
    your one-stop destination for discovering and tracking local concert shows near you. Whether youre a music lover looking for the latest indie rock sensation, a fan of classical music searching for a local symphony, or a lover of live performances in general, we've got you covered.

    With Local Shows, you'll never miss out on your favorite bands or performers again. Our easy-to-use platform allows you to search for upcoming shows in your area, filter by genre or date, and bookmark events you're interested in attending.

    Don't settle for missing out on the hottest shows in your area. Join Local Shows today, and never let a good concert slip through your fingers again.
  `
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
      if (session) {
          router.push("/home")
      }
  })
  return (
    <>
        <div className="homePage m-0 mt-14 ml-6 p-0 text-txt-main text-center">
          <p className='text-2xl mb-2 pt-2'>Welcome to local shows</p>
          <p className='mb-4 w-4/5 md:w-72 m-auto'>{description}</p>
          <Link href={session ? "/home" : "/login"} className='bg-background-card p-2 rounded-md'>See shows</Link>
        </div>
    </>
  )
}
