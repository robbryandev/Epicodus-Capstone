import Card from '@/components/Card.server'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import * as geohash from "ngeohash"
import { type Show } from '@/utils/shows'
import NoMore from "@/components/NoMore"
import { localOrDefault } from '@/utils/storage'

export type UserLocation = {
  lat: number,
  long: number,
  hash: string
}

export default function Home() {
  const [position, setPosition] = useState({} as UserLocation)
  const [hasPosition, setHasPosition] = useState(false)
  const [shows, setShows] = useState(localOrDefault("shows", [] as Show[]))
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
      if (session && JSON.stringify(position) == "{}") {
        console.log(session)
        promptLocation()
      }
    }, [session, position])
  return (
    <>
        <div className="homePage m-0 pt-16 p-0">
          {
            hasPosition ? (
                <>                
                  <div className='flex flex-wrap gap-1 w-82 m-auto pb-2'>
                    {
                      shows.map((show) => {
                        return <Card key={show.id} id={show.id} img={show.img} artist={show.artist} date={show.date} href={show.href}/>
                      })
                    }
                  </div>
                  {
                    <NoMore showCallback={setShows} shows={shows} position={position}/>
                  }
                </>
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
