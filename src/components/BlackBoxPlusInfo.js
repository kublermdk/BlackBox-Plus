// @todo import zepto
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
    interfaceSection;
    messagesSection;
    bbox_m_header_menu_id = 'm_header_menu';

    constructor(header = '') {
        // If there's already another bookmarklet initiated then create another
        let bookmarkletInfoElement = document.getElementById(this.bookmarkletInfoId);
        // let bookmarkletInfoElement = document.getElementById('bbox_plus_bookmarklet_info');

        if (!bookmarkletInfoElement) {
            console.debug("Setting up " + this.bbox_m_header_menu_id);
            let nav = document.getElementById(this.bbox_m_header_menu_id);
            if (!nav) {
                this.addFlashMessage('Unable to find the Nav Menu, can\'t add BlackBox, wait until it\'s loaded and try again', 'error');
                throw new Error('Unable to find the Nav Menu');
            }
            nav.insertAdjacentHTML('afterend', `                   <div id="${this.bookmarkletInfoId}" class="bbox_plus_bookmarklet_info_wrapper" style="color: white; float: left; padding-top: 10px; position: absolute; left: 160px; width: 250px;"><h3 id="bbox_plus_header"                 class="bbox_plus_header">BlackBox Plus</h3><p style="color: white" class="bbox_plus_info_text_wrapper"><strong id="bbox_plus_status"                     style="color: red" class="bbox_plus_info_status">*</strong> &nbsp; <span id="bbox_plus_text"                   class="bbox_plus_info_text">Loading</span></p></div>`);
            console.debug("Setup a Blackbox Plus info");
        } else {
            this.idPostfix = '_2';
            // There's already a bookmarklet installed, to create a 2nd
            this.bookmarkletInfoId = 'bbox_plus_bookmarklet_info' + this.idPostfix;
            if (document.getElementById(this.bookmarkletInfoId)) {
                // @todo: Display the error better, like in a flash message
                this.addFlashMessage('Unable to add a 3rd BlackBox Plus system', 'error');
                throw new Error("Unable to add a 3rd BlackBox Plus system");
            }
            bookmarkletInfoElement.insertAdjacentHTML('afterend', `<div id="${this.bookmarkletInfoId}" class="bbox_plus_bookmarklet_info_wrapper" style="color: white; float: left; padding-top: 10px; position: absolute; width: 250px; left: 415px;"><h3 id="bbox_plus_header${this.idPostfix}"  class="bbox_plus_header">BlackBox Plus</h3><p style="color: white" class="bbox_plus_info_text_wrapper"><strong id="bbox_plus_status${this.idPostfix}" style="color: red" class="bbox_plus_info_status">*</strong> &nbsp; <span id="bbox_plus_text${this.idPostfix}"  class="bbox_plus_info_text">Loading</span></p></div>`);
            console.debug("Setup a 2nd Blackbox Plus info");
        }
        this.infoElement = document.getElementById(this.bookmarkletInfoId);
        this.infoHeaderElement = document.getElementById('bbox_plus_header' + this.idPostfix);
        this.infoStatusElement = document.getElementById('bbox_plus_status' + this.idPostfix);
        this.infoTextElement = document.getElementById('bbox_plus_text' + this.idPostfix);
        this.createFooterSection();

        if (header) {
            this.setHeader(header);
            this.setInterface(`<h2>BlackBox Plus ${header}</h2>`);
        }
        this.addMessage('<p>Initial Loading complete</p>');
    }

    createFooterSection() {
        // let footer = $('footer')[0];
        let footerWrapperElement = document.getElementById('bbox_plus_footer_wrapper');
        let footerElement = document.getElementsByTagName('footer')[0] || null;
        let interfaceSectionContent = `<div class="bbox_plus_interface_wrapper" style="float: left; margin-left: 10px; margin-bottom: 10px;"><div id="bbox_plus_interface_section${this.idPostfix}"></div><div id="bbox_plus_messages_section${this.idPostfix}"></div></div>`;
        if (footerElement && footerWrapperElement) {
            // Already installed before
            // @todo: Make only 50% of the footer
            footerWrapperElement.insertAdjacentHTML('beforeend', interfaceSectionContent);
            $('.bbox_plus_interface_wrapper')[0].style.width = '48%';
            $('.bbox_plus_interface_wrapper')[1].style.width = '48%';
        } else if (footerElement) {
            // Inserting the wrapper as well
            footerElement.insertAdjacentHTML('afterend', `<div id="bbox_plus_footer_wrapper">${interfaceSectionContent}</div>`);
        } else {
            console.error("Issue trying to find the <footer> element");
            this.addFlashMessage('Unable to find the footer section, wait until the page has fully loaded and try again or refresh', 'error');
            throw new Error('Unable to create a Footer section, no footer element found');
        }
        this.interfaceSection = document.getElementById(`bbox_plus_interface_section${this.idPostfix}`);
        this.messagesSection = document.getElementById(`bbox_plus_messages_section${this.idPostfix}`);
    }

    /**
     * Set Interface
     *
     * The section at the bottom of the screen. This allows for buttons and options, etc..
     * @param html
     * @returns {boolean}
     */
    setInterface(html) {
        this.interfaceSection.innerHTML = html;
        return true;
    }

    /**
     * Add Message
     *
     * This is at the bottom of the page, below the Interface section and is for messages like operations which have been completed, etc..
     * @param messageHTML
     * @returns {boolean}
     */
    addMessage(messageHTML) {
        let existingHTML = this.messagesSection.innerHTML || '';
        this.messagesSection.innerHTML = existingHTML + messageHTML;
        return true;
    }

    /**
     * Type should be one of 'info', 'success', 'warn', 'error'
     * @param message
     * @param type
     */
    addFlashMessage(message, type, autoRemove = true) {
        // @todo: Implement something similar to https://www.w3schools.com/howto/howto_js_alert.asp
        let messageHTML = `<div class="bbox_plus bbox_plus_flash_message bbox_plus_flash_message_type_${type}"><span class="bbox_plus_flash_message_closebtn" onclick="this.parentElement.style.display='none';">&times;</span>${message}</div>`;
        let flashElement = document.createElement('div');
        flashElement.innerHTML = messageHTML;
        document.body.insertAdjacentElement('beforeend', flashElement);

        if (true === autoRemove) {
            setTimeout(() => {
                flashElement.remove(); // @todo: fadeout instead
            }, 6000);
        }
        return flashElement;
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

        // @todo: Also display as a flash message
        this.addFlashMessage('Error ' + context, 'error');
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

        if (this.memberId && false === force) {
            return this.memberId;
        }
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

        let headers = getDefaultAPICallHeaders('POST');
        let collaboratedProjectsListResponse = await fetch(`https://portal.blackbox.global/api/member/${memberId}/collaboratedProjects?index=1&limit=100`, headers);


        if (collaboratedProjectsListResponse.ok) {
            // if HTTP-status is 200-299
            let collaboratedProjects = await collaboratedProjectsListResponse.json();
            console.debug(`There are ${collaboratedProjects.list.length} Collaboration Project entries `, collaboratedProjects);
            this.setStatusProcessing(`Clearing the ${collaboratedProjects.list.length} Collaboration Projects`);
            if (collaboratedProjects.list.length > 0) {
                headers.method = 'PUT'; // Want to do a PUT call to clear the entries
                collaboratedProjects.list.forEach((element, index) => {
                    this.setStatusProcessing(`Clearing #${index} ${element.projectName}`);
                    // $messagesSection.append('<p class="" data-projectid="${element.projectId}">Clearing the Marketplace Entry #{index} ${element.projectName}</p>');
                    console.debug(`Clearing the Collab Entry #${index} ${element.projectName}`, element); // Console.log doesn't actually work, they've set it to an empty function
                    fetch(`https://portal.blackbox.global/api/member/${memberId}/project/${element.projectId}/clearCurationProject`, headers);
                });
            }

        } else {
            this.setStatusError(`Unable to get the list of projects. HTTP-Error: ${collaboratedProjectsListResponse.status}`);
        }
    }

    getAPICallHeaders(method = 'GET') {
        let authToken = this.getAuthToken();
        return {
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
            "referrer": "https://portal.blackbox.global/footage/marketplace?blackbox_plus=true", // Added a query string so Blackbox can track these queries
            "referrerPolicy": "no-referrer-when-downgrade",
            // "body": "{}",
            "method": method,
            "mode": "cors"
        };
    }

}