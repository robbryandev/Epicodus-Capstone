import Link from 'next/link'
import styles from './index.module.css'
import Card from '@/components/card.server'

export default function Home() {
  const loremText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est corporis, vero delectus provident id quam ipsam quis obcaecati eius, eveniet possimus veritatis eligendi enim natus laborum? Provident, quibusdam nulla!"
  return (
    <main className={""}>
        <div className="homePage m-0 p-0">
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 w-82 m-auto'>
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
    </main>
  )
}
