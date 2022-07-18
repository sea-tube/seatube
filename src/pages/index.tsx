import { useContext, useEffect } from "react"
import Head from "next/head"
import Page_header from "../components/layout/page_header"
import { useState } from "react"
import Layout from "../components/layout"
import Web3Context from "../contexts/Web3Context"
import AuthContext from "../contexts/AuthContext"
import Router from "next/router"
import Footer from "../components/layout/footer"
import Link from "next/link"
import Player from "../components/Player"

const Index = () => {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) setLoaded(true)
    }, [loaded])

    return (
        <>
            <Head>
                <title>SeaTube</title>
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet"></link>
            <div className="relative w-screen h-screen text-white flex items-center justify-center bg-primary-color">

                <div id="bg-cover" className="absolute top-0 left-0 w-screen h-screen bg-primary-color">
                    <img className="w-full max-h-full overflow opacity-40" src="https://images.unsplash.com/photo-1484387436194-cf7cb70800ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" />
                </div>

                <div className="w-1/2 text-center absolute">
                    <img src="/assets/logo.svg" className="w-2/3 m-auto" />
                    <div className="text-2xl dm-sans">Your Web3 video platform.</div>
                    <Link href="/home">
                        <a>
                            <button className="mt-16 rounded-xl px-8 py-2 text-xl bg-blue-400 dm-sans font-medium bg-special-color">
                                Get Started Now
                            </button>
                        </a>
                    </Link>


                </div>
            </div>
        </>
    )
}

export default Index
