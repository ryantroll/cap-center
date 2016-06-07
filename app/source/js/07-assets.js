$(document).ready(assetsReady);
var assetTemplate, assetIndex, assetsHolder, assetsArray;

function assetsReady(){

    var myForm = $('#assetsForm');
    /**
     * do nothing if the form is not #coBorrowerForm
     */
    if(myForm.length <= 0) return;

    /**
     * [rentTemplate variable to hold the html template as string]
     */
    assetTemplate = $('#assetTmplt').text();
    /**
     * [assetIndex a variable to track the asset property inside the DOM
     * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
     * @type {Number}
     */
    assetIndex = 0;

    /**
     * [assetsHolder the div where asset properties will be appended]
     */
    assetsHolder = $('#assetsHolder');

    /**
     * [assetsArray will track the position of each asset property index
     * when user start adding and removing assets randomly this array will keep track of
     * e.g retnsArray = [4, 6] means the first asset has index of 4 and second asset has index of 6
     * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateassetsFields function
     */
    assetsArray = [];

    updateTabIndex( myForm); //// function in main.js

    /**
     * [isContinueClicked it will be set to true when continue button clicked ]
     * this var will help detect form submit on button click and scroll up the page to the first form error
     * @type {Boolean}
     */
    var isContinueClicked = false;

    /**
     * [isProperty boolean value to know if user has a property or not]
     * @type {Boolean}
     */
    var isProperty = false;

    /**
     * initialize form validation
     */
    myForm.validate(function(isValid, invalidFields){


        if(isValid){

            return true;
        }//// if isValid
        else{
            /**
             * if Not valid scroll to first invalid field
             */
            if(invalidFields && true === isContinueClicked){
                var scrollTo = $('#' + invalidFields[0].id).offset().top;
                //// scroll the form to the first error
                animateScroll(scrollTo-20, 1);

                isContinueClicked = false;
            }
        }//// if isValid Else

        return false;
    });

    /**
     * Continue Click
     */
    $('#continue').on('mousedown touchstart', function(e){
        isContinueClicked = true;
    })

    /**
     * Field formating while typing
     * Event handlers in main.js
     */

    $('input.phone')
    .on('keydown', restrictPhone)
    .on('keyup', formatPhone)

    $('input.date')
    .on('keydown', restrictDate)
    .on('keyup', formatDate);

    $('input.numbers')
    .on('keydown', restrictNumbers)

    $('input.currency')
    .on('keydown', restrictCurrency)
    .on('keyup', formatCurrency);

    addAutoAddress(7);


    /**
     * initialize the form when its preloaded with saved data for asset
     */
    assetsHolder.children().each(function(x){
        var myIndex = parseInt($(this).attr('data-index'), 10);
        var myId = parseInt($(this).find('input[id^=as_bank]').eq(0).attr('id').split('as_bank')[1], 10);


        assetIndex = myIndex;
        assetsArray.push(assetIndex);

        $(this).find('a.close').on('click', function(e){
            var i = parseInt($(this).attr('data-index'), 10);
            removeAsset(i);
        });

        updateAssetCloseBtn();
    });



    $('#addAnotherAsset')
    .on('click', function(ev){
        if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;
        addAsset();
    });


    $('input[name=as_additionalrealestate]').on('change', function(){
        var val = $(this).val();
        if(true === !!$(this).attr('checked') && val === 'yes'){
            includeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
        }
        else{
            excludeFields({selector:'.property, .mortgage7', validationClass:'.cc-to-be-validate, .cc-to-be-validate-mort7'}); //// function in main.js
        }
    });

    $('input.mortgageRadio7').on('change', function(){
        var val = $(this).val();
        if(true === !!$(this).attr('checked') && val === 'yes'){
            includeFields({selector:'.mortgage7', validationClass:'.cc-to-be-validate-mort7'}); //// function in main.js
        }
        else{
            excludeFields({selector:'.mortgage7', validationClass:'.cc-to-be-validate-mort7'}); //// function in main.js
        }
    })

};//// borrowerReady



function addAsset(){

    if(assetsArray.length >= 5) return;

    assetIndex++;
    assetsArray.push(assetIndex);
    var template = assetTemplate.replace(/(\{\#index\})/g, assetIndex);

    var id = assetsArray.length;
    template = template.replace(/(\{\#id\})/g, id);


    var asset = $(template);

    asset.find('a.close').on('click', function(ev){
        var i = parseInt($(this).attr('data-index'), 10);
        removeAsset(i);
    });

    /**
     * Behavior setting for numbers only and currency fields
     */

    asset.find('input.currency')
    .on('keydown', restrictCurrency)
    .on('keyup', formatCurrency);


    assetsHolder.append(asset);

    asset.slideDown();

    updateTabIndex($('.cc-form'));

    updateAssetCloseBtn();
}//// fun. addRent

function removeAsset(removeIndex){
    var position = assetsArray.indexOf(removeIndex);

    $('#asset_' + removeIndex).slideUp({
        complete:function(){
            $(this).remove();
            updateTabIndex($('.cc-form'));
        }
    });
    assetsArray.splice(position, 1);

    updateAssetsFields();

    updateAssetCloseBtn();
}//// fun. removeAsset

/**
 * [updateAssetsFields this function will ensure the asset name and id is always in series of 1,2,3,4,....]
 * this function is called in addAsset and removeAsset
 * this function assume the fields names and ids contain ONE number of 1 or 2 digits
*/
function updateAssetsFields(){
    var limit = assetsArray.length;
    if(limit < 1) return;

    for(var x=0; x<limit; x++){
        var index = assetsArray[x];

        var assetDiv = $('#asset_'+index);

        assetDiv.find('input').each(function(z){
            var name = $(this).attr('name');
            var newName = name.replace(/\d{1,2}/g, x+1);
            var label = $('label[for=' + name + ']');
            $(this).attr({name:newName, id:newName});
            label.attr('for', newName);
        });
    }//// for x
}//// fun. updateAssetsFields

// /**
//  * [updateAssetsCloseBtn this function will ensure the remove button is hidden if there is only one asset]
//  * it will be called from addAsset and removeAsset
//  */
function updateAssetCloseBtn(){

    if(assetsArray.length > 1){
        var index = assetsArray[0];
        var assetDiv = $('#asset_'+index);
        assetDiv.find('a.close').show();
    }
    else{
        var index = assetsArray[0];
        var assetDiv = $('#asset_'+index);
        assetDiv.find('a.close').hide();
    }

    if(assetsArray.length >= 5){
        $('#addAnotherAsset').hide();
    }
    else{
        $('#addAnotherAsset').show();
    }

}//// fun. updateAssetCloseBtn

// function bindassetMortgage(index){
//     $('input.mortgageRadio'+index).on('change', function(){
//         var myIndex = $(this).attr('data-index');
//         var myVal = $(this).val();
//         if(true === !!$(this).attr('checked') && myVal === 'yes'){
//             includeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
//         }
//         else{
//             excludeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
//         }
//     });
// }//// fun. bindRentMortgage