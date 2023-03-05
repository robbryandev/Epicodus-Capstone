import { env } from "@/env.mjs";
import { type UserLocation } from "@/pages/home";

export type Show = {
  id: string;
  img: string;
  artist: string;
  date: string;
  href: string;
  saved: boolean;
};

export const showSort = (a, b) => {
  const dateA = Date.parse(a.date)
  const dateB = Date.parse(b.date)
  return dateA > dateB ? 1 : -1
}

function newTicketMShow(ev: any) {
  let imgIndex = 0
  let gotImg = false
  for (let i = 0; i < ev.images.length; i++) {
    if (ev.images[i].url.startsWith("https://i.ticketweb") === false && !gotImg) {
      imgIndex = i
      gotImg = true
    }
  }
  const newShow = {
    artist: ev.name,
    href: ev.url,
    img: ev.images[imgIndex].url,
    date: ev.dates.start.localDate,
    id: ev.id,
    saved: false
  }
  return newShow
}

export async function getShows(
  position: UserLocation,
  showsCallback: CallableFunction
) {
    if (typeof window !== "undefined") {
        let result: Show[] = [] as Show[];
        let ticketMUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${env.NEXT_PUBLIC_TICKET_KEY}&segmentName=Music&unit=miles&radius=10&geoPoint=${position.hash}&size=100`;
        const firstTicketM = await fetch(ticketMUrl);
        const firstMJson = await firstTicketM.json();
        const mPages: number = firstMJson.page.totalPages
        firstMJson._embedded.events.forEach((ev: any) => {
          result.push(newTicketMShow(ev))
        });
        for (let m = 1; m < mPages; m++) {
          const TicketM = await fetch(ticketMUrl + `&page=${m}`);
          const MJson = await TicketM.json();
          MJson._embedded.events.forEach((ev: any) => {
            const newMTicket = newTicketMShow(ev)
            if (result.filter((show) => {
              return show.id === newMTicket.id || show.artist === newMTicket.artist
            }).length === 0) {
              result.push(newTicketMShow(ev))
            }
          });
        }
        const sortedResult = result.sort(showSort)
        showsCallback(sortedResult);
        const resultObj = { shows: sortedResult, time: Date.now() };
        localStorage.setItem("shows", JSON.stringify(resultObj));
    }
}