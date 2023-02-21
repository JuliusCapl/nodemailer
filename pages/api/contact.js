import { mailOptions, transporter } from "../../config/nodemailer"

export default async function handler(req, res) {
  if(req.method==='POST'){
    const data = req.body
    if(!data.name || !data.email || !data.subject || !data.message){
      return res.status(400).json({ message: 'Bad request' })
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: data.subject,
        text: `${data.name} Sent you this message`,
        html: `<h1>${data.subject}</h1><h2>Answer to: ${data.email}</h2><h4>Message:</h4><p>${data.message}</p>`
      })
      return res.status(200).json({success: true})
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
  return res.status(400).json({ message: 'Bad request' })
}
