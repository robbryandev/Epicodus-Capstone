import { env } from "@/env.mjs";
import { type UserLocation } from "@/pages/home";
import { v4 } from "uuid";

export type Show = {
  id: string;
  img: string;
  artist: string;
  date: string;
  href: string;
};

export async function getShows(
  position: UserLocation,
  showsCallback: CallableFunction,
  pageCallback: CallableFunction,
  pagesCallback: CallableFunction,
  moreShows = false,
  shows: Show[],
  page = 0,
  pages = 0
) {
  return new Promise(async (resolve, reject) => {
    if (typeof window !== "undefined") {
        let result: Show[] = structuredClone(shows);
        let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${env.NEXT_PUBLIC_TICKET_KEY}&segmentName=Music&unit=miles&radius=10&geoPoint=${position.hash}&size=100&sort=date,asc&page=${page}`;
        console.log(`Page: ${page}, total: ${pages}`);
        console.log(`request url: ${url}`);
        const res = await fetch(url);
        const rjson = await res.json();
        rjson._embedded.events.forEach((ev: any) => {
          result.push({
            artist: ev.name,
            href: ev.url,
            img: ev.images[0].url,
            date: ev.dates.start.localDate,
            id: v4(),
          });
        });
        console.log(`Total pages: ${rjson.page.totalPages}`);
        localStorage.setItem("pages", rjson.page.totalPages);
        localStorage.setItem("page", `${page}`);
        pageCallback(page);
        pagesCallback(rjson.page.totalPages);
        showsCallback(result);
        console.log(result);
        const resultObj = { shows: result, time: Date.now() };
        localStorage.setItem("shows", JSON.stringify(resultObj));
        console.log("got shows from ticketmaster");
      }
    })
}