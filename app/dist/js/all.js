var usStates = [
      {
          "name": "Alabama",
          "abbreviation": "AL"
      },
      {
          "name": "Alaska",
          "abbreviation": "AK"
      },
      {
          "name": "American Samoa",
          "abbreviation": "AS"
      },
      {
          "name": "Arizona",
          "abbreviation": "AZ"
      },
      {
          "name": "Arkansas",
          "abbreviation": "AR"
      },
      {
          "name": "California",
          "abbreviation": "CA"
      },
      {
          "name": "Colorado",
          "abbreviation": "CO"
      },
      {
          "name": "Connecticut",
          "abbreviation": "CT"
      },
      {
          "name": "Delaware",
          "abbreviation": "DE"
      },
      {
          "name": "District Of Columbia",
          "abbreviation": "DC"
      },
      {
          "name": "Federated States Of Micronesia",
          "abbreviation": "FM"
      },
      {
          "name": "Florida",
          "abbreviation": "FL"
      },
      {
          "name": "Georgia",
          "abbreviation": "GA"
      },
      {
          "name": "Guam",
          "abbreviation": "GU"
      },
      {
          "name": "Hawaii",
          "abbreviation": "HI"
      },
      {
          "name": "Idaho",
          "abbreviation": "ID"
      },
      {
          "name": "Illinois",
          "abbreviation": "IL"
      },
      {
          "name": "Indiana",
          "abbreviation": "IN"
      },
      {
          "name": "Iowa",
          "abbreviation": "IA"
      },
      {
          "name": "Kansas",
          "abbreviation": "KS"
      },
      {
          "name": "Kentucky",
          "abbreviation": "KY"
      },
      {
          "name": "Louisiana",
          "abbreviation": "LA"
      },
      {
          "name": "Maine",
          "abbreviation": "ME"
      },
      {
          "name": "Marshall Islands",
          "abbreviation": "MH"
      },
      {
          "name": "Maryland",
          "abbreviation": "MD"
      },
      {
          "name": "Massachusetts",
          "abbreviation": "MA"
      },
      {
          "name": "Michigan",
          "abbreviation": "MI"
      },
      {
          "name": "Minnesota",
          "abbreviation": "MN"
      },
      {
          "name": "Mississippi",
          "abbreviation": "MS"
      },
      {
          "name": "Missouri",
          "abbreviation": "MO"
      },
      {
          "name": "Montana",
          "abbreviation": "MT"
      },
      {
          "name": "Nebraska",
          "abbreviation": "NE"
      },
      {
          "name": "Nevada",
          "abbreviation": "NV"
      },
      {
          "name": "New Hampshire",
          "abbreviation": "NH"
      },
      {
          "name": "New Jersey",
          "abbreviation": "NJ"
      },
      {
          "name": "New Mexico",
          "abbreviation": "NM"
      },
      {
          "name": "New York",
          "abbreviation": "NY"
      },
      {
          "name": "North Carolina",
          "abbreviation": "NC"
      },
      {
          "name": "North Dakota",
          "abbreviation": "ND"
      },
      {
          "name": "Northern Mariana Islands",
          "abbreviation": "MP"
      },
      {
          "name": "Ohio",
          "abbreviation": "OH"
      },
      {
          "name": "Oklahoma",
          "abbreviation": "OK"
      },
      {
          "name": "Oregon",
          "abbreviation": "OR"
      },
      {
          "name": "Palau",
          "abbreviation": "PW"
      },
      {
          "name": "Pennsylvania",
          "abbreviation": "PA"
      },
      {
          "name": "Puerto Rico",
          "abbreviation": "PR"
      },
      {
          "name": "Rhode Island",
          "abbreviation": "RI"
      },
      {
          "name": "South Carolina",
          "abbreviation": "SC"
      },
      {
          "name": "South Dakota",
          "abbreviation": "SD"
      },
      {
          "name": "Tennessee",
          "abbreviation": "TN"
      },
      {
          "name": "Texas",
          "abbreviation": "TX"
      },
      {
          "name": "Utah",
          "abbreviation": "UT"
      },
      {
          "name": "Vermont",
          "abbreviation": "VT"
      },
      {
          "name": "Virgin Islands",
          "abbreviation": "VI"
      },
      {
          "name": "Virginia",
          "abbreviation": "VA"
      },
      {
          "name": "Washington",
          "abbreviation": "WA"
      },
      {
          "name": "West Virginia",
          "abbreviation": "WV"
      },
      {
          "name": "Wisconsin",
          "abbreviation": "WI"
      },
      {
          "name": "Wyoming",
          "abbreviation": "WY"
      }
  ];
(function( $ ) {
    $.fn.validate = function(callback) {
        var form = this.filter('form');
        var invalidFields = [];

        form.off('submit').on('submit', function(e){
            var isFormValid = true;
            invalidFields = [];

            form.find('.cc-field.cc-validate').each(function(n){
                var self = $(this);
                // if(e.preventDefault) e.preventDefault(); else e.returnValue = false;

                var isValid = self.validateField();


                //// false and true strictly test as null will returned is field is not validated
                if(false === isValid){
                    isFormValid = isFormValid && false;
                    var field = self.find('input[type="text"], input[type="password"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="radio"], input[type="checkbox"], input[type="hidden"], select, textarea');
                    var label = self.find('label').eq(0);
                    var err = field.data('err');
                    var fErr = {filed:label.text(), id:field.attr('id'), error:err};
                    invalidFields.push(fErr)
                }
            }); /// .each


            /**
             * capture the callback function return if it exists
             * @type {Boolean}
             */
            var extra = true;
            if('function' === typeof callback){
                extra = callback(isFormValid, invalidFields.length > 0 ? invalidFields : null);
            }
            isFormValid = isFormValid && !!extra;


            if(true !== isFormValid){
                if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            }

            return true;
        });//// .on submit
        return this;
    };

    var getMyContainer = function(field){
        var p = field.parent();
        if(true === p.hasClass('cc-field')){
            return p;
        }
        else{
            return getMyContainer(p);
        }
    }//// fun. getMyContainer


    var fieldChangedAfterError = function(e){
        var container = getMyContainer($(this));
        container.validateField()
    }

    $.fn.validateField = function(self){
        var self = this;
        var f = self.find('input[type="text"], input[type="password"], input[type="password"],  input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="radio"], input[type="checkbox"], input[type="hidden"], select, textarea');
        var v = $.trim(f.val());
        var err = f.data('err');
        var type = f.attr('type');

        if(!err) err = {};

        var isValid = true;
        var isValidated = false;

        if(true === self.hasClass('cc-required')){
            isValidated = true;

            //// handle radio button case
            if(type && (type.toLowerCase() === 'radio') ){
                var name = f.attr('name');
                var radios = self.find("input[name="+name+"]");
                radios.each(function(r){
                    isValid = !!radios.eq(r).attr('checked');
                    ///// break .each of on radio button found checked
                    if(true === isValid) return false;
                })
                f = radios;
            }
            else if(type && type.toLowerCase() === 'checkbox'){
                if(f.length > 0){
                    f.each(function(r){
                        isValid = !!f.eq(r).attr('checked');
                        ///// break .each of on radio button found checked
                        if(true === isValid) return false;
                    });
                }//// if Length
            }
            else{
                if(v.length < 1){
                    isValid = false;
                }
            }//// if type radio else

            if(true !== isValid){
                var msg = self.find('.message.cc-required');

                if(msg.length > 0){
                    err['cc-required'] = msg.eq(0).text();
                }
            } /// if v.length
            else{

                delete err['cc-required'];
            }
        } //// if cc-required

        if(true === self.hasClass('cc-number') && v){
            isValidated = true;
            var regx = /^(\d)+(\.\d+)?$/;
            if(!regx.test(v)){
                isValid = false;
                var msg = self.find('.message.cc-number');
                if(msg.length > 0){
                    err['cc-number'] = msg.eq(0).text();
                }
            }
            else{
                delete err['cc-number'];
            }
        }
        else{
            delete err['cc-number'];
        }

        if(true === self.hasClass('cc-email') && v){
            isValidated = true;
            var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!regx.test(v)){
                isValid = false;
                var msg = self.find('.message.cc-email');
                if(msg.length > 0){
                    err['cc-email'] = msg.eq(0).text();
                }
            }
            else{
                delete err['cc-email'];
            }
        }
        else{
            delete err['cc-email'];
        }

        if(true === self.hasClass('cc-date')){

            if(v.length > 0){
                isValidated = true;
                var regx = /^\d{2}\/\d{2}\/\d{4}$/;
                var split = v.split('/');
                var m = split[0] ? Number(split[0]) : null;
                var d = split[1] ? Number(split[1]) : null;
                var y = split[2] ? Number(split[2]) : null;
                var m31 = [1, 3, 5, 7, 8, 10, 12];
                if(!regx.test(v)){
                    isValid = false;
                }
                if(!m || m > 12 || m < 1){
                    isValid = false;
                }
                if(m31.indexOf(m) >=0 ){
                    if(!d || d > 31 || d < 1){
                        isValid = false;
                    }
                }
                else{
                    if(!d || d > 30 || d < 1){
                        isValid = false;
                    }
                }
                if(m == 2){
                    var _d = y % 4 == 0 ? 29 : 28;
                    if(!d || d > _d || d < 1){
                        isValid = false;
                    }
                }

                if(!isValid){
                    var msg = self.find('.message.cc-date');

                    if(msg.length > 0){
                        err['cc-date'] = msg.eq(0).text();
                    }

                }
                else{
                    delete err['cc-date'];
                }
            }//// if v
            else{
               delete err['cc-date'];
            }
        }//// if hasClass cc-date
        // else{
        //     delete err['cc-date'];
        // }


        if(true === self.hasClass('cc-date cc-date-gt')){
            var gtField = $('#'+self.attr('data-date-gt'));
            var gtVal, startDate, endDate;
            if(v.length === 10){
                var dateSplit = v.split('/');
                endDate = new Date(Number(dateSplit[2]), Number(dateSplit[0])-1, Number(dateSplit[1]));
            }
            else{
                endDate = new Date();
            }

            if(gtField.length > 0){
                if(gtField.val().length === 10){
                    var dateSplit = gtField.val().split('/');
                    startDate = new Date(Number(dateSplit[2]), Number(dateSplit[0])-1, Number(dateSplit[1]));
                }

                if(endDate < startDate){
                    isValid = false;
                }
            }//// if gtField.length > 0

            if(!isValid){
                var msg = self.find('.message.cc-date-gt');

                if(msg.length > 0){
                    err['cc-date-gt'] = msg.eq(0).text();
                }
            }
            else{
                delete err['cc-date-gt'];
            }
        }//// hasClass cc-date-gt

        if(true === self.hasClass('cc-card-expiration')){

            if(v.length > 0){
                isValidated = true;
                var regx = /^\d{2}\/\d{4}$/;
                var split = v.split('/');
                var m = split[0] ? Number(split[0]) : null;
                var d = 1;
                var y = split[1] ? Number(split[1]) : null;
                var now = new Date();
                var date = null

                if(!regx.test(v)){
                    isValid = false;
                }
                else{
                    date = new Date(y, m-1, d);
                }

                if(!m || m > 12 || m < 1){
                    isValid = false;
                }

                if(null !== date && date <= now ){
                    isValid = false;
                }


                if(!isValid){
                    var msg = self.find('.message.cc-card-expiration');

                    if(msg.length > 0){
                        err['cc-card-expiration'] = msg.eq(0).text();
                    }

                }
                else{
                    delete err['cc-card-expiration'];
                }
            }//// if v
            else{
               delete err['cc-card-expiration'];
            }
        }

        if(true === self.hasClass('cc-phone')){
            if(v.length > 0){
                isValidated = true;
                var regx = /^\(\d{3}\)( )?\d{3}\-\d{4}$/;
                if(!regx.test(v)){
                    isValid = false;
                    var msg = self.find('.message.cc-phone');
                    if(msg.length > 0){
                        err['cc-phone'] = msg.eq(0).text();
                    }
                }
                else{
                    delete err['cc-phone'];
                }
            }
            else{

                delete err['cc-phone'];
            }
        }

        if(true === self.hasClass('cc-currency')){
            if(v){
                isValidated = true;
                var regx = /^\$?(\d{1,3})+(\,*\d{3})*$/;
                if(!regx.test(v)){
                    isValid = false;
                    var msg = self.find('.message.cc-currency');
                    if(msg.length > 0){
                        err['cc-currency'] = msg.eq(0).text();
                    }
                }
                else{
                    delete err['cc-currency'];
                }
            }
            else{
                delete err['cc-currency'];
            }
        }

        if(true === self.hasClass('cc-ssn')){
            if(v){
                isValidated = true;
                var regx = /^\d{3}(\-)?\d{2}(\-)?\d{4}$/;
                if(!regx.test(v)){
                    isValid = false;
                    var msg = self.find('.message.cc-ssn');
                    if(msg.length > 0){
                        err['cc-ssn'] = msg.eq(0).text();
                    }
                }
                else{
                    delete err['cc-ssn'];
                }
            }
            else{

                delete err['cc-ssn'];
            }
        }

        if(true === self.hasClass('cc-required-one-of')){
            var fields = $('.'+self.attr('data-one-of-class') + ' input');

            var _isValid = false; //// local isValid var will be && with isValid
            fields.each(function(x){
                _isValid = _isValid || !!$(this).val();
                if(true === _isValid) return false;//// stop each if one filed is found
            });

            isValid = isValid && _isValid;

            if(!isValid){
                var msg = self.find('.message.cc-required-one-of');

                if(msg.length > 0){
                    err['cc-required-one-of'] = msg.eq(0).text();
                }
            }
            else{
                delete err['cc-required-one-of'];

                fields.each(function(x){
                    // var _err = $(this).data('err');
                    // delete _err['cc-required-one-of'];
                    // $(this).data('err', _err);

                    $(this).removeError('cc-required-one-of').hideError().showError();
                });
            }
        }//// hasClass cc-required-one-of

        //// reset the field errors before adding them again
        self.removeClass('error correct message').find('#errorMsg').remove();

        f.data('err', err);
        f.data('isValid', isValid);

        //// if field passed through validation show error if any
        // if(true === isValidated ){
        // if(Object.keys(err).length > 0){

            if(false == isValid || Object.keys(err).length > 0){

                f.showError();

                return false;
            }
            else if(true === isValid){
                f.hideError();

                return true;
            }

        // }//// if isValidated

    }//// fun. validateFild

    $.fn.showError = function(){
        var f = this.filter('input, textarea, select');
        var container = getMyContainer(f);
        var type = f.attr('type');

        var err = f.data('err');
        var isValid = f.data('isValid');

        var str = [];
        for(var e in err){
            str.push(err[e]);
        }

        container.removeClass('error').find('#errorMsg').remove();

        f.off('keyup change', fieldChangedAfterError);

        if(true !== isValid){
            container.addClass('error');
            f.off('keyup change', fieldChangedAfterError).on('keyup change', fieldChangedAfterError)
        }


        if(str.length > 0 ){
            container.addClass('error');
            var msg = $('<div class="message" id="errorMsg"><i class="icon-error glyphicon glyphicon-remove-sign"></i> ' + str.join(' | ') + '</div>').show();
            container.append(msg);
            container.addClass('message');
        }

        return this;
    }//// fun. showError

    $.fn.hideError = function(){
        var f = this.filter('input, select, textarea').eq(0);

        var container = getMyContainer(f);

        // container.addClass('correct');
        container.removeClass('error message');

        container.find('#errorMsg').remove();

        return this;
    }

    $.fn.addError = function(errorClass) {
        var field = this.filter('input, textarea, select');
        if(field.length < 1) return this;
        var container = getMyContainer(field);

        var msg = container.find('.message.'+errorClass).eq(0).text();
        var err = field.data('err');
        if(!err) err = {};

        err[errorClass] = msg;

        field.data('err', err);
        field.data('isValid', false);
        return this;
    }

    $.fn.removeError = function(errorClass) {

        var field = this.filter('input, textarea, select');
        if(field.length < 1) return this;
        var err = field.data('err');
        if(!err) return this;

        delete err[errorClass];
        field.data('err', err);
        if(Object.keys(err).length > 0){
            field.data('isValid', false);
        }
        else{
            field.data('isValid', true)
        }
        return this;
    }


}( jQuery ));
(function( $ ) {
    var panle, popup, btn, questions, activeQuestion, fields;
    var helloMessage;

    $.fn.ccSupport = function() {
        var self = this.find('.cc-support');


        if(self.length < 1) return;

        panel = self.find('.cc-support-panel').eq(0);
        popup = self.find('.cc-support-popup').eq(0);
        btn = self.find('.btn').eq(0);
        questions = panel.find('.cc-support-questions li');
        activeQuestion = null;

        fields = {};

        helloMessage = self.find('.message.hello').text();

        questions.each(function(x){
            var id = $(this).attr('for');
            if(true === !!id){
                var obj = {index:x, q:$(this).find('a').eq(0).text()};
                fields[id] = obj;
            }
        });



        var togglePanel = function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            if(panel.hasClass('expanded')){
                panel.removeClass('expanded');

                questions.filter('.expanded').removeClass('expanded')
                    .find('i').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-bottom');

                setTimeout(function(){
                    btn.removeClass('out')
                }, 300)
            }//// if hasCalss
            else{
                btn.addClass('out');
                /**
                 * hide the popup if its visible
                 */
                if(popup.hasClass('visible')){
                    popup.removeClass('visible');
                }
                setTimeout(function(){
                    panel.addClass('expanded');

                    /**
                     * Expand question when panel is opened if the activeQustion is
                     * been set with field focus event
                     */
                    if(null !== activeQuestion){
                        questions.eq(activeQuestion).find('a').trigger('click');
                        activeQuestion = null;
                    }


                }, 300); /// setTimeout
                //
            }/// if hasClass else
        }//// fun. togglePanel

        var toggleQuestion = function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            var parent = $(this).parent();
            var i = parent.find('i');

            if(parent.hasClass('expanded')){
                parent.removeClass('expanded');
                i.addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-bottom');
                return;
            }
            questions.filter('.expanded').removeClass('expanded')
                .find('i').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-bottom');

            parent.addClass('expanded');
            i.addClass('glyphicon-triangle-bottom').removeClass('glyphicon-triangle-right');

        }//// fun. toggleQuestion

        /**
         * Focus Event handler for fields to show helper message
         */
        var showPopup = function(e){
            var id = $(this).attr('id');

            if(id in fields){
                popup.addClass('visible').text(fields[id].q);
                activeQuestion = fields[id].index;
            }
        }//// fun.showPopup

        var hidePopup = function(e){
            popup.removeClass('visible').text('');
        }//// fun.showPopup


        /**
         * Panel close button
         */
        panel.find('a.close').on('click', togglePanel);

        /**
         * ? button behavior
         */
        btn.on('click', togglePanel)
        .on('mouseover', function(e){
            if(true === !!helloMessage){
                $(this).showSupportMessage(helloMessage);
            }
        });

        /**
         * popup behavior
         */
        popup.on('click', togglePanel);

        /**
         * inside panel question click behavior
         */
        panel.find('.cc-support-questions li a').on('click', toggleQuestion);

        /**
         * Set focus event for fields to show the right question as popup
         * if there a question related to this field
         */
        // $('input, select, textarea').on('blur', hidePopup).on('focus', showPopup);

        setTimeout(function(){
            btn.removeClass('out');
        }, 3*1000);

        return this;
    };//// $.fn function

    $.fn.showSupportMessage = function(message) {
        if(false === !!popup) return this;

        var inte;
        var beforeHide = function(){
            clearInterval(inte);
            inte = setTimeout(hideMessage, 200);
        }
        var hideMessage = function(){
            popup.removeClass('visible');
        }
        var stopHide = function(){
            clearInterval(inte);
        }

        btn.off('mouseout', beforeHide).on('mouseout', beforeHide);
        popup.off('mouseout', beforeHide).on('mouseout', beforeHide);
        popup.off('mouseover', stopHide).on('mouseover', stopHide);

        popup.text(message).addClass('visible');

        return this;
    }
}( jQuery ));
/**
 * [_appGlobal Namespace for global variables]
 * this will define a protect name space for global variable to prvent any conflect with local variables
 */
var _appGlobal = {};
jQuery(document).ready(ccDocumentReady);

