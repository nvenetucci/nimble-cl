const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const app = express();

app.get("/api/:category/:make", (req, res) => {
  const fetchResults = async () => {
    try {
      const response = await fetch(
        `https://portland.craigslist.org/d/fill/search/${req.params.category}?nearbyArea=2&nearbyArea=232&nearbyArea=233&nearbyArea=246&nearbyArea=350&nearbyArea=94&query=${req.params.make}&searchNearby=2&sort=date`
      );
      const html = await response.text();
      const $ = cheerio.load(html);
      const results = [];

      $(".result-info").each((i, el) => {
        const time1 = $(el)
          .find(".result-date")
          .attr("title")
          .split(" ")[3]
          .split(":")
          .slice(0, 2)
          .join(":");
        const time2 = $(el).find(".result-date").attr("title").split(" ")[4];
        const link = $(el).find("a").attr("href");
        const title = $(el).find(".result-heading").text().trim();
        const price = $(el).find(".result-price").text();
        const nearby = $(el).find(".nearby").text();
        const location =
          nearby !== "" ? nearby : $(el).find(".result-hood").text().trim();

        results.push({
          time: time1 + " " + time2,
          link,
          title,
          price,
          location,
        });
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
