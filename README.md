# Pixl
Pronunciation: /ˈpɪksəl/, /ˈpɪksɛl/

**P**resents **i**mages with some transition effects (f**x**) so that I can improve my web development skills and **l**earn new things.

## Purpose
The purpose is to improve my web development skills. I want to ... 

* ... **have fun**
* ... **learn** new technologies, **reflect** and **improve** myself
* ... develop something i can **be proud** of

**Learning through experience. Learning by doing.**

## Masterplan 
Build a web slideshow application from scratch using:

* **HTML**
* // TODO: [**SCSS/SASS**](http://sass-lang.com/) as a pre-processor for the **CSS** wich animate the images
* [**JQuery**](https://jquery.com/) to preload and show the slides
* [**Gulp**](http://gulpjs.com/) as a task runner (gulpfile.js)
* [**JSHint**](https://jshint.com/) to detect errors and potential problems in JavaScript code
* [**CSSLint**](http://csslint.net/) to detect errors and potential problems in CSS code
* [**NPM**](https://www.npmjs.com/) for **Node.js**  package management

## Architecture
First of all the project root is NOT the webroot. The webroot is **`./build/`**.

Consist of a PHP script that will scan a folder with images and
provide that sequence of images to a jQuery script to display it as slideshow.


## Installation

* Download or clone the [Pixl github repository](https://github.com/foxfabi/pixl/) 
* Upload the files from **`./build/`** folder to your Webserver

### Add images

* Run the **`gulp watch:images`** command
* Place some images into the folder **`./source/uploads/`**
* Upload the files from **`./build/images`** folder to your Webserver webroot

### Requirements

* [**NPM**](https://www.npmjs.com/) is installed on your computer when you install **Node.js**
* Make sure [**ImageMagick**](https://www.imagemagick.org/) is installed on your system

## Author
**Fabian Dennler** - [Github](https://github.com/foxfabi/)

## License
See the [license](LICENSE) file for details.

## Changelog

See the [CHANGELOG](CHANGELOG.md) file for details.