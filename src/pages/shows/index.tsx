import Card from "@/components/Card"
import { getShows, Show } from "@/utils/shows"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Shows() {
  const {data: session} = useSession()
  function getSaved() {
    let result = [] as Show[]
    if (typeof window != "undefined") {
      const getShow = (key) => {
        const id = key.replace(`saved-${session?.user.id}-`, "")
        const storageShow = localStorage.getItem(`show-${id}`)
        if (storageShow != null) {
          const thisShow =  JSON.parse(storageShow) as Show
          return thisShow
        }
      }
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key != null) {
          if (key.startsWith(`saved-${session?.user.id}`)) {
            const newShow = getShow(key)
            if (typeof newShow != "undefined") {
              result.push(newShow)
            }
          }
        }
      }
    }
    return result
  }
  useEffect(() => {
    getSaved()
  }, [])
  return (
    <>
      <div className="shows pt-16">
        <div className="inline-flex flex-wrap gap-1 w-82 m-auto pb-2">
          {
            getSaved().map((show) => {
              return <Card key={show.id} id={show.id} img={show.img} saved={show.saved} artist={show.artist} date={show.date} href={show.href}/>
            })
          }
        </div>
      </div>
    </>
  )
}
