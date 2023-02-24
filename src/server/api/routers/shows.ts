import { z } from "zod";
import { env } from "@/env.mjs";
import { type Show } from "@/pages/home";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const showRouter = createTRPCRouter({
  getShows: protectedProcedure
    .input(z.object({ geoPoint: z.string() }))
    .query(({ input }) => {
      let result: Show[] = []
      fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${env.NEXT_PUBLIC_TICKET_KEY}&segmentName=Music&unit=miles&radius=10&geoPoint=${input.geoPoint}`)
        .then((res) => {
          res.json()
            .then((rjson) => {
              rjson._embedded.events.forEach((ev: any) => {
                result.push({artist: ev.name, href: ev.url, img: ev.images[0].url, date: ev.dates.start.localDate})
              });
            })
            .catch((err: string) => {
              result = []
            })
        })
        .catch((err: string) => {
          result = []
        })
      return result
    })
});
