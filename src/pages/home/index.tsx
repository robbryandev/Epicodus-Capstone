import { Inter } from '@next/font/google'
import Card from '@/components/Card.server'
import { useEffect, useState } from 'react'
import * as geohash from "ngeohash"

const inter = Inter({ subsets: ['latin'] })

type UserLocation = {
  lat: number,
  long: number,
  hash: string
}

export default function Home() {
  const loremText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos est corporis, vero delectus provident id quam ipsam quis obcaecati eius, eveniet possimus veritatis eligendi enim natus laborum? Provident, quibusdam nulla!"
  const [position, setPosition] = useState({} as UserLocation)
  const [hasPosition, setHasPosition] = useState(false)
  function handlePosition(res: GeolocationPosition) {
    setPosition({lat: res.coords.latitude, long: res.coords.longitude,
       hash: geohash.encode(res.coords.latitude, res.coords.longitude, 4)})
    setHasPosition(true)
  }
  function handlePositionErr(err: any) {
    console.log("Error: " + err)
    setHasPosition(false)
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handlePosition, handlePositionErr)}, [position])
  return (
    <>
        <div className="homePage m-0 pt-12 p-0">
          {
            hasPosition ? (
            <div className='flex flex-wrap gap-1 w-82 m-auto pb-12'>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
              <Card img='/favicon.ico' artist='test' date={"10-20-23"} href="/shows"/>
            </div>
            ) : (
              <div className='text-center text-txt-main pt-12'>
                <p className='text-2xl p-6'>Local Shows needs your location to get shows near you</p>
                <button className='p-1.5 bg-background-card rounded-md'>Get Location</button>
              </div>
            )
          }
        </div>
    </>
  )
}
