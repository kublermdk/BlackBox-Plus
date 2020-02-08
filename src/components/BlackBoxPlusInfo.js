export default class BlackBoxPlusInfo {

    header = 'BlackBox Plus';
    bookmarkletInfoId = 'bbox_plus_bookmarklet_info';
    idPostfix = '';
    infoElement;
    infoTextElement;
    infoStatusElement;
    infoHeaderElement;
    authToken;
    memberId;
    bbox_m_header_menu_id = 'm_header_menu';

    constructor(header = '') {
        // If there's already another bookmarklet initiated then create another
        let bookmarkletInfoElement = document.getElementById(this.bookmarkletInfoId);
        // let bookmarkletInfoElement = document.getElementById('bbox_plus_bookmarklet_info');

        if (!bookmarkletInfoElement) {
            console.debug("Setting up " + this.bbox_m_header_menu_id);
            let nav = document.getElementById(this.bbox_m_header_menu_id);
            if (!nav) {
                throw Error('Unable to find the Nav Menu');
            }
            nav.insertAdjacentHTML('afterend', `<div id="${this.bookmarkletInfoId}" style="color: white; float: left; padding-top: 10px; position: absolute; left: 160px; width: 250px;"><h3 id="bbox_plus_header">BlackBox Plus</h3><p style="color: white"><strong id="bbox_plus_status" style="color: red">*</strong> &nbsp; <span id="bbox_plus_text" >Loading</span></p></div>`);
            console.debug("Setup a Blackbox Plus info");
        } else {
            this.idPostfix = '_2';
            // There's already a bookmarklet installed, to create a 2nd
            this.bookmarkletInfoId = 'bbox_plus_bookmarklet_info' + this.idPostfix;
            if (document.getElementById(this.bookmarkletInfoId)) {
                // @todo: Display the error better, like in a flash message
                throw new Error("Unable to add a 3rd BlackBox Plus system");
            }
            bookmarkletInfoElement.insertAdjacentHTML('afterend', `<div id="${this.bookmarkletInfoId}" style="color: white; float: left; padding-top: 10px; position: absolute; width: 250px; left: 415px;"><h3 id="bbox_plus_header${this.idPostfix}">BlackBox Plus</h3><p style="color: white"><strong id="bbox_plus_status${this.idPostfix}" style="color: red">*</strong> &nbsp; <span id="bbox_plus_text${this.idPostfix}" >Loading</span></p></div>`);
            console.debug("Setup a 2nd Blackbox Plus info");
        }
        this.infoElement = document.getElementById(this.bookmarkletInfoId);
        this.infoHeaderElement = document.getElementById('bbox_plus_header' + this.idPostfix);
        this.infoStatusElement = document.getElementById('bbox_plus_status' + this.idPostfix);
        this.infoTextElement = document.getElementById('bbox_plus_text' + this.idPostfix);

        if (header) {
            this.setHeader(header);
        }
    }

    setHeader(header) {
        this.header = header;
        this.infoHeaderElement.innerHTML = header;
    }

    setStatus(text = '', colour = '') {
        if (text) {
            this.infoTextElement.innerHTML = text;
        }
        if (colour) {
            this.infoStatusElement.style.color = colour;
        }
        console.debug("Status: " + text);
    }

    setStatusError(context = '') {
        this.setHeader('ERROR ' + this.header);
        this.setStatus(`<span style="color: red">ERROR ${context}</span>`, 'red');

        // $messagesSection.append('<h2 class="btn-outline-danger">Error - Unable to work out your Blackbox memberId</h2>');
        // @todo: Also display as a flash message
        console.error("## ERROR ## " + context);
    }

    setStatusLoading(context = '') {
        this.setStatus('Loading ' + context, 'orange');
        console.debug("Loading: " + context);
    }

    setStatusProcessing(context = '') {
        this.setStatus('Processing ' + context, 'orange');
        console.debug("Processing: " + context);
    }

    setStatusDone(context = '') {
        this.setStatus('Completed ' + context, 'green');
        console.debug("Completed: " + context);
    }


// c = await fetch('https://cors-anywhere.herokuapp.com/');
// d = await c.text();

    dynamicallyLoadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = url;  // set its src to the provided URL

        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    getAuthToken(force = false) {
        if (this.authToken && false === force) {
            return this.authToken;
        }
        let authToken = localStorage.token; // Get this by looking at an existing request.
        if (!authToken) {
            // $messagesSection.append('<h2 class="btn-outline-danger">Unable to get your authToken. Are you logged in?</h2>');
            this.setStatusError('Unable to get your auth token, are you logged in?');
            throw new Error('Error, invalid auth token');
        }
        return authToken;
    }

    getMemberId(force = false) {

        let imageUrl = $('.m-topbar__userpic img').attr('src'); // e.g "https://portal.blackbox.global/api/member/5afd6163-a82a-4079-8e3b-592c349ae72d/W/avatar?1577006745917" -> 5afd6163-a82a-4079-8e3b-592c349ae72d

        if (!imageUrl) {
            this.setStatusError('Do you have an avatar picture? Without it we are unable to work out your BlackBox memberId');
            throw new Error('Error, Unable to work out your Blackbox MemberId');
        } else {
            let memberId = imageUrl.replace('https://portal.blackbox.global/api/member/', '').replace(/\/W\/avatar.*/, '');
            if (memberId) {
                this.memberId = memberId;
            } else {
                this.setStatusError('Unable to work out your BlackBox memberId');
                throw new Error('Issue trying to work out the memberId based off the avatar image');
            }

            return memberId;
        }


    }

    async clearMarketplaceCollaborationProjectsList() {

        this.setStatusLoading(`Loading up the Collaboration Projects list`);
        let memberId = this.getMemberId();
        let authToken = this.getAuthToken();

        let collaboratedProjectsListResponse = await fetch(`https://portal.blackbox.global/api/member/${memberId}/collaboratedProjects?index=1&limit=100`, {
            "credentials": "include",
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-AU,en;q=0.9,en-US;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/vnd.blackbox.v1+json",
                "pragma": "no-cache",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "timeout": "8000",
                "token": authToken
            },
            "referrer": "https://portal.blackbox.global/footage/marketplace?BlackBoxPlus_clearCollabMarketPlaceEntries=true",
            "referrerPolicy": "no-referrer-when-downgrade",
            "body": null,
            "method": "GET",
            "mode": "cors"
        });


        if (collaboratedProjectsListResponse.ok) {
            // if HTTP-status is 200-299
            let collaboratedProjects = await collaboratedProjectsListResponse.json();
            console.debug(`There are ${collaboratedProjects.list.length} Collaboration Project entries `, collaboratedProjects);
            this.setStatusProcessing(`Clearing the ${collaboratedProjects.list.length} Collaboration Projects`);
            if (collaboratedProjects.list.length > 0) {
                collaboratedProjects.list.forEach(function (element, index) {
                    this.setStatusProcessing(`Clearing #${index} ${element.projectName}`);
                    // $messagesSection.append('<p class="" data-projectid="${element.projectId}">Clearing the Marketplace Entry #{index} ${element.projectName}</p>');
                    console.debug(`Clearing the Collab Entry #${index} ${element.projectName}`, element); // Console.log doesn't actually work, they've set it to an empty function
                    fetch(`https://portal.blackbox.global/api/member/${memberId}/project/${element.projectId}/clearCurationProject`, {
                        "credentials": "include",
                        "headers": {
                            "accept": "application/json, text/plain, */*",
                            "accept-language": "en-AU,en;q=0.9,en-US;q=0.8",
                            "cache-control": "no-cache",
                            "content-type": "application/vnd.blackbox.v1+json",
                            "pragma": "no-cache",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "timeout": "5000",
                            "token": authToken
                        },
                        "referrer": "https://portal.blackbox.global/footage/marketplace?clearCollabMarketPlaceEntries=true", // Added a query string so Blackbox can track these queries
                        "referrerPolicy": "no-referrer-when-downgrade",
                        "body": "{}",
                        "method": "PUT",
                        "mode": "cors"
                    });
                });
            }

        } else {
            this.setStatusError(`Unable to get the list of projects. HTTP-Error: ${collaboratedProjectsListResponse.status}`);
            // $messagesSection.append(`<h2 class="btn-outline-danger">## Error ## Unable to get the list of projects. HTTP-Error: ${collaboratedProjectsListResponse.status}</h2>`);
        }
        // Example collaboratedProjectsListResponse JSON: {"list":[{"projectId":"3f213ead-c68a-4ca5-b2fb-6e73002eeb98","projectName":"Mexico Timelapses","projectLocation":"Mexico city","projectDescription":null,"memberId":"759f0772-e614-43db-af26-082eee770f23","onBehalfOfId":"759f0772-e614-43db-af26-082eee770f23","documentId":null,"colabId":null,"uploadType":null,"contentName":null,"pathName":null,"rushOrder":false,"sharingPercentage":20,"reviewRequired":true,"reviewState":null,"submitOption":"marketplace","selectsStatus":false,"gradingStatus":false,"otherProcessStatus":false,"exportClipsStatus":false,"metadataStatus":false,"notes":"Looking for people how want to make metadata work for mexico city timelapses","projectType":"curation project","projectStartDate":"2019-12-20T20:49:36.000Z","projectEndDate":null,"topic":null,"detailSummary":null,"selectCollaboratorsType":null,"numberCollaborators":null,"curationCompletion":"no","status":"available","createdAt":"2019-12-20T20:51:03.000Z","updatedAt":"2019-12-20T20:51:14.000Z","deletedAt":null,"Collaborators":[{"collabId":"0bdb52a9-8d0b-4a2e-b012-e01a9a05954a","memberId":"759f0772-e614-43db-af26-082eee770f23","collabMemberId":"c756f42e-2c12-4190-937a-44032b8a56f0","collaboratorName":null,"footageId":null,"mediaProductId":null,"projectId":"3f213ead-c68a-4ca5-b2fb-6e73002eeb98","collabShare":15,"collabType":null,"approvalStatus":"cleared","ownerApprovalStatus":"approved","sharedContent":null,"createdAt":"2019-12-20T23:27:58.000Z","updatedAt":"2019-12-20T23:27:58.000Z","deletedAt":null,"Partner":{"fullName":"Jon Hulme","firstName":"jon","lastName":"hulme","thumbnail":null,"email":"jonmhulme@gmail.com"}}],"pageInfo":{"totalRecords":16,"totalDisplayRecords":1}}
    }

}