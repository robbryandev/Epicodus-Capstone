import {useRef } from 'react'
import useOnScreen from "@/hooks/useOnScreen"
import { getShows } from '@/utils/shows'

const NoMore = ({position}: any) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  if (isVisible) {
      const storedShows = localStorage.getItem("shows")
      if (storedShows == null) {
        getShows(position)
      } else if (Date.now() - JSON.parse(`${storedShows}`).date > (60_000 * 60) * 3) {
        getShows(position)
      }
    }
  return <p ref={ref} className='text-2xl p-6 text-txt-main text-center pb-20'>{isVisible ? "Sorry... There's no more shows :(" : "Test"}</p>
}

export default NoMore