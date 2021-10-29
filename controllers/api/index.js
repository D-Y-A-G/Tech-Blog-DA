const router = require("express").Router();
const commentRoutes = require("./api/commentRoutes"); //setting up route
const blogRoute = require("./api/blogpost.js");

router.use("/comments", commentRoutes); // defining htpp and variable
router.use("/blogpost", blogRoute);

module.exports = router;
