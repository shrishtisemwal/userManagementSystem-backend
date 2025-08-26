const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
  },
);

module.exports = mongoose.model("Activity", activitySchema);
