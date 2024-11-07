import { SendGridClient } from "../../utils/sendgrid-client";
import { MailDataRequired } from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

interface EmailTemplateVariables {
  recipient: string;
  name: string;
  amount: number;
  date: string;
  description: string;
}

export class EmailUseCases {
  private sendGridClient: SendGridClient;

  constructor() {
    this.sendGridClient = new SendGridClient();
  }

  async sendCreatedExpensesEmail({
    recipient,
    name,
    amount,
    date,
    description,
  }: EmailTemplateVariables): Promise<void> {
    const from = process.env.SENDGRID_SENDER_EMAIL;
    const templateId = process.env.SENDGRID_CREATED_EXPENSE_TEMPLATE_ID;

    if (!from || !templateId) {
      throw new Error(
        "SENDGRID_SENDER_EMAIL or SENDGRID_CREATED_EXPENSE_TEMPLATE_ID is not defined in environment variables"
      );
    }

    const mail: MailDataRequired = {
      to: recipient,
      from,
      templateId,
      dynamicTemplateData: {
        name,
        amount,
        date,
        description,
      },
    };

    await this.sendGridClient.send(mail);
  }
}
