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
                title: 'Medium JavaScript',
                description: 'Assignment required by UW Coding Bootcamp',
                keywords: 'mongo, medium, javascript'
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
            res.render('saved', {dbArticles});
        })
        .catch(function (err) {
            res.render('error', {err});
        });
    });
};