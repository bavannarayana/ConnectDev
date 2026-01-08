const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "ignored", "approved", "rejected"],
        message: `{VALUE} is not valid`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({ fromUserId: 1, toUserId: -1 });

connectionRequestSchema.pre("save", function () {
  if (this.fromUserId === this.toUserId) {
    throw new Error("Cannot send request to yourself!");
  }
});

const connectionRequestModel = new mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequestModel;
