import { Router } from "express";
import { DBManager } from "../core/DBManager";

export const messages = Router();

const db = DBManager.getInstance();

messages.get("/lastMessage?", async (req, res, next) => {
    const { user1, user2 } = req.query;
    try {
        const query = "SELECT * FROM messages WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1) ORDER BY msg_id DESC LIMIT 1";
        const queryResult = await db.executeSelectConsult(query, [user1, user2]);

        console.log(queryResult, queryResult?.[0].msg);

        res.send(queryResult?.[0].msg ?? "");
    } catch (error) {
        console.log(error);

        res.send(error);
    }

});
