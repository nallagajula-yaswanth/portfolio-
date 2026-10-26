// server.js
// Serves the portfolio (portfolio-fullstack/) and provides the contact form API.
// Messages are stored in data/messages.json — no external database required.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'messages.json');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'portfolio-fullstack')));

// ---- tiny JSON-file "database" ----
function readMessages() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveMessage(entry) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  const messages = readMessages();
  messages.unshift(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));
}

// ---- contact form endpoint (public) ----
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'name, email, subject and message are required.' });
  }

  const entry = {
    id: Date.now(),
    name,
    email,
    phone: phone || '',
    subject,
    message,
    created_at: new Date().toISOString(),
  };

  saveMessage(entry);
  res.status(201).json({ success: true });
});

// ---- read submitted messages (simple token-protected) ----
app.get('/api/messages', (req, res) => {
  const token = req.headers['x-admin-token'];
  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized. Set ADMIN_TOKEN in .env and pass it as the X-Admin-Token header.' });
  }
  res.json(readMessages());
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://127.0.0.1:${PORT}`);
});
