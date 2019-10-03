const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) {
    app.get('/api/scrape', function (req, res) {
        axios.get('https://www.npr.org/sections/technology/').then(function (response) {
            const $ = cheerio.load(response.data);
            $('#overflow article.item.has-image').each(function (i, element) {
                let result = {};
                result.headline = $(this).find('h2.title a').text();
                result.link = $(this).find('h2.title a').attr('href');
                result.imageSrc = $(this).find('div.item-image img').attr('src');
                result.imageAlt = $(this).find('div.item-image img').attr('alt');
                result.imageCaption = $(this).find('div.item-image span.credit').text().replace(/[\t\n]+/g, ' ').trim();
                const rawDate = $(this).find('p.teaser span.date').text();
                const trimmedDate = rawDate.substring(0, rawDate.length - 3);
                const rawSummary = $(this).find('p.teaser a').text().substring(trimmedDate.length + 3);
                result.summary = rawSummary;
                result.date = trimmedDate;
                result.saved = false;
                console.log(result);
                db.Article.findOne({ headline: result.headline })
                    .then(function (dbArticle) {
                        if (dbArticle === null) {
                            db.Article.create(result)
                                .then(function (newDbArticle) {
                                    console.log(newDbArticle);
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                        } else {
                            console.log('Already added');
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });
            res.location('/');
        });
    });

    app.put('/api/:status', function (req, res) {
        const articleId = req.body.id;
        let saveStatus;
        console.log(req.body);
        console.log(req.params.id);
        if (req.params.status === 'save') {
            saveStatus = true;
            db.Article.findOneAndUpdate({_id: articleId}, {saved: saveStatus})
            .then(function (dbArticle) {
                res.json(dbArticle);
                console.log(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
        } else if (req.params.status === 'remove') {
            saveStatus = false;
            db.Article.findOneAndUpdate({_id: articleId}, {saved: saveStatus})
            .then(function (dbArticle) {
                res.json(dbArticle);
                console.log(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
        }
    });

    app.post('/api/notes', async function (req, res) {
        console.log(req.body);
        const noteBody = {body: req.body.note}
        await db.Note.create(noteBody)
        .then(function(dbNote) {
          return db.Article.findOneAndUpdate({_id: req.body.id}, { $push: { notes: dbNote._id }}, { new: true, useFindAndModify: false });
        })
        .then(function(dbArticle) {
          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

    app.delete('/api/notes', async function (req, res) {
        console.log(req.body);
        await db.Note.deleteOne({_id : req.body.id})
        .then(function(dbDeleted) {
            console.log(dbDeleted);
            res.json(dbDeleted);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
};