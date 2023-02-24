import { Inter } from '@next/font/google'
import Card from '@/components/Card.server'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import * as geohash from "ngeohash"
import { env } from '@/env.mjs'
import {v4} from "uuid"
import { getShows, type Show } from '@/utils/shows'

const inter = Inter({ subsets: ['latin'] })

export type UserLocation = {
  lat: number,
  long: number,
  hash: string
}

export default function Home() {
  const [position, setPosition] = useState({} as UserLocation)
  const [hasPosition, setHasPosition] = useState(false)
  const [shows, setShows] = useState([] as Show[])
  const [hasShows, setHasShows] = useState(false)
  const {data: session} = useSession()

  function handlePosition(res: GeolocationPosition) {
    setPosition({lat: res.coords.latitude, long: res.coords.longitude,
       hash: geohash.encode(res.coords.latitude, res.coords.longitude, 4)})
    setHasPosition(true)
  }
  function handlePositionErr(err: any) {
    console.log("Error: " + err)
    setHasPosition(false)
  }
  function promptLocation() {
    navigator.geolocation.getCurrentPosition(handlePosition, handlePositionErr)
  }

  useEffect(() => {
    if (session) {
      console.log(session)
      promptLocation()
    }
  }, [session])
  useEffect(() => {
    if (session) {
      getShows(position, setShows, setHasShows)
    }
  }, [hasPosition])

  return (
    <>
        <div className="homePage m-0 pt-16 p-0">
          {
            hasPosition ? (
              hasShows ? (
                <>                
                  <div className='flex flex-wrap gap-1 w-82 m-auto pb-2'>
                    {
                      shows.map((show) => {
                        return <Card key={v4()} img={show.img} artist={show.artist} date={show.date} href={show.href}/>
                      })
                    }
                  </div>
                  <p className='text-2xl p-6 text-txt-main text-center pb-20'>Sorry... There&lsquo;s no more shows :(</p>
                </>
              ) : (
                <div className='text-center text-txt-main pt-12'>
                  <p className='text-2xl p-6'>Sorry... There&lsquo;s no shows :(</p>
                  <button className='p-1.5 bg-background-card rounded-md' onClick={() => getShows(position, setShows, setHasShows)}>Look again</button>
                </div>                
              )
            ) : (
              <div className='text-center text-txt-main pt-12'>
                <p className='text-2xl p-6'>Local Shows needs your location to get shows near you</p>
                <button className='p-1.5 bg-background-card rounded-md' onClick={promptLocation}>Get Location</button>
              </div>
            )
          }
        </div>
    </>
  )
}
