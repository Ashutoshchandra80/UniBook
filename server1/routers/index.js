const express = require("express");
const index = express.Router();

index.post("/logout", (req, res) => {
	req.logout();
	return res.status(200);
});
module.exports = index;
