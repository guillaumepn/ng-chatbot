// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  dialogflow: {
    ngChatbot: '4b3546820a9b439599fbba9c8ba10abf'
  },
  firebase: {
    apiKey: "AIzaSyCerGIEnQPPo4WThyynI_6ITe5ZZw2CrRY",
    authDomain: "chatbot-57089.firebaseapp.com",
    databaseURL: "https://chatbot-57089.firebaseio.com",
    projectId: "chatbot-57089",
    storageBucket: "chatbot-57089.appspot.com",
    messagingSenderId: "522232257116"
  }
};
