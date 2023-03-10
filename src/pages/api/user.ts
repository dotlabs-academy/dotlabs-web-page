import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase, disconnect } from "./core/mongo";
import User from "./core/models/User";
import Joi from "joi";

const schemaPOST = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    identification: Joi.number().required(),
    address: Joi.string().required(),
    eps: Joi.string().required(),
    phone: Joi.string(),
    profile: Joi.string(),
});

const schemaGET = Joi.object({
    address: Joi.string().required(),
})

type Data = {
    message: string
    user?: object
}

type DataInside = {
    name: string;
    email: string;
    identification: number;
    address: string;
    eps: string;
    phone?: string;
    profile?: string;
}

type DataInsideGet = {
    address: string;
}

const createUser = async (data: DataInside) => {
    await connectToDatabase()
    const user = await User.create(data)
}

const readUser = async (data: any) => {
    await connectToDatabase()
    return await User.findOne({ address: data.address })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        // Code to handle the POST request
        if (schemaPOST.validate(req.body).error)
            res.status(400).json({ message: 'Payload not valid' });
        else {
            await createUser(req.body);
            res.status(200).json({ message: 'POST request processed' });
        }
    } else if (req.method === 'GET') {
        // Code to handle the POST request
        console.log(req.query)
        if (schemaGET.validate(req.query).error)
            res.status(400).json({ message: 'Payload not valid' });
        else {
            const user = await readUser(req.query);
            console.log(user)
            res.status(200).json({ message: 'POST request processed', user: user ?? {} });
        }
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
}