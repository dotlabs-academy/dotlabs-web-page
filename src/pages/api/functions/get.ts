import type { NextApiResponse } from 'next'
import { userModel } from "../core/models/User";
import { createErrorResponse, createResponse } from "../commons/responses"

type IResponse = {
    message: string
    user?: object
}

export const get = async (event: any, res: NextApiResponse<IResponse>) => {
    const data = event.query
    const user = await userModel.findOne({ address: data.address })
    if (user) return createResponse({ statusCode: 200, body: { message: 'OK', user: user } }, res);
    else return await createErrorResponse("BAD_REQUEST", res, "USER_NOT_EXIST");
}