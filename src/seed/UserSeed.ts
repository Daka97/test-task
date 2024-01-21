
import { User, UserRole } from '../users/entities/user.entity';
import { Factory, Seeder } from 'typeorm-seeding';

export class AdminUserSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    return await factory(User)().create({
      username: 'admin',
      password: 'adminpassword',
      role: UserRole.DIRECTOR,
    });
  }
}
