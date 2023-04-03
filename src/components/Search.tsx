import { Fragment, useEffect, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { classNames } from 'utils'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import axios from 'axios'
import { VideoProperties } from 'types/video'

interface SearchBarProps {
  onFocus?: () => void
  onBlur?: () => void
}

export function SearchBar({ onFocus, onBlur }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const router = useRouter()

  const { data: videosData } = useQuery('/api/videos', () =>
    axios.get('/api/videos').then((res) => res.data),
    {
        initialData: [],
    }
  )

  const videos = videosData.map((props: VideoProperties, id) => ({
    id,
    name: props.metadata.name,
    href: `/watch/${props.metadataCid}`,
  }))

  const openVideo = (id: number | string) => {
    const video = videos.find((video) => video.id == id)
    setQuery(video.name)
    router.push(video.href)
    onBlur && onBlur()
  }

  const filteredvideos =
    query === ''
      ? []
      : videos.filter((video) => {
          return video.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <>
      <div className="w-full transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200 transition-all">
        <Combobox value={query} onChange={(id) => openVideo(id)}>
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute top-2.5 left-4 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <Combobox.Input
              className="h-10 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Search..."
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => onFocus && onFocus()}
            />
          </div>

          {filteredvideos.length > 0 && (
            <Combobox.Options
              static
              className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
            >
              {filteredvideos.map((video) => (
                <Combobox.Option
                  key={video.id}
                  value={video.id}
                  className={({ active }) =>
                    classNames(
                      'cursor-pointer select-none px-4 py-2',
                      active && 'bg-primary-light text-white',
                    )
                  }
                  onSelect={() => console.log(video.href)}
                >
                  {video.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {query !== '' && filteredvideos.length === 0 && (
            <p className="p-4 text-sm text-gray-500">No videos found.</p>
          )}
        </Combobox>
      </div>
    </>
  )
}

export default function Search() {
  const [open, setOpen] = useState(false)

  return open ? (
    <Transition.Root show={open} as={Fragment} appear>
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto p-2">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="max-w-full md:w-96 sm:pl-20 md:pl-0 mx-auto shadow-2xl">
              <SearchBar onBlur={() => setOpen(false)} />
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  ) : (
    <>
      <div className="hidden md:block w-64 md:w-80 lg:w-96">
        <SearchBar onFocus={() => setOpen(true)} />
      </div>
      <button className="md:hidden" onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </>
  )
}
