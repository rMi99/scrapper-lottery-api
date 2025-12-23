const express = require('express');
const path = require('path');
const { scrapeData } = require('./scraper');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


// Scraping API endpoint
app.get('/api-scraper', async (req, res) => {
    const { url, slug, drawNo } = req.query;  // Get query parameters from the request



    if (!url || !slug || !drawNo) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const data = await scrapeData(url, slug, drawNo);
        res.json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message});
    }

});

module.exports = app;
