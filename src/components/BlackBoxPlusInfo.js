
export default class BlackBoxPlusInfo {

    header = 'BlackBox Plus';
    bookmarkletInfoId = 'bbox_plus_bookmarklet_info';
    infoElement;
    infoTextElement;
    infoStatusElement;
    infoHeaderElement;
    bbox_m_header_menu_id = 'm_header_menu';

    constructor(header = this.header) {
        // If there's already another bookmarklet initiated then create another
        let bookmarkletInfoElement = document.getElementById(this.bookmarkletInfoId);
        if (!bookmarkletInfoElement) {
            console.log("Setting up " + this.bbox_m_header_menu_id);
            let nav = document.getElementById(this.bbox_m_header_menu_id);
            if (!nav) {
                throw Error('Unable to find the Nav Menu');
            }
            nav.insertAdjacentHTML('afterend', `<div id="${this.bookmarkletInfoId}" style="color: white; float: left; padding-top: 10px; overflow: overlay; position: absolute; width: 34%;"><h3 id="bbox_plus_header">BlackBox Plus</h3><p style="color: white"><strong id="bbox_plus_status" style="color: red">*</strong> &nbsp; <span id="bbox_plus_text" >Loading</span></p></div>`);
            console.log("Setup a Blackbox Plus info");
        } else {
            // There's already a bookmarklet installed, to create a 2nd
            this.bookmarkletInfoId = 'bbox_plus_bookmarklet_info_2';
            bookmarkletInfoElement.insertAdjacentHTML('afterend', `<div id="${this.bookmarkletInfoId}" style="color: white; float: left; padding-top: 10px; overflow: overlay; position: absolute; width: 34%;"><h3 id="bbox_plus_header">BlackBox Plus</h3><p style="color: white"><strong id="bbox_plus_status" style="color: red">*</strong> &nbsp; <span id="bbox_plus_text" >Loading</span></p></div>`);
            console.log("Setup a 2nd Blackbox Plus info");
        }
        this.bookmarkletInfoElement = document.getElementById(this.bookmarkletInfoId);
        this.infoHeaderElement = document.getElementById('bbox_plus_header');
        this.infoStatusElement = document.getElementById('bbox_plus_status');
        this.infoTextElement = document.getElementById('bbox_plus_text');
        this.infoElement = document.getElementById(this.bookmarkletInfoId);

        this.setHeader(header);
    }

    setHeader(header) {
        this.header = header;
        this.infoHeaderElement.innerHTML = header;
    }

    setStatus(text = '', colour = '') {
        if (text) {
            infoTextElement.innerHTML = text;
        }
        if (colour) {
            infoStatusElement.style.color = colour;
        }
    }

    setStatusLoading(context = '') {
        this.setStatus('Loading ' + context, 'red');
    }

    setStatusProcessing(context = '') {
        this.setStatus('Processing ' + context, 'orange');
    }

    setStatusDone(context = '') {
        this.setStatus('Completed ' + context, 'green');
    }


// c = await fetch('https://cors-anywhere.herokuapp.com/');
// d = await c.text();

    dynamicallyLoadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = url;  // set its src to the provided URL

        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    getCanvas(context = true) {
        var mdks_canvas = document.getElementById('mdks_canvas');
        if (!mdks_canvas) {
            mdks_bookmarklet_info.insertAdjacentHTML('beforeend', '<canvas id="mdks_canvas"></canvas>');
            mdks_canvas = document.getElementById('mdks_canvas');
        }
        return context === true ? mdks_canvas.getContext('2d') : mdks_canvas;
    }

    // -- Get Video Frame
    getVideoFrame() {
        // @todo: Ensure the video has started and can be played
        var vid = document.getElementById('videoControl');
        vid.pause();
        let duration = vid.duration;
        var context = getCanvas();

        context.drawImage(vid, 0, 0, 220, 150);

        // Create Image
        var dataURL = getCanvas(false).toDataURL();
        var img = document.createElement('img');
        img.setAttribute('src', dataURL);
        // Append img in container div
        mdks_bookmarklet_info.appendChild(img);
        setTimeout(function () {
            // Remove the images
            mdks_bookmarklet_info.getElementsByTagName("img").forEach(function (img) {
                img.remove();
            })
        }, 2000)
    };

    loadTensorFlow() {

        dynamicallyLoadScript("https://unpkg.com/@tensorflow/tfjs");
        dynamicallyLoadScript("https://unpkg.com/@tensorflow-models/mobilenet");
        // <script src="https://unpkg.com/@tensorflow/tfjs"></script>
        // <script src="https://unpkg.com/@tensorflow-models/mobilenet"></script>
    }

}