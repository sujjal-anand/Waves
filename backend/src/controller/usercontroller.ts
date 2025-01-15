import { response } from "express";
import { Local } from "../env/config";
import { transporter } from "../middleware/mailer";
import Friends from "../models/Friends";
import Users from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Waves from "../models/Wave";
import Comments from "../models/Comments";
const jwtKey= Local.Secret_Key

export const signUp = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, phoneNo, password,userStatus } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await Users.create({
      firstName,
      lastName,
      email,
      phoneNo,
      userStatus,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};



export const login = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid crendentials" });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid crendentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, userStatus: user.userStatus },
        jwtKey,
        { expiresIn: "1h" } 
      );
  
      // Send response with token
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNo: user.phoneNo,
          userStatus: user.userStatus,
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "An error occurred during login" });
    }
  };



  export const inviteFriend = async (req: any, res: any) => {
    console.log(req?.body); // Log the incoming request body
    const { body } = req; // Accept array of objects with fullname, emails, and message
    const senderId = req?.user?.id;
  
    const checkEmailExists = async (email: string) => {
      // Find the user by email
      return await Users.findOne({ where: { email } });
    };
  
    const generateToken = (data: object): string => {
      const token = jwt.sign(data, jwtKey, { expiresIn: "1h" });
      return token;
    };
  
    const sendEmail = async (to: string, subject: string, html: string) => {
      const mailOptions = {
        from: "sujjalanand9877@gmail.com",
        to,
        subject,
        html,
      };
  
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ${info.response}`);
      } catch (error) {
        console.error(`Error sending email to ${to}:`, error);
      }
    };
  
    try {
      const promises = body.map(async (item: { fullname: string; emails: string; message: string }) => {
        const { emails: email } = item;
        const user = await checkEmailExists(email);
        let token: string;
        let invitationLink: string;
  
        if (user) {
          // If email exists, include the user's ID in the token
          await Friends.create({ senderfriendId: senderId, email, receiverfriendId: user.id });
          token = generateToken({ senderfriendId: senderId, email, receiverfriendId: user.id });
          invitationLink = `http://localhost:5173/login?token=${token}`;
        } else {
          // If email does not exist, include only the email in the token
          token = generateToken({ senderfriendId: senderId, email });
          invitationLink = `http://localhost:5173/?token=${token}`;
        }
  
        // Send the invitation email
        await sendEmail(
          email,
          "You're Invited by Your Friend!",
          `
          <html>
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4;">
              <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 5px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #333;">You're Invited, ${item.fullname}!</h1>
                <p style="color: #555;">Your friend has shared the following message:</p>
                <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 5px solid #007BFF; margin: 10px 0; color: #555;">${item.message}</blockquote>
                <p style="color: #555;">Here is the invitation link shared by your friend:</p>
                <a href="${invitationLink}" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px; margin-top: 10px;">Accept Invitation</a>
                <p style="color: #555; margin-top: 20px;">Click the link above to join us and get started!</p>
                <p style="color: #333;">Best regards,<br>Team</p>
              </div>
            </body>
          </html>
          `
        );
      });
  
      await Promise.all(promises);
  
      res.status(200).json({ message: "Invitation emails sent successfully." });
    } catch (error) {
      console.error("Error in inviteFriend:", error);
      res.status(500).json({ error: "Failed to send invitation emails." });
    }
  };
  
  
   
  
  export const addFriendLogin = async (req: any, res: any) => {
    try {
      // Destructure senderfriendId and receiverfriendId from req.user
      const { senderfriendId, receiverfriendId, email: userEmail } = req?.user;
  
      // Destructure email from req.body
      const { email } = req?.body;
  
      // Check if the email matches the logged-in user's email
      if (userEmail !== email) {
        return res.status(403).json({
          message: "Kindly log in with the same email to accept the request",
        });
      }
  
      // Validate senderfriendId and receiverfriendId
      if (!senderfriendId || !receiverfriendId) {
        return res.status(400).json({
          message: "Sender ID and Receiver ID are required.",
        });
      }
  
      // Update the friend request status to 'Accepted'
      const [updatedRows] = await Friends.update(
        { status: true }, // Update the status field to "Accepted"
        {
          where: {
            senderfriendId,  // Use senderfriendId in the condition
            receiverfriendId, // Use receiverfriendId in the condition
          },
        }
      );
  
      // Check if the friend request exists and was updated
      if (updatedRows === 0) {
        return res.status(404).json({
          message: "Friend request not found or already accepted.",
        });
      }
  
      // Return a success response
      return res.status(200).json({
        message: "Friend request accepted successfully.",
      });
    } catch (error) {
      console.error("Error in addFriendLogin:", error);
      return res.status(500).json({
        message: "An error occurred while updating the friend request.",
      });
    }
  };
  
  

  
