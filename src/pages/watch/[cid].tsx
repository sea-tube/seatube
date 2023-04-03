import Head from 'next/head'
import Layout from 'components/layout'
import { isCid } from 'utils/Verify'
import {
  XCircleIcon,
} from '@heroicons/react/solid'
import { GetStaticPropsContext } from 'next'
import React, { useState } from 'react'
import VideoSection from 'components/VideoSection'
import {  VideoProperties } from 'types/video'
import { getMetadata } from 'utils/video'

export default function Watch({ metadataCid, videoCid, metadata }: VideoProperties) {
  const [toggleDrawer, setToggleDrawer] = useState(true)

  return (
    <>
      <Head>
        <title>SeaTube Watch</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        
        <VideoSection metadataCid={metadataCid} videoCid={videoCid} metadata={metadata} />

        {!toggleDrawer && (
          <div className="fixed bottom-0 left-0 w-full border-t border-gray-100">
            <div className="flex h-16 justify-between items-center bg-white">
              <div
                className="flex items-center gap-2 flex-1"
                onClick={() => setToggleDrawer(true)}
              >
                <img src={metadata.image} className="h-16 w-auto" />
                <div className="truncate">
                  <h3 className="truncate font-semibold text-sm">
                    {metadata.name}
                  </h3>
                  <p className="truncate text-xs">Whitney Francis</p>
                </div>
              </div>
              <div className="flex space-x-4 px-4">
                <button className="flex items-center">
                  <XCircleIcon className="w-8 text-slate-500 mr-1" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const cid = ctx.params?.cid

    if (typeof cid !== 'string' || !isCid(cid)) {
      return {
        notFound: true,
      }
    }

    const metadata = await getMetadata(cid)

    return {
      props: {
        videoCid: metadata.properties.video.split('ipfs://')[1],
        metadataCid: cid,
        metadata,
      },
    }
  } catch (e) {
    console.error('error', e)
    return {
      notFound: true,
    }
  }
}
