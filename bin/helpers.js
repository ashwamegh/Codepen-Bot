'use strict';

const botBuilder = require('claudia-bot-builder');
const slackTemplate = botBuilder.slackTemplate;

const greetTheUser = (username) => {
  let message = getGreetMessage(username);
    return {
        "mrkdwn": true,
        "response_type": "in_channel",
        "text": message
        // "color": "#111"
    };
};

const getGreetMessage = (username) => {
    return ">Hello " + username +
           "\n>I am Codepen Bot. I can serve you anything you want from codepen."
           + "\n>Just follow as indicated"
           + "\n\n>*`/codepen-bot`* to display the greet message"
           + "\n>*`/codepen-bot-search pens[collect]`*";
};

module.exports ={
  // SLACK BOT COMMANDS
  WELCOME_COMMAND : "/codepenbot",
  SEARCH_COMMAND : "/codepenbot-search",
  BASE_URL : "http://cpv2api.com",
  
  // SLACK CALLBACKS FOR INTEGRATED COMMANDS
  greetTheUser: greetTheUser
}
