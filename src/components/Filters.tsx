import { Signal, signal } from '@preact/signals';

type FilterType = {
  genre?: string
}

export const usedFilters: Signal<FilterType> = signal({} as FilterType)

export default function Filters() {
  return (
    <div className="fixed left-1/2 translate-x-[-50%] top-16 bg-background-nav w-4/5 h-4/5">
      <label htmlFor="genre" className='text-2xl'>Genre</label>
      <br />
      <select className='bg-background-nav text-xl' defaultValue={usedFilters.value.genre != null ? usedFilters.value.genre : ""} name="genre" id="genre" onChange={(val) => {
        usedFilters.value.genre = val.currentTarget.value
        console.log(`New genre: ${val.currentTarget.value}`)
      }}>
        <option value="test1">Test 1</option>
        <option value="test2">Test 2</option>
        <option value="test3">Test 3</option>
      </select>
    </div>
  )
}