import "./styles.less";
import "regenerator-runtime/runtime";
// import BlackBoxPlusInfo from './components/blackBoxPlusInfo';
import BlackBoxPlusTensorFlow from "./components/BlackBoxPlusTensorFlow";

var blackBoxPlusTensorFlow = new BlackBoxPlusTensorFlow('Initial Keywording');
window.blackBoxPlusTensorFlow = blackBoxPlusTensorFlow;
blackBoxPlusTensorFlow.setStatusProcessing('Initial Setup');

(async () => {
// @todo: Do stuff
    blackBoxPlusTensorFlow.loadTensorFlow();

});
