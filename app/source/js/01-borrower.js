/**
 * These global variables shared with 02-coborrower.js
 * _appGlobal.addressTemplate, _appGlobal.addressIndex;
 */

(function(){
    var loginForm, loginOverlay, appOverlay;
    $(document).ready(borrowerReady);

    function borrowerReady(){

        var myForm = $('#borrowerForm');
        /**
         * do nothing if the form is not #borrowerForm
         */
        if(myForm.length <= 0) return;

        /**
         * [_appGlobal.addressIndex will track the number of address added and stop if total of 4 address]
         * @type {Number}
         */
        _appGlobal.addressIndex = 1;

        _appGlobal.addressTemplate = $('#addressTemplate').html();

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
        myForm.validate(function(isVald, invalidFields){

            if(isVald){

                var isCoBorrower =  String('234').split('').indexOf( $('#bo_applytype').val() ) > -1;

                if(true === isCoBorrower){
                    myForm.attr('action', '02-coborrower.html');
                }

                return false;
            }/// if isValid
            else{

                //// if the form is not valid and continue button is clicked
                //// scroll to the page to first field with error
                if(invalidFields && true === isContinueClicked){

                    var scrollTo = $('#' + invalidFields[0].id).offset().top;

                    //// scroll the form to the first error
                    animateScroll(scrollTo-20, 1);  //// function in main.js

                    isContinueClicked = false;
                }
            } //// if isValid else
            return false;
        });

        /**
         * Continue Click
         */
        $('#continue').on('mousedown touchstart', function(e){
            console.log("sll")
            isContinueClicked = true;
        });


        /**
         * Field formating while typing
         * event handlers are in main.js
         */

        $('input.phone')
        .on('keydown', restrictPhone)
        .on('keyup', formatPhone)

        $('input.date')
        .on('keydown', restrictDate)
        .on('keyup', formatDate);

        $('input.numbers')
        .on('keydown', restrictNumbers)

        $('input.ssn')
        .on('keydown', restrictSSN)
        .on('keyup', formatSSN);

        $('input.currency')
        .on('keydown', restrictCurrency)
        .on('keyup', formatCurrency)



        $('#bo_howhear').off('change').on('change', function(e){
            var val = parseInt($(this).val(),10);
            var arr = [2,3,4,5];
            if(arr.indexOf(val) > -1){
                $('#referralField').slideDown().find('.cc-field').addClass('cc-validate');
            }
            else{
                $('#referralField').slideUp().find('.cc-field').removeClass('cc-validate')
            }
        })

        /**
         * check for address length change
         */
        checkAddressLength(myForm, _appGlobal.addressIndex); //// function in main.js

        /**
         * Check number of dependents change and show ages fields
         */
        $('#bo_dependants').on('change', function(e){

            var v = parseInt($(this).val(), 10);
            var agesDiv = $('#dependentSection');
            var cols = agesDiv.find('.col-xs-6').hide();

            if(v > 0){
                for(var x=0; x<v; x++){
                    cols.eq(x).show();
                }
                agesDiv.slideDown().find('.cc-field').addClass('cc-validate');
            }
            else{
                agesDiv.slideUp().find('.cc-field').removeClass('cc-validate error correct');
            }
        });

        /**
         * Check change of radio button current address own/rent
         */
        $('input[name=bo_currently]').on('change', function(){
            var val = $(this).val();
            var rentCol = $('#monthlyRent');
            var container = rentCol.find('.cc-field').eq(0);
            if(val.toLowerCase() === 'rent'){
                rentCol.removeClass('hidden');
                container.removeClass('cc-to-be-validate').addClass('cc-validate');
            }
            else{
                rentCol.addClass('hidden');
                container
                .removeClass('cc-validate message error')
                .addClass('cc-to-be-validate')
                .find('#errorMsg').remove();
            }
        });

        var eventName = $.browser.safari=== true ? 'blur' : 'change'; //// change is not fired when autofill is used on safari
        $('#bo_email').on(eventName, function(){
            /**
             * make sure email field is validate before doing any check
             * id #emailField is given to .cc-field container of email field
             */
            $('#emailField').validateField();

            var val = $.trim($(this).val());
            var isValid = $(this).data('isValid');

            if(val && true === isValid){
                $.ajax({
                    url:_appGlobal.urlEmailExistsAPI,
                    data:{email:val},
                    method:"post",
                    dataType:"json",
                    error:function(err){
                        console.log(err);
                        updateLoginSection(false);
                    },
                    success:function(ret){
                        if(ret.email.toLowerCase() == val.toLowerCase() && ret.exists === true){
                            updateLoginSection(ret.exists);
                        }
                        else{
                            updateLoginSection(false);
                        }
                    }
                });
            }/// if val
            else{
                updateLoginSection(false);
            }//// not val

        });

        /**
         * Add address type ahead functionality to address
         */
        addAutoAddress(1);


        /**
         * Login Form
         */
        loginForm = $("#loginForm");
        loginOverlay = $("#loginOverlay");
        $('#loginForm').validate(function(isValid, invalidFields){
            if(true === isValid){
                /**
                 * Login form is valid do ajax call to authentication
                 */
                var data = {};

                data.email = $.trim($("#login_email").val());
                data.password = $.trim($("#login_password").val());
                var msg = loginOverlay.addClass("busy").find('.error-message').hide();
                msg.text(msg.attr('data-default'));
                $("#login_password").val('');

                $.ajax({
                    url:_appGlobal.urlAuthenticationAPI,
                    data:data,
                    method:"post",
                    dataType:"json",
                    error:function(err){
                        console.log(err);
                        loginOverlay.removeClass('busy').find('.error-message').slideDown();
                    },
                    success:function(ret){
                        if(
                            true === ret.success
                            && ret.email.toLowerCase() === data.email.toLowerCase()
                        ){
                            _appGlobal.overlay.closeOverlay();
                            hideLoginForm();

                            showApplicationsList();
                        }
                        else{
                            loginOverlay.removeClass('busy').find('.error-message').text(ret.message).slideDown();
                        }
                    }
                });
            }
            return false;
        }); //// no callback is required

        $('#loginSkipBtn').on('click', function(e){
            excludeFields({selector:'#loginSection', validationClass:'.cc-to-be-validate'});
        });

        $('#loginBtn').on('click', function(e){

            $('#login_email').val( $('#bo_email').val() );

            overlay({
                selector:'#loginOverlay',
                onBeforeLoad:function(){
                    //// nothing
                },
                onBeforeClose:function(){
                    hideLoginForm();
                }
            });
        });

        // appOverlay = $('#appsList');


        // showApplicationsList();
    };//// borrowerReady

    function updateLoginSection(emailExists){
        if(true === emailExists) {
            includeFields({selector:'#loginSection', validationClass:'.cc-to-be-validate'}); //// function in main.js
        }
        else{
            excludeFields({selector:'#loginSection', validationClass:'.cc-to-be-validate'}); //// function in main.js
        }
    }///// fun. updateLoginSection

    function hideLoginForm(){
        resetFields(loginForm); /// resetFields in main.js
        loginOverlay.removeClass('busy').find('.error-message').hide();
    }//// fun. hideLoginForm



})();



