const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) { 
    app.get('/', function(req, res) {
        const nav = {
            home: true
        };
        db.Article.find({saved: false})
        .then(function (dbArticles) {
            res.locals.metaTags = {
                title: 'Medium JavaScript',
                description: 'Assignment required by UW Coding Bootcamp',
                keywords: 'mongo, medium, javascript'
            };
            console.log(dbArticles);
            res.render('index', {dbArticles, nav});
        })
        .catch(function (err) {
            console.log(err);
            res.render('error', {err});
        });
    });

    app.get('/saved', function (req, res) {
        db.Article.find({saved : true})
        .then(function (dbArticles) {
            res.render('saved', {dbArticles});
        })
        .catch(function (err) {
            console.log(err);
            res.render('error', {err});
        });
    });
}





// app.get('/scrape', function (req, res) {
//     // First, we grab the body of the html with axios
//     axios.get('http://www.echojs.com/').then(function (response) {
//         // Then, we load that into cheerio and save it to $ for a shorthand selector
//         var $ = cheerio.load(response.data);

//         // Now, we grab every h2 within an article tag, and do the following:
//         $('article h2').each(function (i, element) {
//             // Save an empty result object
//             var result = {};

//             // Add the text and href of every link, and save them as properties of the result object
//             result.title = $(this)
//                 .children('a')
//                 .text();
//             result.link = $(this)
//                 .children('a')
//                 .attr('href');

//             // Create a new Article using the `result` object built from scraping
//             db.Article.create(result)
//                 .then(function (dbArticle) {
//                     // View the added result in the console
//                     console.log(dbArticle);
//                 })
//                 .catch(function (err) {
//                     // If an error occurred, log it
//                     console.log(err);
//                 });
//         });

//         // Send a message to the client
//         res.send('Scrape Complete');
//     });
// });

// // Route for getting all Articles from the db
// app.get('/articles', function (req, res) {
//     // TODO: Finish the route so it grabs all of the articles
//     db.Article.find({})
//         .then(function (dbArticles) {
//             res.json(dbArticles);
//         })
//         .catch(function (err) {
//             // If an error occurred, log it
//             res.json(err);
//         });
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get('/articles/:id', function (req, res) {
//     // TODO
//     // ====
//     // Finish the route so it finds one article using the req.params.id,
//     // and run the populate method with 'note',
//     // then responds with the article with the note included
//     db.Article.findOne({ _id: req.params.id })
//         .populate('note')
//         .then(function (dbArticles) {
//             res.json(dbArticles);
//         })
//         .catch(function (err) {
//             // If an error occurred, log it
//             res.json(err);
//         });
// });

// // Route for saving/updating an Article's associated Note
// app.post('/articles/:id', function (req, res) {
//     // TODO
//     // ====
//     // save the new note that gets posted to the Notes collection
//     // then find an article from the req.params.id
//     // and update it's 'note' property with the _id of the new note
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             return db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { note: dbNote._id } }, { new: true });
//         })
//         .then(function (dbArticle) {
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             res.json(err);
//         });
// });