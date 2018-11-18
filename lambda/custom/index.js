const Alexa = require('ask-sdk-core');

const SKILL_NAME = "罰ゲーム判定";
const FALLBACK_MESSAGE = "";
const FALLBACK_REPROMPT = "";
const ERROR_MESSAGE = "ごめんなさい。何か問題がおきました。";
const STOP_MESSAGE = "さようなら";

const data = require('./data');

const beforeSounds = [
    "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alarm_02'/>",
    "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_05'/>",
    "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_alien_voice_05'/>",
    "<audio src='soundbank://soundlibrary/scifi/amzn_sfx_scifi_explosion_01'/>"
];

const afterSounds = [
    "<audio src='soundbank://soundlibrary/human/amzn_sfx_crowd_cheer_med_01'/>",
    "<audio src='soundbank://soundlibrary/human/amzn_sfx_large_crowd_cheer_03'/>"
];

const afterVoices1 = [
    "<say-as interpret-as='interjection'>さあて</say-as>",
    "<say-as interpret-as='interjection'>ふふっ</say-as>",
    "<say-as interpret-as='interjection'>うわ〜</say-as>",
    "<say-as interpret-as='interjection'>ようし</say-as>",
    "<say-as interpret-as='interjection'>それでは</say-as>",
    "<say-as interpret-as='interjection'>うふふ</say-as>"
];
const afterVoices2 = [
    "<say-as interpret-as='interjection'>がんばって</say-as>",
    "<say-as interpret-as='interjection'>がんばってね</say-as>",
    "<say-as interpret-as='interjection'>がんばってくださいね</say-as>",
    "<say-as interpret-as='interjection'>どうぞ</say-as>",
    "<say-as interpret-as='interjection'>どうぞよろしくお願いします</say-as>",
    "<say-as interpret-as='interjection'>よろしくお願いします</say-as>",
    "<say-as interpret-as='interjection'>いつでもどうぞ</say-as>"
];

const GetPenaltyGameHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest'
        || (request.type === 'IntentRequest'
          && request.intent.name === 'GetPenaltyGameIntent');
    },
    handle(handlerInput) {
      let randomData = data.value[Math.floor(Math.random() * data.value.length)];
      let beforeSound = beforeSounds[Math.floor(Math.random() * beforeSounds.length)];
      let afterSound = afterSounds[Math.floor(Math.random() * afterSounds.length)];
      let afterVoice1 = afterVoices1[Math.floor(Math.random() * afterVoices1.length)];
      let afterVoice2 = afterVoices2[Math.floor(Math.random() * afterVoices2.length)];
      let speechOutput = 'これから、罰ゲームを発表します。<break time="200ms"/>心の準備はいいですか？' +
            '<break time="1000ms"/>罰ゲームは<break time="500ms"/>' +
            beforeSound + randomData + '<break time="200ms"/>です！' +
            afterSound + afterVoice1 + '<break time="100ms"/>' + afterVoice2;
  
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .getResponse();
    },
  };
  
  const FallbackHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(FALLBACK_MESSAGE)
        .reprompt(FALLBACK_REPROMPT)
        .getResponse();
    },
  };
  
  const ExitHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
          || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak(STOP_MESSAGE)
        .getResponse();
    },
  };
  
  const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
  
      return handlerInput.responseBuilder.getResponse();
    },
  };
  
  const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
  
      return handlerInput.responseBuilder
        .speak(ERROR_MESSAGE)
        .reprompt(ERROR_MESSAGE)
        .getResponse();
    },
  };
  
  const skillBuilder = Alexa.SkillBuilders.custom();
  
  exports.handler = skillBuilder
    .addRequestHandlers(
      GetPenaltyGameHandler,
      ExitHandler,
      FallbackHandler,
      SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
