blackbox_plus = (function () {

    var header = 'BlackBox Plus';


    return (
        {

            setHeader,
            setStatus,
            setStatusLoading,
            setStatusProcessing,
            setStatusDone,
            dynamicallyLoadScript,

        }
    )
    setHeader = function (header) {
        this.header = header;
    };

    function setStatus(text = '', colour = '') {
        if (text) {
            mdks_text.innerHTML = text;
        }
        if (colour) {
            mdks_status.style.color = colour;
        }
    };

    function setStatusLoading(context = '') {
        this.setStatus('Loading ' + context, 'red');
    };


    function setStatusProcessing(context = '') {
        this.setStatus('Processing ' + context, 'orange');
    };


    function setStatusDone(context = '') {
        this.setStatus('Completed ' + context, 'green');
    };


// c = await fetch('https://cors-anywhere.herokuapp.com/');
// d = await c.text();

    function dynamicallyLoadScript(url) {
        var script = document.createElement("script");  // create a script DOM node
        script.src = url;  // set its src to the provided URL

        document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }


    getCanvas = function (context = true) {
        var mdks_canvas = document.getElementById('mdks_canvas');
        if (!mdks_canvas) {
            mdks_bookmarklet_info.insertAdjacentHTML('beforeend', '<canvas id="mdks_canvas"></canvas>');
            mdks_canvas = document.getElementById('mdks_canvas');
        }
        return context === true ? mdks_canvas.getContext('2d') : mdks_canvas;
    };

// -- Get Video Frame
    getVideoFrame = function () {
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


    init = function () {

        var mdks_bookmarklet_info = document.getElementById('mdks_bookmarklet_info');
        if (!mdks_bookmarklet_info) {
            var nav = document.getElementById('m_header_menu');
            nav.insertAdjacentHTML('afterend', '<div id="mdks_bookmarklet_info" style="color: white; float: left; padding-top: 10px; overflow: overlay; position: absolute; width: 34%;"><p style="color: white"><strong id="mdks_status" style="color: red">*</strong> &nbsp; <span id="mdks_text" >Loading</span></p></div>');
            mdks_bookmarklet_info = document.getElementById('mdks_bookmarklet_info');
        }

        var mdks_status = document.getElementById('mdks_status');
        var mdks_text = document.getElementById('mdks_text');


    };

    loadTensorFlow = function () {

        dynamicallyLoadScript("https://unpkg.com/@tensorflow/tfjs");
        dynamicallyLoadScript("https://unpkg.com/@tensorflow-models/mobilenet");
        // <script src="https://unpkg.com/@tensorflow/tfjs"></script>
        // <script src="https://unpkg.com/@tensorflow-models/mobilenet"></script>
    }


})();