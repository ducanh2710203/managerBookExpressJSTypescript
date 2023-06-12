import "reflect-metadata"
import { DataSource } from "typeorm";
export const AppDataSource = new DataSource({
    type : "mysql",
    host : "localhost",
    username : "root",
    database : "dbtest",
    password : "123456",
    synchronize: false,
    logging: false,
    entities: ["dist/src/entity/*.js"],
    migrations: ["dist/src/migrations/*.js"],
})
