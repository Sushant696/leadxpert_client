import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
  },
  passwordHash: {
    type: String,
    select: false,
  },

  authProviders: {
    google: { type: Boolean, default: false },
    password: { type: Boolean, default: true },
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  lastLoginAt: Date,

  deletedAt: Date,

  onboardingCompleted: {
    type: Boolean,
    default: false,
  },
})

export const User = mongoose.model("User", userSchema)
