# Mongo NPR Scraper
[View Live](https://mongo---news.herokuapp.com)

## Motivation 
To create a web application that will allow users to scrape content from another website and store it in a MongoDB database, denote "Favorites" and add notes associated with particular content. The user interface should display the stored content clearly and attractively and make available user actions clear.

## Summary
This is a web application deployed with Heroku that scrapes the NPR Technology page for articles, adds previously unstored articles to a MongoDB database and then displays the MongoDB content on the home page. Users can save their favorite articles, delete past favorites and add/delete notes associated with articles.

## Details
This application is organized using the Model-View-Controller (MVC) design pattern. Mongoose is used as the Object Relational Mapper (ORM) and Handlebars is used as the templating engine. On home page load, articles that have been stored in the MongoDB database are displayed. When the 'Scrape Articles' button is clicked, the application makes an axios call to NPR to check for new articles. All articles that were previously unstored are added to the Articles collection in the MongoDB database and the content displayed on the page is retrieved from that database. Each article is displayed with a 'Save Article' button. When the user clicks this, the saved status is changed on the article in the MongoDB database and it will then be displayed on the 'Saved Articles' page. On the 'Saved Articles' page users can add/delete notes for each article and also remove the article from their saved list if they wish. These notes are saved in a MongoDB Notes collection that is associated with the Articles collection.

## Role
Sole developer responsible for design and code. Functionality requirements provided by UW Coding Bootcamp/Trilogy Education Services.

## Technologies
HTML
<br/>Handlebars
<br/>CSS
<br/>JavaScript
<br/>jQuery
<br/>MongoDB
<br/>Mongoose
<br/>Node.js
<br/>Express
<br/>Heroku
<br/>**Node Packages:** 
<br/>express, express-handlebars, mongoos, cheerio, axios
