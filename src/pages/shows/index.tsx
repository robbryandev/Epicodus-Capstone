import Card from "@/components/Card";
import { getDate, Show, showSort } from "@/utils/shows";
import { useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/utils/firebase";

function savedShows(shows): ReactElement {
  const compareDate = Date.parse(getDate())
  const upcoming = [] as ReactElement[];
  const memories = [] as ReactElement[];
  shows.forEach((show) => {
    if (compareDate <= Date.parse(show.date)) {
      upcoming.push(
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
      memories.push(
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
  return (
    <>
    <div className="shows mx-4 p-0 py-16">
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

export default function Shows() {
  const { data: session } = useSession();
  const [shows, setShows] = useState([] as Show[]);
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
  return (
    savedShows(shows)
  );
}
