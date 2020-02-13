import * as mobilenet from "@tensorflow-models/mobilenet";

// As per https://koala42.com/artificial-intelligence-in-javascript-and-tensorflow-js/
export default async function imageRecognition(imageElement) {
    let net;

    // Load the model.
    net = await mobilenet.load();
    // const imgEl = document.getElementById("img");
    const result = await net.classify(imageElement);
    console.debug(result);
    let text;
    result[0].className.split(",")[0] === "koala"
        ? (text = " Yes, This is a koala! Aww, so cute 😍")
        : (text = `This is not a koala! Is this a ${result[0].className.split(",")[0]}?`);
    return text;
}