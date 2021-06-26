const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const app = express();

app.get("/api/cars/:make", (req, res) => {
  const fetchResults = async () => {
    try {
      const response = await fetch(
        `https://portland.craigslist.org/d/cars-trucks-by-owner/search/cto?nearbyArea=2&nearbyArea=232&nearbyArea=233&nearbyArea=246&nearbyArea=350&nearbyArea=94&query=${req.params.make}&searchNearby=2&sort=date`
      );
      const html = await response.text();
      const $ = cheerio.load(html);
      const results = [];

      $(".result-info").each((i, el) => {
        const title = $(el).find(".result-heading").text().trim();

        results.push(title);
      });

      res.json(results);
    } catch (err) {
      console.error(err);
    }
  };

  fetchResults();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
