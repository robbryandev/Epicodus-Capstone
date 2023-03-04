import Nav from '@/components/Nav.server'
import * as Select from '@radix-ui/react-select';
import { RiPaintBrushFill } from 'react-icons/ri';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from "next-auth/react"

export const renderRoutes = ["/home", "/account", "/shows"]
export default function Layout({ children }: any) {
  const [theme, setTheme] = useState("dark");
  const {data: session} = useSession()
  const router = useRouter();
  useEffect(() => {
    localStorage.clear()
  }, [])

  const showLogin = () => {
    if (typeof session == "undefined" && renderRoutes.includes(router.asPath)) {
      return true
    } else {
      return false
    }
  }

  const showContent = () => {
    return session && renderRoutes.includes(router.asPath)
  }

  useEffect(() => {
    if (showLogin()) {
      router.push("/login")
    }
  })

  return (
    <>
        <div className={`app bg-background-main ${theme}`}>
        <Head>
          <title>Local Shows</title>
          <meta name="description" content="Welcome to your local show destination<"/>
        </Head>
        <div className={`settings bg-background-nav min-w-full ${renderRoutes.includes(router.asPath) ? "md:min-w-0" : ""} md:w-10 h-14 text-txt-main z-10 fixed top-0 pt-2 px-6 text-3xl`}>
          <Link href={showContent() ? "/home" : "/"} className='fixed top-1 left-3'>Local Shows</Link>
          {showContent() ? (
            <Select.Root value={theme} onValueChange={setTheme}>
                <Select.Trigger className='fixed no-select right-12 md:right-20'>
                    <Select.Value aria-label="dialog">
                      <RiPaintBrushFill name='theme_button'/>
                    </Select.Value>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className='mt-7 no-select p-2 rounded-md'>
                        <Select.Viewport>
                            <Select.Item value='dark' className='bg-zinc-700 text-white p-2' defaultChecked>
                                <Select.ItemText>Dark</Select.ItemText>
                                <Select.ItemIndicator />
                            </Select.Item>
                            <Select.Item value='light' className='bg-stone-300 text-black p-2'>
                                <Select.ItemText>Light</Select.ItemText>
                                <Select.ItemIndicator />
                            </Select.Item>
                            <Select.Item value='midnight' className='bg-stone-800 text-violet-700 p-2'>
                                <Select.ItemText>Midnight</Select.ItemText>
                                <Select.ItemIndicator />
                            </Select.Item>
                        </Select.Viewport>
                        <Select.Arrow />
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
          ) : null
        }
        </div>
        <main>{children}</main>
        {showContent() ? (<Nav/>) : null }
      </div>
    </>
  )
}