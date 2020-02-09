// @todo import zepto?
import BlackBoxPlusInfo from "./BlackBoxPlusInfo";

export default class BlackBoxPlusExport extends BlackBoxPlusInfo {

    // https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/contribute/footage?index=11&limit=10
    countInTabs;

    async getCountInTabs() {
        if (!this.countInTabs) {
            let memberId = this.getMemberId();
            this.setStatusLoading(`the count of items`);
            let url = `https://portal.blackbox.global/api/member/${memberId}/footage/count_in_tabs`; // How many items?
            let headers = this.getAPICallHeaders('GET');
            let countInTabsResponse = await fetch(url, headers);
            if (false === countInTabsResponse.ok) {
                this.setStatusError('Not able to get a count of how much footage you have');
                this.addFlashMessage(`Error: Unable to access the footage/count_in_tabs API endpoint`);
                return footage;
            }
            this.countInTabs = await countInTabsResponse.json();
            console.debug("The countInTabs is: ", this.countInTabs);
        }
        return this.countInTabs;
    }

    /**
     * Gather Footage Info
     * @param type Type can be one of: contribute, curation, content
     * @returns {Promise<[]>}
     */
    async gatherFootageData(type = 'contribute') {
        let memberId = this.getMemberId();
        let limit = 200; // How many results at a time
        let headers = this.getAPICallHeaders('GET');
        let footage = [];
        this.setStatusLoading(`the ${type} results`);

        await this.getCountInTabs(); // Ensure the count is set
        // Example count_in_tabs response = {"countContributeFootages":115,"countCurationFootages":0,"countContentFootages":658}
        let typeMapping = {
            contribute: {
                totalRecords: this.countInTabs.countContributeFootages,
                apiType: 'contribute',
                apiPost: '',
            },
            curation: {
                totalRecords: this.countInTabs.countCurationFootages,
                apiType: 'curationFootage',
                apiPost: '',
            },
            content: {
                totalRecords: this.countInTabs.countContentFootages,
                apiType: 'content',
                // apiPost: '',
                apiPost: '&contentFilter=O',
            }
        };

        let totalRecords = typeMapping[type].totalRecords;
        let apiType = typeMapping[type].apiType;
        // let apiPost = typeMapping[type].apiPost;
        let pagesNeeded = Math.ceil(totalRecords / limit);
        console.debug({type, totalRecords, apiType, pagesNeeded});
        for (let page = 1; page <= pagesNeeded; page++) {

            let index = (page - 1) * limit + 1;
            this.setStatusLoading(`the ${type} items. Page ${page} of ${pagesNeeded}`);
            let url = `https://portal.blackbox.global/api/member/${memberId}/${apiType}/footage?index=${index}&limit=${limit}${typeMapping[type].apiPost}`;
            let request = await fetch(url, headers);
            if (request.ok) {
                let requestContent = await request.json();
                // NB: The Workspace response includes success: true and the rest inside a data object. But the content results don't do this
                // if (requestContent.success !== true) {
                //     this.setStatusError(`API said it was not successful when trying to get your ${type} footage information. Page ${page} of ${pagesNeeded}`);
                //     console.error({error: 'Success is not true in the API response', url, requestContent});
                //     return footage;
                // }
                if (requestContent && requestContent.data && requestContent.data.list && requestContent.data.list.length) {
                    // console.debug(`Adding the ${requestContent.data.list.length} ${type} footage entries to the list. Page ${page} of ${pagesNeeded}`, requestContent);
                    footage = [].concat(footage, requestContent.data.list);

                } else if (requestContent && requestContent.list && requestContent.list.length) {
                    // console.debug(`Adding the ${requestContent.list.length} ${type} footage entries to the list. Page ${page} of ${pagesNeeded}`, requestContent);
                    footage = [].concat(footage, requestContent.list);
                }
            } else {
                this.setStatusError(`Unable to access a copy of your ${type} footage information`);
                console.error(`Unable to access a copy of your ${type} footage information. Page ${page} of ${pagesNeeded}. URL: ${url}`, request);
                return footage;
            }
        }
        this.setStatusProcessing(`the ${footage.length} ${type} entries`);

        return footage;

        // Contribute
        // https://portal.blackbox.global/api/member/${memberId}/project/${element.projectId}/`, headers);
        // https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/contribute/footage?index=11&limit=10

        // Example Response: {"success":true,"data":{"list":[{"footageId":"62754493-ccc1-4672-bcf7-afdd1481ee09","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0025.mp4","createdAt":"2020-01-02T05:49:36.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"9c0c0baa-c715-4e2e-90b2-e92b30581b8c","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0050.mp4","createdAt":"2020-01-02T05:39:24.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"ac7a8997-7977-4861-8cdd-553b5d7fc35b","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0049.mp4","createdAt":"2020-01-02T05:37:20.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"98614246-2c40-4b9f-855b-a5a220f66a18","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0027.mp4","createdAt":"2020-01-02T05:31:00.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"72a038ab-c6d1-441a-9a43-8f29a994eb26","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0048.mp4","createdAt":"2020-01-02T05:27:22.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"20d41152-fc72-4826-9999-cd68e2646927","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0046.mp4","createdAt":"2020-01-02T05:25:09.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"3578ecb0-ca2e-4460-93df-d7fe8abac275","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0047.mp4","createdAt":"2020-01-02T05:21:57.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"2f3b4369-6ba0-478a-8b9b-1147d555c8cf","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0042.mp4","createdAt":"2020-01-02T05:16:03.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"0e5f70d7-a378-492c-8b1f-9b80fd152d34","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0045.mp4","createdAt":"2020-01-02T05:13:43.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"c7b1de39-a64e-4c41-91cf-f6a2d96d1301","memberId":"5afd6163-a82a-4079-8e3a-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3a-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0044.mp4","createdAt":"2020-01-02T05:07:27.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null}],"pageInfo":{"totalRecords":115,"totalDisplayRecords":10}}}
    }

