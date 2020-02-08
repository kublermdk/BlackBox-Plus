# BlackBox Plus

Created by [Michael Kubler](https://www.kublermdk.com/) of [Grey Phoenix Productions](https://www.greyphoenix.biz/)

You need to drag and drop the bookmarks below into your browser toolbar. Then when you are on the portal.blackbox website you can click on one to activate the feature.

Every time you refresh the page, you'll need to click the bookmarklet again to load it up.

## Bookmarklets

@todo: Create working bookmarklet links that people can use

@todo: Create gif/images which explain to people how to use them.

1. Data Export
2. Initial Keywording
3. Thesaurus



## Intro

[BlackBox](https://blackbox.global/) is a stock footage submission platform, community and more.

> BlackBox is a creator community and platform that allows creators all over the world to connect, share the work, share the content and share the passive income..

The [BlackBox Portal](https://portal.blackbox.global/) is the system used for dealing with submissions, keywording and more.


**BlackBox Plus** is a set of bookmarklets designed to add extra functionality to the BlackBox portal site.


## Data Export

This will call the BlackBox API and create links so you can download the financial and stock footage data as CSV or JSON files. The CSV files can be opened up in a spreadsheet app, Google Docs, etc...

Because this does calls to the BlackBox API thus adding load, it's recommended you don't abuse this.

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

Ideally BlackBox will integrate some of these features into their website and you won't need to use this anymore.
Alternatively BlackBox may choose to disable this functionality, in which case, talk to Pat about it.