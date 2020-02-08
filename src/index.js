// import "./styles.less";
import "regenerator-runtime/runtime";
import BlackBoxPlusInfo from './components/blackBoxPlusInfo';


window.blackboxPlusInfo = new BlackBoxPlusInfo();

console.debug("Configuring BlackBox Plus");
blackboxPlusInfo.setHeader('BB+ Exporter');
blackboxPlusInfo.setStatusProcessing('Initial Setup');

