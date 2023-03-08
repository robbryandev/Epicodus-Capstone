import { Show } from "./shows";

export function localOrDefault(item: string, defaultValue: any) {
  const emptyShows = [] as Show[]
  if (typeof window != "undefined") {
    const localItem = localStorage.getItem(item)
    if (typeof defaultValue === "string") {
      return localItem != null ? localItem : defaultValue
    } else if (typeof defaultValue === "number") {
      return localItem != null ? parseInt(localItem) : defaultValue
    } else if (typeof defaultValue === typeof emptyShows){
      if (localItem != null) {
        const showTime = JSON.parse(localItem).time;
        if (Date.now() - showTime > 60_000 * 60 * 3) {
          localStorage.removeItem("shows");
          localStorage.removeItem("pages");
          localStorage.removeItem("page");
          return defaultValue
        }
        return JSON.parse(localItem).shows as Show[]
      }
      return defaultValue
    }
  }
}

