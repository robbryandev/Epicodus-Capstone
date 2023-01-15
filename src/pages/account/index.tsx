import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from './index.module.sass'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={[inter.className].join(" ")}>
        <div className="body"></div>
    </main>
  )
}
