import { Sequelize } from 'sequelize-typescript';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { User } from '../src/modules/users/user.model';
import { saltRounds } from '../src/core/config/saltRounds.config';
import { UserRole } from '../src/modules/users/users.interfaces';

config({ path: '../.env' });

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  models: [User],
});

async function seed() {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.',
    );

    await sequelize.sync();

    const adminUser = await User.findOne({ where: { email: 'admin@local' } });
    const hashedPassword = await bcrypt.hash('1234', saltRounds);

    if (!adminUser) {
      await User.create({
        name: 'admin',
        email: 'admin@local',
        password: hashedPassword,
        role: UserRole.ADMIN,
      });
      console.log('Admin user created successfully.');
    } else {
      console.log('Admin user already exists.');
    }

    // Cerrar la conexión
    await sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

seed();
