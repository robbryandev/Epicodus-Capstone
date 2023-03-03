import Card from "@/components/Card"
import { Show } from "@/utils/shows"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore"
import {db} from "@/utils/firebase"

export default function Shows() {
  const {data: session} = useSession()
  const [shows, setShows] = useState(getSaved())
  // function getSaved() {
  //   let result = [] as Show[]
  //   if (typeof window != "undefined") {
  //     const getShow = (key) => {
  //       const id = key.replace(`saved-${session?.user.id}-`, "")
  //       const storageShow = localStorage.getItem(`show-${id}`)
  //       if (storageShow != null) {
  //         const thisShow =  JSON.parse(storageShow) as Show
  //         return thisShow
  //       }
  //     }
  //     for (let i = 0; i < localStorage.length; i++) {
  //       const key = localStorage.key(i)
  //       if (key != null) {
  //         if (key.startsWith(`saved-${session?.user.id}`)) {
  //           const newShow = getShow(key)
  //           if (typeof newShow != "undefined") {
  //             result.push(newShow)
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return result
  // }
  function getSaved() {
    let result = [] as Show[]
    
    return result
  }
  useEffect(() => {
    const unsub = onSnapshot(collection(db, `${session?.user.id}`), (snap) => {
        const result: Show[] = [];
        snap.forEach((show) => {
            const data = {
              id: show.data().id,
              img: show.data().img,
              artist: show.data().artist,
              date: show.data().date,
              href: show.data().href,
              saved: show.data().saved
            }
            result.push(data)
        })
        setShows(result)
    })
    return () => unsub();
}, [])
  return (
    <>
      <div className="shows mx-4 py-16 p-0">
        <div className="inline-flex flex-wrap gap-1 w-82 m-auto pb-2">
          {
            shows.map((show) => {
              return <Card key={show.id} id={show.id} img={show.img} saved={show.saved} artist={show.artist} date={show.date} href={show.href}/>
            })
          }
        </div>
      </div>
    </>
  )
}
