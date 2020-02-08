export default class BlackBoxPlusTensorFlow {

    header = 'Keywording - TS';
    blackBoxPlusInfo;

    constructor(blackboxPlusInfo) {
        if (!blackboxPlusInfo) {
            blackboxPlusInfo = new BlackBoxPlusInfo(this.header);
        }
        this.blackBoxPlusInfo = blackboxPlusInfo;
        this.blackBoxPlusInfo.setHeader(this.header);
    }


    detectFromVideoFrame = (model, video) => {
        model.detect(video).then(predictions => {
            this.showDetections(predictions);

            requestAnimationFrame(() => {
                this.detectFromVideoFrame(model, video);
            });
        }, (error) => {
            console.log("Couldn't start the webcam")
            console.error(error)
        });
    };

    loadTensorFlow() {
        // <script src="https://unpkg.com/@tensorflow/tfjs"></script>
        // <script src="https://unpkg.com/@tensorflow-models/mobilenet"></script>
        this.blackBoxPlusInfo.dynamicallyLoadScript("https://unpkg.com/@tensorflow/tfjs");
        this.blackBoxPlusInfo.dynamicallyLoadScript("https://unpkg.com/@tensorflow-models/mobilenet");
    }


    getCanvas(context = true) {
        var bbox_plus_canvas = document.getElementById('bbox_plus_canvas');
        if (!bbox_plus_canvas) {
            this.infoElement.insertAdjacentHTML('beforeend', '<canvas id="bbox_plus_canvas"></canvas>');
            bbox_plus_canvas = document.getElementById('bbox_plus_canvas');
        }
        return context === true ? bbox_plus_canvas.getContext('2d') : bbox_plus_canvas;
    }

    // -- Get Video Frame
    getVideoFrame() {
        // @todo: Ensure the video has started and can be played
        let vid = document.getElementById('videoControl');
        vid.pause(); // Don't need it playing whilst we are getting the frame
        let duration = vid.duration;
        let context = getCanvas();

        context.drawImage(vid, 0, 0, 220, 150);

        // Create Image
        let dataURL = getCanvas(false).toDataURL();
        let img = document.createElement('img');
        img.setAttribute('src', dataURL);
        // Append img in container div
        this.infoElement.appendChild(img);
        setTimeout(() => {
            // Remove the images
            this.infoElement.getElementsByTagName("img").forEach(function (img) {
                img.remove();
            }); // Remove the images after a few seconds
        }, 3000);
    };

}