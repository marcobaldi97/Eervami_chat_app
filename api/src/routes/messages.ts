/* eslint-disable max-len */
import { Router } from "express";
import { ParsedQs } from "qs";
import { DataStore } from "../core/DataStore";
import { DBManager } from "../core/DBManager";

const dataStore = DataStore.getInstance();

export const messages = Router();

const db = DBManager.getInstance();

async function getLastMessage(user1: string, token: string, user2: string) {
    if (!dataStore.validToken(user1.toString(), token.toString()))
        throw new Error("Invalid token");
    else
        dataStore.refresh(user1.toString());

    const query = "SELECT * FROM messages WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1) ORDER BY msg_id DESC LIMIT 1";
    const queryResult = await db.executeSelectConsult(query, [user1, user2]);

    return queryResult;
}

async function getMessages(user1: string | ParsedQs | string[] | ParsedQs[], token: string | ParsedQs | string[] | ParsedQs[], user2: string | ParsedQs | string[] | ParsedQs[]) {
    if (!dataStore.validToken(user1.toString(), token.toString()))
        throw new Error("Invalid token");
    else
        dataStore.refresh(user1.toString());

    const query = "SELECT * FROM messages WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)";
    const queryResult = await db.executeSelectConsult(query, [user1, user2]);
    return queryResult;
}

async function sendMessage(user1: string | ParsedQs | string[] | ParsedQs[], token: string | ParsedQs | string[] | ParsedQs[], user2: string | ParsedQs | string[] | ParsedQs[], msg: string | ParsedQs | string[] | ParsedQs[]) {
    if (!dataStore.validToken(user1.toString(), token.toString()))
        throw new Error("Invalid token");
    else
        dataStore.refresh(user1.toString());

    const query = "INSERT INTO messages (user1, user2, msg, date_time) VALUES ($1, $2, $3, $4)";
    const queryResult = await db.executeInsertConsult(query, [user1, user2, msg, new Date().toUTCString()]);
    return queryResult;
}

// #region REST
messages.get("/lastMessage?", async (req, res, next) => {
    const { user1, user2, token } = req.query;

    try {
        const queryResult = await getLastMessage(user1 as string, token as string, user2 as string);

        console.log(queryResult, queryResult?.[0].msg);

        res.send(queryResult?.[0].msg ?? "");
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

messages.get("/getMessages?", async (req, res, next) => {
    const { user1, user2, token } = req.query;
    try {
        const queryResult = await getMessages(user1, token, user2);

        res.send(queryResult);
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

messages.post("/sendMessage?", async (req, res, next) => {
    const { user1, user2, msg, token } = req.query;
    try {
        const queryResult = await sendMessage(user1, token, user2, msg);

        res.send(queryResult);
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});
// #endregion
