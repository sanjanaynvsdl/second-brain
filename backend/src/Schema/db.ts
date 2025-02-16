import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },

    tags: [{ type: ObjectId, ref: "Tag" }],

    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const tagsSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const sharbleLink = new Schema({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
    unique:true
  },
});

const User = mongoose.model("User", userSchema);
const Content = mongoose.model("Content", contentSchema);
const Tag = mongoose.model("Tags", tagsSchema);
const SharableLink = mongoose.model("SharableLink", sharbleLink);

export { User, Content, Tag, SharableLink };
