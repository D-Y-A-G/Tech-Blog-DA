const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blogpost, User, Comments } = require("../models");

const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const blogPost = await Blogpost.findAll({
      where: { user_id: req.session.user_id },
    });
    const blogs = blogPost.map((blogs) => blogs.get({ plain: true }));

    res.render("dashboard", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/comment/:id", withAuth, async (req, res) => {
  try {
    const blogPost = await Blogpost.findByPk({
      include: [
        {
          model: Comments,
          attributes: ["id", "blog_comment", "user_id", "post_date"],
          include: {
            model: User,
            attributes: ["user_name"],
          },
        },
      ],
    });
    const blogs = blogPost.map((blogs) => blogs.get({ plain: true }));

    res.render("dashboard", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
