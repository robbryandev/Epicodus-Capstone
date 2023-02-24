import { useRef, useState } from 'react'
import useOnScreen from "@/hooks/useOnScreen"
import { getShows } from '@/utils/shows'

const NoMore = ({showCallback, hasShowsCallback, pageCallback, pagesCallback, loadingCallback, shows, page, pages, position, loading}: any) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  console.log(`Passed page as ${page}, Total: ${pages}`)
  if (isVisible && !loading) {
    console.log("getting more shows")
    if (page < pages - 1 && page + 1 > 0) {
      getShows(position, showCallback, hasShowsCallback, pageCallback, pagesCallback, true, shows, page + 1, pages)
    }
    loadingCallback(true)
  }
  return <p ref={ref} className='text-2xl p-6 text-txt-main text-center pb-20'>{isVisible ? "Sorry... There's no more shows :(" : "Test"}</p>
}

export default NoMore