import { Liveness } from "@/services/liveness";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  service: string;
  data: {
    sessionId?: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const liveness = new Liveness();

  const sessionID = await liveness.createSession();
  res.status(200).json({
    service: "Create Rekognition Liveness",
    data: {
      sessionId: sessionID,
    },
  });
}
