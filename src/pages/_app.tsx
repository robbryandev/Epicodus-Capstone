import Layout from '@/components/layout'
import './globals.css'

export default function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
    if (typeof window) {
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )
    } else {
        return (
            <div></div>
        )
    }
}