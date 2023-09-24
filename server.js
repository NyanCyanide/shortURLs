const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shorturl");
const app = express();

const username = "<YOUR_USERNAME>";
const password = "<YOUR_PASSWORD>";

mongoose.connect(
    `mongodb+srv://${username}:${password}@cluster0.ljo9fdc.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrl.find();
    try {
        res.render("index", {shortUrls: shortUrls});
    } catch (error) {
        console.log(error);
        res.status(500)
    }
});

app.post("/shortUrls", async (req, res) => {
    await ShortUrl.create({
        full: req.body.fullUrl,
    });
    res.redirect('/')
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl})

    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started");
});
