import type { NextApiResponse } from 'next'
import User from "../core/models/User";
import { createErrorResponse } from "../commons/responses"

type IResponse = {
    message: string
    user?: object
}

export const get = async (event: any, res: NextApiResponse<IResponse>) => {
    const data = event.query
    const user = await User.findOne({ address: data.address })
    if (user) return { message: 'OK', user: user };
    else return await createErrorResponse("BAD_REQUEST", res, "USER_NOT_EXIST");
}