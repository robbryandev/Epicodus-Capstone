import { Inter } from '@next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const loremText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est corporis, vero delectus provident id quam ipsam quis obcaecati eius, eveniet possimus veritatis eligendi enim natus laborum? Provident, quibusdam nulla!"
  return (
    <>
        <div className="homePage m-0 mt-14 ml-6 p-0 text-txt-main">
          <p className='text-2xl mb-2 pt-2'>Welcome to your local show destination</p>
          <p className='mb-4'>{loremText}</p>
          <Link href="/home" className='bg-background-card p-2 rounded-md'>See shows</Link>
        </div>
    </>
  )
}
