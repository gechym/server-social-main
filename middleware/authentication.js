/** @format */

import jwt from "jsonwebtoken";

const requireSignIn = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.log("Authentication invalid with bearer!");
        return res
            .status(401)
            .json({msg: "Authentication invalid with bearer!"});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({msg: ""});
    }
    try {
        const payload = jwt.verify(token, process.env.JWT);
        // @ts-ignore
        req.user = {userId: payload._id};
        next();
    } catch {
        console.log("Authentication invalid with another error!");
        return res
            .status(401)
            .json({msg: "Authentication invalid with some error!! "});
    }
};

export default requireSignIn;
