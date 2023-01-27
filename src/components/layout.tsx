import Nav from "./nav.server"
import Head from "next/head"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>Local show finder</title>
        <meta name="description" content="Find local shows from artists you'll love"/>
      </Head>
      <div className='root bg-zinc-700 w-screen h-screen overflow-scroll pb-16 pt-10 md:pt-14'>
        {children}
        <div className="app-nav">
          <Nav/>
        </div>
      </div>
    </>
  )
}
