import express from "express";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import type { Application, Request, Response } from "express";

import connectDB from "./config/db";
import rateLimiter from "./utils/rateLimiter";
import mainRouter from "./routes";
import { env } from "./config/env";
import { httpLogger } from "./lib/http-logger";


const app: Application = express()

app.use(rateLimiter)

app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json())
console.log(env.VERSION, "version")
app.use(`/${env.VERSION}/api/`, mainRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("leadXpert api home page!")
})

connectDB()

app.use(httpLogger)

export default app
