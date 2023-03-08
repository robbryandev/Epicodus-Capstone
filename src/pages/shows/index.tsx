import Card, { arrayBufferToBase64 } from "@/components/Card";
import { getDate, Show, showSort } from "@/utils/shows";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import { HiUpload } from "react-icons/hi"
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { v4 } from "uuid";

export default function Shows() {
  const { data: session } = useSession();
  const [upcoming, setUpcoming] = useState([] as ReactElement[]);
  const [memories, setMemories] = useState([] as ReactElement[]);
  const [shows, setShows] = useState([] as Show[]);
  const [displayCard, setDisplayCard] = useState({
    id: "display",
    img: "",
    saved: true,
    artist: "artist",
    date: "00-00-0000",
    href: "#",
    disabled: true
  })
  const [showCustom, setShowCustom] = useState(false);
  const compareDate = Date.parse(getDate({}))
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
        };
        result.push(data);
      });
      setShows(result.sort(showSort));
    });
    return () => unsub();
  }, [session?.user.id]);

  useEffect(() => {
    let newUpcoming = [] as ReactElement[]
    let newMemories = [] as ReactElement[]
    shows.forEach((show) => {
      if (compareDate <= Date.parse(show.date)) {
        newUpcoming.push(
          <Card
            key={show.id}
            id={show.id}
            img={show.img}
            saved={show.saved}
            artist={show.artist}
            date={show.date}
            href={show.href}
          />
        );
      } else {
        newMemories.push(
          <Card
            key={show.id}
            id={show.id}
            img={show.img}
            saved={show.saved}
            artist={show.artist}
            date={show.date}
            href={show.href}
          />
        );
      }
    });
    setUpcoming(newUpcoming)
    setMemories(newMemories)
  }, [compareDate, shows])
  return (
    <>
    <div className="shows mx-4 p-0 py-16">
      <div className="text-center">
        <button className="text-txt-main text-xl rounded-md bg-background-card py-1 px-2" onClick={() => setShowCustom(Number(showCustom) == 0)}>Custom Show</button>
      </div>
      {
        showCustom ? (
          <div>
            <div className={`artist-card w-40 h-44 pt-2 m-auto my-1 bg-background-card rounded-md text-txt-main`}>
              <form className="text-center">
                <input className="w-4/5 rounded-md px-1.5 py-1 m-2 bg-background-main" onChange={(val) => setDisplayCard({...displayCard, artist: val.currentTarget.value})} name="name" type="text" placeholder="Name" />
                <input className="w-4/5 rounded-md px-1.5 py-1 m-2 mb-0 bg-background-main" onChange={(val) => setDisplayCard({...displayCard, date: val.currentTarget.value})} name="date" type="date" placeholder="Date" />
                <label htmlFor="show-img" className="m-0 p-0" >
                  <HiUpload className="relative left-1/2 translate-x-[-50%] top-2 text-3xl text-txt-main hover:cursor-pointer"/>
                  </label>
                  <input className="invisible w-0 h-0" name="show-img" id="show-img" onChange={(val) => {
                    const inputFiles = val.currentTarget.files
                    if (inputFiles != null) {
                      if (inputFiles.length > 0) {
                        inputFiles[0].arrayBuffer()
                          .then((inputBuffer) => {
                            const encodedImage = 'data:image/jpeg;base64,' + arrayBufferToBase64(inputBuffer)
                            setDisplayCard({...displayCard, img: encodedImage})
                          })
                      }
                    }
                  }} type="file"/>
                <br />
                <button type="button" className="text-txt-home relative bottom-2" onClick={() => {
                    const randId = v4()
                    const newSave = {...displayCard, id: randId}
                    localStorage.setItem(`saved-${session?.user.id}-${newSave.id}`, "1")
                    localStorage.setItem(`show-${newSave.id}`, JSON.stringify(newSave))
                    db.collection(`${session?.user.id}`).doc(newSave.id).set(newSave)
                    .catch((err) => {
                        console.log(err)
                    })
                }}>Add Show</button>
              </form>
            </div>
            <Card {...displayCard}/>
          </div>
        ) : null
      }
      <h1 className="text-center text-txt-main text-2xl my-4">Upcoming</h1>
      {
        upcoming.length > 0 ? (
          <div className="w-82 m-auto inline-flex flex-wrap gap-4 pb-2">
            {upcoming.map((show) => show)}
          </div>
        ) : (
          <div className="text-center text-txt-main">
            <p>You have no upcoming shows</p>
          </div>
        )
      }
      <h1 className="text-center text-txt-main text-2xl my-4">Memories</h1>
      {
        memories.length > 0 ? (
          <div className="w-82 m-auto inline-flex flex-wrap gap-4 pb-2">
            {memories.reverse().map((show) => show)}
          </div>
        ) : (
          <div className="text-center text-txt-main">
            <p>You have no memories</p>
          </div>
        )
      }
    </div>
  </>
  )
}
