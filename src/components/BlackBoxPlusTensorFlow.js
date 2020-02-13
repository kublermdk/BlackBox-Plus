import BlackBoxPlusInfo from "./BlackBoxPlusInfo";
import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as tf from '@tensorflow/tfjs';

export default class BlackBoxPlusTensorFlow extends BlackBoxPlusInfo {

    header = 'BB+ Init Keywording';
    blackBoxPlusInfo;
    mobilenet;
    mobilenetModel;
    topk = 8; // Number of the top probabilities to return
    minimumMobilenetProbability = 0.01;
    // mobilenetUrl = 'https://.../mobilenet/model.json';

    /*
    Process:
    1. Get a valid video player, or wait until it's ready (optionally try and make it ready, although autoplay doesn't work very often in browsers)
    2. Capture the first, middle and last frames of the video, plus make note of the duration. Alternatively if the image analysis doesn't take too long do it for every 5s, or give users the option of either.
    3. Apply the TensorFlow keywording analysis to the images. Both mobilenet and Coco SSD
    4. Merge the keywords together along with the probabilities.
    5. Display the keywords as CSV in a set below (or above) the Keyword form field, with a [copy] button so they can easily copy/paste them in.
    6. If analytics is enabled add the image files to the upload queue. Upon saving the form field also send the details through (want the description, keywords and footageId at a minimum, maybe original filename and memberId to help with filtering if needed).
     */
    constructor() {
        super('BB+ Init Keywording');
    }

