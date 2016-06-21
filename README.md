# CapCenter Application #

CapCenter is an innovative mortgage lender who delivers a home buying experience to consumers with a 0 closing cost promise.

## General About The Code ##

Other than jQuery NO external library is used all the code is custom developed for this application. However, few common functions are coped from my library of functions

Any HTML templates needed are done through costume coding

Gulp is used to generate do:

1. Compile the SASS files into .css files and move them to dist/css Folder
2. Concatenate the .js files into one files and minify it then move it to dist/folder


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

#### source/js folder ####

contains all the source js files before any modifications, for each .html file in dist folder has an matching js file in this folder

These .js files contains a plenty of code comment to describe the purpose of each function and variable defined and here is a description for each files:

1. 0n-xxxxx.js: This is a page specific file most of the code in these files are included in self-invoking function in some of them when functionality is shared with other page a function definition is moved out self-invoking function to make the functions accessible to code in other page  e.q. 01-borrower.js when same functionality exists in 02-coborrower.js
2. us-stats.js: definition of array of object for USA states names.
3. validation-plugin.js: custom developed jQuery plugin that do form validation more explanation below
4. support-plugin.js: custom developed jQuery plugin for support component
5. dropdown-plugin.js: NOT USED ANY MORE

#### dist folder ####

Where the production code is placed

### Validation Plugin ###

This function once initialized will intercept the submit event of the a form and validate the field based on css class that should be added to .cc-field div

```javascript
    $('#formID').validate(callback(isValid, inValidFields){

        return true; //// the return value will be combined with form validation result with && operator
    })
```

the .validate method accept 1 variable as call back function, the plugin will run on form submit and loop through the fields and set it is validity status and error messages then it call the callback function passing 2 arguments to it

1. arguments[0]: is the validity status of the form false/true
2. arguments[1]: array of object that represent invalid fields and

Call back function gives option for:

1. add extra validation that is not support with this plugin
2. stopping the submit process by returning false
3. read the validity status of the form and also list of invalid fields through the variable passed

#### Types of Validation ####

Each field in the form need to be enclosed with .cc-field div for the validation to work

All type of validation can by done by adding the blow classes to .cc-field div

1. required: by adding "cc-required" class to .cc-field div
2. Number: by adding "cc-number" class to .cc-field div
3. Email: by adding "cc-email" class to .cc-field div
4. Date: by adding "cc-date" class to .cc-field div
5. Date greater than: by adding "cc-date cc-date-gt" classes to .cc-field div also data-date-gt attribute should be added to .cc-field and should be set to the fields id to the other field we comparing to
6. Credit Card Expiration: by adding "cc-card-expiration" class to .cc-field div
7. Phone: by adding "cc-phone" class to .cc-field div
8. Currency: by adding "cc-currency" class to .cc-field div
9. Social Security Number: by adding "cc-ssn" class to .cc-field div
10. One Check box required: by adding "cc-required-one-of" class to .cc-field div

#### Other Functions ####

Plugin add extra functions for input DOM object as
1. addError(class): will add an error to the field to error list without showing it
```javascript
    $('#inputID').addError('cc-phone');
```
2. removeError(class): will remove an error to the field
```javascript
    $('#inputID').removeError('cc-phone');
```


