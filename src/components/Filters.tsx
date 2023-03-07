import { defaultFilters, genres, getDate, getShows, Show } from '@/utils/shows';
import { usedFilters } from '@/utils/shows';
import { BiCheck } from 'react-icons/bi';
import { showFilters } from './Layout';
import { useRouter } from 'next/router';
import { shows, position } from '@/pages/home';

export default function Filters() {
  const localShows = localStorage.getItem("shows")
  const router = useRouter()
  return (
    <div className="fixed left-1/2 translate-x-[-50%] md:left-auto md:translate-x-0 md:right-16 top-16 bg-background-nav w-4/5 md:w-80 h-auto p-6 md:p-12 py-16 text-center">
      <label htmlFor='genre' className='text-2xl mt-4 mr-4'>Genre</label>
      <div className='inline py-0.5 px-1.5 border-2 border-background-main text-center'>
        <select className='bg-background-nav text-xl mt-2' defaultValue={usedFilters.value.genre != null ? usedFilters.value.genre : ""} name="genre" id="genre" onChange={(val) => {
          usedFilters.value.genre = val.currentTarget.value
        }}>
          <option value=""></option>
          {
            [...(localShows != null ? JSON.parse(localShows).genres : [...genres.valueOf()])].map((genre) => {
              return (
                <option key={`${genre.id}`} value={genre.id}>{genre.name}</option>
              )
            })
          }
        </select>
      </div>
    <p className='text-2xl mt-4'>Start Date</p>
      <div className='text-center mt-2'>
        <input className="bg-background-main mt-2 w-4/5" id='start-date' name='start-date' type="date" min={getDate({})} defaultValue={usedFilters.valueOf().startDate} onChange={(val) => {
            usedFilters.value.startDate = val.currentTarget.value
          }} />
      </div>
    <p className='text-2xl mt-4'>End Date</p>
      <div className='mt-2 text-center'>
        <input className="bg-background-main mt-2 w-4/5" id='end-date' name='end-date' type="date" min={getDate({addOne: true})} defaultValue={usedFilters.valueOf().endDate} onChange={(val) => {
            usedFilters.value.endDate = val.currentTarget.value
          }} />
      </div>
      <div className='text-3xl space-x-6 m-0 p-0 mt-4'>
        <button className="font-normal mr-6 relative bottom-1 text-red-400"  onClick={() =>{
          showFilters.value = false
          usedFilters.value = defaultFilters
          shows.value = [] as Show[]
          getShows(position.value)
        }
          }>x</button>
        <button className="font-bold text-green-400" onClick={() => {
          showFilters.value = false
          shows.value = [] as Show[]
          getShows(position.value)
        }}><BiCheck/></button>
      </div>
    </div>
  )
}