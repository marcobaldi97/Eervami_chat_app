/* eslint-disable max-len */
import { Router } from "express";
import { GetMessagesParams, LastMessageParams, SendMessageParams } from "../APITypes";
import { DBManager } from "../core/DBManager";

export const messages = Router();

const db = DBManager.getInstance();

async function getLastMessage(params: LastMessageParams) {
    const { user1, user2, token } = params;

    const query = "SELECT * FROM messages WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1) ORDER BY msg_id DESC LIMIT 1";
    const queryResult = await db.executeSelectConsult(query, [user1, user2]);

    return queryResult;
}

async function getMessages(params: GetMessagesParams) {
    const { user1, user2, token } = params;

    const query = "SELECT * FROM messages WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)";
    const queryResult = await db.executeSelectConsult(query, [user1, user2]);
    return queryResult;
}

async function sendMessage(params: SendMessageParams) {
    const { user1, user2, msg, token } = params;

    const query = "INSERT INTO messages (user1, user2, msg, date_time) VALUES ($1, $2, $3, $4)";
    const queryResult = await db.executeInsertConsult(query, [user1, user2, msg, new Date().toUTCString()]);
    return queryResult;
}

// #region REST
messages.get("/lastMessage?", async (req, res, next) => {
    const { user1, user2, token } = req.query as LastMessageParams;

    try {
        const queryResult = await getLastMessage({ user1, user2, token });

        console.log(queryResult, queryResult?.[0].msg);

        res.send(queryResult?.[0].msg ?? "");
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

messages.get("/getMessages?", async (req, res, next) => {
    const { user1, user2, token } = req.query as GetMessagesParams;
    try {
        const queryResult = await getMessages({ user1, user2, token });

        res.send(queryResult);
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

messages.post("/sendMessage?", async (req, res, next) => {
    const { user1, user2, msg, token } = req.query as SendMessageParams;
    try {
        const queryResult = await sendMessage({ user1, user2, msg, token });

        res.send(queryResult);
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});
// #endregion
