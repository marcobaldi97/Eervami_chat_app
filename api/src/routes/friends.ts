import { Router } from "express";
import { DBManager } from "../core/DBManager";

export const friends = Router();

const db = DBManager.getInstance();

friends.get("/getFriendsList?", async (req, res, next) => {
    const user = req.query.user;
    try {
        console.log("User: ", user);


        const query = "SELECT * FROM friends WHERE user1=$1 OR user2=$1";
        const queryResult = await db.executeSelectConsult(query, [user]);

        console.log(queryResult);

        res.send(queryResult);
    } catch (error) {
        console.log(error);

        res.send(error);
    }

});