function ccDocumentReady(){

    /**
     * Progress navigation mobile behavior
     */
    $('#progress_switch').on('click', function(ev){
        var self = $(this);
        var progressNav = $('#progress_nav');
        var handlePorgresNavClick = function (e) {
            if (true === progressNav.hasClass('expanded')) {
                progressNav.removeClass('expanded');
                self.width('100%');
                //// unbind when menu closed no need to check for click
                $('body').unbind('click', handlePorgresNavClick);
            }
            else {
                progressNav.addClass('expanded');
                self.width(40); // changing the width to make the first button of progress bar clickable
            }
        };
        /**
         * the event will bubble up to body so do the work on body click \ only if menu is closed
         * this to make sure the menu is closed when click outside the menu
         */
        if (false === progressNav.hasClass('expanded')) {

            $('body').bind('click', handlePorgresNavClick);
        }
    });

    /**
     * Hamburger menu button mobile behavior
     */
    $('#menu_switch').on('click', function(ev){
        var self = $(this);
        var menuNav = $('#menu_nav');
        var handleMenuNavClick = function (e) {
            if (true === menuNav.hasClass('expanded')) {
                menuNav.removeClass('expanded');
                self.removeClass('expanded');
                //// unbind when menu closed no need to check for click
                $('body').unbind('click', handleMenuNavClick);
            }
            else {
                menuNav.addClass('expanded');
                self.addClass('expanded');

            }
        };

        if (false === menuNav.hasClass('expanded')) {
            $('body').bind('click', handleMenuNavClick);
        }
    });

    /**
     * Add scrolling event listener to make the progress bar sticky
     */
    // if($('body').width() < 678){
        $(window).off('scroll').on('scroll', mainScroll);
    // }

    /**
     * Populate the states drop-downs
     */
     fillStateDropdown( $('.state-dropdown') );


     /**
      * Start Support
      */
     $(document).ccSupport();


    /**
     * Float label behavior
     */
    $('.cc-field.float').each(function(x){
        var self = $(this);
        var field = self.find('input[type=text]').eq(0);

        var triggerEvent = 'keyup';
        if(true === self.hasClass('cc-dropdown')){
            triggerEvent = 'change';
        }

        field.on(triggerEvent, function(e){
            if(field.val()){
                self.addClass('edited');
            }
            else{
                self.removeClass('edited');
            }
        })
    });/// .each

    /**
     * Message behavior
     */
    $('.jsCollapse').each(function(x){
        var self = $(this);
        self.find('a.close, a.dismiss').on('click', function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            self.slideUp('fast', function(){
                self.remove();
            });
        })
    });//// .each

    /**
     * Set yes/no radio button
     */
    yesNoRadio();

    /**
     * Set multi checkbox
     */
    multiCheckbox();

    /**
     * Set arrow label behavior for <select>
     */
    dropdownLabel();


    /**
     * Back button click handlers
     */
    $('#back').on('click', function(ev){
        if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;
        history.back();
    });



}//// fun. ccDocumentReady

function mainScroll(e){
    if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
    if($('body').width() > 678) return;

    var s = $(window).scrollTop();
    var bar = $('#progress_nav');
    if(s > 200){
        if(false === bar.hasClass('float')){
            bar.addClass('float');
            bar.parent().css('padding-bottom', bar.height())
        }
    }
    else{
        bar.removeClass('float');
        bar.parent().css('padding-bottom', null)
    }

}//// fun. mainScroll


function updateTabIndex(selector){
  var x = 0;
    selector.find('.cc-field').each(function(i){
        var s = $(this).find('input[type=text], input[type=email], input[type=date], input[type=tel], input[type=radio], input[type=checkbox], input[type=number], textarea, select')
        s.each(function(z){
          $(this).attr('tabindex', x+1);
          x++;
        })
    })
}//// fun. updateTabIndex

/**
 * [yesNoRadio Will set the behavior of yes/no radio buttons by adding .checked class to the label of the button]
 * the function assume the input[type=radion] is included inside <label> tag
 */
function yesNoRadio(container){
  //// if container is passed find the radios inside it or do a document global find
  var radios = !!container ? container.find('.radio-yesno input[type=radio]') : $('.radio-yesno input[type=radio]');
  radios.on('change', function(e){
    if($(this).attr('checked')){
      $(this).parent().parent().find('label.checked').removeClass('checked');
      $(this).parent().addClass('checked').removeClass('focus');
    }
    else{
      $(this).parent().removeClass('checked');
    }
  })
  .on('focus', function(e){
    $(this).parent().addClass('focus');
  })
  .on('blur killfocus', function(e){
    $(this).parent().removeClass('focus');
  });

  /**
   * Trigger change to set the right appearance when form is pre-loaded with data
   */
  radios.trigger('change');//// this to set the initial state
}

function multiCheckbox(){
  var radios = $('.cc-checkbox input[type=checkbox]').on('change', function(e){
    if($(this).attr('checked')){
      // $(this).parent().parent().find('label.checked').removeClass('checked');
      $(this).parent().addClass('checked').removeClass('focus');
      $(this).parent().find('i').addClass('glyphicon glyphicon-ok');
    }
    else{
      $(this).parent().removeClass('checked');
      $(this).parent().find('i').removeClass();
    }
  });
  /**
   * Trigger change to set the right appearance when form is pre-loaded with data
   */
  radios.trigger('change');
}//// fun. multiCheckBox

/**
 * [dropdownLabel Set the click event for arrow label for <select> element]
 * this solution works only safari and chrome due to browser limitation
 */
function dropdownLabel(container){
  var labels = container ? container.find('.cc-dropdown label.arrow') : $('.cc-dropdown label.arrow');
  labels.on('click', function(){
      var id = $(this).attr('for');
      if(false === !!id) return;
      var field = document.getElementById(id);
      var event = new MouseEvent('mousedown');
      field.dispatchEvent(event);
    })
}//// fun. dropdownLabel

/**
 * [fillStateDropdown will fill the dropdon of USA states form usState variable]
 * @param  {[type]} selector [jQuery object that contain <select> tag to be filled]
 * usSate is array of object defined in us-status.js file
 */
function fillStateDropdown(selector){
    selector.each(function(x){
        var ul = $(this).find('select');
        for(var s=0; s<usStates.length; s++){
            var li = $('<option value="' + usStates[s].abbreviation + '">' + usStates[s].name + '</option>');
            ul.append(li);
        }//// for
    });
}//// fun. fillStateDropdown

/**
 * [isAndroid simple function to detect Android OS]
 * this function is used to detect the bug in Android when keydown, keyup event doesn't send the right key code
 * @return {Boolean} [true if Android OS]
 */
var isAndroid = function(){
  return /(android)/i.test(navigator.userAgent);
}//// fun. isAndroid


var restrictPhone = function(keyEv){
  var code = keyEv.keyCode || keyEv.which || keyEv.charCode;
  var char = String.fromCharCode(code);
  if(isAndroid() && code == 229) return;

  var allowedChars = String("01234567890-() ").split('');
  var allowed = [189, 48, 57, 9, 91, 8, 37, 38, 39, 40, 13, 16, 17, 18, 93, 20];
  $(this).removeError('cc-numbers-only')

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only');
    $(this).showError();
    return false;
  }
}

var formatPhone = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var allowed = [191, 9, 8, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;

  var val = $(this).val();
  var rawValue = val.split(/[\(|\)| |\-|\+|\.]/).join('');
  var formated = '';
  if(rawValue.length >= 3){
    formated += '(' + rawValue.slice(0,3) + ') ';
    rawValue = rawValue.slice(3);
  }
  if(rawValue.length >= 3){
    formated += rawValue.slice(0,3) + '-';
    rawValue = rawValue.slice(3);
  }
  formated += rawValue;

  $(this).val(formated);
}//// fun. formatPhone

var restrictDate = function(keyEv){
  var code = keyEv.keyCode || keyEv.which || keyEv.charCode;
  var char = String.fromCharCode(code);
  if(isAndroid() && code == 229) return;

  var allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/']
  var allowed = [191, 9, 91, 8, 37, 38, 39, 40, 13, 16, 17, 18, 93, 20];
  $(this).removeError('cc-numbers-only')

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only');
    $(this).showError();
    return false;
  }
}//// fun. formateDate

var formatDate = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var allowed = [191, 9, 8, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;


  var val = $(this).val();

  var ret = '';
  var raw = val.replace(/\//g, '');

  if(raw.length >= 2){
    ret += raw.slice(0, 2) + '/';
    raw = raw.slice(2);

    if(raw.length >= 2){
      ret += raw.slice(0, 2) + '/';
      raw = raw.slice(2);
    }
  }

  ret += raw;
  $(this).val(ret);
}//// fun. formateDate

var formatCardDate = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var allowed = [191, 9, 8, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;


  var val = $(this).val();

  var ret = '';
  var raw = val.replace(/\//g, '');

  if(raw.length >= 2){
    ret += raw.slice(0, 2) + '/';
    raw = raw.slice(2);

    // if(raw.length >= 2){
    //   ret += raw.slice(0, 2) + '/';
    //   raw = raw.slice(2);
    // }
  }

  ret += raw;
  $(this).val(ret);
}//// fun. formatCardDate

var restrictSSN = function(keyEv){
  var code = keyEv.keyCode || keyEv.which || keyEv.charCode;
  var char = String.fromCharCode(code);
  if(isAndroid() && code == 229) return;
  var allowedChars = String("01234567890-").split('');
  var allowed = [189, 9, 91, 8, 37, 38, 39, 40, 13, 16, 17, 18, 93, 20];
  $(this).removeError('cc-numbers-only');

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only');
    $(this).showError();
    return false;
  }
}//// fun. formateSSN

var formatSSN = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var allowed = [191, 9, 8, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;

  var val = $(this).val();
  var ret = '';
  var raw = val.replace(/\-/g, '');

  if(raw.length >= 3){
    ret += raw.slice(0, 3) + '-';
    raw = raw.slice(3);

    if(raw.length >= 2){
      ret += raw.slice(0, 2) + '-';
      raw = raw.slice(2);
    }
  }

  ret += raw;
  $(this).val(ret);
}

var restrictNumbers = function(keyEv){
  var code = keyEv.keyCode || keyEv.which || keyEv.charCode;
  var char = String.fromCharCode(code);
  if(isAndroid() && code == 229) return;
  var allowedChars = String("01234567890").split('');
  var allowed = [9, 91, 8, 37, 38, 39, 40, 13, 16, 17, 18, 93, 20];
  $(this).removeError('cc-numbers-only').hideError();

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only');
    $(this).showError();
    return false;
  }
}//// fun. formateSSN

var restrictCurrency = function(keyEv){
  var code = keyEv.keyCode || keyEv.which || keyEv.charCode;
  var char = String.fromCharCode(code);
  if(isAndroid() && code == 229) return;
  var allowedChars = String("01234567890$,").split('');
  var allowed = [9, 91, 8, 37, 38, 39, 40, 13, 16, 17, 18, 93, 20];
  $(this).removeError('cc-numbers-only').hideError();

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only').showError();
    return false;
  }
}//// fun. formateSSN

var formatCurrency = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;

  var allowed = [191, 9, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;

  var val = $(this).val();
  var ret = '';
  var raw = val.split(/[\$| |\,]/).join('');

  if(raw.length > 3){
      var arr = raw.split('');
      var sep = 1;
      for(var x=arr.length-1; x>=0; x--){
        //// add reading comma after 3 digits and only if there is next digit
        ret = (sep % 3 == 0 && true === !!arr[x-1]? ',' : '') + arr[x]  + ret;
        sep++;
      }
      ret = '$' + ret;
  }
  else if(raw.length > 0){
    ret = '$' + raw;
  }
  else{
    ret = raw;
  }

  $(this).val(ret);
}///// fun. formatCurrency

var animateScroll = function(y, time){

    clearInterval(_appGlobal.scrollInte);//// stop anyscrolling

    if(undefined === time) time = 1;//// set default value for time
    var fps = 60; //// frames per secons
    var frameTime = Math.ceil(1000 / fps);
    var d = time * frameTime; /// number of frames duration
    var t = 0; //// time ticker / frame counter

    //// set begin point whihc the currrent point
    // b = document.documentElement.scrollTop ? document.documentElement.scrollTop : window.scrollY;
    var b = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0;
    //
    if(b === undefined){
        b = 0;
    }


    //// check if scrolling destination is bigger than page height limits
    var limit = Math.max( document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );
    if(y>limit){
        y = limit;
    }

    //// set the change between current and destination point
    c = b - y;

    //// do nothing if destination is same as current
    if(Math.abs(c) < 1) return;

    //// start time ticker
    _appGlobal.scrollInte = setInterval(function(){
        /// ease out math
        var per = 1 - t/d;
        var newY =  -c * (1-per*per*per*per) + b;

        // console.log(">>", 1-(1-per)*(1-per));
        window.scrollTo(0, newY);


        if(t == d){
            clearInterval(_appGlobal.scrollInte);
            $(window).trigger('animateScrollEnd');
        }
        t++;

    }, frameTime);
}//// fun. animateScroll

function overlay(o){
    // add a background to overlay
    var w = $(document).width();
    var h = $(document).height();

    /// cassh the overlay Div
    var overlayDiv = $(o['selector']);

    this.closeOverlay= function(){
        // remove keypress event lisnter
        $(window).off('keypress');

        if(o.onBeforeClose) o.onBeforeClose();

        // hide the maks and overlay
        overlayDiv.hide();

        $('#overlayMask').remove();
        overlayDiv.find('a.close').off('click');
        delete _appGlobal.overlay;
    };

    /**
     * [adjust set the top and left position of overlayed div to be centered
     */
    this.adjust = function(){
      var l = ($(window).width() - overlayDiv.outerWidth() ) / 2;
      var t = ($(window).height() - overlayDiv.height() ) / 2;

      if(t<0) t = 0;

      if($(window).width() < 768){
        l = 0; /// if mobile make it cover all screen
        t = 0;
      }

      overlayDiv.css('left', l+'px').css('top', t+'px');
    }//// fun. adjust

    $('body').append('<div id="overlayMask" style="top:0; right:0; bottom:0; left:0; position:fixed; background-color:#000; z-index:9998; top:0px; left:0px;"></div>');
    // $('body').append('<div id="overlayMask" style="width:'+ w +'px; height:'+ h +'px; position:absolute; background-color:#000; z-index:9998; top:0px; left:0px;"></div>');
    var mask = $('#overlayMask');
    mask.addClass("fadeto90").css("opacity", '0.6');

    // assing click to close
    mask.on('click', function(){
        closeOverlay();
    });

    // append the close button
    if(overlayDiv.find('.close').length<=0){
        overlayDiv.append('<a href="javascript:void(0);" class="close icon-close"><a/>');
    }
    overlayDiv.find('.close').css('z-index', 1001).on('click', function(){
        closeOverlay();
    });

    if(o.onBeforeLoad) o.onBeforeLoad();

    overlayDiv.css('z-index','9999').removeClass('fadein').show().addClass('fadein');

    /**
     * Center the overlay div
     */
    this.adjust();

    if(o.onAfterLoad) o.onAfterLoad();

    /// add listener for Esc key
    $(window).on('keypress', function(k){
        if(k.keyCode && k.keyCode == 27) closeOverlay();
    });

    /////// set reference in application variables
    _appGlobal.overlay = this;

    return this;
}// end of fun. overlay

/**
 * [resetFields will search for input field inside a container and rest its value and any error status]
 * @param  {[type]} container [jQueyr object that should contain input filed that need be reset]
 */
var resetFields = function(container){
  var fields = container.find('input, select, textarea');

  fields.each(function(x){
    var type = $(this).attr('type');
    if(type === 'radio'){
      $(this).removeAttr('checked');
      $(this).parent().filter('label').removeClass('checked');
    }
    else{
      $(this).val('');
    }
    $(this).hideError();
  });

}//// fun. resetFields

/**
 * [includeFields will add hidden fields in form and set the right validation]
 * @param  {Object} options should have 2 properties as below
 * options.selector a string that passed to jQuery to select the section need to be included e.g. ".new-fields", "#clodingDate"
 * options.validationClass a string that passed to jQuery to identify the .cc-field that need to be include in validation
 * @return {[type]}         [description]
 */
var includeFields = function(options){
  if(!options.selector || !options.validationClass) return false;

  var fields = $(options.selector);
  fields.find(options.validationClass).addClass('cc-validate');
  fields.slideDown();

}

/**
 * [excludeFields will exclude fields from form and set remove the validation]
 * @param  {Object} options should have 2 properties as below
 * options.selector a string that passed to jQuery to select the section need to be excluded
 * options.validationClass a string that passed to jQuery to identify the .cc-field that need to be excluded from validation
 */
var excludeFields = function(options){
  if(!options.selector || !options.validationClass) return false;

  var fields = $(options.selector);
  fields.find(options.validationClass).removeClass('cc-validate');
  resetFields(fields);
  fields.slideUp();
}

/**
 * [addAutoAddress will add address type ahead functionality to text field with id 'bo_address']
 * @param {[type]} index [in multi-address case this variable will tel the function which address to bind the type ahead to]
 */
function addAutoAddress(index, startFrom1){
    var post = index >= 2 || true === startFrom1 ? ''+index : '';

    var autocomplete = new google.maps.places.Autocomplete(
        // document.getElementById('bo_address' + post),
        $('.typeahead_address' + post).filter('input')[0],
        {types: ['geocode']}
    );
    //// set the address index and post in autocomplete object to be used in fillInAddress function
    autocomplete.index = 0;
    autocomplete.post = post;

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

/**
 * [fillInAddress will update the address city, stat, and zip filed after user select address form type ahead]
 * this inside this function will reference google autocompete object
 * @return {[null]} [description]
 */
function fillInAddress(){
    //// this refer to the auto complete object

    var place = this.getPlace();
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

    var address = {};
    var long_name = '';
    for (var i = 0; i < place.address_components.length; i++) {
        var type = place.address_components[i].types[0];
        var addressType = type;

      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        address[addressType] = val;
      }
      if(addressType === 'administrative_area_level_1'){
            long_name = place.address_components[i]['long_name'];
        }
    }//// for
    address.administrative_area_level_1_long_name = long_name;

    $('.typeahead_address'+this.post).eq(0).val(address.street_number + ' ' + address.route).trigger('change');
    $('.typeahead_city'+this.post).eq(0).val(address.locality).trigger('change');
    $('.typeahead_state'+this.post).eq(0).val(address.administrative_area_level_1).trigger('change');
    // $('#state_label'+this.post).val(address.administrative_area_level_1_long_name).trigger('change');
    $('.typeahead_zip'+this.post).eq(0).val(address.postal_code).trigger('change');
}

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
                console.log(isContinueClicked)
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
                    url:"http://apps.stirringinteractive.com/api-response/is-email-exists.json",
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
                    url:"http://apps.stirringinteractive.com/api-response/authentication.json",
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

        appOverlay = $('#appsList');


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

    function loadApplications(){
        appOverlay.addClass('busy');
        var template = $('#appTemplate').text();
        var appsHolder = $('#appsHolder');

        var data = {};
        data.email = $.trim( $('#login_email').val() );
        data.userId = '0000000';
        data.username = 'usa';
        data.password = 'newyork';

        $.ajax({
            url:"http://apps.stirringinteractive.com/api-response/applications-list.json",
            data:data,
            method:"post",
            dataType:"json",
            error:function(err){
                console.log(err);
                // loginOverlay.removeClass('busy').find('.error-message').slideDown();
            },
            success:function(ret){
                if(Array.isArray(ret)){
                    var x;
                    for(x=0; x<ret.length; x++){
                        var obj = ret[x];
                        var row = template;

                        for(label in obj){
                            var regex = new RegExp('\{\#' + label + '\}', 'g');
                            row = row.replace( regex , obj[label]);
                        } /// for
                        row = $(row);
                        row.find('a').on('click', function(){
                            appOverlay.find('a.close').trigger('click')
                        })
                        appsHolder.append(row);
                    }/// for

                    _appGlobal.overlay.adjust();
                    appOverlay.removeClass('busy');
                }//// if
            }//// success
        });
    }//// fun. loadApplications

    function showApplicationsList(){
        overlay({
            selector:'#appsList',
            onBeforeLoad:function(){
                loadApplications();
            },
            onBeforeClose:function(){
                $('#appsHolder').empty();
            }
        });
    }//// fun. showApplicationsList

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


