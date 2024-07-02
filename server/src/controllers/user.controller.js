import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "./../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); //i validating it  no need to again validation so .
    return { accessToken, refreshToken };
  } catch (error) { }
};

const registration = asyncHandler(async (req, res) => {
  /*
    - get user details from frontend
    - validations - check it not empty
    - check if user already exists: user ,email
    - create user object - create entry in DB
    - remove password and refresh token field from responses
    - check for user creation
    - return res
    */

  const { email, password, fullName, isAdmin, adminId } = req.body;
  function generateUsername(fullName) {

    const randomNumber = Math.floor(Math.random() * 100); // Generates a random number between 0 and 9999
    const username = `${fullName?.trim()}${randomNumber}`;
    return username;
  }
  const username = generateUsername(fullName);
  console.log({
    email: email,
    username: username,
    password: password,
    fullName: fullName,
    isAdmin: isAdmin,
    adminId: adminId
  });

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "field is missing or empty 🫠", res);
  }
  let adminStatus;
  if (isAdmin !== "admin") {
    if (adminId?.trim() !== "") {
      adminStatus = await User.findOne({
        $or: [{ username: adminId }, { email: adminId }],
      });
      if (!adminStatus) {
        throw new ApiError(404, `Admin reference account not found with is admin Id ${adminId} 🫠 `, res);
      }
    }
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with mail or  username already exists 🫠", res);
  }

  const user = await User.create({
    fullName,
    username: username?.toLowerCase(),
    email,
    accountType: isAdmin,
    adminId: adminId ? adminStatus?._id : "",
    password,
  });

  const createdUser = await User.findById(user.id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong 🫠 while registering user", res);
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully ✅"));
});

const loginUser = asyncHandler(async (req, res) => {
  /* 
- req body data
- find username email in DB
- check password match
- if match make  refresh token send data with it 
- send cookies
*/

  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required 🫠..", res);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user does not exist .🫠..", res);
  }


  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials 🫠..", res);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  const options = { httpOnly: true, secure: true }; //only modifiable  by server

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken, refreshToken },
        "user logged in successfully ✅"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  /*
  use cookies to find user 
  find user by id
  clear cookies and refreshToken of user

  */
  User.findByIdAndUpdate(
    req.user._id,
    {
      // $set: { refreshToken: undefined },
      $unset: {
        refreshToken: 1, //this will removes refreshToken from document
      },
    },
    { new: true }
  );

  const options = { httpOnly: true, secure: true }; //only modifiable  by server

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logout in successfully ✅"));
});

const refreshTokenToAccessToken = asyncHandler(async (req, res) => {
  const IncomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;
  if (!IncomingRefreshToken) {
    throw new ApiError(401, "unauthorized request 🫠", res);
  }

  try {
    const decodedRefreshToken = jwt.verify(
      IncomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedRefreshToken?._id);

    if (!user) throw new ApiError(401, "Invalid Refresh token User Not found ");

    if (IncomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used 🫠", res);
    }
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    const options = { httpOnly: true, secure: true }; //only modifiable  by server

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed and stored ✅"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token 🫠", res);
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(401, "Invalid email or password 🫠", res);
  }

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(401, " Incorrect old password 🫠", res);
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully ✅"));
});



const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user fetched successfully ✅"));
});


export {
  registration,
  loginUser,
  logoutUser,
  refreshTokenToAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  getCurrentUser,

};
