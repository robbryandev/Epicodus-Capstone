import { env } from "@/env.mjs";
import { type UserLocation } from "@/pages/home";
import { Signal, signal } from "@preact/signals-react";
import { shows } from "@/pages/home";
import moment from "moment";

type FilterType = {
  genre?: string,
  startDate?: string,
  endDate?: string
}

export const genres = signal(new Set<string>())
export type Show = {
  id: string;
  img: string;
  artist: string;
  date: string;
  href: string;
  genre?: string;
  saved: boolean;
};

export const getDate = (addYear = false) => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (addYear) {
    year++
  }
  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

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
  const thisGenre = ev.classifications[0].genre.name
  genres.value.add(thisGenre)
  const newShow = {
    artist: ev.name,
    href: ev.url,
    img: ev.images[imgIndex].url,
    date: ev.dates.start.localDate,
    id: ev.id,
    genre: thisGenre,
    saved: false
  }
  return newShow
}

export const usedFilters: Signal<FilterType> = signal({
  genre: "",
  startDate: getDate(),
  endDate: getDate(true)
} as FilterType)

function getFilters() {
  const filters = usedFilters.valueOf()
  let result: string[] = []
  if (filters.genre != "") {
    result.push(`${filters.genre}`)
  }
  if (filters.startDate != "") {
    result.push(`startDateTime=${moment(filters.startDate).format()}`)
  }
  if (filters.endDate != "") {
    result.push(`endDateTime=${moment(filters.endDate).format()}`)
  }
  return result
}

export async function getShows(
  position: UserLocation
) {
    if (typeof window !== "undefined") {
        let result: Show[] = [] as Show[];
        const ticketFilters = getFilters()
        let ticketMUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${env.NEXT_PUBLIC_TICKET_KEY}&segmentName=Music&unit=miles&radius=10&geoPoint=${position.hash}&size=100${ticketFilters.length > 0 ? "&" + ticketFilters.join("&") : ""}`;
        console.log(`ReqUrl: ${ticketMUrl}`)
        const firstTicketM = await fetch(ticketMUrl);
        const firstMJson = await firstTicketM.json();
        const mPages: number = firstMJson.page.totalPages
        if (typeof firstMJson._embedded != "undefined") {
          firstMJson._embedded.events.forEach((ev: any) => {
            result.push(newTicketMShow(ev))
          });
        }
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
        shows.value = sortedResult;
        const resultObj = { shows: sortedResult, time: Date.now(), genres: [...genres.valueOf()] };
        localStorage.setItem("shows", JSON.stringify(resultObj));
    }
}