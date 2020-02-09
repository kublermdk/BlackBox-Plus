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

    // blackBoxPlusExport.addMessage('<h2>Footage data is: </h2><code>' + JSON.stringify(blackBoxPlusFootage) + `</code>`);
    blackBoxPlusExport.setInterface(`<h2>Footage data</h2>
<p>Click the links below to download the:<br />
${blackBoxPlusFootage.contribute.length} Workspace Items as <a href="" class="bbox_plus_download_link bbox_plus_download_json" id="bbox_plus_download_workspace_items_contribute_json">.json</a><br />
${blackBoxPlusFootage.curation.length} Curation Items as <a href=""  class="bbox_plus_download_link bbox_plus_download_json" id="bbox_plus_download_workspace_items_curation_json">.json</a><br />
${blackBoxPlusFootage.content.length} Submitted Content Items as <a href=""  class="bbox_plus_download_link bbox_plus_download_json" id="bbox_plus_download_workspace_items_content_json">.json</a><br />
Or All Footage Items as <a href="" class="bbox_plus_download_link bbox_plus_download_json" id="bbox_plus_download_workspace_items_all_json">.json</a><br />
</p>`);


    let dateFormat = blackBoxPlusExport.getFormattedDate(); // e.g 2012-09-05th 09:02AM Based on https://www.willmaster.com/library/generators/date-and-time-formatting.php using {Y}-{M}-{D}{st} {h}:{m}{ap}
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_contribute_json')[0], blackBoxPlusFootage.contribute, `${dateFormat} BlackBox Contribute Workspace Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_curation_json')[0], blackBoxPlusFootage.curation, `${dateFormat} BlackBox Curation Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_content_json')[0], blackBoxPlusFootage.content, `${dateFormat} BlackBox Content Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_all_json')[0], blackBoxPlusFootage, `${dateFormat} BlackBox All Footage Items`);
    blackBoxPlusExport.setStatusDone(`<span onClick="window.scrollTo(0,document.body.scrollHeight);">View the links in the footer</span>`);
    scrollTo(0,document.body.scrollHeight);


    // If we want to Dedupe the contents, best option seems to be doing it based on footageId?
    // https://wsvincent.com/javascript-remove-duplicates-array/
    // let footageIds = blackBoxPlusFootage.content.map(function (footage) {
    //     return footage.footageId;
    // });
    // let uniqueFootageIds = [...new Set(footageIds)];


})();


