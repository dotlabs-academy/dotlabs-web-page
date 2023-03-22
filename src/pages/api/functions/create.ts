import type { NextApiResponse } from 'next'
import User from "../core/models/User";
import { createErrorResponse } from "../commons/responses"

type IResponse = {
    message: string
    user?: object
}

export const create = async (event: any, res: NextApiResponse<IResponse>) => {
    const data = event.body
    let user = await User.findOne({ address: data.address })
    if (user) return await createErrorResponse("BAD_REQUEST", res, "USER_EXIST");
    user = await User.create(data)
    if (user) return { message: 'USER_CREATED', user: user };
    return await createErrorResponse("BAD_REQUEST", res, "ERROR_CREATING_USER");
}