// 404.js
import Head from 'next/head'
import Link from 'next/link'

export default function FourOhFour() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className='sr-only'>404 - Page Not Found</h1>
        <img src='/assets/monster404.svg' alt='not-found' className="w-64 sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/4 2xl:w-1/5 h-auto" />
        <Link href="/">
          <a className='mt-8 px-8 py-4 bg-primary text-white font-semibold rounded-lg'>Go back home</a>
        </Link>
      </div>
    </>
  )
}
