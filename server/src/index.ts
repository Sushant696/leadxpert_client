import { env } from "./config/env";
import app from "./server";

app.listen(env.PORT || 5500, () => {
  console.log("Listening on port: ", env.PORT)
})
