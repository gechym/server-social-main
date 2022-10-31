import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        members: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        content: [
            {
                text: String,
                image: {
                    url: String,
                    public_id: String,
                    default: {
                        url: "",
                        public_id: "",
                    },
                },
                created: {
                    type: Date,
                    default: Date.now,
                },
                like: {
                    type: Boolean,
                    default: false,
                },
                sentBy: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
                reply: {
                    type: mongoose.Types.ObjectId,
                    ref: "Message",
                },
                seen: [
                    {
                        type: mongoose.Types.ObjectId,
                        ref: "User",
                    },
                ],
            },
        ],
    },
    {timestamps: true}
);

export default mongoose.model("Message", messageSchema);
