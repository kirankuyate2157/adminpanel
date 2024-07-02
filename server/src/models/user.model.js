import mongoose from "mongoose";
import jwt from "jsonwebtoken"; //token for data user
import bcrypt from "bcrypt"; //password hashing..

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    avatar: { type: String, },
    coverImage: { type: String },
    accountType: {
      type: String,
      default: "admin",
      enum: {
        values: ["admin", "member"],
      },
    },
    adminId: { type: String },
    password: { type: String, required: [true, "Password is required"] },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

//passwords security works
// next for next passing after middler is done
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //if not password modified then skip it every time
  this.password = await bcrypt.hash(this.password, 10); //hash round 10
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //comparing  by  hashing internal and then comparing with this.pass
};

//jwt tokens generation for data
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      adminId: this.adminId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      adminId: this.adminId
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

//since user models already in DB so change name
export const CRMUser = mongoose.model("CRMUser", userSchema);
