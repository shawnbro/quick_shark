Tangent
===

### GA WDI NYC Jan 14, Project 2

### Overview

**Tangent** is a web application that takes users on a journey of discovery through chosen words and their assoiations. Tangent was developed as a Rails project for the January 2014 Web Development Immersive course at General Assembly. It was developed over a one week sprint to model the agile software development process.

* Ruby 2.1.0
* Ruby on Rails 4.0.2
* PostgreSQL Database
* Authentication & Authorization (using bcypt-ruby)
* Ruby Gems:
  * HTTParty (Used to query web services and examine the resulting output)(https://github.com/jnunemaker/httparty)
  * Addresable/URI (Used to generate the url to access Google's API)(https://github.com/sporkmonger/addressable)
  * Bcrypt (Used to password protect ruby web app via authentication and authorization)(https://github.com/codahale/bcrypt-ruby)
  * Flickraw (A Ruby library used to access the Flickr API)(https://github.com/hanklords/flickraw)
  * d3-rails (Provides D3 for rails)(https://github.com/iblue/d3-rails)
  * Simplecov (Used to monitor test coverage)(https://github.com/colszowka/simplecov)
  * JSON (Used to use JSON objects in ruby)(https://github.com/douglascrockford/JSON-js)
* Javascript libraries:
  * D3.js (Used to visualize the data)(https://github.com/mbostock/d3)
  * Tooltip (Used to add event listeners to interactive elements)(https://github.com/x-tag/tooltip)
  * Keyboard.js (Used to make AJAX calls on keyboard arrow press)(https://github.com/RobertWHurst/KeyboardJS)
  * Tooltipsy.js (Used to add event listeners to interactive elements)(https://github.com/briancray/tooltipsy)
  * Darktooltip.js (Used to add event listeners to interactive elements)(https://github.com/darthrubens/darktooltip)
  * Pace.js (Used to show user when AJAX call is being made)(https://github.com/HubSpot/pace)
* APIs:
  * Wordnik (Used to find associative words and definitions)(http://developer.wordnik.com/)
  * Wolfram Alpha (Used to find stats on a certain topic)(http://products.wolframalpha.com/developers/)
  * Flickr (Used to generate pictures relating to a certain topic)(https://www.flickr.com/services/api/)
  * YouTube (Used to generate videos relating to a certain topic)(https://developers.google.com/youtube/)
  * Freebase (Used to generate descriptions relating to a certain topic)(https://developers.google.com/freebase/)
* TDD:
  * RSpec-Rails (Used to test methods)(https://github.com/rspec/rspec-rails)
  * Capybara (Used for acceptance testing)(https://github.com/jnicklas/capybara)
  * QT (Used to test javascript within capybara)(https://github.com/mirror/qt)
  * Factory Girl (Used to generate dummy models for testing)(https://github.com/thoughtbot/factory_girl)
  * FFaker (Used to randomly generate words for models used in tests)(https://github.com/EmmanuelOga/ffaker)

### User Stories Completed
* A user can view a saved journey visualization from first search to final search
* A user can get a description of the topic
* A registered user has a profile page with account information and journeys listed
* A user can create an account
* A user can log in/log out securely
* A registered user can delete a journey from a journey list
* A registered user can view a list of all journies
* A user can go to the home page and search
* A user can enter a term and see related topics
* A user can see the names of other topics branched out from the first topic
* A user can click on any word/topic on the tree and it will re-visualize it as the main word
* A user can get statistical information about a topic
* A user can click explore
* A user can save their "journey"
* A user can get any relevant video about the topic
* A registered user can end one journey and create a new journey at any time
* A registered user can view a bar graph visualization with each topic of the journey on it, and how long the user spent on the topic
* A user can end the journey at any time by clicking the journey end button

### ERD (https://github.com/shawnbro/quick_shark/blob/master/app/assets/images/TangentERD.jpg)

# A link to tangent can be found here: (https://tangentapp.herokuapp.com)

# The public repository for Tangent on Github can be found here: (https://github.com/shawnbro/quick_shark/blob/master/app/assets/images/TangentERD.jpg)

# A full list of user stories can be found by looking at [this Pivotal Tracker Project](https://www.pivotaltracker.com/s/projects/1040714)

---
###### Written by Rory Budnick, Shawn Broukhim, Kirsten Doyne, Cory Haber, Quincy Iheme, and Kevin McAlear
