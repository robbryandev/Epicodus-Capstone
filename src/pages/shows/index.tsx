import Card from "@/components/Card";
import { getDate, Show, showSort } from "@/utils/shows";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSignal } from "@preact/signals-react";

export default function Shows() {
  const { data: session } = useSession();
  const [upcoming, setUpcoming] = useState([] as ReactElement[]);
  const [memories, setMemories] = useState([] as ReactElement[]);
  const [shows, setShows] = useState([] as Show[]);
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
          saved: show.data().saved,
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
  }, [shows])
  return (
    <>
    <div className="shows mx-4 p-0 py-16">
      <button className="text-txt-main text-xl rounded-md bg-background-card py-1 px-2" onClick={() => setShowCustom(Number(showCustom) == 0)}>Custom Show</button>
      {
        showCustom ? (
          <div className="artist-card-back bg-background-card p-2 pb-4 text-center w-full h-auto">

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
