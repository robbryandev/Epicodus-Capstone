import { createTRPCRouter } from "./trpc";
import { showRouter } from "./routers/shows";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  shows: showRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
