const nodemailer = require("nodemailer");

const templates = {
  registration: {
    title: "Подтверждение регистрации аккаунта на LaTable.ru",
  },
  recovery: {
    title: "Восстановление доступа к аккаунта на LaTable.ru",
  },
  default: {
    title: "Подтверждение регистрации аккаунта на LaTable.ru",
  },
};

class MailService {
  transporter = null;

  constructor() {
    const {
      SMPT_HOST = "smtp.gmail.com",
      SMTP_PORT = 587,
      SMTP_USER = "latable159@gmail.com",
      SMTP_PASSWORD = "pfva tpna kaxd ekvr",
    } = process.env;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: SMPT_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }

  async sendCode(to, code, templateName) {
    await this.transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to,
        subject: templates[templateName || "default"],
        text: `${code}`,
      },
      (err, info) => {
        console.log(err);
        console.log(info);
      }
    );
  }
}

module.exports = new MailService();
