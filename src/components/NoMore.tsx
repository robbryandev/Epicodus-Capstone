import { useRef } from 'react'
import useOnScreen from "@/hooks/useOnScreen"
import { getShows } from '@/utils/shows'

const NoMore = ({showCallback, hasShowsCallback, pageCallback, pagesCallback, shows, page, pages, position}: any) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  console.log(`Passed pages as ${pages}`)
  if (isVisible) {
    console.log("getting more shows")
    getShows(position, showCallback, hasShowsCallback, pageCallback, pagesCallback, true, shows, page + 1, pages)
  }
  return <p ref={ref} className='text-2xl p-6 text-txt-main text-center pb-20'>{isVisible ? "Sorry... There's no more shows :(" : "Test"}</p>
}

export default NoMore