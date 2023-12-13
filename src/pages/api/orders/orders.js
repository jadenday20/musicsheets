import { getOrders, placeOrder } from "@/lib/mongo/orders";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { orders, error } = await getOrders();
      if (error) throw new Error(error);

      return res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      // Assuming you receive the order details in the request body
      const { order, error } = await placeOrder(req.body);
      if (error) throw new Error(error);

      return res.status(201).json({ order });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(425).end(`Method ${req.method} is not allowed.`);
};

export default handler;
