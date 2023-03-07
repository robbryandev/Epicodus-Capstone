import { getDate } from '@/utils/shows';
import { Signal, signal } from '@preact/signals-react';

type FilterType = {
  genre?: string
  startDate?: string,
  endDate?: string
}

export const usedFilters: Signal<FilterType> = signal({} as FilterType)

export default function Filters() {
  return (
    <div className="fixed left-1/2 translate-x-[-50%] top-16 bg-background-nav w-4/5 h-4/5 p-6 text-center">
      <label htmlFor="genre" className='text-2xl mr-6'>Genre</label>
      <div className='inline py-0.5 px-1.5 border-2 border-background-main'>
        <select className='bg-background-nav text-xl' defaultValue={usedFilters.value.genre != null ? usedFilters.value.genre : ""} name="genre" id="genre" onChange={(val) => {
          usedFilters.value.genre = val.currentTarget.value
        }}>
          <option value=""></option>
          <option value="test1">Test 1</option>
          <option value="test2">Test 2</option>
          <option value="test3">Test 3</option>
        </select>
      </div>
      <div className='mt-6'>
        <label htmlFor="start-date" className='text-2xl mr-6'>Start Date</label>
        <input className="bg-background-main mt-2" id='start-date' name='start-date' type="date" min={getDate()} defaultValue={getDate()} onChange={(val) => {
            usedFilters.value.startDate = val.currentTarget.value
          }} />
      </div>
      <div className='mt-6'>
        <label htmlFor="end-date" className='text-2xl mr-6'>End Date</label>
        <input className="bg-background-main mt-2" id='end-date' name='end-date' type="date" min={getDate()} defaultValue={getDate(true)} onChange={(val) => {
            usedFilters.value.endDate = val.currentTarget.value
          }} />
      </div>
    </div>
  )
}