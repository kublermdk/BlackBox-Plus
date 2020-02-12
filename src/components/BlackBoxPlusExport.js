// @todo import zepto?
import BlackBoxPlusInfo from "./BlackBoxPlusInfo";

export default class BlackBoxPlusExport extends BlackBoxPlusInfo {

    // https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/contribute/footage?index=11&limit=10
    countInTabs;
    urlBaseCache;

    /**
     * getCountInTabs()
     *
     * @returns {Promise<*>}
     * Example this.countInTabs = {"countContributeFootages":115,"countCurationFootages":0,"countContentFootages":658}
     */
    async getCountInTabs(force = false) {
        if (!this.countInTabs || true === force) {
            this.setStatusLoading(`the count of items`);
            this.countInTabs = await this.callAPI(`/footage/count_in_tabs`);
            // console.debug("The countInTabs is: ", this.countInTabs);
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
                apiType: 'contribute/footage',
                apiPost: '',
            },
            curation: {
                totalRecords: this.countInTabs.countCurationFootages,
                apiType: 'curationFootage',
                apiPost: '',
            },
            content: {
                totalRecords: this.countInTabs.countContentFootages,
                apiType: 'content/footage',
                apiPost: '&contentFilter=A', // Get ALL the footage
            }
        };

        let totalRecords = typeMapping[type].totalRecords;
        let apiType = typeMapping[type].apiType;
        // let apiPost = typeMapping[type].apiPost;
        let pagesNeeded = Math.ceil(totalRecords / limit);
        // console.debug({type, totalRecords, apiType, pagesNeeded});
        for (let page = 1; page <= pagesNeeded; page++) {

            let index = (page - 1) * limit + 1;
            this.setStatusLoading(`the ${type} items. Page ${page} of ${pagesNeeded}`);
            let url = `https://portal.blackbox.global/api/member/${memberId}/${apiType}?index=${index}&limit=${limit}${typeMapping[type].apiPost}`;
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

        // Example Response: {"success":true,"data":{"list":[{"footageId":"62754493-ccc1-4672-bcf7-afdd1481ee09","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0025.mp4","createdAt":"2020-01-02T05:49:36.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"9c0c0baa-c715-4e2e-90b2-e92b30581b8c","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0050.mp4","createdAt":"2020-01-02T05:39:24.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"ac7a8997-7977-4861-8cdd-553b5d7fc35b","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0049.mp4","createdAt":"2020-01-02T05:37:20.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"98614246-2c40-4b9f-855b-a5a220f66a18","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0027.mp4","createdAt":"2020-01-02T05:31:00.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"72a038ab-c6d1-441a-9a43-8f29a994eb26","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0048.mp4","createdAt":"2020-01-02T05:27:22.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"20d41152-fc72-4826-9999-cd68e2646927","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0046.mp4","createdAt":"2020-01-02T05:25:09.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"3578ecb0-ca2e-4460-93df-d7fe8abac275","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0047.mp4","createdAt":"2020-01-02T05:21:57.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"2f3b4369-6ba0-478a-8b9b-1147d555c8cf","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0042.mp4","createdAt":"2020-01-02T05:16:03.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"0e5f70d7-a378-492c-8b1f-9b80fd152d34","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0045.mp4","createdAt":"2020-01-02T05:13:43.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null},{"footageId":"c7b1de39-a64e-4c41-91cf-f6a2d96d1301","memberId":"5afd6163-a82a-4079-8e3b-592c349ae72d","uploadedBy":"5afd6163-a82a-4079-8e3b-592c349ae72d","projectId":null,"originalFileName":"2019-03-15th Cebu Trip Day 1 - Island, Sardines, Turtle, Kawasan falls canyoneering (4K 50fps GoPro) - _V1-0044.mp4","createdAt":"2020-01-02T05:07:27.000Z","ownership":60,"isOwner":true,"approvalStatus":"approved","batchName":"","canSubmit":false,"description":null,"keywords":"","submissionDate":null,"ownerFullName":"Michael Kubler","transitionStatus":"Uploaded","reviewStatus":null,"canDelete":true,"sharers":[],"editorial":false,"editorialCity":null,"editorialState":null,"editorialCountry":null,"editorialText":null,"category":null,"batchId":null,"canPreview":true,"canAssignCurator":false,"curators":[{"id":"1ad6e882-4146-4af5-8d33-4586c6deb60b","fullName":"Jovelyn Cabahug Domingo","collabShare":40,"collabType":"curator","locked":false}],"documents":{"modelDocuments":[],"propertyDocuments":[]},"isAttachedRelease":false,"reviewRequired":false,"curationStatus":"incomplete","rejectedReason":[],"noteToOwner":null}],"pageInfo":{"totalRecords":115,"totalDisplayRecords":10}}}
    }

