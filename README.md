# Mongo NPR Scraper

## Description
This is a web application deployed with Heroku that scrapes the NPR Technology page for articles, adds new articles to a MongoDB database and displays the stored articles on the home page. Articles can be saved and user notes added. The articles can also be removed from the saved section and notes can be deleted. 

## Organization
This application is organized using the Model-View-Controller (MVC) design pattern. Mongoose is used as the Object Relational Mapper (ORM) and Handlebars is used as the templating engine. 

## Instructions
On home page load, articles that have been stored in the database are displayed. When the 'Scrape Articles' button is clicked, the application makes an axios call to NPR to check for new articles. Each article is displayed with a 'Save Article' button. When the user clicks this, the saved status is changed on the article and it will then be displayed on the 'Saved Articles' page. On the 'Saved Articles' page users can add and delete notes for each article and also remove the article from their saved list if they wish. 


## Technologies Used
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


**Node Packages:** 
<br/>express, express-handlebars, mongoos, cheerio, axios

## Role
Sole developer with functionality requirements provided by UW Coding Bootcamp/Trilogy Education Services.

## https://mongo---news.herokuapp.com/
