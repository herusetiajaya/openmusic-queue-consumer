const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusic API',
      to: targetEmail,
      subject: 'Ekspor Playlist Songs',
      text: 'Terlampir hasil dari ekspor playlist songs',
      attachments: [
        {
          filename: 'playlistsongs.json',
          content,
        },
      ],
    };
    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;