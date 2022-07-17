import { Router } from "express";
import { LoginParams } from "../APITypes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const users = Router();

const login = async (params: LoginParams): Promise<boolean> => {
    const { username, password } = params;

    const user = await prisma.users.findMany({
        where: {
            username,
            password,
        },
    });

    return user.length > 0;
};

users.post("/login", async (req, res) => {
    const { username, password }: LoginParams = req.body;
    try {
        await login({ username, password })
            ? res.send({
                success: true,
            })
            : res.send({
                success: false,
            });
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});
