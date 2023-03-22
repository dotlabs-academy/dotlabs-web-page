import { connectToDatabase } from "../core/mongo";
import type { NextApiRequest, NextApiResponse } from 'next'
import Joi from "joi";

type IResponse = {
    statusCode: number
    body: object
}

type IService = {
    schema?: Joi.ObjectSchema<any>
    query?: boolean
    db: boolean
    action: Function
}

type Data = {
    message: string
    user?: object
}

const statusCode = {
    INTERNAL_ERROR: 500,
    BAD_REQUEST: 400,
};

export const initializeHandler = async (service: IService, event: NextApiRequest, res: NextApiResponse<Data>) => {
    let response;
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
        response = await service.action(event, res);
    } catch (e) {
        console.error(e);
        response = createErrorResponse('INTERNAL_ERROR', res);
    }
    return createResponse(response, res);
}


const createResponse = (response: IResponse, res: NextApiResponse<Data>) => {
    return res.status(response.statusCode ?? 200).setHeader('Content-Type', 'application/json').json({ message: JSON.stringify(response?.body ?? response) });
};

export const createErrorResponse = (status: "INTERNAL_ERROR" | "BAD_REQUEST", res: NextApiResponse<Data>, body: string = "") => {
    let httpCode = statusCode[status] ?? 500;
    if (httpCode == 500) body = 'Internal Error in the service';
    return res.status(httpCode).json({ message: body });
};