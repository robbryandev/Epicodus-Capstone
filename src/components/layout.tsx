import Nav from './nav'
import Head from "next/head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='root'>
      <div className="app-nav">
        <Nav/>
      </div>
      {children}
    </div>
  )
}
