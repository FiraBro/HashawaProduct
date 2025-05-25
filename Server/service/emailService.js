// utils/Email.js
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { convert } from "html-to-text";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from =
      process.env.EMAIL_FROM || `YoyoBrand Shoe <jemalfiragos@gmail.com>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  async loadTemplate(templateName) {
    const templatePath = path.join(
      __dirname,
      "..",
      "email-templates",
      `${templateName}.html`
    );
    let html = fs.readFileSync(templatePath, "utf-8");

    html = html
      .replace(/{{firstName}}/g, this.firstName)
      .replace(/{{url}}/g, this.url)
      .replace(/{{year}}/g, new Date().getFullYear());

    return html;
  }

  async send(template, subject) {
    const html = await this.loadTemplate(template);
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to YoyoBrand Shoe!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Reset Your Password - YoyBrand Shoe");
  }

  async sendPasswordChangeNotification() {
    await this.send(
      "passwordChanged",
      "Your YoyoBrand Shoe password was changed"
    );
  }
}
