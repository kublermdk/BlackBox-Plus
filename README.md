# BlackBox Plus

Created by [Michael Kubler](https://www.kublermdk.com/) of [Grey Phoenix Productions](https://www.greyphoenix.biz/)

Source code [Available on Github](https://github.com/kublermdk/BlackBox-Plus) 


You need to drag and drop the bookmarks below into your browser toolbar. Then when you are on the portal.blackbox website you can click on one to activate the feature.

Every time you refresh the page, you'll need to click the bookmarklet again to load it up.

## Bookmarklets

Directions:

Drag the links below to your browser, go to [portal.blackbox.global](https://portal.blackbox.global/) and when the page is loaded click the link and the extra functionality will be added.

## Bookmarklet Links (drag these to your browser link bar) :

1. <a class="bookmarklet" href="javascript:(function () {console.debug('Loading BlackBox Plus Exporter');let script = document.createElement('script');script.src = 'https://blackboxplus.greyphoenix.biz/dist/export.js';document.head.appendChild(script);})();">BB+ Data Export</a> - Gives you CSV and JSON exports of your data.

Still coming:

2. Initial Keywording
3. Thesaurus

Still to come: gif/images which explain how to use these.

## Intro

[BlackBox](https://blackbox.global/) is a stock footage submission platform, community and more.

> BlackBox is a creator community and platform that allows creators all over the world to connect, share the work, share the content and share the passive income..

The [BlackBox Portal](https://portal.blackbox.global/) is the system used for dealing with submissions, keywording and more.


**BlackBox Plus** is a set of bookmarklets designed to add extra functionality to the BlackBox portal site.


### What is a Bookmarklet?

A bookmarklet looks like a link, but actually executes javascript code in your browser. Note that you can't see the Bookmarklets in the Github README file. You have to view them at [blackboxplus.greyphoenix.biz](https://blackboxplus.greyphoenix.biz/)

## Data Export

This will call the BlackBox API and create links so you can download the financial and stock footage data as CSV or JSON files. The CSV files can be opened up in a spreadsheet app, Google Docs, etc...

Because this makes multiple requests to the BlackBox API thus adding load to their servers, it's recommended you don't abuse this. e.g Don't use it 10x an hour.

## Initial Keywording

This uses a Machine Learning system to grab frames of the video and attempt to detect things within that image.
This is only designed to reduce the burden on people doing keywording by automatically adding keywords for the obvious THINGS in the frames.
Allowing curators to focus more on adding the emotional and movement keywords.

The free TensorFlow version uses the MobileNet Image Classification system (and possibly the Object Detection system using Coco SSD).

If there's interest I could add integration with Google's Cloud Vision API which can produce much better results, however it will do so at a cost and you'll need to create a Google project yourself.

If your not sure what curating requires then check out Victoria Smith's [Metadata Curator Skillshare course](https://skl.sh/2MZ1hsM). 

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

<link media="all" rel="stylesheet" href="https://.css" />
  
<style>

/* Based on the html5-boilerplate https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css */
html {
  color: #222;
  font-size: 1em;
  line-height: 1.4;
}
::selection {
  background: #b3d4fc;
  text-shadow: none;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
audio,
canvas,
iframe,
img,
svg,
video {
  vertical-align: middle;
}

/*
 * Remove default fieldset styles.
 */

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

/*
 * Allow only vertical resizing of textareas.
 */

textarea {
  resize: vertical;
}

/* ==========================================================================
   Browser Upgrade Prompt
   ========================================================================== */

.browserupgrade {
  margin: 0.2em 0;
  background: #ccc;
  color: #000;
  padding: 0.2em 0;
}

/* ==========================================================================
   Author's custom styles
   ========================================================================== */

/* ==========================================================================
   Helper classes
   ========================================================================== */

/*
 * Hide visually and from screen readers
 */

.hidden {
  display: none !important;
}

/*
* Hide only visually, but have it available for screen readers:
* https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
*
* 1. For long content, line feeds are not interpreted as spaces and small width
*    causes content to wrap 1 word per line:
*    https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
*/

.sr-only {
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  /* 1 */
}

/*
* Extends the .sr-only class to allow the element
* to be focusable when navigated to via the keyboard:
* https://www.drupal.org/node/897638
*/

.sr-only.focusable:active,
.sr-only.focusable:focus {
  clip: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  position: static;
  white-space: inherit;
  width: auto;
}

/*
* Hide visually and from screen readers, but maintain layout
*/

.invisible {
  visibility: hidden;
}

/*
* Clearfix: contain floats
*
* For modern browsers
* 1. The space content is one way to avoid an Opera bug when the
*    `contenteditable` attribute is included anywhere else in the document.
*    Otherwise it causes space to appear at the top and bottom of elements
*    that receive the `clearfix` class.
* 2. The use of `table` rather than `block` is only necessary if using
*    `:before` to contain the top-margins of child elements.
*/

.clearfix:before,
.clearfix:after {
  content: " ";
  /* 1 */
  display: table;
  /* 2 */
}

.clearfix:after {
  clear: both;
}

/* ==========================================================================
   EXAMPLE Media Queries for Responsive Design.
   These examples override the primary ('mobile first') styles.
   Modify as content requires.
   ========================================================================== */

@media only screen and (min-width: 35em) {
  /* Style adjustments for viewports that meet the condition */
}

@media print,
  (-webkit-min-device-pixel-ratio: 1.25),
  (min-resolution: 1.25dppx),
  (min-resolution: 120dpi) {
  /* Style adjustments for high resolution devices */
}

/* ==========================================================================
   Print styles.
   Inlined to avoid the additional HTTP request:
   https://www.phpied.com/delay-loading-your-print-css/
   ========================================================================== */

@media print {
  *,
  *:before,
  *:after {
    background: transparent !important;
    color: #000 !important;
    /* Black prints faster */
    box-shadow: none !important;
    text-shadow: none !important;
  }
  a,
  a:visited {
    text-decoration: underline;
  }
  a[href]:after {
    content: " (" attr(href) ")";
  }
  abbr[title]:after {
    content: " (" attr(title) ")";
  }
  /*
     * Don't show links that are fragment identifiers,
     * or use the `javascript:` pseudo protocol
     */
  a[href^="#"]:after,
  a[href^="javascript:"]:after {
    content: "";
  }
  pre {
    white-space: pre-wrap !important;
  }
  pre,
  blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }
  /*
     * Printing Tables:
     * https://web.archive.org/web/20180815150934/http://css-discuss.incutio.com/wiki/Printing_Tables
     */
  thead {
    display: table-header-group;
  }
  tr,
  img {
    page-break-inside: avoid;
  }
  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }
  h2,
  h3 {
    page-break-after: avoid;
  }
}
h1, h2, h3, h4, p, span, strong, li, body {
font-family: sans-serif;
}

/*Based on https://hackernoon.com/making-your-links-look-pretty-with-css-practicum-by-yandex-ve8o3377 and https://css-tricks.com/styling-underlines-web/ */
a{color: #0f7afc; text-decoration:none; border-bottom: 1px solid; border-bottom-color: rgba(15, 122, 252, 0.2); }
a:hover{color:#cf0000; border-bottom-color: rgba(208, 64, 0, 0.2); }
a:visited{ color: #800080; border-bottom-color: rgba(128, 0, 128, 0.2); }

body {
 background-color: #eee;
}

.bookmarklet {
font-weight: bold;
}
</style>