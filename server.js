const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.text({ type: "*/*" }));

function sanitizeString(str) {
    if (!str) return "";
    return str
        .replace(/&nbsp;/g, " ")
        .replace(/[\r\n]+/g, " ")
        .replace(/[\t]+/g, " ")
        .trim();
}

let latestReply = null;

// Endpoint to send user message to Zapier
app.post("/send-message", async (req, res) => {
    try {
        let body;
        try {
            body = JSON.parse(req.body);
        } catch (err) {
            console.error("Invalid JSON received:", req.body);
            return res.status(400).json({ success: false, error: "Invalid JSON" });
        }

        const firstName = sanitizeString(body.firstName);
        const message = sanitizeString(body.message);

        // Clear previous reply when sending new message
        latestReply = null;
        console.log("Cleared previous reply, sending new message to Zapier");

        const response = await fetch(
            "https://hooks.zapier.com/hooks/catch/25377433/u8e713i/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, message })
            }
        );

        const data = await response.text();
        res.json({ success: true, data });
    } catch (error) {
        console.error("Error sending message to Zapier:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to receive AI responses from Zapier
app.post("/chatbot-response", (req, res) => {
    let body;
    try {
        const sanitizedBody = req.body.replace(/(\r\n|\n|\r)/g, "\\n");
        body = JSON.parse(sanitizedBody);
    } catch (err) {
        console.error("Invalid JSON received on chatbot-response:", req.body);
        return res.status(400).send("Invalid JSON");
    }

    let reply = body.reply || "";
    reply = reply.replace(/\\n/g, "\n");
    
    latestReply = reply;
    console.log("✓ Stored chatbot reply from Zapier (ready for pickup):", reply);
    
    res.sendStatus(200);
});

// Endpoint for frontend to fetch the latest reply
app.get("/latest-reply", (req, res) => {
    console.log("Frontend polling for reply. Current latestReply:", latestReply ? "AVAILABLE" : "NULL");
    
    if (latestReply) {
        const reply = latestReply;
        latestReply = null; // Clear after sending
        console.log("✓ Sending reply to frontend and clearing");
        res.json({ success: true, reply });
    } else {
        res.json({ success: false, reply: null });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));