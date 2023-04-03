import { listVideos } from "lib/videos";

export default async (req, res) => {
   try {
      const videos = await listVideos();
      res.status(200).json(videos);
   } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message });
   }
};