require('dotenv').config();
const { Sequelize } = require('sequelize');
const app = require('./app');
const sequelize = require('./config/database');
const bcrypt = require('bcrypt');
const User = require('./modules/users/user.model');
const Member = require('./modules/members/member.model');
const dummyMembers = require('./migrations/memberData');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const bootstrap = new Sequelize(
      '',
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
      }
    );

    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`
       CHARACTER SET utf8mb4
       COLLATE utf8mb4_unicode_ci`
    );

    await bootstrap.close();

    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync();
    console.log('Database synced');

    const DEFAULT_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || 'adib@example.com';
    const DEFAULT_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || 'password123';

    const existing = await User.findOne({ where: { email: DEFAULT_EMAIL } });
    if (!existing) {
      const hashed = await bcrypt.hash(DEFAULT_PASSWORD, 10);
      await User.create({ email: DEFAULT_EMAIL, password: hashed });
    }

    for (const m of dummyMembers) {
      const existingMember = await Member.findOne({ where: { email: m.email } });
      if (!existingMember) {
        await Member.create(m);
      }
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
})();