export const addFriendSignup = async (req: any, res: any) => {
    try {
      const { senderfriendId}  = req?.user; // Extracting senderfriendId from the request body
      const { receiverfriendId } = req?.body; // Extracting receiverfriendId from authenticated user (assuming JWT middleware adds this)
    
      // Ensure both IDs are provided
      if (!senderfriendId || !receiverfriendId) {
        return res.status(400).json({ message: "Both sender and receiver IDs are required." });
      }
  
      // Create a new friend record
      const newFriend = await Friends.create({
        senderfriendId,
        receiverfriendId,
        status: true, // Setting status to true as per your logic
      });
  
      return res.status(201).json({ 
        message: "Friendship created successfully.", 
        data: newFriend 
      });
    } catch (error: any) {
      console.error("Error adding friend signup:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  

export const getUserDetails = async (req: any, res: any) => {
    try {
      const { id } = req?.user;
  
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Fetch the full details of the current user
      const user = await Users.findOne({
        where: { id },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Find all friend records where the user is either sender or receiver
      const friends = await Friends.findAll({
        where: {
          [Op.or]: [
            { senderfriendId: id },
            { receiverfriendId: id },
          ],
        },
      });
  
      if (!friends || friends.length === 0) {
        return res.status(200).json({
          user,
          friends: [],
          waves: [],
          message: "No friends or waves found for this user",
        });
      }
  
      // Extract the IDs of the friends (other user)
      const friendIds = friends.map((friend: any) =>
        friend.senderfriendId === id ? friend.receiverfriendId : friend.senderfriendId
      );
  
      // Fetch full details of all the other users (friends)
      const friendDetails = await Users.findAll({
        where: {
          id: { [Op.in]: friendIds },
        },
      });
  
      // Fetch waves for the current user
      const userWaves = await Waves.findAll({
        where: {
          userId: id,
        },
      });
  
      // Fetch waves for all friends
      const friendWaves = await Waves.findAll({
        where: {
          userId: { [Op.in]: friendIds },
        },
      });
  
      // Return user details, friends, and waves
      return res.status(200).json({
        user,
        friends: friendDetails,
        waves: {
          userWaves,
          friendWaves,
        },
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  };

  
  
export const createWave = async (req: any, res: any) => {
    try {
      const { image, video } = req?.files ;
      const { text } = req?.body;
      const{id}=req?.user
  
      // Save the wave data, including the paths of image and video
      const response = await Waves.create({
        text,
        image: image ? image[0].path : null,  // Use the path of the first image file
        video: video ? video[0].path : null,   // Use the path of the first video file
        userId:id
      });
  
      res.status(200).json({ message: 'Wave created successfully!', data: response });
    } catch (error) {
      console.error('Error creating wave:', error);
      res.status(500).json({ error: 'Failed to create wave.' });
    }
  };
  

  
export const changePassword = async (req: any, res: any) => {
    const { id } = req.user; // Extract user ID from authenticated user
    const { prevPassword, newPassword } = req.body;
  
    try {
      // Find the user by ID
      const user = await Users.findOne({ where: { id } });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Compare the provided password with the stored password
      const isMatch = await bcrypt.compare(prevPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Previous password is incorrect.' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      // Update the user's password
      await user.update({ password: hashedPassword });
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Failed to change password. Please try again.' });
    }
  };
  
 
  
export const updateUser = async (req: any, res: any) => {
    try {
      // Extract user ID and other fields from the request
      const { id } = req.user; // Assuming `req.user` contains the authenticated user's details
      const { 
        firstName,
        lastName,
        email,
        phoneNo,
        addressOne,
        addressTwo,
        city,
        state,
        zipCode,
        dob,
        gender,
        maritalStatus,
        socialSecurity,
        social,
        kids
      } = req.body;
  
      // Extract profile photo path if uploaded
      const {profilePhoto}=req?.file
  
      // Update user details in the database
      const [updatedRowCount] = await Users.update(
        {
          firstName,
          lastName,
          email,
          phoneNo,
          addressOne,
          addressTwo,
          city,
          state,
          zipCode,
          dob,
          gender,
          maritalStatus,
          socialSecurity,
          social,
          kids,
          profilePhoto: profilePhoto ? profilePhoto[0].path : null,
        },
        {
          where: { id },
        }
      );
  
      // Check if any rows were updated
      if (updatedRowCount === 0) {
        return res.status(404).json({ message: "User not found or no changes made" });
      }
  
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "An error occurred while updating the user", error });
    }
  };
 
  

export const latestWaves = async (req: any, res: any) => {
    try {
      const waves = await Waves.findAll({
        limit: 6,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Users, // Associated Users model
            as:"userWave",
            attributes: ["id", "firstName", "lastName", "email", "profilePhoto"], // Select specific fields
          },
        ],
      });
  
      return res.status(200).json({
        message: "Latest waves fetched successfully",
        data: waves,
      });
    } catch (error) {
      console.error("Error fetching latest waves:", error);
      return res.status(500).json({
        message: "An error occurred while fetching the latest waves",
        error,
      });
    }
  };

 
  
export const addComment = async (req: any, res: any) => {
    try {
      const { id } = req.user || {}; // Extract user ID from the token
      const { waveId, comment } = req.body;
  
      // Validate required fields
      if (!id) {
        return res.status(401).json({ error: "Unauthorized. User ID not found." });
      }
  
      if (!waveId || !comment) {
        return res.status(400).json({ error: "Wave ID and comment are required." });
      }
  
      // Create a new comment
      const response = await Comments.create({ userId: id, waveId, comment });
  
      // Send success response
      return res.status(201).json({
        message: "Comment added successfully",
        data: response,
      });
    } catch (error:any) {
      console.error("Error adding comment:", error);
  
      // Handle errors
      return res.status(500).json({
        error: "An error occurred while adding the comment",
        details: error.message,
      });
    }
  };
  