import { Router } from "express";

import { upload } from "../middleware/multer";
import { JWT } from "../middleware/token";
import { validateUser } from "../middleware/Validate";
import {  addFriendLogin, addFriendSignup, changePassword, createWave, getUserDetails, inviteFriend, latestWaves, login, signUp, updateUser } from "../controller/usercontroller";
const userRoutes = Router();

userRoutes.post("/signUp",signUp)
userRoutes.post("/login",login)
userRoutes.post("/inviteFriend",inviteFriend)
userRoutes.post("/addFriendLogin",JWT,addFriendLogin)
userRoutes.post("/addFriendSignup",JWT,addFriendSignup)
userRoutes.get("/getUserDetails",JWT,getUserDetails)
userRoutes.post('/createWave', 
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), JWT, // Accepts one video file
    createWave // The controller function
  );
  userRoutes.put("/changePassword",JWT,changePassword)
  userRoutes.put("/updateUser",upload.single("profilePhoto"),JWT,updateUser)
  export default userRoutes;

  userRoutes.get("/latestWaves",latestWaves)