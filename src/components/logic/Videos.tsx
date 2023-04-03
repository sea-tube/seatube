import { EyeIcon } from '@heroicons/react/solid'
import { useEffect, useRef, useState } from 'react'
import { VideoMetadata } from 'types/video'

// Set thumb
function thumbPosition(time: number) {
  const thumb_interval = 5
  const row_size = 10
  const width = 188,
    height = 80
  time = Math.round(time / thumb_interval)
  const frameY = Math.round(time / row_size)
  const frameX = time - row_size * frameY
  const frameTop = frameY * height
  const frameLeft = frameX * width
  const position = `-${frameLeft}px -${frameTop}px`
  //thumbnailRef.current.style.backgroundPosition = position;
  return position
}

export function VideoItem({ metadata }: {metadata: VideoMetadata}) {
  const [isMouseOver, setIsMouseOver] = useState(false)
  const duration = 780

  const thumbsRef = useRef<HTMLDivElement>(null)

  const [previewTime, setPreviewTime] = useState<string>('0:00')

  const [startPreview, setStartPreview] = useState<number>(0)

  const videoPreview = async (start = 0) => {
    if (thumbsRef.current) {
      thumbsRef.current.style.backgroundPosition = thumbPosition(start)
    }
    await new Promise((r) => setTimeout(r, 500))
    setStartPreview(start + 5 > duration ? 0 : start + 5)
  }

  useEffect(() => {
    console.log('mouse over', isMouseOver)
    if (isMouseOver && metadata.properties.thumbs && thumbsRef.current) {
      videoPreview(startPreview)
    }
  }, [isMouseOver, metadata.properties.thumbs, startPreview])

  return (
    <div
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className="list-none mb-4"
    >
      <div className="relative group aspect-video block overflow-hidden sm:rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-primary-dark-muted focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <div className='w-full flex justify-center h-full'>
          <img
            src={metadata.image}
            alt=""
            className="pointer-events-none object-cover group-hover:opacity-75 h-full"
          />
        </div>

        {metadata.properties.thumbs && isMouseOver ? (
          <div className="w-full h-full absolute inset-0 bg-black transition-all duration-500 ease-in-out">
            {/* Player here */}
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center rounded absolute left-0 top-0 bg-black/60 opacity-0 hover:opacity-100" />
        )}
      </div>
      <div className="w-full mt-1 flex space-x-2 px-1">
        <img
          src="https://github.com/sea-tube.png"
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="text-base leading-5 break-words max-w-full font-medium">
            {metadata.name}
          </div>
          <div className="text-xs flex space-x-6 text-gray-600 mt-.5">
            <div>Tester Sea</div>
            <div className="flex items-center">
              4.3K <EyeIcon className="w-3 ml-1 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
