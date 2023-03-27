import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from "joi";
import { get } from "./functions/get";
import { create } from "./functions/create";
import { update } from "./functions/update";
import { deleteUser } from "./functions/delete";
import { initializeHandler } from "./commons/responses";

const schemaGet = Joi.object({
    address: Joi.string().required(),
})

const schemaPost = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    legalID: Joi.number().required(),
    address: Joi.string().required(),
    eps: Joi.string().required(),
    phone: Joi.string(),
    gitHubProfile: Joi.string(),
});

const schemaPut = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    legalID: Joi.number(),
    address: Joi.string(),
    eps: Joi.string(),
    phone: Joi.string(),
    gitHubProfile: Joi.string(),
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
    } else if (req.method === 'PUT') {
        await initializeHandler({ action: update, db: true, schema: schemaPut }, req, res);
    } else if (req.method === 'DELETE') {
        await initializeHandler({ action: deleteUser, db: true, schema: schemaGet, query: true }, req, res);
    } else {
        res.status(400).json({ message: "METHOT_NOT_FOUND" });
    }
}