    async getAllFootage() {

        let blackBoxPlusFootage = {};
        return new Promise((resolve, reject) => {

            this.getCountInTabs().then(() => {

                let contributePromise = this.gatherFootageData('contribute').then(function (data) {
                    blackBoxPlusFootage.contribute = data;
                    // console.debug(`The contribue footage contains ${data.length} entries`);
                });
                let curationPromise = this.gatherFootageData('curation').then(function (data) {
                    blackBoxPlusFootage.curation = data
                });
                let contentPromise = this.gatherFootageData('content').then(function (data) {
                    blackBoxPlusFootage.content = data
                });

                // When all completed
                Promise.all([contributePromise, curationPromise, contentPromise]).then((data) => {

                    // console.debug('The footages data is: ', blackBoxPlusFootage);
                    this.addMessage(`<p>All Footage data loaded</p>`);
                    resolve(blackBoxPlusFootage);

                });
            });

        });
    }


    async getAllFinancials() {

        let blackBoxPlusFinancials = {};
        this.setStatusLoading(`financial data`);
        return new Promise((resolve, reject) => {

            let financialSummaryInfoPromise = this.getFinancialSummaryInfo().then(function (data) {
                blackBoxPlusFinancials.financialSummaryInfo = data;
                // console.debug(`The financialSummaryInfo contains ${data.length} entries`);
            });

            let financialEarningsSummaryPromise = this.getFinancialEarningsSummary().then(function (data) {
                blackBoxPlusFinancials.financialEarningsSummary = data;
                // console.debug(`The getFinancialEarningsSummary contains ${data.length} entries`);
            });
            let getUnpaidEarningsPromise = this.getUnpaidEarnings().then(function (data) {
                blackBoxPlusFinancials.unpaidEarnings = data;
            });
            let getFinancialPaymentHistoryPromise = this.getFinancialPaymentHistory().then(function (data) {
                blackBoxPlusFinancials.financialPaymentHistory = data;
            });
            let getFinancialTotalEarningsReportPromise = this.getFinancialTotalEarningsReport().then(function (data) {
                blackBoxPlusFinancials.financialTotalEarningsReport = data;
            });

            // When all completed
            Promise.all([financialSummaryInfoPromise, financialEarningsSummaryPromise, getUnpaidEarningsPromise, getFinancialPaymentHistoryPromise, getFinancialTotalEarningsReportPromise]).then((data) => {

                console.debug('The blackBoxPlusFinancials data char length is ', JSON.stringify(blackBoxPlusFinancials).length);
                this.addMessage(`<p>All Financial data loaded</p>`);
                resolve(blackBoxPlusFinancials);
            });
        });

    }

    /**
     *
     * @returns {Promise<*|undefined>}
     */
    async getFinancialSummaryInfo() {
        // URL example https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/summaryInfo
        // Example response = {"RevenueToDate":204.25,"RevenueThisMonth":0,"ReferralToDate":1.08,"ReferralThisMonth":0,"MemberStatus":"Regular","MembershipDue":"N/A","OutstandingCollaborativeInvitations":0,"AvailableOpportunities":1,"ReferralMembers":1}
        return this.callAPI(`/summaryInfo`);
    }

    async getFinancialEarningsSummary(toDate = null, fromDate = '2017-01-01%2000:00:00') {
        toDate = toDate || this.getFormattedDate("{Y}-{M}-{D}") + '%2023:59:59'; // Until the end of today
        // Example URL https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/earningSummary?fromDate=2019-11-12%2000:00:00&toDate=2020-02-10%2023:59:59
        return this.callAPI(`/earningSummary?fromDate=${fromDate}&toDate=${toDate}`);
    }


    /**
     * Unpaid Earnings Summary
     *
     * 'My Revenue' page
     * Described as 'A list of footage have been sold recently but have not been paid'
     *
     * You shouldn't need to use the provided values but if you do it
     * expects toDate and fromDate to be fully formed strings
     * @param toDate
     * @param fromDate
     * @returns {Promise<*|undefined>}
     */
    async getUnpaidEarnings(toDate = null, fromDate = null) {
        let dateMonthAgo = fromDate || new Date();
        // Set it to one month ago
        dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1); // This works for January as well and goes back to the previous year
        dateMonthAgo.setDate(0); // This will actually from the last day of the month before, just to be sure

