import express from "express";
import requireSignIn from "../middleware/authentication.js";
import isAdmin from "../middleware/isAdmin.js";
import {
    register,
    login,
    updateUser,
    currentUser,
    ForgotPassword,
    addFollower,
    userFollower,
    findPeople,
    userFollowing,
    removeFollower,
    userUnFollower,
    searchUser,
    getInformationUser,
    allUsers,
    deleteUserWithAdmin,
    listUserFollower,
} from "./../controllers/auth.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    res.json({ msg: "Auth" });
});

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(ForgotPassword);

// user
router.route("/current-user").get(requireSignIn, currentUser);
router.route("/update-user").patch(requireSignIn, updateUser);

//admin
router.route("/current-admin").get(requireSignIn, isAdmin, currentUser);
router
    .route("/admin/delete-user/:id")
    .delete(requireSignIn, isAdmin, deleteUserWithAdmin);

router.route("/user-following/:id").get(requireSignIn, userFollowing);
router.route("/user-follower/:id").get(requireSignIn, listUserFollower);

router.route("/find-people").get(requireSignIn, findPeople);

router.route("/search-user/:query").get(requireSignIn, searchUser);

router.route("/user-follow").put(requireSignIn, addFollower, userFollower);

router.route("/all-users").get(requireSignIn, isAdmin, allUsers);

router.route("/:id").get(requireSignIn, getInformationUser);

router.route("/user-unfollow").put(requireSignIn, removeFollower, userUnFollower);

export default router;
