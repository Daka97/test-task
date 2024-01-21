import { Factory, runSeeder, tearDownDatabase, useSeeding } from 'typeorm-seeding';
import { AdminUserSeed } from './UserSeed';
import dataSourceConfig from '../../ormconfig';


async function run(): Promise<any> {
  const connection = dataSourceConfig ; // Ensure your TypeORM connection is created
  await useSeeding()
  await runSeeder(AdminUserSeed)

  tearDownDatabase()
  // Close the connection after seeding
}

run();


