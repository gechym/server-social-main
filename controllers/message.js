import Message from "../models/message.js";
import cloudinary from "cloudinary";

// config cloud for upload img
cloudinary.v2.config({
    cloud_name: "",
    api_key: "",
    api_secret: "",
});

const getAllMessages = async (req, res) => {
    try {
        const userId = req.user.userId;
        const messages = await Message.find({ members: { $in: userId } })
            .populate(
                "members",
                "-password -secret -following -follower -role -updatedAt -email -createdAt -about -username"
            )
            .populate(
                "content.sentBy",
                "-password -secret -following -follower -role -updatedAt -email -createdAt -about -username"
            )
            .sort({ updatedAt: -1 });
        return res.status(200).json({ messages });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: `Something went wrong!Try again!` });
    }
};

const sendMassage = async (req, res) => {
    try {
        const userId = req.user.userId;
        let data = { sentBy: userId };
        const { receivedId, text, image } = req.body;
        const limit = req.body.limit || 10;
        if (!receivedId.length || receivedId.includes(null)) {
            return res
                .status(400)
                .json({ msg: `Something went wrong!Try again!` });
        }
        if (image) {
            data.image = image;
        }
        if (text) {
            data.text = text;
        }
        if (!image && !text) {
            return res.status(400).json({ msg: "Text or image is required!" });
        }
        // data.seen
        let message = await Message.findOneAndUpdate(
            {
                members: [...receivedId, userId].sort(),
            },
            {
                $addToSet: { content: data },
            },
            { new: true }
        ).populate(
            "content.sentBy",
            "-password -secret -following -follower -role -updatedAt -email -createdAt -about -username"
        ).populate("members", "-password -secret -following -follower -role -updatedAt -email -createdAt -about -username");

        if (!message) {
            message = await Message.create({
                members: [userId, ...receivedId].sort(),
                content: data,
            });
            message = await Message.findById(message._id).populate(
                "members",
                "-password -secret -following -follower -role -updatedAt -email -createdAt -about -username"
            )
                .populate(
                    "content.sentBy",
                    "-password -secret -following -follower -role -updatedAt -email -createdAt -about -username"
                );
        }


        return res.status(200).json({ message: message });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Something went wrong!Try again!" });
    }
};
const isRead = async (req, res) => {

}

export { getAllMessages, sendMassage, isRead };