    async getAllFootage() {

        let blackBoxPlusFootage = {};
        return new Promise((resolve, reject) => {

            this.getCountInTabs().then(() => {

                let contributePromise = this.gatherFootageData('contribute').then(function (data) {
                    blackBoxPlusFootage.contribute = data;
                    console.debug(`The contribue footage contains ${data.length} entries`);
                });
                let curationPromise = this.gatherFootageData('curation').then(function (data) {
                    blackBoxPlusFootage.curation = data
                });
                let contentPromise = this.gatherFootageData('content').then(function (data) {
                    blackBoxPlusFootage.content = data
                });

                // When all completed
                Promise.all([contributePromise, curationPromise, contentPromise]).then(function (data) {

                    console.debug('The footages data is: ', blackBoxPlusFootage);
                    window.blackBoxPlusFootage = blackBoxPlusFootage;
                    resolve(blackBoxPlusFootage);

                });
            });

        });
    }


// Based on https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2
    convertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') {
                    line += ','
                }
                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    exportCSVFile(headers, items, fileTitle) {
        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = this.convertToCSV(jsonObject);

        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }


    /**
     * Make Link Element Download
     *
     * Give it an existing A Href element and turn it into a link to a file download
     *
     * @param element
     * @param content
     * @param fileName
     * @param contentType
     * @returns {*}
     */
    makeLinkElementDownload(element, content, fileName, contentType) {
        let file = new Blob([content], {type: contentType});
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        return element; // Don't actually need the returned element
    }


    /**
     * Make Link Element Download Json
     *
     * Give it a link element, the array, object or whatever, plus the filename
     * @param element
     * @param jsonContent
     * @param fileName
     */
    makeLinkElementDownloadJson(element, jsonContent, fileName = 'BlackBox.json') {
        return this.makeLinkElementDownload(element, JSON.stringify(jsonContent, null, 2), fileName + '.json', 'application/json');
    }

    // If you want an element
    returnDownloadLinkElement(content, fileName, contentType) {
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.innerText = fileName;
        return a;
        // a.click(); // Automatically try to download the file
    }

//
//     var headers = {
//         model: 'Phone Model'.replace(/,/g, ''), // remove commas to avoid errors
//         chargers: "Chargers",
//         cases: "Cases",
//         earphones: "Earphones"
//     };
//
//     itemsNotFormatted = [
//         {
//             model: 'Samsung S7',
//             chargers: '55',
//             cases: '56',
//             earphones: '57',
//             scratched: '2'
//         },
//         {
//             model: 'Pixel XL',
//             chargers: '77',
//             cases: '78',
//             earphones: '79',
//             scratched: '4'
//         },
//         {
//             model: 'iPhone 7',
//             chargers: '88',
//             cases: '89',
//             earphones: '90',
//             scratched: '6'
//         }
//     ];
//
//     var itemsFormatted = [];
//
// // format the data
//     itemsNotFormatted.forEach((item) => {
//     itemsFormatted.push({
//                             model: item.model.replace(/,/g, ''), // remove commas to avoid errors,
//     chargers: item.chargers,
//     cases: item.cases,
//     earphones: item.earphones
// });
// });
//
// var fileTitle = 'orders'; // or 'my-unique-title'
//
// exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
}