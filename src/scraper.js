const puppeteer = require('puppeteer');

const scrapeData = async (url, slug, drawNo) => {
    const finalUrl = `${url}/${slug}/${drawNo}`;

    const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_EXECUTABLE_PATH || '/usr/bin/google-chrome-stable',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920x1080'
        ]
    });

    const page = await browser.newPage();

    await page.goto(finalUrl, { waitUntil: 'networkidle2' });

    const resultsHtmlArray = await page.$$eval('.B', elements =>
        elements.map(element => element.innerHTML)
    );

    await browser.close();

    return resultsHtmlArray;
};

module.exports = {
    scrapeData
};