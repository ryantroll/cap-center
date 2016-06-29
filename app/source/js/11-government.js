(function(){
    $(document).ready(governmentReady);

    function governmentReady(){

        var myForm = $('#govForm');

        /**
         * do nothing if the form is not #coBorrowerForm
         */
        if(myForm.length <= 0) return;


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

        $('input#bo_ck_noinfo').on('change', function(){
            if(true === !!$(this).attr('checked')){
                excludeFields({
                    selector:'.borrower',
                    validationClass:'.cc-to-be-validate-bo'
                }); //// function in main.js
            }
            else{
                includeFields({
                    selector:'.borrower',
                    validationClass:'.cc-to-be-validate-bo'
                }); //// function in main.js
            }
        });

        $('input#co_ck_noinfo').on('change', function(){
            if(true === !!$(this).attr('checked')){
                excludeFields({
                    selector:'.coborrower',
                    validationClass:'.cc-to-be-validate-co'
                }); //// function in main.js
            }
            else{
                includeFields({
                    selector:'.coborrower',
                    validationClass:'.cc-to-be-validate-co'
                }); //// function in main.js
            }
        });


    };//// governmentReady
})();