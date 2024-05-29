import { Rekognition } from "@aws-sdk/client-rekognition";

export class Liveness {
  private rekognition: Rekognition;
  constructor() {
    this.rekognition = new Rekognition({
      region: "us-east-1",
      credentials: {
        accessKeyId: "AKIA4B74XAZJ6LUOAC5A",
        secretAccessKey: "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",
      },
    });
  }

  async createSession() {
    const response = await this.rekognition.createFaceLivenessSession();

    const sessionId = response.SessionId;
    return sessionId;
  }

  async getSessionResults(sessionId: string) {
    const response = await this.rekognition.getFaceLivenessSessionResults({
      SessionId: sessionId,
    });

    const confidence = response.Confidence;
    const status = response.Status;
    return {
      confidence,
      status,
      responseAll: response,
    };
  }
}
