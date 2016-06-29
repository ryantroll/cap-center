(function(){
    $(document).ready(declarationsReady);

    function declarationsReady(){

        var myForm = $('#declarationsForm');
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


        $('input[name=de_citizen]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'no'){
                $('.cc-to-be-validate-bo').addClass("cc-validate").show();
                $('.resident').slideDown();
            }
            if(true === !!$(this).attr('checked') && val === 'yes'){
                //// check the co-borrower if answer is no so slide up the otherwise so straight hide
                if(false === !!$('input#de_co_citizen_no').attr('checked')){
                    $('.resident').slideUp(function(){
                        $('.cc-to-be-validate-bo').removeClass("cc-validate").hide();
                    });
                }
                else{
                    $('.cc-to-be-validate-bo').removeClass("cc-validate").hide();
                }
            }
        });

        $('input[name=de_co_citizen]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'no'){
                $('.cc-to-be-validate-co').addClass("cc-validate").show();
                $('.resident').slideDown();
                // includeFields({selector:'.resident, .cc-to-be-validate-co', validationClass:'.cc-to-be-validate-co'}); //// function in main.js
            }
            if(true === !!$(this).attr('checked') && val === 'yes'){
                //// check the borrower if answer is no so slide up the otherwise so straight hide
                if(false === !!$('input#de_citizen_no').attr('checked')){
                    $('.resident').slideUp(function(){
                        $('.cc-to-be-validate-co').removeClass("cc-validate").hide();
                    });
                }
                else{
                    $('.cc-to-be-validate-co').removeClass("cc-validate").hide();
                }
            }
        });

        $('input[name=de_bprimary]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                $('.cc-to-be-validate-own-bo').addClass('cc-validate').show();
                $('.ownership').slideDown();
            }
            if(true === !!$(this).attr('checked') && val === 'no'){
                if(false === !!$('input#de_co_bprimary_yes').attr('checked')){
                    $('.ownership').slideUp(function(){
                        $('.cc-to-be-validate-own-bo').removeClass("cc-validate").hide();
                        $('#boProperty').hide().find('.cc-to-be-validate-pro-bo').removeClass("cc-validate");
                        resetFields($('#boProperty, .ownership'));
                    });
                }
                else{
                    $('.cc-to-be-validate-own-bo').removeClass("cc-validate").hide();
                    $('#boProperty').hide().find('.cc-to-be-validate-pro-bo').removeClass("cc-validate");
                    resetFields($('#boProperty, .ownership'));
                }
            }
        });

        $('input[name=de_co_bprimary]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                $('.cc-to-be-validate-own-co').addClass('cc-validate').show();
                $('.ownership').slideDown();
            }
            if(true === !!$(this).attr('checked') && val === 'no'){
                if(false === !!$('input#de_bprimary_yes').attr('checked')){
                    $('.ownership, .property').slideUp(function(){
                        $('.cc-to-be-validate-own-co').removeClass("cc-validate").hide();
                        $('#coProperty').hide().find('.cc-to-be-validate-pro-co').removeClass("cc-validate");
                        resetFields($('#coProperty, .ownership'));
                    });
                }
                else{
                    $('.cc-to-be-validate-own-co').removeClass("cc-validate").hide();
                    $('#coProperty').hide().find('.cc-to-be-validate-pro-co').removeClass("cc-validate");
                    resetFields($('#coProperty, .ownership'));
                }
            }
        });

        $('input[name=de_ownership]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){

                $('#boProperty').show().find('.cc-to-validate-pro-bo').addClass('cc-validate');
                $('.property').slideDown();

            }
            if(true === !!$(this).attr('checked') && val === 'no'){

                if(false === !!$('input#de_co_ownership_yes').attr('checked')){
                    $('.property').slideUp(function(){
                        $('.cc-to-be-validate-pro-bo').removeClass("cc-validate").hide();
                        resetFields($('#boProperty'));

                    });
                }
                else{
                    $('#boProperty').hide().find('.cc-to-be-validate-pro-bo').removeClass("cc-validate");
                    resetFields($('#boProperty'));
                }
            }
        });

        $('input[name=de_co_ownership]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                $('#coProperty').show().find('.cc-to-validate-pro-co').addClass('cc-validate');
                $('.property').slideDown();
            }
            if(true === !!$(this).attr('checked') && val === 'no'){
                if(false === !!$('input#de_ownership_yes').attr('checked')){
                    $('.property').slideUp(function(){
                        $('.cc-to-be-validate-pro-co').removeClass("cc-validate").hide();
                        resetFields($('#coProperty'));
                    });
                }
                else{
                    $('#coProperty').hide().find('.cc-to-be-validate-pro-bo').removeClass("cc-validate");
                    resetFields($('#coProperty'));
                }
            }
        });

    };//// declarationsReady
})();




