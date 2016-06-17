/**
 * Global variables for this page
 * var _appGlobal.assetTemplate, _appGlobal.assetIndex, _appGlobal.assetsHolder, _appGlobal.assetsArray;
 * var _appGlobal.estateTemplate, _appGlobal.estateIndex, _appGlobal.estatesHolder, _appGlobal.estatesArray;
 */
(function() {
    $(document).ready(assetsReady);

    function assetsReady(){

        var myForm = $('#assetsForm');
        /**
         * do nothing if the form is not #coBorrowerForm
         */
        if(myForm.length <= 0) return;

        /**
         * [rentTemplate variable to hold the html template as string]
         */
        _appGlobal.assetTemplate = $('#assetTmplt').text();
        _appGlobal.estateTemplate = $('#estateTmplt').text();

        /**
         * [_appGlobal.assetIndex a variable to track the asset property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        _appGlobal.assetIndex = 0;
        _appGlobal.estateIndex = 0;

        /**
         * [_appGlobal.assetsHolder the div where asset properties will be appended]
         */
        _appGlobal.assetsHolder = $('#assetsHolder');
        _appGlobal.estatesHolder = $('#estateHolder');

        /**
         * [_appGlobal.assetsArray will track the position of each asset property index
         * when user start adding and removing assets randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first asset has index of 4 and second asset has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateassetsFields function
         */
        _appGlobal.assetsArray = [];
        _appGlobal.estatesArray = [];

        updateTabIndex( myForm); //// function in main.js

        /**
         * [isContinueClicked it will be set to true when continue button clicked ]
         * this var will help detect form submit on button click and scroll up the page to the first form error
         * @type {Boolean}
         */
        var isContinueClicked = false;

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

        /**
         * initialize the form when its preloaded with saved data for asset
         */
        _appGlobal.assetsHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            var myId = parseInt($(this).find('input[id^=as_bank]').eq(0).attr('id').split('as_bank')[1], 10);


            _appGlobal.assetIndex = myIndex;
            _appGlobal.assetsArray.push(_appGlobal.assetIndex);

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

        $('#addAnotherEstate')
        .on('click', function(ev){
            if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;
            addEstate();
        });

        $('input[name=as_assets]').on('change', function(){
            var val = $(this).val();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                /**
                 * Delay adding for smooth slid down animation
                 */
                setTimeout(function(){
                    addAsset();
                }, 300)
                includeFields({selector:'.assets', validationClass:'.cc-to-be-validate'}); //// function in main.js

            }
            else{
                /**
                 * Remove all properties
                 */
                while(_appGlobal.assetsArray.length > 0){
                    var idToRemove = _appGlobal.assetsArray.pop();
                    $('#asset_' + idToRemove).slideUp(function(){
                        $(this).remove();
                    })
                }/// while
                excludeFields({selector:'.assets', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });


        $('input[name=as_additionalrealestate]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                /**
                 * Delay adding for smooth slid down animation
                 */
                setTimeout(function(){
                    addEstate();
                }, 300)
                includeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js

            }
            else{
                /**
                 * Remove all properties
                 */
                while(_appGlobal.estatesArray.length > 0){
                    var idToRemove = _appGlobal.estatesArray.pop();
                    $('#estate_' + idToRemove).slideUp(function(){
                        $(this).remove();
                    })
                }/// while
                excludeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });



    };//// borrowerReady



    function addAsset(){

        if(_appGlobal.assetsArray.length >= 5) return;

        _appGlobal.assetIndex++;
        _appGlobal.assetsArray.push(_appGlobal.assetIndex);
        var template = _appGlobal.assetTemplate.replace(/(\{\#index\})/g, _appGlobal.assetIndex);

        var id = _appGlobal.assetsArray.length;
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

        dropdownLabel(asset);


        _appGlobal.assetsHolder.append(asset);

        asset.slideDown();

        updateTabIndex($('.cc-form'));

        updateAssetCloseBtn();
    }//// fun. addRent

    function removeAsset(removeIndex){
        var position = _appGlobal.assetsArray.indexOf(removeIndex);

        $('#asset_' + removeIndex).slideUp({
            complete:function(){
                $(this).remove();
                updateTabIndex($('.cc-form'));
            }
        });
        _appGlobal.assetsArray.splice(position, 1);

        updateAssetsFields();

        updateAssetCloseBtn();
    }//// fun. removeAsset

    /**
     * [updateAssetsFields this function will ensure the asset name and id is always in series of 1,2,3,4,....]
     * this function is called in addAsset and removeAsset
     * this function assume the fields names and ids contain ONE number of 1 or 2 digits
    */
    function updateAssetsFields(){
        var limit = _appGlobal.assetsArray.length;
        if(limit < 1) return;

        for(var x=0; x<limit; x++){
            var index = _appGlobal.assetsArray[x];

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

        if(_appGlobal.assetsArray.length > 1){
            var index = _appGlobal.assetsArray[0];
            var assetDiv = $('#asset_'+index);
            assetDiv.find('a.close').show();
        }
        else{
            var index = _appGlobal.assetsArray[0];
            var assetDiv = $('#asset_'+index);
            assetDiv.find('a.close').hide();
        }

        if(_appGlobal.assetsArray.length >= 5){
            $('#addAnotherAsset').hide();
        }
        else{
            $('#addAnotherAsset').show();
        }

    }//// fun. updateAssetCloseBtn


    function addEstate(){

        if(_appGlobal.estatesArray.length >= 5) return;

        _appGlobal.estateIndex++;
        _appGlobal.estatesArray.push(_appGlobal.estateIndex);
        var template = _appGlobal.estateTemplate.replace(/(\{\#index\})/g, _appGlobal.estateIndex);

        var id = _appGlobal.estatesArray.length;
        template = template.replace(/(\{\#id\})/g, id);


        var estate = $(template);

        estate.find('a.close').on('click', function(ev){
            var i = parseInt($(this).attr('data-index'), 10);
            removeEstate(i);
        });

        /**
         * Behavior setting for numbers only and currency fields
         */

        estate.find('input.currency')
        .on('keydown', restrictCurrency)
        .on('keyup', formatCurrency);

        _appGlobal.estatesHolder.append(estate);

        dropdownLabel(estate);
        yesNoRadio(estate);
        fillStateDropdown(estate);
        addAutoAddress(_appGlobal.estateIndex, true); /// true is to force the label to start from 1, default 1 will be ignored
        bindEstateMortgage(_appGlobal.estateIndex);

        estate.slideDown();

        updateTabIndex($('.cc-form'));

        updateEstateCloseBtn();
    }//// fun. addRent

    function removeEstate(removeIndex){
        var position = _appGlobal.estatesArray.indexOf(removeIndex);

        $('#estate_' + removeIndex).slideUp({
            complete:function(){
                $(this).remove();
                updateTabIndex($('.cc-form'));
            }
        });
        _appGlobal.estatesArray.splice(position, 1);

        updateEstatesFields();

        updateEstateCloseBtn();
    }//// fun. removeAsset

    /**
     * [updateEstatesFields this function will ensure the Estate name and id is always in series of 1,2,3,4,....]
     * this function is called in addEstate and removeEstate
     * this function assume the fields names and ids contain ONE number of 1 or 2 digits
    */
    function updateEstatesFields(){
        var limit = _appGlobal.estatesArray.length;
        if(limit < 1) return;

        for(var x=0; x<limit; x++){
            var index = _appGlobal.estatesArray[x];

            var estateDiv = $('#estate_'+index);

            estateDiv.find('input').each(function(z){
                var name = $(this).attr('name');
                var newName = name.replace(/\d{1,2}/g, x+1);
                var label = $('label[for=' + name + ']');
                $(this).attr({name:newName, id:newName});
                label.attr('for', newName);
            });
        }//// for x
    }//// fun. updateestatesFields

    /**
     * [updateEstatesCloseBtn this function will ensure the remove button is hidden if there is only one Estate]
     * it will be called from addEstate and removeEstate
     */
    function updateEstateCloseBtn(){

        if(_appGlobal.estatesArray.length > 1){
            var index = _appGlobal.estatesArray[0];
            var estateDiv = $('#estate_'+index);
            estateDiv.find('a.close').show();
        }
        else{
            var index = _appGlobal.estatesArray[0];
            var estateDiv = $('#estate_'+index);
            estateDiv.find('a.close').hide();
        }

        if(_appGlobal.estatesArray.length >= 5){
            $('#addAnotherEstate').hide();
        }
        else{
            $('#addAnotherEstate').show();
        }

    }//// fun. updateEstateCloseBtn

    function bindEstateMortgage(index){
        $('input.mortgageRadio'+index).on('change', function(){

            var myIndex = $(this).attr('data-index');
            var myVal = $(this).val();
            console.log(myIndex, myVal)
            if(true === !!$(this).attr('checked') && myVal === 'yes'){
                includeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
            }
            else{
                excludeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
            }
        });
    }//// fun. bindEsateMortgage
})();
