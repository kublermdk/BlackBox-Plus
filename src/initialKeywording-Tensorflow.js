import "./styles.less";
import "regenerator-runtime/runtime";

// import imageRecognition from "./components/mobileNetImageAnalysis";
// imageRecognition($('img')[2]);
import BlackBoxPlusTensorFlow from "./components/BlackBoxPlusTensorFlow";
//
//
(async () => {
    var blackBoxPlusTensorFlow = new BlackBoxPlusTensorFlow('Initial Keywording');
    window.blackBoxPlusTensorFlow = blackBoxPlusTensorFlow;
// @todo: Do stuff
    blackBoxPlusTensorFlow.setHeader('BB+ Init Keywording');
    // await blackBoxPlusTensorFlow.loadTensorFlow();
    blackBoxPlusTensorFlow.addMessage(`<p>Ready for Processing</p>`);
    blackBoxPlusTensorFlow.setStatusDone(`Start playing a video then click the button at the bottom of the page`);

    // @todo: Only enable the button if there's an active video playing.
    blackBoxPlusTensorFlow.setInterface(`<h2>BlackBox Plus Image Analysis</h2><p>Click the button when a video is playing in edit mode to get a list of the suggested keywords <br /><button class="bbox_plus_button btn btn-success btn-lrg m-btn" onClick="(async () => {blackBoxPlusTensorFlow.displayKeywordsFromClassification(await blackBoxPlusTensorFlow.processCurrentVideoFrame())})()">processCurrentVideoFrame</button></p>`)

    // blackBoxPlusTensorFlow.processCurrentVideoFrame();
})();
