import { useRef } from 'react'
import useOnScreen from "@/hooks/useOnScreen"

const NoMore = ({showCallback, hasShowsCallback, pageCallback, shows, page}: any) => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)
  return <p ref={ref} className='text-2xl p-6 text-txt-main text-center pb-20'>{isVisible ? "Sorry... There's no more shows :(" : "Test"}</p>
}

export default NoMore