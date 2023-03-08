import Card from '@/components/Card'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import * as geohash from "ngeohash"
import { type Show } from '@/utils/shows'
import NoMore from "@/components/NoMore"
import { localOrDefault } from '@/utils/storage'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import { signal } from '@preact/signals-react'

export type UserLocation = {
  lat: number,
  long: number,
  hash: string
}
export const shows = signal([] as Show[])
export const position = signal({} as UserLocation)
export default function Home() {
  const [hasPosition, setHasPosition] = useState(JSON.stringify(position.valueOf()) != "{}")
  const {data: session} = useSession()

  function handlePosition(res: GeolocationPosition) {
    position.value = {lat: res.coords.latitude, long: res.coords.longitude,
       hash: geohash.encode(res.coords.latitude, res.coords.longitude, 4)}
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
    if (typeof window != "undefined") {
      const newShows = localOrDefault("shows", [] as Show[])
      if (shows.valueOf().length == 0) {
        shows.value = newShows
      }
    }
    const userDoc = collection(db, `${session?.user.id}`)
    const saveQuery = query(userDoc);
    getDocs(saveQuery)
      .then((userSaved) => {
        userSaved.forEach((save) => {
          const data = {
            id: save.data().id,
            img: save.data().img,
            artist: save.data().artist,
            date: save.data().date,
            href: save.data().href,
            saved: save.data().saved
          }
          localStorage.setItem(`saved-${session?.user.id}-${data.id}`, "1")
          localStorage.setItem(`show-${data.id}`, JSON.stringify(data))
        })
      })
}, [session?.user.id])
  useEffect(() => {
      if (session && JSON.stringify(position.valueOf()) == "{}") {
        promptLocation()
      }
    })
  return (
    <>
        <div className="homePage m-0 mx-4 pt-16 p-0">
          {
            hasPosition ? (
                <>                
                  <div className='inline-flex flex-wrap gap-1 w-82 m-auto pb-2'>
                    {
                      shows.valueOf().map((show) => {
                        return <Card key={show.id} id={show.id} img={show.img} saved={show.saved} artist={show.artist} date={show.date} href={show.href}/>
                      })
                    }
                  </div>
                  {
                    <NoMore position={position.valueOf()}/>
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
