const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) { 
    app.get('/', function(req, res) {
        const nav = {
            home: true
        };
        db.Article.find({saved: false})
        .populate('notes')
        .then(function (dbArticles) {
            res.locals.metaTags = {
                title: 'NPR Technology Articles',
                description: 'Assignment required by UW Coding Bootcamp',
                keywords: 'mongo, npr'
            };
            res.render('index', {dbArticles, nav});
        })
        .catch(function (err) {
            res.render('error', {err});
        });
    });

    app.get('/saved', function (req, res) {
        db.Article.find({saved : true})
        .populate('notes')
        .then(function (dbArticles) {
            res.locals.metaTags = {
                title: 'NPR Technology Saved Articles',
                description: 'Assignment required by UW Coding Bootcamp',
                keywords: 'mongo, npr'
            };
            res.render('saved', {dbArticles});
        })
        .catch(function (err) {
            res.render('error', {err});
        });
    });
};