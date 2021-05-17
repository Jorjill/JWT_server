const { createUser, getUsers, getUsersByUserId, deleteUser, updateUser,login } = require("./user.controller");
const router = require("express").Router();
const { checkTokenClient,checkTokenAdmin } = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/",checkTokenClient, getUsers);
router.get("/:id",checkTokenClient, getUsersByUserId);
router.patch("/",checkTokenAdmin, updateUser);
router.delete("/",checkTokenAdmin, deleteUser);
router.post("/login",login);

module.exports = router;