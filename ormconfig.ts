
import { DataSource } from "typeorm"

// import dotenv from "dotenv";
// dotenv.config()


const dataSourceConfig = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  url: "postgres://dauleturumbaev:Daka9711@127.0.0.1:5432/postgres",
  username: "dauleturumbaev",
  password: "Daka9711!",
  database: "postgres",
  entities: [__dirname + "/src/**/entities/*.entity{.ts,.js}"],
  migrations: ['src/migrations/*{.ts}'],
  synchronize: true,
  migrationsRun: true,
});

dataSourceConfig
  .initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  })

export default dataSourceConfig;
