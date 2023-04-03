import Player from 'components/Player/Player'

import {
  BadgeCheckIcon,
  BellIcon,
  DotsHorizontalIcon,
  EyeIcon,
  ShareIcon,
  ShoppingBagIcon,
  ThumbUpIcon,
  TrendingUpIcon,
} from '@heroicons/react/solid'
import Avatar from './layout/avatar'
import { NewComment } from './Comments'
import { VideoProperties } from 'types/video'
import { getUrlGateway } from 'utils/video'
import axios from 'axios'
import { useQuery } from 'react-query'
import { VideoItem } from './logic/Videos'
import Link from 'next/link'

export default function VideoSection({
  metadataCid,
  videoCid,
  metadata,
}: VideoProperties) {
  const { data: similarVideos } = useQuery('/api/videos', () =>
    axios.get('/api/videos').then((res) => res.data),
    {
        initialData: []
    }
  )

  return (
    <div className="w-full">
      <div
        id="columns"
        className="w-full flex flex-col md:flex-row mx-auto"
        style={{ maxWidth: 1280 }}
      >
        <div id="primary" className="w-full md:w-3/4 sm:items-right">
          <div>
            <Player
              source={getUrlGateway(videoCid)}
              poster={metadata.image}
              type={metadata.properties.type || 'mp4'}
              mediaResolution={{ width: 1024, height: 436 }}
            />

            <div className="py-2 px-4 sm:px-1">
              <h2 className="text-2xl font-medium break-words py-1">
                {metadata.name}
              </h2>
              <div className="flex flex-wrap items-center justify-between space-y-2 sm:space-y-0 text-sm text-gray-600">
                <div className="flex space-x-4">
                  <div className="flex">
                    <EyeIcon className="w-5 text-slate-500 mr-1" />
                    <span>734K Views</span>
                  </div>
                  <span className="text-slate-400">|</span>
                  <div>26 Jun 2022</div>
                </div>
                <div className="flex space-x-8 mr-12 text-center font-bold">
                  <button className="group flex items-center">
                    <ThumbUpIcon className="w-8 text-slate-500 group-hover:text-primary mr-1 -mt-2" />
                    <span>12K</span>
                  </button>
                  <button className="group flex items-center">
                    <ShareIcon className="w-8 text-slate-500 group-hover:text-primary mr-1" />
                    <span>Share</span>
                  </button>
                  <div className="flex items-center">
                    <DotsHorizontalIcon className="w-8 text-slate-400 mr-1" />
                  </div>
                </div>
              </div>
              <div className="py-2">
                <p>{metadata.description}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between space-y-2 sm:space-y-0 sm:px-1">
            <div className="author bg-white rounded-lg py-2 px-4 ring-1 ring-slate-900/5 w-fit">
              <div className="flex space-x-4 items-center">
                <Avatar
                  url={
                    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=128&h=128&q=80'
                  }
                />
                <div>
                  <div className="flex text-lg font-medium">
                    Whitney Francis{' '}
                    <BadgeCheckIcon className="w-5 text-slate-600" />{' '}
                  </div>
                  <div className="text-sm text-gray-600">32K Subscribers</div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-muted"
                  >
                    <BellIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Subscribe!
                  </button>
                </div>
              </div>
            </div>
            <div className="nft bg-white rounded-lg py-2 px-4 ring-1 ring-slate-900/5 w-fit">
              <div className="flex space-x-4 items-center">
                <Avatar url={'/assets/nft.webp'} />
                <div>
                  <div className="flex text-base font-bold">
                    You can buy this NFT video!
                  </div>
                  <div className="flex text-base font-medium">
                    Last Bid: US$ 120{' '}
                    <TrendingUpIcon className="w-5 text-slate-600" />{' '}
                    <span className="text-sm font-normal ml-1">(24 bids)</span>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-muted"
                  >
                    <ShoppingBagIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Buy!
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="comments my-8 px-4 sm:w-2/3 hidden sm:block">
            <NewComment />
          </div>

          <div className="w-full border border-gray-200 p-4 my-2 bg-white">
            <div className="flex space-x-4 justify-between">
              <span className="font-medium">134 Comments</span>
              <span className="text-sm text-gray-600">
                Sort by: <span className="text-primary">Newest</span>
              </span>
            </div>
          </div>
        </div>

        <div id="secondary" className="w-full md:w-64 lg:w-80 pt-4 sm:pt-0">
          {/* Videos */}
          <ul className="px-2 sm:px-8 flex flex-col items-center">
            {similarVideos.map((props: VideoProperties, id: number) => (
              <li key={id}>
                <Link href={`/watch/${props.metadataCid}`}>
                  <a>
                    <VideoItem metadata={props.metadata} />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
