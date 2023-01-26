import Nav from "./nav.server"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='root bg-slate-200 w-screen h-screen'>
      <div className="app-nav">
        <Nav/>
      </div>
      {children}
    </div>
  )
}
