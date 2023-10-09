import { Messenger } from "../../classes/messenger.js";
Messenger.setRoute('canvas', message => {
    console.log('canvas recieved', message.content);
});
