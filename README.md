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
Build a web slideshow application from scratch for my daughter using:

* **HTML**
* // TODO: [**SCSS/SASS**](http://sass-lang.com/) as a pre-processor for the **CSS** wich animate the images
* [**JQuery**](https://jquery.com/) to preload and show the slides
* [**Gulp**](http://gulpjs.com/) as a task runner (gulpfile.js)
* [**JSHint**](https://jshint.com/) to detect errors and potential problems in JavaScript code
* [**CSSLint**](http://csslint.net/) to detect errors and potential problems in CSS code
* [**NPM**](https://www.npmjs.com/) for **Node.js**  package management

**Note**: I'm using the beautiful free pictures found on [Unsplash](https://unsplash.com/explore).

## Workflow
I use Gulp for the front-end development workflow, making it faster and more efficient.
I automate different tasks such as:
 * Injecting files that have to be referenced
 * Linting code (showing warnings and errors in console window)
 * Watching for changes in CSS, HTML and JS files
 * Concatenating and minifying code
 * Cropping and optimizing images 

## Architecture
First of all the project root is NOT the webroot. The webroot is **`./build/`**.

Pixl consist of a PHP script [**`images.php`**](./source/images.php) that will scan the
folder **`./images/`** for JPG files and provide that sequence of images in JSON format
to a jQuery script [**`script.js`**](./source/assets/js/script.js) to display it
in a slideshow. After each run, the list of images will be reloaded and shuffled.
The photographer is determined on the basis of the image name.

## Installation

* Download or clone the [Pixl github repository](https://github.com/foxfabi/pixl/) 
* Run the **`npm install`** command
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
See the [LICENSE](LICENSE) file for details.

## Changelog

See the [CHANGELOG](CHANGELOG.md) file for details.
