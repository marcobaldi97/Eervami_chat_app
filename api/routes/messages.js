const express = require("express");
const fs = require("fs-extra");
const JSON5 = require("json5");
require("json5/lib/register");

let router = express.Router();

router.get("/sendMsg", async function (req, res, next) {
	const { from, to, message } = req.body;
	const currentDate = new Date();

	const messageToSave = {
		identificator: currentDate,
		from: from,
		to: to,
		content: message,
		timestamp: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
	};

	const chats = require("../data/chats.json5");
	console.log(chats);
	chats.allChats.push(messageToSave);
	res.send(chats);
	await fs.writeFile("../data/chats.json5", chats);
});

module.exports = router;
