import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, userModel } from "../../utils/db";
import Joi from "joi";
import { UserDto } from "../../utils/formUtils";

const schemaPOST = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	legalID: Joi.string().required(),
	address: Joi.string().required(),
	eps: Joi.string().required(),
	phone: Joi.string(),
	gitHubProfile: Joi.string(),
});

const schemaGET = Joi.object({
	address: Joi.string().required(),
});

type Data = {
	message: string;
	user?: object;
};

type EthAddress = `0x${string}`;

const createUser = async (data: UserDto): Promise<any> => {
	try {
		await connectToDatabase();
		const user = await userModel.create(data);
		if (user) return user;
		return { error: "USER_CREATION_FAILED" };
	} catch (error) {
		return { error: "DATABASE_CONNECTION_FAILED" };
	}
};

const readUser = async (address: EthAddress): Promise<any> => {
	try {
		await connectToDatabase();
		const user = await userModel.findOne({ address });
		if (user) return user;
	} catch (error) {
		return false;
	}
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>,
) {
	if (req.method === "POST") {
		// Code to handle the POST request
		const data = JSON.parse(req.body);
		if (schemaPOST.validate(data).error)
			res.status(400).json({ message: "PAYLOAD_NOT_VALID" });
		else {
			const user = await createUser(data);
			if (user.error) res.status(400).json({ message: user.error });
			res.status(200).json({ message: "USER_CREATED", user });
		}
	} else if (req.method === "GET") {
		// Code to handle the POST request
		if (schemaGET.validate(req.query).error)
			res.status(400).json({ message: "PAYLOAD_NOT_VALID" });
		else {
			const address = (req.query.address as `0x${string}`) ?? "0x";
			const user = await readUser(address);
			let response;
			if (user) response = { message: "OK", user: user };
			else response = { message: "USER_NOT_FOUND" };
			res.status(200).json(response);
		}
	} else {
		res.status(400).json({ message: "METHOT_NOT_FOUND" });
	}
}
