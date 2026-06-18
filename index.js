const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   CORS
========================= */

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

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("House of YAA API is running");
});

/* =========================
   CONTACT ROUTE
========================= */

app.post("/send-mail", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const data = await resend.emails.send({
      from: "House of YAA <onboarding@resend.dev>",

      // YOUR RECEIVING EMAIL
      to: "darnielipogah@gmail.com",

      subject: `New House of YAA Inquiry from ${name}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #111;">
          
          <h1 style="color:#D4AF37;">
            House of YAA Contact
          </h1>

          <hr />

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="margin-top:10px;">
            ${message}
          </div>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* =========================
   PORT
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`House of YAA server running on port ${PORT}`);
});
