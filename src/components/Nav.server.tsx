import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
    const router = useRouter();
    return (
        <div className="bg-background-nav z-0 fixed bottom-0 left-0 md:bottom-auto md:top-0 w-full h-14 md:pl-20 text-txt-main font-semibold text-2xl md:text-l drop-shadow-lg">
            <div className="md:pl-44 flex justify-center md:justify-start">
                <div key="Account" className="mt-2 md:order-1">
                    {router.asPath === "/account" ? 
                    <Link href="/account" className="px-3 mx-3 text-txt-account">Account</Link> :
                    <Link href="/account" className="px-3 mx-3">Account</Link>   
                    }
                </div>
                <div key="Home" className="mt-2">
                    {router.asPath === "/home" ? 
                    <Link href="/home" className="px-3 mx-3 text-txt-home">Home</Link> :
                    <Link href="/home" className="px-3 mx-3">Home</Link>   
                    }
                </div>
                <div key="Shows" className="mt-2">
                    {router.asPath === "/shows" ? 
                    <Link href="/shows" className="px-3 mx-3 text-txt-shows">Shows</Link> :
                    <Link href="/shows" className="px-3 mx-3">Shows</Link>   
                    }
                </div>
            </div>
        </div>
    )
}