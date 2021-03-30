import app from "./app";
import config from './config'

const port = config.get("port");

// const host = 'http://localhost';
// const port = 4000

app.create().listen(port, () => {
  console.log(`listening on ${port}`);
});
