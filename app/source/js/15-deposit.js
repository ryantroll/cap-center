(function(){
    $(document).ready(depositReady);

    function depositReady(){

        var myForm = $('#depositForm');

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
         * hold credit card type after detection
         */
        var cardType;


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

        $('input.cardexpiration')
        .on('keydown', restrictDate)
        .on('keyup', formatCardDate);


        /**
         * Credit card form is not required but user enter a value in one filed the form should be validated
         */
        var ccFileds = $('.cc-field.cc-to-be-validate input').on('keyup change', function(ev){
            var include = false;
            ccFileds.each(function(n){
                include = include || $(this).val().length > 0;
                return !include; //// no need to continue .each if include is true
            });

            if(true === include){
                //// cc data should be validate
                myForm.find('.cc-to-be-validate').addClass('cc-validate');
            }
            else{
                //// no field has data, remove validation
                myForm.find('.cc-to-be-validate').removeClass('cc-validate');
                resetFields(myForm);
            }
        });

        /**
         * Detect credit card type on keyup event
         */
        $('input#cc_cardnumber').on('keyup', function(ev){
            var val = $(this).val();
            var type = detectCardType(val);

            if(val.length >3){
                if(true === !!type ){
                    if(type !== cardType){
                        cardType = type;
                        $('.cc-cards li').css('opacity', 0.4);
                        $('.cc-cards .card-'+cardType).css('opacity', 1);
                    }
                }
                else{
                    cardType = undefined;
                    $('.cc-cards li').css('opacity', 1);
                }
            }
        });




    };//// depositReady

    /**
     * [detectCardType will return credit card type based on RegEx test]
     * this function is copied form SackOverflow.com post
     * http://stackoverflow.com/questions/72768/how-do-you-detect-credit-card-type-based-on-number
     */
    function detectCardType(number) {
        var re = {
            visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
            electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
            maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
            dankort: /^(5019)\d+$/,
            interpayment: /^(636)\d+$/,
            unionpay: /^(62|88)\d+$/,
            mastercard: /^5[1-5][0-9]{14}$/,
            amex: /^3[47][0-9]{13}$/,
            diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
            discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            jcb: /^(?:2131|1800|35\d{3})\d{11}$/
        };
        if (re.electron.test(number)) {
            return 'ELECTRON';
        } else if (re.maestro.test(number)) {
            return 'MAESTRO';
        } else if (re.dankort.test(number)) {
            return 'DANKORT';
        } else if (re.interpayment.test(number)) {
            return 'INTERPAYMENT';
        } else if (re.unionpay.test(number)) {
            return 'UNIONPAY';
        } else if (re.visa.test(number)) {
            return 'VISA';
        } else if (re.mastercard.test(number)) {
            return 'MASTERCARD';
        } else if (re.amex.test(number)) {
            return 'AMEX';
        } else if (re.diners.test(number)) {
            return 'DINERS';
        } else if (re.discover.test(number)) {
            return 'DISCOVER';
        } else if (re.jcb.test(number)) {
            return 'JCB';
        } else {
            return undefined;
        }
    }
})();