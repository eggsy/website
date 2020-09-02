const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Posts = new Schema({
    published: Boolean,
    views: Number,
    date: Date,
    lastEdit: Date,
    sidebar: { type: Boolean, default: true },
    title: { type: String, required: true },
    shortdesc: { type: String, required: true },
    short_url: { type: String, default: null, unique: true },
    author: {
      discordId: { type: String, required: true },
      name: { type: String, required: true },
    },
    content: String,
    images: {
      large: String,
      small: String,
      postImage: String,
    },
    comments: Array,
    reactions: {
      excited: { type: Number, default: 0 },
      lol: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
      cry: { type: Number, default: 0 },
      dead: { type: Number, default: 0 },
      heart: { type: Number, default: 0 },
    },
    tags: Array,
  }),
  Authors = new Schema({
    discordId: { type: String, required: true },
    name: { type: String, unique: true, required: true },
    bio: { type: String, default: null },
    avatar: { type: String, default: "/images/blog/default-avatar.png" },
    background: { type: String, default: "/images/blog/default-bg.jpg" },
    badges: { type: Array, default: ["pencil"] },
  }),
  Songs = new Schema({
    date: { type: String, required: true },
    url: { type: String, required: true },
  });

module.exports.Posts = mongoose.models.post || mongoose.model("post", Posts);
module.exports.Authors =
  mongoose.models.author || mongoose.model("author", Authors);
module.exports.Songs = mongoose.models.song || mongoose.model("song", Songs);
