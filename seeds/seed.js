const sequelize = require("../config/connection");
const { User, Blogpost } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blogpost.create({
      title: blog.blog_title,
      user_name: blog.user_name,
      post_date: blog.post_date,
      blog_text: blog.blog_text,

      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
