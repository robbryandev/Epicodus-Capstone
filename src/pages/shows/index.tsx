import Card from "@/components/Card"
import { Show } from "@/utils/shows"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore"
import {db} from "@/utils/firebase"

export default function Shows() {
  const {data: session} = useSession()
  const [shows, setShows] = useState([] as Show[])
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
}, [session?.user.id])
  return (
    <>
      <div className="shows mx-4 py-16 p-0">
        <div className="inline-flex flex-wrap gap-4 w-82 m-auto pb-2">
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
