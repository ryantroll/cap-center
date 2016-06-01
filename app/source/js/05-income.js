$(document).ready(boIncomeReady);
var employerTemplate;
var employerIndex;
var employersHolder;

function boIncomeReady(){

    var myForm = $('#boIncomeForm');
    /**
     * do nothing if the form is not #coBorrowerForm
     */
    if(myForm.length <= 0) return;

    employerTemplate = $('#employerTmplt').text();
    employerIndex = 1;
    employersHolder = $('#employersHolder')


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

    /**
     * Adding google address type ahead
     */
    addAutoAddress(1); /// function in 01-borrower.js

    $('input[name=in_ck_income2]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.employment', validationClass:'.cc-to-be-validate-em'}); //// function in main.js

            bindEmploymentDate(1);
        }//// if
        else{
            excludeFields({
                selector:'.employment, .preEmployment',
                validationClass:'.cc-to-be-validate-em, .cc-to-be-validate-pre'
            }); //// function in main.js

            if(employerIndex > 1){
                removeEmployer(2); /// will take care of the rest of
            }
        }
    });

    $('input[name=in_ck_income3]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.self', validationClass:'.cc-to-be-validate-self'}); //// function in main.js
            addAutoAddress(5)
        }//// if
        else{
            excludeFields({
                selector:'.self',
                validationClass:'.cc-to-be-validate-self'
            }); //// function in main.js

        }
    });

    $('input[name=in_ck_income4]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.additional', validationClass:'.cc-to-be-validate-additional'}); //// function in main.js
            addAutoAddress(6)
        }//// if
        else{
            excludeFields({
                selector:'.additional',
                validationClass:'.cc-to-be-validate-additional'
            }); //// function in main.js

        }
    });

    $('input[name=in_ck_income5]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.retirement', validationClass:'.cc-to-be-validate-retirement'}); //// function in main.js

        }//// if
        else{
            excludeFields({
                selector:'.retirement',
                validationClass:'.cc-to-be-validate-retirement'
            }); //// function in main.js

        }
    });

    $('input[name=in_ck_income6]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.ssn', validationClass:'.cc-to-be-validate-ssn'}); //// function in main.js

        }//// if
        else{
            excludeFields({
                selector:'.ssn',
                validationClass:'.cc-to-be-validate-ssn'
            }); //// function in main.js

        }
    });

    $('input[name=in_ck_income7]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.child', validationClass:'.cc-to-be-validate-child'}); //// function in main.js

        }//// if
        else{
            excludeFields({
                selector:'.child',
                validationClass:'.cc-to-be-validate-child'
            }); //// function in main.js

        }
    });

    $('input[name=in_ck_income8]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.dividend', validationClass:'.cc-to-be-validate-dividend'}); //// function in main.js

        }//// if
        else{
            excludeFields({
                selector:'.dividend',
                validationClass:'.cc-to-be-validate-dividend'
            }); //// function in main.js

        }
    });

    $('input[name=in_ck_income9]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.rental', validationClass:'.cc-to-be-validate-rental'}); //// function in main.js

        }//// if
        else{
            excludeFields({
                selector:'.rental',
                validationClass:'.cc-to-be-validate-rental'
            }); //// function in main.js

        }
    });

};//// borrowerReady

function bindEmploymentDate(index){

    var fields = $('input.startDate' + index + ', input.endDate' + index)
    .off('change', {index:index}, checkEmploymentDate)
    .on('change', checkEmploymentDate);

}///// fun. bindEmploymentDate

function addEmployer(index){
    if(index > 4) return;

    employerIndex = index;
    var employer = $(employerTemplate.replace(/(\{\#\})/g, employerIndex));

    fillStateDropdown( employer.find('.state-dropdown') );

    employer.find('input.phone')
    .on('keydown', restrictPhone)
    .on('keyup', formatPhone)

    employer.find('input.date')
    .on('keydown', restrictDate)
    .on('keyup', formatDate);

    employer.find('input.numbers')
    .on('keydown', restrictNumbers)

    employer.find('input.currency')
    .on('keydown', restrictCurrency)
    .on('keyup', formatCurrency);

    employersHolder.append(employer);

    addAutoAddress(employerIndex);
    bindEmploymentDate(employerIndex);

    updateTabIndex( $('.cc-form')); //// function in main.js

    employer.slideDown();
}//// fun. addEmployer

function removeEmployer(removeIndex){

    if(removeIndex <= 1) return;
    // if(removeIndex > 4) return;

    for(var x=removeIndex; x<=employerIndex; x++){
        $('#employer_' + x).slideUp({
            complete:function(){
                $(this).remove();
                updateTabIndex($('.cc-form'))
            }
        })
    }
    employerIndex = removeIndex - 1;
}

function checkEmploymentDate(ev){

    /**
     * Validate end date and add previous job if applicable
     */
    var index = parseInt($(this).attr('data-index'), 10);

    var endDateField = $('.endDate'+index).eq(0);
    var startDateField = $('.startDate'+index).eq(0);
    var endDate, startDate;

    if(endDateField.val().length === 10){
        var dateSplit = endDateField.val().split('/');
        endDate = new Date(Number(dateSplit[2]), Number(dateSplit[0])-1, Number(dateSplit[1]));
    }
    else{
        endDate = new Date();
    }

    if(startDateField.val().length === 10){
        var dateSplit = startDateField.val().split('/');
        startDate = new Date(Number(dateSplit[2]), Number(dateSplit[0])-1, Number(dateSplit[1]));
    }
    else{
        return;
    }
    if(endDate <= startDate){
        endDateField.addError('cc-date-gt').showError();
    }
    else{
        if(endDate - startDate <  2 * 365 * 24 * 60 * 60 * 1000 ){
            // includeFields({selector:'.preEmployment', validationClass:'.cc-to-be-validate-pre'}); //// function in main.js
            addEmployer(index+1)
        }////
        else{
            removeEmployer(index+1)
        }
    }//// else
}//// fun. checkEmplymentDate