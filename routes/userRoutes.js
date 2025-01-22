const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getUsers);
// router.get("/add", userController.addUserForm);
router.post("/add", userController.addUser);
router.get("/edit/:id", userController.editUserForm);
router.put("/edit/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/search", userController.searchUsers);
router.get("/globalSearch", userController.globalSearchUsers);

module.exports = router;
