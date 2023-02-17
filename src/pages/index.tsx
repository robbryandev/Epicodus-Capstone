import { Inter } from '@next/font/google'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const loremText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est corporis, vero delectus provident id quam ipsam quis obcaecati eius, eveniet possimus veritatis eligendi enim natus laborum? Provident, quibusdam nulla!"
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
      if (session) {
          router.push("/home")
      }
  })
  return (
    <>
        <div className="homePage m-0 mt-14 ml-6 p-0 text-txt-main">
          <p className='text-2xl mb-2 pt-2'>Welcome to your local show destination</p>
          <p className='mb-4'>{loremText}</p>
          <Link href={session ? "/home" : "/login"} className='bg-background-card p-2 rounded-md'>See shows</Link>
        </div>
    </>
  )
}
