import mongoose from "mongoose";

// Connecting db
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then(() => console.log("DB Connected"))
    .catch((e) => console.log(e));
};
