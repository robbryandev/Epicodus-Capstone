import { Inter } from '@next/font/google'
import Card from '@/components/Card.server'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const loremText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est corporis, vero delectus provident id quam ipsam quis obcaecati eius, eveniet possimus veritatis eligendi enim natus laborum? Provident, quibusdam nulla!"
  return (
    <>
        <div className="homePage m-0 mt-12 p-0">
          <div className='flex flex-wrap gap-1 w-82 m-auto pb-12'>
            <Card img='/favicon.ico' artist='super super long test string' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
            <Card img='/favicon.ico' artist='test' description={loremText} href="/shows"/>
          </div>
        </div>
    </>
  )
}
