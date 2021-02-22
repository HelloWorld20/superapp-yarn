import app from "./app";
import * as config from "ww-config";

const host = config.get("host");
const port = config.get("port");

app.create().listen(port, () => {
  console.log(`${host} listening on ${port}`);
});