        toDate = toDate || this.getFormattedDate("{Y}-{M}-{D}") + '%2023:59:59'; // Until the end of today
        fromDate = fromDate || this.getFormattedDate("{Y}-{M}-{D}", dateMonthAgo) + '%2000:00:00'; // Until the end of today
        // e.g https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/revenue?fromDate=2019-12-10%2000:00:00&toDate=2020-02-10%2023:59:59&index=1&limit=10
        return this.callAPI(`/revenue?fromDate=${fromDate}&toDate=${toDate}&index=1&limit=500`);
        // Example response
    }


    /**
     * Payment History (months)
     *
     * Note that this deals with the pagination
     * Also note that the "totalEarning" field is lost,
     * but people using this as CSV can re-created that themselves very easily and
     * it's on a per request basis so will be wrong if there's multiple API calls
     *
     * @returns {Promise<*|undefined>}
     */
    async getFinancialPaymentHistory() {
        // https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/paymentHistory?index=1&limit=10
        // Example api response: {"list":[{"paymentDate":"2020-01-19T20:48:00.000Z","grossRev":65.13,"netPayment":64.14,"paymentMethod":"PayPal","transferFee":1.31,"commission":0.33},{"paymentDate":"2019-12-20T15:10:14.000Z","grossRev":93.52,"netPayment":92.12,"paymentMethod":"PayPal","transferFee":1.88,"commission":0.48},{"paymentDate":"2019-11-20T15:45:02.000Z","grossRev":17.14,"netPayment":16.91,"paymentMethod":"PayPal","transferFee":0.34,"commission":0.11},{"paymentDate":"2019-09-20T03:38:44.000Z","grossRev":8.92,"netPayment":8.81,"paymentMethod":"PayPal","transferFee":0.18,"commission":0.07}],"pageInfo":{"totalRecords":4,"totalDisplayRecords":4}}
        return this.callPaginatedAPI(`/paymentHistory?`);
    }


    /**
     * Total Earnings Report (Individual sales)
     *
     * Note that this deals with the pagination and date ranges
     *
     * @returns {Promise<*|undefined>}
     */
    async getFinancialTotalEarningsReport(toDate = null, fromDate = '2017-01-01%2000:00:00') {
        // Total Earnings Report (Individual sales)
        // https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/earningsReport?fromDate=2019-12-10%2000:00:00&toDate=2020-02-10%2023:59:59&index=1&limit=10
        // Example {"items":[{"footageId":"54e4043f-39eb-4ced-a663-e10745ac2260","footageName":"2019-05-16th Oasis One Flight #2 - 14 Sunset descending-.mp4","earning":18.55,"totalDownloads":1,"dateSold":"2020-01-23T00:00:00.000Z"},{"footageId":"74eab76b-a4b5-4e69-a7e8-afe77b182b1e","footageName":"2019-04-21st Manila Bay and StarCity Theme Park - _V1-0022.mp4","earning":65.46,"totalDownloads":1,"dateSold":"2019-12-18T00:00:00.000Z"}],"totalEarning":84.01,"pageInfo":{"totalRecords":2,"totalDisplayRecords":2}}

        toDate = toDate || this.getFormattedDate("{Y}-{M}-{D}") + '%2023:59:59'; // Until the end of today
        return this.callPaginatedAPI(`/earningsReport?fromDate=${fromDate}&toDate=${toDate}&`);
    }


    /**
     * Mainly for getting the email address of curation owners, their names are already output in the footage json
     * @returns {Promise<*|undefined>}
     *
     * NB: This isn't used at the moment.
     */
    async getCurationOwners() {
        // e.g https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/curationFootage/getCurationOwners
        // Example response: {"success":true,"data":[{"name":"Michael Kubler","value":"blackboxPlus+example@greyphoenix.biz"}]}
        return this.callAPI(`curationFootage/getCurationOwners`);
    }


    get urlBase() {
        if (this.urlBaseCache) {
            return this.urlBaseCache;
        } else {

            let memberId = this.getMemberId();
            return this.urlBaseCache = `https://portal.blackbox.global/api/member/${memberId}`;
        }
    }

    async callAPI(uri, method = 'GET') {

        this.setStatusLoading(`Making a call to ${uri}`)
        let headers = this.getAPICallHeaders(method);
        let url = `${this.urlBase}${uri}`;
        let response = await fetch(url, headers);
        if (response.ok) {
            return await response.json();
        } else {
            this.setStatusError(`trying to make an API call to ${uri}`);
            this.addFlashMessage(`Error trying to make an API call to ${uri}`);
            let errorMessage = `No OK response from the API. Got the HTTP status ${response.status} when doing a ${method} request to ${url}`;
            console.log(errorMessage, {url, uri, response, headers});
            throw new Error(errorMessage);
        }
    }

    /**
     * Call Paginated API
     *
     * This deals with the pagination, if needed.
     *
     * NB: The ? or & last char of the uri should be provided by the calling method.
     * @param uri
     * @param method
     * @param limit
     * @returns {Promise<[]>}
     */
    async callPaginatedAPI(uri, method = 'GET', limit = 2) {
        let index = 1;
        let page = 1;
        this.setStatusLoading(`items from ${uri}. Page ${page}`);
        let paginatedUri = `${uri}index=${index}&limit=${limit}`; // Add pagination query
        let response = await this.callAPI(paginatedUri, method);
        // console.debug(`The first paginated call to ${uri}`, {uri, paginatedUri, method, response});
        let items = [];
        let pagesNeeded = 1;
        let totalRecords = 0;
        // Add the items (or list entries, because their API isn't consistent)
        if (response.items) {
            items = [].concat(items, response.items);
        }
        if (response.list) {
            items = [].concat(items, response.list);
        }

        if (response.pageInfo && response.pageInfo.totalRecords) {
            totalRecords = response.pageInfo.totalRecords;
            pagesNeeded = Math.ceil(totalRecords / limit);
        }

        //  --------------------------------------------------
        //   Make the Paginated Calls (if needed)
        //  --------------------------------------------------
        for (page = 2; page <= pagesNeeded; page++) {
            let index = (page - 1) * limit + 1;
            this.setStatusLoading(`items from ${uri}. Page ${page} of ${pagesNeeded}`);
            paginatedUri = `${uri}?index=${index}&limit=${limit}`; // Add pagination query
            // console.debug(`About to make the ${page} paginated call to ${uri}`, {paginatedUri, pagesNeeded, totalRecords});
            response = await this.callAPI(paginatedUri, method);
            if (response.items) {
                // Add the entries
                items = [].concat(items, response.items);
            }
            if (response.list) {
                // Add the entries
                items = [].concat(items, response.list);
            }
        }
        return items;


        // -- Example pageInfo
        // "pageInfo": {
        //     "totalRecords": 2,
        //     "totalDisplayRecords": 2
        // }
    }


    // -- Testing the pagination logic
    // e.g unitTestablePagination(1802, 200); returns 10 pages worth
    // unitTestablePagination(totalRecords, limit) {
    //     let uri = 'test';
    //     let index = 1;
    //     let page = 1;
    //     let pagesNeeded = Math.ceil(totalRecords / limit);
    //     let paginationInfo = [];
    //     paginationInfo.push({page, index, pagesNeeded, paginatedUri: `${uri}?index=${index}&limit=${limit}`});
    //     for (page = 2; page <= pagesNeeded; page++) {
    //         let index = (page - 1) * limit + 1;
    //         // this.setStatusLoading(`items from ${uri}. Page ${page} of ${pagesNeeded}`);
    //         paginationInfo.push({page, index, pagesNeeded, paginatedUri: `${uri}?index=${index}&limit=${limit}`}); // Add pagination query
    //     }
    //     return paginationInfo;
    // }

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

    /**
     * Make Link Element Download CSV
     *
     * Give it a link element, the array, object or whatever, plus the filename
     * @param element
     * @param csvContent
     * @param fileName
     */
    makeLinkElementDownloadCsv(element, csvContent, fileName = 'BlackBox.json') {
        return this.makeLinkElementDownload(element, csvContent, fileName + '.csv', 'text/csv');
    }

    /**
     *
     * If you want a new A link element
     * But mostly so you can have it automatically clicked and start the download
     * @param content
     * @param fileName
     * @param contentType
     * @param downloadAutomatically
     * @returns {HTMLAnchorElement}
     */
    createDownloadLinkElement(content, fileName, contentType, downloadAutomatically = true) {
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.innerText = fileName;
        if (true === downloadAutomatically) {
            a.click(); // Automatically try to download the file cc
        }
        return a;
    }

}