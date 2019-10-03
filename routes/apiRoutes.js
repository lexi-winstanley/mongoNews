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

    app.post('/api/notes', function (req, res) {
        console.log(req.body);
        db.Note.create(req.body)
        .then(function(dbNote) {
          return db.Article.findOneAndUpdate({_id: req.params.id}, { $set: { note: dbNote._id } }, { new: true });
        })
        .then(function(dbArticle) {
          res.json(dbArticle);
        })
        .catch(function(err) {
          res.json(err);
        });
    });

    app.put('/api/notes', function (req, res) {
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
};














    // app.get('/articles', function (req, res) {
    //     db.Article.find({})
    //     .then(function (dbArticles) {
    //         res.json(dbArticles);
    //     })
    //     .catch(function (err) {
    //         res.json(err);
    //     });
    // });





//     app.get('/scrape', function (req, res) {
//         // First, we grab the body of the html with axios
//         axios.get('http://www.echojs.com/').then(function (response) {
//             // Then, we load that into cheerio and save it to $ for a shorthand selector
//             var $ = cheerio.load(response.data);

//             // Now, we grab every h2 within an article tag, and do the following:
//             $('article h2').each(function (i, element) {
//                 // Save an empty result object
//                 var result = {};

//                 // Add the text and href of every link, and save them as properties of the result object
//                 result.title = $(this)
//                     .children('a')
//                     .text();
//                 result.link = $(this)
//                     .children('a')
//                     .attr('href');

//                 // Create a new Article using the `result` object built from scraping
//                 db.Article.create(result)
//                     .then(function (dbArticle) {
//                         // View the added result in the console
//                         console.log(dbArticle);
//                     })
//                     .catch(function (err) {
//                         // If an error occurred, log it
//                         console.log(err);
//                     });
//             });

//             // Send a message to the client
//             res.send('Scrape Complete');
//         });
//     });
// }