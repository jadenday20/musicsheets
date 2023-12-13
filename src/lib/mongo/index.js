import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;

if (!URI) throw new Error("Please add URI to .env.local");

let client = new MongoClient(URI);
let clientPromise;

// async function run() {
//     try {
//         const database = client.db("")
//     }
// }

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
