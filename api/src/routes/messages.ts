/* eslint-disable max-len */
import { Router } from "express";
import { GetMessagesParams, LastMessageParams, SendMessageParams } from "../APITypes";
import { messages as message, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const messages = Router();

async function getLastMessage(params: LastMessageParams): Promise<message | undefined> {
    const { user1, user2 } = params;

    const lastMessage = await prisma.messages.findMany({
        where: {
            OR: [
                {
                    user1: user1,
                    user2: user2,
                },
                {
                    user1: user2,
                    user2: user1,
                },
            ],
        },
        orderBy: {
            msg_id: 'desc',
        },
        take: 1,
    });

    return lastMessage?.[0];
}

async function getMessages(params: GetMessagesParams): Promise<message[]> {
    const { user1, user2 } = params;

    const messages = await prisma.messages.findMany({
        where: {
            OR: [
                {
                    user1: user1,
                    user2: user2,
                },
                {
                    user1: user2,
                    user2: user1,
                },
            ],
        },
    });

    return messages;
}

async function sendMessage(params: SendMessageParams): Promise<message> {
    const { user1, user2, msg } = params;

    return await prisma.messages.create({
        data: {
            user1,
            user2,
            msg,
            date_time: new Date(),
        },
    });
}

// #region REST
messages.get("/lastMessage?", async (req, res, next) => {
    const { user1, user2, token } = req.query as LastMessageParams;

    try {
        res.send(await getLastMessage({ user1, user2, token }));
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

messages.get("/getMessages?", async (req, res, next) => {
    const { user1, user2, token } = req.query as GetMessagesParams;
    try {
        res.send(await getMessages({ user1, user2, token }));
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});

messages.post("/sendMessage?", async (req, res, next) => {
    const { user1, user2, msg, token } = req.query as SendMessageParams;
    try {
        res.send(await sendMessage({ user1, user2, msg, token }));
    } catch (error) {
        console.log(error);

        res.status(500).send(error);
    }
});
// #endregion
