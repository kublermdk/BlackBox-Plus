# BlackBox Plus

Created by [Michael Kubler](https://www.kublermdk.com/) of [Grey Phoenix Productions](https://www.greyphoenix.biz/)

Source code [Available on Github](https://github.com/kublermdk/BlackBox-Plus) 


You need to drag and drop the bookmarks below into your browser toolbar. Then when you are on the portal.blackbox website you can click on one to activate the feature.

Every time you refresh the page, you'll need to click the bookmarklet again to load it up.

## Bookmarklets

Directions:

Drag the links below to your browser, go to [portal.blackbox.global](https://portal.blackbox.global/) and when the page is loaded click the link and the extra functionality will be added.

## Bookmarklet Links (drag these to your browser link bar) :

1. <a class="bookmarklet" href="javascript:(function () {console.debug('Loading BlackBox Plus Exporter');let script = document.createElement('script');script.src = 'https://blackboxplus.greyphoenix.biz/staging/export.js';document.head.appendChild(script);})();">BB+ Data Export - **STAGING**</a> - Gives you CSV and JSON exports of your data. This links to the cutting edge version (so called because it might break and well, don't cut yourself using it).

Still coming:

2. Initial Keywording - An image analysis system for adding some initial keywords (I'm looking forward to this one)
3. Thesaurus - An interactive, on the edit page thesaurus for finding words faster (if people are interested)


Still to come: gif/images which explain how to use these.

## Intro

[BlackBox](https://blackbox.global/) is a stock footage submission platform, community and more.

> BlackBox is a creator community and platform that allows creators all over the world to connect, share the work, share the content and share the passive income..

The [BlackBox Portal](https://portal.blackbox.global/) is the system used for dealing with submissions, keywording and more.


**BlackBox Plus** is a set of bookmarklets designed to add extra functionality to the BlackBox portal site.


### What is a Bookmarklet?

A bookmarklet looks like a link, but actually executes javascript code in your browser. Note that you can't see the Bookmarklets in the Github README file. You have to view them at [blackboxplus.greyphoenix.biz](https://blackboxplus.greyphoenix.biz/)

## Data Export

The `BB+ Data Export` bookmarklet allows you to download the financial and stock footage data as CSV or JSON files. The CSV files can be opened up in a spreadsheet app, Google Docs, etc...

This means you can get a list of all your submitted footage with the keywords, descriptions and original filenames, plus other information. You can also get a list of all sales and more.

The bookmarklet uses your browser to call the BlackBox API similar to you going to the pages individually. But it gets all the paginated data and converts the results to CSV.
Nothing is downloaded to your computer or sent anywhere until you click the links. The links themselves contain the data.

Because this makes multiple requests to the BlackBox API thus adding load to their servers and possibly making the system slower for others it's recommended you don't abuse this. e.g Don't use it 10x an hour.

## Initial Keywording

This uses a Machine Learning system to grab frames of the video and attempt to detect things within that image.
This is only designed to reduce the burden on people doing keywording by automatically adding keywords for the obvious THINGS in the frames.
Allowing curators to focus more on adding the emotional and movement keywords.

The free TensorFlow version uses the MobileNet Image Classification system (and possibly the Object Detection system using Coco SSD).

If there's interest I could add integration with Google's Cloud Vision API which can produce much better results, however it will do so at a cost and you'll need to create a Google project yourself.

If your not sure what curating requires then check out Victoria Smith's [Metadata Curator Skillshare course](https://skl.sh/2MZ1hsM). 

## Compatibility

This functionality isn't tested on older browsers and isn't going to work on a mobile phone (how do you click the Bookmarklet?).


## Resources
https://www.tensorflow.org/js TensorFlow image processing

https://cloud.google.com/vision/docs/labels - The Google Cloud label example. e.g Street, Snapshot, Town, Night, Alley

https://cloud.google.com/vision/docs/object-localizer - Object Localiser. e.g Bicycle, Picture frame, Tire, Door

## Technical details

The `bookmarklet` looks like a bookmark but is a piece of Javascript code which runs when you click on it.
This repo is available publicly in order for other developers to be able to review the code for any issues, learn how it works and also suggest any changes.



### Use at your own risk
Michael is a fellow stock footage film maker and also web developer.
Michael will do what he can to ensure the code works well and doesn't cause any issues. But accepts no liabilities for any issues caused by using this. The code has been developed independently from BlackBox itself.

Please note, certain services, such as the Google Machine learning calls come with associated costs. Others, like the Tensorflow model require 20MB downloads. The analytics system uploads your images and submitted keywords in order to create better trained models and improve the system overall.

### Imagery Access

By using the `Initial Keywording` system you agree to provide [**G**rey **P**hoenix **P**roductions](https://www.greyphoenix.biz) (the creator of the BlackBox Plus system) authorised uses to the images used and submitted keyword information.
This information can then be used to create better quality machine learning training models and in turn better keywords.


## Full Legals:

Copyright © 2020 [Michael Kubler](https://www.kublermdk.com/) of **G**rey **P**hoenix **P**roductions

> Permission to use, copy, modify, and/or distribute this software for any purpose without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


## Other notes

Ideally BlackBox will integrate some of these features into their website and you won't need to use this anymore.
Alternatively BlackBox may choose to disable this functionality, in which case, talk to Pat about it.

The [code provided here](https://github.com/kublermdk/BlackBox-Plus) is available open source, especially for openness and transparency.

<link media="all" rel="stylesheet" href="index.css" />