    async loadTensorFlow() {
        this.setStatusLoading(`TensorFlow`);
        return true;
        // this.mobilenet = new MobileNet(); // Based on https://github.com/tensorflow/tfjs/blob/master/tfjs-converter/demo/mobilenet/index.js
        // this.mobilenetModel = await this.mobilenet.load();
        // import * as tf from '@tensorflow/tfjs';
        // const MODEL_URL = 'https://.../mobilenet/model.json';
        // https://github.com/tensorflow/tfjs/blob/master/tfjs-converter/demo/mobilenet/index.js

// For Keras use tf.loadLayersModel().
//         const model = await tf.loadGraphModel(MODEL_URL);
//         const cat = document.getElementById('cat');
//         model.predict(tf.browser.fromPixels(cat));
        // this.mobilenetModel = await mobilenet.load(); // @todo Idleize this
        // As per https://github.com/tensorflow/tfjs-models/tree/master/mobilenet
        // <script src="https://unpkg.com/@tensorflow/tfjs"></script>
        // <script src="https://unpkg.com/@tensorflow-models/mobilenet"></script>
        // this.dynamicallyLoadScript('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
        // this.dynamicallyLoadScript('https://unpkg.com/@tensorflow-models/mobilenet@2.0.4/dist/index.js');
        // await new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         this.setStatusLoading(`MobileNet`);
        //         resolve(true);
        //     }, 300);
        // });
        // return true;
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


    getCanvas(context = true) {
        var bbox_plus_canvas = document.getElementById('bbox_plus_canvas');
        if (!bbox_plus_canvas) {
            this.infoElement.insertAdjacentHTML('beforeend', '<canvas id="bbox_plus_canvas"></canvas>');
            bbox_plus_canvas = document.getElementById('bbox_plus_canvas');
        }
        return context === true ? bbox_plus_canvas.getContext('2d') : bbox_plus_canvas;
    }


    getCurrentVideoFrame() {
        let vid = document.getElementById('videoControl');
        if (!vid || !vid.plyr) {
            this.setStatusError('Please load a video first');
            this.addFlashMessage('No active video available. Press play and load the video up first');
            return false;
        }
        let context = this.getCanvas();
        let dataURL = this.getCanvas(false).toDataURL();
        context.drawImage(vid, 0, 0, vid.videoHeight, vid.videoWidth);
        let img = document.createElement('img');
        img.setAttribute('src', dataURL);
        return {context, img};
    }

    getVideoPlayer() {
        let vid = document.getElementById('videoControl');
        if (!vid || !vid.plyr) {
            this.addFlashMessage('No active video available. Press play and load the video up first');
            return false;
        }
        return vid.plyr;
    }

    /**
     * Only returns the Video Player if it's ready
     * @returns videoPlayer|false
     */
    getValidVideoPlayer() {
        let videoPlayer = this.getVideoPlayer();
        return videoPlayer.isReady() === true ? videoPlayer : false;
    }

    getVideoElement() {
        let vid = document.getElementById('videoControl');
        if (!vid || !vid.plyr) {
            this.addFlashMessage('No active video available. Press play and load the video up first');
            return false;
        }
        return vid;
    }

    seekVideoToEnd() {
        let videoPlayer = this.getValidVideoPlayer();
        let seekTime = false;
        if (videoPlayer) {
            seekTime = videoPlayer.getDuration() - 0.1;
            videoPlayer.seek(seekTime); // If we seek to the very end it seems to jump back to the start, so we get a few frames before that
        }
        return seekTime;
    }

    seekVideoToMiddle() {
        let videoPlayer = this.getValidVideoPlayer();
        let seekTime = false;
        if (videoPlayer) {
            seekTime = videoPlayer.getDuration() / 2;
            videoPlayer.seek(seekTime); // If we seek to the very end it seems to jump back to the start, so we get a few frames before that
        }
        return seekTime;
    }

    seekVideoToStart() {
        let videoPlayer = this.getValidVideoPlayer();
        let seekTime = false;
        if (videoPlayer) {
            seekTime = 0;
            videoPlayer.seek(seekTime); // If we seek to the very end it seems to jump back to the start, so we get a few frames before that
        }
        return seekTime;
    }

    async processCurrentVideoFrame() {
        this.setStatusProcessing('analysing current video frame');
        let videoFrame = this.getCurrentVideoFrame(); // as context, img
        let net;
        net = await mobilenet.load();
        console.debug('Mobilenet Loaded');
        const result = await net.classify(videoFrame.img, this.topk);
        // const mobilenetResult = await this.mobilenetModel.classify(videoFrame.context, this.topk);
        console.debug("The result of the MobileNet Classification is: ", result);
        // videoFrame.context.remove();
        videoFrame.img.remove();
        this.setStatusDone('Image Analysis Complete');
        return result;

        /* Example response:
            [{className: "Egyptian cat", probability: 0.8380282521247864},
            {className: "tabby, tabby cat", probability: 0.04644153267145157},
            {className: "Siamese cat, Siamese", probability: 0.024488523602485657}]
         */
    }

    displayKeywordsFromClassification(classificationResponse) {
        let keywords = [];
        let minimumMobilenetProbability = this.minimumMobilenetProbability;
        if (!Array.isArray(classificationResponse)) {
            throw new Error('Expecting classificationResponse to be an array');
        }

        // @todo: Sort by probability if there's multiple responses being merged together
        // @todo: Remove low probability entries
        classificationResponse.forEach(function (classification, index) {
            if (classification.probability > minimumMobilenetProbability) {
                keywords.push(classification.className);
            }
        });
        let keywordsAsCSV = keywords.join();

        // this.addFlashMessage()
        /* Example response:
            [{className: "Egyptian cat", probability: 0.8380282521247864},
            {className: "tabby, tabby cat", probability: 0.04644153267145157},
            {className: "Siamese cat, Siamese", probability: 0.024488523602485657}]
         */
        let keywordsContent = `<p class="bbox_plus bbox_plus_keywords">The suggested initial keywords are <code class="bbox_plus_keywords_list">${keywordsAsCSV}</code></p>`;
        if ($('.edit-keywords') && $('.edit-keywords').length > 0) {
            let editKeywordsElement = $('.edit-keywords')[0];
            editKeywordsElement.parentElement.appendChild(this.createNewElement(keywordsContent));
        }
        this.addFlashMessage(`Added the ${keywords.length} keywords`, 'success');
        this.addMessage(keywordsContent); // @todo Show the full list not the reduced list
        this.setStatusDone('Image Keywords added');
        this.getCanvas(false).remove(); // Remove the canvas
    }


    // -- Get Video Frame
    getVideoFrame() {
        // @todo: Ensure the video has started and can be played
        let videoElement = this.getVideoElement();
        videoElement.pause(); // Don't need it playing whilst we are getting the frame
        let duration = videoElement.duration;
        let context = getCanvas();

        context.drawImage(videoElement, 0, 0, 220, 150);

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
        }, 8000);
    };

}