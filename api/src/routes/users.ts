import { Router } from "express";
import { DataStore } from "../core/DataStore";
import { DBManager } from "../core/DBManager";

export const users = Router();

const db = DBManager.getInstance();
const dataStore = DataStore.getInstance();

users.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        //SQL query to check if the user and password given match
        const query = `SELECT * FROM users WHERE username = $1 AND password = $2`;
        const result = await db.executeSelectConsult(query, [username, password]);

        if (result.length > 0) {
            dataStore.login(username, req.ip);

            console.log(username, req.ip);

            res.send({
                success: true,
            });
        } else {
            res.send({
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error",
        }).send();
    }
});
