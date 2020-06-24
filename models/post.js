var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  url: { type: String }, // required : True
  summary: { type: String }, // required : True
  subreddit: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


PostSchema.pre("save", function(next) {
  // SET createdAt AND updatedAt
  const now = new Date();
  this.updatedAt = now;

  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model("Post", PostSchema);