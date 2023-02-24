import Card from '@/components/Card.server'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import * as geohash from "ngeohash"
import {v4} from "uuid"
import { getShows, type Show } from '@/utils/shows'
import NoMore from "@/components/NoMore"

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
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(0)
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
    if (session && position.hash) {
      getShows(position, setShows, setHasShows, setPage, setPages)
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
                      [...shows].map((show) => {
                        return <Card key={show.id} img={show.img} artist={show.artist} date={show.date} href={show.href}/>
                      })
                    }
                  </div>
                  <NoMore showCallback={setShows} hasShowsCallback={setHasShows} pageCallback={setPage} pagesCallback={setPages} shows={shows} page={page} pages={pages} position={position}/>
                </>
              ) : (
                <div className='text-center text-txt-main pt-12'>
                  <p className='text-2xl p-6'>Sorry... There&lsquo;s no shows :(</p>
                  <button className='p-1.5 bg-background-card rounded-md' onClick={() => getShows(position, setShows, setHasShows, setPage, setPages)}>Look again</button>
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
