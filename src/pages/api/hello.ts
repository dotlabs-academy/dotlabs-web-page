// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase, disconnect } from "./core/mongo";

type Data = {
  name: string
}

const updateUser = async () => {
  await connectToDatabase()
  console.log("here")
  await disconnect()
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = updateUser()
  console.log(data)
  console.log(process.env.NEXT_PUBLIC_DB)
  console.log("hola")
  res.status(200).json({ name: 'John Doe' })
}
