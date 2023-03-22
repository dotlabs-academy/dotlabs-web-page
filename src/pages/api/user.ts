import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from "joi";
import { get } from "./functions/get";
import { create } from "./functions/create";
import { initializeHandler } from "./commons/responses";

const schemaGet = Joi.object({
    address: Joi.string().required(),
})

const schemaPost = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    identification: Joi.number().required(),
    address: Joi.string().required(),
    eps: Joi.string().required(),
    phone: Joi.string(),
    profile: Joi.string(),
});

type IData = {
    message: string
    user?: object
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<IData>) {
    
    if (req.method === 'POST') {
        await initializeHandler({ action: create, db: true, schema: schemaPost }, req, res);
    } else if (req.method === 'GET') {
        await initializeHandler({ action: get, db: true, schema: schemaGet, query: true }, req, res);
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
}