(function(){
    $(document).ready(coBorrowerReady);

    function coBorrowerReady(){

        var myForm = $('#coBorrowerForm');
        /**
         * do nothing if the form is not #coBorrowerForm
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

        $('input.ssn')
        .on('keydown', restrictSSN)
        .on('keyup', formatSSN);

        $('input.currency')
        .on('keydown', restrictCurrency)
        .on('keyup', formatCurrency)


        /**
         * Check if co-borrower live in different address
         */
        $('input[name=co_livesame]').on('change', function(ev){
            if($(this).val() === 'yes'){

                $('#addressDiv').slideUp()
                .find('.cc-validate')
                .removeClass('cc-validate error correct message')
                .addClass('cc-to-be-validate')
                .find('#errorMsg').remove();
                $('#preAddress').slideUp().empty();
            }
            else{
                $('#addressDiv').slideDown()
                .find('.cc-to-be-validate')
                .removeClass('cc-to-be-validate')
                .addClass('cc-validate');

                addAutoAddress(1); //// function in 01-borrower.js
            }
            updateTabIndex(myForm); /// function in main.js
        });

        /**
         * Back button click handlers
         */
        $('#back').on('click', function(ce){
            history.back();
        })

        /**
         * check for address length change
         * function in 01-borrower.js
         */
        checkAddressLength(myForm, _appGlobal.addressIndex);

        /**
         * Check number of dependents change and show ages fields
         */
        $('#co_dependants').on('change', function(e){

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
         * update co-borrower name in sub titles
         */
        var nameHolder = $('.coBorrowerName');
        $('#co_fname').on('keyup', function(e){
            var val = $.trim( $(this).val() );
            nameHolder.text( val ? val : 'Co-Borrower');
        })
    };//// coBorrowerReady
})();


(function(){
    $(document).ready(purchaseReady);

    function purchaseReady(){

        var myForm = $('#purchaseForm');
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

        $('input.ssn')
        .on('keydown', restrictSSN)
        .on('keyup', formatSSN);

        $('input.currency')
        .on('keydown', restrictCurrency)
        .on('keyup', formatCurrency);

        /**
         * check if real state agent
         */
        $('input[name=pu_usingagent]').on('change', function(){
            var val = $(this).val();
            var agent = $('#agentContact');
            var agentFields = $('#agentFields');

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#agentContact', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({
                    selector:'#agentFields, #agentContact',
                    validationClass:'.cc-to-be-validate'
                }); //// function in main.js

            }
        });///// on.change


        /**
         * check if contact agent
         */
        $('input[name=pu_contactagent]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#agentFields', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({selector:'#agentFields', validationClass:'.cc-to-be-validate'}); //// function in main.js

            }
        });

        /**
         * Check if property
         */
        $('#pu_searchtypepurchase').on('change', function(){
            var val = $(this).val();
            isProperty = String('34').split('').indexOf(val) > -1;

            if(true === isProperty){
                includeFields({selector:'.property-fields', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({
                    selector:'.property-fields, #subName, #closingDate, #monthlyHOA',
                    validationClass:'.cc-to-be-validate, .cc-to-be-validate-sub, .cc-to-be-validate-closing, .cc-to-be-validate-HOA'
                }); //// function in main.js
            }

        });/// on.change

        /**
         * check if HOA dues
         */
        $('input[name=pu_plannedunit]').on('change', function(){
            var val = $(this).val();
            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#monthlyHOA', validationClass:'.cc-to-be-validate-HOA'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#monthlyHOA', validationClass:'.cc-to-be-validate-HOA'}); //// function in main.js
            }
        });

        $('input[name=pu_haveclosingdate]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#closingDate', validationClass:'.cc-to-be-validate-closing'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#closingDate', validationClass:'.cc-to-be-validate-closing'}); //// function in main.js
            }
        });

        $('input[name=pu_manufactured]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#subName', validationClass:'.cc-to-be-validate-sub'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#subName', validationClass:'.cc-to-be-validate-sub'}); //// function in main.js
            }
        });
    };//// purchaseReady
})();
(function(){
    $(document).ready(refinanceReady);

    function refinanceReady(){

        var myForm = $('#refinanceForm');
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

        $('input.ssn')
        .on('keydown', restrictSSN)
        .on('keyup', formatSSN);

        $('input.currency')
        .on('keydown', restrictCurrency)
        .on('keyup', formatCurrency);

        /**
         * Adding google address type ahead
         */
        addAutoAddress(1); /// function in 01-borrower.js

        $('input[name=rf_propertyrefinancing]').on('change', function(){
            var val = $(this).val();
            if(val === 'no' && !!$(this).attr('checked')){
                includeFields({selector:'.otherAddress', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'.otherAddress', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });


        /**
         * check if HOA dues
         */
        $('input[name=rf_plannedunit]').on('change', function(){
            var val = $(this).val();
            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#monthlyHOA', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#monthlyHOA', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=rf_forsale]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#dateOffMarket', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#dateOffMarket', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=rf_subject]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#constructionBrief', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#constructionBrief', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=rf_istitled]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#trustBrief', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#trustBrief', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=rf_manufactured]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#subName', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#subName', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=rf_haveMortgage1]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'.firstMortgage', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.firstMortgage, .secondMortgage, .credit-limit',
                    validationClass:'.cc-to-be-validate, .cc-to-be-validate-mortgage2, .cc-to-be-validate-cl'
                }); //// function in main.js
            }
        });

        $('input[name=rf_secmortgage]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'.secondMortgage', validationClass:'.cc-to-be-validate-mortgage2'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.secondMortgage, .credit-limit, #additionalLiens',
                    validationClass:'.cc-to-be-validate-mortgage2, .cc-to-be-validate-cl, .cc-to-be-validate-line'
                }); //// function in main.js
            }
        });

        $('input[name=rf_mortgage2LOC]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'.credit-limit', validationClass:'.cc-to-be-validate-cl'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'.credit-limit', validationClass:'.cc-to-be-validate-cl'}); //// function in main.js
            }
        });

        $('input[name=as_additionalliens]').on('change', function(){
            var val = $(this).val();

            if(val === 'yes' && !!$(this).attr('checked')){
                includeFields({selector:'#additionalLiens', validationClass:'.cc-to-be-validate-lien'}); //// function in main.js
            }//// if
            else{
                excludeFields({selector:'#additionalLiens', validationClass:'.cc-to-be-validate-lien'}); //// function in main.js
            }
        });
    };//// borrowerReady
})();
/**
 * Below global variables are shared with co-borrower income page 06-co-income.js
 * _appGlobal.employerTemplate, _appGlobal.employerIndex, _appGlobal.employersHolder;
 * _appGlobal.rentTemplate, _appGlobal.rentIndex, _appGlobal.rentsHolder, _appGlobal.rentsArray;
 */


(function(){
    $(document).ready(boIncomeReady);


    function boIncomeReady(){

        var myForm = $('#boIncomeForm');
        /**
         * do nothing if the form is not #coBorrowerForm
         */
        if(myForm.length <= 0) return;

        _appGlobal.employerTemplate = $('#employerTmplt').text();
        _appGlobal.employerIndex = 1;
        _appGlobal.employersHolder = $('#employersHolder');


        /**
         * [_appGlobal.rentTemplate variable to hold the html template as string]
         */
        _appGlobal.rentTemplate = $('#rentTmplt').text();

        /**
         * [_appGlobal.rentIndex a variable to track the rent property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        _appGlobal.rentIndex = 0;

        /**
         * [_appGlobal.rentsHolder the div where rent properties will be appended]
         */
        _appGlobal.rentsHolder = $('#rentsHolder');

        /**
         * [_appGlobal.rentsArray will track the position of each rent property index
         * when user start adding and removing rents randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first rent has index of 4 and second rent has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateRentsFields function
         */
        _appGlobal.rentsArray = [];

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
         * initialize the form when its preloaded with saved data for employers
         */
        _appGlobal.employersHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            addAutoAddress(myIndex);
            bindEmploymentDate(myIndex);
            _appGlobal.employerIndex = myIndex;
        });

        /**
         * initialize the form when its preloaded with saved data for rent properties
         */
        _appGlobal.rentsHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            var myId = parseInt($(this).find('input[id^=re_address]').eq(0).attr('id').split('re_address')[1], 10);

            addAutoAddress(100 + myIndex);

            _appGlobal.rentIndex = myIndex;
            _appGlobal.rentsArray.push(_appGlobal.rentIndex);

            bindRentMortgage(myId);

            $(this).find('a.close').on('click', function(e){
                var i = parseInt($(this).attr('data-index'), 10);
                removeRent(i);
            });

            updateRentCloseBtn();
        });

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

                if(_appGlobal.employerIndex > 1){
                    removeEmployer(2); /// will take care of the rest of
                }
            }
        })
        .trigger('change');

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
        })
        .trigger('change');

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
        })
        .trigger('change');

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
        })
        .trigger('change');

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
        })
        .trigger('change');

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
        })
        .trigger('change');

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
        })
        .trigger('change');

        $('input[name=in_ck_income9]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked')){
                includeFields({selector:'.rental', validationClass:'.cc-to-be-validate'}); //// function in main.js

                /**
                 * Add new property if the property count is 0
                 */
                if(_appGlobal.rentsArray.length < 1){
                    addRent();
                    $('#addRentProperty').show();
                }

            }//// if
            else{
                excludeFields({
                    selector:'.rental',
                    validationClass:'.cc-to-be-validate'
                }); //// function in main.js

                while(_appGlobal.rentsArray.length > 0){
                    removeRent(_appGlobal.rentsArray[_appGlobal.rentsArray.length-1]);
                }/// while
            }
        })
        .trigger('change');

        $('#addRentProperty').on('click', function(ev){
            if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;

            addRent();
        })

    };//// borrowerReady
})();


function bindEmploymentDate(index){

    var fields = $('input.startDate' + index + ', input.endDate' + index);
    var eventName = $.browser.msie ? 'keyup' : 'change'; /// change is not firing on IE !!!
    fields.each(function(){

        $(this)
        .off(eventName, checkEmploymentDate)
        .on(eventName, checkEmploymentDate);
    })
    // fields.off('change', checkEmploymentDate)
}///// fun. bindEmploymentDate

