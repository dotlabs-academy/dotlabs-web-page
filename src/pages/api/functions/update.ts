import type { NextApiResponse } from 'next'
import { userModel } from "../core/models/User";
import { createErrorResponse, createResponse } from "../commons/responses"

type IResponse = {
    message: string
    user?: object
}

export const update = async (event: any, res: NextApiResponse<IResponse>) => {
    const data = event.body;
    const userAddress = event.query.address;
    let user = await userModel.findOneAndUpdate({ address: userAddress }, data)
    if (!user) return await createErrorResponse("BAD_REQUEST", res, "USER_NOT_EXIST");
    return createResponse({ statusCode: 200, body: { message: 'USER_UPDATED', user: user } }, res);
}