import app from "./app";
import config from "./config/config";

app.listen(config.port, () => {
  console.log(`running on port ${config.port}`)
})