function addEmployer(index){
    /**
     * Limit to 4 previous employers
     */
    if(index > 4) return;

    /**
     * Employers should be added in increasing index
     */
    if(index < _appGlobal.employerIndex) return;

    /**
     * if the employer with index is already added do nothing
     */
    if($('#employer_' + index).length > 0){
        return;
    }

    _appGlobal.employerIndex = index;

    var employer = $(_appGlobal.employerTemplate.replace(/(\{\#\})/g, _appGlobal.employerIndex));

    fillStateDropdown( employer.find('.state-dropdown') );

    yesNoRadio(employer);
    dropdownLabel(employer);

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

    _appGlobal.employersHolder.append(employer);

    addAutoAddress(_appGlobal.employerIndex);
    bindEmploymentDate(_appGlobal.employerIndex);

    updateTabIndex( $('.cc-form')); //// function in main.js

    employer.slideDown();
}//// fun. addEmployer

function removeEmployer(removeIndex){

    if(removeIndex <= 1) return;
    // if(removeIndex > 4) return;

    for(var x=removeIndex; x<=_appGlobal.employerIndex; x++){
        $('#employer_' + x).slideUp({
            complete:function(){
                $(this).detach().remove();
                updateTabIndex($('.cc-form'));
            }
        })
    }
    _appGlobal.employerIndex = removeIndex - 1;
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

function addRent(){

    if(_appGlobal.rentsArray.length >= 5) return;

    _appGlobal.rentIndex++;
    _appGlobal.rentsArray.push(_appGlobal.rentIndex);
    var template = _appGlobal.rentTemplate.replace(/(\{\#index\})/g, _appGlobal.rentIndex);

    var id = _appGlobal.rentsArray.length;
    template = template.replace(/(\{\#id\})/g, id);


    /**
     * [addressIndex is used to help add and track the address fields for type ahead address functionality]
     * 100 + is added to differentiate the rent property address fields from employer address fields
     */
    var addressIndex = 100 + _appGlobal.rentIndex;
    template = template.replace(/(\{\#indexPlus\})/g, addressIndex);


    var rent = $(template);

    rent.find('a.close').on('click', function(ev){
        var i = parseInt($(this).attr('data-index'), 10);
        removeRent(i);
    });

    fillStateDropdown( rent.find('.state-dropdown') );

    /**
     * Set yes/no radio button behavior
     */
    yesNoRadio(rent);
    dropdownLabel(rent);



    /**
     * Behavior setting for numbers only and currency fields
     */
    rent.find('input.numbers')
    .on('keydown', restrictNumbers)

    rent.find('input.currency')
    .on('keydown', restrictCurrency)
    .on('keyup', formatCurrency);


    _appGlobal.rentsHolder.append(rent);

    rent.slideDown();

    /**
     * Set mortgage yes/no action
     */
    bindRentMortgage(id);

    addAutoAddress(addressIndex);

    updateTabIndex($('.cc-form'));

    updateRentCloseBtn();
}//// fun. addRent

function removeRent(removeIndex){
    var position = _appGlobal.rentsArray.indexOf(removeIndex);

    $('#property_' + removeIndex).slideUp({
        complete:function(){
            $(this).remove();
            updateTabIndex($('.cc-form'));
        }
    });
    _appGlobal.rentsArray.splice(position, 1);

    updateRentsFields();

    updateRentCloseBtn();
}//// fun. removeRent

/**
 * [updateRentsFields this function will ensure the rent property name and id is always in series of 1,2,3,4,....]
 * this function is called in addRent and removeRent
 * this function assume the fields names and ids contain ONE number of 1 or 2 digits
 */
function updateRentsFields(){
    var limit = _appGlobal.rentsArray.length;
    if(limit < 1) return;

    for(var x=0; x<limit; x++){
        var index = _appGlobal.rentsArray[x];

        var rentDiv = $('#property_'+index);

        rentDiv.find('input').each(function(z){
            var name = $(this).attr('name');
            var newName = name.replace(/\d{1,2}/g, x+1);
            var label = $('label[for=' + name + ']');
            $(this).attr({name:newName, id:newName});
            label.attr('for', newName);
        });
    }//// for x
}//// fun. updateRentsFields

/**
 * [updateRentCloseBtn this function will ensure the remove button is hidden if there is only one property]
 * it will be called from addRent and removeRent
 */
function updateRentCloseBtn(){
    if(_appGlobal.rentsArray.length > 1){
        var index = _appGlobal.rentsArray[0];
        var rentDiv = $('#property_'+index);
        rentDiv.find('a.close').show();
    }
    else{
        var index = _appGlobal.rentsArray[0];
        var rentDiv = $('#property_'+index);
        rentDiv.find('a.close').hide();
    }

    if(_appGlobal.rentsArray.length >= 5){
        // $('#addRentProperty').attr({'disabled':true}).css({'opacity':0.5});
        $('#addRentProperty').hide();
    }
    else{
        // $('#addRentProperty').attr({'disabled':false}).css({'opacity':1});
        $('#addRentProperty').show();
    }

}//// fun. updateRentCloseBtn

function bindRentMortgage(index){
    $('input.mortgageRadio'+index).on('change', function(){
        var myIndex = $(this).attr('data-index');
        var myVal = $(this).val();
        if(true === !!$(this).attr('checked') && myVal === 'yes'){
            includeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
        }
        else{
            excludeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
        }
    });
}//// fun. bindRentMortgage
(function(){
    $(document).ready(coIncomeReady);

    function coIncomeReady(){

        var myForm = $('#coIncomeForm');
        /**
         * do nothing if the form is not #coBorrowerForm
         */
        if(myForm.length <= 0) return;

        /**
         * Below global variables defined in 05-income.js
         */
        _appGlobal.employerTemplate = $('#employerTmplt').text();
        _appGlobal.employerIndex = 1;
        _appGlobal.employersHolder = $('#employersHolder');


        /**
         * [_appGlobal.rentTemplate variable to hold the html template as string]
         */
        _appGlobal.rentTemplate = $('#rentTmplt').text();
        /**
         * [_appGlobal.rentIndex a variable to track the rent property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        _appGlobal.rentIndex = 0;

        /**
         * [_appGlobal.rentsHolder the div where rent properties will be appended]
         */
        _appGlobal.rentsHolder = $('#rentsHolder');

        /**
         * [_appGlobal.rentsArray will track the position of each rent property index
         * when user start adding and removing rents randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first rent has index of 4 and second rent has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateRentsFields function
         */
        _appGlobal.rentsArray = [];

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
         * initialize the form when its preloaded with saved data for employers
         */
        _appGlobal.employersHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            addAutoAddress(myIndex);
            bindEmploymentDate(myIndex);
            _appGlobal.employerIndex = myIndex;
        });

        /**
         * initialize the form when its preloaded with saved data for rent properties
         */
        _appGlobal.rentsHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            var myId = parseInt($(this).find('input[id^=re_co_address]').eq(0).attr('id').split('re_co_address')[1], 10);

            addAutoAddress(100 + myIndex);

            _appGlobal.rentIndex = myIndex;
            _appGlobal.rentsArray.push(_appGlobal.rentIndex);

            bindRentMortgage(myId);

            $(this).find('a.close').on('click', function(e){
                var i = parseInt($(this).attr('data-index'), 10);
                removeRent(i);
            });

            updateRentCloseBtn();
        });

        /**
         * Adding google address type ahead
         */
        addAutoAddress(1); /// function in 01-borrower.js

        $('input[name=in_co_ck_income2]').on('change', function(){
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

                if(_appGlobal.employerIndex > 1){
                    removeEmployer(2); /// will take care of the rest of
                }
            }
        })
        .trigger('change');

        $('input[name=in_co_ck_income3]').on('change', function(){
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
        })
        .trigger('change');

        $('input[name=in_co_ck_income4]').on('change', function(){
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
        })
        .trigger('change');

        $('input[name=in_co_ck_income5]').on('change', function(){
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
        })
        .trigger('change');

        $('input[name=in_co_ck_income6]').on('change', function(){
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
        })
        .trigger('change');

        $('input[name=in_co_ck_income7]').on('change', function(){
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
        })
        .trigger('change');

        $('input[name=in_co_ck_income8]').on('change', function(){
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
        })
        .trigger('change');

        $('input[name=in_co_ck_income9]').on('change', function(){

            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked')){
                includeFields({selector:'.rental', validationClass:'.cc-to-be-validate'}); //// function in main.js

                /**
                 * Add new property if the property count is 0
                 */
                if(_appGlobal.rentsArray.length < 1){
                    addRent();
                    $('#addRentProperty').show();
                }

            }//// if
            else{
                excludeFields({
                    selector:'.rental',
                    validationClass:'.cc-to-be-validate'
                }); //// function in main.js

                while(_appGlobal.rentsArray.length > 0){
                    removeRent(_appGlobal.rentsArray[_appGlobal.rentsArray.length-1]);
                }/// while
            }
        })
        .trigger('change');

        $('#addRentProperty').on('click', function(ev){
            if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;

            addRent();
        })

    };//// coIncomeReady
})();

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

(function(){
    $(document).ready(liabilitiesReady);
    var liabilityTemplate, liabilityIndex, liabilitiesHolder, liabilitiesArray;

    function liabilitiesReady(){

        var myForm = $('#liabilitiesForm');
        /**
         * do nothing if the form is not #coBorrowerForm
         */
        if(myForm.length <= 0) return;

        /**
         * [rentTemplate variable to hold the html template as string]
         */
        liabilityTemplate = $('#liabilityTmplt').text();
        /**
         * [liabilityIndex a variable to track the asset property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        liabilityIndex = 0;

        /**
         * [liabilitiesHolder the div where asset properties will be appended]
         */
        liabilitiesHolder = $('#liabilitiesHolder');

        /**
         * [liabilitiesArray will track the position of each asset property index
         * when user start adding and removing assets randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first asset has index of 4 and second asset has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateLiabilitiesFields function
         */
        liabilitiesArray = [];

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
         * initialize the form when its preloaded with saved data for asset
         */
        liabilitiesHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            var myId = parseInt($(this).find('input[id^=li_creditor]').eq(0).attr('id').split('li_creditor')[1], 10);


            liabilityIndex = myIndex;
            liabilitiesArray.push(liabilityIndex);

            $(this).find('a.close').on('click', function(e){
                var i = parseInt($(this).attr('data-index'), 10);
                removeLiability(i);
            });
            console.log(liabilitiesArray)
            updateLiabilityCloseBtn();
        });



        $('#addAnotherLiability')
        .on('click', function(ev){
            if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;

            addLiability();

        });


    };//// liabilitiesReady



    function addLiability(){

        if(liabilitiesArray.length >= 5) return;

        liabilityIndex++;
        liabilitiesArray.push(liabilityIndex);
        var template = liabilityTemplate.replace(/(\{\#index\})/g, liabilityIndex);

        var id = liabilitiesArray.length;
        template = template.replace(/(\{\#id\})/g, id);


        var liability = $(template);

        liability.find('a.close').on('click', function(ev){
            var i = parseInt($(this).attr('data-index'), 10);
            removeLiability(i);
        });

        /**
         * Behavior setting for numbers only and currency fields
         */

        liability.find('input.currency')
        .on('keydown', restrictCurrency)
        .on('keyup', formatCurrency);

        yesNoRadio(liability);
        dropdownLabel(liability);


        liabilitiesHolder.append(liability);

        liability.slideDown();

        updateTabIndex($('.cc-form'));

        updateLiabilityCloseBtn();
    }//// fun. addRent

    function removeLiability(removeIndex){
        var position = liabilitiesArray.indexOf(removeIndex);

        $('#liability_' + removeIndex).slideUp({
            complete:function(){
                $(this).remove();
                updateTabIndex($('.cc-form'));
            }
        });
        liabilitiesArray.splice(position, 1);

        updateLiabilitiesFields();

        updateLiabilityCloseBtn();
    }//// fun. removeLiability

    /**
     * [updateLiabilitiesFields this function will ensure the asset name and id is always in series of 1,2,3,4,....]
     * this function is called in addLiability and removeLiability
     * this function assume the fields names and ids contain ONE number of 1 or 2 digits
    */
    function updateLiabilitiesFields(){
        var limit = liabilitiesArray.length;
        if(limit < 1) return;

        for(var x=0; x<limit; x++){
            var index = liabilitiesArray[x];

            var assetDiv = $('#liability_'+index);

            assetDiv.find('input').each(function(z){
                var name = $(this).attr('name');
                var newName = name.replace(/\d{1,2}/g, x+1);
                var label = $('label[for=' + name + ']');
                $(this).attr({name:newName, id:newName});
                label.attr('for', newName);
            });
        }//// for x
    }//// fun. updateLiabilitiesFields

    // /**
    //  * [updateAssetsCloseBtn this function will ensure the remove button is hidden if there is only one asset]
    //  * it will be called from addLiability and removeLiability
    //  */
    function updateLiabilityCloseBtn(){

        if(liabilitiesArray.length > 1){
            var index = liabilitiesArray[0];
            var assetDiv = $('#liability_'+index);
            assetDiv.find('a.close').show();
        }
        else{
            var index = liabilitiesArray[0];
            var assetDiv = $('#liability_'+index);
            assetDiv.find('a.close').hide();
        }

        if(liabilitiesArray.length >= 5){
            $('#addAnotherLiability').hide();
        }
        else{
            $('#addAnotherLiability').show();
        }

    }//// fun. updateAssetCloseBtn
})();
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


        $('input[name=de_ownership]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=ot_workingwith]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.employee', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({selector:'.employee', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=de_citizen]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'no'){
                includeFields({selector:'.resident', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({selector:'.resident', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });

        $('input[name=de_bprimary]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ownership', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({selector:'.ownership, .property', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });


    };//// declarationsReady
})();





(function(){
    $(document).ready(coDeclarationsReady);

    function coDeclarationsReady(){

        var myForm = $('#coDeclarationsForm');

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

        $('input[name=de_co_citizen]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'no'){
                includeFields({selector:'.alien', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
            else{
                excludeFields({selector:'.alien', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });


    };//// coDeclarationsReady
})();
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


    };//// governmentReady
})();
(function(){
    $(document).ready(ackReady);

    function ackReady(){

        var myForm = $('#ackForm');

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


    };//// ackReady
})();





(function(){
    $(document).ready(edisclosureReady);

    function edisclosureReady(){

        var myForm = $('#edisclosureForm');

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


    };//// edisclosureReady
})();





(function(){
    $(document).ready(instructionsReady);

    function instructionsReady(){

        var myForm = $('#instructionsForm');

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


    };//// instructionsReady
})();




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


    };//// depositReady
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwic3VwcG9ydC5qcyIsIm1haW4uanMiLCIwMS1ib3Jyb3dlci5qcyIsIjAyLWNvYm9ycm93ZXIuanMiLCIwMy1wdXJjaGFzZS5qcyIsIjA0LXJlZmluYW5jZS5qcyIsIjA1LWluY29tZS5qcyIsIjA2LWNvLWluY29tZS5qcyIsIjA3LWFzc2V0cy5qcyIsIjA4LWxpYWJpbGl0aWVzLmpzIiwiMDktZGVjbGFyYXRpb25zLmpzIiwiMTAtY28tZGVjbGFyYXRpb25zLmpzIiwiMTEtZ292ZXJubWVudC5qcyIsIjEyLWFja25vd2xlZGdlbXRuLmpzIiwiMTMtZWRpc2Nsb3N1cmUuanMiLCIxNC1pbnN0cnVjdGlvbnMuanMiLCIxNS1kZXBvc2l0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2ZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9zQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbmtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c1N0YXRlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbGFiYW1hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQUtcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBcml6b25hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29sb3JhZG9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNPXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGVsYXdhcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRFXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRDXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJGTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkZsb3JpZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR2VvcmdpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiR0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHdWFtXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHVVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkhhd2FpaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSElcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJZGFob1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSURcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbGxpbm9pc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbmRpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklvd2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTEFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYWluZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1BXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWljaGlnYW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1JXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNT1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1vbnRhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1UXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmVicmFza2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5FXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV2YWRhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOVlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1QXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2hpb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0hcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPa2xhaG9tYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0tcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPcmVnb25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9SXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGFsYXVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBXXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0NcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlNEXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRleGFzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUWFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlV0YWhcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlVUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmVybW9udFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVlRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVkFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldWXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIld5b21pbmdcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldZXCJcbiAgICAgIH1cbiAgXTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgJC5mbi52YWxpZGF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmb3JtID0gdGhpcy5maWx0ZXIoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICBmb3JtLm9mZignc3VibWl0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICAgICAgZm9ybS5maW5kKCcuY2MtZmllbGQuY2MtdmFsaWRhdGUnKS5lYWNoKGZ1bmN0aW9uKG4pe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBzZWxmLnZhbGlkYXRlRmllbGQoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8vLyBmYWxzZSBhbmQgdHJ1ZSBzdHJpY3RseSB0ZXN0IGFzIG51bGwgd2lsbCByZXR1cm5lZCBpcyBmaWVsZCBpcyBub3QgdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgaWYoZmFsc2UgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHNlbGYuZmluZCgnbGFiZWwnKS5lcSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZkVyciA9IHtmaWxlZDpsYWJlbC50ZXh0KCksIGlkOmZpZWxkLmF0dHIoJ2lkJyksIGVycm9yOmVycn07XG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWVsZHMucHVzaChmRXJyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyAvLy8gLmVhY2hcblxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGNhcHR1cmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybiBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZXh0cmEgPSB0cnVlO1xuICAgICAgICAgICAgaWYoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICBleHRyYSA9IGNhbGxiYWNrKGlzRm9ybVZhbGlkLCBpbnZhbGlkRmllbGRzLmxlbmd0aCA+IDAgPyBpbnZhbGlkRmllbGRzIDogbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmICEhZXh0cmE7XG5cblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNGb3JtVmFsaWQpe1xuICAgICAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsvLy8vIC5vbiBzdWJtaXRcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHZhciBnZXRNeUNvbnRhaW5lciA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICAgICAgdmFyIHAgPSBmaWVsZC5wYXJlbnQoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gcC5oYXNDbGFzcygnY2MtZmllbGQnKSl7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGdldE15Q29udGFpbmVyKHApO1xuICAgICAgICB9XG4gICAgfS8vLy8gZnVuLiBnZXRNeUNvbnRhaW5lclxuXG5cbiAgICB2YXIgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoJCh0aGlzKSk7XG4gICAgICAgIGNvbnRhaW5lci52YWxpZGF0ZUZpZWxkKClcbiAgICB9XG5cbiAgICAkLmZuLnZhbGlkYXRlRmllbGQgPSBmdW5jdGlvbihzZWxmKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZiA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCAgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgdmFyIHYgPSAkLnRyaW0oZi52YWwoKSk7XG4gICAgICAgIHZhciBlcnIgPSBmLmRhdGEoJ2VycicpO1xuICAgICAgICB2YXIgdHlwZSA9IGYuYXR0cigndHlwZScpO1xuXG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGlzVmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQnKSl7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vLy8gaGFuZGxlIHJhZGlvIGJ1dHRvbiBjYXNlXG4gICAgICAgICAgICBpZih0eXBlICYmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdyYWRpbycpICl7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBmLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFkaW9zID0gc2VsZi5maW5kKFwiaW5wdXRbbmFtZT1cIituYW1lK1wiXVwiKTtcbiAgICAgICAgICAgICAgICByYWRpb3MuZWFjaChmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhcmFkaW9zLmVxKHIpLmF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8vLy8gYnJlYWsgLmVhY2ggb2Ygb24gcmFkaW8gYnV0dG9uIGZvdW5kIGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZiA9IHJhZGlvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSAmJiB0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpe1xuICAgICAgICAgICAgICAgIGlmKGYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGYuZWFjaChmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSAhIWYuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8gYnJlYWsgLmVhY2ggb2Ygb24gcmFkaW8gYnV0dG9uIGZvdW5kIGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IGlzVmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfS8vLy8gaWYgTGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKHYubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB0eXBlIHJhZGlvIGVsc2VcblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1yZXF1aXJlZCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vLyBpZiB2Lmxlbmd0aFxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXJlcXVpcmVkJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy8vLyBpZiBjYy1yZXF1aXJlZFxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLW51bWJlcicpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXihcXGQpKyhcXC5cXGQrKT8kLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1udW1iZXInKTtcbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtbnVtYmVyJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLW51bWJlciddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZW1haWwnKSAmJiB2KXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciByZWd4ID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtZW1haWwnKTtcbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZW1haWwnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1lbWFpbCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkZWxldGUgZXJyWydjYy1lbWFpbCddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZGF0ZScpKXtcblxuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBzcGxpdFsxXSA/IE51bWJlcihzcGxpdFsxXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3BsaXRbMl0gPyBOdW1iZXIoc3BsaXRbMl0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgbTMxID0gWzEsIDMsIDUsIDcsIDgsIDEwLCAxMl07XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIW0gfHwgbSA+IDEyIHx8IG0gPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihtMzEuaW5kZXhPZihtKSA+PTAgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWQgfHwgZCA+IDMxIHx8IGQgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzAgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0gPT0gMil7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZCA9IHkgJSA0ID09IDAgPyAyOSA6IDI4O1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gX2QgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGhhc0NsYXNzIGNjLWRhdGVcbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZGF0ZSBjYy1kYXRlLWd0Jykpe1xuICAgICAgICAgICAgdmFyIGd0RmllbGQgPSAkKCcjJytzZWxmLmF0dHIoJ2RhdGEtZGF0ZS1ndCcpKTtcbiAgICAgICAgICAgIHZhciBndFZhbCwgc3RhcnREYXRlLCBlbmREYXRlO1xuICAgICAgICAgICAgaWYodi5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZ3RGaWVsZC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpZihndEZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZ3RGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGVuZERhdGUgPCBzdGFydERhdGUpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgZ3RGaWVsZC5sZW5ndGggPiAwXG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlLWd0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZGF0ZS1ndCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUtZ3QnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaGFzQ2xhc3MgY2MtZGF0ZS1ndFxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWNhcmQtZXhwaXJhdGlvbicpKXtcblxuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSAxO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3BsaXRbMV0gPyBOdW1iZXIoc3BsaXRbMV0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG51bGxcblxuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLTEsIGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCFtIHx8IG0gPiAxMiB8fCBtIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihudWxsICE9PSBkYXRlICYmIGRhdGUgPD0gbm93ICl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY2FyZC1leHBpcmF0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB2XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY2FyZC1leHBpcmF0aW9uJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1waG9uZScpKXtcbiAgICAgICAgICAgIGlmKHYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXChcXGR7M31cXCkoICk/XFxkezN9XFwtXFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcGhvbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1waG9uZSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtY3VycmVuY3knKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcJD8oXFxkezEsM30pKyhcXCwqXFxkezN9KSokLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1jdXJyZW5jeScpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWN1cnJlbmN5J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWN1cnJlbmN5J107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2Mtc3NuJykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXGR7M30oXFwtKT9cXGR7Mn0oXFwtKT9cXGR7NH0kLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1zc24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1zc24nXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2Mtc3NuJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQtb25lLW9mJykpe1xuICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICQoJy4nK3NlbGYuYXR0cignZGF0YS1vbmUtb2YtY2xhc3MnKSArICcgaW5wdXQnKTtcblxuICAgICAgICAgICAgdmFyIF9pc1ZhbGlkID0gZmFsc2U7IC8vLy8gbG9jYWwgaXNWYWxpZCB2YXIgd2lsbCBiZSAmJiB3aXRoIGlzVmFsaWRcbiAgICAgICAgICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgICAgIF9pc1ZhbGlkID0gX2lzVmFsaWQgfHwgISEkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IF9pc1ZhbGlkKSByZXR1cm4gZmFsc2U7Ly8vLyBzdG9wIGVhY2ggaWYgb25lIGZpbGVkIGlzIGZvdW5kXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgX2lzVmFsaWQ7XG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZC1vbmUtb2YnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXTtcblxuICAgICAgICAgICAgICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgX2VyciA9ICQodGhpcykuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBfZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJCh0aGlzKS5kYXRhKCdlcnInLCBfZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1yZXF1aXJlZC1vbmUtb2YnKS5oaWRlRXJyb3IoKS5zaG93RXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaGFzQ2xhc3MgY2MtcmVxdWlyZWQtb25lLW9mXG5cbiAgICAgICAgLy8vLyByZXNldCB0aGUgZmllbGQgZXJyb3JzIGJlZm9yZSBhZGRpbmcgdGhlbSBhZ2FpblxuICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKS5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICBmLmRhdGEoJ2VycicsIGVycik7XG4gICAgICAgIGYuZGF0YSgnaXNWYWxpZCcsIGlzVmFsaWQpO1xuXG4gICAgICAgIC8vLy8gaWYgZmllbGQgcGFzc2VkIHRocm91Z2ggdmFsaWRhdGlvbiBzaG93IGVycm9yIGlmIGFueVxuICAgICAgICAvLyBpZih0cnVlID09PSBpc1ZhbGlkYXRlZCApe1xuICAgICAgICAvLyBpZihPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICBpZihmYWxzZSA9PSBpc1ZhbGlkIHx8IE9iamVjdC5rZXlzKGVycikubGVuZ3RoID4gMCl7XG5cbiAgICAgICAgICAgICAgICBmLnNob3dFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICBmLmhpZGVFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gfS8vLy8gaWYgaXNWYWxpZGF0ZWRcblxuICAgIH0vLy8vIGZ1bi4gdmFsaWRhdGVGaWxkXG5cbiAgICAkLmZuLnNob3dFcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBmID0gdGhpcy5maWx0ZXIoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcbiAgICAgICAgdmFyIHR5cGUgPSBmLmF0dHIoJ3R5cGUnKTtcblxuICAgICAgICB2YXIgZXJyID0gZi5kYXRhKCdlcnInKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSBmLmRhdGEoJ2lzVmFsaWQnKTtcblxuICAgICAgICB2YXIgc3RyID0gW107XG4gICAgICAgIGZvcih2YXIgZSBpbiBlcnIpe1xuICAgICAgICAgICAgc3RyLnB1c2goZXJyW2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3InKS5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICBmLm9mZigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcik7XG5cbiAgICAgICAgaWYodHJ1ZSAhPT0gaXNWYWxpZCl7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICBmLm9mZigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcikub24oJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmKHN0ci5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB2YXIgbXNnID0gJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIiBpZD1cImVycm9yTXNnXCI+PGkgY2xhc3M9XCJpY29uLWVycm9yIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlLXNpZ25cIj48L2k+ICcgKyBzdHIuam9pbignIHwgJykgKyAnPC9kaXY+Jykuc2hvdygpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChtc2cpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdtZXNzYWdlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9Ly8vLyBmdW4uIHNob3dFcnJvclxuXG4gICAgJC5mbi5oaWRlRXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLmVxKDApO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcblxuICAgICAgICAvLyBjb250YWluZXIuYWRkQ2xhc3MoJ2NvcnJlY3QnKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdlcnJvciBtZXNzYWdlJyk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgICQuZm4uYWRkRXJyb3IgPSBmdW5jdGlvbihlcnJvckNsYXNzKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKGZpZWxkKTtcblxuICAgICAgICB2YXIgbXNnID0gY29udGFpbmVyLmZpbmQoJy5tZXNzYWdlLicrZXJyb3JDbGFzcykuZXEoMCkudGV4dCgpO1xuICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIGVycltlcnJvckNsYXNzXSA9IG1zZztcblxuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmaWVsZC5kYXRhKCdpc1ZhbGlkJywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLnJlbW92ZUVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuXG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSByZXR1cm4gdGhpcztcblxuICAgICAgICBkZWxldGUgZXJyW2Vycm9yQ2xhc3NdO1xuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBpZihPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbn0oIGpRdWVyeSApKTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgdmFyIHBhbmxlLCBwb3B1cCwgYnRuLCBxdWVzdGlvbnMsIGFjdGl2ZVF1ZXN0aW9uLCBmaWVsZHM7XG4gICAgdmFyIGhlbGxvTWVzc2FnZTtcblxuICAgICQuZm4uY2NTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5maW5kKCcuY2Mtc3VwcG9ydCcpO1xuXG5cbiAgICAgICAgaWYoc2VsZi5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgcGFuZWwgPSBzZWxmLmZpbmQoJy5jYy1zdXBwb3J0LXBhbmVsJykuZXEoMCk7XG4gICAgICAgIHBvcHVwID0gc2VsZi5maW5kKCcuY2Mtc3VwcG9ydC1wb3B1cCcpLmVxKDApO1xuICAgICAgICBidG4gPSBzZWxmLmZpbmQoJy5idG4nKS5lcSgwKTtcbiAgICAgICAgcXVlc3Rpb25zID0gcGFuZWwuZmluZCgnLmNjLXN1cHBvcnQtcXVlc3Rpb25zIGxpJyk7XG4gICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcblxuICAgICAgICBmaWVsZHMgPSB7fTtcblxuICAgICAgICBoZWxsb01lc3NhZ2UgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmhlbGxvJykudGV4dCgpO1xuXG4gICAgICAgIHF1ZXN0aW9ucy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhaWQpe1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7aW5kZXg6eCwgcTokKHRoaXMpLmZpbmQoJ2EnKS5lcSgwKS50ZXh0KCl9O1xuICAgICAgICAgICAgICAgIGZpZWxkc1tpZF0gPSBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB2YXIgdG9nZ2xlUGFuZWwgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBpZihwYW5lbC5oYXNDbGFzcygnZXhwYW5kZWQnKSl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMuZmlsdGVyKCcuZXhwYW5kZWQnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaScpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBidG4ucmVtb3ZlQ2xhc3MoJ291dCcpXG4gICAgICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICAgICAgfS8vLy8gaWYgaGFzQ2Fsc3NcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYnRuLmFkZENsYXNzKCdvdXQnKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBoaWRlIHRoZSBwb3B1cCBpZiBpdHMgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKHBvcHVwLmhhc0NsYXNzKCd2aXNpYmxlJykpe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBFeHBhbmQgcXVlc3Rpb24gd2hlbiBwYW5lbCBpcyBvcGVuZWQgaWYgdGhlIGFjdGl2ZVF1c3Rpb24gaXNcbiAgICAgICAgICAgICAgICAgICAgICogYmVlbiBzZXQgd2l0aCBmaWVsZCBmb2N1cyBldmVudFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYobnVsbCAhPT0gYWN0aXZlUXVlc3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLmVxKGFjdGl2ZVF1ZXN0aW9uKS5maW5kKCdhJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9LCAzMDApOyAvLy8gc2V0VGltZW91dFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9Ly8vIGlmIGhhc0NsYXNzIGVsc2VcbiAgICAgICAgfS8vLy8gZnVuLiB0b2dnbGVQYW5lbFxuXG4gICAgICAgIHZhciB0b2dnbGVRdWVzdGlvbiA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJlbnQuZmluZCgnaScpO1xuXG4gICAgICAgICAgICBpZihwYXJlbnQuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpe1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXN0aW9ucy5maWx0ZXIoJy5leHBhbmRlZCcpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcblxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgaS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKTtcblxuICAgICAgICB9Ly8vLyBmdW4uIHRvZ2dsZVF1ZXN0aW9uXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvY3VzIEV2ZW50IGhhbmRsZXIgZm9yIGZpZWxkcyB0byBzaG93IGhlbHBlciBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc2hvd1BvcHVwID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgICAgIGlmKGlkIGluIGZpZWxkcyl7XG4gICAgICAgICAgICAgICAgcG9wdXAuYWRkQ2xhc3MoJ3Zpc2libGUnKS50ZXh0KGZpZWxkc1tpZF0ucSk7XG4gICAgICAgICAgICAgICAgYWN0aXZlUXVlc3Rpb24gPSBmaWVsZHNbaWRdLmluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBmdW4uc2hvd1BvcHVwXG5cbiAgICAgICAgdmFyIGhpZGVQb3B1cCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgcG9wdXAucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKS50ZXh0KCcnKTtcbiAgICAgICAgfS8vLy8gZnVuLnNob3dQb3B1cFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhbmVsIGNsb3NlIGJ1dHRvblxuICAgICAgICAgKi9cbiAgICAgICAgcGFuZWwuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogPyBidXR0b24gYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIGJ0bi5vbignY2xpY2snLCB0b2dnbGVQYW5lbClcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhaGVsbG9NZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNob3dTdXBwb3J0TWVzc2FnZShoZWxsb01lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcG9wdXAgYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIHBvcHVwLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5zaWRlIHBhbmVsIHF1ZXN0aW9uIGNsaWNrIGJlaGF2aW9yXG4gICAgICAgICAqL1xuICAgICAgICBwYW5lbC5maW5kKCcuY2Mtc3VwcG9ydC1xdWVzdGlvbnMgbGkgYScpLm9uKCdjbGljaycsIHRvZ2dsZVF1ZXN0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGZvY3VzIGV2ZW50IGZvciBmaWVsZHMgdG8gc2hvdyB0aGUgcmlnaHQgcXVlc3Rpb24gYXMgcG9wdXBcbiAgICAgICAgICogaWYgdGhlcmUgYSBxdWVzdGlvbiByZWxhdGVkIHRvIHRoaXMgZmllbGRcbiAgICAgICAgICovXG4gICAgICAgIC8vICQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykub24oJ2JsdXInLCBoaWRlUG9wdXApLm9uKCdmb2N1cycsIHNob3dQb3B1cCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYnRuLnJlbW92ZUNsYXNzKCdvdXQnKTtcbiAgICAgICAgfSwgMyoxMDAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9Oy8vLy8gJC5mbiBmdW5jdGlvblxuXG4gICAgJC5mbi5zaG93U3VwcG9ydE1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGlmKGZhbHNlID09PSAhIXBvcHVwKSByZXR1cm4gdGhpcztcblxuICAgICAgICB2YXIgaW50ZTtcbiAgICAgICAgdmFyIGJlZm9yZUhpZGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlKTtcbiAgICAgICAgICAgIGludGUgPSBzZXRUaW1lb3V0KGhpZGVNZXNzYWdlLCAyMDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoaWRlTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdG9wSGlkZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnRuLm9mZignbW91c2VvdXQnLCBiZWZvcmVIaWRlKS5vbignbW91c2VvdXQnLCBiZWZvcmVIaWRlKTtcbiAgICAgICAgcG9wdXAub2ZmKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpLm9uKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpO1xuICAgICAgICBwb3B1cC5vZmYoJ21vdXNlb3ZlcicsIHN0b3BIaWRlKS5vbignbW91c2VvdmVyJywgc3RvcEhpZGUpO1xuXG4gICAgICAgIHBvcHVwLnRleHQobWVzc2FnZSkuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KCBqUXVlcnkgKSk7IiwiLyoqXG4gKiBbX2FwcEdsb2JhbCBOYW1lc3BhY2UgZm9yIGdsb2JhbCB2YXJpYWJsZXNdXG4gKiB0aGlzIHdpbGwgZGVmaW5lIGEgcHJvdGVjdCBuYW1lIHNwYWNlIGZvciBnbG9iYWwgdmFyaWFibGUgdG8gcHJ2ZW50IGFueSBjb25mbGVjdCB3aXRoIGxvY2FsIHZhcmlhYmxlc1xuICovXG52YXIgX2FwcEdsb2JhbCA9IHt9O1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShjY0RvY3VtZW50UmVhZHkpO1xuXG5mdW5jdGlvbiBjY0RvY3VtZW50UmVhZHkoKXtcblxuICAgIC8qKlxuICAgICAqIFByb2dyZXNzIG5hdmlnYXRpb24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI3Byb2dyZXNzX3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3NOYXYgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVQb3JncmVzTmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCgnMTAwJScpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKDQwKTsgLy8gY2hhbmdpbmcgdGhlIHdpZHRoIHRvIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiBvZiBwcm9ncmVzcyBiYXIgY2xpY2thYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gYm9keSBzbyBkbyB0aGUgd29yayBvbiBib2R5IGNsaWNrIFxcIG9ubHkgaWYgbWVudSBpcyBjbG9zZWRcbiAgICAgICAgICogdGhpcyB0byBtYWtlIHN1cmUgdGhlIG1lbnUgaXMgY2xvc2VkIHdoZW4gY2xpY2sgb3V0c2lkZSB0aGUgbWVudVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGZhbHNlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBIYW1idXJnZXIgbWVudSBidXR0b24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI21lbnVfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBtZW51TmF2ID0gJCgnI21lbnVfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVNZW51TmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IG1lbnVOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBtZW51TmF2LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmYWxzZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgJCgnYm9keScpLmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNjcm9sbGluZyBldmVudCBsaXN0ZW5lciB0byBtYWtlIHRoZSBwcm9ncmVzcyBiYXIgc3RpY2t5XG4gICAgICovXG4gICAgLy8gaWYoJCgnYm9keScpLndpZHRoKCkgPCA2Nzgpe1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnKS5vbignc2Nyb2xsJywgbWFpblNjcm9sbCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIHN0YXRlcyBkcm9wLWRvd25zXG4gICAgICovXG4gICAgIGZpbGxTdGF0ZURyb3Bkb3duKCAkKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG5cbiAgICAgLyoqXG4gICAgICAqIFN0YXJ0IFN1cHBvcnRcbiAgICAgICovXG4gICAgICQoZG9jdW1lbnQpLmNjU3VwcG9ydCgpO1xuXG5cbiAgICAvKipcbiAgICAgKiBGbG9hdCBsYWJlbCBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5jYy1maWVsZC5mbG9hdCcpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPXRleHRdJykuZXEoMCk7XG5cbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudCA9ICdrZXl1cCc7XG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRyb3Bkb3duJykpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50ID0gJ2NoYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZC5vbih0cmlnZ2VyRXZlbnQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZmllbGQudmFsKCkpe1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlZGl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTsvLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcuanNDb2xsYXBzZScpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5maW5kKCdhLmNsb3NlLCBhLmRpc21pc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVXAoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTsvLy8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvblxuICAgICAqL1xuICAgIHllc05vUmFkaW8oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aSBjaGVja2JveFxuICAgICAqL1xuICAgIG11bHRpQ2hlY2tib3goKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBhcnJvdyBsYWJlbCBiZWhhdmlvciBmb3IgPHNlbGVjdD5cbiAgICAgKi9cbiAgICBkcm9wZG93bkxhYmVsKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEJhY2sgYnV0dG9uIGNsaWNrIGhhbmRsZXJzXG4gICAgICovXG4gICAgJCgnI2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH0pO1xuXG5cblxufS8vLy8gZnVuLiBjY0RvY3VtZW50UmVhZHlcblxuZnVuY3Rpb24gbWFpblNjcm9sbChlKXtcbiAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGlmKCQoJ2JvZHknKS53aWR0aCgpID4gNjc4KSByZXR1cm47XG5cbiAgICB2YXIgcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICB2YXIgYmFyID0gJCgnI3Byb2dyZXNzX25hdicpO1xuICAgIGlmKHMgPiAyMDApe1xuICAgICAgICBpZihmYWxzZSA9PT0gYmFyLmhhc0NsYXNzKCdmbG9hdCcpKXtcbiAgICAgICAgICAgIGJhci5hZGRDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYmFyLmhlaWdodCgpKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGJhci5yZW1vdmVDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBudWxsKVxuICAgIH1cblxufS8vLy8gZnVuLiBtYWluU2Nyb2xsXG5cblxuZnVuY3Rpb24gdXBkYXRlVGFiSW5kZXgoc2VsZWN0b3Ipe1xuICB2YXIgeCA9IDA7XG4gICAgc2VsZWN0b3IuZmluZCgnLmNjLWZpZWxkJykuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgdmFyIHMgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPWRhdGVdLCBpbnB1dFt0eXBlPXRlbF0sIGlucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSwgaW5wdXRbdHlwZT1udW1iZXJdLCB0ZXh0YXJlYSwgc2VsZWN0JylcbiAgICAgICAgcy5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICQodGhpcykuYXR0cigndGFiaW5kZXgnLCB4KzEpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgfSlcbiAgICB9KVxufS8vLy8gZnVuLiB1cGRhdGVUYWJJbmRleFxuXG4vKipcbiAqIFt5ZXNOb1JhZGlvIFdpbGwgc2V0IHRoZSBiZWhhdmlvciBvZiB5ZXMvbm8gcmFkaW8gYnV0dG9ucyBieSBhZGRpbmcgLmNoZWNrZWQgY2xhc3MgdG8gdGhlIGxhYmVsIG9mIHRoZSBidXR0b25dXG4gKiB0aGUgZnVuY3Rpb24gYXNzdW1lIHRoZSBpbnB1dFt0eXBlPXJhZGlvbl0gaXMgaW5jbHVkZWQgaW5zaWRlIDxsYWJlbD4gdGFnXG4gKi9cbmZ1bmN0aW9uIHllc05vUmFkaW8oY29udGFpbmVyKXtcbiAgLy8vLyBpZiBjb250YWluZXIgaXMgcGFzc2VkIGZpbmQgdGhlIHJhZGlvcyBpbnNpZGUgaXQgb3IgZG8gYSBkb2N1bWVudCBnbG9iYWwgZmluZFxuICB2YXIgcmFkaW9zID0gISFjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykgOiAkKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKTtcbiAgcmFkaW9zLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZigkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xhYmVsLmNoZWNrZWQnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgfSlcbiAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gIH0pXG4gIC5vbignYmx1ciBraWxsZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICB9KTtcblxuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpOy8vLy8gdGhpcyB0byBzZXQgdGhlIGluaXRpYWwgc3RhdGVcbn1cblxuZnVuY3Rpb24gbXVsdGlDaGVja2JveCgpe1xuICB2YXIgcmFkaW9zID0gJCgnLmNjLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgIC8vICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uIGdseXBoaWNvbi1vaycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpO1xufS8vLy8gZnVuLiBtdWx0aUNoZWNrQm94XG5cbi8qKlxuICogW2Ryb3Bkb3duTGFiZWwgU2V0IHRoZSBjbGljayBldmVudCBmb3IgYXJyb3cgbGFiZWwgZm9yIDxzZWxlY3Q+IGVsZW1lbnRdXG4gKiB0aGlzIHNvbHV0aW9uIHdvcmtzIG9ubHkgc2FmYXJpIGFuZCBjaHJvbWUgZHVlIHRvIGJyb3dzZXIgbGltaXRhdGlvblxuICovXG5mdW5jdGlvbiBkcm9wZG93bkxhYmVsKGNvbnRhaW5lcil7XG4gIHZhciBsYWJlbHMgPSBjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLmNjLWRyb3Bkb3duIGxhYmVsLmFycm93JykgOiAkKCcuY2MtZHJvcGRvd24gbGFiZWwuYXJyb3cnKTtcbiAgbGFiZWxzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xuICAgICAgaWYoZmFsc2UgPT09ICEhaWQpIHJldHVybjtcbiAgICAgIHZhciBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nKTtcbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pXG59Ly8vLyBmdW4uIGRyb3Bkb3duTGFiZWxcblxuLyoqXG4gKiBbZmlsbFN0YXRlRHJvcGRvd24gd2lsbCBmaWxsIHRoZSBkcm9wZG9uIG9mIFVTQSBzdGF0ZXMgZm9ybSB1c1N0YXRlIHZhcmlhYmxlXVxuICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciBbalF1ZXJ5IG9iamVjdCB0aGF0IGNvbnRhaW4gPHNlbGVjdD4gdGFnIHRvIGJlIGZpbGxlZF1cbiAqIHVzU2F0ZSBpcyBhcnJheSBvZiBvYmplY3QgZGVmaW5lZCBpbiB1cy1zdGF0dXMuanMgZmlsZVxuICovXG5mdW5jdGlvbiBmaWxsU3RhdGVEcm9wZG93bihzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHVsID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKHZhciBzPTA7IHM8dXNTdGF0ZXMubGVuZ3RoOyBzKyspe1xuICAgICAgICAgICAgdmFyIGxpID0gJCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB1c1N0YXRlc1tzXS5hYmJyZXZpYXRpb24gKyAnXCI+JyArIHVzU3RhdGVzW3NdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgICAgICB9Ly8vLyBmb3JcbiAgICB9KTtcbn0vLy8vIGZ1bi4gZmlsbFN0YXRlRHJvcGRvd25cblxuLyoqXG4gKiBbaXNBbmRyb2lkIHNpbXBsZSBmdW5jdGlvbiB0byBkZXRlY3QgQW5kcm9pZCBPU11cbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlY3QgdGhlIGJ1ZyBpbiBBbmRyb2lkIHdoZW4ga2V5ZG93biwga2V5dXAgZXZlbnQgZG9lc24ndCBzZW5kIHRoZSByaWdodCBrZXkgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gW3RydWUgaWYgQW5kcm9pZCBPU11cbiAqL1xudmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn0vLy8vIGZ1bi4gaXNBbmRyb2lkXG5cblxudmFyIHJlc3RyaWN0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC0oKSBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDQ4LCA1NywgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJhd1ZhbHVlID0gdmFsLnNwbGl0KC9bXFwofFxcKXwgfFxcLXxcXCt8XFwuXS8pLmpvaW4oJycpO1xuICB2YXIgZm9ybWF0ZWQgPSAnJztcbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9ICcoJyArIHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnKSAnO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9IHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnLSc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBmb3JtYXRlZCArPSByYXdWYWx1ZTtcblxuICAkKHRoaXMpLnZhbChmb3JtYXRlZCk7XG59Ly8vLyBmdW4uIGZvcm1hdFBob25lXG5cbnZhciByZXN0cmljdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnLyddXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciBmb3JtYXRDYXJkRGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwvL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuXG4gICAgLy8gaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAvLyAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgLy8gICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgLy8gfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vIGZ1bi4gZm9ybWF0Q2FyZERhdGVcblxudmFyIHJlc3RyaWN0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLVwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC0vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMyl7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAzKSArICctJztcbiAgICByYXcgPSByYXcuc2xpY2UoMyk7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICctJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufVxuXG52YXIgcmVzdHJpY3ROdW1iZXJzID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JykuaGlkZUVycm9yKCk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIHJlc3RyaWN0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAkLFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZVNTTlxuXG52YXIgZm9ybWF0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcblxuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5zcGxpdCgvW1xcJHwgfFxcLF0vKS5qb2luKCcnKTtcblxuICBpZihyYXcubGVuZ3RoID4gMyl7XG4gICAgICB2YXIgYXJyID0gcmF3LnNwbGl0KCcnKTtcbiAgICAgIHZhciBzZXAgPSAxO1xuICAgICAgZm9yKHZhciB4PWFyci5sZW5ndGgtMTsgeD49MDsgeC0tKXtcbiAgICAgICAgLy8vLyBhZGQgcmVhZGluZyBjb21tYSBhZnRlciAzIGRpZ2l0cyBhbmQgb25seSBpZiB0aGVyZSBpcyBuZXh0IGRpZ2l0XG4gICAgICAgIHJldCA9IChzZXAgJSAzID09IDAgJiYgdHJ1ZSA9PT0gISFhcnJbeC0xXT8gJywnIDogJycpICsgYXJyW3hdICArIHJldDtcbiAgICAgICAgc2VwKys7XG4gICAgICB9XG4gICAgICByZXQgPSAnJCcgKyByZXQ7XG4gIH1cbiAgZWxzZSBpZihyYXcubGVuZ3RoID4gMCl7XG4gICAgcmV0ID0gJyQnICsgcmF3O1xuICB9XG4gIGVsc2V7XG4gICAgcmV0ID0gcmF3O1xuICB9XG5cbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vLyBmdW4uIGZvcm1hdEN1cnJlbmN5XG5cbnZhciBhbmltYXRlU2Nyb2xsID0gZnVuY3Rpb24oeSwgdGltZSl7XG5cbiAgICBjbGVhckludGVydmFsKF9hcHBHbG9iYWwuc2Nyb2xsSW50ZSk7Ly8vLyBzdG9wIGFueXNjcm9sbGluZ1xuXG4gICAgaWYodW5kZWZpbmVkID09PSB0aW1lKSB0aW1lID0gMTsvLy8vIHNldCBkZWZhdWx0IHZhbHVlIGZvciB0aW1lXG4gICAgdmFyIGZwcyA9IDYwOyAvLy8vIGZyYW1lcyBwZXIgc2Vjb25zXG4gICAgdmFyIGZyYW1lVGltZSA9IE1hdGguY2VpbCgxMDAwIC8gZnBzKTtcbiAgICB2YXIgZCA9IHRpbWUgKiBmcmFtZVRpbWU7IC8vLyBudW1iZXIgb2YgZnJhbWVzIGR1cmF0aW9uXG4gICAgdmFyIHQgPSAwOyAvLy8vIHRpbWUgdGlja2VyIC8gZnJhbWUgY291bnRlclxuXG4gICAgLy8vLyBzZXQgYmVnaW4gcG9pbnQgd2hpaGMgdGhlIGN1cnJyZW50IHBvaW50XG4gICAgLy8gYiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogd2luZG93LnNjcm9sbFk7XG4gICAgdmFyIGIgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xuICAgIC8vXG4gICAgaWYoYiA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgYiA9IDA7XG4gICAgfVxuXG5cbiAgICAvLy8vIGNoZWNrIGlmIHNjcm9sbGluZyBkZXN0aW5hdGlvbiBpcyBiaWdnZXIgdGhhbiBwYWdlIGhlaWdodCBsaW1pdHNcbiAgICB2YXIgbGltaXQgPSBNYXRoLm1heCggZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgKTtcbiAgICBpZih5PmxpbWl0KXtcbiAgICAgICAgeSA9IGxpbWl0O1xuICAgIH1cblxuICAgIC8vLy8gc2V0IHRoZSBjaGFuZ2UgYmV0d2VlbiBjdXJyZW50IGFuZCBkZXN0aW5hdGlvbiBwb2ludFxuICAgIGMgPSBiIC0geTtcblxuICAgIC8vLy8gZG8gbm90aGluZyBpZiBkZXN0aW5hdGlvbiBpcyBzYW1lIGFzIGN1cnJlbnRcbiAgICBpZihNYXRoLmFicyhjKSA8IDEpIHJldHVybjtcblxuICAgIC8vLy8gc3RhcnQgdGltZSB0aWNrZXJcbiAgICBfYXBwR2xvYmFsLnNjcm9sbEludGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAvLy8gZWFzZSBvdXQgbWF0aFxuICAgICAgICB2YXIgcGVyID0gMSAtIHQvZDtcbiAgICAgICAgdmFyIG5ld1kgPSAgLWMgKiAoMS1wZXIqcGVyKnBlcipwZXIpICsgYjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+XCIsIDEtKDEtcGVyKSooMS1wZXIpKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG5ld1kpO1xuXG5cbiAgICAgICAgaWYodCA9PSBkKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2FwcEdsb2JhbC5zY3JvbGxJbnRlKTtcbiAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdhbmltYXRlU2Nyb2xsRW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdCsrO1xuXG4gICAgfSwgZnJhbWVUaW1lKTtcbn0vLy8vIGZ1bi4gYW5pbWF0ZVNjcm9sbFxuXG5mdW5jdGlvbiBvdmVybGF5KG8pe1xuICAgIC8vIGFkZCBhIGJhY2tncm91bmQgdG8gb3ZlcmxheVxuICAgIHZhciB3ID0gJChkb2N1bWVudCkud2lkdGgoKTtcbiAgICB2YXIgaCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuXG4gICAgLy8vIGNhc3NoIHRoZSBvdmVybGF5IERpdlxuICAgIHZhciBvdmVybGF5RGl2ID0gJChvWydzZWxlY3RvciddKTtcblxuICAgIHRoaXMuY2xvc2VPdmVybGF5PSBmdW5jdGlvbigpe1xuICAgICAgICAvLyByZW1vdmUga2V5cHJlc3MgZXZlbnQgbGlzbnRlclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdrZXlwcmVzcycpO1xuXG4gICAgICAgIGlmKG8ub25CZWZvcmVDbG9zZSkgby5vbkJlZm9yZUNsb3NlKCk7XG5cbiAgICAgICAgLy8gaGlkZSB0aGUgbWFrcyBhbmQgb3ZlcmxheVxuICAgICAgICBvdmVybGF5RGl2LmhpZGUoKTtcblxuICAgICAgICAkKCcjb3ZlcmxheU1hc2snKS5yZW1vdmUoKTtcbiAgICAgICAgb3ZlcmxheURpdi5maW5kKCdhLmNsb3NlJykub2ZmKCdjbGljaycpO1xuICAgICAgICBkZWxldGUgX2FwcEdsb2JhbC5vdmVybGF5O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbYWRqdXN0IHNldCB0aGUgdG9wIGFuZCBsZWZ0IHBvc2l0aW9uIG9mIG92ZXJsYXllZCBkaXYgdG8gYmUgY2VudGVyZWRcbiAgICAgKi9cbiAgICB0aGlzLmFkanVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgbCA9ICgkKHdpbmRvdykud2lkdGgoKSAtIG92ZXJsYXlEaXYub3V0ZXJXaWR0aCgpICkgLyAyO1xuICAgICAgdmFyIHQgPSAoJCh3aW5kb3cpLmhlaWdodCgpIC0gb3ZlcmxheURpdi5oZWlnaHQoKSApIC8gMjtcblxuICAgICAgaWYodDwwKSB0ID0gMDtcblxuICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCA3Njgpe1xuICAgICAgICBsID0gMDsgLy8vIGlmIG1vYmlsZSBtYWtlIGl0IGNvdmVyIGFsbCBzY3JlZW5cbiAgICAgICAgdCA9IDA7XG4gICAgICB9XG5cbiAgICAgIG92ZXJsYXlEaXYuY3NzKCdsZWZ0JywgbCsncHgnKS5jc3MoJ3RvcCcsIHQrJ3B4Jyk7XG4gICAgfS8vLy8gZnVuLiBhZGp1c3RcblxuICAgICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgaWQ9XCJvdmVybGF5TWFza1wiIHN0eWxlPVwidG9wOjA7IHJpZ2h0OjA7IGJvdHRvbTowOyBsZWZ0OjA7IHBvc2l0aW9uOmZpeGVkOyBiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7IHotaW5kZXg6OTk5ODsgdG9wOjBweDsgbGVmdDowcHg7XCI+PC9kaXY+Jyk7XG4gICAgLy8gJCgnYm9keScpLmFwcGVuZCgnPGRpdiBpZD1cIm92ZXJsYXlNYXNrXCIgc3R5bGU9XCJ3aWR0aDonKyB3ICsncHg7IGhlaWdodDonKyBoICsncHg7IHBvc2l0aW9uOmFic29sdXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7IHotaW5kZXg6OTk5ODsgdG9wOjBweDsgbGVmdDowcHg7XCI+PC9kaXY+Jyk7XG4gICAgdmFyIG1hc2sgPSAkKCcjb3ZlcmxheU1hc2snKTtcbiAgICBtYXNrLmFkZENsYXNzKFwiZmFkZXRvOTBcIikuY3NzKFwib3BhY2l0eVwiLCAnMC42Jyk7XG5cbiAgICAvLyBhc3NpbmcgY2xpY2sgdG8gY2xvc2VcbiAgICBtYXNrLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsb3NlT3ZlcmxheSgpO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwZW5kIHRoZSBjbG9zZSBidXR0b25cbiAgICBpZihvdmVybGF5RGl2LmZpbmQoJy5jbG9zZScpLmxlbmd0aDw9MCl7XG4gICAgICAgIG92ZXJsYXlEaXYuYXBwZW5kKCc8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiIGNsYXNzPVwiY2xvc2UgaWNvbi1jbG9zZVwiPjxhLz4nKTtcbiAgICB9XG4gICAgb3ZlcmxheURpdi5maW5kKCcuY2xvc2UnKS5jc3MoJ3otaW5kZXgnLCAxMDAxKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBjbG9zZU92ZXJsYXkoKTtcbiAgICB9KTtcblxuICAgIGlmKG8ub25CZWZvcmVMb2FkKSBvLm9uQmVmb3JlTG9hZCgpO1xuXG4gICAgb3ZlcmxheURpdi5jc3MoJ3otaW5kZXgnLCc5OTk5JykucmVtb3ZlQ2xhc3MoJ2ZhZGVpbicpLnNob3coKS5hZGRDbGFzcygnZmFkZWluJyk7XG5cbiAgICAvKipcbiAgICAgKiBDZW50ZXIgdGhlIG92ZXJsYXkgZGl2XG4gICAgICovXG4gICAgdGhpcy5hZGp1c3QoKTtcblxuICAgIGlmKG8ub25BZnRlckxvYWQpIG8ub25BZnRlckxvYWQoKTtcblxuICAgIC8vLyBhZGQgbGlzdGVuZXIgZm9yIEVzYyBrZXlcbiAgICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgZnVuY3Rpb24oayl7XG4gICAgICAgIGlmKGsua2V5Q29kZSAmJiBrLmtleUNvZGUgPT0gMjcpIGNsb3NlT3ZlcmxheSgpO1xuICAgIH0pO1xuXG4gICAgLy8vLy8vLyBzZXQgcmVmZXJlbmNlIGluIGFwcGxpY2F0aW9uIHZhcmlhYmxlc1xuICAgIF9hcHBHbG9iYWwub3ZlcmxheSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcztcbn0vLyBlbmQgb2YgZnVuLiBvdmVybGF5XG5cbi8qKlxuICogW3Jlc2V0RmllbGRzIHdpbGwgc2VhcmNoIGZvciBpbnB1dCBmaWVsZCBpbnNpZGUgYSBjb250YWluZXIgYW5kIHJlc3QgaXRzIHZhbHVlIGFuZCBhbnkgZXJyb3Igc3RhdHVzXVxuICogQHBhcmFtICB7W3R5cGVdfSBjb250YWluZXIgW2pRdWV5ciBvYmplY3QgdGhhdCBzaG91bGQgY29udGFpbiBpbnB1dCBmaWxlZCB0aGF0IG5lZWQgYmUgcmVzZXRdXG4gKi9cbnZhciByZXNldEZpZWxkcyA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gIHZhciBmaWVsZHMgPSBjb250YWluZXIuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICB2YXIgdHlwZSA9ICQodGhpcykuYXR0cigndHlwZScpO1xuICAgIGlmKHR5cGUgPT09ICdyYWRpbycpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbHRlcignbGFiZWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgIH1cbiAgICAkKHRoaXMpLmhpZGVFcnJvcigpO1xuICB9KTtcblxufS8vLy8gZnVuLiByZXNldEZpZWxkc1xuXG4vKipcbiAqIFtpbmNsdWRlRmllbGRzIHdpbGwgYWRkIGhpZGRlbiBmaWVsZHMgaW4gZm9ybSBhbmQgc2V0IHRoZSByaWdodCB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgZS5nLiBcIi5uZXctZmllbGRzXCIsIFwiI2Nsb2RpbmdEYXRlXCJcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBpbmNsdWRlIGluIHZhbGlkYXRpb25cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbnZhciBpbmNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIGZpZWxkcy5zbGlkZURvd24oKTtcblxufVxuXG4vKipcbiAqIFtleGNsdWRlRmllbGRzIHdpbGwgZXhjbHVkZSBmaWVsZHMgZnJvbSBmb3JtIGFuZCBzZXQgcmVtb3ZlIHRoZSB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgZXhjbHVkZWRcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBleGNsdWRlZCBmcm9tIHZhbGlkYXRpb25cbiAqL1xudmFyIGV4Y2x1ZGVGaWVsZHMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMuc2VsZWN0b3IgfHwgIW9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcyA9ICQob3B0aW9ucy5zZWxlY3Rvcik7XG4gIGZpZWxkcy5maW5kKG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgcmVzZXRGaWVsZHMoZmllbGRzKTtcbiAgZmllbGRzLnNsaWRlVXAoKTtcbn1cblxuLyoqXG4gKiBbYWRkQXV0b0FkZHJlc3Mgd2lsbCBhZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gdGV4dCBmaWVsZCB3aXRoIGlkICdib19hZGRyZXNzJ11cbiAqIEBwYXJhbSB7W3R5cGVdfSBpbmRleCBbaW4gbXVsdGktYWRkcmVzcyBjYXNlIHRoaXMgdmFyaWFibGUgd2lsbCB0ZWwgdGhlIGZ1bmN0aW9uIHdoaWNoIGFkZHJlc3MgdG8gYmluZCB0aGUgdHlwZSBhaGVhZCB0b11cbiAqL1xuZnVuY3Rpb24gYWRkQXV0b0FkZHJlc3MoaW5kZXgsIHN0YXJ0RnJvbTEpe1xuICAgIHZhciBwb3N0ID0gaW5kZXggPj0gMiB8fCB0cnVlID09PSBzdGFydEZyb20xID8gJycraW5kZXggOiAnJztcblxuICAgIHZhciBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvX2FkZHJlc3MnICsgcG9zdCksXG4gICAgICAgICQoJy50eXBlYWhlYWRfYWRkcmVzcycgKyBwb3N0KS5maWx0ZXIoJ2lucHV0JylbMF0sXG4gICAgICAgIHt0eXBlczogWydnZW9jb2RlJ119XG4gICAgKTtcbiAgICAvLy8vIHNldCB0aGUgYWRkcmVzcyBpbmRleCBhbmQgcG9zdCBpbiBhdXRvY29tcGxldGUgb2JqZWN0IHRvIGJlIHVzZWQgaW4gZmlsbEluQWRkcmVzcyBmdW5jdGlvblxuICAgIGF1dG9jb21wbGV0ZS5pbmRleCA9IDA7XG4gICAgYXV0b2NvbXBsZXRlLnBvc3QgPSBwb3N0O1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBzZWxlY3RzIGFuIGFkZHJlc3MgZnJvbSB0aGUgZHJvcGRvd24sIHBvcHVsYXRlIHRoZSBhZGRyZXNzXG4gICAgLy8gZmllbGRzIGluIHRoZSBmb3JtLlxuICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsIGZpbGxJbkFkZHJlc3MpO1xufVxuXG4vKipcbiAqIFtmaWxsSW5BZGRyZXNzIHdpbGwgdXBkYXRlIHRoZSBhZGRyZXNzIGNpdHksIHN0YXQsIGFuZCB6aXAgZmlsZWQgYWZ0ZXIgdXNlciBzZWxlY3QgYWRkcmVzcyBmb3JtIHR5cGUgYWhlYWRdXG4gKiB0aGlzIGluc2lkZSB0aGlzIGZ1bmN0aW9uIHdpbGwgcmVmZXJlbmNlIGdvb2dsZSBhdXRvY29tcGV0ZSBvYmplY3RcbiAqIEByZXR1cm4ge1tudWxsXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaWxsSW5BZGRyZXNzKCl7XG4gICAgLy8vLyB0aGlzIHJlZmVyIHRvIHRoZSBhdXRvIGNvbXBsZXRlIG9iamVjdFxuXG4gICAgdmFyIHBsYWNlID0gdGhpcy5nZXRQbGFjZSgpO1xuICAgIHZhciBjb21wb25lbnRGb3JtID0ge1xuICAgICAgICBzdHJlZXRfbnVtYmVyOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIHJvdXRlOiAnbG9uZ19uYW1lJyxcbiAgICAgICAgbG9jYWxpdHk6ICdsb25nX25hbWUnLFxuICAgICAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzE6ICdzaG9ydF9uYW1lJyxcbiAgICAgICAgY291bnRyeTogJ2xvbmdfbmFtZScsXG4gICAgICAgIHBvc3RhbF9jb2RlOiAnc2hvcnRfbmFtZSdcbiAgICB9O1xuXG4gICAgdmFyIGFkZHJlc3MgPSB7fTtcbiAgICB2YXIgbG9uZ19uYW1lID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR5cGUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbMF07XG4gICAgICAgIHZhciBhZGRyZXNzVHlwZSA9IHR5cGU7XG5cbiAgICAgIGlmIChjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXSkge1xuICAgICAgICB2YXIgdmFsID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldW2NvbXBvbmVudEZvcm1bYWRkcmVzc1R5cGVdXTtcbiAgICAgICAgYWRkcmVzc1thZGRyZXNzVHlwZV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBpZihhZGRyZXNzVHlwZSA9PT0gJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpe1xuICAgICAgICAgICAgbG9uZ19uYW1lID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldWydsb25nX25hbWUnXTtcbiAgICAgICAgfVxuICAgIH0vLy8vIGZvclxuICAgIGFkZHJlc3MuYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xX2xvbmdfbmFtZSA9IGxvbmdfbmFtZTtcblxuICAgICQoJy50eXBlYWhlYWRfYWRkcmVzcycrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5zdHJlZXRfbnVtYmVyICsgJyAnICsgYWRkcmVzcy5yb3V0ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9jaXR5Jyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLmxvY2FsaXR5KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3N0YXRlJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgLy8gJCgnI3N0YXRlX2xhYmVsJyt0aGlzLnBvc3QpLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfemlwJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLnBvc3RhbF9jb2RlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbn1cbiIsIi8qKlxuICogVGhlc2UgZ2xvYmFsIHZhcmlhYmxlcyBzaGFyZWQgd2l0aCAwMi1jb2JvcnJvd2VyLmpzXG4gKiBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSwgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXg7XG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGxvZ2luRm9ybSwgbG9naW5PdmVybGF5LCBhcHBPdmVybGF5O1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGJvcnJvd2VyUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gYm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYm9ycm93ZXJGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjYm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYWRkcmVzc0luZGV4IHdpbGwgdHJhY2sgdGhlIG51bWJlciBvZiBhZGRyZXNzIGFkZGVkIGFuZCBzdG9wIGlmIHRvdGFsIG9mIDQgYWRkcmVzc11cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gMTtcblxuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsZCwgaW52YWxpZEZpZWxkcyl7XG5cbiAgICAgICAgICAgIGlmKGlzVmFsZCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNDb0JvcnJvd2VyID0gIFN0cmluZygnMjM0Jykuc3BsaXQoJycpLmluZGV4T2YoICQoJyNib19hcHBseXR5cGUnKS52YWwoKSApID4gLTE7XG5cbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc0NvQm9ycm93ZXIpe1xuICAgICAgICAgICAgICAgICAgICBteUZvcm0uYXR0cignYWN0aW9uJywgJzAyLWNvYm9ycm93ZXIuaHRtbCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbnRpbnVlQ2xpY2tlZClcbiAgICAgICAgICAgICAgICAvLy8vIGlmIHRoZSBmb3JtIGlzIG5vdCB2YWxpZCBhbmQgY29udGludWUgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0byB0aGUgcGFnZSB0byBmaXJzdCBmaWVsZCB3aXRoIGVycm9yXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpOyAgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vLy8gaWYgaXNWYWxpZCBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNsbFwiKVxuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIGV2ZW50IGhhbmRsZXJzIGFyZSBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSlcblxuXG5cbiAgICAgICAgJCgnI2JvX2hvd2hlYXInKS5vZmYoJ2NoYW5nZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLDEwKTtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbMiwzLDQsNV07XG4gICAgICAgICAgICBpZihhcnIuaW5kZXhPZih2YWwpID4gLTEpe1xuICAgICAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgICAgICovXG4gICAgICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2JvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgY2hhbmdlIG9mIHJhZGlvIGJ1dHRvbiBjdXJyZW50IGFkZHJlc3Mgb3duL3JlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9Ym9fY3VycmVudGx5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICB2YXIgcmVudENvbCA9ICQoJyNtb250aGx5UmVudCcpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbnRDb2wuZmluZCgnLmNjLWZpZWxkJykuZXEoMCk7XG4gICAgICAgICAgICBpZih2YWwudG9Mb3dlckNhc2UoKSA9PT0gJ3JlbnQnKXtcbiAgICAgICAgICAgICAgICByZW50Q29sLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJlbnRDb2wuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgbWVzc2FnZSBlcnJvcicpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLnNhZmFyaT09PSB0cnVlID8gJ2JsdXInIDogJ2NoYW5nZSc7IC8vLy8gY2hhbmdlIGlzIG5vdCBmaXJlZCB3aGVuIGF1dG9maWxsIGlzIHVzZWQgb24gc2FmYXJpXG4gICAgICAgICQoJyNib19lbWFpbCcpLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogbWFrZSBzdXJlIGVtYWlsIGZpZWxkIGlzIHZhbGlkYXRlIGJlZm9yZSBkb2luZyBhbnkgY2hlY2tcbiAgICAgICAgICAgICAqIGlkICNlbWFpbEZpZWxkIGlzIGdpdmVuIHRvIC5jYy1maWVsZCBjb250YWluZXIgb2YgZW1haWwgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJCgnI2VtYWlsRmllbGQnKS52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSAkLnRyaW0oJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9ICQodGhpcykuZGF0YSgnaXNWYWxpZCcpO1xuXG4gICAgICAgICAgICBpZih2YWwgJiYgdHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOlwiaHR0cDovL2FwcHMuc3RpcnJpbmdpbnRlcmFjdGl2ZS5jb20vYXBpLXJlc3BvbnNlL2lzLWVtYWlsLWV4aXN0cy5qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6e2VtYWlsOnZhbH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmVtYWlsLnRvTG93ZXJDYXNlKCkgPT0gdmFsLnRvTG93ZXJDYXNlKCkgJiYgcmV0LmV4aXN0cyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKHJldC5leGlzdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9Ly8vIGlmIHZhbFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgfS8vLy8gbm90IHZhbFxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gYWRkcmVzc1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogTG9naW4gRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgbG9naW5Gb3JtID0gJChcIiNsb2dpbkZvcm1cIik7XG4gICAgICAgIGxvZ2luT3ZlcmxheSA9ICQoXCIjbG9naW5PdmVybGF5XCIpO1xuICAgICAgICAkKCcjbG9naW5Gb3JtJykudmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBMb2dpbiBmb3JtIGlzIHZhbGlkIGRvIGFqYXggY2FsbCB0byBhdXRoZW50aWNhdGlvblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XG5cbiAgICAgICAgICAgICAgICBkYXRhLmVtYWlsID0gJC50cmltKCQoXCIjbG9naW5fZW1haWxcIikudmFsKCkpO1xuICAgICAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSAkLnRyaW0oJChcIiNsb2dpbl9wYXNzd29yZFwiKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IGxvZ2luT3ZlcmxheS5hZGRDbGFzcyhcImJ1c3lcIikuZmluZCgnLmVycm9yLW1lc3NhZ2UnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgbXNnLnRleHQobXNnLmF0dHIoJ2RhdGEtZGVmYXVsdCcpKTtcbiAgICAgICAgICAgICAgICAkKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbCgnJyk7XG5cbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6XCJodHRwOi8vYXBwcy5zdGlycmluZ2ludGVyYWN0aXZlLmNvbS9hcGktcmVzcG9uc2UvYXV0aGVudGljYXRpb24uanNvblwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5PdmVybGF5LnJlbW92ZUNsYXNzKCdidXN5JykuZmluZCgnLmVycm9yLW1lc3NhZ2UnKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSA9PT0gcmV0LnN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByZXQuZW1haWwudG9Mb3dlckNhc2UoKSA9PT0gZGF0YS5lbWFpbC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hcHBHbG9iYWwub3ZlcmxheS5jbG9zZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTG9naW5Gb3JtKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QXBwbGljYXRpb25zTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbk92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2J1c3knKS5maW5kKCcuZXJyb3ItbWVzc2FnZScpLnRleHQocmV0Lm1lc3NhZ2UpLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pOyAvLy8vIG5vIGNhbGxiYWNrIGlzIHJlcXVpcmVkXG5cbiAgICAgICAgJCgnI2xvZ2luU2tpcEJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2xvZ2luQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgICQoJyNsb2dpbl9lbWFpbCcpLnZhbCggJCgnI2JvX2VtYWlsJykudmFsKCkgKTtcblxuICAgICAgICAgICAgb3ZlcmxheSh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6JyNsb2dpbk92ZXJsYXknLFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlTG9hZDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAvLy8vIG5vdGhpbmdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlQ2xvc2U6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaGlkZUxvZ2luRm9ybSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBhcHBPdmVybGF5ID0gJCgnI2FwcHNMaXN0Jyk7XG5cblxuICAgICAgICAvLyBzaG93QXBwbGljYXRpb25zTGlzdCgpO1xuICAgIH07Ly8vLyBib3Jyb3dlclJlYWR5XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2dpblNlY3Rpb24oZW1haWxFeGlzdHMpe1xuICAgICAgICBpZih0cnVlID09PSBlbWFpbEV4aXN0cykge1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbG9naW5TZWN0aW9uJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfS8vLy8vIGZ1bi4gdXBkYXRlTG9naW5TZWN0aW9uXG5cbiAgICBmdW5jdGlvbiBoaWRlTG9naW5Gb3JtKCl7XG4gICAgICAgIHJlc2V0RmllbGRzKGxvZ2luRm9ybSk7IC8vLyByZXNldEZpZWxkcyBpbiBtYWluLmpzXG4gICAgICAgIGxvZ2luT3ZlcmxheS5yZW1vdmVDbGFzcygnYnVzeScpLmZpbmQoJy5lcnJvci1tZXNzYWdlJykuaGlkZSgpO1xuICAgIH0vLy8vIGZ1bi4gaGlkZUxvZ2luRm9ybVxuXG4gICAgZnVuY3Rpb24gbG9hZEFwcGxpY2F0aW9ucygpe1xuICAgICAgICBhcHBPdmVybGF5LmFkZENsYXNzKCdidXN5Jyk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9ICQoJyNhcHBUZW1wbGF0ZScpLnRleHQoKTtcbiAgICAgICAgdmFyIGFwcHNIb2xkZXIgPSAkKCcjYXBwc0hvbGRlcicpO1xuXG4gICAgICAgIHZhciBkYXRhID0ge307XG4gICAgICAgIGRhdGEuZW1haWwgPSAkLnRyaW0oICQoJyNsb2dpbl9lbWFpbCcpLnZhbCgpICk7XG4gICAgICAgIGRhdGEudXNlcklkID0gJzAwMDAwMDAnO1xuICAgICAgICBkYXRhLnVzZXJuYW1lID0gJ3VzYSc7XG4gICAgICAgIGRhdGEucGFzc3dvcmQgPSAnbmV3eW9yayc7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDpcImh0dHA6Ly9hcHBzLnN0aXJyaW5naW50ZXJhY3RpdmUuY29tL2FwaS1yZXNwb25zZS9hcHBsaWNhdGlvbnMtbGlzdC5qc29uXCIsXG4gICAgICAgICAgICBkYXRhOmRhdGEsXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXG4gICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcbiAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAvLyBsb2dpbk92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2J1c3knKS5maW5kKCcuZXJyb3ItbWVzc2FnZScpLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHJldCkpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgeDtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHg9MDsgeDxyZXQubGVuZ3RoOyB4Kyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHJldFt4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSB0ZW1wbGF0ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxhYmVsIGluIG9iail7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFx7XFwjJyArIGxhYmVsICsgJ1xcfScsICdnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gcm93LnJlcGxhY2UoIHJlZ2V4ICwgb2JqW2xhYmVsXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IC8vLyBmb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9ICQocm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBPdmVybGF5LmZpbmQoJ2EuY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwc0hvbGRlci5hcHBlbmQocm93KTtcbiAgICAgICAgICAgICAgICAgICAgfS8vLyBmb3JcblxuICAgICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLm92ZXJsYXkuYWRqdXN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGFwcE92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2J1c3knKTtcbiAgICAgICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgfS8vLy8gc3VjY2Vzc1xuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmdW4uIGxvYWRBcHBsaWNhdGlvbnNcblxuICAgIGZ1bmN0aW9uIHNob3dBcHBsaWNhdGlvbnNMaXN0KCl7XG4gICAgICAgIG92ZXJsYXkoe1xuICAgICAgICAgICAgc2VsZWN0b3I6JyNhcHBzTGlzdCcsXG4gICAgICAgICAgICBvbkJlZm9yZUxvYWQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBsb2FkQXBwbGljYXRpb25zKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25CZWZvcmVDbG9zZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJyNhcHBzSG9sZGVyJykuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfS8vLy8gZnVuLiBzaG93QXBwbGljYXRpb25zTGlzdFxuXG59KSgpO1xuXG5cblxuZnVuY3Rpb24gY2hlY2tBZGRyZXNzTGVuZ3RoKGNvbnRhaW5lciwgaW5kZXgpe1xuICAgIHZhciBwb3N0ID0gaW5kZXggPiAxID8gJycraW5kZXggOiAnJztcblxuICAgIGNvbnRhaW5lci5maW5kKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMClcbiAgICAuYXR0cignZGF0YS1hZGRyZXNzJywgaW5kZXgpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG5cbiAgICAgICAgdmFyIHllYXJzID0gcGFyc2VJbnQoJCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWFkZHJlc3MnKSwgMTApO1xuICAgICAgICBpZighdikgdiA9MDtcbiAgICAgICAgaWYoIXllYXJzKXtcbiAgICAgICAgICAgIHllYXJzID0gMDtcbiAgICAgICAgICAgICQoJy5hZGRyZXNzTGVuZ3RoWScgKyBwb3N0KS5lcSgwKS52YWwoMClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHllYXJzKXtcbiAgICAgICAgICAgIHYgKz0geWVhcnMgKiAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZih2IDwgMjQpe1xuICAgICAgICAgICAgYWRkQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgY29udGFpbmVyLmZpbmQoJy5hZGRyZXNzTGVuZ3RoWScgKyBwb3N0KS5lcSgwKVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWFkZHJlc3MnKSwgMTApO1xuXG4gICAgICAgIGlmKCF2KSB7XG4gICAgICAgICAgICB2ID0wO1xuICAgICAgICAgICAgJCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApLnZhbCgwKVxuICAgICAgICB9XG4gICAgICAgIGlmKCF5ZWFycykgeWVhcnMgPSAwO1xuXG4gICAgICAgIGlmKHllYXJzKXtcbiAgICAgICAgICAgIHYgKz0geWVhcnMgKiAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pXG59Ly8vLy8gZnVuLiBjaGVja0FkZHJlc3NMZW5ndGhcblxuZnVuY3Rpb24gYWRkQWRkcmVzcyhuZXh0SWQpe1xuICAgIGlmKG5leHRJZCA+PSA1KSByZXR1cm4gZmFsc2U7XG4gICAgaWYoX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXggPj0gbmV4dElkKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgc2VjdGlvbiA9ICQoJyNwcmVBZGRyZXNzJyk7XG4gICAgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXggPSBuZXh0SWQ7XG4gICAgdmFyIGFkZHJlc3MgPSAkKF9hcHBHbG9iYWwuYWRkcmVzc1RlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNcXH0pL2csIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4KSk7XG5cbiAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZC5jYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBhZGRyZXNzLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7IC8vLy8gZnVuLiBpbiBtYWluLmpzXG5cbiAgICBhZGRyZXNzLmZpbmQoJ2lucHV0Lm51bWJlcnMnKS5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycyk7XG5cbiAgICBjaGVja0FkZHJlc3NMZW5ndGgoYWRkcmVzcywgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpO1xuXG4gICAgc2VjdGlvbi5hcHBlbmQoYWRkcmVzcyk7XG4gICAgYWRkQXV0b0FkZHJlc3MoX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICBzZWN0aW9uLnNsaWRlRG93bigpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBZGRyZXNzKGlkUmVtb3ZlKXtcblxuICAgIGlmKGlkUmVtb3ZlIDw9MSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKGlkUmVtb3ZlID4gX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9X2FwcEdsb2JhbC5hZGRyZXNzSW5kZXg7IHgrKyl7XG4gICAgICAgIHZhciBhZGRyZXNzID0gc2VjdGlvbi5maW5kKCcjYWRkcmVzc18nICsgeCk7XG5cbiAgICAgICAgYWRkcmVzcy5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICBhZGRyZXNzLnJlbW92ZSgpO1xuICAgICAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIH1cbiAgICBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA9IGlkUmVtb3ZlLTE7XG4gICAgaWYoX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXggPD0gMSkgc2VjdGlvbi5zbGlkZVVwKClcbn1cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29Cb3Jyb3dlclJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGNvQm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjY29Cb3Jyb3dlckZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA9IDE7XG5cbiAgICAgICAgX2FwcEdsb2JhbC5hZGRyZXNzVGVtcGxhdGUgPSAkKCcjYWRkcmVzc1RlbXBsYXRlJykuaHRtbCgpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSlcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBjby1ib3Jyb3dlciBsaXZlIGluIGRpZmZlcmVudCBhZGRyZXNzXG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPWNvX2xpdmVzYW1lXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSAneWVzJyl7XG5cbiAgICAgICAgICAgICAgICAkKCcjYWRkcmVzc0RpdicpLnNsaWRlVXAoKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2MtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCBtZXNzYWdlJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgJCgnI3ByZUFkZHJlc3MnKS5zbGlkZVVwKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZURvd24oKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcblxuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVUYWJJbmRleChteUZvcm0pOyAvLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmFjayBidXR0b24gY2xpY2sgaGFuZGxlcnNcbiAgICAgICAgICovXG4gICAgICAgICQoJyNiYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oY2Upe1xuICAgICAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgICAgICogZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcbiAgICAgICAgICovXG4gICAgICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgbnVtYmVyIG9mIGRlcGVuZGVudHMgY2hhbmdlIGFuZCBzaG93IGFnZXMgZmllbGRzXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgICB2YXIgYWdlc0RpdiA9ICQoJyNkZXBlbmRlbnRTZWN0aW9uJyk7XG4gICAgICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZih2ID4gMCl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB4PTA7IHg8djsgeCsrKXtcbiAgICAgICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB1cGRhdGUgY28tYm9ycm93ZXIgbmFtZSBpbiBzdWIgdGl0bGVzXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbmFtZUhvbGRlciA9ICQoJy5jb0JvcnJvd2VyTmFtZScpO1xuICAgICAgICAkKCcjY29fZm5hbWUnKS5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkLnRyaW0oICQodGhpcykudmFsKCkgKTtcbiAgICAgICAgICAgIG5hbWVIb2xkZXIudGV4dCggdmFsID8gdmFsIDogJ0NvLUJvcnJvd2VyJyk7XG4gICAgICAgIH0pXG4gICAgfTsvLy8vIGNvQm9ycm93ZXJSZWFkeVxufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkocHVyY2hhc2VSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBwdXJjaGFzZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNwdXJjaGFzZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5zc24nKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFNTTilcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGVjayBpZiByZWFsIHN0YXRlIGFnZW50XG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X3VzaW5nYWdlbnRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIHZhciBhZ2VudCA9ICQoJyNhZ2VudENvbnRhY3QnKTtcbiAgICAgICAgICAgIHZhciBhZ2VudEZpZWxkcyA9ICQoJyNhZ2VudEZpZWxkcycpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRDb250YWN0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6JyNhZ2VudEZpZWxkcywgI2FnZW50Q29udGFjdCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTsvLy8vLyBvbi5jaGFuZ2VcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGVjayBpZiBjb250YWN0IGFnZW50XG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X2NvbnRhY3RhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRGaWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRGaWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHByb3BlcnR5XG4gICAgICAgICAqL1xuICAgICAgICAkKCcjcHVfc2VhcmNodHlwZXB1cmNoYXNlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlzUHJvcGVydHkgPSBTdHJpbmcoJzM0Jykuc3BsaXQoJycpLmluZGV4T2YodmFsKSA+IC0xO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSBpc1Byb3BlcnR5KXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5LWZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucHJvcGVydHktZmllbGRzLCAjc3ViTmFtZSwgI2Nsb3NpbmdEYXRlLCAjbW9udGhseUhPQScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtc3ViLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZywgLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7Ly8vIG9uLmNoYW5nZVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGVjayBpZiBIT0EgZHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV9wbGFubmVkdW5pdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1IT0EnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV9oYXZlY2xvc2luZ2RhdGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2Nsb3NpbmdEYXRlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2Nsb3NpbmdEYXRlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfbWFudWZhY3R1cmVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3ViJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXN1Yid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07Ly8vLyBwdXJjaGFzZVJlYWR5XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KHJlZmluYW5jZVJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIHJlZmluYW5jZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNyZWZpbmFuY2VGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5zc24nKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFNTTilcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfcHJvcGVydHlyZWZpbmFuY2luZ10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodmFsID09PSAnbm8nICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicub3RoZXJBZGRyZXNzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vdGhlckFkZHJlc3MnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIEhPQSBkdWVzXG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX3BsYW5uZWR1bml0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9mb3JzYWxlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNkYXRlT2ZmTWFya2V0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNkYXRlT2ZmTWFya2V0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX3N1YmplY3RdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2NvbnN0cnVjdGlvbkJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjb25zdHJ1Y3Rpb25CcmllZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9pc3RpdGxlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjdHJ1c3RCcmllZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjdHJ1c3RCcmllZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9tYW51ZmFjdHVyZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfaGF2ZU1vcnRnYWdlMV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZmlyc3RNb3J0Z2FnZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmZpcnN0TW9ydGdhZ2UsIC5zZWNvbmRNb3J0Z2FnZSwgLmNyZWRpdC1saW1pdCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2wnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX3NlY21vcnRnYWdlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zZWNvbmRNb3J0Z2FnZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnRnYWdlMid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWNvbmRNb3J0Z2FnZSwgLmNyZWRpdC1saW1pdCwgI2FkZGl0aW9uYWxMaWVucycsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnRnYWdlMiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsLCAuY2MtdG8tYmUtdmFsaWRhdGUtbGluZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfbW9ydGdhZ2UyTE9DXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jcmVkaXQtbGltaXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNyZWRpdC1saW1pdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1hc19hZGRpdGlvbmFsbGllbnNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FkZGl0aW9uYWxMaWVucycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpZW4nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZGRpdGlvbmFsTGllbnMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1saWVuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcbn0pKCk7IiwiLyoqXG4gKiBCZWxvdyBnbG9iYWwgdmFyaWFibGVzIGFyZSBzaGFyZWQgd2l0aCBjby1ib3Jyb3dlciBpbmNvbWUgcGFnZSAwNi1jby1pbmNvbWUuanNcbiAqIF9hcHBHbG9iYWwuZW1wbG95ZXJUZW1wbGF0ZSwgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4LCBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlcjtcbiAqIF9hcHBHbG9iYWwucmVudFRlbXBsYXRlLCBfYXBwR2xvYmFsLnJlbnRJbmRleCwgX2FwcEdsb2JhbC5yZW50c0hvbGRlciwgX2FwcEdsb2JhbC5yZW50c0FycmF5O1xuICovXG5cblxuKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoYm9JbmNvbWVSZWFkeSk7XG5cblxuICAgIGZ1bmN0aW9uIGJvSW5jb21lUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2JvSW5jb21lRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyVGVtcGxhdGUgPSAkKCcjZW1wbG95ZXJUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gMTtcbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIgPSAkKCcjZW1wbG95ZXJzSG9sZGVyJyk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUgPSAkKCcjcmVudFRtcGx0JykudGV4dCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgcmVudCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgcmVudCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyID0gJCgnI3JlbnRzSG9sZGVyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCByZW50IHByb3BlcnR5IGluZGV4XG4gICAgICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlbnRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCByZW50IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgcmVudCBoYXMgaW5kZXggb2YgNlxuICAgICAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVSZW50c0ZpZWxkcyBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgZW1wbG95ZXJzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyhteUluZGV4KTtcbiAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZShteUluZGV4KTtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IG15SW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIHJlbnQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePXJlX2FkZHJlc3NdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgncmVfYWRkcmVzcycpWzFdLCAxMCk7XG5cbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDEwMCArIG15SW5kZXgpO1xuXG4gICAgICAgICAgICBfYXBwR2xvYmFsLnJlbnRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkucHVzaChfYXBwR2xvYmFsLnJlbnRJbmRleCk7XG5cbiAgICAgICAgICAgIGJpbmRSZW50TW9ydGdhZ2UobXlJZCk7XG5cbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkaW5nIGdvb2dsZSBhZGRyZXNzIHR5cGUgYWhlYWRcbiAgICAgICAgICovXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmVtcGxveW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUoMSk7XG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5lbXBsb3ltZW50LCAucHJlRW1wbG95bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtLCAuY2MtdG8tYmUtdmFsaWRhdGUtcHJlJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA+IDEpe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFbXBsb3llcigyKTsgLy8vIHdpbGwgdGFrZSBjYXJlIG9mIHRoZSByZXN0IG9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWUzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zZWxmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNSlcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNlbGYnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hZGRpdGlvbmFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNilcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmFkZGl0aW9uYWwnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU1XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXRpcmVtZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldGlyZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zc24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZGl2aWRlbmQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lOV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVudGFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWRkIG5ldyBwcm9wZXJ0eSBpZiB0aGUgcHJvcGVydHkgY291bnQgaXMgMFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVSZW50KF9hcHBHbG9iYWwucmVudHNBcnJheVtfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICB9KVxuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcbn0pKCk7XG5cblxuZnVuY3Rpb24gYmluZEVtcGxveW1lbnREYXRlKGluZGV4KXtcblxuICAgIHZhciBmaWVsZHMgPSAkKCdpbnB1dC5zdGFydERhdGUnICsgaW5kZXggKyAnLCBpbnB1dC5lbmREYXRlJyArIGluZGV4KTtcbiAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLm1zaWUgPyAna2V5dXAnIDogJ2NoYW5nZSc7IC8vLyBjaGFuZ2UgaXMgbm90IGZpcmluZyBvbiBJRSAhISFcbiAgICBmaWVsZHMuZWFjaChmdW5jdGlvbigpe1xuXG4gICAgICAgICQodGhpcylcbiAgICAgICAgLm9mZihldmVudE5hbWUsIGNoZWNrRW1wbG95bWVudERhdGUpXG4gICAgICAgIC5vbihldmVudE5hbWUsIGNoZWNrRW1wbG95bWVudERhdGUpO1xuICAgIH0pXG4gICAgLy8gZmllbGRzLm9mZignY2hhbmdlJywgY2hlY2tFbXBsb3ltZW50RGF0ZSlcbn0vLy8vLyBmdW4uIGJpbmRFbXBsb3ltZW50RGF0ZVxuXG5mdW5jdGlvbiBhZGRFbXBsb3llcihpbmRleCl7XG4gICAgLyoqXG4gICAgICogTGltaXQgdG8gNCBwcmV2aW91cyBlbXBsb3llcnNcbiAgICAgKi9cbiAgICBpZihpbmRleCA+IDQpIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIEVtcGxveWVycyBzaG91bGQgYmUgYWRkZWQgaW4gaW5jcmVhc2luZyBpbmRleFxuICAgICAqL1xuICAgIGlmKGluZGV4IDwgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgZW1wbG95ZXIgd2l0aCBpbmRleCBpcyBhbHJlYWR5IGFkZGVkIGRvIG5vdGhpbmdcbiAgICAgKi9cbiAgICBpZigkKCcjZW1wbG95ZXJfJyArIGluZGV4KS5sZW5ndGggPiAwKXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IGluZGV4O1xuXG4gICAgdmFyIGVtcGxveWVyID0gJChfYXBwR2xvYmFsLmVtcGxveWVyVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KSk7XG5cbiAgICBmaWxsU3RhdGVEcm9wZG93biggZW1wbG95ZXIuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIHllc05vUmFkaW8oZW1wbG95ZXIpO1xuICAgIGRyb3Bkb3duTGFiZWwoZW1wbG95ZXIpO1xuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlci5hcHBlbmQoZW1wbG95ZXIpO1xuXG4gICAgYWRkQXV0b0FkZHJlc3MoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KTtcbiAgICBiaW5kRW1wbG95bWVudERhdGUoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICBlbXBsb3llci5zbGlkZURvd24oKTtcbn0vLy8vIGZ1bi4gYWRkRW1wbG95ZXJcblxuZnVuY3Rpb24gcmVtb3ZlRW1wbG95ZXIocmVtb3ZlSW5kZXgpe1xuXG4gICAgaWYocmVtb3ZlSW5kZXggPD0gMSkgcmV0dXJuO1xuICAgIC8vIGlmKHJlbW92ZUluZGV4ID4gNCkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PXJlbW92ZUluZGV4OyB4PD1fYXBwR2xvYmFsLmVtcGxveWVySW5kZXg7IHgrKyl7XG4gICAgICAgICQoJyNlbXBsb3llcl8nICsgeCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykuZGV0YWNoKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IHJlbW92ZUluZGV4IC0gMTtcbn1cblxuZnVuY3Rpb24gY2hlY2tFbXBsb3ltZW50RGF0ZShldil7XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBlbmQgZGF0ZSBhbmQgYWRkIHByZXZpb3VzIGpvYiBpZiBhcHBsaWNhYmxlXG4gICAgICovXG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIHZhciBlbmREYXRlRmllbGQgPSAkKCcuZW5kRGF0ZScraW5kZXgpLmVxKDApO1xuICAgIHZhciBzdGFydERhdGVGaWVsZCA9ICQoJy5zdGFydERhdGUnK2luZGV4KS5lcSgwKTtcbiAgICB2YXIgZW5kRGF0ZSwgc3RhcnREYXRlO1xuXG4gICAgaWYoZW5kRGF0ZUZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZW5kRGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZihzdGFydERhdGVGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgdmFyIGRhdGVTcGxpdCA9IHN0YXJ0RGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihlbmREYXRlIDw9IHN0YXJ0RGF0ZSl7XG4gICAgICAgIGVuZERhdGVGaWVsZC5hZGRFcnJvcignY2MtZGF0ZS1ndCcpLnNob3dFcnJvcigpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihlbmREYXRlIC0gc3RhcnREYXRlIDwgIDIgKiAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwICl7XG4gICAgICAgICAgICAvLyBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByZUVtcGxveW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1wcmUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkRW1wbG95ZXIoaW5kZXgrMSlcbiAgICAgICAgfS8vLy9cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKGluZGV4KzEpXG4gICAgICAgIH1cbiAgICB9Ly8vLyBlbHNlXG59Ly8vLyBmdW4uIGNoZWNrRW1wbHltZW50RGF0ZVxuXG5mdW5jdGlvbiBhZGRSZW50KCl7XG5cbiAgICBpZihfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgIF9hcHBHbG9iYWwucmVudEluZGV4Kys7XG4gICAgX2FwcEdsb2JhbC5yZW50c0FycmF5LnB1c2goX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuICAgIHZhciB0ZW1wbGF0ZSA9IF9hcHBHbG9iYWwucmVudFRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuXG4gICAgdmFyIGlkID0gX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aDtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAvKipcbiAgICAgKiBbYWRkcmVzc0luZGV4IGlzIHVzZWQgdG8gaGVscCBhZGQgYW5kIHRyYWNrIHRoZSBhZGRyZXNzIGZpZWxkcyBmb3IgdHlwZSBhaGVhZCBhZGRyZXNzIGZ1bmN0aW9uYWxpdHldXG4gICAgICogMTAwICsgaXMgYWRkZWQgdG8gZGlmZmVyZW50aWF0ZSB0aGUgcmVudCBwcm9wZXJ0eSBhZGRyZXNzIGZpZWxkcyBmcm9tIGVtcGxveWVyIGFkZHJlc3MgZmllbGRzXG4gICAgICovXG4gICAgdmFyIGFkZHJlc3NJbmRleCA9IDEwMCArIF9hcHBHbG9iYWwucmVudEluZGV4O1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4UGx1c1xcfSkvZywgYWRkcmVzc0luZGV4KTtcblxuXG4gICAgdmFyIHJlbnQgPSAkKHRlbXBsYXRlKTtcblxuICAgIHJlbnQuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgIH0pO1xuXG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIHJlbnQuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIC8qKlxuICAgICAqIFNldCB5ZXMvbm8gcmFkaW8gYnV0dG9uIGJlaGF2aW9yXG4gICAgICovXG4gICAgeWVzTm9SYWRpbyhyZW50KTtcbiAgICBkcm9wZG93bkxhYmVsKHJlbnQpO1xuXG5cblxuICAgIC8qKlxuICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICovXG4gICAgcmVudC5maW5kKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICByZW50LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIuYXBwZW5kKHJlbnQpO1xuXG4gICAgcmVudC5zbGlkZURvd24oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtb3J0Z2FnZSB5ZXMvbm8gYWN0aW9uXG4gICAgICovXG4gICAgYmluZFJlbnRNb3J0Z2FnZShpZCk7XG5cbiAgICBhZGRBdXRvQWRkcmVzcyhhZGRyZXNzSW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gYWRkUmVudFxuXG5mdW5jdGlvbiByZW1vdmVSZW50KHJlbW92ZUluZGV4KXtcbiAgICB2YXIgcG9zaXRpb24gPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAkKCcjcHJvcGVydHlfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIF9hcHBHbG9iYWwucmVudHNBcnJheS5zcGxpY2UocG9zaXRpb24sIDEpO1xuXG4gICAgdXBkYXRlUmVudHNGaWVsZHMoKTtcblxuICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xufS8vLy8gZnVuLiByZW1vdmVSZW50XG5cbi8qKlxuICogW3VwZGF0ZVJlbnRzRmllbGRzIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbnQgcHJvcGVydHkgbmFtZSBhbmQgaWQgaXMgYWx3YXlzIGluIHNlcmllcyBvZiAxLDIsMyw0LC4uLi5dXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRSZW50IGFuZCByZW1vdmVSZW50XG4gKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUmVudHNGaWVsZHMoKXtcbiAgICB2YXIgbGltaXQgPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoO1xuICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwucmVudHNBcnJheVt4XTtcblxuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcblxuICAgICAgICByZW50RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0vLy8vIGZvciB4XG59Ly8vLyBmdW4uIHVwZGF0ZVJlbnRzRmllbGRzXG5cbi8qKlxuICogW3VwZGF0ZVJlbnRDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBwcm9wZXJ0eV1cbiAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkUmVudCBhbmQgcmVtb3ZlUmVudFxuICovXG5mdW5jdGlvbiB1cGRhdGVSZW50Q2xvc2VCdG4oKXtcbiAgICBpZihfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwucmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5yZW50c0FycmF5WzBdO1xuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcbiAgICAgICAgcmVudERpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgIH1cblxuICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgIC8vICQoJyNhZGRSZW50UHJvcGVydHknKS5hdHRyKHsnZGlzYWJsZWQnOnRydWV9KS5jc3MoeydvcGFjaXR5JzowLjV9KTtcbiAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmhpZGUoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgLy8gJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmF0dHIoeydkaXNhYmxlZCc6ZmFsc2V9KS5jc3MoeydvcGFjaXR5JzoxfSk7XG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgfVxuXG59Ly8vLyBmdW4uIHVwZGF0ZVJlbnRDbG9zZUJ0blxuXG5mdW5jdGlvbiBiaW5kUmVudE1vcnRnYWdlKGluZGV4KXtcbiAgICAkKCdpbnB1dC5tb3J0Z2FnZVJhZGlvJytpbmRleCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBteUluZGV4ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIHZhciBteVZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgbXlWYWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2UnK215SW5kZXgsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQnK215SW5kZXh9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2UnK215SW5kZXgsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQnK215SW5kZXh9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcbn0vLy8vIGZ1bi4gYmluZFJlbnRNb3J0Z2FnZSIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGNvSW5jb21lUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gY29JbmNvbWVSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjY29JbmNvbWVGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWxvdyBnbG9iYWwgdmFyaWFibGVzIGRlZmluZWQgaW4gMDUtaW5jb21lLmpzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyVGVtcGxhdGUgPSAkKCcjZW1wbG95ZXJUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gMTtcbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIgPSAkKCcjZW1wbG95ZXJzSG9sZGVyJyk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUgPSAkKCcjcmVudFRtcGx0JykudGV4dCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIHJlbnQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50SW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50c0hvbGRlciB0aGUgZGl2IHdoZXJlIHJlbnQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0hvbGRlciA9ICQoJyNyZW50c0hvbGRlcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggcmVudCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyByZW50cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgcmVudCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIHJlbnQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlUmVudHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNBcnJheSA9IFtdO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGVtcGxveWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MobXlJbmRleCk7XG4gICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUobXlJbmRleCk7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSBteUluZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciByZW50IHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1yZV9jb19hZGRyZXNzXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ3JlX2NvX2FkZHJlc3MnKVsxXSwgMTApO1xuXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxMDAgKyBteUluZGV4KTtcblxuICAgICAgICAgICAgX2FwcEdsb2JhbC5yZW50SW5kZXggPSBteUluZGV4O1xuICAgICAgICAgICAgX2FwcEdsb2JhbC5yZW50c0FycmF5LnB1c2goX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuXG4gICAgICAgICAgICBiaW5kUmVudE1vcnRnYWdlKG15SWQpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWUyXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKDEpO1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZW1wbG95bWVudCwgLnByZUVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSwgLmNjLXRvLWJlLXZhbGlkYXRlLXByZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBpZihfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPiAxKXtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW1wbG95ZXIoMik7IC8vLyB3aWxsIHRha2UgY2FyZSBvZiB0aGUgcmVzdCBvZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lM10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2VsZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDUpXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWxmJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZidcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYWRkaXRpb25hbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDYpXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5hZGRpdGlvbmFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0aXJlbWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXRpcmVtZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc3NuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc3NuJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU3XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jaGlsZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuY2hpbGQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lOF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZGl2aWRlbmQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmRpdmlkZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVudGFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWRkIG5ldyBwcm9wZXJ0eSBpZiB0aGUgcHJvcGVydHkgY291bnQgaXMgMFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVSZW50KF9hcHBHbG9iYWwucmVudHNBcnJheVtfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICB9KVxuXG4gICAgfTsvLy8vIGNvSW5jb21lUmVhZHlcbn0pKCk7XG4iLCIvKipcbiAqIEdsb2JhbCB2YXJpYWJsZXMgZm9yIHRoaXMgcGFnZVxuICogdmFyIF9hcHBHbG9iYWwuYXNzZXRUZW1wbGF0ZSwgX2FwcEdsb2JhbC5hc3NldEluZGV4LCBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlciwgX2FwcEdsb2JhbC5hc3NldHNBcnJheTtcbiAqIHZhciBfYXBwR2xvYmFsLmVzdGF0ZVRlbXBsYXRlLCBfYXBwR2xvYmFsLmVzdGF0ZUluZGV4LCBfYXBwR2xvYmFsLmVzdGF0ZXNIb2xkZXIsIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5O1xuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoYXNzZXRzUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gYXNzZXRzUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2Fzc2V0c0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0VGVtcGxhdGUgPSAkKCcjYXNzZXRUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVUZW1wbGF0ZSA9ICQoJyNlc3RhdGVUbXBsdCcpLnRleHQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYXNzZXRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSBhc3NldCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0SW5kZXggPSAwO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZUluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYXNzZXRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgYXNzZXQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIgPSAkKCcjYXNzZXRzSG9sZGVyJyk7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0hvbGRlciA9ICQoJyNlc3RhdGVIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYXNzZXRzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCBhc3NldCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyBhc3NldHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IGFzc2V0IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgYXNzZXQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlYXNzZXRzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0FycmF5ID0gW107XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBhc3NldFxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1hc19iYW5rXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ2FzX2JhbmsnKVsxXSwgMTApO1xuXG5cbiAgICAgICAgICAgIF9hcHBHbG9iYWwuYXNzZXRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0FycmF5LnB1c2goX2FwcEdsb2JhbC5hc3NldEluZGV4KTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZUFzc2V0KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICQoJyNhZGRBbm90aGVyQXNzZXQnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGFkZEFzc2V0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNhZGRBbm90aGVyRXN0YXRlJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBhZGRFc3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1hc19hc3NldHNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZWxheSBhZGRpbmcgZm9yIHNtb290aCBzbGlkIGRvd24gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBhZGRBc3NldCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFzc2V0cycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWRUb1JlbW92ZSA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhc3NldF8nICsgaWRUb1JlbW92ZSkuc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hc3NldHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1hc19hZGRpdGlvbmFscmVhbGVzdGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZWxheSBhZGRpbmcgZm9yIHNtb290aCBzbGlkIGRvd24gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBhZGRFc3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkVG9SZW1vdmUgPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2VzdGF0ZV8nICsgaWRUb1JlbW92ZSkuc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuXG5cbiAgICBmdW5jdGlvbiBhZGRBc3NldCgpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0SW5kZXgrKztcbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNBcnJheS5wdXNoKF9hcHBHbG9iYWwuYXNzZXRJbmRleCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IF9hcHBHbG9iYWwuYXNzZXRUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIF9hcHBHbG9iYWwuYXNzZXRJbmRleCk7XG5cbiAgICAgICAgdmFyIGlkID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGg7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgICAgICB2YXIgYXNzZXQgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBhc3NldC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlQXNzZXQoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAgICAgKi9cblxuICAgICAgICBhc3NldC5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgZHJvcGRvd25MYWJlbChhc3NldCk7XG5cblxuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlci5hcHBlbmQoYXNzZXQpO1xuXG4gICAgICAgIGFzc2V0LnNsaWRlRG93bigpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbiAgICB9Ly8vLyBmdW4uIGFkZFJlbnRcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFzc2V0KHJlbW92ZUluZGV4KXtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheS5pbmRleE9mKHJlbW92ZUluZGV4KTtcblxuICAgICAgICAkKCcjYXNzZXRfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVBc3NldHNGaWVsZHMoKTtcblxuICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVBc3NldFxuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUFzc2V0c0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRBc3NldCBhbmQgcmVtb3ZlQXNzZXRcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUFzc2V0c0ZpZWxkcygpe1xuICAgICAgICB2YXIgbGltaXQgPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aDtcbiAgICAgICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICAgICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5W3hdO1xuXG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjYXNzZXRfJytpbmRleCk7XG5cbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vLyBmb3IgeFxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlQXNzZXRzRmllbGRzXG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiBbdXBkYXRlQXNzZXRzQ2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgYXNzZXRdXG4gICAgLy8gICogaXQgd2lsbCBiZSBjYWxsZWQgZnJvbSBhZGRBc3NldCBhbmQgcmVtb3ZlQXNzZXRcbiAgICAvLyAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVBc3NldENsb3NlQnRuKCl7XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjYXNzZXRfJytpbmRleCk7XG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldENsb3NlQnRuXG5cblxuICAgIGZ1bmN0aW9uIGFkZEVzdGF0ZSgpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVJbmRleCsrO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5wdXNoKF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBfYXBwR2xvYmFsLmVzdGF0ZVRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgX2FwcEdsb2JhbC5lc3RhdGVJbmRleCk7XG5cbiAgICAgICAgdmFyIGlkID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAgICAgdmFyIGVzdGF0ZSA9ICQodGVtcGxhdGUpO1xuXG4gICAgICAgIGVzdGF0ZS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlRXN0YXRlKGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgICAgICovXG5cbiAgICAgICAgZXN0YXRlLmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZXNIb2xkZXIuYXBwZW5kKGVzdGF0ZSk7XG5cbiAgICAgICAgZHJvcGRvd25MYWJlbChlc3RhdGUpO1xuICAgICAgICB5ZXNOb1JhZGlvKGVzdGF0ZSk7XG4gICAgICAgIGZpbGxTdGF0ZURyb3Bkb3duKGVzdGF0ZSk7XG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgsIHRydWUpOyAvLy8gdHJ1ZSBpcyB0byBmb3JjZSB0aGUgbGFiZWwgdG8gc3RhcnQgZnJvbSAxLCBkZWZhdWx0IDEgd2lsbCBiZSBpZ25vcmVkXG4gICAgICAgIGJpbmRFc3RhdGVNb3J0Z2FnZShfYXBwR2xvYmFsLmVzdGF0ZUluZGV4KTtcblxuICAgICAgICBlc3RhdGUuc2xpZGVEb3duKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICAgICAgdXBkYXRlRXN0YXRlQ2xvc2VCdG4oKTtcbiAgICB9Ly8vLyBmdW4uIGFkZFJlbnRcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUVzdGF0ZShyZW1vdmVJbmRleCl7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNlc3RhdGVfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAgICAgdXBkYXRlRXN0YXRlc0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVBc3NldFxuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUVzdGF0ZXNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgRXN0YXRlIG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICAgICAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZEVzdGF0ZSBhbmQgcmVtb3ZlRXN0YXRlXG4gICAgICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4gICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVFc3RhdGVzRmllbGRzKCl7XG4gICAgICAgIHZhciBsaW1pdCA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICAgICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheVt4XTtcblxuICAgICAgICAgICAgdmFyIGVzdGF0ZURpdiA9ICQoJyNlc3RhdGVfJytpbmRleCk7XG5cbiAgICAgICAgICAgIGVzdGF0ZURpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7bmFtZTpuZXdOYW1lLCBpZDpuZXdOYW1lfSk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfS8vLy8gZm9yIHhcbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZWVzdGF0ZXNGaWVsZHNcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVFc3RhdGVzQ2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgRXN0YXRlXVxuICAgICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkRXN0YXRlIGFuZCByZW1vdmVFc3RhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVFc3RhdGVDbG9zZUJ0bigpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgZXN0YXRlRGl2ID0gJCgnI2VzdGF0ZV8nK2luZGV4KTtcbiAgICAgICAgICAgIGVzdGF0ZURpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBlc3RhdGVEaXYgPSAkKCcjZXN0YXRlXycraW5kZXgpO1xuICAgICAgICAgICAgZXN0YXRlRGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckVzdGF0ZScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJFc3RhdGUnKS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlRXN0YXRlQ2xvc2VCdG5cblxuICAgIGZ1bmN0aW9uIGJpbmRFc3RhdGVNb3J0Z2FnZShpbmRleCl7XG4gICAgICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICAgIHZhciBteVZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhteUluZGV4LCBteVZhbClcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgbXlWYWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmdW4uIGJpbmRFc2F0ZU1vcnRnYWdlXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkobGlhYmlsaXRpZXNSZWFkeSk7XG4gICAgdmFyIGxpYWJpbGl0eVRlbXBsYXRlLCBsaWFiaWxpdHlJbmRleCwgbGlhYmlsaXRpZXNIb2xkZXIsIGxpYWJpbGl0aWVzQXJyYXk7XG5cbiAgICBmdW5jdGlvbiBsaWFiaWxpdGllc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNsaWFiaWxpdGllc0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdHlUZW1wbGF0ZSA9ICQoJyNsaWFiaWxpdHlUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdHlJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSBhc3NldCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdHlJbmRleCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdGllc0hvbGRlciB0aGUgZGl2IHdoZXJlIGFzc2V0IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyID0gJCgnI2xpYWJpbGl0aWVzSG9sZGVyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdGllc0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggYXNzZXQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgYXNzZXRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCBhc3NldCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIGFzc2V0IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgYXNzZXRcbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49bGlfY3JlZGl0b3JdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnbGlfY3JlZGl0b3InKVsxXSwgMTApO1xuXG5cbiAgICAgICAgICAgIGxpYWJpbGl0eUluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG5cbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICByZW1vdmVMaWFiaWxpdHkoaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpYWJpbGl0aWVzQXJyYXkpXG4gICAgICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgJCgnI2FkZEFub3RoZXJMaWFiaWxpdHknKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkTGlhYmlsaXR5KCk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBsaWFiaWxpdGllc1JlYWR5XG5cblxuXG4gICAgZnVuY3Rpb24gYWRkTGlhYmlsaXR5KCl7XG5cbiAgICAgICAgaWYobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgICAgIGxpYWJpbGl0eUluZGV4Kys7XG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGxpYWJpbGl0eVRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgbGlhYmlsaXR5SW5kZXgpO1xuXG4gICAgICAgIHZhciBpZCA9IGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAgICAgdmFyIGxpYWJpbGl0eSA9ICQodGVtcGxhdGUpO1xuXG4gICAgICAgIGxpYWJpbGl0eS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlTGlhYmlsaXR5KGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgICAgICovXG5cbiAgICAgICAgbGlhYmlsaXR5LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICB5ZXNOb1JhZGlvKGxpYWJpbGl0eSk7XG4gICAgICAgIGRyb3Bkb3duTGFiZWwobGlhYmlsaXR5KTtcblxuXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyLmFwcGVuZChsaWFiaWxpdHkpO1xuXG4gICAgICAgIGxpYWJpbGl0eS5zbGlkZURvd24oKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gYWRkUmVudFxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlhYmlsaXR5KHJlbW92ZUluZGV4KXtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbGlhYmlsaXRpZXNBcnJheS5pbmRleE9mKHJlbW92ZUluZGV4KTtcblxuICAgICAgICAkKCcjbGlhYmlsaXR5XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAgICAgdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMoKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gcmVtb3ZlTGlhYmlsaXR5XG5cbiAgICAvKipcbiAgICAgKiBbdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgYXNzZXQgbmFtZSBhbmQgaWQgaXMgYWx3YXlzIGluIHNlcmllcyBvZiAxLDIsMyw0LC4uLi5dXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzKCl7XG4gICAgICAgIHZhciBsaW1pdCA9IGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoO1xuICAgICAgICBpZihsaW1pdCA8IDEpIHJldHVybjtcblxuICAgICAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbeF07XG5cbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNsaWFiaWxpdHlfJytpbmRleCk7XG5cbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vLyBmb3IgeFxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHNcblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFt1cGRhdGVBc3NldHNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBhc3NldF1cbiAgICAvLyAgKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZExpYWJpbGl0eSBhbmQgcmVtb3ZlTGlhYmlsaXR5XG4gICAgLy8gICovXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlhYmlsaXR5Q2xvc2VCdG4oKXtcblxuICAgICAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNsaWFiaWxpdHlfJytpbmRleCk7XG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBsaWFiaWxpdGllc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckxpYWJpbGl0eScpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldENsb3NlQnRuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGRlY2xhcmF0aW9uc1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGRlY2xhcmF0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNkZWNsYXJhdGlvbnNGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWRlX293bmVyc2hpcF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPW90X3dvcmtpbmd3aXRoXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95ZWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95ZWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfY2l0aXplbl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICdubycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVzaWRlbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVzaWRlbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfYnByaW1hcnldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vd25lcnNoaXAnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicub3duZXJzaGlwLCAucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9Oy8vLy8gZGVjbGFyYXRpb25zUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGNvRGVjbGFyYXRpb25zUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gY29EZWNsYXJhdGlvbnNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjY29EZWNsYXJhdGlvbnNGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9jb19jaXRpemVuXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ25vJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hbGllbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hbGllbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBjb0RlY2xhcmF0aW9uc1JlYWR5XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGdvdmVybm1lbnRSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBnb3Zlcm5tZW50UmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2dvdkZvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgfTsvLy8vIGdvdmVybm1lbnRSZWFkeVxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShhY2tSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBhY2tSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYWNrRm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gYWNrUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGVkaXNjbG9zdXJlUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZWRpc2Nsb3N1cmVSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjZWRpc2Nsb3N1cmVGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBlZGlzY2xvc3VyZVJlYWR5XG59KSgpO1xuXG5cblxuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShpbnN0cnVjdGlvbnNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBpbnN0cnVjdGlvbnNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjaW5zdHJ1Y3Rpb25zRm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gaW5zdHJ1Y3Rpb25zUmVhZHlcbn0pKCk7XG5cblxuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShkZXBvc2l0UmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZGVwb3NpdFJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNkZXBvc2l0Rm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgICQoJ2lucHV0LmNhcmRleHBpcmF0aW9uJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q2FyZERhdGUpO1xuXG5cbiAgICB9Oy8vLy8gZGVwb3NpdFJlYWR5XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
