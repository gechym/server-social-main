import express from "express";

import { getAllMessages, sendMassage, isRead } from "../controllers/message.js";

const router = express.Router();

router.route("/").get(async (req, res) => {
    res.json({ msg: "API message" });
});

router.route("/get-all-messages").get(getAllMessages);
router.route("/send-message").put(sendMassage);
router.route("/is-read").get(isRead);

export default router;
