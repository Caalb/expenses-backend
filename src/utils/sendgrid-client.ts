import SendGrid from "@sendgrid/mail";
import { logger } from "../infrastructure/logger";
import dotenv from "dotenv";

dotenv.config();

export class SendGridClient {
  constructor() {
    const sendGridApiKey = process.env.SENDGRID_API_KEY;
    if (!sendGridApiKey) {
      throw new Error(
        "SENDGRID_API_KEY is not defined in environment variables"
      );
    }

    SendGrid.setApiKey(sendGridApiKey);
  }

  async send(mail: SendGrid.MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(mail);

      logger.info(`Email successfully dispatched to ${mail.to as string}`);
    } catch (error) {
      logger.error(`Error on dispatch email to ${mail.to as string}`, error);

      throw error;
    }
  }
}
