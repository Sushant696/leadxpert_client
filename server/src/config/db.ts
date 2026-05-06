import mongoose from "mongoose";
import { env } from "./env"

const connectDB = async () => {
  try {
    const mongodbURI = env.MONGODB_URI || "";
    await mongoose.connect(mongodbURI)

    mongoose.connection.on("error", (err) => {
      console.log("Mongodb connection error", err)
    })

    mongoose.connection.on("disconnected", (err) => {
      console.log("Mongodb disconnected", err)
    })
    console.log("Mongodb connected successfully")
  } catch (error: any) {
    console.error(error)
    process.exit(1);
  }
}

export default connectDB

