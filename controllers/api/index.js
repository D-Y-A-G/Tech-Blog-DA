const router = require("express").Router();
const commentRoutes = require("./commentRoutes"); //setting up route
const blogRoute = require("./blogRoutes");
const userRoute = require("./userRoutes");


router.use("/comments", commentRoutes); // defining htpp and variable
router.use("/blogRoutes", blogRoute);
router.use("/users", userRoute);

module.exports = router;
