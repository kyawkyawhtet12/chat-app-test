import { PrismaClient } from "@prisma/client";
import { text } from "express";
import { Server } from "socket.io";

const prisma = new PrismaClient();

const sendText = async (req, res) => {
const io = new Server()
    let message = [];

    const {authorId, content} = req.body;
    // const text = await prisma.text.create({
    //     data: {
    //         content: content,
    //         authorId: authorId
    //     }
    // });

    message.push(text);
    io.emit(message)
    res.send(message);
}

const getAllText = async (req, res) => {

    try {
        texts = await prisma.text.findMany();

        res.send(text)   
    } catch (error) {
        console.log(error);
    }
}

export {getAllText, sendText}

