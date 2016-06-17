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


            var extra = callback(isFormValid, invalidFields.length > 0 ? invalidFields : null);

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
 * @type {Object}
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
                    url:"api-response/is-email-exists.json",
                    data:{email:val},
                    method:"post",
                    dataType:"json",
                    error:function(err){
                        console.log(err);
                        updateLoginSection(false);
                    },
                    success:function(ret){
                        if(ret.email.toLowerCase() == val.toLowerCase() ){
                            updateLoginSection(ret.exists);
                            if(ret.exists === true){
                                $('#login_email').val(val);
                            }
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

    };//// borrowerReady

    function updateLoginSection(emailExists){
        if(true === emailExists) {
            includeFields({selector:'#loginSection', validationClass:'.cc-to-be-validate'}); //// function in main.js
        }
        else{
            excludeFields({selector:'#loginSection', validationClass:'.cc-to-be-validate'}); //// function in main.js
        }
    }///// fun. updateLoginSection
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwic3VwcG9ydC5qcyIsIm1haW4uanMiLCIwMS1ib3Jyb3dlci5qcyIsIjAyLWNvYm9ycm93ZXIuanMiLCIwMy1wdXJjaGFzZS5qcyIsIjA0LXJlZmluYW5jZS5qcyIsIjA1LWluY29tZS5qcyIsIjA2LWNvLWluY29tZS5qcyIsIjA3LWFzc2V0cy5qcyIsIjA4LWxpYWJpbGl0aWVzLmpzIiwiMDktZGVjbGFyYXRpb25zLmpzIiwiMTAtY28tZGVjbGFyYXRpb25zLmpzIiwiMTEtZ292ZXJubWVudC5qcyIsIjEyLWFja25vd2xlZGdlbXRuLmpzIiwiMTMtZWRpc2Nsb3N1cmUuanMiLCIxNC1pbnN0cnVjdGlvbnMuanMiLCIxNS1kZXBvc2l0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNob0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbmtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c1N0YXRlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbGFiYW1hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQUtcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBcml6b25hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29sb3JhZG9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNPXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGVsYXdhcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRFXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRDXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJGTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkZsb3JpZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR2VvcmdpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiR0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHdWFtXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHVVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkhhd2FpaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSElcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJZGFob1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSURcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbGxpbm9pc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbmRpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklvd2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTEFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYWluZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1BXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWljaGlnYW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1JXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNT1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1vbnRhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1UXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmVicmFza2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5FXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV2YWRhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOVlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1QXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2hpb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0hcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPa2xhaG9tYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0tcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPcmVnb25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9SXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGFsYXVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBXXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0NcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlNEXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRleGFzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUWFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlV0YWhcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlVUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmVybW9udFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVlRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVkFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldWXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIld5b21pbmdcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldZXCJcbiAgICAgIH1cbiAgXTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgJC5mbi52YWxpZGF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmb3JtID0gdGhpcy5maWx0ZXIoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICBmb3JtLm9mZignc3VibWl0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICAgICAgZm9ybS5maW5kKCcuY2MtZmllbGQuY2MtdmFsaWRhdGUnKS5lYWNoKGZ1bmN0aW9uKG4pe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBzZWxmLnZhbGlkYXRlRmllbGQoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8vLyBmYWxzZSBhbmQgdHJ1ZSBzdHJpY3RseSB0ZXN0IGFzIG51bGwgd2lsbCByZXR1cm5lZCBpcyBmaWVsZCBpcyBub3QgdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgaWYoZmFsc2UgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHNlbGYuZmluZCgnbGFiZWwnKS5lcSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZkVyciA9IHtmaWxlZDpsYWJlbC50ZXh0KCksIGlkOmZpZWxkLmF0dHIoJ2lkJyksIGVycm9yOmVycn07XG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWVsZHMucHVzaChmRXJyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyAvLy8gLmVhY2hcblxuXG4gICAgICAgICAgICB2YXIgZXh0cmEgPSBjYWxsYmFjayhpc0Zvcm1WYWxpZCwgaW52YWxpZEZpZWxkcy5sZW5ndGggPiAwID8gaW52YWxpZEZpZWxkcyA6IG51bGwpO1xuXG4gICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmICEhZXh0cmE7XG5cblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNGb3JtVmFsaWQpe1xuICAgICAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsvLy8vIC5vbiBzdWJtaXRcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHZhciBnZXRNeUNvbnRhaW5lciA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICAgICAgdmFyIHAgPSBmaWVsZC5wYXJlbnQoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gcC5oYXNDbGFzcygnY2MtZmllbGQnKSl7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGdldE15Q29udGFpbmVyKHApO1xuICAgICAgICB9XG4gICAgfS8vLy8gZnVuLiBnZXRNeUNvbnRhaW5lclxuXG5cbiAgICB2YXIgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoJCh0aGlzKSk7XG4gICAgICAgIGNvbnRhaW5lci52YWxpZGF0ZUZpZWxkKClcbiAgICB9XG5cbiAgICAkLmZuLnZhbGlkYXRlRmllbGQgPSBmdW5jdGlvbihzZWxmKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZiA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCAgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgdmFyIHYgPSAkLnRyaW0oZi52YWwoKSk7XG4gICAgICAgIHZhciBlcnIgPSBmLmRhdGEoJ2VycicpO1xuICAgICAgICB2YXIgdHlwZSA9IGYuYXR0cigndHlwZScpO1xuXG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGlzVmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQnKSl7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vLy8gaGFuZGxlIHJhZGlvIGJ1dHRvbiBjYXNlXG4gICAgICAgICAgICBpZih0eXBlICYmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdyYWRpbycpICl7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBmLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFkaW9zID0gc2VsZi5maW5kKFwiaW5wdXRbbmFtZT1cIituYW1lK1wiXVwiKTtcbiAgICAgICAgICAgICAgICByYWRpb3MuZWFjaChmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhcmFkaW9zLmVxKHIpLmF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8vLy8gYnJlYWsgLmVhY2ggb2Ygb24gcmFkaW8gYnV0dG9uIGZvdW5kIGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZiA9IHJhZGlvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSAmJiB0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpe1xuICAgICAgICAgICAgICAgIGlmKGYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGYuZWFjaChmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSAhIWYuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8gYnJlYWsgLmVhY2ggb2Ygb24gcmFkaW8gYnV0dG9uIGZvdW5kIGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IGlzVmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfS8vLy8gaWYgTGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKHYubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB0eXBlIHJhZGlvIGVsc2VcblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1yZXF1aXJlZCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vLyBpZiB2Lmxlbmd0aFxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXJlcXVpcmVkJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy8vLyBpZiBjYy1yZXF1aXJlZFxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLW51bWJlcicpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXihcXGQpKyhcXC5cXGQrKT8kLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1udW1iZXInKTtcbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtbnVtYmVyJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLW51bWJlciddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZW1haWwnKSAmJiB2KXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciByZWd4ID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtZW1haWwnKTtcbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZW1haWwnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1lbWFpbCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkZWxldGUgZXJyWydjYy1lbWFpbCddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZGF0ZScpKXtcblxuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBzcGxpdFsxXSA/IE51bWJlcihzcGxpdFsxXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3BsaXRbMl0gPyBOdW1iZXIoc3BsaXRbMl0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgbTMxID0gWzEsIDMsIDUsIDcsIDgsIDEwLCAxMl07XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIW0gfHwgbSA+IDEyIHx8IG0gPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihtMzEuaW5kZXhPZihtKSA+PTAgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWQgfHwgZCA+IDMxIHx8IGQgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzAgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0gPT0gMil7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZCA9IHkgJSA0ID09IDAgPyAyOSA6IDI4O1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gX2QgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGhhc0NsYXNzIGNjLWRhdGVcbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZGF0ZSBjYy1kYXRlLWd0Jykpe1xuICAgICAgICAgICAgdmFyIGd0RmllbGQgPSAkKCcjJytzZWxmLmF0dHIoJ2RhdGEtZGF0ZS1ndCcpKTtcbiAgICAgICAgICAgIHZhciBndFZhbCwgc3RhcnREYXRlLCBlbmREYXRlO1xuICAgICAgICAgICAgaWYodi5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZ3RGaWVsZC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpZihndEZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZ3RGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGVuZERhdGUgPCBzdGFydERhdGUpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgZ3RGaWVsZC5sZW5ndGggPiAwXG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlLWd0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZGF0ZS1ndCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUtZ3QnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaGFzQ2xhc3MgY2MtZGF0ZS1ndFxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWNhcmQtZXhwaXJhdGlvbicpKXtcblxuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSAxO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3BsaXRbMV0gPyBOdW1iZXIoc3BsaXRbMV0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG51bGxcblxuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLTEsIGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCFtIHx8IG0gPiAxMiB8fCBtIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihudWxsICE9PSBkYXRlICYmIGRhdGUgPD0gbm93ICl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY2FyZC1leHBpcmF0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB2XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY2FyZC1leHBpcmF0aW9uJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1waG9uZScpKXtcbiAgICAgICAgICAgIGlmKHYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXChcXGR7M31cXCkoICk/XFxkezN9XFwtXFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcGhvbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1waG9uZSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtY3VycmVuY3knKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcJD8oXFxkezEsM30pKyhcXCwqXFxkezN9KSokLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1jdXJyZW5jeScpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWN1cnJlbmN5J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWN1cnJlbmN5J107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2Mtc3NuJykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXGR7M30oXFwtKT9cXGR7Mn0oXFwtKT9cXGR7NH0kLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1zc24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1zc24nXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2Mtc3NuJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQtb25lLW9mJykpe1xuICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICQoJy4nK3NlbGYuYXR0cignZGF0YS1vbmUtb2YtY2xhc3MnKSArICcgaW5wdXQnKTtcblxuICAgICAgICAgICAgdmFyIF9pc1ZhbGlkID0gZmFsc2U7IC8vLy8gbG9jYWwgaXNWYWxpZCB2YXIgd2lsbCBiZSAmJiB3aXRoIGlzVmFsaWRcbiAgICAgICAgICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgICAgIF9pc1ZhbGlkID0gX2lzVmFsaWQgfHwgISEkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IF9pc1ZhbGlkKSByZXR1cm4gZmFsc2U7Ly8vLyBzdG9wIGVhY2ggaWYgb25lIGZpbGVkIGlzIGZvdW5kXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgX2lzVmFsaWQ7XG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZC1vbmUtb2YnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXTtcblxuICAgICAgICAgICAgICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgX2VyciA9ICQodGhpcykuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBfZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJCh0aGlzKS5kYXRhKCdlcnInLCBfZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1yZXF1aXJlZC1vbmUtb2YnKS5oaWRlRXJyb3IoKS5zaG93RXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaGFzQ2xhc3MgY2MtcmVxdWlyZWQtb25lLW9mXG5cbiAgICAgICAgLy8vLyByZXNldCB0aGUgZmllbGQgZXJyb3JzIGJlZm9yZSBhZGRpbmcgdGhlbSBhZ2FpblxuICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKS5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICBmLmRhdGEoJ2VycicsIGVycik7XG4gICAgICAgIGYuZGF0YSgnaXNWYWxpZCcsIGlzVmFsaWQpO1xuXG4gICAgICAgIC8vLy8gaWYgZmllbGQgcGFzc2VkIHRocm91Z2ggdmFsaWRhdGlvbiBzaG93IGVycm9yIGlmIGFueVxuICAgICAgICAvLyBpZih0cnVlID09PSBpc1ZhbGlkYXRlZCApe1xuICAgICAgICAvLyBpZihPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICBpZihmYWxzZSA9PSBpc1ZhbGlkIHx8IE9iamVjdC5rZXlzKGVycikubGVuZ3RoID4gMCl7XG5cbiAgICAgICAgICAgICAgICBmLnNob3dFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICBmLmhpZGVFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gfS8vLy8gaWYgaXNWYWxpZGF0ZWRcblxuICAgIH0vLy8vIGZ1bi4gdmFsaWRhdGVGaWxkXG5cbiAgICAkLmZuLnNob3dFcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBmID0gdGhpcy5maWx0ZXIoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcbiAgICAgICAgdmFyIHR5cGUgPSBmLmF0dHIoJ3R5cGUnKTtcblxuICAgICAgICB2YXIgZXJyID0gZi5kYXRhKCdlcnInKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSBmLmRhdGEoJ2lzVmFsaWQnKTtcblxuICAgICAgICB2YXIgc3RyID0gW107XG4gICAgICAgIGZvcih2YXIgZSBpbiBlcnIpe1xuICAgICAgICAgICAgc3RyLnB1c2goZXJyW2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3InKS5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICBmLm9mZigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcik7XG5cbiAgICAgICAgaWYodHJ1ZSAhPT0gaXNWYWxpZCl7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICBmLm9mZigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcikub24oJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmKHN0ci5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB2YXIgbXNnID0gJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIiBpZD1cImVycm9yTXNnXCI+PGkgY2xhc3M9XCJpY29uLWVycm9yIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlLXNpZ25cIj48L2k+ICcgKyBzdHIuam9pbignIHwgJykgKyAnPC9kaXY+Jykuc2hvdygpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChtc2cpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdtZXNzYWdlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9Ly8vLyBmdW4uIHNob3dFcnJvclxuXG4gICAgJC5mbi5oaWRlRXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLmVxKDApO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcblxuICAgICAgICAvLyBjb250YWluZXIuYWRkQ2xhc3MoJ2NvcnJlY3QnKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdlcnJvciBtZXNzYWdlJyk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgICQuZm4uYWRkRXJyb3IgPSBmdW5jdGlvbihlcnJvckNsYXNzKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKGZpZWxkKTtcblxuICAgICAgICB2YXIgbXNnID0gY29udGFpbmVyLmZpbmQoJy5tZXNzYWdlLicrZXJyb3JDbGFzcykuZXEoMCkudGV4dCgpO1xuICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIGVycltlcnJvckNsYXNzXSA9IG1zZztcblxuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmaWVsZC5kYXRhKCdpc1ZhbGlkJywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLnJlbW92ZUVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuXG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSByZXR1cm4gdGhpcztcblxuICAgICAgICBkZWxldGUgZXJyW2Vycm9yQ2xhc3NdO1xuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBpZihPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbn0oIGpRdWVyeSApKTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgdmFyIHBhbmxlLCBwb3B1cCwgYnRuLCBxdWVzdGlvbnMsIGFjdGl2ZVF1ZXN0aW9uLCBmaWVsZHM7XG4gICAgdmFyIGhlbGxvTWVzc2FnZTtcblxuICAgICQuZm4uY2NTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5maW5kKCcuY2Mtc3VwcG9ydCcpO1xuXG5cbiAgICAgICAgaWYoc2VsZi5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgcGFuZWwgPSBzZWxmLmZpbmQoJy5jYy1zdXBwb3J0LXBhbmVsJykuZXEoMCk7XG4gICAgICAgIHBvcHVwID0gc2VsZi5maW5kKCcuY2Mtc3VwcG9ydC1wb3B1cCcpLmVxKDApO1xuICAgICAgICBidG4gPSBzZWxmLmZpbmQoJy5idG4nKS5lcSgwKTtcbiAgICAgICAgcXVlc3Rpb25zID0gcGFuZWwuZmluZCgnLmNjLXN1cHBvcnQtcXVlc3Rpb25zIGxpJyk7XG4gICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcblxuICAgICAgICBmaWVsZHMgPSB7fTtcblxuICAgICAgICBoZWxsb01lc3NhZ2UgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmhlbGxvJykudGV4dCgpO1xuXG4gICAgICAgIHF1ZXN0aW9ucy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhaWQpe1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7aW5kZXg6eCwgcTokKHRoaXMpLmZpbmQoJ2EnKS5lcSgwKS50ZXh0KCl9O1xuICAgICAgICAgICAgICAgIGZpZWxkc1tpZF0gPSBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB2YXIgdG9nZ2xlUGFuZWwgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBpZihwYW5lbC5oYXNDbGFzcygnZXhwYW5kZWQnKSl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMuZmlsdGVyKCcuZXhwYW5kZWQnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaScpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBidG4ucmVtb3ZlQ2xhc3MoJ291dCcpXG4gICAgICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICAgICAgfS8vLy8gaWYgaGFzQ2Fsc3NcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYnRuLmFkZENsYXNzKCdvdXQnKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBoaWRlIHRoZSBwb3B1cCBpZiBpdHMgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKHBvcHVwLmhhc0NsYXNzKCd2aXNpYmxlJykpe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBFeHBhbmQgcXVlc3Rpb24gd2hlbiBwYW5lbCBpcyBvcGVuZWQgaWYgdGhlIGFjdGl2ZVF1c3Rpb24gaXNcbiAgICAgICAgICAgICAgICAgICAgICogYmVlbiBzZXQgd2l0aCBmaWVsZCBmb2N1cyBldmVudFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYobnVsbCAhPT0gYWN0aXZlUXVlc3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLmVxKGFjdGl2ZVF1ZXN0aW9uKS5maW5kKCdhJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9LCAzMDApOyAvLy8gc2V0VGltZW91dFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9Ly8vIGlmIGhhc0NsYXNzIGVsc2VcbiAgICAgICAgfS8vLy8gZnVuLiB0b2dnbGVQYW5lbFxuXG4gICAgICAgIHZhciB0b2dnbGVRdWVzdGlvbiA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJlbnQuZmluZCgnaScpO1xuXG4gICAgICAgICAgICBpZihwYXJlbnQuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpe1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXN0aW9ucy5maWx0ZXIoJy5leHBhbmRlZCcpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcblxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgaS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKTtcblxuICAgICAgICB9Ly8vLyBmdW4uIHRvZ2dsZVF1ZXN0aW9uXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvY3VzIEV2ZW50IGhhbmRsZXIgZm9yIGZpZWxkcyB0byBzaG93IGhlbHBlciBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc2hvd1BvcHVwID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgICAgIGlmKGlkIGluIGZpZWxkcyl7XG4gICAgICAgICAgICAgICAgcG9wdXAuYWRkQ2xhc3MoJ3Zpc2libGUnKS50ZXh0KGZpZWxkc1tpZF0ucSk7XG4gICAgICAgICAgICAgICAgYWN0aXZlUXVlc3Rpb24gPSBmaWVsZHNbaWRdLmluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBmdW4uc2hvd1BvcHVwXG5cbiAgICAgICAgdmFyIGhpZGVQb3B1cCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgcG9wdXAucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKS50ZXh0KCcnKTtcbiAgICAgICAgfS8vLy8gZnVuLnNob3dQb3B1cFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhbmVsIGNsb3NlIGJ1dHRvblxuICAgICAgICAgKi9cbiAgICAgICAgcGFuZWwuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogPyBidXR0b24gYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIGJ0bi5vbignY2xpY2snLCB0b2dnbGVQYW5lbClcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhaGVsbG9NZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNob3dTdXBwb3J0TWVzc2FnZShoZWxsb01lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcG9wdXAgYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIHBvcHVwLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5zaWRlIHBhbmVsIHF1ZXN0aW9uIGNsaWNrIGJlaGF2aW9yXG4gICAgICAgICAqL1xuICAgICAgICBwYW5lbC5maW5kKCcuY2Mtc3VwcG9ydC1xdWVzdGlvbnMgbGkgYScpLm9uKCdjbGljaycsIHRvZ2dsZVF1ZXN0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGZvY3VzIGV2ZW50IGZvciBmaWVsZHMgdG8gc2hvdyB0aGUgcmlnaHQgcXVlc3Rpb24gYXMgcG9wdXBcbiAgICAgICAgICogaWYgdGhlcmUgYSBxdWVzdGlvbiByZWxhdGVkIHRvIHRoaXMgZmllbGRcbiAgICAgICAgICovXG4gICAgICAgIC8vICQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykub24oJ2JsdXInLCBoaWRlUG9wdXApLm9uKCdmb2N1cycsIHNob3dQb3B1cCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYnRuLnJlbW92ZUNsYXNzKCdvdXQnKTtcbiAgICAgICAgfSwgMyoxMDAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9Oy8vLy8gJC5mbiBmdW5jdGlvblxuXG4gICAgJC5mbi5zaG93U3VwcG9ydE1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGlmKGZhbHNlID09PSAhIXBvcHVwKSByZXR1cm4gdGhpcztcblxuICAgICAgICB2YXIgaW50ZTtcbiAgICAgICAgdmFyIGJlZm9yZUhpZGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlKTtcbiAgICAgICAgICAgIGludGUgPSBzZXRUaW1lb3V0KGhpZGVNZXNzYWdlLCAyMDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoaWRlTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdG9wSGlkZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnRuLm9mZignbW91c2VvdXQnLCBiZWZvcmVIaWRlKS5vbignbW91c2VvdXQnLCBiZWZvcmVIaWRlKTtcbiAgICAgICAgcG9wdXAub2ZmKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpLm9uKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpO1xuICAgICAgICBwb3B1cC5vZmYoJ21vdXNlb3ZlcicsIHN0b3BIaWRlKS5vbignbW91c2VvdmVyJywgc3RvcEhpZGUpO1xuXG4gICAgICAgIHBvcHVwLnRleHQobWVzc2FnZSkuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KCBqUXVlcnkgKSk7IiwiLyoqXG4gKiBbX2FwcEdsb2JhbCBOYW1lc3BhY2UgZm9yIGdsb2JhbCB2YXJpYWJsZXNdXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgX2FwcEdsb2JhbCA9IHt9O1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShjY0RvY3VtZW50UmVhZHkpO1xuXG5mdW5jdGlvbiBjY0RvY3VtZW50UmVhZHkoKXtcblxuICAgIC8qKlxuICAgICAqIFByb2dyZXNzIG5hdmlnYXRpb24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI3Byb2dyZXNzX3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3NOYXYgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVQb3JncmVzTmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCgnMTAwJScpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKDQwKTsgLy8gY2hhbmdpbmcgdGhlIHdpZHRoIHRvIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiBvZiBwcm9ncmVzcyBiYXIgY2xpY2thYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gYm9keSBzbyBkbyB0aGUgd29yayBvbiBib2R5IGNsaWNrIFxcIG9ubHkgaWYgbWVudSBpcyBjbG9zZWRcbiAgICAgICAgICogdGhpcyB0byBtYWtlIHN1cmUgdGhlIG1lbnUgaXMgY2xvc2VkIHdoZW4gY2xpY2sgb3V0c2lkZSB0aGUgbWVudVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGZhbHNlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBIYW1idXJnZXIgbWVudSBidXR0b24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI21lbnVfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBtZW51TmF2ID0gJCgnI21lbnVfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVNZW51TmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IG1lbnVOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBtZW51TmF2LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmYWxzZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgJCgnYm9keScpLmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNjcm9sbGluZyBldmVudCBsaXN0ZW5lciB0byBtYWtlIHRoZSBwcm9ncmVzcyBiYXIgc3RpY2t5XG4gICAgICovXG4gICAgLy8gaWYoJCgnYm9keScpLndpZHRoKCkgPCA2Nzgpe1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnKS5vbignc2Nyb2xsJywgbWFpblNjcm9sbCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIHN0YXRlcyBkcm9wLWRvd25zXG4gICAgICovXG4gICAgIGZpbGxTdGF0ZURyb3Bkb3duKCAkKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG5cbiAgICAgLyoqXG4gICAgICAqIFN0YXJ0IFN1cHBvcnRcbiAgICAgICovXG4gICAgICQoZG9jdW1lbnQpLmNjU3VwcG9ydCgpO1xuXG5cbiAgICAvKipcbiAgICAgKiBGbG9hdCBsYWJlbCBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5jYy1maWVsZC5mbG9hdCcpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPXRleHRdJykuZXEoMCk7XG5cbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudCA9ICdrZXl1cCc7XG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRyb3Bkb3duJykpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50ID0gJ2NoYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZC5vbih0cmlnZ2VyRXZlbnQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZmllbGQudmFsKCkpe1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlZGl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTsvLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcuanNDb2xsYXBzZScpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5maW5kKCdhLmNsb3NlLCBhLmRpc21pc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVXAoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTsvLy8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvblxuICAgICAqL1xuICAgIHllc05vUmFkaW8oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aSBjaGVja2JveFxuICAgICAqL1xuICAgIG11bHRpQ2hlY2tib3goKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBhcnJvdyBsYWJlbCBiZWhhdmlvciBmb3IgPHNlbGVjdD5cbiAgICAgKi9cbiAgICBkcm9wZG93bkxhYmVsKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEJhY2sgYnV0dG9uIGNsaWNrIGhhbmRsZXJzXG4gICAgICovXG4gICAgJCgnI2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH0pO1xuXG5cblxufS8vLy8gZnVuLiBjY0RvY3VtZW50UmVhZHlcblxuZnVuY3Rpb24gbWFpblNjcm9sbChlKXtcbiAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGlmKCQoJ2JvZHknKS53aWR0aCgpID4gNjc4KSByZXR1cm47XG5cbiAgICB2YXIgcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICB2YXIgYmFyID0gJCgnI3Byb2dyZXNzX25hdicpO1xuICAgIGlmKHMgPiAyMDApe1xuICAgICAgICBpZihmYWxzZSA9PT0gYmFyLmhhc0NsYXNzKCdmbG9hdCcpKXtcbiAgICAgICAgICAgIGJhci5hZGRDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYmFyLmhlaWdodCgpKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGJhci5yZW1vdmVDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBudWxsKVxuICAgIH1cblxufS8vLy8gZnVuLiBtYWluU2Nyb2xsXG5cblxuZnVuY3Rpb24gdXBkYXRlVGFiSW5kZXgoc2VsZWN0b3Ipe1xuICB2YXIgeCA9IDA7XG4gICAgc2VsZWN0b3IuZmluZCgnLmNjLWZpZWxkJykuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgdmFyIHMgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPWRhdGVdLCBpbnB1dFt0eXBlPXRlbF0sIGlucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSwgaW5wdXRbdHlwZT1udW1iZXJdLCB0ZXh0YXJlYSwgc2VsZWN0JylcbiAgICAgICAgcy5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICQodGhpcykuYXR0cigndGFiaW5kZXgnLCB4KzEpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgfSlcbiAgICB9KVxufS8vLy8gZnVuLiB1cGRhdGVUYWJJbmRleFxuXG4vKipcbiAqIFt5ZXNOb1JhZGlvIFdpbGwgc2V0IHRoZSBiZWhhdmlvciBvZiB5ZXMvbm8gcmFkaW8gYnV0dG9ucyBieSBhZGRpbmcgLmNoZWNrZWQgY2xhc3MgdG8gdGhlIGxhYmVsIG9mIHRoZSBidXR0b25dXG4gKiB0aGUgZnVuY3Rpb24gYXNzdW1lIHRoZSBpbnB1dFt0eXBlPXJhZGlvbl0gaXMgaW5jbHVkZWQgaW5zaWRlIDxsYWJlbD4gdGFnXG4gKi9cbmZ1bmN0aW9uIHllc05vUmFkaW8oY29udGFpbmVyKXtcbiAgLy8vLyBpZiBjb250YWluZXIgaXMgcGFzc2VkIGZpbmQgdGhlIHJhZGlvcyBpbnNpZGUgaXQgb3IgZG8gYSBkb2N1bWVudCBnbG9iYWwgZmluZFxuICB2YXIgcmFkaW9zID0gISFjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykgOiAkKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKTtcbiAgcmFkaW9zLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZigkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xhYmVsLmNoZWNrZWQnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgfSlcbiAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gIH0pXG4gIC5vbignYmx1ciBraWxsZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICB9KTtcblxuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpOy8vLy8gdGhpcyB0byBzZXQgdGhlIGluaXRpYWwgc3RhdGVcbn1cblxuZnVuY3Rpb24gbXVsdGlDaGVja2JveCgpe1xuICB2YXIgcmFkaW9zID0gJCgnLmNjLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgIC8vICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uIGdseXBoaWNvbi1vaycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpO1xufS8vLy8gZnVuLiBtdWx0aUNoZWNrQm94XG5cbi8qKlxuICogW2Ryb3Bkb3duTGFiZWwgU2V0IHRoZSBjbGljayBldmVudCBmb3IgYXJyb3cgbGFiZWwgZm9yIDxzZWxlY3Q+IGVsZW1lbnRdXG4gKiB0aGlzIHNvbHV0aW9uIHdvcmtzIG9ubHkgc2FmYXJpIGFuZCBjaHJvbWUgZHVlIHRvIGJyb3dzZXIgbGltaXRhdGlvblxuICovXG5mdW5jdGlvbiBkcm9wZG93bkxhYmVsKGNvbnRhaW5lcil7XG4gIHZhciBsYWJlbHMgPSBjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLmNjLWRyb3Bkb3duIGxhYmVsLmFycm93JykgOiAkKCcuY2MtZHJvcGRvd24gbGFiZWwuYXJyb3cnKTtcbiAgbGFiZWxzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xuICAgICAgaWYoZmFsc2UgPT09ICEhaWQpIHJldHVybjtcbiAgICAgIHZhciBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nKTtcbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pXG59Ly8vLyBmdW4uIGRyb3Bkb3duTGFiZWxcblxuLyoqXG4gKiBbZmlsbFN0YXRlRHJvcGRvd24gd2lsbCBmaWxsIHRoZSBkcm9wZG9uIG9mIFVTQSBzdGF0ZXMgZm9ybSB1c1N0YXRlIHZhcmlhYmxlXVxuICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciBbalF1ZXJ5IG9iamVjdCB0aGF0IGNvbnRhaW4gPHNlbGVjdD4gdGFnIHRvIGJlIGZpbGxlZF1cbiAqIHVzU2F0ZSBpcyBhcnJheSBvZiBvYmplY3QgZGVmaW5lZCBpbiB1cy1zdGF0dXMuanMgZmlsZVxuICovXG5mdW5jdGlvbiBmaWxsU3RhdGVEcm9wZG93bihzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHVsID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKHZhciBzPTA7IHM8dXNTdGF0ZXMubGVuZ3RoOyBzKyspe1xuICAgICAgICAgICAgdmFyIGxpID0gJCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB1c1N0YXRlc1tzXS5hYmJyZXZpYXRpb24gKyAnXCI+JyArIHVzU3RhdGVzW3NdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgICAgICB9Ly8vLyBmb3JcbiAgICB9KTtcbn0vLy8vIGZ1bi4gZmlsbFN0YXRlRHJvcGRvd25cblxuLyoqXG4gKiBbaXNBbmRyb2lkIHNpbXBsZSBmdW5jdGlvbiB0byBkZXRlY3QgQW5kcm9pZCBPU11cbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlY3QgdGhlIGJ1ZyBpbiBBbmRyb2lkIHdoZW4ga2V5ZG93biwga2V5dXAgZXZlbnQgZG9lc24ndCBzZW5kIHRoZSByaWdodCBrZXkgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gW3RydWUgaWYgQW5kcm9pZCBPU11cbiAqL1xudmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn0vLy8vIGZ1bi4gaXNBbmRyb2lkXG5cblxudmFyIHJlc3RyaWN0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC0oKSBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDQ4LCA1NywgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJhd1ZhbHVlID0gdmFsLnNwbGl0KC9bXFwofFxcKXwgfFxcLXxcXCt8XFwuXS8pLmpvaW4oJycpO1xuICB2YXIgZm9ybWF0ZWQgPSAnJztcbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9ICcoJyArIHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnKSAnO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9IHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnLSc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBmb3JtYXRlZCArPSByYXdWYWx1ZTtcblxuICAkKHRoaXMpLnZhbChmb3JtYXRlZCk7XG59Ly8vLyBmdW4uIGZvcm1hdFBob25lXG5cbnZhciByZXN0cmljdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnLyddXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciBmb3JtYXRDYXJkRGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwvL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuXG4gICAgLy8gaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAvLyAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgLy8gICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgLy8gfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vIGZ1bi4gZm9ybWF0Q2FyZERhdGVcblxudmFyIHJlc3RyaWN0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLVwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC0vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMyl7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAzKSArICctJztcbiAgICByYXcgPSByYXcuc2xpY2UoMyk7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICctJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufVxuXG52YXIgcmVzdHJpY3ROdW1iZXJzID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JykuaGlkZUVycm9yKCk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIHJlc3RyaWN0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAkLFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZVNTTlxuXG52YXIgZm9ybWF0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcblxuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5zcGxpdCgvW1xcJHwgfFxcLF0vKS5qb2luKCcnKTtcblxuICBpZihyYXcubGVuZ3RoID4gMyl7XG4gICAgICB2YXIgYXJyID0gcmF3LnNwbGl0KCcnKTtcbiAgICAgIHZhciBzZXAgPSAxO1xuICAgICAgZm9yKHZhciB4PWFyci5sZW5ndGgtMTsgeD49MDsgeC0tKXtcbiAgICAgICAgLy8vLyBhZGQgcmVhZGluZyBjb21tYSBhZnRlciAzIGRpZ2l0cyBhbmQgb25seSBpZiB0aGVyZSBpcyBuZXh0IGRpZ2l0XG4gICAgICAgIHJldCA9IChzZXAgJSAzID09IDAgJiYgdHJ1ZSA9PT0gISFhcnJbeC0xXT8gJywnIDogJycpICsgYXJyW3hdICArIHJldDtcbiAgICAgICAgc2VwKys7XG4gICAgICB9XG4gICAgICByZXQgPSAnJCcgKyByZXQ7XG4gIH1cbiAgZWxzZSBpZihyYXcubGVuZ3RoID4gMCl7XG4gICAgcmV0ID0gJyQnICsgcmF3O1xuICB9XG4gIGVsc2V7XG4gICAgcmV0ID0gcmF3O1xuICB9XG5cbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vLyBmdW4uIGZvcm1hdEN1cnJlbmN5XG5cbnZhciBhbmltYXRlU2Nyb2xsID0gZnVuY3Rpb24oeSwgdGltZSl7XG5cbiAgICBjbGVhckludGVydmFsKF9hcHBHbG9iYWwuc2Nyb2xsSW50ZSk7Ly8vLyBzdG9wIGFueXNjcm9sbGluZ1xuXG4gICAgaWYodW5kZWZpbmVkID09PSB0aW1lKSB0aW1lID0gMTsvLy8vIHNldCBkZWZhdWx0IHZhbHVlIGZvciB0aW1lXG4gICAgdmFyIGZwcyA9IDYwOyAvLy8vIGZyYW1lcyBwZXIgc2Vjb25zXG4gICAgdmFyIGZyYW1lVGltZSA9IE1hdGguY2VpbCgxMDAwIC8gZnBzKTtcbiAgICB2YXIgZCA9IHRpbWUgKiBmcmFtZVRpbWU7IC8vLyBudW1iZXIgb2YgZnJhbWVzIGR1cmF0aW9uXG4gICAgdmFyIHQgPSAwOyAvLy8vIHRpbWUgdGlja2VyIC8gZnJhbWUgY291bnRlclxuXG4gICAgLy8vLyBzZXQgYmVnaW4gcG9pbnQgd2hpaGMgdGhlIGN1cnJyZW50IHBvaW50XG4gICAgLy8gYiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogd2luZG93LnNjcm9sbFk7XG4gICAgdmFyIGIgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xuICAgIC8vXG4gICAgaWYoYiA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgYiA9IDA7XG4gICAgfVxuXG5cbiAgICAvLy8vIGNoZWNrIGlmIHNjcm9sbGluZyBkZXN0aW5hdGlvbiBpcyBiaWdnZXIgdGhhbiBwYWdlIGhlaWdodCBsaW1pdHNcbiAgICB2YXIgbGltaXQgPSBNYXRoLm1heCggZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgKTtcbiAgICBpZih5PmxpbWl0KXtcbiAgICAgICAgeSA9IGxpbWl0O1xuICAgIH1cblxuICAgIC8vLy8gc2V0IHRoZSBjaGFuZ2UgYmV0d2VlbiBjdXJyZW50IGFuZCBkZXN0aW5hdGlvbiBwb2ludFxuICAgIGMgPSBiIC0geTtcblxuICAgIC8vLy8gZG8gbm90aGluZyBpZiBkZXN0aW5hdGlvbiBpcyBzYW1lIGFzIGN1cnJlbnRcbiAgICBpZihNYXRoLmFicyhjKSA8IDEpIHJldHVybjtcblxuICAgIC8vLy8gc3RhcnQgdGltZSB0aWNrZXJcbiAgICBfYXBwR2xvYmFsLnNjcm9sbEludGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAvLy8gZWFzZSBvdXQgbWF0aFxuICAgICAgICB2YXIgcGVyID0gMSAtIHQvZDtcbiAgICAgICAgdmFyIG5ld1kgPSAgLWMgKiAoMS1wZXIqcGVyKnBlcipwZXIpICsgYjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+XCIsIDEtKDEtcGVyKSooMS1wZXIpKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG5ld1kpO1xuXG5cbiAgICAgICAgaWYodCA9PSBkKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2FwcEdsb2JhbC5zY3JvbGxJbnRlKTtcbiAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdhbmltYXRlU2Nyb2xsRW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdCsrO1xuXG4gICAgfSwgZnJhbWVUaW1lKTtcbn0vLy8vIGZ1bi4gYW5pbWF0ZVNjcm9sbFxuXG4vKipcbiAqIFtyZXNldEZpZWxkcyB3aWxsIHNlYXJjaCBmb3IgaW5wdXQgZmllbGQgaW5zaWRlIGEgY29udGFpbmVyIGFuZCByZXN0IGl0cyB2YWx1ZSBhbmQgYW55IGVycm9yIHN0YXR1c11cbiAqIEBwYXJhbSAge1t0eXBlXX0gY29udGFpbmVyIFtqUXVleXIgb2JqZWN0IHRoYXQgc2hvdWxkIGNvbnRhaW4gaW5wdXQgZmlsZWQgdGhhdCBuZWVkIGJlIHJlc2V0XVxuICovXG52YXIgcmVzZXRGaWVsZHMgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICB2YXIgZmllbGRzID0gY29udGFpbmVyLmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XG5cbiAgZmllbGRzLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgdmFyIHR5cGUgPSAkKHRoaXMpLmF0dHIoJ3R5cGUnKTtcbiAgICBpZih0eXBlID09PSAncmFkaW8nKXtcbiAgICAgICQodGhpcykucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maWx0ZXIoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICB9XG4gICAgJCh0aGlzKS5oaWRlRXJyb3IoKTtcbiAgfSk7XG5cbn0vLy8vIGZ1bi4gcmVzZXRGaWVsZHNcblxuLyoqXG4gKiBbaW5jbHVkZUZpZWxkcyB3aWxsIGFkZCBoaWRkZW4gZmllbGRzIGluIGZvcm0gYW5kIHNldCB0aGUgcmlnaHQgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGluY2x1ZGVkIGUuZy4gXCIubmV3LWZpZWxkc1wiLCBcIiNjbG9kaW5nRGF0ZVwiXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgaW5jbHVkZSBpbiB2YWxpZGF0aW9uXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG52YXIgaW5jbHVkZUZpZWxkcyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucy5zZWxlY3RvciB8fCAhb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpIHJldHVybiBmYWxzZTtcblxuICB2YXIgZmllbGRzID0gJChvcHRpb25zLnNlbGVjdG9yKTtcbiAgZmllbGRzLmZpbmQob3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICBmaWVsZHMuc2xpZGVEb3duKCk7XG5cbn1cblxuLyoqXG4gKiBbZXhjbHVkZUZpZWxkcyB3aWxsIGV4Y2x1ZGUgZmllbGRzIGZyb20gZm9ybSBhbmQgc2V0IHJlbW92ZSB0aGUgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGV4Y2x1ZGVkXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgZXhjbHVkZWQgZnJvbSB2YWxpZGF0aW9uXG4gKi9cbnZhciBleGNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIHJlc2V0RmllbGRzKGZpZWxkcyk7XG4gIGZpZWxkcy5zbGlkZVVwKCk7XG59XG5cbi8qKlxuICogW2FkZEF1dG9BZGRyZXNzIHdpbGwgYWRkIGFkZHJlc3MgdHlwZSBhaGVhZCBmdW5jdGlvbmFsaXR5IHRvIHRleHQgZmllbGQgd2l0aCBpZCAnYm9fYWRkcmVzcyddXG4gKiBAcGFyYW0ge1t0eXBlXX0gaW5kZXggW2luIG11bHRpLWFkZHJlc3MgY2FzZSB0aGlzIHZhcmlhYmxlIHdpbGwgdGVsIHRoZSBmdW5jdGlvbiB3aGljaCBhZGRyZXNzIHRvIGJpbmQgdGhlIHR5cGUgYWhlYWQgdG9dXG4gKi9cbmZ1bmN0aW9uIGFkZEF1dG9BZGRyZXNzKGluZGV4LCBzdGFydEZyb20xKXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID49IDIgfHwgdHJ1ZSA9PT0gc3RhcnRGcm9tMSA/ICcnK2luZGV4IDogJyc7XG5cbiAgICB2YXIgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib19hZGRyZXNzJyArIHBvc3QpLFxuICAgICAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnICsgcG9zdCkuZmlsdGVyKCdpbnB1dCcpWzBdLFxuICAgICAgICB7dHlwZXM6IFsnZ2VvY29kZSddfVxuICAgICk7XG4gICAgLy8vLyBzZXQgdGhlIGFkZHJlc3MgaW5kZXggYW5kIHBvc3QgaW4gYXV0b2NvbXBsZXRlIG9iamVjdCB0byBiZSB1c2VkIGluIGZpbGxJbkFkZHJlc3MgZnVuY3Rpb25cbiAgICBhdXRvY29tcGxldGUuaW5kZXggPSAwO1xuICAgIGF1dG9jb21wbGV0ZS5wb3N0ID0gcG9zdDtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhZGRyZXNzIGZyb20gdGhlIGRyb3Bkb3duLCBwb3B1bGF0ZSB0aGUgYWRkcmVzc1xuICAgIC8vIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBmaWxsSW5BZGRyZXNzKTtcbn1cblxuLyoqXG4gKiBbZmlsbEluQWRkcmVzcyB3aWxsIHVwZGF0ZSB0aGUgYWRkcmVzcyBjaXR5LCBzdGF0LCBhbmQgemlwIGZpbGVkIGFmdGVyIHVzZXIgc2VsZWN0IGFkZHJlc3MgZm9ybSB0eXBlIGFoZWFkXVxuICogdGhpcyBpbnNpZGUgdGhpcyBmdW5jdGlvbiB3aWxsIHJlZmVyZW5jZSBnb29nbGUgYXV0b2NvbXBldGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtbbnVsbF19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmlsbEluQWRkcmVzcygpe1xuICAgIC8vLy8gdGhpcyByZWZlciB0byB0aGUgYXV0byBjb21wbGV0ZSBvYmplY3RcblxuICAgIHZhciBwbGFjZSA9IHRoaXMuZ2V0UGxhY2UoKTtcbiAgICB2YXIgY29tcG9uZW50Rm9ybSA9IHtcbiAgICAgICAgc3RyZWV0X251bWJlcjogJ3Nob3J0X25hbWUnLFxuICAgICAgICByb3V0ZTogJ2xvbmdfbmFtZScsXG4gICAgICAgIGxvY2FsaXR5OiAnbG9uZ19uYW1lJyxcbiAgICAgICAgYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIGNvdW50cnk6ICdsb25nX25hbWUnLFxuICAgICAgICBwb3N0YWxfY29kZTogJ3Nob3J0X25hbWUnXG4gICAgfTtcblxuICAgIHZhciBhZGRyZXNzID0ge307XG4gICAgdmFyIGxvbmdfbmFtZSA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0eXBlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzWzBdO1xuICAgICAgICB2YXIgYWRkcmVzc1R5cGUgPSB0eXBlO1xuXG4gICAgICBpZiAoY29tcG9uZW50Rm9ybVthZGRyZXNzVHlwZV0pIHtcbiAgICAgICAgdmFyIHZhbCA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVtjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXV07XG4gICAgICAgIGFkZHJlc3NbYWRkcmVzc1R5cGVdID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYoYWRkcmVzc1R5cGUgPT09ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKXtcbiAgICAgICAgICAgIGxvbmdfbmFtZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVsnbG9uZ19uYW1lJ107XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmb3JcbiAgICBhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUgPSBsb25nX25hbWU7XG5cbiAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnK3RoaXMucG9zdCkuZXEoMCkudmFsKGFkZHJlc3Muc3RyZWV0X251bWJlciArICcgJyArIGFkZHJlc3Mucm91dGUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfY2l0eScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5sb2NhbGl0eSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9zdGF0ZScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIC8vICQoJyNzdGF0ZV9sYWJlbCcrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFfbG9uZ19uYW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3ppcCcrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5wb3N0YWxfY29kZSkudHJpZ2dlcignY2hhbmdlJyk7XG59XG4iLCIvKipcbiAqIFRoZXNlIGdsb2JhbCB2YXJpYWJsZXMgc2hhcmVkIHdpdGggMDItY29ib3Jyb3dlci5qc1xuICogX2FwcEdsb2JhbC5hZGRyZXNzVGVtcGxhdGUsIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4O1xuICovXG5cbihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGJvcnJvd2VyUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gYm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYm9ycm93ZXJGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjYm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYWRkcmVzc0luZGV4IHdpbGwgdHJhY2sgdGhlIG51bWJlciBvZiBhZGRyZXNzIGFkZGVkIGFuZCBzdG9wIGlmIHRvdGFsIG9mIDQgYWRkcmVzc11cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gMTtcblxuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsZCwgaW52YWxpZEZpZWxkcyl7XG5cbiAgICAgICAgICAgIGlmKGlzVmFsZCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNDb0JvcnJvd2VyID0gIFN0cmluZygnMjM0Jykuc3BsaXQoJycpLmluZGV4T2YoICQoJyNib19hcHBseXR5cGUnKS52YWwoKSApID4gLTE7XG5cbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc0NvQm9ycm93ZXIpe1xuICAgICAgICAgICAgICAgICAgICBteUZvcm0uYXR0cignYWN0aW9uJywgJzAyLWNvYm9ycm93ZXIuaHRtbCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpc0NvbnRpbnVlQ2xpY2tlZClcbiAgICAgICAgICAgICAgICAvLy8vIGlmIHRoZSBmb3JtIGlzIG5vdCB2YWxpZCBhbmQgY29udGludWUgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0byB0aGUgcGFnZSB0byBmaXJzdCBmaWVsZCB3aXRoIGVycm9yXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpOyAgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vLy8gaWYgaXNWYWxpZCBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNsbFwiKVxuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIGV2ZW50IGhhbmRsZXJzIGFyZSBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSlcblxuXG5cbiAgICAgICAgJCgnI2JvX2hvd2hlYXInKS5vZmYoJ2NoYW5nZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLDEwKTtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbMiwzLDQsNV07XG4gICAgICAgICAgICBpZihhcnIuaW5kZXhPZih2YWwpID4gLTEpe1xuICAgICAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgICAgICovXG4gICAgICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2JvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgY2hhbmdlIG9mIHJhZGlvIGJ1dHRvbiBjdXJyZW50IGFkZHJlc3Mgb3duL3JlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9Ym9fY3VycmVudGx5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICB2YXIgcmVudENvbCA9ICQoJyNtb250aGx5UmVudCcpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbnRDb2wuZmluZCgnLmNjLWZpZWxkJykuZXEoMCk7XG4gICAgICAgICAgICBpZih2YWwudG9Mb3dlckNhc2UoKSA9PT0gJ3JlbnQnKXtcbiAgICAgICAgICAgICAgICByZW50Q29sLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJlbnRDb2wuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgbWVzc2FnZSBlcnJvcicpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLnNhZmFyaT09PSB0cnVlID8gJ2JsdXInIDogJ2NoYW5nZSc7IC8vLy8gY2hhbmdlIGlzIG5vdCBmaXJlZCB3aGVuIGF1dG9maWxsIGlzIHVzZWQgb24gc2FmYXJpXG4gICAgICAgICQoJyNib19lbWFpbCcpLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogbWFrZSBzdXJlIGVtYWlsIGZpZWxkIGlzIHZhbGlkYXRlIGJlZm9yZSBkb2luZyBhbnkgY2hlY2tcbiAgICAgICAgICAgICAqIGlkICNlbWFpbEZpZWxkIGlzIGdpdmVuIHRvIC5jYy1maWVsZCBjb250YWluZXIgb2YgZW1haWwgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJCgnI2VtYWlsRmllbGQnKS52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSAkLnRyaW0oJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9ICQodGhpcykuZGF0YSgnaXNWYWxpZCcpO1xuXG4gICAgICAgICAgICBpZih2YWwgJiYgdHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOlwiYXBpLXJlc3BvbnNlL2lzLWVtYWlsLWV4aXN0cy5qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6e2VtYWlsOnZhbH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmVtYWlsLnRvTG93ZXJDYXNlKCkgPT0gdmFsLnRvTG93ZXJDYXNlKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24ocmV0LmV4aXN0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmV4aXN0cyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNsb2dpbl9lbWFpbCcpLnZhbCh2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfS8vLyBpZiB2YWxcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIH0vLy8vIG5vdCB2YWxcblxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGFkZHJlc3MgdHlwZSBhaGVhZCBmdW5jdGlvbmFsaXR5IHRvIGFkZHJlc3NcbiAgICAgICAgICovXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpO1xuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvZ2luU2VjdGlvbihlbWFpbEV4aXN0cyl7XG4gICAgICAgIGlmKHRydWUgPT09IGVtYWlsRXhpc3RzKSB7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2xvZ2luU2VjdGlvbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9Ly8vLy8gZnVuLiB1cGRhdGVMb2dpblNlY3Rpb25cbn0pKCk7XG5cblxuXG5mdW5jdGlvbiBjaGVja0FkZHJlc3NMZW5ndGgoY29udGFpbmVyLCBpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+IDEgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcblxuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG4gICAgICAgIGlmKCF2KSB2ID0wO1xuICAgICAgICBpZigheWVhcnMpe1xuICAgICAgICAgICAgeWVhcnMgPSAwO1xuICAgICAgICAgICAgJCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApLnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG5cbiAgICAgICAgaWYoIXYpIHtcbiAgICAgICAgICAgIHYgPTA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXllYXJzKSB5ZWFycyA9IDA7XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSlcbn0vLy8vLyBmdW4uIGNoZWNrQWRkcmVzc0xlbmd0aFxuXG5mdW5jdGlvbiBhZGRBZGRyZXNzKG5leHRJZCl7XG4gICAgaWYobmV4dElkID49IDUpIHJldHVybiBmYWxzZTtcbiAgICBpZihfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA+PSBuZXh0SWQpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA9IG5leHRJZDtcbiAgICB2YXIgYWRkcmVzcyA9ICQoX2FwcEdsb2JhbC5hZGRyZXNzVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpKTtcblxuICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkLmNjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGFkZHJlc3MuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTsgLy8vLyBmdW4uIGluIG1haW4uanNcblxuICAgIGFkZHJlc3MuZmluZCgnaW5wdXQubnVtYmVycycpLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKTtcblxuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChhZGRyZXNzLCBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCk7XG5cbiAgICBzZWN0aW9uLmFwcGVuZChhZGRyZXNzKTtcbiAgICBhZGRBdXRvQWRkcmVzcyhfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIHNlY3Rpb24uc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHNlY3Rpb24gPSAkKCcjcHJlQWRkcmVzcycpO1xuICAgIGZvcih2YXIgeCA9IGlkUmVtb3ZlOyB4PD1fYXBwR2xvYmFsLmFkZHJlc3NJbmRleDsgeCsrKXtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBzZWN0aW9uLmZpbmQoJyNhZGRyZXNzXycgKyB4KTtcblxuICAgICAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgIGFkZHJlc3MucmVtb3ZlKCk7XG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgfVxuICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gaWRSZW1vdmUtMTtcbiAgICBpZihfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA8PSAxKSBzZWN0aW9uLnNsaWRlVXAoKVxufVxuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShjb0JvcnJvd2VyUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gY29Cb3Jyb3dlclJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0JvcnJvd2VyRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYWRkcmVzc0luZGV4IHdpbGwgdHJhY2sgdGhlIG51bWJlciBvZiBhZGRyZXNzIGFkZGVkIGFuZCBzdG9wIGlmIHRvdGFsIG9mIDQgYWRkcmVzc11cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gMTtcblxuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGNvLWJvcnJvd2VyIGxpdmUgaW4gZGlmZmVyZW50IGFkZHJlc3NcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9Y29fbGl2ZXNhbWVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCkgPT09ICd5ZXMnKXtcblxuICAgICAgICAgICAgICAgICQoJyNhZGRyZXNzRGl2Jykuc2xpZGVVcCgpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYy12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcjcHJlQWRkcmVzcycpLnNsaWRlVXAoKS5lbXB0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAkKCcjYWRkcmVzc0RpdicpLnNsaWRlRG93bigpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KG15Rm9ybSk7IC8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCYWNrIGJ1dHRvbiBjbGljayBoYW5kbGVyc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihjZSl7XG4gICAgICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAgICAgKiBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAgICAgKi9cbiAgICAgICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBudW1iZXIgb2YgZGVwZW5kZW50cyBjaGFuZ2UgYW5kIHNob3cgYWdlcyBmaWVsZHNcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb19kZXBlbmRhbnRzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgICAgIHZhciBhZ2VzRGl2ID0gJCgnI2RlcGVuZGVudFNlY3Rpb24nKTtcbiAgICAgICAgICAgIHZhciBjb2xzID0gYWdlc0Rpdi5maW5kKCcuY29sLXhzLTYnKS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHg9MDsgeDx2OyB4Kyspe1xuICAgICAgICAgICAgICAgICAgICBjb2xzLmVxKHgpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWdlc0Rpdi5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYWdlc0Rpdi5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHVwZGF0ZSBjby1ib3Jyb3dlciBuYW1lIGluIHN1YiB0aXRsZXNcbiAgICAgICAgICovXG4gICAgICAgIHZhciBuYW1lSG9sZGVyID0gJCgnLmNvQm9ycm93ZXJOYW1lJyk7XG4gICAgICAgICQoJyNjb19mbmFtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQudHJpbSggJCh0aGlzKS52YWwoKSApO1xuICAgICAgICAgICAgbmFtZUhvbGRlci50ZXh0KCB2YWwgPyB2YWwgOiAnQ28tQm9ycm93ZXInKTtcbiAgICAgICAgfSlcbiAgICB9Oy8vLy8gY29Cb3Jyb3dlclJlYWR5XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShwdXJjaGFzZVJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIHB1cmNoYXNlUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI3B1cmNoYXNlRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIHJlYWwgc3RhdGUgYWdlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfdXNpbmdhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgdmFyIGFnZW50ID0gJCgnI2FnZW50Q29udGFjdCcpO1xuICAgICAgICAgICAgdmFyIGFnZW50RmllbGRzID0gJCgnI2FnZW50RmllbGRzJyk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudENvbnRhY3QnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonI2FnZW50RmllbGRzLCAjYWdlbnRDb250YWN0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOy8vLy8vIG9uLmNoYW5nZVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIGNvbnRhY3QgYWdlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfY29udGFjdGFnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgcHJvcGVydHlcbiAgICAgICAgICovXG4gICAgICAgICQoJyNwdV9zZWFyY2h0eXBlcHVyY2hhc2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IFN0cmluZygnMzQnKS5zcGxpdCgnJykuaW5kZXhPZih2YWwpID4gLTE7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09IGlzUHJvcGVydHkpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHktZmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5wcm9wZXJ0eS1maWVsZHMsICNzdWJOYW1lLCAjY2xvc2luZ0RhdGUsICNtb250aGx5SE9BJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1zdWIsIC5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nLCAuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTsvLy8gb24uY2hhbmdlXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIEhPQSBkdWVzXG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X3BsYW5uZWR1bml0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1IT0EnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X2hhdmVjbG9zaW5nZGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV9tYW51ZmFjdHVyZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3ViJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTsvLy8vIHB1cmNoYXNlUmVhZHlcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkocmVmaW5hbmNlUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gcmVmaW5hbmNlUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI3JlZmluYW5jZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9wcm9wZXJ0eXJlZmluYW5jaW5nXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih2YWwgPT09ICdubycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vdGhlckFkZHJlc3MnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgSE9BIGR1ZXNcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX2ZvcnNhbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfc3ViamVjdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2NvbnN0cnVjdGlvbkJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX2lzdGl0bGVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9oYXZlTW9ydGdhZ2UxXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZmlyc3RNb3J0Z2FnZSwgLnNlY29uZE1vcnRnYWdlLCAuY3JlZGl0LWxpbWl0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTIsIC5jYy10by1iZS12YWxpZGF0ZS1jbCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfc2VjbW9ydGdhZ2VdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlY29uZE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNlY29uZE1vcnRnYWdlLCAuY3JlZGl0LWxpbWl0LCAjYWRkaXRpb25hbExpZW5zJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2wsIC5jYy10by1iZS12YWxpZGF0ZS1saW5lJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9tb3J0Z2FnZTJMT0NdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNyZWRpdC1saW1pdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxsaWVuc10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FkZGl0aW9uYWxMaWVucycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpZW4nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Oy8vLy8gYm9ycm93ZXJSZWFkeVxufSkoKTsiLCIvKipcbiAqIEJlbG93IGdsb2JhbCB2YXJpYWJsZXMgYXJlIHNoYXJlZCB3aXRoIGNvLWJvcnJvd2VyIGluY29tZSBwYWdlIDA2LWNvLWluY29tZS5qc1xuICogX2FwcEdsb2JhbC5lbXBsb3llclRlbXBsYXRlLCBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXgsIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyO1xuICogX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUsIF9hcHBHbG9iYWwucmVudEluZGV4LCBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyLCBfYXBwR2xvYmFsLnJlbnRzQXJyYXk7XG4gKi9cblxuXG4oZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShib0luY29tZVJlYWR5KTtcblxuXG4gICAgZnVuY3Rpb24gYm9JbmNvbWVSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYm9JbmNvbWVGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJUZW1wbGF0ZSA9ICQoJyNlbXBsb3llclRtcGx0JykudGV4dCgpO1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSAxO1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlciA9ICQoJyNlbXBsb3llcnNIb2xkZXInKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZSA9ICQoJyNyZW50VG1wbHQnKS50ZXh0KCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSByZW50IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudEluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudHNIb2xkZXIgdGhlIGRpdiB3aGVyZSByZW50IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIgPSAkKCcjcmVudHNIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIHJlbnQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVudHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IHJlbnQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCByZW50IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZVJlbnRzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBlbXBsb3llcnNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKG15SW5kZXgpO1xuICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKG15SW5kZXgpO1xuICAgICAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgcmVudCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49cmVfYWRkcmVzc10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdyZV9hZGRyZXNzJylbMV0sIDEwKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMTAwICsgbXlJbmRleCk7XG5cbiAgICAgICAgICAgIF9hcHBHbG9iYWwucmVudEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwucmVudHNBcnJheS5wdXNoKF9hcHBHbG9iYWwucmVudEluZGV4KTtcblxuICAgICAgICAgICAgYmluZFJlbnRNb3J0Z2FnZShteUlkKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lMl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZSgxKTtcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmVtcGxveW1lbnQsIC5wcmVFbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0sIC5jYy10by1iZS12YWxpZGF0ZS1wcmUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKDIpOyAvLy8gd2lsbCB0YWtlIGNhcmUgb2YgdGhlIHJlc3Qgb2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlbGYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg1KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2VsZicsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFkZGl0aW9uYWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg2KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuYWRkaXRpb25hbCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldGlyZW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0aXJlbWVudCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTZdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNzbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNzbicsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbidcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lN10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY2hpbGQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmNoaWxkJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZThdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmRpdmlkZW5kJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5kaXZpZGVuZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZW50YWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZW50YWwnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoX2FwcEdsb2JhbC5yZW50c0FycmF5W19hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgICAgIH0vLy8gd2hpbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgIH0pXG5cbiAgICB9Oy8vLy8gYm9ycm93ZXJSZWFkeVxufSkoKTtcblxuXG5mdW5jdGlvbiBiaW5kRW1wbG95bWVudERhdGUoaW5kZXgpe1xuXG4gICAgdmFyIGZpZWxkcyA9ICQoJ2lucHV0LnN0YXJ0RGF0ZScgKyBpbmRleCArICcsIGlucHV0LmVuZERhdGUnICsgaW5kZXgpO1xuICAgIHZhciBldmVudE5hbWUgPSAkLmJyb3dzZXIubXNpZSA/ICdrZXl1cCcgOiAnY2hhbmdlJzsgLy8vIGNoYW5nZSBpcyBub3QgZmlyaW5nIG9uIElFICEhIVxuICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAub2ZmKGV2ZW50TmFtZSwgY2hlY2tFbXBsb3ltZW50RGF0ZSlcbiAgICAgICAgLm9uKGV2ZW50TmFtZSwgY2hlY2tFbXBsb3ltZW50RGF0ZSk7XG4gICAgfSlcbiAgICAvLyBmaWVsZHMub2ZmKCdjaGFuZ2UnLCBjaGVja0VtcGxveW1lbnREYXRlKVxufS8vLy8vIGZ1bi4gYmluZEVtcGxveW1lbnREYXRlXG5cbmZ1bmN0aW9uIGFkZEVtcGxveWVyKGluZGV4KXtcbiAgICAvKipcbiAgICAgKiBMaW1pdCB0byA0IHByZXZpb3VzIGVtcGxveWVyc1xuICAgICAqL1xuICAgIGlmKGluZGV4ID4gNCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogRW1wbG95ZXJzIHNob3VsZCBiZSBhZGRlZCBpbiBpbmNyZWFzaW5nIGluZGV4XG4gICAgICovXG4gICAgaWYoaW5kZXggPCBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXgpIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSBlbXBsb3llciB3aXRoIGluZGV4IGlzIGFscmVhZHkgYWRkZWQgZG8gbm90aGluZ1xuICAgICAqL1xuICAgIGlmKCQoJyNlbXBsb3llcl8nICsgaW5kZXgpLmxlbmd0aCA+IDApe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gaW5kZXg7XG5cbiAgICB2YXIgZW1wbG95ZXIgPSAkKF9hcHBHbG9iYWwuZW1wbG95ZXJUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjXFx9KS9nLCBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXgpKTtcblxuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBlbXBsb3llci5maW5kKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG4gICAgeWVzTm9SYWRpbyhlbXBsb3llcik7XG4gICAgZHJvcGRvd25MYWJlbChlbXBsb3llcik7XG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyLmFwcGVuZChlbXBsb3llcik7XG5cbiAgICBhZGRBdXRvQWRkcmVzcyhfYXBwR2xvYmFsLmVtcGxveWVySW5kZXgpO1xuICAgIGJpbmRFbXBsb3ltZW50RGF0ZShfYXBwR2xvYmFsLmVtcGxveWVySW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIGVtcGxveWVyLnNsaWRlRG93bigpO1xufS8vLy8gZnVuLiBhZGRFbXBsb3llclxuXG5mdW5jdGlvbiByZW1vdmVFbXBsb3llcihyZW1vdmVJbmRleCl7XG5cbiAgICBpZihyZW1vdmVJbmRleCA8PSAxKSByZXR1cm47XG4gICAgLy8gaWYocmVtb3ZlSW5kZXggPiA0KSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9cmVtb3ZlSW5kZXg7IHg8PV9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleDsgeCsrKXtcbiAgICAgICAgJCgnI2VtcGxveWVyXycgKyB4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kZXRhY2goKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gcmVtb3ZlSW5kZXggLSAxO1xufVxuXG5mdW5jdGlvbiBjaGVja0VtcGxveW1lbnREYXRlKGV2KXtcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGVuZCBkYXRlIGFuZCBhZGQgcHJldmlvdXMgam9iIGlmIGFwcGxpY2FibGVcbiAgICAgKi9cbiAgICB2YXIgaW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgdmFyIGVuZERhdGVGaWVsZCA9ICQoJy5lbmREYXRlJytpbmRleCkuZXEoMCk7XG4gICAgdmFyIHN0YXJ0RGF0ZUZpZWxkID0gJCgnLnN0YXJ0RGF0ZScraW5kZXgpLmVxKDApO1xuICAgIHZhciBlbmREYXRlLCBzdGFydERhdGU7XG5cbiAgICBpZihlbmREYXRlRmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgIHZhciBkYXRlU3BsaXQgPSBlbmREYXRlRmllbGQudmFsKCkuc3BsaXQoJy8nKTtcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIGlmKHN0YXJ0RGF0ZUZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gc3RhcnREYXRlRmllbGQudmFsKCkuc3BsaXQoJy8nKTtcbiAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoTnVtYmVyKGRhdGVTcGxpdFsyXSksIE51bWJlcihkYXRlU3BsaXRbMF0pLTEsIE51bWJlcihkYXRlU3BsaXRbMV0pKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKGVuZERhdGUgPD0gc3RhcnREYXRlKXtcbiAgICAgICAgZW5kRGF0ZUZpZWxkLmFkZEVycm9yKCdjYy1kYXRlLWd0Jykuc2hvd0Vycm9yKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKGVuZERhdGUgLSBzdGFydERhdGUgPCAgMiAqIDM2NSAqIDI0ICogNjAgKiA2MCAqIDEwMDAgKXtcbiAgICAgICAgICAgIC8vIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJlRW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXByZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICBhZGRFbXBsb3llcihpbmRleCsxKVxuICAgICAgICB9Ly8vL1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlRW1wbG95ZXIoaW5kZXgrMSlcbiAgICAgICAgfVxuICAgIH0vLy8vIGVsc2Vcbn0vLy8vIGZ1bi4gY2hlY2tFbXBseW1lbnREYXRlXG5cbmZ1bmN0aW9uIGFkZFJlbnQoKXtcblxuICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgX2FwcEdsb2JhbC5yZW50SW5kZXgrKztcbiAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkucHVzaChfYXBwR2xvYmFsLnJlbnRJbmRleCk7XG4gICAgdmFyIHRlbXBsYXRlID0gX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBfYXBwR2xvYmFsLnJlbnRJbmRleCk7XG5cbiAgICB2YXIgaWQgPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgIC8qKlxuICAgICAqIFthZGRyZXNzSW5kZXggaXMgdXNlZCB0byBoZWxwIGFkZCBhbmQgdHJhY2sgdGhlIGFkZHJlc3MgZmllbGRzIGZvciB0eXBlIGFoZWFkIGFkZHJlc3MgZnVuY3Rpb25hbGl0eV1cbiAgICAgKiAxMDAgKyBpcyBhZGRlZCB0byBkaWZmZXJlbnRpYXRlIHRoZSByZW50IHByb3BlcnR5IGFkZHJlc3MgZmllbGRzIGZyb20gZW1wbG95ZXIgYWRkcmVzcyBmaWVsZHNcbiAgICAgKi9cbiAgICB2YXIgYWRkcmVzc0luZGV4ID0gMTAwICsgX2FwcEdsb2JhbC5yZW50SW5kZXg7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhQbHVzXFx9KS9nLCBhZGRyZXNzSW5kZXgpO1xuXG5cbiAgICB2YXIgcmVudCA9ICQodGVtcGxhdGUpO1xuXG4gICAgcmVudC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgfSk7XG5cbiAgICBmaWxsU3RhdGVEcm9wZG93biggcmVudC5maW5kKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHllcy9ubyByYWRpbyBidXR0b24gYmVoYXZpb3JcbiAgICAgKi9cbiAgICB5ZXNOb1JhZGlvKHJlbnQpO1xuICAgIGRyb3Bkb3duTGFiZWwocmVudCk7XG5cblxuXG4gICAgLyoqXG4gICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgKi9cbiAgICByZW50LmZpbmQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgIHJlbnQuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgX2FwcEdsb2JhbC5yZW50c0hvbGRlci5hcHBlbmQocmVudCk7XG5cbiAgICByZW50LnNsaWRlRG93bigpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IG1vcnRnYWdlIHllcy9ubyBhY3Rpb25cbiAgICAgKi9cbiAgICBiaW5kUmVudE1vcnRnYWdlKGlkKTtcblxuICAgIGFkZEF1dG9BZGRyZXNzKGFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xufS8vLy8gZnVuLiBhZGRSZW50XG5cbmZ1bmN0aW9uIHJlbW92ZVJlbnQocmVtb3ZlSW5kZXgpe1xuICAgIHZhciBwb3NpdGlvbiA9IF9hcHBHbG9iYWwucmVudHNBcnJheS5pbmRleE9mKHJlbW92ZUluZGV4KTtcblxuICAgICQoJyNwcm9wZXJ0eV8nICsgcmVtb3ZlSW5kZXgpLnNsaWRlVXAoe1xuICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgX2FwcEdsb2JhbC5yZW50c0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICB1cGRhdGVSZW50c0ZpZWxkcygpO1xuXG4gICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIHJlbW92ZVJlbnRcblxuLyoqXG4gKiBbdXBkYXRlUmVudHNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVudCBwcm9wZXJ0eSBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZFJlbnQgYW5kIHJlbW92ZVJlbnRcbiAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICovXG5mdW5jdGlvbiB1cGRhdGVSZW50c0ZpZWxkcygpe1xuICAgIHZhciBsaW1pdCA9IF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGg7XG4gICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5yZW50c0FycmF5W3hdO1xuXG4gICAgICAgIHZhciByZW50RGl2ID0gJCgnI3Byb3BlcnR5XycraW5kZXgpO1xuXG4gICAgICAgIHJlbnREaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICQodGhpcykuYXR0cih7bmFtZTpuZXdOYW1lLCBpZDpuZXdOYW1lfSk7XG4gICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfS8vLy8gZm9yIHhcbn0vLy8vIGZ1bi4gdXBkYXRlUmVudHNGaWVsZHNcblxuLyoqXG4gKiBbdXBkYXRlUmVudENsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIHByb3BlcnR5XVxuICogaXQgd2lsbCBiZSBjYWxsZWQgZnJvbSBhZGRSZW50IGFuZCByZW1vdmVSZW50XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVJlbnRDbG9zZUJ0bigpe1xuICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5yZW50c0FycmF5WzBdO1xuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcbiAgICAgICAgcmVudERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXlbMF07XG4gICAgICAgIHZhciByZW50RGl2ID0gJCgnI3Byb3BlcnR5XycraW5kZXgpO1xuICAgICAgICByZW50RGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgaWYoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgLy8gJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmF0dHIoeydkaXNhYmxlZCc6dHJ1ZX0pLmNzcyh7J29wYWNpdHknOjAuNX0pO1xuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5JykuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICAvLyAkKCcjYWRkUmVudFByb3BlcnR5JykuYXR0cih7J2Rpc2FibGVkJzpmYWxzZX0pLmNzcyh7J29wYWNpdHknOjF9KTtcbiAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLnNob3coKTtcbiAgICB9XG5cbn0vLy8vIGZ1bi4gdXBkYXRlUmVudENsb3NlQnRuXG5cbmZ1bmN0aW9uIGJpbmRSZW50TW9ydGdhZ2UoaW5kZXgpe1xuICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgdmFyIG15VmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiBteVZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xufS8vLy8gZnVuLiBiaW5kUmVudE1vcnRnYWdlIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29JbmNvbWVSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBjb0luY29tZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0luY29tZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlbG93IGdsb2JhbCB2YXJpYWJsZXMgZGVmaW5lZCBpbiAwNS1pbmNvbWUuanNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJUZW1wbGF0ZSA9ICQoJyNlbXBsb3llclRtcGx0JykudGV4dCgpO1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSAxO1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlciA9ICQoJyNlbXBsb3llcnNIb2xkZXInKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZSA9ICQoJyNyZW50VG1wbHQnKS50ZXh0KCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgcmVudCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgcmVudCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyID0gJCgnI3JlbnRzSG9sZGVyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCByZW50IHByb3BlcnR5IGluZGV4XG4gICAgICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlbnRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCByZW50IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgcmVudCBoYXMgaW5kZXggb2YgNlxuICAgICAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVSZW50c0ZpZWxkcyBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgZW1wbG95ZXJzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyhteUluZGV4KTtcbiAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZShteUluZGV4KTtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IG15SW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIHJlbnQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePXJlX2NvX2FkZHJlc3NdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgncmVfY29fYWRkcmVzcycpWzFdLCAxMCk7XG5cbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDEwMCArIG15SW5kZXgpO1xuXG4gICAgICAgICAgICBfYXBwR2xvYmFsLnJlbnRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkucHVzaChfYXBwR2xvYmFsLnJlbnRJbmRleCk7XG5cbiAgICAgICAgICAgIGJpbmRSZW50TW9ydGdhZ2UobXlJZCk7XG5cbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkaW5nIGdvb2dsZSBhZGRyZXNzIHR5cGUgYWhlYWRcbiAgICAgICAgICovXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmVtcGxveW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUoMSk7XG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5lbXBsb3ltZW50LCAucHJlRW1wbG95bWVudCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtLCAuY2MtdG8tYmUtdmFsaWRhdGUtcHJlJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA+IDEpe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFbXBsb3llcigyKTsgLy8vIHdpbGwgdGFrZSBjYXJlIG9mIHRoZSByZXN0IG9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWUzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zZWxmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNSlcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNlbGYnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hZGRpdGlvbmFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNilcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmFkZGl0aW9uYWwnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU1XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXRpcmVtZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldGlyZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zc24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZGl2aWRlbmQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lOV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZW50YWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZW50YWwnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoX2FwcEdsb2JhbC5yZW50c0FycmF5W19hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgICAgIH0vLy8gd2hpbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgIH0pXG5cbiAgICB9Oy8vLy8gY29JbmNvbWVSZWFkeVxufSkoKTtcbiIsIi8qKlxuICogR2xvYmFsIHZhcmlhYmxlcyBmb3IgdGhpcyBwYWdlXG4gKiB2YXIgX2FwcEdsb2JhbC5hc3NldFRlbXBsYXRlLCBfYXBwR2xvYmFsLmFzc2V0SW5kZXgsIF9hcHBHbG9iYWwuYXNzZXRzSG9sZGVyLCBfYXBwR2xvYmFsLmFzc2V0c0FycmF5O1xuICogdmFyIF9hcHBHbG9iYWwuZXN0YXRlVGVtcGxhdGUsIF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgsIF9hcHBHbG9iYWwuZXN0YXRlc0hvbGRlciwgX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXk7XG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShhc3NldHNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBhc3NldHNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYXNzZXRzRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW3JlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRUZW1wbGF0ZSA9ICQoJyNhc3NldFRtcGx0JykudGV4dCgpO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZVRlbXBsYXRlID0gJCgnI2VzdGF0ZVRtcGx0JykudGV4dCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hc3NldEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIGFzc2V0IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRJbmRleCA9IDA7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlSW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIgdGhlIGRpdiB3aGVyZSBhc3NldCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlciA9ICQoJyNhc3NldHNIb2xkZXInKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzSG9sZGVyID0gJCgnI2VzdGF0ZUhvbGRlcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hc3NldHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGFzc2V0IHByb3BlcnR5IGluZGV4XG4gICAgICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIGFzc2V0cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgYXNzZXQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCBhc3NldCBoYXMgaW5kZXggb2YgNlxuICAgICAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVhc3NldHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkgPSBbXTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGFzc2V0XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePWFzX2JhbmtdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnYXNfYmFuaycpWzFdLCAxMCk7XG5cblxuICAgICAgICAgICAgX2FwcEdsb2JhbC5hc3NldEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkucHVzaChfYXBwR2xvYmFsLmFzc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQXNzZXQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlQXNzZXRDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgYWRkQXNzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2FkZEFub3RoZXJFc3RhdGUnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGFkZEVzdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWFzX2Fzc2V0c10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERlbGF5IGFkZGluZyBmb3Igc21vb3RoIHNsaWQgZG93biBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGFkZEFzc2V0KCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYXNzZXRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlbW92ZSBhbGwgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHdoaWxlKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZFRvUmVtb3ZlID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2Fzc2V0XycgKyBpZFRvUmVtb3ZlKS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0vLy8gd2hpbGVcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFzc2V0cycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxyZWFsZXN0YXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERlbGF5IGFkZGluZyBmb3Igc21vb3RoIHNsaWQgZG93biBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGFkZEVzdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFJlbW92ZSBhbGwgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHdoaWxlKF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWRUb1JlbW92ZSA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjZXN0YXRlXycgKyBpZFRvUmVtb3ZlKS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0vLy8gd2hpbGVcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cbiAgICB9Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG5cblxuICAgIGZ1bmN0aW9uIGFkZEFzc2V0KCl7XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRJbmRleCsrO1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0FycmF5LnB1c2goX2FwcEdsb2JhbC5hc3NldEluZGV4KTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gX2FwcEdsb2JhbC5hc3NldFRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgX2FwcEdsb2JhbC5hc3NldEluZGV4KTtcblxuICAgICAgICB2YXIgaWQgPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aDtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgICAgIHZhciBhc3NldCA9ICQodGVtcGxhdGUpO1xuXG4gICAgICAgIGFzc2V0LmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICByZW1vdmVBc3NldChpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGFzc2V0LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICBkcm9wZG93bkxhYmVsKGFzc2V0KTtcblxuXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzSG9sZGVyLmFwcGVuZChhc3NldCk7XG5cbiAgICAgICAgYXNzZXQuc2xpZGVEb3duKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICAgICAgdXBkYXRlQXNzZXRDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gYWRkUmVudFxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlQXNzZXQocmVtb3ZlSW5kZXgpe1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNhc3NldF8nICsgcmVtb3ZlSW5kZXgpLnNsaWRlVXAoe1xuICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNBcnJheS5zcGxpY2UocG9zaXRpb24sIDEpO1xuXG4gICAgICAgIHVwZGF0ZUFzc2V0c0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbiAgICB9Ly8vLyBmdW4uIHJlbW92ZUFzc2V0XG5cbiAgICAvKipcbiAgICAgKiBbdXBkYXRlQXNzZXRzRmllbGRzIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIGFzc2V0IG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICAgICAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZEFzc2V0IGFuZCByZW1vdmVBc3NldFxuICAgICAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQXNzZXRzRmllbGRzKCl7XG4gICAgICAgIHZhciBsaW1pdCA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoO1xuICAgICAgICBpZihsaW1pdCA8IDEpIHJldHVybjtcblxuICAgICAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXlbeF07XG5cbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcblxuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0vLy8vIGZvciB4XG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldHNGaWVsZHNcblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFt1cGRhdGVBc3NldHNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBhc3NldF1cbiAgICAvLyAgKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZEFzc2V0IGFuZCByZW1vdmVBc3NldFxuICAgIC8vICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKXtcblxuICAgICAgICBpZihfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjYXNzZXRfJytpbmRleCk7XG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckFzc2V0JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckFzc2V0Jykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0Q2xvc2VCdG5cblxuXG4gICAgZnVuY3Rpb24gYWRkRXN0YXRlKCl7XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZUluZGV4Kys7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5LnB1c2goX2FwcEdsb2JhbC5lc3RhdGVJbmRleCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IF9hcHBHbG9iYWwuZXN0YXRlVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBfYXBwR2xvYmFsLmVzdGF0ZUluZGV4KTtcblxuICAgICAgICB2YXIgaWQgPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgICAgICB2YXIgZXN0YXRlID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgZXN0YXRlLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICByZW1vdmVFc3RhdGUoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAgICAgKi9cblxuICAgICAgICBlc3RhdGUuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0hvbGRlci5hcHBlbmQoZXN0YXRlKTtcblxuICAgICAgICBkcm9wZG93bkxhYmVsKGVzdGF0ZSk7XG4gICAgICAgIHllc05vUmFkaW8oZXN0YXRlKTtcbiAgICAgICAgZmlsbFN0YXRlRHJvcGRvd24oZXN0YXRlKTtcbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoX2FwcEdsb2JhbC5lc3RhdGVJbmRleCwgdHJ1ZSk7IC8vLyB0cnVlIGlzIHRvIGZvcmNlIHRoZSBsYWJlbCB0byBzdGFydCBmcm9tIDEsIGRlZmF1bHQgMSB3aWxsIGJlIGlnbm9yZWRcbiAgICAgICAgYmluZEVzdGF0ZU1vcnRnYWdlKF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgpO1xuXG4gICAgICAgIGVzdGF0ZS5zbGlkZURvd24oKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgICAgICB1cGRhdGVFc3RhdGVDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gYWRkUmVudFxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRXN0YXRlKHJlbW92ZUluZGV4KXtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAgICAgJCgnI2VzdGF0ZV8nICsgcmVtb3ZlSW5kZXgpLnNsaWRlVXAoe1xuICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVFc3RhdGVzRmllbGRzKCk7XG5cbiAgICAgICAgdXBkYXRlRXN0YXRlQ2xvc2VCdG4oKTtcbiAgICB9Ly8vLyBmdW4uIHJlbW92ZUFzc2V0XG5cbiAgICAvKipcbiAgICAgKiBbdXBkYXRlRXN0YXRlc0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBFc3RhdGUgbmFtZSBhbmQgaWQgaXMgYWx3YXlzIGluIHNlcmllcyBvZiAxLDIsMyw0LC4uLi5dXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkRXN0YXRlIGFuZCByZW1vdmVFc3RhdGVcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUVzdGF0ZXNGaWVsZHMoKXtcbiAgICAgICAgdmFyIGxpbWl0ID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoO1xuICAgICAgICBpZihsaW1pdCA8IDEpIHJldHVybjtcblxuICAgICAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5W3hdO1xuXG4gICAgICAgICAgICB2YXIgZXN0YXRlRGl2ID0gJCgnI2VzdGF0ZV8nK2luZGV4KTtcblxuICAgICAgICAgICAgZXN0YXRlRGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vLyBmb3IgeFxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlZXN0YXRlc0ZpZWxkc1xuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUVzdGF0ZXNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBFc3RhdGVdXG4gICAgICogaXQgd2lsbCBiZSBjYWxsZWQgZnJvbSBhZGRFc3RhdGUgYW5kIHJlbW92ZUVzdGF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCl7XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBlc3RhdGVEaXYgPSAkKCcjZXN0YXRlXycraW5kZXgpO1xuICAgICAgICAgICAgZXN0YXRlRGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGVzdGF0ZURpdiA9ICQoJyNlc3RhdGVfJytpbmRleCk7XG4gICAgICAgICAgICBlc3RhdGVEaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyRXN0YXRlJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckVzdGF0ZScpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfS8vLy8gZnVuLiB1cGRhdGVFc3RhdGVDbG9zZUJ0blxuXG4gICAgZnVuY3Rpb24gYmluZEVzdGF0ZU1vcnRnYWdlKGluZGV4KXtcbiAgICAgICAgJCgnaW5wdXQubW9ydGdhZ2VSYWRpbycraW5kZXgpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9ICQodGhpcykuYXR0cignZGF0YS1pbmRleCcpO1xuICAgICAgICAgICAgdmFyIG15VmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG15SW5kZXgsIG15VmFsKVxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiBteVZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2UnK215SW5kZXgsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQnK215SW5kZXh9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2UnK215SW5kZXgsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQnK215SW5kZXh9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0vLy8vIGZ1bi4gYmluZEVzYXRlTW9ydGdhZ2Vcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShsaWFiaWxpdGllc1JlYWR5KTtcbiAgICB2YXIgbGlhYmlsaXR5VGVtcGxhdGUsIGxpYWJpbGl0eUluZGV4LCBsaWFiaWxpdGllc0hvbGRlciwgbGlhYmlsaXRpZXNBcnJheTtcblxuICAgIGZ1bmN0aW9uIGxpYWJpbGl0aWVzUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2xpYWJpbGl0aWVzRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW3JlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0eVRlbXBsYXRlID0gJCgnI2xpYWJpbGl0eVRtcGx0JykudGV4dCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogW2xpYWJpbGl0eUluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIGFzc2V0IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0eUluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2xpYWJpbGl0aWVzSG9sZGVyIHRoZSBkaXYgd2hlcmUgYXNzZXQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgbGlhYmlsaXRpZXNIb2xkZXIgPSAkKCcjbGlhYmlsaXRpZXNIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2xpYWJpbGl0aWVzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCBhc3NldCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyBhc3NldHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IGFzc2V0IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgYXNzZXQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBhc3NldFxuICAgICAgICAgKi9cbiAgICAgICAgbGlhYmlsaXRpZXNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1saV9jcmVkaXRvcl0nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdsaV9jcmVkaXRvcicpWzFdLCAxMCk7XG5cblxuICAgICAgICAgICAgbGlhYmlsaXR5SW5kZXggPSBteUluZGV4O1xuICAgICAgICAgICAgbGlhYmlsaXRpZXNBcnJheS5wdXNoKGxpYWJpbGl0eUluZGV4KTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZUxpYWJpbGl0eShpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGlhYmlsaXRpZXNBcnJheSlcbiAgICAgICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICAkKCcjYWRkQW5vdGhlckxpYWJpbGl0eScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBhZGRMaWFiaWxpdHkoKTtcblxuICAgICAgICB9KTtcblxuXG4gICAgfTsvLy8vIGxpYWJpbGl0aWVzUmVhZHlcblxuXG5cbiAgICBmdW5jdGlvbiBhZGRMaWFiaWxpdHkoKXtcblxuICAgICAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICAgICAgbGlhYmlsaXR5SW5kZXgrKztcbiAgICAgICAgbGlhYmlsaXRpZXNBcnJheS5wdXNoKGxpYWJpbGl0eUluZGV4KTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gbGlhYmlsaXR5VGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBsaWFiaWxpdHlJbmRleCk7XG5cbiAgICAgICAgdmFyIGlkID0gbGlhYmlsaXRpZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgICAgICB2YXIgbGlhYmlsaXR5ID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgbGlhYmlsaXR5LmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICByZW1vdmVMaWFiaWxpdHkoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAgICAgKi9cblxuICAgICAgICBsaWFiaWxpdHkuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIHllc05vUmFkaW8obGlhYmlsaXR5KTtcbiAgICAgICAgZHJvcGRvd25MYWJlbChsaWFiaWxpdHkpO1xuXG5cbiAgICAgICAgbGlhYmlsaXRpZXNIb2xkZXIuYXBwZW5kKGxpYWJpbGl0eSk7XG5cbiAgICAgICAgbGlhYmlsaXR5LnNsaWRlRG93bigpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVMaWFiaWxpdHkocmVtb3ZlSW5kZXgpe1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBsaWFiaWxpdGllc0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNsaWFiaWxpdHlfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVMaWFiaWxpdHlcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRMaWFiaWxpdHkgYW5kIHJlbW92ZUxpYWJpbGl0eVxuICAgICAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMoKXtcbiAgICAgICAgdmFyIGxpbWl0ID0gbGlhYmlsaXRpZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVt4XTtcblxuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcblxuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0vLy8vIGZvciB4XG4gICAgfS8vLy8gZnVuLiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkc1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogW3VwZGF0ZUFzc2V0c0Nsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIGFzc2V0XVxuICAgIC8vICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbiAgICAvLyAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpe1xuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBsaWFiaWxpdGllc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjbGlhYmlsaXR5XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJMaWFiaWxpdHknKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5Jykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0Q2xvc2VCdG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZGVjbGFyYXRpb25zUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZGVjbGFyYXRpb25zUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2RlY2xhcmF0aW9uc0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfb3duZXJzaGlwXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9b3Rfd29ya2luZ3dpdGhdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3llZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3llZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9jaXRpemVuXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ25vJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXNpZGVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXNpZGVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9icHJpbWFyeV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm93bmVyc2hpcCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vd25lcnNoaXAsIC5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBkZWNsYXJhdGlvbnNSZWFkeVxufSkoKTtcblxuXG5cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29EZWNsYXJhdGlvbnNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBjb0RlY2xhcmF0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0RlY2xhcmF0aW9uc0Zvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWRlX2NvX2NpdGl6ZW5dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAnbm8nKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFsaWVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFsaWVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfTsvLy8vIGNvRGVjbGFyYXRpb25zUmVhZHlcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZ292ZXJubWVudFJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGdvdmVybm1lbnRSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjZ292Rm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gZ292ZXJubWVudFJlYWR5XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGFja1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGFja1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNhY2tGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBhY2tSZWFkeVxufSkoKTtcblxuXG5cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZWRpc2Nsb3N1cmVSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBlZGlzY2xvc3VyZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNlZGlzY2xvc3VyZUZvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgfTsvLy8vIGVkaXNjbG9zdXJlUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGluc3RydWN0aW9uc1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGluc3RydWN0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNpbnN0cnVjdGlvbnNGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBpbnN0cnVjdGlvbnNSZWFkeVxufSkoKTtcblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGRlcG9zaXRSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBkZXBvc2l0UmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2RlcG9zaXRGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgJCgnaW5wdXQuY2FyZGV4cGlyYXRpb24nKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDYXJkRGF0ZSk7XG5cblxuICAgIH07Ly8vLyBkZXBvc2l0UmVhZHlcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
