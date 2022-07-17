import { Router } from "express";
import { PrismaClient, friends as friend } from "@prisma/client";

import { GetFriendsListParams } from "../APITypes";

const prisma = new PrismaClient();

export const friendsRouter = Router();

async function getFriendsList(params: GetFriendsListParams): Promise<friend[]> {
    const { user } = params;

    return await prisma.friends.findMany({
        where: {
            OR: [
                {
                    user1: user,
                },
                {
                    user2: user,
                },
            ],
        },
    });
}

friendsRouter.get("/getFriendsList?", async (req, res, next) => {
    const { user, token } = req.query as GetFriendsListParams;
    try {
        res.send(await getFriendsList({ user, token }));
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});
