import "./styles.less";
import "regenerator-runtime/runtime";
// import BlackBoxPlusInfo from './components/blackBoxPlusInfo';
// window.blackboxPlusInfo = new BlackBoxPlusInfo('Exporter');
import BlackBoxPlusExport from './components/BlackBoxPlusExport';
import {json2csvAsync} from 'json-2-csv';

var blackBoxPlusExport = new BlackBoxPlusExport('Data Exporter');
window.blackBoxPlusExport = blackBoxPlusExport;

console.debug("Configuring BlackBox Plus");
blackBoxPlusExport.setHeader('BB+ Exporter');
blackBoxPlusExport.setStatusLoading('Initial Setup');

(async () => {


    if (!window.blackBoxPlusFootage) {
        window.blackBoxPlusFootage = await blackBoxPlusExport.getAllFootage();
    }
    if (!window.blackBoxPlusFinancials) {
        window.blackBoxPlusFinancials = await blackBoxPlusExport.getAllFinancials();
    }

    blackBoxPlusExport.setStatusProcessing('the creation of CSV files');
    // blackBoxPlusExport.addMessage('<h2>Footage data is: </h2><code>' + JSON.stringify(blackBoxPlusFootage) + `</code>`);
    let linkhrefAndClassesJson = `href="#" class="bbox_plus_download_link bbox_plus_download_json"`;
    let linkhrefAndClassesCsv = `href="#" class="bbox_plus_download_link bbox_plus_download_csv"`;
    blackBoxPlusExport.setInterface(`<h2>BlackBox Plus - Data Export</h2>
<p>Click the links below to download the:<br />
${blackBoxPlusFootage.contribute.length} Workspace Items as <a ${linkhrefAndClassesJson} id="bbox_plus_download_workspace_items_contribute_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_workspace_items_contribute_csv">.csv</a><br />
${blackBoxPlusFootage.curation.length} Curation Items as <a ${linkhrefAndClassesJson} id="bbox_plus_download_workspace_items_curation_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_workspace_items_curation_csv">.csv</a><br />
${blackBoxPlusFootage.content.length} Submitted Content Items as <a ${linkhrefAndClassesJson} id="bbox_plus_download_workspace_items_content_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_workspace_items_content_csv">.csv</a><br />
Or All Footage Items as <a ${linkhrefAndClassesJson} id="bbox_plus_download_workspace_items_all_json">.json</a><br />
<br />
<h2>Financial Summary</h2>
Earnings Summary as <a ${linkhrefAndClassesJson} id="bbox_plus_download_financial_earnings_summary_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_financial_earnings_summary_csv">.csv</a><br />
Financial Summary as <a ${linkhrefAndClassesJson} id="bbox_plus_download_financial_summary_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_financial_summary_csv">.csv</a><br />
Financial Payment History as <a ${linkhrefAndClassesJson} id="bbox_plus_download_financial_payment_history_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_financial_payment_history_csv">.csv</a><br />
Financial Total Earnings Report as <a ${linkhrefAndClassesJson} id="bbox_plus_download_financial_total_earnings_report_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_financial_total_earnings_report_csv">.csv</a><br />
Unpaid Earnings List (recently sold but not yet paid) as <a ${linkhrefAndClassesJson} id="bbox_plus_download_unpaid_earnings_json">.json</a> as <a ${linkhrefAndClassesCsv} id="bbox_plus_download_unpaid_earnings_csv">.csv</a><br />
Or All Financials as <a ${linkhrefAndClassesJson} id="bbox_plus_download_financials_all_json">.json</a><br />

</p>`);


    // ----------------------------------------------------------------------------
    //   CSV
    // ----------------------------------------------------------------------------
    let csvData = {blackBoxPlusFootage: {}, blackBoxPlusFinancials: {}};
    // -- Footage
    let bbox_plus_download_workspace_items_contribute_csv_promise = json2csvAsync(blackBoxPlusFootage.contribute, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFootage.contribute = data;
    });
    let bbox_plus_download_workspace_items_curation_csv_promise = json2csvAsync(blackBoxPlusFootage.curation, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFootage.curation = data;
    });

    let bbox_plus_download_workspace_items_content_csv_promise = json2csvAsync(blackBoxPlusFootage.content, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFootage.content = data;
    });

    // -- Financials
    let bbox_plus_download_financial_earnings_summary_csv_promise = json2csvAsync(blackBoxPlusFinancials.financialEarningsSummary.items, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFinancials.financialEarningsSummary = data;
    });
    let bbox_plus_download_financial_summary_csv_promise = json2csvAsync(blackBoxPlusFinancials.financialSummaryInfo, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFinancials.financialSummaryInfo = data;
    });
    let bbox_plus_download_financial_payment_history_csv_promise = json2csvAsync(blackBoxPlusFinancials.financialPaymentHistory, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFinancials.financialPaymentHistory = data;
    });
    let bbox_plus_download_financial_total_earnings_report_csv_promise = json2csvAsync(blackBoxPlusFinancials.financialTotalEarningsReport, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFinancials.financialTotalEarningsReport = data;
    });
    let bbox_plus_download_unpaid_earnings_csv_promise = json2csvAsync(blackBoxPlusFinancials.unpaidEarnings.items, {expandArrayObjects: true}).then(function (data) {
        csvData.blackBoxPlusFinancials.unpaidEarnings = data;
    });
    // bbox_plus_download_financial_earnings_summary_csv // process blackBoxPlusFinancials.financialEarningsSummary.items
    // bbox_plus_download_financial_summary_csv // process blackBoxPlusFinancials.financialSummaryInfo
    // bbox_plus_download_financial_payment_history_csv // process financialPaymentHistory
    // bbox_plus_download_financial_total_earnings_report_csv // process financialTotalEarningsReport
    // bbox_plus_download_unpaid_earnings_csv // process blackBoxPlusFinancials.unpaidEarnings.items


    // Wait for the CSV file processing to be completed
    await Promise.all([bbox_plus_download_workspace_items_contribute_csv_promise,bbox_plus_download_workspace_items_curation_csv_promise,  bbox_plus_download_workspace_items_content_csv_promise,
        bbox_plus_download_financial_earnings_summary_csv_promise, bbox_plus_download_financial_summary_csv_promise, bbox_plus_download_financial_payment_history_csv_promise, bbox_plus_download_financial_total_earnings_report_csv_promise, bbox_plus_download_unpaid_earnings_csv_promise
    ]);
    console.debug('csvData char length is ', JSON.stringify(csvData).length);
    let dateFormat = blackBoxPlusExport.getFormattedDate(); // e.g 2012-09-05th 09:02AM Based on https://www.willmaster.com/library/generators/date-and-time-formatting.php using {Y}-{M}-{D}{st} {h}:{m}{ap}
    // Footage
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_workspace_items_contribute_csv')[0], csvData.blackBoxPlusFootage.contribute, `${dateFormat} BlackBox Footage - Contribute Workspace Items`);
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_workspace_items_curation_csv')[0], csvData.blackBoxPlusFootage.curation, `${dateFormat} BlackBox Footage - Curation Items`);
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_workspace_items_content_csv')[0], csvData.blackBoxPlusFootage.content, `${dateFormat} BlackBox Footage - Processed Submitted Items`);
    // Finances
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_financial_earnings_summary_csv')[0], csvData.blackBoxPlusFinancials.financialEarningsSummary, `${dateFormat} BlackBox Financials Earnings Summary`);
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_financial_summary_csv')[0], csvData.blackBoxPlusFinancials.financialSummaryInfo, `${dateFormat} BlackBox Financials Summary Info`);
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_financial_payment_history_csv')[0], csvData.blackBoxPlusFinancials.financialPaymentHistory, `${dateFormat} BlackBox Financials Payment History`);
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_financial_total_earnings_report_csv')[0], csvData.blackBoxPlusFinancials.financialTotalEarningsReport, `${dateFormat} BlackBox Financials Total Earnings Report`);
    blackBoxPlusExport.makeLinkElementDownloadCsv($('#bbox_plus_download_unpaid_earnings_csv')[0], csvData.blackBoxPlusFinancials.unpaidEarnings, `${dateFormat} BlackBox Financials Unpaid Earnings`);

    // ----------------------------------------------------------------------------
    //   JSON
    // ----------------------------------------------------------------------------
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_contribute_json')[0], blackBoxPlusFootage.contribute, `${dateFormat} BlackBox Contribute Workspace Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_curation_json')[0], blackBoxPlusFootage.curation, `${dateFormat} BlackBox Curation Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_content_json')[0], blackBoxPlusFootage.content, `${dateFormat} BlackBox Content Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_workspace_items_all_json')[0], blackBoxPlusFootage, `${dateFormat} BlackBox All Footage Items`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_financial_earnings_summary_json')[0], blackBoxPlusFinancials.financialEarningsSummary, `${dateFormat} BlackBox Financial Earnings Summary Info`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_financial_summary_json')[0], blackBoxPlusFinancials.financialSummaryInfo, `${dateFormat} BlackBox Financial Summary Info`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_financial_payment_history_json')[0], blackBoxPlusFinancials.financialPaymentHistory, `${dateFormat} BlackBox Financial Payment History`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_financial_total_earnings_report_json')[0], blackBoxPlusFinancials.financialTotalEarningsReport, `${dateFormat} BlackBox Financial Total Earnings Report`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_unpaid_earnings_json')[0], blackBoxPlusFinancials.unpaidEarnings, `${dateFormat} BlackBox Financial Unpaid Earnings Summary Info`);
    blackBoxPlusExport.makeLinkElementDownloadJson($('#bbox_plus_download_financials_all_json')[0], blackBoxPlusFinancials, `${dateFormat} BlackBox All Financials`);
    blackBoxPlusExport.setStatusDone(`<span onClick="window.scrollTo(0,document.body.scrollHeight);">View the links in the footer</span>`);
    scrollTo(0, document.body.scrollHeight);

    // If we want to Dedupe the contents, best option seems to be doing it based on footageId?
    // https://wsvincent.com/javascript-remove-duplicates-array/
    // let footageIds = blackBoxPlusFootage.content.map(function (footage) {
    //     return footage.footageId;
    // });
    // let uniqueFootageIds = [...new Set(footageIds)];

})();


