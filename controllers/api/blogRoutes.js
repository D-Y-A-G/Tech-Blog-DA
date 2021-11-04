const router = require("express").Router();
const { Blogpost, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", async (req, res) => {
  try {
    const newBlog = await Blogpost.create({
      blog_title: req.body.blogTitle,
      blog_text: req.body.blogText,
      user_id: req.session.user_id,
      include: {
        model: User,
        attributes: ["user_id"],
      },
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

/////////////// Delete Blog /////////////////

router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blogpost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
