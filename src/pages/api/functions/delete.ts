import type { NextApiResponse } from "next";
import { userModel } from "../core/models/User";
import { createErrorResponse, createResponse } from "../commons/responses";

type IResponse = {
	message: string;
	user?: object;
};

export const deleteUser = async (
	// rome-ignore lint/suspicious/noExplicitAny: <explanation>
	event: any,
	res: NextApiResponse<IResponse>,
) => {
	const data = event.query;
	const user = await userModel.deleteOne({ address: data.address });
	if (!user.deletedCount)
		return await createErrorResponse("BAD_REQUEST", res, "USER_NOT_EXIST");
	return createResponse(
		{ statusCode: 200, body: { message: "USER_DELETED" } },
		res,
	);
};