function checkAddressLength(container, index){
    var post = index > 1 ? ''+index : '';

    container.find('.addressLengthM' + post).eq(0)
    .attr('data-address', index)
    .on('change', function(e){
        var v = parseInt($(this).val(), 10);

        var years = parseInt($('.addressLengthY' + post).eq(0).val(), 10);
        var myId = parseInt($(this).attr('data-address'), 10);
        if(!v) v =0;
        if(!years){
            years = 0;
            $('.addressLengthY' + post).eq(0).val(0)
        }

        if(years){
            v += years * 12;
        }
        if(v < 24){
            addAddress(myId+1);
        }
        else{
            removeAddress(myId+1);
        }
    });


    container.find('.addressLengthY' + post).eq(0)
    .attr('data-address', index)
    .on('change', function(e){
        var v = parseInt($('.addressLengthM' + post).eq(0).val(), 10);
        var years = parseInt($(this).val(), 10);
        var myId = parseInt($(this).attr('data-address'), 10);

        if(!v) {
            v =0;
            $('.addressLengthM' + post).eq(0).val(0)
        }
        if(!years) years = 0;

        if(years){
            v += years * 12;
        }

        if(v < 24){
            addAddress(myId+1);
        }
        else{
            removeAddress(myId+1);
        }
    })
}///// fun. checkAddressLength

function addAddress(nextId){
    if(nextId >= 5) return false;
    if(_appGlobal.addressIndex >= nextId) return false;

    var section = $('#preAddress');
    _appGlobal.addressIndex = nextId;
    var address = $(_appGlobal.addressTemplate.replace(/(\{\#\})/g, _appGlobal.addressIndex));

    address.find('.cc-field.cc-to-be-validate').addClass('cc-validate');
    fillStateDropdown( address.find('.state-dropdown') ); //// fun. in main.js

    address.find('input.numbers').on('keydown', restrictNumbers);

    checkAddressLength(address, _appGlobal.addressIndex);

    section.append(address);
    addAutoAddress(_appGlobal.addressIndex);

    updateTabIndex( $('.cc-form')); //// function in main.js
    section.slideDown();
}

function removeAddress(idRemove){

    if(idRemove <=1) return false;
    if(idRemove > _appGlobal.addressIndex) return false;

    var section = $('#preAddress');
    for(var x = idRemove; x<=_appGlobal.addressIndex; x++){
        var address = section.find('#address_' + x);

        address.find('.cc-field').removeClass('cc-validate error correct');
        address.remove();
        updateTabIndex( $('.cc-form')); //// function in main.js
    }
    _appGlobal.addressIndex = idRemove-1;
    if(_appGlobal.addressIndex <= 1) section.slideUp()
}

