const express = require("express");
const ctrl = require("../../controllers/users");
const {validateBody, authenticate, upload} = require("../../middlewares");
const {schemas} = require("../../models/user");
const router = express.Router();

router.post("/signup", validateBody(schemas.userSchema), ctrl.signup);

router.post("/login", validateBody(schemas.userSchema), ctrl.login);

router.get("/current", authenticate, ctrl.current);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, ctrl.subscriptionUpdate);

router.patch("/users/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.get("/users/verify/:verificationToken", ctrl.verification);

router.post("/users/verify/", validateBody(schemas.emailSchema), ctrl.verifyEmail);

module.exports = router;