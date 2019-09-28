const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) {
    app.get('/api/scrape', function (req, res) {
        axios.get('https://medium.com/topic/javascript').then(function (response) {
            const $ = cheerio.load(response.data);
            $('section.hp.hq.ap').each(function (i, element) {
                let result = {};
                result.headline = $(this).find('h3.aw.bh.ez.cd.fa.ce.gq.hz.ia.az.bc.gs.ff.fg.bb a').text();
                result.link = 'https://medium.com' + $(this).find('h3.aw.bh.ez.cd.fa.ce.gq.hz.ia.az.bc.gs.ff.fg.bb a').attr('href');
                result.summary = $(this).find('p.ci.cj.cd.b.ce.cf.cg.ch.az.bc.fi.ff.fg.bb.gj.gt a').text();
                result.author = $(this).find('span.cd.b.ce.cf.cg.ch.az.bc.fi.ff.fg.bb.aw.bh a').text();
                let otherInfo = $(this).find('span.cd.b.ce.cf.cg.ch.l.ci.cj div.he.ap.dl').text();
                let otherInfoSplit = otherInfo.split('\267');
                result.date = otherInfoSplit[0];
                result.readTime = otherInfoSplit[1];
                console.log(result);
            });
            res.json(response.data)
        });
    });
}


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