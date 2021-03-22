import { Connection, createConnection } from "typeorm"

let connection: Connection;

export const initConnection = async (drop: boolean = true) => {
    connection = await createConnection({
        name: "default",
        type: "postgres",
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entities/*.*"]
    })
}

const getConnection = () => connection;

export default getConnection;