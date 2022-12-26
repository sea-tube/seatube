import Head from 'next/head'
import Layout from '../components/layout'
import { VideoItem, videosData } from '../components/logic/Videos'
import Categories from 'components/Categories'

const Home = () => {
  return (
    <>
      <Head>
        <title>SeaTube</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <div className="">
          <div
            className="sticky bg-gray-50 z-20 mb-4"
            style={{
              top: 56, // Navbar height,
            }}
          >
            <Categories
              categories={[
                'All',
                'Crypto',
                'Music',
                'Tech',
                'Art',
                'Sports',
                'News',
                'Humor',
                'Science',
                'Education',
                'Politics',
                'Entertainment',
                'Travel',
                'Food',
                'Games',
                'Other',
              ]}
              defaultValue="All"
            />
          </div>

          {/* Videos */}
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 3xl:grid-cols-6 grid-rows-2 gap-4"
          >
            {videosData.map((video, id) => (
              <VideoItem id={id} key={id} thumbs="/thumbs.png" />
            ))}
            {videosData.map((video, id) => (
              <VideoItem id={id} key={id} thumbs="/thumbs.png" />
            ))}
            {videosData.map((video, id) => (
              <VideoItem id={id} key={id} thumbs="/thumbs.png" />
            ))}
          </ul>
        </div>
      </Layout>
    </>
  )
}

export default Home
