import { PrismaClient } from "@prisma/client";
import { text } from "express";

const prisma = new PrismaClient();

const sendText = async (req, res) => {

    let message = [];

    const {authorId, content} = req.body;
    const text = await prisma.text.create({
        data: {
            content: content,
            authorId: authorId
        }
    });

    message.push(text);

    res.send(message);
}

const getAllText = async (req, res) => {
    texts = await prisma.text.findMany();

    res.send(text)
}