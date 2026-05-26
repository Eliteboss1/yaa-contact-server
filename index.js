const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: "House of YAA <onboarding@resend.dev>",
      to: "darnielipogah@gmail.com",
      subject: `New Message from ${name}`,
      html: `
        <h2>House of YAA Contact</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);