'use strict';

const botBuilder = require('claudia-bot-builder');
const helpers = require('./helpers');

module.exports = botBuilder(request => {
  let text = request.text;
  let command = request.originalRequest.command

  let requestText = text.split(" ");
  let category = requestText.length>0 ? requestText[0] : "";
  let searchTopics = requestText.length>1 ? requestText.slice(1) : "";

  let topic = searchTopics!==""?searchTopics.join(" "): "";
  let searchTopic = searchTopics!==""?searchTopics.join("&"):"";
  let url = "";
  let searchTitle = `>Search results against your query in *${category}* for: *${topic}*`;
      // searchTitle = searchTopics !== "" ? 

  switch (command){
    case helpers.WELCOME_COMMAND:
      return helpers.greetTheUser(request.originalRequest.user_name);
    
    case helpers.SEARCH_COMMAND:
      url = category !== ""?helpers.BASE_URL+`/search/${category}/?q=${searchTopic}`:"";
      return helpers.search(url, searchTitle)

    default:
      console.log(`Oops! I think you forgot something. Please recheck your command ${command}`);

  };
});

