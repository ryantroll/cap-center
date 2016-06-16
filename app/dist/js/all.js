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
var _appVars = {};
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

    clearInterval(_appVars.scrollInte);//// stop anyscrolling

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
    _appVars.scrollInte = setInterval(function(){
        /// ease out math
        var per = 1 - t/d;
        var newY =  -c * (1-per*per*per*per) + b;

        // console.log(">>", 1-(1-per)*(1-per));
        window.scrollTo(0, newY);


        if(t == d){
            clearInterval(_appVars.scrollInte);
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
 * These global variables shared with
 */
var addressTemplate, addressIndex;
(function(){
    $(document).ready(borrowerReady);

    function borrowerReady(){

        var myForm = $('#borrowerForm');
        /**
         * do nothing if the form is not #borrowerForm
         */
        if(myForm.length <= 0) return;

        /**
         * [addressIndex will track the number of address added and stop if total of 4 address]
         * @type {Number}
         */
        addressIndex = 1;

        addressTemplate = $('#addressTemplate').html();

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
        checkAddressLength(myForm, addressIndex); //// function in main.js

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
    if(addressIndex >= nextId) return false;

    var section = $('#preAddress');
    addressIndex = nextId;
    var address = $(addressTemplate.replace(/(\{\#\})/g, addressIndex));

    address.find('.cc-field.cc-to-be-validate').addClass('cc-validate');
    fillStateDropdown( address.find('.state-dropdown') ); //// fun. in main.js

    address.find('input.numbers').on('keydown', restrictNumbers);

    checkAddressLength(address, addressIndex);

    section.append(address);
    addAutoAddress(addressIndex);

    updateTabIndex( $('.cc-form')); //// function in main.js
    section.slideDown();
}

function removeAddress(idRemove){

    if(idRemove <=1) return false;
    if(idRemove > addressIndex) return false;

    var section = $('#preAddress');
    for(var x = idRemove; x<=addressIndex; x++){
        var address = section.find('#address_' + x);

        address.find('.cc-field').removeClass('cc-validate error correct');
        address.remove();
        updateTabIndex( $('.cc-form')); //// function in main.js
    }
    addressIndex = idRemove-1;
    if(addressIndex <= 1) section.slideUp()
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
         * [addressIndex will track the number of address added and stop if total of 4 address]
         * @type {Number}
         */
        addressIndex = 1;

        addressTemplate = $('#addressTemplate').html();

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
        checkAddressLength(myForm, addressIndex);

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
 * Below global variables are shared with co-borrower income page
 */
var employerTemplate, employerIndex, employersHolder;
var rentTemplate, rentIndex, rentsHolder, rentsArray;

(function(){
    $(document).ready(boIncomeReady);


    function boIncomeReady(){

        var myForm = $('#boIncomeForm');
        /**
         * do nothing if the form is not #coBorrowerForm
         */
        if(myForm.length <= 0) return;

        employerTemplate = $('#employerTmplt').text();
        employerIndex = 1;
        employersHolder = $('#employersHolder');


        /**
         * [rentTemplate variable to hold the html template as string]
         */
        rentTemplate = $('#rentTmplt').text();
        /**
         * [rentIndex a variable to track the rent property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        rentIndex = 0;

        /**
         * [rentsHolder the div where rent properties will be appended]
         */
        rentsHolder = $('#rentsHolder');

        /**
         * [rentsArray will track the position of each rent property index
         * when user start adding and removing rents randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first rent has index of 4 and second rent has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateRentsFields function
         */
        rentsArray = [];

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
        employersHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            addAutoAddress(myIndex);
            bindEmploymentDate(myIndex);
            employerIndex = myIndex;
        });

        /**
         * initialize the form when its preloaded with saved data for rent properties
         */
        rentsHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            var myId = parseInt($(this).find('input[id^=re_address]').eq(0).attr('id').split('re_address')[1], 10);

            addAutoAddress(100 + myIndex);

            rentIndex = myIndex;
            rentsArray.push(rentIndex);

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

                if(employerIndex > 1){
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
                if(rentsArray.length < 1){
                    addRent();
                    $('#addRentProperty').show();
                }

            }//// if
            else{
                excludeFields({
                    selector:'.rental',
                    validationClass:'.cc-to-be-validate'
                }); //// function in main.js

                while(rentsArray.length > 0){
                    removeRent(rentsArray[rentsArray.length-1]);
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
    if(index < employerIndex) return;

    /**
     * if the employer with index is already added do nothing
     */
    if($('#employer_' + index).length > 0){
        return;
    }

    employerIndex = index;

    var employer = $(employerTemplate.replace(/(\{\#\})/g, employerIndex));

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
                $(this).detach().remove();
                updateTabIndex($('.cc-form'));
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

function addRent(){

    if(rentsArray.length >= 5) return;

    rentIndex++;
    rentsArray.push(rentIndex);
    var template = rentTemplate.replace(/(\{\#index\})/g, rentIndex);

    var id = rentsArray.length;
    template = template.replace(/(\{\#id\})/g, id);


    /**
     * [addressIndex is used to help add and track the address fields for type ahead address functionality]
     * 100 + is added to differentiate the rent property address fields from employer address fields
     */
    var addressIndex = 100 + rentIndex;
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


    rentsHolder.append(rent);

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
    var position = rentsArray.indexOf(removeIndex);

    $('#property_' + removeIndex).slideUp({
        complete:function(){
            $(this).remove();
            updateTabIndex($('.cc-form'));
        }
    });
    rentsArray.splice(position, 1);

    updateRentsFields();

    updateRentCloseBtn();
}//// fun. removeRent

/**
 * [updateRentsFields this function will ensure the rent property name and id is always in series of 1,2,3,4,....]
 * this function is called in addRent and removeRent
 * this function assume the fields names and ids contain ONE number of 1 or 2 digits
 */
function updateRentsFields(){
    var limit = rentsArray.length;
    if(limit < 1) return;

    for(var x=0; x<limit; x++){
        var index = rentsArray[x];

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
    if(rentsArray.length > 1){
        var index = rentsArray[0];
        var rentDiv = $('#property_'+index);
        rentDiv.find('a.close').show();
    }
    else{
        var index = rentsArray[0];
        var rentDiv = $('#property_'+index);
        rentDiv.find('a.close').hide();
    }

    if(rentsArray.length >= 5){
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
        employerTemplate = $('#employerTmplt').text();
        employerIndex = 1;
        employersHolder = $('#employersHolder');


        /**
         * [rentTemplate variable to hold the html template as string]
         */
        rentTemplate = $('#rentTmplt').text();
        /**
         * [rentIndex a variable to track the rent property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        rentIndex = 0;

        /**
         * [rentsHolder the div where rent properties will be appended]
         */
        rentsHolder = $('#rentsHolder');

        /**
         * [rentsArray will track the position of each rent property index
         * when user start adding and removing rents randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first rent has index of 4 and second rent has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateRentsFields function
         */
        rentsArray = [];

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
        employersHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            addAutoAddress(myIndex);
            bindEmploymentDate(myIndex);
            employerIndex = myIndex;
        });

        /**
         * initialize the form when its preloaded with saved data for rent properties
         */
        rentsHolder.children().each(function(x){
            var myIndex = parseInt($(this).attr('data-index'), 10);
            var myId = parseInt($(this).find('input[id^=re_co_address]').eq(0).attr('id').split('re_co_address')[1], 10);

            addAutoAddress(100 + myIndex);

            rentIndex = myIndex;
            rentsArray.push(rentIndex);

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

                if(employerIndex > 1){
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
                if(rentsArray.length < 1){
                    addRent();
                    $('#addRentProperty').show();
                }

            }//// if
            else{
                excludeFields({
                    selector:'.rental',
                    validationClass:'.cc-to-be-validate'
                }); //// function in main.js

                while(rentsArray.length > 0){
                    removeRent(rentsArray[rentsArray.length-1]);
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

(function() {
    $(document).ready(assetsReady);
    var assetTemplate, assetIndex, assetsHolder, assetsArray;
    var estateTemplate, estateIndex, estatesHolder, estatesArray;

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
        estateTemplate = $('#estateTmplt').text();

        /**
         * [assetIndex a variable to track the asset property inside the DOM
         * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
         * @type {Number}
         */
        assetIndex = 0;
        estateIndex = 0;

        /**
         * [assetsHolder the div where asset properties will be appended]
         */
        assetsHolder = $('#assetsHolder');
        estatesHolder = $('#estateHolder');

        /**
         * [assetsArray will track the position of each asset property index
         * when user start adding and removing assets randomly this array will keep track of
         * e.g retnsArray = [4, 6] means the first asset has index of 4 and second asset has index of 6
         * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateassetsFields function
         */
        assetsArray = [];
        estatesArray = [];

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
                while(assetsArray.length > 0){
                    var idToRemove = assetsArray.pop();
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
                while(estatesArray.length > 0){
                    var idToRemove = estatesArray.pop();
                    $('#estate_' + idToRemove).slideUp(function(){
                        $(this).remove();
                    })
                }/// while
                excludeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
            }
        });



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

        dropdownLabel(asset);


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


    function addEstate(){

        if(estatesArray.length >= 5) return;

        estateIndex++;
        estatesArray.push(estateIndex);
        var template = estateTemplate.replace(/(\{\#index\})/g, estateIndex);

        var id = estatesArray.length;
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

        estatesHolder.append(estate);

        dropdownLabel(estate);
        yesNoRadio(estate);
        fillStateDropdown(estate);
        addAutoAddress(estateIndex, true); /// true is to force the label to start from 1, default 1 will be ignored
        bindEstateMortgage(estateIndex);

        estate.slideDown();

        updateTabIndex($('.cc-form'));

        updateEstateCloseBtn();
    }//// fun. addRent

    function removeEstate(removeIndex){
        var position = estatesArray.indexOf(removeIndex);

        $('#estate_' + removeIndex).slideUp({
            complete:function(){
                $(this).remove();
                updateTabIndex($('.cc-form'));
            }
        });
        estatesArray.splice(position, 1);

        updateEstatesFields();

        updateEstateCloseBtn();
    }//// fun. removeAsset

    /**
     * [updateEstatesFields this function will ensure the Estate name and id is always in series of 1,2,3,4,....]
     * this function is called in addEstate and removeEstate
     * this function assume the fields names and ids contain ONE number of 1 or 2 digits
    */
    function updateEstatesFields(){
        var limit = estatesArray.length;
        if(limit < 1) return;

        for(var x=0; x<limit; x++){
            var index = estatesArray[x];

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

        if(estatesArray.length > 1){
            var index = estatesArray[0];
            var estateDiv = $('#estate_'+index);
            estateDiv.find('a.close').show();
        }
        else{
            var index = estatesArray[0];
            var estateDiv = $('#estate_'+index);
            estateDiv.find('a.close').hide();
        }

        if(estatesArray.length >= 5){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwic3VwcG9ydC5qcyIsIm1haW4uanMiLCIwMS1ib3Jyb3dlci5qcyIsIjAyLWNvYm9ycm93ZXIuanMiLCIwMy1wdXJjaGFzZS5qcyIsIjA0LXJlZmluYW5jZS5qcyIsIjA1LWluY29tZS5qcyIsIjA2LWNvLWluY29tZS5qcyIsIjA3LWFzc2V0cy5qcyIsIjA4LWxpYWJpbGl0aWVzLmpzIiwiMDktZGVjbGFyYXRpb25zLmpzIiwiMTAtY28tZGVjbGFyYXRpb25zLmpzIiwiMTEtZ292ZXJubWVudC5qcyIsIjEyLWFja25vd2xlZGdlbXRuLmpzIiwiMTMtZWRpc2Nsb3N1cmUuanMiLCIxNC1pbnN0cnVjdGlvbnMuanMiLCIxNS1kZXBvc2l0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNW5CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2prQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMWFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNTdGF0ZXMgPSBbXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQWxhYmFtYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQUxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbGFza2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFLXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQW1lcmljYW4gU2Ftb2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFTXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQXJpem9uYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBcmthbnNhc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJDQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNvbG9yYWRvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJDT1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNvbm5lY3RpY3V0XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJDVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkRlbGF3YXJlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJERVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkRpc3RyaWN0IE9mIENvbHVtYmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJEQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRk1cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJGbG9yaWRhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJGTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkdlb3JnaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkdBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR3VhbVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiR1VcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJIYXdhaWlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkhJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSWRhaG9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklEXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSWxsaW5vaXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW5kaWFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSU5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJb3dhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkthbnNhc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiS1NcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJLZW50dWNreVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiS1lcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJMb3Vpc2lhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkxBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFpbmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1FXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXJ5bGFuZFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTURcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXNzYWNodXNldHRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pY2hpZ2FuXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pbm5lc290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTU5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaXNzaXNzaXBwaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaXNzb3VyaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTU9cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNb250YW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5lYnJhc2thXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJORVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldmFkYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTlZcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgSGFtcHNoaXJlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBKZXJzZXlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5KXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IE1leGljb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTk1cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgWW9ya1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTllcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aCBDYXJvbGluYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aCBEYWtvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5EXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNUFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9oaW9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2tsYWhvbWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9LXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT3JlZ29uXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlBhbGF1XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQV1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlBlbm5zeWx2YW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUEFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQdWVydG8gUmljb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUFJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJSaG9kZSBJc2xhbmRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlJJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiU291dGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlNDXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiU291dGggRGFrb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJTRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRlbm5lc3NlZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVE5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUZXhhc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVFhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJVdGFoXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJVVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZlcm1vbnRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlZUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlZJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmlyZ2luaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlZBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2FzaGluZ3RvblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXZXN0IFZpcmdpbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXVlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldpc2NvbnNpblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV0lcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXeW9taW5nXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXWVwiXG4gICAgICB9XG4gIF07IiwiKGZ1bmN0aW9uKCAkICkge1xuICAgICQuZm4udmFsaWRhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmlsdGVyKCdmb3JtJyk7XG4gICAgICAgIHZhciBpbnZhbGlkRmllbGRzID0gW107XG5cbiAgICAgICAgZm9ybS5vZmYoJ3N1Ym1pdCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBpc0Zvcm1WYWxpZCA9IHRydWU7XG4gICAgICAgICAgICBpbnZhbGlkRmllbGRzID0gW107XG5cbiAgICAgICAgICAgIGZvcm0uZmluZCgnLmNjLWZpZWxkLmNjLXZhbGlkYXRlJykuZWFjaChmdW5jdGlvbihuKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgLy8gaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gc2VsZi52YWxpZGF0ZUZpZWxkKCk7XG5cblxuICAgICAgICAgICAgICAgIC8vLy8gZmFsc2UgYW5kIHRydWUgc3RyaWN0bHkgdGVzdCBhcyBudWxsIHdpbGwgcmV0dXJuZWQgaXMgZmllbGQgaXMgbm90IHZhbGlkYXRlZFxuICAgICAgICAgICAgICAgIGlmKGZhbHNlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgaXNGb3JtVmFsaWQgPSBpc0Zvcm1WYWxpZCAmJiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCBpbnB1dFt0eXBlPVwidGVsXCJdLCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sIGlucHV0W3R5cGU9XCJkYXRlXCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBzZWxmLmZpbmQoJ2xhYmVsJykuZXEoMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZFcnIgPSB7ZmlsZWQ6bGFiZWwudGV4dCgpLCBpZDpmaWVsZC5hdHRyKCdpZCcpLCBlcnJvcjplcnJ9O1xuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkRmllbGRzLnB1c2goZkVycilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLy8vIC5lYWNoXG5cblxuICAgICAgICAgICAgdmFyIGV4dHJhID0gY2FsbGJhY2soaXNGb3JtVmFsaWQsIGludmFsaWRGaWVsZHMubGVuZ3RoID4gMCA/IGludmFsaWRGaWVsZHMgOiBudWxsKTtcblxuICAgICAgICAgICAgaXNGb3JtVmFsaWQgPSBpc0Zvcm1WYWxpZCAmJiAhIWV4dHJhO1xuXG5cbiAgICAgICAgICAgIGlmKHRydWUgIT09IGlzRm9ybVZhbGlkKXtcbiAgICAgICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7Ly8vLyAub24gc3VibWl0XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0TXlDb250YWluZXIgPSBmdW5jdGlvbihmaWVsZCl7XG4gICAgICAgIHZhciBwID0gZmllbGQucGFyZW50KCk7XG4gICAgICAgIGlmKHRydWUgPT09IHAuaGFzQ2xhc3MoJ2NjLWZpZWxkJykpe1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBnZXRNeUNvbnRhaW5lcihwKTtcbiAgICAgICAgfVxuICAgIH0vLy8vIGZ1bi4gZ2V0TXlDb250YWluZXJcblxuXG4gICAgdmFyIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKCQodGhpcykpO1xuICAgICAgICBjb250YWluZXIudmFsaWRhdGVGaWVsZCgpXG4gICAgfVxuXG4gICAgJC5mbi52YWxpZGF0ZUZpZWxkID0gZnVuY3Rpb24oc2VsZil7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGYgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgICAgIHZhciB2ID0gJC50cmltKGYudmFsKCkpO1xuICAgICAgICB2YXIgZXJyID0gZi5kYXRhKCdlcnInKTtcbiAgICAgICAgdmFyIHR5cGUgPSBmLmF0dHIoJ3R5cGUnKTtcblxuICAgICAgICBpZighZXJyKSBlcnIgPSB7fTtcblxuICAgICAgICB2YXIgaXNWYWxpZCA9IHRydWU7XG4gICAgICAgIHZhciBpc1ZhbGlkYXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXJlcXVpcmVkJykpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLy8vIGhhbmRsZSByYWRpbyBidXR0b24gY2FzZVxuICAgICAgICAgICAgaWYodHlwZSAmJiAodHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKSApe1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gZi5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIHJhZGlvcyA9IHNlbGYuZmluZChcImlucHV0W25hbWU9XCIrbmFtZStcIl1cIik7XG4gICAgICAgICAgICAgICAgcmFkaW9zLmVhY2goZnVuY3Rpb24ocil7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSAhIXJhZGlvcy5lcShyKS5hdHRyKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8vIGJyZWFrIC5lYWNoIG9mIG9uIHJhZGlvIGJ1dHRvbiBmb3VuZCBjaGVja2VkXG4gICAgICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IGlzVmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGYgPSByYWRpb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHR5cGUgJiYgdHlwZS50b0xvd2VyQ2FzZSgpID09PSAnY2hlY2tib3gnKXtcbiAgICAgICAgICAgICAgICBpZihmLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBmLmVhY2goZnVuY3Rpb24ocil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gISFmLmVxKHIpLmF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vLy8vIGJyZWFrIC5lYWNoIG9mIG9uIHJhZGlvIGJ1dHRvbiBmb3VuZCBjaGVja2VkXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0vLy8vIGlmIExlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpZih2Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdHlwZSByYWRpbyBlbHNlXG5cbiAgICAgICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXJlcXVpcmVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcmVxdWlyZWQnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLy8gaWYgdi5sZW5ndGhcbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1yZXF1aXJlZCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IC8vLy8gaWYgY2MtcmVxdWlyZWRcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1udW1iZXInKSAmJiB2KXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciByZWd4ID0gL14oXFxkKSsoXFwuXFxkKyk/JC87XG4gICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtbnVtYmVyJyk7XG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLW51bWJlciddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLW51bWJlciddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWVtYWlsJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWVtYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWVtYWlsJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZW1haWwnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZW1haWwnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRhdGUnKSl7XG5cbiAgICAgICAgICAgIGlmKHYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXGR7Mn1cXC9cXGR7Mn1cXC9cXGR7NH0kLztcbiAgICAgICAgICAgICAgICB2YXIgc3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBzcGxpdFswXSA/IE51bWJlcihzcGxpdFswXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBkID0gc3BsaXRbMV0gPyBOdW1iZXIoc3BsaXRbMV0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHNwbGl0WzJdID8gTnVtYmVyKHNwbGl0WzJdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIG0zMSA9IFsxLCAzLCA1LCA3LCA4LCAxMCwgMTJdO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFtIHx8IG0gPiAxMiB8fCBtIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobTMxLmluZGV4T2YobSkgPj0wICl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMSB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWQgfHwgZCA+IDMwIHx8IGQgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihtID09IDIpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2QgPSB5ICUgNCA9PSAwID8gMjkgOiAyODtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWQgfHwgZCA+IF9kIHx8IGQgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtZGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZGF0ZSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB2XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBoYXNDbGFzcyBjYy1kYXRlXG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgIC8vICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgIC8vIH1cblxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRhdGUgY2MtZGF0ZS1ndCcpKXtcbiAgICAgICAgICAgIHZhciBndEZpZWxkID0gJCgnIycrc2VsZi5hdHRyKCdkYXRhLWRhdGUtZ3QnKSk7XG4gICAgICAgICAgICB2YXIgZ3RWYWwsIHN0YXJ0RGF0ZSwgZW5kRGF0ZTtcbiAgICAgICAgICAgIGlmKHYubGVuZ3RoID09PSAxMCl7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGVTcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoTnVtYmVyKGRhdGVTcGxpdFsyXSksIE51bWJlcihkYXRlU3BsaXRbMF0pLTEsIE51bWJlcihkYXRlU3BsaXRbMV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGd0RmllbGQubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaWYoZ3RGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGVTcGxpdCA9IGd0RmllbGQudmFsKCkuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoTnVtYmVyKGRhdGVTcGxpdFsyXSksIE51bWJlcihkYXRlU3BsaXRbMF0pLTEsIE51bWJlcihkYXRlU3BsaXRbMV0pKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihlbmREYXRlIDwgc3RhcnREYXRlKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGd0RmllbGQubGVuZ3RoID4gMFxuXG4gICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtZGF0ZS1ndCcpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWRhdGUtZ3QnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlLWd0J107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGhhc0NsYXNzIGNjLWRhdGUtZ3RcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1jYXJkLWV4cGlyYXRpb24nKSl7XG5cbiAgICAgICAgICAgIGlmKHYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXGR7Mn1cXC9cXGR7NH0kLztcbiAgICAgICAgICAgICAgICB2YXIgc3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgdmFyIG0gPSBzcGxpdFswXSA/IE51bWJlcihzcGxpdFswXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBkID0gMTtcbiAgICAgICAgICAgICAgICB2YXIgeSA9IHNwbGl0WzFdID8gTnVtYmVyKHNwbGl0WzFdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBudWxsXG5cbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkYXRlID0gbmV3IERhdGUoeSwgbS0xLCBkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighbSB8fCBtID4gMTIgfHwgbSA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYobnVsbCAhPT0gZGF0ZSAmJiBkYXRlIDw9IG5vdyApe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWNhcmQtZXhwaXJhdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtY2FyZC1leHBpcmF0aW9uJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY2FyZC1leHBpcmF0aW9uJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWNhcmQtZXhwaXJhdGlvbiddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcGhvbmUnKSl7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFwoXFxkezN9XFwpKCApP1xcZHszfVxcLVxcZHs0fSQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXBob25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcGhvbmUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWN1cnJlbmN5Jykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXCQ/KFxcZHsxLDN9KSsoXFwsKlxcZHszfSkqJC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY3VycmVuY3knKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jdXJyZW5jeSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXNzbicpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezN9KFxcLSk/XFxkezJ9KFxcLSk/XFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2Mtc3NuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2Mtc3NuJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXJlcXVpcmVkLW9uZS1vZicpKXtcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAkKCcuJytzZWxmLmF0dHIoJ2RhdGEtb25lLW9mLWNsYXNzJykgKyAnIGlucHV0Jyk7XG5cbiAgICAgICAgICAgIHZhciBfaXNWYWxpZCA9IGZhbHNlOyAvLy8vIGxvY2FsIGlzVmFsaWQgdmFyIHdpbGwgYmUgJiYgd2l0aCBpc1ZhbGlkXG4gICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICBfaXNWYWxpZCA9IF9pc1ZhbGlkIHx8ICEhJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBfaXNWYWxpZCkgcmV0dXJuIGZhbHNlOy8vLy8gc3RvcCBlYWNoIGlmIG9uZSBmaWxlZCBpcyBmb3VuZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIF9pc1ZhbGlkO1xuXG4gICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQtb25lLW9mJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG5cbiAgICAgICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIF9lcnIgPSAkKHRoaXMpLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgX2VyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG4gICAgICAgICAgICAgICAgICAgIC8vICQodGhpcykuZGF0YSgnZXJyJywgX2Vycik7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtcmVxdWlyZWQtb25lLW9mJykuaGlkZUVycm9yKCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGhhc0NsYXNzIGNjLXJlcXVpcmVkLW9uZS1vZlxuXG4gICAgICAgIC8vLy8gcmVzZXQgdGhlIGZpZWxkIGVycm9ycyBiZWZvcmUgYWRkaW5nIHRoZW0gYWdhaW5cbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXJyb3IgY29ycmVjdCBtZXNzYWdlJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmLmRhdGEoJ2lzVmFsaWQnLCBpc1ZhbGlkKTtcblxuICAgICAgICAvLy8vIGlmIGZpZWxkIHBhc3NlZCB0aHJvdWdoIHZhbGlkYXRpb24gc2hvdyBlcnJvciBpZiBhbnlcbiAgICAgICAgLy8gaWYodHJ1ZSA9PT0gaXNWYWxpZGF0ZWQgKXtcbiAgICAgICAgLy8gaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgaWYoZmFsc2UgPT0gaXNWYWxpZCB8fCBPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICAgICAgZi5zaG93RXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgZi5oaWRlRXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIH0vLy8vIGlmIGlzVmFsaWRhdGVkXG5cbiAgICB9Ly8vLyBmdW4uIHZhbGlkYXRlRmlsZFxuXG4gICAgJC5mbi5zaG93RXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gZi5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IodmFyIGUgaW4gZXJyKXtcbiAgICAgICAgICAgIHN0ci5wdXNoKGVycltlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2Vycm9yJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpO1xuXG4gICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpLm9uKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZihzdHIubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgdmFyIG1zZyA9ICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCIgaWQ9XCJlcnJvck1zZ1wiPjxpIGNsYXNzPVwiaWNvbi1lcnJvciBnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZS1zaWduXCI+PC9pPiAnICsgc3RyLmpvaW4oJyB8ICcpICsgJzwvZGl2PicpLnNob3coKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQobXNnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnbWVzc2FnZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfS8vLy8gZnVuLiBzaG93RXJyb3JcblxuICAgICQuZm4uaGlkZUVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZpbHRlcignaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lcSgwKTtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG5cbiAgICAgICAgLy8gY29udGFpbmVyLmFkZENsYXNzKCdjb3JyZWN0Jyk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3IgbWVzc2FnZScpO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLmFkZEVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmaWVsZCk7XG5cbiAgICAgICAgdmFyIG1zZyA9IGNvbnRhaW5lci5maW5kKCcubWVzc2FnZS4nK2Vycm9yQ2xhc3MpLmVxKDApLnRleHQoKTtcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSBlcnIgPSB7fTtcblxuICAgICAgICBlcnJbZXJyb3JDbGFzc10gPSBtc2c7XG5cbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgJC5mbi5yZW1vdmVFcnJvciA9IGZ1bmN0aW9uKGVycm9yQ2xhc3MpIHtcblxuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgaWYoIWVycikgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgZGVsZXRlIGVycltlcnJvckNsYXNzXTtcbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG59KCBqUXVlcnkgKSk7IiwiKGZ1bmN0aW9uKCAkICkge1xuICAgIHZhciBwYW5sZSwgcG9wdXAsIGJ0biwgcXVlc3Rpb25zLCBhY3RpdmVRdWVzdGlvbiwgZmllbGRzO1xuICAgIHZhciBoZWxsb01lc3NhZ2U7XG5cbiAgICAkLmZuLmNjU3VwcG9ydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMuZmluZCgnLmNjLXN1cHBvcnQnKTtcblxuXG4gICAgICAgIGlmKHNlbGYubGVuZ3RoIDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIHBhbmVsID0gc2VsZi5maW5kKCcuY2Mtc3VwcG9ydC1wYW5lbCcpLmVxKDApO1xuICAgICAgICBwb3B1cCA9IHNlbGYuZmluZCgnLmNjLXN1cHBvcnQtcG9wdXAnKS5lcSgwKTtcbiAgICAgICAgYnRuID0gc2VsZi5maW5kKCcuYnRuJykuZXEoMCk7XG4gICAgICAgIHF1ZXN0aW9ucyA9IHBhbmVsLmZpbmQoJy5jYy1zdXBwb3J0LXF1ZXN0aW9ucyBsaScpO1xuICAgICAgICBhY3RpdmVRdWVzdGlvbiA9IG51bGw7XG5cbiAgICAgICAgZmllbGRzID0ge307XG5cbiAgICAgICAgaGVsbG9NZXNzYWdlID0gc2VsZi5maW5kKCcubWVzc2FnZS5oZWxsbycpLnRleHQoKTtcblxuICAgICAgICBxdWVzdGlvbnMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZm9yJyk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhIWlkKXtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge2luZGV4OngsIHE6JCh0aGlzKS5maW5kKCdhJykuZXEoMCkudGV4dCgpfTtcbiAgICAgICAgICAgICAgICBmaWVsZHNbaWRdID0gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgdmFyIHRvZ2dsZVBhbmVsID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYocGFuZWwuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpe1xuICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLmZpbHRlcignLmV4cGFuZGVkJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnJlbW92ZUNsYXNzKCdvdXQnKVxuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgIH0vLy8vIGlmIGhhc0NhbHNzXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGJ0bi5hZGRDbGFzcygnb3V0Jyk7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaGlkZSB0aGUgcG9wdXAgaWYgaXRzIHZpc2libGVcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihwb3B1cC5oYXNDbGFzcygndmlzaWJsZScpKXtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXAucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwYW5lbC5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogRXhwYW5kIHF1ZXN0aW9uIHdoZW4gcGFuZWwgaXMgb3BlbmVkIGlmIHRoZSBhY3RpdmVRdXN0aW9uIGlzXG4gICAgICAgICAgICAgICAgICAgICAqIGJlZW4gc2V0IHdpdGggZmllbGQgZm9jdXMgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmKG51bGwgIT09IGFjdGl2ZVF1ZXN0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5lcShhY3RpdmVRdWVzdGlvbikuZmluZCgnYScpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVRdWVzdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgfSwgMzAwKTsgLy8vIHNldFRpbWVvdXRcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgfS8vLyBpZiBoYXNDbGFzcyBlbHNlXG4gICAgICAgIH0vLy8vIGZ1bi4gdG9nZ2xlUGFuZWxcblxuICAgICAgICB2YXIgdG9nZ2xlUXVlc3Rpb24gPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcbiAgICAgICAgICAgIHZhciBpID0gcGFyZW50LmZpbmQoJ2knKTtcblxuICAgICAgICAgICAgaWYocGFyZW50Lmhhc0NsYXNzKCdleHBhbmRlZCcpKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgaS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVzdGlvbnMuZmlsdGVyKCcuZXhwYW5kZWQnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpJykuYWRkQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1yaWdodCcpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtYm90dG9tJyk7XG5cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIGkuYWRkQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0Jyk7XG5cbiAgICAgICAgfS8vLy8gZnVuLiB0b2dnbGVRdWVzdGlvblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGb2N1cyBFdmVudCBoYW5kbGVyIGZvciBmaWVsZHMgdG8gc2hvdyBoZWxwZXIgbWVzc2FnZVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHNob3dQb3B1cCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdpZCcpO1xuXG4gICAgICAgICAgICBpZihpZCBpbiBmaWVsZHMpe1xuICAgICAgICAgICAgICAgIHBvcHVwLmFkZENsYXNzKCd2aXNpYmxlJykudGV4dChmaWVsZHNbaWRdLnEpO1xuICAgICAgICAgICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gZmllbGRzW2lkXS5pbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gZnVuLnNob3dQb3B1cFxuXG4gICAgICAgIHZhciBoaWRlUG9wdXAgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHBvcHVwLnJlbW92ZUNsYXNzKCd2aXNpYmxlJykudGV4dCgnJyk7XG4gICAgICAgIH0vLy8vIGZ1bi5zaG93UG9wdXBcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQYW5lbCBjbG9zZSBidXR0b25cbiAgICAgICAgICovXG4gICAgICAgIHBhbmVsLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCB0b2dnbGVQYW5lbCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqID8gYnV0dG9uIGJlaGF2aW9yXG4gICAgICAgICAqL1xuICAgICAgICBidG4ub24oJ2NsaWNrJywgdG9nZ2xlUGFuZWwpXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhIWhlbGxvTWVzc2FnZSl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zaG93U3VwcG9ydE1lc3NhZ2UoaGVsbG9NZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHBvcHVwIGJlaGF2aW9yXG4gICAgICAgICAqL1xuICAgICAgICBwb3B1cC5vbignY2xpY2snLCB0b2dnbGVQYW5lbCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluc2lkZSBwYW5lbCBxdWVzdGlvbiBjbGljayBiZWhhdmlvclxuICAgICAgICAgKi9cbiAgICAgICAgcGFuZWwuZmluZCgnLmNjLXN1cHBvcnQtcXVlc3Rpb25zIGxpIGEnKS5vbignY2xpY2snLCB0b2dnbGVRdWVzdGlvbik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCBmb2N1cyBldmVudCBmb3IgZmllbGRzIHRvIHNob3cgdGhlIHJpZ2h0IHF1ZXN0aW9uIGFzIHBvcHVwXG4gICAgICAgICAqIGlmIHRoZXJlIGEgcXVlc3Rpb24gcmVsYXRlZCB0byB0aGlzIGZpZWxkXG4gICAgICAgICAqL1xuICAgICAgICAvLyAkKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLm9uKCdibHVyJywgaGlkZVBvcHVwKS5vbignZm9jdXMnLCBzaG93UG9wdXApO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnb3V0Jyk7XG4gICAgICAgIH0sIDMqMTAwMCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTsvLy8vICQuZm4gZnVuY3Rpb25cblxuICAgICQuZm4uc2hvd1N1cHBvcnRNZXNzYWdlID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgICBpZihmYWxzZSA9PT0gISFwb3B1cCkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdmFyIGludGU7XG4gICAgICAgIHZhciBiZWZvcmVIaWRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZSk7XG4gICAgICAgICAgICBpbnRlID0gc2V0VGltZW91dChoaWRlTWVzc2FnZSwgMjAwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaGlkZU1lc3NhZ2UgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcG9wdXAucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RvcEhpZGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ0bi5vZmYoJ21vdXNlb3V0JywgYmVmb3JlSGlkZSkub24oJ21vdXNlb3V0JywgYmVmb3JlSGlkZSk7XG4gICAgICAgIHBvcHVwLm9mZignbW91c2VvdXQnLCBiZWZvcmVIaWRlKS5vbignbW91c2VvdXQnLCBiZWZvcmVIaWRlKTtcbiAgICAgICAgcG9wdXAub2ZmKCdtb3VzZW92ZXInLCBzdG9wSGlkZSkub24oJ21vdXNlb3ZlcicsIHN0b3BIaWRlKTtcblxuICAgICAgICBwb3B1cC50ZXh0KG1lc3NhZ2UpLmFkZENsYXNzKCd2aXNpYmxlJyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufSggalF1ZXJ5ICkpOyIsInZhciBfYXBwVmFycyA9IHt9O1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShjY0RvY3VtZW50UmVhZHkpO1xuXG5mdW5jdGlvbiBjY0RvY3VtZW50UmVhZHkoKXtcblxuICAgIC8qKlxuICAgICAqIFByb2dyZXNzIG5hdmlnYXRpb24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI3Byb2dyZXNzX3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3NOYXYgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVQb3JncmVzTmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCgnMTAwJScpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKDQwKTsgLy8gY2hhbmdpbmcgdGhlIHdpZHRoIHRvIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiBvZiBwcm9ncmVzcyBiYXIgY2xpY2thYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gYm9keSBzbyBkbyB0aGUgd29yayBvbiBib2R5IGNsaWNrIFxcIG9ubHkgaWYgbWVudSBpcyBjbG9zZWRcbiAgICAgICAgICogdGhpcyB0byBtYWtlIHN1cmUgdGhlIG1lbnUgaXMgY2xvc2VkIHdoZW4gY2xpY2sgb3V0c2lkZSB0aGUgbWVudVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGZhbHNlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBIYW1idXJnZXIgbWVudSBidXR0b24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI21lbnVfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBtZW51TmF2ID0gJCgnI21lbnVfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVNZW51TmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IG1lbnVOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBtZW51TmF2LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmYWxzZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgJCgnYm9keScpLmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNjcm9sbGluZyBldmVudCBsaXN0ZW5lciB0byBtYWtlIHRoZSBwcm9ncmVzcyBiYXIgc3RpY2t5XG4gICAgICovXG4gICAgLy8gaWYoJCgnYm9keScpLndpZHRoKCkgPCA2Nzgpe1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnKS5vbignc2Nyb2xsJywgbWFpblNjcm9sbCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIHN0YXRlcyBkcm9wLWRvd25zXG4gICAgICovXG4gICAgIGZpbGxTdGF0ZURyb3Bkb3duKCAkKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG5cbiAgICAgLyoqXG4gICAgICAqIFN0YXJ0IFN1cHBvcnRcbiAgICAgICovXG4gICAgICQoZG9jdW1lbnQpLmNjU3VwcG9ydCgpO1xuXG5cbiAgICAvKipcbiAgICAgKiBGbG9hdCBsYWJlbCBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5jYy1maWVsZC5mbG9hdCcpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPXRleHRdJykuZXEoMCk7XG5cbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudCA9ICdrZXl1cCc7XG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRyb3Bkb3duJykpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50ID0gJ2NoYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZC5vbih0cmlnZ2VyRXZlbnQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZmllbGQudmFsKCkpe1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlZGl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTsvLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcuanNDb2xsYXBzZScpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5maW5kKCdhLmNsb3NlLCBhLmRpc21pc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVXAoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTsvLy8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvblxuICAgICAqL1xuICAgIHllc05vUmFkaW8oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aSBjaGVja2JveFxuICAgICAqL1xuICAgIG11bHRpQ2hlY2tib3goKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBhcnJvdyBsYWJlbCBiZWhhdmlvciBmb3IgPHNlbGVjdD5cbiAgICAgKi9cbiAgICBkcm9wZG93bkxhYmVsKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEJhY2sgYnV0dG9uIGNsaWNrIGhhbmRsZXJzXG4gICAgICovXG4gICAgJCgnI2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH0pO1xuXG5cblxufS8vLy8gZnVuLiBjY0RvY3VtZW50UmVhZHlcblxuZnVuY3Rpb24gbWFpblNjcm9sbChlKXtcbiAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGlmKCQoJ2JvZHknKS53aWR0aCgpID4gNjc4KSByZXR1cm47XG5cbiAgICB2YXIgcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICB2YXIgYmFyID0gJCgnI3Byb2dyZXNzX25hdicpO1xuICAgIGlmKHMgPiAyMDApe1xuICAgICAgICBpZihmYWxzZSA9PT0gYmFyLmhhc0NsYXNzKCdmbG9hdCcpKXtcbiAgICAgICAgICAgIGJhci5hZGRDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYmFyLmhlaWdodCgpKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGJhci5yZW1vdmVDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBudWxsKVxuICAgIH1cblxufS8vLy8gZnVuLiBtYWluU2Nyb2xsXG5cblxuZnVuY3Rpb24gdXBkYXRlVGFiSW5kZXgoc2VsZWN0b3Ipe1xuICB2YXIgeCA9IDA7XG4gICAgc2VsZWN0b3IuZmluZCgnLmNjLWZpZWxkJykuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgdmFyIHMgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPWRhdGVdLCBpbnB1dFt0eXBlPXRlbF0sIGlucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSwgaW5wdXRbdHlwZT1udW1iZXJdLCB0ZXh0YXJlYSwgc2VsZWN0JylcbiAgICAgICAgcy5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICQodGhpcykuYXR0cigndGFiaW5kZXgnLCB4KzEpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgfSlcbiAgICB9KVxufS8vLy8gZnVuLiB1cGRhdGVUYWJJbmRleFxuXG4vKipcbiAqIFt5ZXNOb1JhZGlvIFdpbGwgc2V0IHRoZSBiZWhhdmlvciBvZiB5ZXMvbm8gcmFkaW8gYnV0dG9ucyBieSBhZGRpbmcgLmNoZWNrZWQgY2xhc3MgdG8gdGhlIGxhYmVsIG9mIHRoZSBidXR0b25dXG4gKiB0aGUgZnVuY3Rpb24gYXNzdW1lIHRoZSBpbnB1dFt0eXBlPXJhZGlvbl0gaXMgaW5jbHVkZWQgaW5zaWRlIDxsYWJlbD4gdGFnXG4gKi9cbmZ1bmN0aW9uIHllc05vUmFkaW8oY29udGFpbmVyKXtcbiAgLy8vLyBpZiBjb250YWluZXIgaXMgcGFzc2VkIGZpbmQgdGhlIHJhZGlvcyBpbnNpZGUgaXQgb3IgZG8gYSBkb2N1bWVudCBnbG9iYWwgZmluZFxuICB2YXIgcmFkaW9zID0gISFjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykgOiAkKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKTtcbiAgcmFkaW9zLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZigkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xhYmVsLmNoZWNrZWQnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgfSlcbiAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gIH0pXG4gIC5vbignYmx1ciBraWxsZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICB9KTtcblxuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpOy8vLy8gdGhpcyB0byBzZXQgdGhlIGluaXRpYWwgc3RhdGVcbn1cblxuZnVuY3Rpb24gbXVsdGlDaGVja2JveCgpe1xuICB2YXIgcmFkaW9zID0gJCgnLmNjLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgIC8vICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uIGdseXBoaWNvbi1vaycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpO1xufS8vLy8gZnVuLiBtdWx0aUNoZWNrQm94XG5cbi8qKlxuICogW2Ryb3Bkb3duTGFiZWwgU2V0IHRoZSBjbGljayBldmVudCBmb3IgYXJyb3cgbGFiZWwgZm9yIDxzZWxlY3Q+IGVsZW1lbnRdXG4gKiB0aGlzIHNvbHV0aW9uIHdvcmtzIG9ubHkgc2FmYXJpIGFuZCBjaHJvbWUgZHVlIHRvIGJyb3dzZXIgbGltaXRhdGlvblxuICovXG5mdW5jdGlvbiBkcm9wZG93bkxhYmVsKGNvbnRhaW5lcil7XG4gIHZhciBsYWJlbHMgPSBjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLmNjLWRyb3Bkb3duIGxhYmVsLmFycm93JykgOiAkKCcuY2MtZHJvcGRvd24gbGFiZWwuYXJyb3cnKTtcbiAgbGFiZWxzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xuICAgICAgaWYoZmFsc2UgPT09ICEhaWQpIHJldHVybjtcbiAgICAgIHZhciBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nKTtcbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pXG59Ly8vLyBmdW4uIGRyb3Bkb3duTGFiZWxcblxuLyoqXG4gKiBbZmlsbFN0YXRlRHJvcGRvd24gd2lsbCBmaWxsIHRoZSBkcm9wZG9uIG9mIFVTQSBzdGF0ZXMgZm9ybSB1c1N0YXRlIHZhcmlhYmxlXVxuICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciBbalF1ZXJ5IG9iamVjdCB0aGF0IGNvbnRhaW4gPHNlbGVjdD4gdGFnIHRvIGJlIGZpbGxlZF1cbiAqIHVzU2F0ZSBpcyBhcnJheSBvZiBvYmplY3QgZGVmaW5lZCBpbiB1cy1zdGF0dXMuanMgZmlsZVxuICovXG5mdW5jdGlvbiBmaWxsU3RhdGVEcm9wZG93bihzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHVsID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKHZhciBzPTA7IHM8dXNTdGF0ZXMubGVuZ3RoOyBzKyspe1xuICAgICAgICAgICAgdmFyIGxpID0gJCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB1c1N0YXRlc1tzXS5hYmJyZXZpYXRpb24gKyAnXCI+JyArIHVzU3RhdGVzW3NdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgICAgICB9Ly8vLyBmb3JcbiAgICB9KTtcbn0vLy8vIGZ1bi4gZmlsbFN0YXRlRHJvcGRvd25cblxuLyoqXG4gKiBbaXNBbmRyb2lkIHNpbXBsZSBmdW5jdGlvbiB0byBkZXRlY3QgQW5kcm9pZCBPU11cbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlY3QgdGhlIGJ1ZyBpbiBBbmRyb2lkIHdoZW4ga2V5ZG93biwga2V5dXAgZXZlbnQgZG9lc24ndCBzZW5kIHRoZSByaWdodCBrZXkgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gW3RydWUgaWYgQW5kcm9pZCBPU11cbiAqL1xudmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn0vLy8vIGZ1bi4gaXNBbmRyb2lkXG5cblxudmFyIHJlc3RyaWN0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC0oKSBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDQ4LCA1NywgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJhd1ZhbHVlID0gdmFsLnNwbGl0KC9bXFwofFxcKXwgfFxcLXxcXCt8XFwuXS8pLmpvaW4oJycpO1xuICB2YXIgZm9ybWF0ZWQgPSAnJztcbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9ICcoJyArIHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnKSAnO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9IHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnLSc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBmb3JtYXRlZCArPSByYXdWYWx1ZTtcblxuICAkKHRoaXMpLnZhbChmb3JtYXRlZCk7XG59Ly8vLyBmdW4uIGZvcm1hdFBob25lXG5cbnZhciByZXN0cmljdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnLyddXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciBmb3JtYXRDYXJkRGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwvL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuXG4gICAgLy8gaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAvLyAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgLy8gICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgLy8gfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vIGZ1bi4gZm9ybWF0Q2FyZERhdGVcblxudmFyIHJlc3RyaWN0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLVwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC0vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMyl7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAzKSArICctJztcbiAgICByYXcgPSByYXcuc2xpY2UoMyk7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICctJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufVxuXG52YXIgcmVzdHJpY3ROdW1iZXJzID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JykuaGlkZUVycm9yKCk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIHJlc3RyaWN0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAkLFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZVNTTlxuXG52YXIgZm9ybWF0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcblxuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5zcGxpdCgvW1xcJHwgfFxcLF0vKS5qb2luKCcnKTtcblxuICBpZihyYXcubGVuZ3RoID4gMyl7XG4gICAgICB2YXIgYXJyID0gcmF3LnNwbGl0KCcnKTtcbiAgICAgIHZhciBzZXAgPSAxO1xuICAgICAgZm9yKHZhciB4PWFyci5sZW5ndGgtMTsgeD49MDsgeC0tKXtcbiAgICAgICAgLy8vLyBhZGQgcmVhZGluZyBjb21tYSBhZnRlciAzIGRpZ2l0cyBhbmQgb25seSBpZiB0aGVyZSBpcyBuZXh0IGRpZ2l0XG4gICAgICAgIHJldCA9IChzZXAgJSAzID09IDAgJiYgdHJ1ZSA9PT0gISFhcnJbeC0xXT8gJywnIDogJycpICsgYXJyW3hdICArIHJldDtcbiAgICAgICAgc2VwKys7XG4gICAgICB9XG4gICAgICByZXQgPSAnJCcgKyByZXQ7XG4gIH1cbiAgZWxzZSBpZihyYXcubGVuZ3RoID4gMCl7XG4gICAgcmV0ID0gJyQnICsgcmF3O1xuICB9XG4gIGVsc2V7XG4gICAgcmV0ID0gcmF3O1xuICB9XG5cbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vLyBmdW4uIGZvcm1hdEN1cnJlbmN5XG5cbnZhciBhbmltYXRlU2Nyb2xsID0gZnVuY3Rpb24oeSwgdGltZSl7XG5cbiAgICBjbGVhckludGVydmFsKF9hcHBWYXJzLnNjcm9sbEludGUpOy8vLy8gc3RvcCBhbnlzY3JvbGxpbmdcblxuICAgIGlmKHVuZGVmaW5lZCA9PT0gdGltZSkgdGltZSA9IDE7Ly8vLyBzZXQgZGVmYXVsdCB2YWx1ZSBmb3IgdGltZVxuICAgIHZhciBmcHMgPSA2MDsgLy8vLyBmcmFtZXMgcGVyIHNlY29uc1xuICAgIHZhciBmcmFtZVRpbWUgPSBNYXRoLmNlaWwoMTAwMCAvIGZwcyk7XG4gICAgdmFyIGQgPSB0aW1lICogZnJhbWVUaW1lOyAvLy8gbnVtYmVyIG9mIGZyYW1lcyBkdXJhdGlvblxuICAgIHZhciB0ID0gMDsgLy8vLyB0aW1lIHRpY2tlciAvIGZyYW1lIGNvdW50ZXJcblxuICAgIC8vLy8gc2V0IGJlZ2luIHBvaW50IHdoaWhjIHRoZSBjdXJycmVudCBwb2ludFxuICAgIC8vIGIgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IHdpbmRvdy5zY3JvbGxZO1xuICAgIHZhciBiID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCB3aW5kb3cucGFnZVlPZmZzZXQgfHwgMDtcbiAgICAvL1xuICAgIGlmKGIgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGIgPSAwO1xuICAgIH1cblxuXG4gICAgLy8vLyBjaGVjayBpZiBzY3JvbGxpbmcgZGVzdGluYXRpb24gaXMgYmlnZ2VyIHRoYW4gcGFnZSBoZWlnaHQgbGltaXRzXG4gICAgdmFyIGxpbWl0ID0gTWF0aC5tYXgoIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgICk7XG4gICAgaWYoeT5saW1pdCl7XG4gICAgICAgIHkgPSBsaW1pdDtcbiAgICB9XG5cbiAgICAvLy8vIHNldCB0aGUgY2hhbmdlIGJldHdlZW4gY3VycmVudCBhbmQgZGVzdGluYXRpb24gcG9pbnRcbiAgICBjID0gYiAtIHk7XG5cbiAgICAvLy8vIGRvIG5vdGhpbmcgaWYgZGVzdGluYXRpb24gaXMgc2FtZSBhcyBjdXJyZW50XG4gICAgaWYoTWF0aC5hYnMoYykgPCAxKSByZXR1cm47XG5cbiAgICAvLy8vIHN0YXJ0IHRpbWUgdGlja2VyXG4gICAgX2FwcFZhcnMuc2Nyb2xsSW50ZSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vLyBlYXNlIG91dCBtYXRoXG4gICAgICAgIHZhciBwZXIgPSAxIC0gdC9kO1xuICAgICAgICB2YXIgbmV3WSA9ICAtYyAqICgxLXBlcipwZXIqcGVyKnBlcikgKyBiO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPj5cIiwgMS0oMS1wZXIpKigxLXBlcikpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV3WSk7XG5cblxuICAgICAgICBpZih0ID09IGQpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfYXBwVmFycy5zY3JvbGxJbnRlKTtcbiAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdhbmltYXRlU2Nyb2xsRW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdCsrO1xuXG4gICAgfSwgZnJhbWVUaW1lKTtcbn0vLy8vIGZ1bi4gYW5pbWF0ZVNjcm9sbFxuXG4vKipcbiAqIFtyZXNldEZpZWxkcyB3aWxsIHNlYXJjaCBmb3IgaW5wdXQgZmllbGQgaW5zaWRlIGEgY29udGFpbmVyIGFuZCByZXN0IGl0cyB2YWx1ZSBhbmQgYW55IGVycm9yIHN0YXR1c11cbiAqIEBwYXJhbSAge1t0eXBlXX0gY29udGFpbmVyIFtqUXVleXIgb2JqZWN0IHRoYXQgc2hvdWxkIGNvbnRhaW4gaW5wdXQgZmlsZWQgdGhhdCBuZWVkIGJlIHJlc2V0XVxuICovXG52YXIgcmVzZXRGaWVsZHMgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICB2YXIgZmllbGRzID0gY29udGFpbmVyLmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XG5cbiAgZmllbGRzLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgdmFyIHR5cGUgPSAkKHRoaXMpLmF0dHIoJ3R5cGUnKTtcbiAgICBpZih0eXBlID09PSAncmFkaW8nKXtcbiAgICAgICQodGhpcykucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maWx0ZXIoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICB9XG4gICAgJCh0aGlzKS5oaWRlRXJyb3IoKTtcbiAgfSk7XG5cbn0vLy8vIGZ1bi4gcmVzZXRGaWVsZHNcblxuLyoqXG4gKiBbaW5jbHVkZUZpZWxkcyB3aWxsIGFkZCBoaWRkZW4gZmllbGRzIGluIGZvcm0gYW5kIHNldCB0aGUgcmlnaHQgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGluY2x1ZGVkIGUuZy4gXCIubmV3LWZpZWxkc1wiLCBcIiNjbG9kaW5nRGF0ZVwiXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgaW5jbHVkZSBpbiB2YWxpZGF0aW9uXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG52YXIgaW5jbHVkZUZpZWxkcyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucy5zZWxlY3RvciB8fCAhb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpIHJldHVybiBmYWxzZTtcblxuICB2YXIgZmllbGRzID0gJChvcHRpb25zLnNlbGVjdG9yKTtcbiAgZmllbGRzLmZpbmQob3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICBmaWVsZHMuc2xpZGVEb3duKCk7XG5cbn1cblxuLyoqXG4gKiBbZXhjbHVkZUZpZWxkcyB3aWxsIGV4Y2x1ZGUgZmllbGRzIGZyb20gZm9ybSBhbmQgc2V0IHJlbW92ZSB0aGUgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGV4Y2x1ZGVkXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgZXhjbHVkZWQgZnJvbSB2YWxpZGF0aW9uXG4gKi9cbnZhciBleGNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIHJlc2V0RmllbGRzKGZpZWxkcyk7XG4gIGZpZWxkcy5zbGlkZVVwKCk7XG59XG5cbi8qKlxuICogW2FkZEF1dG9BZGRyZXNzIHdpbGwgYWRkIGFkZHJlc3MgdHlwZSBhaGVhZCBmdW5jdGlvbmFsaXR5IHRvIHRleHQgZmllbGQgd2l0aCBpZCAnYm9fYWRkcmVzcyddXG4gKiBAcGFyYW0ge1t0eXBlXX0gaW5kZXggW2luIG11bHRpLWFkZHJlc3MgY2FzZSB0aGlzIHZhcmlhYmxlIHdpbGwgdGVsIHRoZSBmdW5jdGlvbiB3aGljaCBhZGRyZXNzIHRvIGJpbmQgdGhlIHR5cGUgYWhlYWQgdG9dXG4gKi9cbmZ1bmN0aW9uIGFkZEF1dG9BZGRyZXNzKGluZGV4LCBzdGFydEZyb20xKXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID49IDIgfHwgdHJ1ZSA9PT0gc3RhcnRGcm9tMSA/ICcnK2luZGV4IDogJyc7XG5cbiAgICB2YXIgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib19hZGRyZXNzJyArIHBvc3QpLFxuICAgICAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnICsgcG9zdCkuZmlsdGVyKCdpbnB1dCcpWzBdLFxuICAgICAgICB7dHlwZXM6IFsnZ2VvY29kZSddfVxuICAgICk7XG4gICAgLy8vLyBzZXQgdGhlIGFkZHJlc3MgaW5kZXggYW5kIHBvc3QgaW4gYXV0b2NvbXBsZXRlIG9iamVjdCB0byBiZSB1c2VkIGluIGZpbGxJbkFkZHJlc3MgZnVuY3Rpb25cbiAgICBhdXRvY29tcGxldGUuaW5kZXggPSAwO1xuICAgIGF1dG9jb21wbGV0ZS5wb3N0ID0gcG9zdDtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhZGRyZXNzIGZyb20gdGhlIGRyb3Bkb3duLCBwb3B1bGF0ZSB0aGUgYWRkcmVzc1xuICAgIC8vIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBmaWxsSW5BZGRyZXNzKTtcbn1cblxuLyoqXG4gKiBbZmlsbEluQWRkcmVzcyB3aWxsIHVwZGF0ZSB0aGUgYWRkcmVzcyBjaXR5LCBzdGF0LCBhbmQgemlwIGZpbGVkIGFmdGVyIHVzZXIgc2VsZWN0IGFkZHJlc3MgZm9ybSB0eXBlIGFoZWFkXVxuICogdGhpcyBpbnNpZGUgdGhpcyBmdW5jdGlvbiB3aWxsIHJlZmVyZW5jZSBnb29nbGUgYXV0b2NvbXBldGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtbbnVsbF19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmlsbEluQWRkcmVzcygpe1xuICAgIC8vLy8gdGhpcyByZWZlciB0byB0aGUgYXV0byBjb21wbGV0ZSBvYmplY3RcblxuICAgIHZhciBwbGFjZSA9IHRoaXMuZ2V0UGxhY2UoKTtcbiAgICB2YXIgY29tcG9uZW50Rm9ybSA9IHtcbiAgICAgICAgc3RyZWV0X251bWJlcjogJ3Nob3J0X25hbWUnLFxuICAgICAgICByb3V0ZTogJ2xvbmdfbmFtZScsXG4gICAgICAgIGxvY2FsaXR5OiAnbG9uZ19uYW1lJyxcbiAgICAgICAgYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIGNvdW50cnk6ICdsb25nX25hbWUnLFxuICAgICAgICBwb3N0YWxfY29kZTogJ3Nob3J0X25hbWUnXG4gICAgfTtcblxuICAgIHZhciBhZGRyZXNzID0ge307XG4gICAgdmFyIGxvbmdfbmFtZSA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0eXBlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzWzBdO1xuICAgICAgICB2YXIgYWRkcmVzc1R5cGUgPSB0eXBlO1xuXG4gICAgICBpZiAoY29tcG9uZW50Rm9ybVthZGRyZXNzVHlwZV0pIHtcbiAgICAgICAgdmFyIHZhbCA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVtjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXV07XG4gICAgICAgIGFkZHJlc3NbYWRkcmVzc1R5cGVdID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYoYWRkcmVzc1R5cGUgPT09ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKXtcbiAgICAgICAgICAgIGxvbmdfbmFtZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVsnbG9uZ19uYW1lJ107XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmb3JcbiAgICBhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUgPSBsb25nX25hbWU7XG5cbiAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnK3RoaXMucG9zdCkuZXEoMCkudmFsKGFkZHJlc3Muc3RyZWV0X251bWJlciArICcgJyArIGFkZHJlc3Mucm91dGUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfY2l0eScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5sb2NhbGl0eSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9zdGF0ZScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIC8vICQoJyNzdGF0ZV9sYWJlbCcrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFfbG9uZ19uYW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3ppcCcrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5wb3N0YWxfY29kZSkudHJpZ2dlcignY2hhbmdlJyk7XG59XG4iLCIvKipcbiAqIFRoZXNlIGdsb2JhbCB2YXJpYWJsZXMgc2hhcmVkIHdpdGhcbiAqL1xudmFyIGFkZHJlc3NUZW1wbGF0ZSwgYWRkcmVzc0luZGV4O1xuKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoYm9ycm93ZXJSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBib3Jyb3dlclJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNib3Jyb3dlckZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNib3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbYWRkcmVzc0luZGV4IHdpbGwgdHJhY2sgdGhlIG51bWJlciBvZiBhZGRyZXNzIGFkZGVkIGFuZCBzdG9wIGlmIHRvdGFsIG9mIDQgYWRkcmVzc11cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGFkZHJlc3NJbmRleCA9IDE7XG5cbiAgICAgICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxkLCBpbnZhbGlkRmllbGRzKXtcblxuICAgICAgICAgICAgaWYoaXNWYWxkKXtcblxuICAgICAgICAgICAgICAgIHZhciBpc0NvQm9ycm93ZXIgPSAgU3RyaW5nKCcyMzQnKS5zcGxpdCgnJykuaW5kZXhPZiggJCgnI2JvX2FwcGx5dHlwZScpLnZhbCgpICkgPiAtMTtcblxuICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IGlzQ29Cb3Jyb3dlcil7XG4gICAgICAgICAgICAgICAgICAgIG15Rm9ybS5hdHRyKCdhY3Rpb24nLCAnMDItY29ib3Jyb3dlci5odG1sJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfS8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29udGludWVDbGlja2VkKVxuICAgICAgICAgICAgICAgIC8vLy8gaWYgdGhlIGZvcm0gaXMgbm90IHZhbGlkIGFuZCBjb250aW51ZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRvIHRoZSBwYWdlIHRvIGZpcnN0IGZpZWxkIHdpdGggZXJyb3JcbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7ICAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8vLyBpZiBpc1ZhbGlkIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2xsXCIpXG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogZXZlbnQgaGFuZGxlcnMgYXJlIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cblxuICAgICAgICAkKCcjYm9faG93aGVhcicpLm9mZignY2hhbmdlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIHZhbCA9IHBhcnNlSW50KCQodGhpcykudmFsKCksMTApO1xuICAgICAgICAgICAgdmFyIGFyciA9IFsyLDMsNCw1XTtcbiAgICAgICAgICAgIGlmKGFyci5pbmRleE9mKHZhbCkgPiAtMSl7XG4gICAgICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgYWRkcmVzc0luZGV4KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2JvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgY2hhbmdlIG9mIHJhZGlvIGJ1dHRvbiBjdXJyZW50IGFkZHJlc3Mgb3duL3JlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9Ym9fY3VycmVudGx5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICB2YXIgcmVudENvbCA9ICQoJyNtb250aGx5UmVudCcpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbnRDb2wuZmluZCgnLmNjLWZpZWxkJykuZXEoMCk7XG4gICAgICAgICAgICBpZih2YWwudG9Mb3dlckNhc2UoKSA9PT0gJ3JlbnQnKXtcbiAgICAgICAgICAgICAgICByZW50Q29sLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJlbnRDb2wuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgbWVzc2FnZSBlcnJvcicpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLnNhZmFyaT09PSB0cnVlID8gJ2JsdXInIDogJ2NoYW5nZSc7IC8vLy8gY2hhbmdlIGlzIG5vdCBmaXJlZCB3aGVuIGF1dG9maWxsIGlzIHVzZWQgb24gc2FmYXJpXG4gICAgICAgICQoJyNib19lbWFpbCcpLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogbWFrZSBzdXJlIGVtYWlsIGZpZWxkIGlzIHZhbGlkYXRlIGJlZm9yZSBkb2luZyBhbnkgY2hlY2tcbiAgICAgICAgICAgICAqIGlkICNlbWFpbEZpZWxkIGlzIGdpdmVuIHRvIC5jYy1maWVsZCBjb250YWluZXIgb2YgZW1haWwgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJCgnI2VtYWlsRmllbGQnKS52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSAkLnRyaW0oJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9ICQodGhpcykuZGF0YSgnaXNWYWxpZCcpO1xuXG4gICAgICAgICAgICBpZih2YWwgJiYgdHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOlwiYXBpLXJlc3BvbnNlL2lzLWVtYWlsLWV4aXN0cy5qc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6e2VtYWlsOnZhbH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmVtYWlsLnRvTG93ZXJDYXNlKCkgPT0gdmFsLnRvTG93ZXJDYXNlKCkgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24ocmV0LmV4aXN0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmV4aXN0cyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNsb2dpbl9lbWFpbCcpLnZhbCh2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfS8vLyBpZiB2YWxcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgIH0vLy8vIG5vdCB2YWxcblxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGFkZHJlc3MgdHlwZSBhaGVhZCBmdW5jdGlvbmFsaXR5IHRvIGFkZHJlc3NcbiAgICAgICAgICovXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpO1xuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvZ2luU2VjdGlvbihlbWFpbEV4aXN0cyl7XG4gICAgICAgIGlmKHRydWUgPT09IGVtYWlsRXhpc3RzKSB7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2xvZ2luU2VjdGlvbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9Ly8vLy8gZnVuLiB1cGRhdGVMb2dpblNlY3Rpb25cbn0pKCk7XG5cblxuXG5mdW5jdGlvbiBjaGVja0FkZHJlc3NMZW5ndGgoY29udGFpbmVyLCBpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+IDEgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcblxuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG4gICAgICAgIGlmKCF2KSB2ID0wO1xuICAgICAgICBpZigheWVhcnMpe1xuICAgICAgICAgICAgeWVhcnMgPSAwO1xuICAgICAgICAgICAgJCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApLnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG5cbiAgICAgICAgaWYoIXYpIHtcbiAgICAgICAgICAgIHYgPTA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXllYXJzKSB5ZWFycyA9IDA7XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSlcbn0vLy8vLyBmdW4uIGNoZWNrQWRkcmVzc0xlbmd0aFxuXG5mdW5jdGlvbiBhZGRBZGRyZXNzKG5leHRJZCl7XG4gICAgaWYobmV4dElkID49IDUpIHJldHVybiBmYWxzZTtcbiAgICBpZihhZGRyZXNzSW5kZXggPj0gbmV4dElkKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgc2VjdGlvbiA9ICQoJyNwcmVBZGRyZXNzJyk7XG4gICAgYWRkcmVzc0luZGV4ID0gbmV4dElkO1xuICAgIHZhciBhZGRyZXNzID0gJChhZGRyZXNzVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgYWRkcmVzc0luZGV4KSk7XG5cbiAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZC5jYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBhZGRyZXNzLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7IC8vLy8gZnVuLiBpbiBtYWluLmpzXG5cbiAgICBhZGRyZXNzLmZpbmQoJ2lucHV0Lm51bWJlcnMnKS5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycyk7XG5cbiAgICBjaGVja0FkZHJlc3NMZW5ndGgoYWRkcmVzcywgYWRkcmVzc0luZGV4KTtcblxuICAgIHNlY3Rpb24uYXBwZW5kKGFkZHJlc3MpO1xuICAgIGFkZEF1dG9BZGRyZXNzKGFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIHNlY3Rpb24uc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBhZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9YWRkcmVzc0luZGV4OyB4Kyspe1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHNlY3Rpb24uZmluZCgnI2FkZHJlc3NfJyArIHgpO1xuXG4gICAgICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgYWRkcmVzcy5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG4gICAgYWRkcmVzc0luZGV4ID0gaWRSZW1vdmUtMTtcbiAgICBpZihhZGRyZXNzSW5kZXggPD0gMSkgc2VjdGlvbi5zbGlkZVVwKClcbn1cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29Cb3Jyb3dlclJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGNvQm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjY29Cb3Jyb3dlckZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFthZGRyZXNzSW5kZXggd2lsbCB0cmFjayB0aGUgbnVtYmVyIG9mIGFkZHJlc3MgYWRkZWQgYW5kIHN0b3AgaWYgdG90YWwgb2YgNCBhZGRyZXNzXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgYWRkcmVzc0luZGV4ID0gMTtcblxuICAgICAgICBhZGRyZXNzVGVtcGxhdGUgPSAkKCcjYWRkcmVzc1RlbXBsYXRlJykuaHRtbCgpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSlcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBjby1ib3Jyb3dlciBsaXZlIGluIGRpZmZlcmVudCBhZGRyZXNzXG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPWNvX2xpdmVzYW1lXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSAneWVzJyl7XG5cbiAgICAgICAgICAgICAgICAkKCcjYWRkcmVzc0RpdicpLnNsaWRlVXAoKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2MtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCBtZXNzYWdlJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgJCgnI3ByZUFkZHJlc3MnKS5zbGlkZVVwKCkuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZURvd24oKVxuICAgICAgICAgICAgICAgIC5maW5kKCcuY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcblxuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVUYWJJbmRleChteUZvcm0pOyAvLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmFjayBidXR0b24gY2xpY2sgaGFuZGxlcnNcbiAgICAgICAgICovXG4gICAgICAgICQoJyNiYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oY2Upe1xuICAgICAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgICAgICogZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcbiAgICAgICAgICovXG4gICAgICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIGFkZHJlc3NJbmRleCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdXBkYXRlIGNvLWJvcnJvd2VyIG5hbWUgaW4gc3ViIHRpdGxlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG5hbWVIb2xkZXIgPSAkKCcuY29Cb3Jyb3dlck5hbWUnKTtcbiAgICAgICAgJCgnI2NvX2ZuYW1lJykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJC50cmltKCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICAgICAgICBuYW1lSG9sZGVyLnRleHQoIHZhbCA/IHZhbCA6ICdDby1Cb3Jyb3dlcicpO1xuICAgICAgICB9KVxuICAgIH07Ly8vLyBjb0JvcnJvd2VyUmVhZHlcbn0pKCk7XG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KHB1cmNoYXNlUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gcHVyY2hhc2VSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjcHVyY2hhc2VGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgcmVhbCBzdGF0ZSBhZ2VudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV91c2luZ2FnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICB2YXIgYWdlbnQgPSAkKCcjYWdlbnRDb250YWN0Jyk7XG4gICAgICAgICAgICB2YXIgYWdlbnRGaWVsZHMgPSAkKCcjYWdlbnRGaWVsZHMnKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FnZW50Q29udGFjdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicjYWdlbnRGaWVsZHMsICNhZ2VudENvbnRhY3QnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7Ly8vLy8gb24uY2hhbmdlXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgY29udGFjdCBhZ2VudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV9jb250YWN0YWdlbnRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FnZW50RmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FnZW50RmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBwcm9wZXJ0eVxuICAgICAgICAgKi9cbiAgICAgICAgJCgnI3B1X3NlYXJjaHR5cGVwdXJjaGFzZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpc1Byb3BlcnR5ID0gU3RyaW5nKCczNCcpLnNwbGl0KCcnKS5pbmRleE9mKHZhbCkgPiAtMTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNQcm9wZXJ0eSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eS1maWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnByb3BlcnR5LWZpZWxkcywgI3N1Yk5hbWUsICNjbG9zaW5nRGF0ZSwgI21vbnRobHlIT0EnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSwgLmNjLXRvLWJlLXZhbGlkYXRlLXN1YiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcsIC5jYy10by1iZS12YWxpZGF0ZS1IT0EnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pOy8vLyBvbi5jaGFuZ2VcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgSE9BIGR1ZXNcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfaGF2ZWNsb3NpbmdkYXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjbG9zaW5nRGF0ZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjbG9zaW5nRGF0ZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXN1Yid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Oy8vLy8gcHVyY2hhc2VSZWFkeVxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShyZWZpbmFuY2VSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiByZWZpbmFuY2VSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjcmVmaW5hbmNlRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkaW5nIGdvb2dsZSBhZGRyZXNzIHR5cGUgYWhlYWRcbiAgICAgICAgICovXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX3Byb3BlcnR5cmVmaW5hbmNpbmddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ25vJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicub3RoZXJBZGRyZXNzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGVjayBpZiBIT0EgZHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9wbGFubmVkdW5pdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfZm9yc2FsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjZGF0ZU9mZk1hcmtldCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjZGF0ZU9mZk1hcmtldCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9zdWJqZWN0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjb25zdHJ1Y3Rpb25CcmllZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfaXN0aXRsZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3RydXN0QnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3RydXN0QnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfbWFudWZhY3R1cmVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX2hhdmVNb3J0Z2FnZTFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmZpcnN0TW9ydGdhZ2UnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlLCAuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSwgLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnRnYWdlMiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9zZWNtb3J0Z2FnZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQsICNhZGRpdGlvbmFsTGllbnMnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTIsIC5jYy10by1iZS12YWxpZGF0ZS1jbCwgLmNjLXRvLWJlLXZhbGlkYXRlLWxpbmUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX21vcnRnYWdlMkxPQ10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jcmVkaXQtbGltaXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9YXNfYWRkaXRpb25hbGxpZW5zXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZGRpdGlvbmFsTGllbnMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1saWVuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07Ly8vLyBib3Jyb3dlclJlYWR5XG59KSgpOyIsIi8qKlxuICogQmVsb3cgZ2xvYmFsIHZhcmlhYmxlcyBhcmUgc2hhcmVkIHdpdGggY28tYm9ycm93ZXIgaW5jb21lIHBhZ2VcbiAqL1xudmFyIGVtcGxveWVyVGVtcGxhdGUsIGVtcGxveWVySW5kZXgsIGVtcGxveWVyc0hvbGRlcjtcbnZhciByZW50VGVtcGxhdGUsIHJlbnRJbmRleCwgcmVudHNIb2xkZXIsIHJlbnRzQXJyYXk7XG5cbihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGJvSW5jb21lUmVhZHkpO1xuXG5cbiAgICBmdW5jdGlvbiBib0luY29tZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNib0luY29tZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgZW1wbG95ZXJUZW1wbGF0ZSA9ICQoJyNlbXBsb3llclRtcGx0JykudGV4dCgpO1xuICAgICAgICBlbXBsb3llckluZGV4ID0gMTtcbiAgICAgICAgZW1wbG95ZXJzSG9sZGVyID0gJCgnI2VtcGxveWVyc0hvbGRlcicpO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICByZW50VGVtcGxhdGUgPSAkKCcjcmVudFRtcGx0JykudGV4dCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogW3JlbnRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSByZW50IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIHJlbnRJbmRleCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50c0hvbGRlciB0aGUgZGl2IHdoZXJlIHJlbnQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgcmVudHNIb2xkZXIgPSAkKCcjcmVudHNIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW3JlbnRzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCByZW50IHByb3BlcnR5IGluZGV4XG4gICAgICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlbnRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCByZW50IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgcmVudCBoYXMgaW5kZXggb2YgNlxuICAgICAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVSZW50c0ZpZWxkcyBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgcmVudHNBcnJheSA9IFtdO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGVtcGxveWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgZW1wbG95ZXJzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKG15SW5kZXgpO1xuICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKG15SW5kZXgpO1xuICAgICAgICAgICAgZW1wbG95ZXJJbmRleCA9IG15SW5kZXg7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIHJlbnQgcHJvcGVydGllc1xuICAgICAgICAgKi9cbiAgICAgICAgcmVudHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1yZV9hZGRyZXNzXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ3JlX2FkZHJlc3MnKVsxXSwgMTApO1xuXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxMDAgKyBteUluZGV4KTtcblxuICAgICAgICAgICAgcmVudEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIHJlbnRzQXJyYXkucHVzaChyZW50SW5kZXgpO1xuXG4gICAgICAgICAgICBiaW5kUmVudE1vcnRnYWdlKG15SWQpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWUyXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKDEpO1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZW1wbG95bWVudCwgLnByZUVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSwgLmNjLXRvLWJlLXZhbGlkYXRlLXByZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBpZihlbXBsb3llckluZGV4ID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKDIpOyAvLy8gd2lsbCB0YWtlIGNhcmUgb2YgdGhlIHJlc3Qgb2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlbGYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg1KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2VsZicsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFkZGl0aW9uYWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg2KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuYWRkaXRpb25hbCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldGlyZW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0aXJlbWVudCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTZdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNzbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNzbicsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbidcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lN10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY2hpbGQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmNoaWxkJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZThdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmRpdmlkZW5kJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5kaXZpZGVuZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZW50YWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYocmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUocmVudHNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUmVudChyZW50c0FycmF5W3JlbnRzQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICB9KVxuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcbn0pKCk7XG5cblxuZnVuY3Rpb24gYmluZEVtcGxveW1lbnREYXRlKGluZGV4KXtcblxuICAgIHZhciBmaWVsZHMgPSAkKCdpbnB1dC5zdGFydERhdGUnICsgaW5kZXggKyAnLCBpbnB1dC5lbmREYXRlJyArIGluZGV4KTtcbiAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLm1zaWUgPyAna2V5dXAnIDogJ2NoYW5nZSc7IC8vLyBjaGFuZ2UgaXMgbm90IGZpcmluZyBvbiBJRSAhISFcbiAgICBmaWVsZHMuZWFjaChmdW5jdGlvbigpe1xuXG4gICAgICAgICQodGhpcylcbiAgICAgICAgLm9mZihldmVudE5hbWUsIGNoZWNrRW1wbG95bWVudERhdGUpXG4gICAgICAgIC5vbihldmVudE5hbWUsIGNoZWNrRW1wbG95bWVudERhdGUpO1xuICAgIH0pXG4gICAgLy8gZmllbGRzLm9mZignY2hhbmdlJywgY2hlY2tFbXBsb3ltZW50RGF0ZSlcbn0vLy8vLyBmdW4uIGJpbmRFbXBsb3ltZW50RGF0ZVxuXG5mdW5jdGlvbiBhZGRFbXBsb3llcihpbmRleCl7XG4gICAgLyoqXG4gICAgICogTGltaXQgdG8gNCBwcmV2aW91cyBlbXBsb3llcnNcbiAgICAgKi9cbiAgICBpZihpbmRleCA+IDQpIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIEVtcGxveWVycyBzaG91bGQgYmUgYWRkZWQgaW4gaW5jcmVhc2luZyBpbmRleFxuICAgICAqL1xuICAgIGlmKGluZGV4IDwgZW1wbG95ZXJJbmRleCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIGVtcGxveWVyIHdpdGggaW5kZXggaXMgYWxyZWFkeSBhZGRlZCBkbyBub3RoaW5nXG4gICAgICovXG4gICAgaWYoJCgnI2VtcGxveWVyXycgKyBpbmRleCkubGVuZ3RoID4gMCl7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlbXBsb3llckluZGV4ID0gaW5kZXg7XG5cbiAgICB2YXIgZW1wbG95ZXIgPSAkKGVtcGxveWVyVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgZW1wbG95ZXJJbmRleCkpO1xuXG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGVtcGxveWVyLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cbiAgICB5ZXNOb1JhZGlvKGVtcGxveWVyKTtcbiAgICBkcm9wZG93bkxhYmVsKGVtcGxveWVyKTtcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgZW1wbG95ZXJzSG9sZGVyLmFwcGVuZChlbXBsb3llcik7XG5cbiAgICBhZGRBdXRvQWRkcmVzcyhlbXBsb3llckluZGV4KTtcbiAgICBiaW5kRW1wbG95bWVudERhdGUoZW1wbG95ZXJJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgZW1wbG95ZXIuc2xpZGVEb3duKCk7XG59Ly8vLyBmdW4uIGFkZEVtcGxveWVyXG5cbmZ1bmN0aW9uIHJlbW92ZUVtcGxveWVyKHJlbW92ZUluZGV4KXtcblxuICAgIGlmKHJlbW92ZUluZGV4IDw9IDEpIHJldHVybjtcbiAgICAvLyBpZihyZW1vdmVJbmRleCA+IDQpIHJldHVybjtcblxuICAgIGZvcih2YXIgeD1yZW1vdmVJbmRleDsgeDw9ZW1wbG95ZXJJbmRleDsgeCsrKXtcbiAgICAgICAgJCgnI2VtcGxveWVyXycgKyB4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kZXRhY2goKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgZW1wbG95ZXJJbmRleCA9IHJlbW92ZUluZGV4IC0gMTtcbn1cblxuZnVuY3Rpb24gY2hlY2tFbXBsb3ltZW50RGF0ZShldil7XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBlbmQgZGF0ZSBhbmQgYWRkIHByZXZpb3VzIGpvYiBpZiBhcHBsaWNhYmxlXG4gICAgICovXG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIHZhciBlbmREYXRlRmllbGQgPSAkKCcuZW5kRGF0ZScraW5kZXgpLmVxKDApO1xuICAgIHZhciBzdGFydERhdGVGaWVsZCA9ICQoJy5zdGFydERhdGUnK2luZGV4KS5lcSgwKTtcbiAgICB2YXIgZW5kRGF0ZSwgc3RhcnREYXRlO1xuXG4gICAgaWYoZW5kRGF0ZUZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZW5kRGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZihzdGFydERhdGVGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgdmFyIGRhdGVTcGxpdCA9IHN0YXJ0RGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihlbmREYXRlIDw9IHN0YXJ0RGF0ZSl7XG4gICAgICAgIGVuZERhdGVGaWVsZC5hZGRFcnJvcignY2MtZGF0ZS1ndCcpLnNob3dFcnJvcigpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihlbmREYXRlIC0gc3RhcnREYXRlIDwgIDIgKiAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwICl7XG4gICAgICAgICAgICAvLyBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByZUVtcGxveW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1wcmUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkRW1wbG95ZXIoaW5kZXgrMSlcbiAgICAgICAgfS8vLy9cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKGluZGV4KzEpXG4gICAgICAgIH1cbiAgICB9Ly8vLyBlbHNlXG59Ly8vLyBmdW4uIGNoZWNrRW1wbHltZW50RGF0ZVxuXG5mdW5jdGlvbiBhZGRSZW50KCl7XG5cbiAgICBpZihyZW50c0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICByZW50SW5kZXgrKztcbiAgICByZW50c0FycmF5LnB1c2gocmVudEluZGV4KTtcbiAgICB2YXIgdGVtcGxhdGUgPSByZW50VGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCByZW50SW5kZXgpO1xuXG4gICAgdmFyIGlkID0gcmVudHNBcnJheS5sZW5ndGg7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCBpcyB1c2VkIHRvIGhlbHAgYWRkIGFuZCB0cmFjayB0aGUgYWRkcmVzcyBmaWVsZHMgZm9yIHR5cGUgYWhlYWQgYWRkcmVzcyBmdW5jdGlvbmFsaXR5XVxuICAgICAqIDEwMCArIGlzIGFkZGVkIHRvIGRpZmZlcmVudGlhdGUgdGhlIHJlbnQgcHJvcGVydHkgYWRkcmVzcyBmaWVsZHMgZnJvbSBlbXBsb3llciBhZGRyZXNzIGZpZWxkc1xuICAgICAqL1xuICAgIHZhciBhZGRyZXNzSW5kZXggPSAxMDAgKyByZW50SW5kZXg7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhQbHVzXFx9KS9nLCBhZGRyZXNzSW5kZXgpO1xuXG5cbiAgICB2YXIgcmVudCA9ICQodGVtcGxhdGUpO1xuXG4gICAgcmVudC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgfSk7XG5cbiAgICBmaWxsU3RhdGVEcm9wZG93biggcmVudC5maW5kKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG4gICAgLyoqXG4gICAgICogU2V0IHllcy9ubyByYWRpbyBidXR0b24gYmVoYXZpb3JcbiAgICAgKi9cbiAgICB5ZXNOb1JhZGlvKHJlbnQpO1xuICAgIGRyb3Bkb3duTGFiZWwocmVudCk7XG5cblxuXG4gICAgLyoqXG4gICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgKi9cbiAgICByZW50LmZpbmQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgIHJlbnQuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgcmVudHNIb2xkZXIuYXBwZW5kKHJlbnQpO1xuXG4gICAgcmVudC5zbGlkZURvd24oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtb3J0Z2FnZSB5ZXMvbm8gYWN0aW9uXG4gICAgICovXG4gICAgYmluZFJlbnRNb3J0Z2FnZShpZCk7XG5cbiAgICBhZGRBdXRvQWRkcmVzcyhhZGRyZXNzSW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gYWRkUmVudFxuXG5mdW5jdGlvbiByZW1vdmVSZW50KHJlbW92ZUluZGV4KXtcbiAgICB2YXIgcG9zaXRpb24gPSByZW50c0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgJCgnI3Byb3BlcnR5XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZW50c0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICB1cGRhdGVSZW50c0ZpZWxkcygpO1xuXG4gICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIHJlbW92ZVJlbnRcblxuLyoqXG4gKiBbdXBkYXRlUmVudHNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVudCBwcm9wZXJ0eSBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZFJlbnQgYW5kIHJlbW92ZVJlbnRcbiAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICovXG5mdW5jdGlvbiB1cGRhdGVSZW50c0ZpZWxkcygpe1xuICAgIHZhciBsaW1pdCA9IHJlbnRzQXJyYXkubGVuZ3RoO1xuICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgIHZhciBpbmRleCA9IHJlbnRzQXJyYXlbeF07XG5cbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG5cbiAgICAgICAgcmVudERpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmb3IgeFxufS8vLy8gZnVuLiB1cGRhdGVSZW50c0ZpZWxkc1xuXG4vKipcbiAqIFt1cGRhdGVSZW50Q2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgcHJvcGVydHldXG4gKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZFJlbnQgYW5kIHJlbW92ZVJlbnRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUmVudENsb3NlQnRuKCl7XG4gICAgaWYocmVudHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpZihyZW50c0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgLy8gJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmF0dHIoeydkaXNhYmxlZCc6dHJ1ZX0pLmNzcyh7J29wYWNpdHknOjAuNX0pO1xuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5JykuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICAvLyAkKCcjYWRkUmVudFByb3BlcnR5JykuYXR0cih7J2Rpc2FibGVkJzpmYWxzZX0pLmNzcyh7J29wYWNpdHknOjF9KTtcbiAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLnNob3coKTtcbiAgICB9XG5cbn0vLy8vIGZ1bi4gdXBkYXRlUmVudENsb3NlQnRuXG5cbmZ1bmN0aW9uIGJpbmRSZW50TW9ydGdhZ2UoaW5kZXgpe1xuICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgdmFyIG15VmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiBteVZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xufS8vLy8gZnVuLiBiaW5kUmVudE1vcnRnYWdlIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29JbmNvbWVSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBjb0luY29tZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0luY29tZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlbG93IGdsb2JhbCB2YXJpYWJsZXMgZGVmaW5lZCBpbiAwNS1pbmNvbWUuanNcbiAgICAgICAgICovXG4gICAgICAgIGVtcGxveWVyVGVtcGxhdGUgPSAkKCcjZW1wbG95ZXJUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgZW1wbG95ZXJJbmRleCA9IDE7XG4gICAgICAgIGVtcGxveWVyc0hvbGRlciA9ICQoJyNlbXBsb3llcnNIb2xkZXInKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbcmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAgICAgKi9cbiAgICAgICAgcmVudFRlbXBsYXRlID0gJCgnI3JlbnRUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgcmVudCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICByZW50SW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbcmVudHNIb2xkZXIgdGhlIGRpdiB3aGVyZSByZW50IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIHJlbnRzSG9sZGVyID0gJCgnI3JlbnRzSG9sZGVyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggcmVudCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyByZW50cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgcmVudCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIHJlbnQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlUmVudHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHJlbnRzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBlbXBsb3llcnNcbiAgICAgICAgICovXG4gICAgICAgIGVtcGxveWVyc0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyhteUluZGV4KTtcbiAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZShteUluZGV4KTtcbiAgICAgICAgICAgIGVtcGxveWVySW5kZXggPSBteUluZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciByZW50IHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIHJlbnRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49cmVfY29fYWRkcmVzc10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdyZV9jb19hZGRyZXNzJylbMV0sIDEwKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMTAwICsgbXlJbmRleCk7XG5cbiAgICAgICAgICAgIHJlbnRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgICAgICByZW50c0FycmF5LnB1c2gocmVudEluZGV4KTtcblxuICAgICAgICAgICAgYmluZFJlbnRNb3J0Z2FnZShteUlkKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lMl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZSgxKTtcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmVtcGxveW1lbnQsIC5wcmVFbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0sIC5jYy10by1iZS12YWxpZGF0ZS1wcmUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgaWYoZW1wbG95ZXJJbmRleCA+IDEpe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFbXBsb3llcigyKTsgLy8vIHdpbGwgdGFrZSBjYXJlIG9mIHRoZSByZXN0IG9mXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWUzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zZWxmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNSlcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNlbGYnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hZGRpdGlvbmFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNilcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmFkZGl0aW9uYWwnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU1XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXRpcmVtZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldGlyZW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zc24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZGl2aWRlbmQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lOV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZW50YWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYocmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUocmVudHNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUmVudChyZW50c0FycmF5W3JlbnRzQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICB9KVxuXG4gICAgfTsvLy8vIGNvSW5jb21lUmVhZHlcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoYXNzZXRzUmVhZHkpO1xuICAgIHZhciBhc3NldFRlbXBsYXRlLCBhc3NldEluZGV4LCBhc3NldHNIb2xkZXIsIGFzc2V0c0FycmF5O1xuICAgIHZhciBlc3RhdGVUZW1wbGF0ZSwgZXN0YXRlSW5kZXgsIGVzdGF0ZXNIb2xkZXIsIGVzdGF0ZXNBcnJheTtcblxuICAgIGZ1bmN0aW9uIGFzc2V0c1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNhc3NldHNGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbcmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAgICAgKi9cbiAgICAgICAgYXNzZXRUZW1wbGF0ZSA9ICQoJyNhc3NldFRtcGx0JykudGV4dCgpO1xuICAgICAgICBlc3RhdGVUZW1wbGF0ZSA9ICQoJyNlc3RhdGVUbXBsdCcpLnRleHQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2Fzc2V0SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgYXNzZXQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgYXNzZXRJbmRleCA9IDA7XG4gICAgICAgIGVzdGF0ZUluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2Fzc2V0c0hvbGRlciB0aGUgZGl2IHdoZXJlIGFzc2V0IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIGFzc2V0c0hvbGRlciA9ICQoJyNhc3NldHNIb2xkZXInKTtcbiAgICAgICAgZXN0YXRlc0hvbGRlciA9ICQoJyNlc3RhdGVIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2Fzc2V0c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggYXNzZXQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgYXNzZXRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCBhc3NldCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIGFzc2V0IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZWFzc2V0c0ZpZWxkcyBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYXNzZXRzQXJyYXkgPSBbXTtcbiAgICAgICAgZXN0YXRlc0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBhc3NldFxuICAgICAgICAgKi9cbiAgICAgICAgYXNzZXRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49YXNfYmFua10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdhc19iYW5rJylbMV0sIDEwKTtcblxuXG4gICAgICAgICAgICBhc3NldEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIGFzc2V0c0FycmF5LnB1c2goYXNzZXRJbmRleCk7XG5cbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICByZW1vdmVBc3NldChpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICAkKCcjYWRkQW5vdGhlckFzc2V0JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBhZGRBc3NldCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcjYWRkQW5vdGhlckVzdGF0ZScpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgYWRkRXN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9YXNfYXNzZXRzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogRGVsYXkgYWRkaW5nIGZvciBzbW9vdGggc2xpZCBkb3duIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkQXNzZXQoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hc3NldHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVtb3ZlIGFsbCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgd2hpbGUoYXNzZXRzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZFRvUmVtb3ZlID0gYXNzZXRzQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhc3NldF8nICsgaWRUb1JlbW92ZSkuc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hc3NldHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1hc19hZGRpdGlvbmFscmVhbGVzdGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZWxheSBhZGRpbmcgZm9yIHNtb290aCBzbGlkIGRvd24gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBhZGRFc3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZShlc3RhdGVzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZFRvUmVtb3ZlID0gZXN0YXRlc0FycmF5LnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjZXN0YXRlXycgKyBpZFRvUmVtb3ZlKS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0vLy8gd2hpbGVcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cbiAgICB9Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG5cblxuICAgIGZ1bmN0aW9uIGFkZEFzc2V0KCl7XG5cbiAgICAgICAgaWYoYXNzZXRzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgICAgICBhc3NldEluZGV4Kys7XG4gICAgICAgIGFzc2V0c0FycmF5LnB1c2goYXNzZXRJbmRleCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGFzc2V0VGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBhc3NldEluZGV4KTtcblxuICAgICAgICB2YXIgaWQgPSBhc3NldHNBcnJheS5sZW5ndGg7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgICAgICB2YXIgYXNzZXQgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBhc3NldC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlQXNzZXQoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAgICAgKi9cblxuICAgICAgICBhc3NldC5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgZHJvcGRvd25MYWJlbChhc3NldCk7XG5cblxuICAgICAgICBhc3NldHNIb2xkZXIuYXBwZW5kKGFzc2V0KTtcblxuICAgICAgICBhc3NldC5zbGlkZURvd24oKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBc3NldChyZW1vdmVJbmRleCl7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IGFzc2V0c0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNhc3NldF8nICsgcmVtb3ZlSW5kZXgpLnNsaWRlVXAoe1xuICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXNzZXRzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVBc3NldHNGaWVsZHMoKTtcblxuICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVBc3NldFxuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUFzc2V0c0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRBc3NldCBhbmQgcmVtb3ZlQXNzZXRcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUFzc2V0c0ZpZWxkcygpe1xuICAgICAgICB2YXIgbGltaXQgPSBhc3NldHNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRzQXJyYXlbeF07XG5cbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcblxuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0vLy8vIGZvciB4XG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldHNGaWVsZHNcblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFt1cGRhdGVBc3NldHNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBhc3NldF1cbiAgICAvLyAgKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZEFzc2V0IGFuZCByZW1vdmVBc3NldFxuICAgIC8vICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKXtcblxuICAgICAgICBpZihhc3NldHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGFzc2V0c0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjYXNzZXRfJytpbmRleCk7XG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYXNzZXRzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldENsb3NlQnRuXG5cblxuICAgIGZ1bmN0aW9uIGFkZEVzdGF0ZSgpe1xuXG4gICAgICAgIGlmKGVzdGF0ZXNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgICAgIGVzdGF0ZUluZGV4Kys7XG4gICAgICAgIGVzdGF0ZXNBcnJheS5wdXNoKGVzdGF0ZUluZGV4KTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gZXN0YXRlVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBlc3RhdGVJbmRleCk7XG5cbiAgICAgICAgdmFyIGlkID0gZXN0YXRlc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgICAgIHZhciBlc3RhdGUgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBlc3RhdGUuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZUVzdGF0ZShpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGVzdGF0ZS5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgZXN0YXRlc0hvbGRlci5hcHBlbmQoZXN0YXRlKTtcblxuICAgICAgICBkcm9wZG93bkxhYmVsKGVzdGF0ZSk7XG4gICAgICAgIHllc05vUmFkaW8oZXN0YXRlKTtcbiAgICAgICAgZmlsbFN0YXRlRHJvcGRvd24oZXN0YXRlKTtcbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoZXN0YXRlSW5kZXgsIHRydWUpOyAvLy8gdHJ1ZSBpcyB0byBmb3JjZSB0aGUgbGFiZWwgdG8gc3RhcnQgZnJvbSAxLCBkZWZhdWx0IDEgd2lsbCBiZSBpZ25vcmVkXG4gICAgICAgIGJpbmRFc3RhdGVNb3J0Z2FnZShlc3RhdGVJbmRleCk7XG5cbiAgICAgICAgZXN0YXRlLnNsaWRlRG93bigpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFc3RhdGUocmVtb3ZlSW5kZXgpe1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBlc3RhdGVzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAgICAgJCgnI2VzdGF0ZV8nICsgcmVtb3ZlSW5kZXgpLnNsaWRlVXAoe1xuICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZXN0YXRlc0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAgICAgdXBkYXRlRXN0YXRlc0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVBc3NldFxuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUVzdGF0ZXNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgRXN0YXRlIG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICAgICAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZEVzdGF0ZSBhbmQgcmVtb3ZlRXN0YXRlXG4gICAgICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4gICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVFc3RhdGVzRmllbGRzKCl7XG4gICAgICAgIHZhciBsaW1pdCA9IGVzdGF0ZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZXN0YXRlc0FycmF5W3hdO1xuXG4gICAgICAgICAgICB2YXIgZXN0YXRlRGl2ID0gJCgnI2VzdGF0ZV8nK2luZGV4KTtcblxuICAgICAgICAgICAgZXN0YXRlRGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vLyBmb3IgeFxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlZXN0YXRlc0ZpZWxkc1xuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUVzdGF0ZXNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBFc3RhdGVdXG4gICAgICogaXQgd2lsbCBiZSBjYWxsZWQgZnJvbSBhZGRFc3RhdGUgYW5kIHJlbW92ZUVzdGF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCl7XG5cbiAgICAgICAgaWYoZXN0YXRlc0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZXN0YXRlc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGVzdGF0ZURpdiA9ICQoJyNlc3RhdGVfJytpbmRleCk7XG4gICAgICAgICAgICBlc3RhdGVEaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gZXN0YXRlc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGVzdGF0ZURpdiA9ICQoJyNlc3RhdGVfJytpbmRleCk7XG4gICAgICAgICAgICBlc3RhdGVEaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGVzdGF0ZXNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckVzdGF0ZScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJFc3RhdGUnKS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlRXN0YXRlQ2xvc2VCdG5cblxuICAgIGZ1bmN0aW9uIGJpbmRFc3RhdGVNb3J0Z2FnZShpbmRleCl7XG4gICAgICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICAgIHZhciBteVZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhteUluZGV4LCBteVZhbClcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgbXlWYWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmdW4uIGJpbmRFc2F0ZU1vcnRnYWdlXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkobGlhYmlsaXRpZXNSZWFkeSk7XG4gICAgdmFyIGxpYWJpbGl0eVRlbXBsYXRlLCBsaWFiaWxpdHlJbmRleCwgbGlhYmlsaXRpZXNIb2xkZXIsIGxpYWJpbGl0aWVzQXJyYXk7XG5cbiAgICBmdW5jdGlvbiBsaWFiaWxpdGllc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNsaWFiaWxpdGllc0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdHlUZW1wbGF0ZSA9ICQoJyNsaWFiaWxpdHlUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdHlJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSBhc3NldCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdHlJbmRleCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdGllc0hvbGRlciB0aGUgZGl2IHdoZXJlIGFzc2V0IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyID0gJCgnI2xpYWJpbGl0aWVzSG9sZGVyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdGllc0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggYXNzZXQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgYXNzZXRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCBhc3NldCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIGFzc2V0IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgYXNzZXRcbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49bGlfY3JlZGl0b3JdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnbGlfY3JlZGl0b3InKVsxXSwgMTApO1xuXG5cbiAgICAgICAgICAgIGxpYWJpbGl0eUluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG5cbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICByZW1vdmVMaWFiaWxpdHkoaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpYWJpbGl0aWVzQXJyYXkpXG4gICAgICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgJCgnI2FkZEFub3RoZXJMaWFiaWxpdHknKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkTGlhYmlsaXR5KCk7XG5cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBsaWFiaWxpdGllc1JlYWR5XG5cblxuXG4gICAgZnVuY3Rpb24gYWRkTGlhYmlsaXR5KCl7XG5cbiAgICAgICAgaWYobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgICAgIGxpYWJpbGl0eUluZGV4Kys7XG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGxpYWJpbGl0eVRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgbGlhYmlsaXR5SW5kZXgpO1xuXG4gICAgICAgIHZhciBpZCA9IGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAgICAgdmFyIGxpYWJpbGl0eSA9ICQodGVtcGxhdGUpO1xuXG4gICAgICAgIGxpYWJpbGl0eS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlTGlhYmlsaXR5KGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgICAgICovXG5cbiAgICAgICAgbGlhYmlsaXR5LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICB5ZXNOb1JhZGlvKGxpYWJpbGl0eSk7XG4gICAgICAgIGRyb3Bkb3duTGFiZWwobGlhYmlsaXR5KTtcblxuXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyLmFwcGVuZChsaWFiaWxpdHkpO1xuXG4gICAgICAgIGxpYWJpbGl0eS5zbGlkZURvd24oKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gYWRkUmVudFxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlhYmlsaXR5KHJlbW92ZUluZGV4KXtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gbGlhYmlsaXRpZXNBcnJheS5pbmRleE9mKHJlbW92ZUluZGV4KTtcblxuICAgICAgICAkKCcjbGlhYmlsaXR5XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAgICAgdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMoKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gcmVtb3ZlTGlhYmlsaXR5XG5cbiAgICAvKipcbiAgICAgKiBbdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgYXNzZXQgbmFtZSBhbmQgaWQgaXMgYWx3YXlzIGluIHNlcmllcyBvZiAxLDIsMyw0LC4uLi5dXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzKCl7XG4gICAgICAgIHZhciBsaW1pdCA9IGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoO1xuICAgICAgICBpZihsaW1pdCA8IDEpIHJldHVybjtcblxuICAgICAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbeF07XG5cbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNsaWFiaWxpdHlfJytpbmRleCk7XG5cbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vLyBmb3IgeFxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHNcblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFt1cGRhdGVBc3NldHNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBhc3NldF1cbiAgICAvLyAgKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZExpYWJpbGl0eSBhbmQgcmVtb3ZlTGlhYmlsaXR5XG4gICAgLy8gICovXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlhYmlsaXR5Q2xvc2VCdG4oKXtcblxuICAgICAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNsaWFiaWxpdHlfJytpbmRleCk7XG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBsaWFiaWxpdGllc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckxpYWJpbGl0eScpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldENsb3NlQnRuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGRlY2xhcmF0aW9uc1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGRlY2xhcmF0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNkZWNsYXJhdGlvbnNGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWRlX293bmVyc2hpcF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPW90X3dvcmtpbmd3aXRoXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95ZWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95ZWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfY2l0aXplbl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICdubycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVzaWRlbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVzaWRlbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfYnByaW1hcnldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vd25lcnNoaXAnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicub3duZXJzaGlwLCAucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICB9Oy8vLy8gZGVjbGFyYXRpb25zUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGNvRGVjbGFyYXRpb25zUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gY29EZWNsYXJhdGlvbnNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjY29EZWNsYXJhdGlvbnNGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9jb19jaXRpemVuXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ25vJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hbGllbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hbGllbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBjb0RlY2xhcmF0aW9uc1JlYWR5XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGdvdmVybm1lbnRSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBnb3Zlcm5tZW50UmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2dvdkZvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgfTsvLy8vIGdvdmVybm1lbnRSZWFkeVxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShhY2tSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBhY2tSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYWNrRm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gYWNrUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGVkaXNjbG9zdXJlUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZWRpc2Nsb3N1cmVSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjZWRpc2Nsb3N1cmVGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBlZGlzY2xvc3VyZVJlYWR5XG59KSgpO1xuXG5cblxuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShpbnN0cnVjdGlvbnNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBpbnN0cnVjdGlvbnNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjaW5zdHJ1Y3Rpb25zRm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gaW5zdHJ1Y3Rpb25zUmVhZHlcbn0pKCk7XG5cblxuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShkZXBvc2l0UmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZGVwb3NpdFJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNkZXBvc2l0Rm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgICQoJ2lucHV0LmNhcmRleHBpcmF0aW9uJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q2FyZERhdGUpO1xuXG5cbiAgICB9Oy8vLy8gZGVwb3NpdFJlYWR5XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
