'use strict';

const botBuilder = require('claudia-bot-builder');
const helpers = require('./helpers');

module.exports = botBuilder(request => {
  let command = request.originalRequest.command
  let requestText = request.text.split(" ")
  let category = requestText.length>1 ? requestText[0] : ""
  let searchTopics = requestText.length>2 ? requestText.slice(1) : ""
  let topic = searchTopics.join(" ")
  let searchTopic = searchTopics.join("&")
  let url = ""
  let searchTitle = `>Search results against your query for: ${topic}`
      // searchTitle = searchTopics !== "" ? 

  switch (command){
    case helpers.WELCOME_COMMAND:
      return helpers.greetTheUser(request.originalRequest.user_name);
    
    case helpers.SEARCH_COMMAND:
      url = category !== ""?helpers.BASE_URL+`/${category}/?q=${searchTopic}`: helpers.BASE_URL
      return helpers.search(url, searchTitle)
    default:
      console.log(`Oops! I think you forgot something. Please recheck your command ${command}`);

  };
});

