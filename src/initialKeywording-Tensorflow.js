import "./styles.less";
import "regenerator-runtime/runtime";

import imageRecognition from "./components/mobileNetImageAnalysis";
imageRecognition($('img')[2]);
// import BlackBoxPlusTensorFlow from "./components/BlackBoxPlusTensorFlow";
//
// var blackBoxPlusTensorFlow = new BlackBoxPlusTensorFlow('Initial Keywording');
// window.blackBoxPlusTensorFlow = blackBoxPlusTensorFlow;
// blackBoxPlusTensorFlow.setStatusProcessing('Initial Setup');
//
// (async () => {
// // @todo: Do stuff
//     blackBoxPlusTensorFlow.setHeader('BB+ Init Keywording');
//     await blackBoxPlusTensorFlow.loadTensorFlow();
//     blackBoxPlusTensorFlow.addMessage(`<p>Ready for Processing</p>`);
//     blackBoxPlusTensorFlow.setStatusDone(`Start playing a video then click the button at the bottom of the page`);
//
//     // @todo: Only enable the button if there's an active video playing.
//     blackBoxPlusTensorFlow.setInterface(`<p><button class="bbox_plus_button" onClick="blackBoxPlusTensorFlow.processCurrentVideoFrame()">processCurrentVideoFrame</button></p>`)
//
//     // blackBoxPlusTensorFlow.processCurrentVideoFrame();
// })();
