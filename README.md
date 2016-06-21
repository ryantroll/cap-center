# CapCenter Application #

CapCenter is an innovative mortgage lender who delivers a home buying experience to consumers with a 0 closing cost promise.

## General About The Code ##

Gulp is used to generate do:

1. Compile the SASS files into .css files and move them to dist/css Folder
2. Concactinate the .js files into one files and minify it then move it to dist/folder

To run the the development environment:

1. you need to have NodeJS installed on your machine
2. in command prompt change directory to HTML folder of this application
3. run "npm install" to install Node modules
4. run "gulp" this will put gulp to watch for any changes to files inside source/js and source/sass folders
5. simply Ctrl+C to stop gulp

### Folder Structure and Files ###

#### source/sass folder ####

contains all .sass files

1. cpacener.scss: main css files and class
2. capcenter-ie.scss: css fixes for IE9
3. normmalize.scss: css reset that override the browser default style for each tag

#### source/sass/includes folder ####

This folder contains common sass definitions for mixins, variables and colors
Files in this folder are included in other sass files


