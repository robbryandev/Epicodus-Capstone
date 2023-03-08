/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import {AiOutlineHeart, AiFillHeart} from "react-icons/ai"
import {BiCheck} from "react-icons/bi"
import { useEffect, useState } from "react"
import { Show } from "@/utils/shows"
import { localOrDefault } from "@/utils/storage"
import { useSession } from "next-auth/react"
import { db } from "@/utils/firebase"
import { deleteDoc, doc } from "firebase/firestore"

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  const newBuffer = Buffer.from(buffer);
  return newBuffer.toString('base64');
};

export default function Card(props: Show) {
    const userId = useSession().data?.user.id
    const [isSaved, setIsSaved] = useState(localOrDefault(`saved-${userId}-${props.id}`, 0) as boolean)
    const [showRemove, setShowRemove] = useState(false)
    const maxTitle = 12
    const artistNameFront = props.artist.length > maxTitle ? props.artist.slice(0, maxTitle) + "..." : props.artist
    const maxFullName = 25
    const artistNameBack = props.artist.length > maxFullName ? props.artist.slice(0, maxFullName) + "..." : props.artist
    const propDate = props.date.split("-")
    const showDate = `${propDate[1]}-${propDate[2]}-${propDate[0]}`
    function saveShow() {
      if (!isSaved) {
        localStorage.setItem(`saved-${userId}-${props.id}`, "1")
        localStorage.setItem(`show-${props.id}`, JSON.stringify(props))
        fetch(props.img)
          .then((res) => {
            if (res.body) {
              res.arrayBuffer().then((buffer) => {
                var base64Flag = 'data:image/jpeg;base64,';
                var imgText = arrayBufferToBase64(buffer);            
                let newSave = {...props, saved: 1, img: base64Flag + imgText}
                db.collection(`${userId}`).doc(props.id).set(newSave)
                  .catch((err) => {
                      console.log(err)
                  })
              });
            }
          })
          .catch((err) => {
            console.log(err)
          })
        setIsSaved(true)
      } else {
        if (!props.disabled) {
          setShowRemove(true)
        }
      }
    }
    function removeShow() {
      if (!props.disabled) {
        localStorage.removeItem(`saved-${userId}-${props.id}`)
        deleteDoc(doc(db, `${userId}`, props.id));
        setIsSaved(false)
        setShowRemove(false)
      }
    }
    useEffect(() => {
      if (props.disabled) {
        setIsSaved(true)
      }
    })
    return (
      <div className={`artist-card w-40 h-44 pt-2 m-auto my-1 bg-background-card rounded-md text-txt-main`} id={props.id}>
        {showRemove ? (
        <div className="relative text-center">
          <div className="w-full h-full">
            <p className="text-center my-3 px-2 pb-1">Remove</p>
            <p className="text-center text-txt-home my-3 px-2 pb-1">{artistNameFront}?</p>
            <div className="pt-4 text-2xl">
              <button className="font-normal mr-6 relative bottom-1 text-red-400" onClick={() => setShowRemove(false)}>x</button>
              <button className="font-bold text-green-400" onClick={() => removeShow()}><BiCheck/></button>
            </div>
          </div>
        </div>
        ) :         
        <div className="artist-card-holder relative text-center">
          <div className="artist-card-front w-full h-full">
            <div className={`w-9/12 h-auto m-auto p-0 relative top-2 rounded-md bg-gray-100 overflow-hidden`}>
              <img src={props.img} alt={"Image of the artist " + props.artist} className={`w-[10rem] h-[7rem] m-auto p-0 object-fill grayscale-[80%]`}/>
            </div>
            <p className="text-center my-3 px-2 pb-1">{artistNameFront}</p>
          </div>
          <div className="artist-card-back bg-background-card p-2 pb-4 text-center w-full h-auto">
            <Link href={props.href} className="show-link block mb-2 font-bold text-txt-shows">{artistNameBack}</Link>
            <p className="text-txt-main text-base">{showDate}</p>
            <div className="w-1/5 m-auto text-txt-home text-4xl">
              <button onClick={saveShow}>
                {
                  isSaved ? (
                    <AiFillHeart/>
                  ) : (
                    <AiOutlineHeart/>
                  )
                }
              </button>
            </div>
          </div>
        </div>
        }
      </div>
    )
}