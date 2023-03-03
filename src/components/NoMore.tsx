import { useEffect, useRef, useState } from 'react'
import useOnScreen from "@/hooks/useOnScreen"
import { getShows } from '@/utils/shows'
import { localOrDefault } from '@/utils/storage'

const NoMore = ({showCallback, shows, position}: any) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  const [page, setPage] = useState(localOrDefault("page", -1))
  const [pages, setPages] = useState(localOrDefault("pages", 1))
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setPage(page + 1)
        setLoading(false)
      }, 7000)
    }
  }, [loading])
  if (isVisible && !loading) {
    setLoading(true)
    console.log("getting more shows")
    if ((page + 1) < pages) {
      console.log(`Passed page as ${page + 1}, Total: ${pages}`)
      if (page + 1 === 0) {
        getShows(position, showCallback, setPage, setPages, false, shows, page + 1, pages)
      } else {
        getShows(position, showCallback, setPage, setPages, true, shows, page + 1, pages)
      }
    }
  }
  return <p ref={ref} className='text-2xl p-6 text-txt-main text-center pb-20'>{isVisible ? "Sorry... There's no more shows :(" : "Test"}</p>
}

export default NoMore