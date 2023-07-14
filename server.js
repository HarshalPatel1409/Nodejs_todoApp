// This will be our main file
// 1. Which will listen on the port
// 2. Also connect to DB
import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();
app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port: ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
