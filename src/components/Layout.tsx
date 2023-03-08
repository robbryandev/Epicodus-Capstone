import Nav from '@/components/Nav.server'
import * as Select from '@radix-ui/react-select';
import { RiPaintBrushFill, RiFilterFill } from 'react-icons/ri';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from "next-auth/react"
import Filters from './Filters';
import { signal } from '@preact/signals-react';

export const renderRoutes = ["/home", "/account", "/shows"]
export const showFilters = signal(false)
export default function Layout({ children }: any) {
  const {data: session, status: status} = useSession()
  const [theme, setTheme] = useState("dark")
  function handleTheme(value: string) {
    localStorage.setItem(`${session?.user.id}-theme`, value)
    setTheme(value)
  }
  const router = useRouter();

  const showContent = () => {
    return session != null
  }

  useEffect(() => {
    if (status != "loading") {
      if (session == null && renderRoutes.includes(router.asPath)) {
        router.push("/login")
      } else {
        const userTheme = localStorage.getItem(`${session?.user.id}-theme`)
        if (userTheme != null) {
          setTheme(userTheme)
        }
      }
    }
  }, [status, session, router])

  return (
      <div className={`app bg-background-main ${theme}`}>
        <Head>
          <title>Local Shows</title>
          <meta name="description" content="Welcome to your local show destination<"/>
        </Head>
        <div className={`settings bg-background-nav min-w-full ${renderRoutes.includes(router.asPath) ? "md:min-w-0" : ""} md:w-10 h-14 text-txt-main z-10 fixed top-0 pt-2 px-6 text-3xl`}>
          <Link href={showContent() ? "/home" : "/"} className='fixed top-1 left-3'>Local Shows</Link>
          {showContent() ? (
            <>
            {router.asPath === "/home" ? (
              <div className="fixed right-32 md:right-24 lg:right-40">
                  <button onClick={() => {
                    showFilters.value = (Number(showFilters.valueOf()) === 0)
                  }
                  }>
                    <RiFilterFill className="text-txt-main"/>
                  </button>
              </div>
            ) : null}
            {showFilters.valueOf() && router.asPath === "/home" ? (<Filters/>) : null}
            <Select.Root value={theme} onValueChange={handleTheme}>
                <Select.Trigger className='fixed no-select right-12 md:right-12 lg:right-20'>
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
            </>
          ) : null
        }
        </div>
        <main>{children}</main>
        {showContent() ? (<Nav/>) : null }
    </div>
  )
}