// @ts-nocheck
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide name!"],
            minlength: 3,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            require: [true, "Please provider email!"],
            unique: true,
            validate: {
                validator: validator.isEmail,
                message: "Please provider a valid email!",
            },
        },
        password: {
            type: String,
            trim: true,
            require: [true, "Please provider password!"],
            minlength: 6,
            select: true,
        },
        secret: {
            type: String,
            required: [true, "Please provider secret!"],
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        about: {
            type: String,
        },
        image: {
            url: {
                type: String,
            },
            public_id: {
                type: String,
            },
        },
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        follower: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ],
        role: {
            type: String,
            default: "Subscriber",
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

export default mongoose.model("User", userSchema);
