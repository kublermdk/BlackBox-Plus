import "./styles.less";
import "regenerator-runtime/runtime";
// import BlackBoxPlusInfo from './components/blackBoxPlusInfo';
// window.blackboxPlusInfo = new BlackBoxPlusInfo('Exporter');
import BlackBoxPlusExport from './components/BlackBoxPlusExport';


var blackBoxPlusExport = new BlackBoxPlusExport('Data Exporter');
window.blackBoxPlusExport = blackBoxPlusExport;

console.debug("Configuring BlackBox Plus");
blackBoxPlusExport.setHeader('BB+ Exporter');
blackBoxPlusExport.setStatusProcessing('Initial Setup');

(async () => {


    if (!window.blackBoxPlusFootage) {

        const blackBoxPlusFootage = await blackBoxPlusExport.getAllFootage();
        window.blackBoxPlusFootage = blackBoxPlusFootage;

    } else {
        const blackBoxPlusFootage = window.blackBoxPlusFootage;
    }

    blackBoxPlusExport.setStatusDone(`loaded all the footage info.`);
    // blackBoxPlusExport.addMessage('<h2>Footage data is: </h2><code>' + JSON.stringify(blackBoxPlusFootage) + `</code>`);
    blackBoxPlusExport.addMessage(`<h2>Footage data</h2><p>Contains:<br />Workspace Items: ${blackBoxPlusFootage.curation.length}<br />Curation Items: ${blackBoxPlusFootage.content.length}<br />Submitted Content Items: ${blackBoxPlusFootage.content.length}<br /></p>`); // <code>' + JSON.stringify(blackBoxPlusExport.content.length) + `</code>

    // If we want to Dedupe the contents, best option seems to be doing it based on footageId?
    // https://wsvincent.com/javascript-remove-duplicates-array/
    // let footageIds = blackBoxPlusFootage.content.map(function (footage) {
    //     return footage.footageId;
    // });
    // let uniqueFootageIds = [...new Set(footageIds)];


    // @todo Create a list of the filenames

    let fullDownloadLink = blackBoxPlusExport.returnDownloadLinkElement(JSON.stringify(blackBoxPlusFootage, null, 2), 'footage.json', 'application/json');
    blackBoxPlusExport.infoHeaderElement.appendChild(fullDownloadLink);

})();


