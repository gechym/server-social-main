import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        image: {
            url: {
                type: String,
            },
            public_id: String,
        },
        likes: [{type: mongoose.Types.ObjectId, ref: "User"}],
        comments: [
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
                postedBy: {
                    type: mongoose.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
    },
    {timestamps: true}
);

export default mongoose.model("Post", postSchema);
