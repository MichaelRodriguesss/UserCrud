const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config();

exports.sendEmail = async (data) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.TRANSPORTER_HOST,
      port: process.env.TRANSPORTER_PORT,
      auth: {
        user: process.env.TRANSPORTER_USER,
        pass: process.env.TRANSPORTER_PASS
      }
    });

    const source = fs.readFileSync(path.join(__dirname, data.template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = {
      from: "Administrador <i.e fc8b4f5eeb-0cebb4+1@inbox.mailtrap.io>",
      to: data.email,
      subject: data.subject,
      html: compiledTemplate(data.payload),
    };

    await transporter.sendMail(options);
  } catch (error) {
    throw new Error("Falha ao enviar email");
  }
};