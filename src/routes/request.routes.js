const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const Connection = require("../models/request");

requestRouter.post("/request/:status/:userId", userAuth, async (req, res) => {
  try {
    const toUserId = req.params.userId;
    const fromUserId = req.user.id;
    const status = req.params.status;

    const validRequest = ["interested", "ignored"];
    if (!validRequest.includes(status)) {
      return res.status(400).send("Invalid Request!");
    }

    const checkConnection = await Connection.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    console.log(checkConnection);

    if (checkConnection) {
      throw new Error("Connection request already sent!");
    }

    const connectionRequest = new Connection({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.json({
      message: "Connection sent successfully",
      data,
    });
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});

module.exports = requestRouter;
