import mongoose from "mongoose";

// Connecting db
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`DB Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
