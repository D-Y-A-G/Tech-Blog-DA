const router = require("express").Router();
const { Blogpost, User, Comments } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    //get all blogs, join with user data
    const blogData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: [""],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true })); //Serialize data to plain

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (res, req) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("loginRegister");
});

// router.get("/login/", withAuth, async (req, res) => {
//   try {
//     const blogData = await Blogpost.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const blog = blogData.get({ plain: true });

//     res.render("blogpost", {
//       ...blog,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/Blogpost/:id", withAuth, async (res, req) => {
  try {
    // Find the logged in user based on the session ID
    const blogData = await Blogpost.findByPk(req.params.id, {
      include: [
        {
          model: Blogpost,
          attributes: ["id", "blog_text", "blog_title", "post_date", "user_id"],
          include: { model: User, attributes: ["name"] },
        },
      ],
    });

    const blogInfo = blogData.get({ plain: true });

    res.render("dashboard", {
      ...blogInfo,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Using withAuth to prevent access
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("loginRegister");
});

router.get("/profile", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("dashboard");
});

module.exports = router;
