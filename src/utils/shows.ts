import { env } from "@/env.mjs"
import { type UserLocation } from "@/pages/home"

export type Show = {
  img: string,
  artist: string,
  date: string,
  href: string
}

export async function getShows(position: UserLocation , showsCallback: CallableFunction, hasShowsCallback: CallableFunction) {
  return new Promise(async(resolve, reject) => {
    let result: Show[] = []
    const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${env.NEXT_PUBLIC_TICKET_KEY}&segmentName=Music&unit=miles&radius=10&geoPoint=${position.hash}&size=100&sort=date,asc`)
    const rjson = await res.json()
    rjson._embedded.events.forEach((ev: any) => {
      result.push({artist: ev.name, href: ev.url, img: ev.images[0].url, date: ev.dates.start.localDate})
    });
    showsCallback(result)
    if (result.length > 0) {
      hasShowsCallback(true)
    }
    console.log(result)
    resolve(null)
  })
}