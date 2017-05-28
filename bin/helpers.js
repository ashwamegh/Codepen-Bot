'use strict';

const botBuilder = require('claudia-bot-builder');
const slackTemplate = botBuilder.slackTemplate;

let promise = require('request-promise');

const greetTheUser = (username) => {
  let message = getGreetMessage(username);
    return {
        "mrkdwn": true,
        "response_type": "in_channel",
        "text": message
        // "color": "#111"
    };
};

function setOptions(url) {
    return {
            uri: url,
            headers: { 'User-Agent': 'Request-Promise'},
            json: true // Automatically parses the JSON string in the response 
    };
}

function notFound(){
    return{
          "mrkdwn": true,
          "text": "No results found!"
      };
}

const handleSearchCommand = (url, searchTitle) =>{
  if (url !== ""){
   return promise(setOptions(url)).then((data) =>{
      if(data.data!== undefined  ){
        if(data.data.length > 0){

            let privatResultWithTopic = new slackTemplate(searchTitle);

                data.data.forEach(function(entry, i) {

                i++;

                return privatResultWithTopic.addAttachment('A'+i)
                    .addTitle(i + ". " + entry.title, entry.link)
                    .addText(clearResponse(entry.content||entry.details));

            });
                
            return privatResultWithTopic.get();   
        }
        else{
              return notFound();
        }
   }else{
     return notFound();
   } 
    }).catch(err => console.log(err));
  }
  else{
      return{
            "mrkdwn": true,
            "text": "Please enter the category `pens` or `posts` followed by your `Search Query`"
        };
  }

}

const clearResponse = (text)=>{
    return text.replace(/(<([^>]+)>)/ig, "");
}

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
  greetTheUser: greetTheUser,
  search      : handleSearchCommand
}
