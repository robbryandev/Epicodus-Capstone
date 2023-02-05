import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Nav from '@/components/Nav.server'
import * as Select from '@radix-ui/react-select';
import { RiPaintBrushFill } from 'react-icons/ri';
import React, { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark")
  return (
    <div className={`app bg-background-main ${theme}`}>
      <div className="settings bg-background-nav settings w-screen md:w-10 h-12 text-txt-main z-10 fixed top-0 pt-2 px-6 text-3xl">
        <h3 className='fixed top-1 left-3'>Local Shows</h3>
        <Select.Root value={theme} onValueChange={setTheme}>
            <Select.Trigger className='fixed no-select right-12 md:right-20'>
                <Select.Value aria-label="theme">
                  <RiPaintBrushFill/>
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
                    </Select.Viewport>
                    <Select.Arrow />
                </Select.Content>
            </Select.Portal>
        </Select.Root>
      </div>
      <Component {...pageProps} />
      <Nav/>
    </div>
  )
}
