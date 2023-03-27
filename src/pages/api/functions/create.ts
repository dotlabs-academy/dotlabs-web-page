import type { NextApiResponse } from 'next'
import { userModel } from "../core/models/User";
import { createErrorResponse, createResponse } from "../commons/responses"

type IResponse = {
    message: string
    user?: object
}

export const create = async (event: any, res: NextApiResponse<IResponse>) => {
    const data = event.body
    let user = await userModel.findOne({ address: data.address })
    if (user) return await createErrorResponse("BAD_REQUEST", res, "USER_EXIST");
    user = await userModel.create(data)
    if (user) return createResponse({ statusCode: 200, body: { message: 'USER_CREATED', user: user } }, res);
    return await createErrorResponse("BAD_REQUEST", res, "ERROR_CREATING_USER");
}