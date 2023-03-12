import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase, disconnect } from "./core/mongo";
import User from "./core/models/User";
import Joi from "joi";
import { UserDto } from "../../../lib/formUtils";

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
  await connectToDatabase();
  const user: any = await User.create(data); // ?
  console.log({ user });
  if (user) return user;
  throw new Error("error on: src/pages/api/users:createUser");
};

const readUser = async (address: EthAddress): Promise<any> => {
  await connectToDatabase();
  const user = await User.findOne({ address });
  console.log({ user });
  if (user) return user;
  throw new Error("error on: src/pages/api/users:readUser");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Code to handle the POST request
    const data = JSON.parse(req.body);
    if (schemaPOST.validate(data).error)
      res.status(400).json({ message: "Payload not valid" });
    else {
      console.log("190");
      await createUser(data);
      res.status(200).json({ message: "POST request processed" });
    }
  } else if (req.method === "GET") {
    // Code to handle the POST request
    console.log(req.query);
    if (schemaGET.validate(req.query).error)
      res.status(400).json({ message: "Payload not valid" });
    else {
      const address = (req.query.address as `0x${string}`) ?? "0x";
      const user = await readUser(address);
      console.log(user);
      res
        .status(200)
        .json({ message: "POST request processed", user: user ?? {} });
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}
