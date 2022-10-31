import User from "./../models/user.js";
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(400).json({msg: "No user found!"});
        }
        if (user.role !== "Admin") {
            return res.status(403).json({msg: "Unauthentication"});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Something went wrong. Try again!"});
    }
};

export default isAdmin;
