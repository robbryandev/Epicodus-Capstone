import Link from "next/link"
import Image from "next/image"
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"
import { useState } from "react"

type CardProps = {
  artist: string
  img: string
  date: string
  href: string
}

export default function Card(props: CardProps) {
    const [liked, setLiked] = useState(false)
    const maxTitle = 12
    const artistName = props.artist.length > maxTitle ? props.artist.slice(0, maxTitle) + "..." : props.artist
    const showDate = props.date
    return (
      <div className={`artist-card w-40 h-44 pt-2 m-auto my-1 bg-background-card rounded-md text-txt-main`}>
        <div className="artist-card-holder relative text-center">
          <div className="artist-card-front w-full h-full">
            <div className={`w-9/12 h-auto m-auto p-0 relative top-2 rounded-md bg-gray-100 overflow-hidden`}>
              <Image src={props.img} alt={"Image of the artist " + props.artist} width="0" height="0" className={`w-11/12 h-11/12 m-auto p-0`}/>
            </div>
            <p className="text-center my-3 px-2 pb-1">{artistName}</p>
          </div>
          <div className="artist-card-back bg-background-card p-2 text-center w-full h-auto">
            <Link href={"/shows"} className="show-link block mb-2 font-bold text-txt-shows">{artistName}</Link>
            <p className="text-txt-main text-base">{showDate}</p>
            <div className="w-1/5 m-auto text-txt-home text-4xl">
              <button onClick={() => setLiked(Number(liked) === 0)}>
                {
                  liked ? (
                    <AiFillHeart/>
                  ) : (
                    <AiOutlineHeart/>
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}