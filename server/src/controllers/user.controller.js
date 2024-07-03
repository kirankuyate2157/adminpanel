import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CRMUser } from "./../models/user.model.js";
import jwt from "jsonwebtoken";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await CRMUser.findById(userId);
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

  const { email, password, firstName, lastName, isAdmin = "admin", adminId } = req.body;

  console.log({
    email: email,
    password: password,
    firstName,
    lastName,
    isAdmin: isAdmin,
    adminId: adminId
  });

  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "field is missing or empty 🫠", res);
  }
  let adminStatus;
  if (isAdmin !== "admin") {
    if (adminId?.trim() !== "") {
      adminStatus = await CRMUser.findOne({ email: adminId });
      if (!adminStatus) {
        throw new ApiError(404, `Admin reference account not found with is admin Id ${adminId} 🫠 `, res);
      }
    }
  }

  const existedUser = await CRMUser.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with mail  already exists 🫠", res);
  }

  const user = await CRMUser.create({
    firstName, lastName,
    email,
    accountType: isAdmin,
    adminId: adminId ? adminStatus?._id : "",
    password,
  });

  const createdUser = await CRMUser.findById(user.id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong 🫠 while registering user", res);
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully ✅"));
});

const registrationMember = asyncHandler(async (req, res) => {
  /*
    - get user details from frontend
    - validations - check it not empty
    - check if user already exists: user ,email
    - create user object - create entry in DB
    - remove password and refresh token field from responses
    - check for user creation
    - return res
    */

  const { email, password, firstName, lastName, isAdmin = "member" } = req.body;
  const adminId = req.user._id;

  console.log({
    email: email,
    password: password,
    firstName,
    lastName,
    isAdmin: isAdmin,
    adminId
  });

  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "field is missing or empty 🫠", res);
  }
  let adminStatus;
  if (isAdmin !== "admin") {
    if (adminId) {
      adminStatus = await CRMUser.findById(adminId);
      if (!adminStatus) {
        throw new ApiError(404, `Admin reference account not found with is admin Id ${adminId} 🫠 `, res);
      }
    }
  }

  const existedUser = await CRMUser.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User with mail  already exists 🫠", res);
  }

  const user = await CRMUser.create({
    firstName, lastName,
    email,
    accountType: isAdmin,
    adminId: adminId ? adminStatus?._id : req.user._id,
    password,
  });

  const createdUser = await CRMUser.findById(user.id).select(
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

  const user = await CRMUser.findOne({ email });

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
  const loggedUser = await CRMUser.findById(user._id).select(
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
  CRMUser.findByIdAndUpdate(
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

    const user = await CRMUser.findById(decodedRefreshToken?._id);

    if (!user) throw new ApiError(401, "Invalid Refresh token CRMUser Not found ");

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

  const user = await CRMUser.findById(req.user?._id);

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

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName } = req.body;
  const { id } = req.params;

  if (!firstName || !lastName) {
    throw new ApiError(400, "All field are required 🫠", res);
  }

  if (req.user.isAdmin !== "admin") {
    throw new ApiError(400, "unauthorized operations Admin can only Edit🫠", res);
  }
  if (req.user._id && id) {
    const member = await CRMUser.findById(id);

    if (member && member.adminId != req.user._id) {
      throw new ApiError(400, "unauthorized operations only member`s Admin can Edit 🫠", res);
    }
  }

  let user;

  if (id) {
    user = await CRMUser.findByIdAndUpdate(id,
      {
        $set: { firstName: firstName, lastName: lastName },
      },
      { new: true }
    ).select("-password");
  }
  else {
    user = await CRMUser.findByIdAndUpdate(
      req.user?._id,
      {
        $set: { firstName: firstName, lastName: lastName },
      },
      { new: true }
    ).select("-password");

  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "Account details updated successfully ✅")
    );
});



export {
  registration,
  loginUser,
  logoutUser,
  refreshTokenToAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  registrationMember
};
