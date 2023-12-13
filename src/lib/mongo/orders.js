import clientPromise from "./index";
import { BSON } from "mongodb";

let client;
let db;
let orders;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db("Sheetorders");
    orders = await db.collection("Orders");
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

export async function getOrders() {
  try {
    if (!orders) await init();

    // Use toArray directly on the find method to get an array of orders
    const result = await orders.find({}).toArray();

    // Convert ObjectId to string in each game object
    const ordersWithIdAsString = result.map((orders) => ({
      ...orders,
      _id: orders._id.toString(),
    }));

    return { orders: ordersWithIdAsString };
  } catch (error) {
    return { error: "Failed to fetch orders!" };
  }
}

export async function getOrdersById(id) {
  try {
    if (!orders) await init();

    // Find the orders by its ID
    //   const result = await orders.findOne({ _id: ObjectId(id) });
    // const result = await orders.findById(ObjectId(id) );
    const result = await orders.findOne({ _id: new BSON.ObjectId(id) });

    if (!result) {
      return { error: "orders not found!" };
    }

    // Convert ObjectId to string in the orders object
    const ordersWithIdAsString = { ...result, _id: result._id.toString() };

    return { orders: ordersWithIdAsString };
  } catch (error) {
    return { error: "Failed to fetch orders!" };
  }
}

export async function getOrdersByName(name) {
  try {
    if (!orders) await init();

    // Find the orders by its name
    const result = await orders.findOne({ name: name });

    if (!result) {
      return { error: "orders not found!" };
    }

    // Convert ObjectId to string in the orders object
    const ordersWithIdAsString = { ...result, _id: result._id.toString() };

    return { orders: ordersWithIdAsString };
  } catch (error) {
    return { error: "Failed to fetch orders!" };
  }
}
