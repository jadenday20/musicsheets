import clientPromise from "./index";
import { BSON } from "mongodb";

let client;
let db;
let music;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("SheetMusic");
    music = await db.collection("Music");
  } catch (error) {
    throw new Error(
      `Failed to establish connection to database: ${error.message}`
    );
  }
}

// Ensure the database connection is initialized
(async () => {
  await init();
})();

export async function getMusic() {
  try {
    if (!music) await init();

    // Use toArray directly on the find method to get an array of music
    const result = await music.find({}).toArray();

    // Convert ObjectId to string in each game object
    const musicWithIdAsString = result.map((music) => ({
      ...music,
      _id: music._id.toString(),
    }));

    return { music: musicWithIdAsString };
  } catch (error) {
    return { error: "Failed to fetch music!" };
  }
}

export async function getMusicById(id) {
  try {
    if (!music) await init();

    // Find the music by its ID
    //   const result = await music.findOne({ _id: ObjectId(id) });
    // const result = await music.findById(ObjectId(id) );
    const result = await music.findOne({ _id: new BSON.ObjectId(id) });

    if (!result) {
      return { error: "Music not found!" };
    }

    // Convert ObjectId to string in the music object
    const musicWithIdAsString = { ...result, _id: result._id.toString() };

    return { music: musicWithIdAsString };
  } catch (error) {
    return { error: "Failed to fetch music!" };
  }
}

export async function getMusicByName(name) {
  try {
    if (!music) await init();

    // Find the music by its name
    const result = await music.findOne({ name: name });

    if (!result) {
      return { error: "Music not found!" };
    }

    // Convert ObjectId to string in the music object
    const musicWithIdAsString = { ...result, _id: result._id.toString() };

    return { music: musicWithIdAsString };
  } catch (error) {
    return { error: "Failed to fetch music!" };
  }
}
