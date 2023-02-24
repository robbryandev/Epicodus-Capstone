import { Inter } from '@next/font/google'
import Card from '@/components/Card.server'
import { useEffect, useState } from 'react'
import * as geohash from "ngeohash"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { api } from '@/utils/api'
import { env } from '@/env.mjs'
import {v4} from "uuid"

const inter = Inter({ subsets: ['latin'] })

type UserLocation = {
  lat: number,
  long: number,
  hash: string
}

export type Show = {
  img: string,
  artist: string,
  date: string,
  href: string
}

export default function Home() {
  const loremText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est corporis, vero delectus provident id quam ipsam quis obcaecati eius, eveniet possimus veritatis eligendi enim natus laborum? Provident, quibusdam nulla!"
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
  async function getShows() {
    return new Promise(async(resolve, reject) => {
      let result: Show[] = []
      const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${env.NEXT_PUBLIC_TICKET_KEY}&segmentName=Music&unit=miles&radius=10&geoPoint=${position.hash}`)
      const rjson = await res.json()
      rjson._embedded.events.forEach((ev: any) => {
        result.push({artist: ev.name, href: ev.url, img: ev.images[0].url, date: ev.dates.start.localDate})
      });
      setShows(result)
      if (result.length > 0) {
        setHasShows(true)
      }
      console.log(result)
      resolve(null)
    })
  }

  useEffect(() => {
    if (session) {
      console.log(session)
      promptLocation()
    }
  }, [session])

  return (
    <>
        <div className="homePage m-0 pt-12 p-0">
          {
            hasPosition ? (
              hasShows ? (
                <div className='flex flex-wrap gap-1 w-82 m-auto pb-12'>
                  {
                    shows.map((show) => {
                      return <Card key={v4()} img={show.img} artist={show.artist} date={show.date} href={show.href}/>
                    })
                  }
                  <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
                </div>
              ) : (
                <div className='text-center text-txt-main pt-12'>
                  <p className='text-2xl p-6'>Sorry... There&lsquo;s no shows :(</p>
                  <button className='p-1.5 bg-background-card rounded-md' onClick={getShows}>Look again</button>
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
