const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://houseofyaa.com",
      "https://www.houseofyaa.com",
    ],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.post("/send-mail", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: "House of YAA <noreply@houseofyaa.com>",
      to: "admin@houseofyaa.com",
      subject: `New Inquiry from ${name || "Website User"}`,
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>New Message</h2>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
