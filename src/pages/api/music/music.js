import { getMusic } from "@/lib/mongo/music";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const musicId = req.query.id; // Assuming the ID is passed as a query parameter

      const { music, error } = await getMusic();
      const game = music.find((music) => music.id === musicId); // Modify this line to find the music by ID
      if (!music) {
        return res.status(404).json({ error: "Music not found" });
      }

      return res.status(200).json({ music });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
