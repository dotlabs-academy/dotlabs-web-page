import { connectToDatabase } from "../core/mongo";
import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from "joi";

type IResponse = {
    statusCode: number
    body: IData
}

type IService = {
    schema?: Joi.ObjectSchema<any>
    query?: boolean
    db: boolean
    action: Function
}

type IData = {
    message: string
    user?: object
}

const statusCode = {
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
};

export const initializeHandler = async (service: IService, event: NextApiRequest, res: NextApiResponse<IData>) => {
    try {
        if (event.body && typeof event.body === 'string')
            event.body = JSON.parse(event.body);
        if (
            service.schema &&
            service.schema.validate(service.query ? event.query : event.body).error
        )
            return createErrorResponse('BAD_REQUEST', res, 'PAYLOAD_NOT_VALID');
        if (service.db && !(await connectToDatabase()))
            return createErrorResponse('BAD_REQUEST', res, 'CONNECTION_ERROR');
        return await service.action(event, res);
    } catch (e) {
        console.error(e);
        return createErrorResponse('INTERNAL_ERROR', res);
    }
}


export const createResponse = (response: IResponse, res: NextApiResponse<IData>) => {
    return res.status(response.statusCode ?? 200).setHeader('Content-Type', 'application/json').json(response?.body);
};

export const createErrorResponse = (status: "INTERNAL_ERROR" | "BAD_REQUEST", res: NextApiResponse<IData>, body: string = "") => {
    let httpCode = statusCode[status] ?? 500;
    if (httpCode == 500) body = 'Internal Error in the service';
    return res.status(httpCode).json({ message: body });
};