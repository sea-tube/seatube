import Head from 'next/head'
import Layout from 'components/layout'
import { VideoItem, videosData } from 'components/logic/Videos'
import Player from 'components/Player'
import { isCid } from 'utils/Verify'
import { NewComment } from 'components/Comments'
import Avatar from 'components/layout/avatar'
import {
  BadgeCheckIcon,
  BellIcon,
  DotsHorizontalIcon,
  EyeIcon,
  PlayIcon,
  PlusIcon,
  ShareIcon,
  ShoppingBagIcon,
  ThumbUpIcon,
  TrendingUpIcon,
  XCircleIcon,
} from '@heroicons/react/solid'
import { GetStaticPropsContext } from 'next'
import { getVideoProperties } from 'utils/video'
import { Dialog, Slide, SwipeableDrawer } from '@mui/material'
import React, { useState } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { useRouter } from 'next/router'
import VideoSection from 'components/VideoSection'

interface WatchProps {
  cid: string
  video: {
    cid: string
    url: string
    poster: string
    type: 'hls' | 'mp4'
    metadata: any
  }
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} appear />
})

export default function Watch({ cid, video }: WatchProps) {
  const [toggleDrawer, setToggleDrawer] = useState(true)

  const router = useRouter()

  return (
    <>
      <Head>
        <title>SeaTube Watch</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        
        <VideoSection metadataCid={cid} video={video} />

        {!toggleDrawer && (
          <div className="fixed bottom-0 left-0 w-full border-t border-gray-100">
            <div className="flex h-16 justify-between items-center bg-white">
              <div
                className="flex items-center gap-2 flex-1"
                onClick={() => setToggleDrawer(true)}
              >
                <img src={video.poster} className="h-16 w-auto" />
                <div className="truncate">
                  <h3 className="truncate font-semibold text-sm">
                    {video.metadata.name}
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

    const video = await getVideoProperties(cid)

    console.log('properties', video)

    return {
      props: {
        cid,
        video,
      },
    }
  } catch (e) {
    console.error('error', e)
    return {
      notFound: true,
    }
  }
}
