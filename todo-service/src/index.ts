import "reflect-metadata";
import "dotenv/config";

import { initConnection } from "./db/connection";

import startServer from "./server/startServer"

initConnection().then(() => {
    startServer();
})