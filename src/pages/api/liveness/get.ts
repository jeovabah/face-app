import { Liveness } from "@/services/liveness";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  service: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const liveness = new Liveness();
  const sessionID = req.query?.sessionId as string;

  const status = await liveness.getSessionResults(sessionID);
  console.log(status);
  res.status(200).json({
    service: "Get Results Liveness",
    data: {
      ...status,
    },
  });
}
