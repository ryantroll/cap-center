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
_appGlobal.urlEmailExistsAPI = "api-response/is-email-exists.json";
_appGlobal.urlAuthenticationAPI = "api-response/authentication.json";
_appGlobal.urlApplicationsListAPI = "api-response/applications-list.json";

_appGlobal.urlSaveTemplate = "template-save.html";
_appGlobal.saveModal = null;

_appGlobal.urlApsListTempalte = "template-applications.html"
_appGlobal.appsListModal = null;

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


    /**
     * Loas Save or login external later template
     */
    $('.saveBtn').hide();//// hide until template is loaded
    $.ajax({
      url: _appGlobal.urlSaveTemplate,
      method:'GET',
      error:function(err){
        console.log(err);
      },
      success: function(ret){
        _appGlobal.saveModal = $(ret);

        initializeSaveModal();
      }
    });

    /**
     * Load applications list template
     */
    $.ajax({
      url: _appGlobal.urlApsListTempalte,
      method:'GET',
      error:function(err){
        console.log(err);
      },
      success: function(ret){
        _appGlobal.appsListModal = $(ret);

        $('body').append(_appGlobal.appsListModal)
      }
    });

    $('#myAppsBtn').on('click', function(e){
      if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
      showApplicationsList();
    })

}//// fun. ccDocumentReady


/**
 * [initializeSaveModal will be called to initialize the save for later form after it loaded from ajax]
 * and set the click event for 'Save for Later' button
 */
function initializeSaveModal(){
  if(false === !!_appGlobal.saveModal) return;

  $('body').append(_appGlobal.saveModal);

  yesNoRadio(_appGlobal.saveModal);

  updateTabIndex(_appGlobal.saveModal.find('#login'), 100)
  updateTabIndex(_appGlobal.saveModal.find('#register'), 120)

  _appGlobal.saveModal.find('form#loginForm').validate(function(isValid, invalidFields){
      return false;
  });
  _appGlobal.saveModal.find('form#registerFrom').validate(function(isValid, invalidFields){
    return false;
  });

  _appGlobal.saveModal.find('input.phone')
  .on('keydown', restrictPhone)
  .on('keyup', formatPhone)

  _appGlobal.saveModal.find('input[name=save_login]').on('change', function(){
    var val = $(this).val();
    if(true === !!$(this).attr('checked') && val === 'login'){
      _appGlobal.saveModal.find('#login').show();
      _appGlobal.saveModal.find('#register').hide();
    }
    else{
      _appGlobal.saveModal.find('#login').hide();
      _appGlobal.saveModal.find('#register').show();
    }
    _appGlobal.overlay.adjust();
  })

  $('.saveBtn').show().on('click', function(e){
    if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
    overlay({
      selector:"#saveModal"
    });////overlay
    return false;
  });
}//// fun. initializeSaveModal

/**
 * [showApplicationsList shows user saved application modal the modal is loaded from external template]
 */
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

/**
 * [loadApplications load the list of previously saved applications and display them inside form]
 * This function use extra template that is saved as <script> tag inside the modal external HTML to display the applications rows
 * @return {[type]} [none]
 */
function loadApplications(){
    _appGlobal.appsListModal.addClass('busy');

    var template = _appGlobal.appsListModal.find('#appTemplate').eq(0).text();
    var appsHolder = _appGlobal.appsListModal.find('#appsHolder').eq(0);

    var data = {};
    data.email = $.trim( $('#login_email').val() );
    data.userId = '0000000';

    $.ajax({
        url:_appGlobal.urlApplicationsListAPI,
        data:data,
        method:"post",
        dataType:"json",
        error:function(err){
            console.log(err);
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
                        _appGlobal.appsListModal.find('a.close').trigger('click')
                    })
                    appsHolder.append(row);
                }/// for

                /**
                 * Wait for some time for accurate width and height reading
                 * @param  {[type]} ){                               _appGlobal.overlay.adjust();                  _appGlobal.appsListModal.removeClass('busy');                } [description]
                 * @param  {[type]} 200 [description]
                 * @return {[type]}     [description]
                 */
                setTimeout(function(){
                  _appGlobal.overlay.adjust();
                  _appGlobal.appsListModal.removeClass('busy');
                }, 200)


            }//// if
        }//// success
    });
}//// fun. loadApplications


/**
 * [mainScroll Window scroll event hanlder to make progress header sticky on mobile]
 */
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


/**
 * [updateTabIndex Willl update the tab index of from fields found inside the selector passed]
 * @param  {[jQuery]} selector  [used to locate the fields inside it]
 * @param  {[int]} startFrom [number to start the tab index from if not passed 0 will be used, useful when page has muliple forms]
 */
function updateTabIndex(selector, startFrom){
  var x = startFrom || 0;

    selector.find('.cc-field').each(function(i){
        var s = $(this).find('input[type=text], input[type=password], input[type=email], input[type=date], input[type=tel], input[type=radio], input[type=checkbox], input[type=number], textarea, select')
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
      var windowW = $(window).width();
      var windowH = $(window).height();
      var l = (windowW - overlayDiv.outerWidth() ) / 2;
      var t = (windowH - overlayDiv.height() ) / 2;

      if(t<0) t = 0;

      if(windowW < 768){
        l = 0; /// if mobile make it cover all screen
        t = 0;
      }
      else{
        //// if not mobile make sure the the max height is set if height is bigger than window height
        if(windowH < overlayDiv.height()){
          overlayDiv.css('max-height', windowH - 20)
        }
      }
      console.log(overlayDiv.outerWidth())
      overlayDiv.css('margin-left', '-'+(overlayDiv.outerWidth()/2)+'px').css('left', '50%').css('top', t+'px');
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
    // if(overlayDiv.find('.close').length<=0){
    //     overlayDiv.append('<a href="javascript:void(0);" class="close icon-close close-overlay"><a/>');
    // }
    overlayDiv.find('.close').css('z-index', 1001);

    overlayDiv.find('.close-overlay').on('click', function(){
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
        administrative_area_level_2: 'long_name',
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
    $('.typeahead_county'+this.post).val(address.administrative_area_level_2).trigger('change');
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
        myForm.validate(function(isValid, invalidFields){

            if(isValid){

                var isCoBorrower =  String('234').split('').indexOf( $('#bo_applytype').val() ) > -1;

                if(true === isCoBorrower){
                    myForm.attr('action', '02-coborrower.html');
                }

                return true;
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

    section.append(address).show();
    addAutoAddress(_appGlobal.addressIndex);

    updateTabIndex( $('.cc-form')); //// function in main.js
    address.slideDown();
}

function removeAddress(idRemove){

    if(idRemove <=1) return false;
    if(idRemove > _appGlobal.addressIndex) return false;

    var section = $('#preAddress');
    for(var x = idRemove; x<=_appGlobal.addressIndex; x++){
        var address = section.find('#address_' + x);

        address.find('.cc-field').removeClass('cc-validate error correct');
        // address.remove();
        address.slideUp(function(){
            $(this).remove();
        })
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
                    selector:'.retirement, .ret-401, .ret-ira, .ret-pen, .ret-annuity',
                    validationClass:'.cc-to-be-validate-retirement, cc-to-be-validate-annuity, cc-to-be-validate-pen, cc-to-be-validate-ira, cc-to-be-validate-401'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=have_401]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-401', validationClass:'.cc-to-be-validate-401'}); //// function in main.js

            }//// if
            else{
                excludeFields({
                    selector:'.ret-401',
                    validationClass:'.cc-to-be-validate-401'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=have_ira]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-ira', validationClass:'.cc-to-be-validate-ira'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.ret-ira',
                    validationClass:'.cc-to-be-validate-ira'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=have_pen]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-pen', validationClass:'.cc-to-be-validate-pen'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.ret-pen',
                    validationClass:'.cc-to-be-validate-pen'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=have_annuity]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-annuity', validationClass:'.cc-to-be-validate-annuity'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.ret-annuity',
                    validationClass:'.cc-to-be-validate-annuity'
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
                    selector:'.retirement, .ret-401, .ret-ira, .ret-pen, .ret-annuity',
                    validationClass:'.cc-to-be-validate-retirement, cc-to-be-validate-annuity, cc-to-be-validate-pen, cc-to-be-validate-ira, cc-to-be-validate-401'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=co_have_401]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-401', validationClass:'.cc-to-be-validate-401'}); //// function in main.js

            }//// if
            else{
                excludeFields({
                    selector:'.ret-401',
                    validationClass:'.cc-to-be-validate-401'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=co_have_ira]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-ira', validationClass:'.cc-to-be-validate-ira'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.ret-ira',
                    validationClass:'.cc-to-be-validate-ira'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=co_have_pen]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-pen', validationClass:'.cc-to-be-validate-pen'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.ret-pen',
                    validationClass:'.cc-to-be-validate-pen'
                }); //// function in main.js

            }
        })
        .trigger('change');

        $('input[name=co_have_annuity]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.ret-annuity', validationClass:'.cc-to-be-validate-annuity'}); //// function in main.js
            }//// if
            else{
                excludeFields({
                    selector:'.ret-annuity',
                    validationClass:'.cc-to-be-validate-annuity'
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


        $('input[name=have_liabilities]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.liability', validationClass:'.cc-to-be-validate-liab'}); //// function in main.js
                addLiability();
            }//// if
            else{
                excludeFields({
                    selector:'.liability',
                    validationClass:'.cc-to-be-validate-liab'
                }); //// function in main.js

                while(liabilitiesArray.length > 0){
                    var li = liabilitiesArray.pop(liabilitiesArray.length -1 );
                    $('#liability_'+li).slideUp(function(){
                        $(this).remove();
                    })
                }//// wile
            }
        })
        .trigger('change');

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

        setTimeout(function(){
            liability.slideDown();
        }, 200)


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwic3VwcG9ydC1wbHVnaW4uanMiLCJtYWluLmpzIiwiMDEtYm9ycm93ZXIuanMiLCIwMi1jb2JvcnJvd2VyLmpzIiwiMDMtcHVyY2hhc2UuanMiLCIwNC1yZWZpbmFuY2UuanMiLCIwNS1pbmNvbWUuanMiLCIwNi1jby1pbmNvbWUuanMiLCIwNy1hc3NldHMuanMiLCIwOC1saWFiaWxpdGllcy5qcyIsIjA5LWRlY2xhcmF0aW9ucy5qcyIsIjEwLWNvLWRlY2xhcmF0aW9ucy5qcyIsIjExLWdvdmVybm1lbnQuanMiLCIxMi1hY2tub3dsZWRnZW10bi5qcyIsIjEzLWVkaXNjbG9zdXJlLmpzIiwiMTQtaW5zdHJ1Y3Rpb25zLmpzIiwiMTUtZGVwb3NpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdmVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1NEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL1FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c1N0YXRlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbGFiYW1hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQUtcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBcml6b25hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29sb3JhZG9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNPXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGVsYXdhcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRFXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRDXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJGTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkZsb3JpZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR2VvcmdpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiR0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHdWFtXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHVVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkhhd2FpaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSElcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJZGFob1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSURcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbGxpbm9pc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbmRpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklvd2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTEFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYWluZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1BXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWljaGlnYW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1JXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNT1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1vbnRhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1UXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmVicmFza2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5FXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV2YWRhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOVlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1QXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2hpb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0hcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPa2xhaG9tYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0tcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPcmVnb25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9SXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGFsYXVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBXXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0NcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlNEXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRleGFzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUWFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlV0YWhcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlVUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmVybW9udFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVlRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVkFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldWXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIld5b21pbmdcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldZXCJcbiAgICAgIH1cbiAgXTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgJC5mbi52YWxpZGF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmb3JtID0gdGhpcy5maWx0ZXIoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICBmb3JtLm9mZignc3VibWl0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICAgICAgZm9ybS5maW5kKCcuY2MtZmllbGQuY2MtdmFsaWRhdGUnKS5lYWNoKGZ1bmN0aW9uKG4pe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBzZWxmLnZhbGlkYXRlRmllbGQoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8vLyBmYWxzZSBhbmQgdHJ1ZSBzdHJpY3RseSB0ZXN0IGFzIG51bGwgd2lsbCByZXR1cm5lZCBpcyBmaWVsZCBpcyBub3QgdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgaWYoZmFsc2UgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHNlbGYuZmluZCgnbGFiZWwnKS5lcSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZkVyciA9IHtmaWxlZDpsYWJlbC50ZXh0KCksIGlkOmZpZWxkLmF0dHIoJ2lkJyksIGVycm9yOmVycn07XG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWVsZHMucHVzaChmRXJyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyAvLy8gLmVhY2hcblxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGNhcHR1cmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHJldHVybiBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZXh0cmEgPSB0cnVlO1xuICAgICAgICAgICAgaWYoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGNhbGxiYWNrKXtcbiAgICAgICAgICAgICAgICBleHRyYSA9IGNhbGxiYWNrKGlzRm9ybVZhbGlkLCBpbnZhbGlkRmllbGRzLmxlbmd0aCA+IDAgPyBpbnZhbGlkRmllbGRzIDogbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmICEhZXh0cmE7XG5cblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNGb3JtVmFsaWQpe1xuICAgICAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsvLy8vIC5vbiBzdWJtaXRcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHZhciBnZXRNeUNvbnRhaW5lciA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICAgICAgdmFyIHAgPSBmaWVsZC5wYXJlbnQoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gcC5oYXNDbGFzcygnY2MtZmllbGQnKSl7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGdldE15Q29udGFpbmVyKHApO1xuICAgICAgICB9XG4gICAgfS8vLy8gZnVuLiBnZXRNeUNvbnRhaW5lclxuXG5cbiAgICB2YXIgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoJCh0aGlzKSk7XG4gICAgICAgIGNvbnRhaW5lci52YWxpZGF0ZUZpZWxkKClcbiAgICB9XG5cbiAgICAkLmZuLnZhbGlkYXRlRmllbGQgPSBmdW5jdGlvbihzZWxmKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZiA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCAgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgdmFyIHYgPSAkLnRyaW0oZi52YWwoKSk7XG4gICAgICAgIHZhciBlcnIgPSBmLmRhdGEoJ2VycicpO1xuICAgICAgICB2YXIgdHlwZSA9IGYuYXR0cigndHlwZScpO1xuXG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGlzVmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQnKSl7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vLy8gaGFuZGxlIHJhZGlvIGJ1dHRvbiBjYXNlXG4gICAgICAgICAgICBpZih0eXBlICYmICh0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdyYWRpbycpICl7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBmLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFkaW9zID0gc2VsZi5maW5kKFwiaW5wdXRbbmFtZT1cIituYW1lK1wiXVwiKTtcbiAgICAgICAgICAgICAgICByYWRpb3MuZWFjaChmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhcmFkaW9zLmVxKHIpLmF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8vLy8gYnJlYWsgLmVhY2ggb2Ygb24gcmFkaW8gYnV0dG9uIGZvdW5kIGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZiA9IHJhZGlvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHlwZSAmJiB0eXBlLnRvTG93ZXJDYXNlKCkgPT09ICdjaGVja2JveCcpe1xuICAgICAgICAgICAgICAgIGlmKGYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGYuZWFjaChmdW5jdGlvbihyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSAhIWYuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8vLy8gYnJlYWsgLmVhY2ggb2Ygb24gcmFkaW8gYnV0dG9uIGZvdW5kIGNoZWNrZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IGlzVmFsaWQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfS8vLy8gaWYgTGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKHYubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB0eXBlIHJhZGlvIGVsc2VcblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1yZXF1aXJlZCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vLyBpZiB2Lmxlbmd0aFxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXJlcXVpcmVkJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy8vLyBpZiBjYy1yZXF1aXJlZFxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLW51bWJlcicpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXihcXGQpKyhcXC5cXGQrKT8kLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1udW1iZXInKTtcbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtbnVtYmVyJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLW51bWJlciddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZW1haWwnKSAmJiB2KXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciByZWd4ID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtZW1haWwnKTtcbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZW1haWwnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1lbWFpbCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkZWxldGUgZXJyWydjYy1lbWFpbCddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZGF0ZScpKXtcblxuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBzcGxpdFsxXSA/IE51bWJlcihzcGxpdFsxXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3BsaXRbMl0gPyBOdW1iZXIoc3BsaXRbMl0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgbTMxID0gWzEsIDMsIDUsIDcsIDgsIDEwLCAxMl07XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIW0gfHwgbSA+IDEyIHx8IG0gPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihtMzEuaW5kZXhPZihtKSA+PTAgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoIWQgfHwgZCA+IDMxIHx8IGQgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzAgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0gPT0gMil7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfZCA9IHkgJSA0ID09IDAgPyAyOSA6IDI4O1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gX2QgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGhhc0NsYXNzIGNjLWRhdGVcbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZGF0ZSBjYy1kYXRlLWd0Jykpe1xuICAgICAgICAgICAgdmFyIGd0RmllbGQgPSAkKCcjJytzZWxmLmF0dHIoJ2RhdGEtZGF0ZS1ndCcpKTtcbiAgICAgICAgICAgIHZhciBndFZhbCwgc3RhcnREYXRlLCBlbmREYXRlO1xuICAgICAgICAgICAgaWYodi5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZ3RGaWVsZC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpZihndEZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZ3RGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGVuZERhdGUgPCBzdGFydERhdGUpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgZ3RGaWVsZC5sZW5ndGggPiAwXG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlLWd0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZGF0ZS1ndCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUtZ3QnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaGFzQ2xhc3MgY2MtZGF0ZS1ndFxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWNhcmQtZXhwaXJhdGlvbicpKXtcblxuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIHZhciBzcGxpdCA9IHYuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSAxO1xuICAgICAgICAgICAgICAgIHZhciB5ID0gc3BsaXRbMV0gPyBOdW1iZXIoc3BsaXRbMV0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG51bGxcblxuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRhdGUgPSBuZXcgRGF0ZSh5LCBtLTEsIGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCFtIHx8IG0gPiAxMiB8fCBtIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihudWxsICE9PSBkYXRlICYmIGRhdGUgPD0gbm93ICl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY2FyZC1leHBpcmF0aW9uJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiB2XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY2FyZC1leHBpcmF0aW9uJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1waG9uZScpKXtcbiAgICAgICAgICAgIGlmKHYubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXChcXGR7M31cXCkoICk/XFxkezN9XFwtXFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcGhvbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1waG9uZSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtY3VycmVuY3knKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcJD8oXFxkezEsM30pKyhcXCwqXFxkezN9KSokLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1jdXJyZW5jeScpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWN1cnJlbmN5J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWN1cnJlbmN5J107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2Mtc3NuJykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXGR7M30oXFwtKT9cXGR7Mn0oXFwtKT9cXGR7NH0kLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1zc24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1zc24nXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2Mtc3NuJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQtb25lLW9mJykpe1xuICAgICAgICAgICAgdmFyIGZpZWxkcyA9ICQoJy4nK3NlbGYuYXR0cignZGF0YS1vbmUtb2YtY2xhc3MnKSArICcgaW5wdXQnKTtcblxuICAgICAgICAgICAgdmFyIF9pc1ZhbGlkID0gZmFsc2U7IC8vLy8gbG9jYWwgaXNWYWxpZCB2YXIgd2lsbCBiZSAmJiB3aXRoIGlzVmFsaWRcbiAgICAgICAgICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgICAgIF9pc1ZhbGlkID0gX2lzVmFsaWQgfHwgISEkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IF9pc1ZhbGlkKSByZXR1cm4gZmFsc2U7Ly8vLyBzdG9wIGVhY2ggaWYgb25lIGZpbGVkIGlzIGZvdW5kXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgX2lzVmFsaWQ7XG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZC1vbmUtb2YnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXTtcblxuICAgICAgICAgICAgICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgICAgICAgICAvLyB2YXIgX2VyciA9ICQodGhpcykuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRlbGV0ZSBfZXJyWydjYy1yZXF1aXJlZC1vbmUtb2YnXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gJCh0aGlzKS5kYXRhKCdlcnInLCBfZXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1yZXF1aXJlZC1vbmUtb2YnKS5oaWRlRXJyb3IoKS5zaG93RXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaGFzQ2xhc3MgY2MtcmVxdWlyZWQtb25lLW9mXG5cbiAgICAgICAgLy8vLyByZXNldCB0aGUgZmllbGQgZXJyb3JzIGJlZm9yZSBhZGRpbmcgdGhlbSBhZ2FpblxuICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKS5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICBmLmRhdGEoJ2VycicsIGVycik7XG4gICAgICAgIGYuZGF0YSgnaXNWYWxpZCcsIGlzVmFsaWQpO1xuXG4gICAgICAgIC8vLy8gaWYgZmllbGQgcGFzc2VkIHRocm91Z2ggdmFsaWRhdGlvbiBzaG93IGVycm9yIGlmIGFueVxuICAgICAgICAvLyBpZih0cnVlID09PSBpc1ZhbGlkYXRlZCApe1xuICAgICAgICAvLyBpZihPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICBpZihmYWxzZSA9PSBpc1ZhbGlkIHx8IE9iamVjdC5rZXlzKGVycikubGVuZ3RoID4gMCl7XG5cbiAgICAgICAgICAgICAgICBmLnNob3dFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICBmLmhpZGVFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgLy8gfS8vLy8gaWYgaXNWYWxpZGF0ZWRcblxuICAgIH0vLy8vIGZ1bi4gdmFsaWRhdGVGaWxkXG5cbiAgICAkLmZuLnNob3dFcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBmID0gdGhpcy5maWx0ZXIoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcbiAgICAgICAgdmFyIHR5cGUgPSBmLmF0dHIoJ3R5cGUnKTtcblxuICAgICAgICB2YXIgZXJyID0gZi5kYXRhKCdlcnInKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSBmLmRhdGEoJ2lzVmFsaWQnKTtcblxuICAgICAgICB2YXIgc3RyID0gW107XG4gICAgICAgIGZvcih2YXIgZSBpbiBlcnIpe1xuICAgICAgICAgICAgc3RyLnB1c2goZXJyW2VdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3InKS5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICBmLm9mZigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcik7XG5cbiAgICAgICAgaWYodHJ1ZSAhPT0gaXNWYWxpZCl7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICBmLm9mZigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcikub24oJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmKHN0ci5sZW5ndGggPiAwICl7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB2YXIgbXNnID0gJCgnPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIiBpZD1cImVycm9yTXNnXCI+PGkgY2xhc3M9XCJpY29uLWVycm9yIGdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlLXNpZ25cIj48L2k+ICcgKyBzdHIuam9pbignIHwgJykgKyAnPC9kaXY+Jykuc2hvdygpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChtc2cpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdtZXNzYWdlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9Ly8vLyBmdW4uIHNob3dFcnJvclxuXG4gICAgJC5mbi5oaWRlRXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLmVxKDApO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcblxuICAgICAgICAvLyBjb250YWluZXIuYWRkQ2xhc3MoJ2NvcnJlY3QnKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdlcnJvciBtZXNzYWdlJyk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgICQuZm4uYWRkRXJyb3IgPSBmdW5jdGlvbihlcnJvckNsYXNzKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKGZpZWxkKTtcblxuICAgICAgICB2YXIgbXNnID0gY29udGFpbmVyLmZpbmQoJy5tZXNzYWdlLicrZXJyb3JDbGFzcykuZXEoMCkudGV4dCgpO1xuICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIGVycltlcnJvckNsYXNzXSA9IG1zZztcblxuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmaWVsZC5kYXRhKCdpc1ZhbGlkJywgZmFsc2UpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLnJlbW92ZUVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuXG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm4gdGhpcztcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSByZXR1cm4gdGhpcztcblxuICAgICAgICBkZWxldGUgZXJyW2Vycm9yQ2xhc3NdO1xuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBpZihPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbn0oIGpRdWVyeSApKTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgdmFyIHBhbmxlLCBwb3B1cCwgYnRuLCBxdWVzdGlvbnMsIGFjdGl2ZVF1ZXN0aW9uLCBmaWVsZHM7XG4gICAgdmFyIGhlbGxvTWVzc2FnZTtcblxuICAgICQuZm4uY2NTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5maW5kKCcuY2Mtc3VwcG9ydCcpO1xuXG5cbiAgICAgICAgaWYoc2VsZi5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgcGFuZWwgPSBzZWxmLmZpbmQoJy5jYy1zdXBwb3J0LXBhbmVsJykuZXEoMCk7XG4gICAgICAgIHBvcHVwID0gc2VsZi5maW5kKCcuY2Mtc3VwcG9ydC1wb3B1cCcpLmVxKDApO1xuICAgICAgICBidG4gPSBzZWxmLmZpbmQoJy5idG4nKS5lcSgwKTtcbiAgICAgICAgcXVlc3Rpb25zID0gcGFuZWwuZmluZCgnLmNjLXN1cHBvcnQtcXVlc3Rpb25zIGxpJyk7XG4gICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcblxuICAgICAgICBmaWVsZHMgPSB7fTtcblxuICAgICAgICBoZWxsb01lc3NhZ2UgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmhlbGxvJykudGV4dCgpO1xuXG4gICAgICAgIHF1ZXN0aW9ucy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhaWQpe1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7aW5kZXg6eCwgcTokKHRoaXMpLmZpbmQoJ2EnKS5lcSgwKS50ZXh0KCl9O1xuICAgICAgICAgICAgICAgIGZpZWxkc1tpZF0gPSBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB2YXIgdG9nZ2xlUGFuZWwgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBpZihwYW5lbC5oYXNDbGFzcygnZXhwYW5kZWQnKSl7XG4gICAgICAgICAgICAgICAgcGFuZWwucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICAgICAgICAgICAgICBxdWVzdGlvbnMuZmlsdGVyKCcuZXhwYW5kZWQnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnaScpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBidG4ucmVtb3ZlQ2xhc3MoJ291dCcpXG4gICAgICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICAgICAgfS8vLy8gaWYgaGFzQ2Fsc3NcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYnRuLmFkZENsYXNzKCdvdXQnKTtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBoaWRlIHRoZSBwb3B1cCBpZiBpdHMgdmlzaWJsZVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKHBvcHVwLmhhc0NsYXNzKCd2aXNpYmxlJykpe1xuICAgICAgICAgICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHBhbmVsLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBFeHBhbmQgcXVlc3Rpb24gd2hlbiBwYW5lbCBpcyBvcGVuZWQgaWYgdGhlIGFjdGl2ZVF1c3Rpb24gaXNcbiAgICAgICAgICAgICAgICAgICAgICogYmVlbiBzZXQgd2l0aCBmaWVsZCBmb2N1cyBldmVudFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYobnVsbCAhPT0gYWN0aXZlUXVlc3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLmVxKGFjdGl2ZVF1ZXN0aW9uKS5maW5kKCdhJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICB9LCAzMDApOyAvLy8gc2V0VGltZW91dFxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB9Ly8vIGlmIGhhc0NsYXNzIGVsc2VcbiAgICAgICAgfS8vLy8gZnVuLiB0b2dnbGVQYW5lbFxuXG4gICAgICAgIHZhciB0b2dnbGVRdWVzdGlvbiA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJlbnQuZmluZCgnaScpO1xuXG4gICAgICAgICAgICBpZihwYXJlbnQuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpe1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHF1ZXN0aW9ucy5maWx0ZXIoJy5leHBhbmRlZCcpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcblxuICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgaS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKTtcblxuICAgICAgICB9Ly8vLyBmdW4uIHRvZ2dsZVF1ZXN0aW9uXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZvY3VzIEV2ZW50IGhhbmRsZXIgZm9yIGZpZWxkcyB0byBzaG93IGhlbHBlciBtZXNzYWdlXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgc2hvd1BvcHVwID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2lkJyk7XG5cbiAgICAgICAgICAgIGlmKGlkIGluIGZpZWxkcyl7XG4gICAgICAgICAgICAgICAgcG9wdXAuYWRkQ2xhc3MoJ3Zpc2libGUnKS50ZXh0KGZpZWxkc1tpZF0ucSk7XG4gICAgICAgICAgICAgICAgYWN0aXZlUXVlc3Rpb24gPSBmaWVsZHNbaWRdLmluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBmdW4uc2hvd1BvcHVwXG5cbiAgICAgICAgdmFyIGhpZGVQb3B1cCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgcG9wdXAucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKS50ZXh0KCcnKTtcbiAgICAgICAgfS8vLy8gZnVuLnNob3dQb3B1cFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhbmVsIGNsb3NlIGJ1dHRvblxuICAgICAgICAgKi9cbiAgICAgICAgcGFuZWwuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogPyBidXR0b24gYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIGJ0bi5vbignY2xpY2snLCB0b2dnbGVQYW5lbClcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhaGVsbG9NZXNzYWdlKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnNob3dTdXBwb3J0TWVzc2FnZShoZWxsb01lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcG9wdXAgYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIHBvcHVwLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5zaWRlIHBhbmVsIHF1ZXN0aW9uIGNsaWNrIGJlaGF2aW9yXG4gICAgICAgICAqL1xuICAgICAgICBwYW5lbC5maW5kKCcuY2Mtc3VwcG9ydC1xdWVzdGlvbnMgbGkgYScpLm9uKCdjbGljaycsIHRvZ2dsZVF1ZXN0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IGZvY3VzIGV2ZW50IGZvciBmaWVsZHMgdG8gc2hvdyB0aGUgcmlnaHQgcXVlc3Rpb24gYXMgcG9wdXBcbiAgICAgICAgICogaWYgdGhlcmUgYSBxdWVzdGlvbiByZWxhdGVkIHRvIHRoaXMgZmllbGRcbiAgICAgICAgICovXG4gICAgICAgIC8vICQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykub24oJ2JsdXInLCBoaWRlUG9wdXApLm9uKCdmb2N1cycsIHNob3dQb3B1cCk7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYnRuLnJlbW92ZUNsYXNzKCdvdXQnKTtcbiAgICAgICAgfSwgMyoxMDAwKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9Oy8vLy8gJC5mbiBmdW5jdGlvblxuXG4gICAgJC5mbi5zaG93U3VwcG9ydE1lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICAgIGlmKGZhbHNlID09PSAhIXBvcHVwKSByZXR1cm4gdGhpcztcblxuICAgICAgICB2YXIgaW50ZTtcbiAgICAgICAgdmFyIGJlZm9yZUhpZGUgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlKTtcbiAgICAgICAgICAgIGludGUgPSBzZXRUaW1lb3V0KGhpZGVNZXNzYWdlLCAyMDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBoaWRlTWVzc2FnZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdG9wSGlkZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgYnRuLm9mZignbW91c2VvdXQnLCBiZWZvcmVIaWRlKS5vbignbW91c2VvdXQnLCBiZWZvcmVIaWRlKTtcbiAgICAgICAgcG9wdXAub2ZmKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpLm9uKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpO1xuICAgICAgICBwb3B1cC5vZmYoJ21vdXNlb3ZlcicsIHN0b3BIaWRlKS5vbignbW91c2VvdmVyJywgc3RvcEhpZGUpO1xuXG4gICAgICAgIHBvcHVwLnRleHQobWVzc2FnZSkuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59KCBqUXVlcnkgKSk7IiwiLyoqXG4gKiBbX2FwcEdsb2JhbCBOYW1lc3BhY2UgZm9yIGdsb2JhbCB2YXJpYWJsZXNdXG4gKiB0aGlzIHdpbGwgZGVmaW5lIGEgcHJvdGVjdCBuYW1lIHNwYWNlIGZvciBnbG9iYWwgdmFyaWFibGUgdG8gcHJ2ZW50IGFueSBjb25mbGVjdCB3aXRoIGxvY2FsIHZhcmlhYmxlc1xuICovXG52YXIgX2FwcEdsb2JhbCA9IHt9O1xuX2FwcEdsb2JhbC51cmxFbWFpbEV4aXN0c0FQSSA9IFwiYXBpLXJlc3BvbnNlL2lzLWVtYWlsLWV4aXN0cy5qc29uXCI7XG5fYXBwR2xvYmFsLnVybEF1dGhlbnRpY2F0aW9uQVBJID0gXCJhcGktcmVzcG9uc2UvYXV0aGVudGljYXRpb24uanNvblwiO1xuX2FwcEdsb2JhbC51cmxBcHBsaWNhdGlvbnNMaXN0QVBJID0gXCJhcGktcmVzcG9uc2UvYXBwbGljYXRpb25zLWxpc3QuanNvblwiO1xuXG5fYXBwR2xvYmFsLnVybFNhdmVUZW1wbGF0ZSA9IFwidGVtcGxhdGUtc2F2ZS5odG1sXCI7XG5fYXBwR2xvYmFsLnNhdmVNb2RhbCA9IG51bGw7XG5cbl9hcHBHbG9iYWwudXJsQXBzTGlzdFRlbXBhbHRlID0gXCJ0ZW1wbGF0ZS1hcHBsaWNhdGlvbnMuaHRtbFwiXG5fYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwgPSBudWxsO1xuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGNjRG9jdW1lbnRSZWFkeSk7XG5cbmZ1bmN0aW9uIGNjRG9jdW1lbnRSZWFkeSgpe1xuICAgIC8qKlxuICAgICAqIFByb2dyZXNzIG5hdmlnYXRpb24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI3Byb2dyZXNzX3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3NOYXYgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVQb3JncmVzTmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCgnMTAwJScpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKDQwKTsgLy8gY2hhbmdpbmcgdGhlIHdpZHRoIHRvIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiBvZiBwcm9ncmVzcyBiYXIgY2xpY2thYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gYm9keSBzbyBkbyB0aGUgd29yayBvbiBib2R5IGNsaWNrIFxcIG9ubHkgaWYgbWVudSBpcyBjbG9zZWRcbiAgICAgICAgICogdGhpcyB0byBtYWtlIHN1cmUgdGhlIG1lbnUgaXMgY2xvc2VkIHdoZW4gY2xpY2sgb3V0c2lkZSB0aGUgbWVudVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGZhbHNlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBIYW1idXJnZXIgbWVudSBidXR0b24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI21lbnVfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBtZW51TmF2ID0gJCgnI21lbnVfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVNZW51TmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IG1lbnVOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBtZW51TmF2LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmYWxzZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgJCgnYm9keScpLmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNjcm9sbGluZyBldmVudCBsaXN0ZW5lciB0byBtYWtlIHRoZSBwcm9ncmVzcyBiYXIgc3RpY2t5XG4gICAgICovXG4gICAgLy8gaWYoJCgnYm9keScpLndpZHRoKCkgPCA2Nzgpe1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnKS5vbignc2Nyb2xsJywgbWFpblNjcm9sbCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIHN0YXRlcyBkcm9wLWRvd25zXG4gICAgICovXG4gICAgIGZpbGxTdGF0ZURyb3Bkb3duKCAkKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG5cbiAgICAgLyoqXG4gICAgICAqIFN0YXJ0IFN1cHBvcnRcbiAgICAgICovXG4gICAgICQoZG9jdW1lbnQpLmNjU3VwcG9ydCgpO1xuXG5cbiAgICAvKipcbiAgICAgKiBGbG9hdCBsYWJlbCBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5jYy1maWVsZC5mbG9hdCcpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPXRleHRdJykuZXEoMCk7XG5cbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudCA9ICdrZXl1cCc7XG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRyb3Bkb3duJykpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50ID0gJ2NoYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZC5vbih0cmlnZ2VyRXZlbnQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZmllbGQudmFsKCkpe1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlZGl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTsvLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcuanNDb2xsYXBzZScpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5maW5kKCdhLmNsb3NlLCBhLmRpc21pc3MnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVXAoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTsvLy8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvblxuICAgICAqL1xuICAgIHllc05vUmFkaW8oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aSBjaGVja2JveFxuICAgICAqL1xuICAgIG11bHRpQ2hlY2tib3goKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBhcnJvdyBsYWJlbCBiZWhhdmlvciBmb3IgPHNlbGVjdD5cbiAgICAgKi9cbiAgICBkcm9wZG93bkxhYmVsKCk7XG5cblxuICAgIC8qKlxuICAgICAqIEJhY2sgYnV0dG9uIGNsaWNrIGhhbmRsZXJzXG4gICAgICovXG4gICAgJCgnI2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAgKiBMb2FzIFNhdmUgb3IgbG9naW4gZXh0ZXJuYWwgbGF0ZXIgdGVtcGxhdGVcbiAgICAgKi9cbiAgICAkKCcuc2F2ZUJ0bicpLmhpZGUoKTsvLy8vIGhpZGUgdW50aWwgdGVtcGxhdGUgaXMgbG9hZGVkXG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogX2FwcEdsb2JhbC51cmxTYXZlVGVtcGxhdGUsXG4gICAgICBtZXRob2Q6J0dFVCcsXG4gICAgICBlcnJvcjpmdW5jdGlvbihlcnIpe1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJldCl7XG4gICAgICAgIF9hcHBHbG9iYWwuc2F2ZU1vZGFsID0gJChyZXQpO1xuXG4gICAgICAgIGluaXRpYWxpemVTYXZlTW9kYWwoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIExvYWQgYXBwbGljYXRpb25zIGxpc3QgdGVtcGxhdGVcbiAgICAgKi9cbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBfYXBwR2xvYmFsLnVybEFwc0xpc3RUZW1wYWx0ZSxcbiAgICAgIG1ldGhvZDonR0VUJyxcbiAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsID0gJChyZXQpO1xuXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnI215QXBwc0J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIHNob3dBcHBsaWNhdGlvbnNMaXN0KCk7XG4gICAgfSlcblxufS8vLy8gZnVuLiBjY0RvY3VtZW50UmVhZHlcblxuXG4vKipcbiAqIFtpbml0aWFsaXplU2F2ZU1vZGFsIHdpbGwgYmUgY2FsbGVkIHRvIGluaXRpYWxpemUgdGhlIHNhdmUgZm9yIGxhdGVyIGZvcm0gYWZ0ZXIgaXQgbG9hZGVkIGZyb20gYWpheF1cbiAqIGFuZCBzZXQgdGhlIGNsaWNrIGV2ZW50IGZvciAnU2F2ZSBmb3IgTGF0ZXInIGJ1dHRvblxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2F2ZU1vZGFsKCl7XG4gIGlmKGZhbHNlID09PSAhIV9hcHBHbG9iYWwuc2F2ZU1vZGFsKSByZXR1cm47XG5cbiAgJCgnYm9keScpLmFwcGVuZChfYXBwR2xvYmFsLnNhdmVNb2RhbCk7XG5cbiAgeWVzTm9SYWRpbyhfYXBwR2xvYmFsLnNhdmVNb2RhbCk7XG5cbiAgdXBkYXRlVGFiSW5kZXgoX2FwcEdsb2JhbC5zYXZlTW9kYWwuZmluZCgnI2xvZ2luJyksIDEwMClcbiAgdXBkYXRlVGFiSW5kZXgoX2FwcEdsb2JhbC5zYXZlTW9kYWwuZmluZCgnI3JlZ2lzdGVyJyksIDEyMClcblxuICBfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCdmb3JtI2xvZ2luRm9ybScpLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgX2FwcEdsb2JhbC5zYXZlTW9kYWwuZmluZCgnZm9ybSNyZWdpc3RlckZyb20nKS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuXG4gIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJ2lucHV0LnBob25lJylcbiAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJ2lucHV0W25hbWU9c2F2ZV9sb2dpbl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ2xvZ2luJyl7XG4gICAgICBfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCcjbG9naW4nKS5zaG93KCk7XG4gICAgICBfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCcjcmVnaXN0ZXInKS5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCcjbG9naW4nKS5oaWRlKCk7XG4gICAgICBfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCcjcmVnaXN0ZXInKS5zaG93KCk7XG4gICAgfVxuICAgIF9hcHBHbG9iYWwub3ZlcmxheS5hZGp1c3QoKTtcbiAgfSlcblxuICAkKCcuc2F2ZUJ0bicpLnNob3coKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIG92ZXJsYXkoe1xuICAgICAgc2VsZWN0b3I6XCIjc2F2ZU1vZGFsXCJcbiAgICB9KTsvLy8vb3ZlcmxheVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59Ly8vLyBmdW4uIGluaXRpYWxpemVTYXZlTW9kYWxcblxuLyoqXG4gKiBbc2hvd0FwcGxpY2F0aW9uc0xpc3Qgc2hvd3MgdXNlciBzYXZlZCBhcHBsaWNhdGlvbiBtb2RhbCB0aGUgbW9kYWwgaXMgbG9hZGVkIGZyb20gZXh0ZXJuYWwgdGVtcGxhdGVdXG4gKi9cbmZ1bmN0aW9uIHNob3dBcHBsaWNhdGlvbnNMaXN0KCl7XG4gICAgb3ZlcmxheSh7XG4gICAgICAgIHNlbGVjdG9yOicjYXBwc0xpc3QnLFxuICAgICAgICBvbkJlZm9yZUxvYWQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxvYWRBcHBsaWNhdGlvbnMoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVDbG9zZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnI2FwcHNIb2xkZXInKS5lbXB0eSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59Ly8vLyBmdW4uIHNob3dBcHBsaWNhdGlvbnNMaXN0XG5cbi8qKlxuICogW2xvYWRBcHBsaWNhdGlvbnMgbG9hZCB0aGUgbGlzdCBvZiBwcmV2aW91c2x5IHNhdmVkIGFwcGxpY2F0aW9ucyBhbmQgZGlzcGxheSB0aGVtIGluc2lkZSBmb3JtXVxuICogVGhpcyBmdW5jdGlvbiB1c2UgZXh0cmEgdGVtcGxhdGUgdGhhdCBpcyBzYXZlZCBhcyA8c2NyaXB0PiB0YWcgaW5zaWRlIHRoZSBtb2RhbCBleHRlcm5hbCBIVE1MIHRvIGRpc3BsYXkgdGhlIGFwcGxpY2F0aW9ucyByb3dzXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtub25lXVxuICovXG5mdW5jdGlvbiBsb2FkQXBwbGljYXRpb25zKCl7XG4gICAgX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsLmFkZENsYXNzKCdidXN5Jyk7XG5cbiAgICB2YXIgdGVtcGxhdGUgPSBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwuZmluZCgnI2FwcFRlbXBsYXRlJykuZXEoMCkudGV4dCgpO1xuICAgIHZhciBhcHBzSG9sZGVyID0gX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsLmZpbmQoJyNhcHBzSG9sZGVyJykuZXEoMCk7XG5cbiAgICB2YXIgZGF0YSA9IHt9O1xuICAgIGRhdGEuZW1haWwgPSAkLnRyaW0oICQoJyNsb2dpbl9lbWFpbCcpLnZhbCgpICk7XG4gICAgZGF0YS51c2VySWQgPSAnMDAwMDAwMCc7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6X2FwcEdsb2JhbC51cmxBcHBsaWNhdGlvbnNMaXN0QVBJLFxuICAgICAgICBkYXRhOmRhdGEsXG4gICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJldCl7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHJldCkpe1xuICAgICAgICAgICAgICAgIHZhciB4O1xuICAgICAgICAgICAgICAgIGZvcih4PTA7IHg8cmV0Lmxlbmd0aDsgeCsrKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHJldFt4XTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRlbXBsYXRlO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcihsYWJlbCBpbiBvYmope1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgnXFx7XFwjJyArIGxhYmVsICsgJ1xcfScsICdnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSByb3cucmVwbGFjZSggcmVnZXggLCBvYmpbbGFiZWxdKTtcbiAgICAgICAgICAgICAgICAgICAgfSAvLy8gZm9yXG4gICAgICAgICAgICAgICAgICAgIHJvdyA9ICQocm93KTtcbiAgICAgICAgICAgICAgICAgICAgcm93LmZpbmQoJ2EnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsLmZpbmQoJ2EuY2xvc2UnKS50cmlnZ2VyKCdjbGljaycpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIGFwcHNIb2xkZXIuYXBwZW5kKHJvdyk7XG4gICAgICAgICAgICAgICAgfS8vLyBmb3JcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIFdhaXQgZm9yIHNvbWUgdGltZSBmb3IgYWNjdXJhdGUgd2lkdGggYW5kIGhlaWdodCByZWFkaW5nXG4gICAgICAgICAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSApeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLm92ZXJsYXkuYWRqdXN0KCk7ICAgICAgICAgICAgICAgICAgX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsLnJlbW92ZUNsYXNzKCdidXN5Jyk7ICAgICAgICAgICAgICAgIH0gW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgICAgICAgICAqIEBwYXJhbSAge1t0eXBlXX0gMjAwIFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICAgICAgICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICBbZGVzY3JpcHRpb25dXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgX2FwcEdsb2JhbC5vdmVybGF5LmFkanVzdCgpO1xuICAgICAgICAgICAgICAgICAgX2FwcEdsb2JhbC5hcHBzTGlzdE1vZGFsLnJlbW92ZUNsYXNzKCdidXN5Jyk7XG4gICAgICAgICAgICAgICAgfSwgMjAwKVxuXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgIH0vLy8vIHN1Y2Nlc3NcbiAgICB9KTtcbn0vLy8vIGZ1bi4gbG9hZEFwcGxpY2F0aW9uc1xuXG5cbi8qKlxuICogW21haW5TY3JvbGwgV2luZG93IHNjcm9sbCBldmVudCBoYW5sZGVyIHRvIG1ha2UgcHJvZ3Jlc3MgaGVhZGVyIHN0aWNreSBvbiBtb2JpbGVdXG4gKi9cbmZ1bmN0aW9uIG1haW5TY3JvbGwoZSl7XG4gICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICBpZigkKCdib2R5Jykud2lkdGgoKSA+IDY3OCkgcmV0dXJuO1xuXG4gICAgdmFyIHMgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgdmFyIGJhciA9ICQoJyNwcm9ncmVzc19uYXYnKTtcbiAgICBpZihzID4gMjAwKXtcbiAgICAgICAgaWYoZmFsc2UgPT09IGJhci5oYXNDbGFzcygnZmxvYXQnKSl7XG4gICAgICAgICAgICBiYXIuYWRkQ2xhc3MoJ2Zsb2F0Jyk7XG4gICAgICAgICAgICBiYXIucGFyZW50KCkuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGJhci5oZWlnaHQoKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBiYXIucmVtb3ZlQ2xhc3MoJ2Zsb2F0Jyk7XG4gICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgbnVsbClcbiAgICB9XG5cbn0vLy8vIGZ1bi4gbWFpblNjcm9sbFxuXG5cbi8qKlxuICogW3VwZGF0ZVRhYkluZGV4IFdpbGxsIHVwZGF0ZSB0aGUgdGFiIGluZGV4IG9mIGZyb20gZmllbGRzIGZvdW5kIGluc2lkZSB0aGUgc2VsZWN0b3IgcGFzc2VkXVxuICogQHBhcmFtICB7W2pRdWVyeV19IHNlbGVjdG9yICBbdXNlZCB0byBsb2NhdGUgdGhlIGZpZWxkcyBpbnNpZGUgaXRdXG4gKiBAcGFyYW0gIHtbaW50XX0gc3RhcnRGcm9tIFtudW1iZXIgdG8gc3RhcnQgdGhlIHRhYiBpbmRleCBmcm9tIGlmIG5vdCBwYXNzZWQgMCB3aWxsIGJlIHVzZWQsIHVzZWZ1bCB3aGVuIHBhZ2UgaGFzIG11bGlwbGUgZm9ybXNdXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVRhYkluZGV4KHNlbGVjdG9yLCBzdGFydEZyb20pe1xuICB2YXIgeCA9IHN0YXJ0RnJvbSB8fCAwO1xuXG4gICAgc2VsZWN0b3IuZmluZCgnLmNjLWZpZWxkJykuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgdmFyIHMgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9cGFzc3dvcmRdLCBpbnB1dFt0eXBlPWVtYWlsXSwgaW5wdXRbdHlwZT1kYXRlXSwgaW5wdXRbdHlwZT10ZWxdLCBpbnB1dFt0eXBlPXJhZGlvXSwgaW5wdXRbdHlwZT1jaGVja2JveF0sIGlucHV0W3R5cGU9bnVtYmVyXSwgdGV4dGFyZWEsIHNlbGVjdCcpXG4gICAgICAgIHMuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3RhYmluZGV4JywgeCsxKTtcbiAgICAgICAgICB4Kys7XG4gICAgICAgIH0pXG4gICAgfSlcbn0vLy8vIGZ1bi4gdXBkYXRlVGFiSW5kZXhcblxuLyoqXG4gKiBbeWVzTm9SYWRpbyBXaWxsIHNldCB0aGUgYmVoYXZpb3Igb2YgeWVzL25vIHJhZGlvIGJ1dHRvbnMgYnkgYWRkaW5nIC5jaGVja2VkIGNsYXNzIHRvIHRoZSBsYWJlbCBvZiB0aGUgYnV0dG9uXVxuICogdGhlIGZ1bmN0aW9uIGFzc3VtZSB0aGUgaW5wdXRbdHlwZT1yYWRpb25dIGlzIGluY2x1ZGVkIGluc2lkZSA8bGFiZWw+IHRhZ1xuICovXG5mdW5jdGlvbiB5ZXNOb1JhZGlvKGNvbnRhaW5lcil7XG4gIC8vLy8gaWYgY29udGFpbmVyIGlzIHBhc3NlZCBmaW5kIHRoZSByYWRpb3MgaW5zaWRlIGl0IG9yIGRvIGEgZG9jdW1lbnQgZ2xvYmFsIGZpbmRcbiAgdmFyIHJhZGlvcyA9ICEhY29udGFpbmVyID8gY29udGFpbmVyLmZpbmQoJy5yYWRpby15ZXNubyBpbnB1dFt0eXBlPXJhZGlvXScpIDogJCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJyk7XG4gIHJhZGlvcy5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgaWYoJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsYWJlbC5jaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2NoZWNrZWQnKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICB9XG4gIH0pXG4gIC5vbignZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmb2N1cycpO1xuICB9KVxuICAub24oJ2JsdXIga2lsbGZvY3VzJywgZnVuY3Rpb24oZSl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgY2hhbmdlIHRvIHNldCB0aGUgcmlnaHQgYXBwZWFyYW5jZSB3aGVuIGZvcm0gaXMgcHJlLWxvYWRlZCB3aXRoIGRhdGFcbiAgICovXG4gIHJhZGlvcy50cmlnZ2VyKCdjaGFuZ2UnKTsvLy8vIHRoaXMgdG8gc2V0IHRoZSBpbml0aWFsIHN0YXRlXG59XG5cbmZ1bmN0aW9uIG11bHRpQ2hlY2tib3goKXtcbiAgdmFyIHJhZGlvcyA9ICQoJy5jYy1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZigkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAvLyAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xhYmVsLmNoZWNrZWQnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykuYWRkQ2xhc3MoJ2dseXBoaWNvbiBnbHlwaGljb24tb2snKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaScpLnJlbW92ZUNsYXNzKCk7XG4gICAgfVxuICB9KTtcbiAgLyoqXG4gICAqIFRyaWdnZXIgY2hhbmdlIHRvIHNldCB0aGUgcmlnaHQgYXBwZWFyYW5jZSB3aGVuIGZvcm0gaXMgcHJlLWxvYWRlZCB3aXRoIGRhdGFcbiAgICovXG4gIHJhZGlvcy50cmlnZ2VyKCdjaGFuZ2UnKTtcbn0vLy8vIGZ1bi4gbXVsdGlDaGVja0JveFxuXG4vKipcbiAqIFtkcm9wZG93bkxhYmVsIFNldCB0aGUgY2xpY2sgZXZlbnQgZm9yIGFycm93IGxhYmVsIGZvciA8c2VsZWN0PiBlbGVtZW50XVxuICogdGhpcyBzb2x1dGlvbiB3b3JrcyBvbmx5IHNhZmFyaSBhbmQgY2hyb21lIGR1ZSB0byBicm93c2VyIGxpbWl0YXRpb25cbiAqL1xuZnVuY3Rpb24gZHJvcGRvd25MYWJlbChjb250YWluZXIpe1xuICB2YXIgbGFiZWxzID0gY29udGFpbmVyID8gY29udGFpbmVyLmZpbmQoJy5jYy1kcm9wZG93biBsYWJlbC5hcnJvdycpIDogJCgnLmNjLWRyb3Bkb3duIGxhYmVsLmFycm93Jyk7XG4gIGxhYmVscy5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgdmFyIGlkID0gJCh0aGlzKS5hdHRyKCdmb3InKTtcbiAgICAgIGlmKGZhbHNlID09PSAhIWlkKSByZXR1cm47XG4gICAgICB2YXIgZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgTW91c2VFdmVudCgnbW91c2Vkb3duJyk7XG4gICAgICBmaWVsZC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9KVxufS8vLy8gZnVuLiBkcm9wZG93bkxhYmVsXG5cbi8qKlxuICogW2ZpbGxTdGF0ZURyb3Bkb3duIHdpbGwgZmlsbCB0aGUgZHJvcGRvbiBvZiBVU0Egc3RhdGVzIGZvcm0gdXNTdGF0ZSB2YXJpYWJsZV1cbiAqIEBwYXJhbSAge1t0eXBlXX0gc2VsZWN0b3IgW2pRdWVyeSBvYmplY3QgdGhhdCBjb250YWluIDxzZWxlY3Q+IHRhZyB0byBiZSBmaWxsZWRdXG4gKiB1c1NhdGUgaXMgYXJyYXkgb2Ygb2JqZWN0IGRlZmluZWQgaW4gdXMtc3RhdHVzLmpzIGZpbGVcbiAqL1xuZnVuY3Rpb24gZmlsbFN0YXRlRHJvcGRvd24oc2VsZWN0b3Ipe1xuICAgIHNlbGVjdG9yLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciB1bCA9ICQodGhpcykuZmluZCgnc2VsZWN0Jyk7XG4gICAgICAgIGZvcih2YXIgcz0wOyBzPHVzU3RhdGVzLmxlbmd0aDsgcysrKXtcbiAgICAgICAgICAgIHZhciBsaSA9ICQoJzxvcHRpb24gdmFsdWU9XCInICsgdXNTdGF0ZXNbc10uYWJicmV2aWF0aW9uICsgJ1wiPicgKyB1c1N0YXRlc1tzXS5uYW1lICsgJzwvb3B0aW9uPicpO1xuICAgICAgICAgICAgdWwuYXBwZW5kKGxpKTtcbiAgICAgICAgfS8vLy8gZm9yXG4gICAgfSk7XG59Ly8vLyBmdW4uIGZpbGxTdGF0ZURyb3Bkb3duXG5cbi8qKlxuICogW2lzQW5kcm9pZCBzaW1wbGUgZnVuY3Rpb24gdG8gZGV0ZWN0IEFuZHJvaWQgT1NdXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZGV0ZWN0IHRoZSBidWcgaW4gQW5kcm9pZCB3aGVuIGtleWRvd24sIGtleXVwIGV2ZW50IGRvZXNuJ3Qgc2VuZCB0aGUgcmlnaHQga2V5IGNvZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFt0cnVlIGlmIEFuZHJvaWQgT1NdXG4gKi9cbnZhciBpc0FuZHJvaWQgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gLyhhbmRyb2lkKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59Ly8vLyBmdW4uIGlzQW5kcm9pZFxuXG5cbnZhciByZXN0cmljdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcblxuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAtKCkgXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbMTg5LCA0OCwgNTcsIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpXG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBmb3JtYXRQaG9uZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByYXdWYWx1ZSA9IHZhbC5zcGxpdCgvW1xcKHxcXCl8IHxcXC18XFwrfFxcLl0vKS5qb2luKCcnKTtcbiAgdmFyIGZvcm1hdGVkID0gJyc7XG4gIGlmKHJhd1ZhbHVlLmxlbmd0aCA+PSAzKXtcbiAgICBmb3JtYXRlZCArPSAnKCcgKyByYXdWYWx1ZS5zbGljZSgwLDMpICsgJykgJztcbiAgICByYXdWYWx1ZSA9IHJhd1ZhbHVlLnNsaWNlKDMpO1xuICB9XG4gIGlmKHJhd1ZhbHVlLmxlbmd0aCA+PSAzKXtcbiAgICBmb3JtYXRlZCArPSByYXdWYWx1ZS5zbGljZSgwLDMpICsgJy0nO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgZm9ybWF0ZWQgKz0gcmF3VmFsdWU7XG5cbiAgJCh0aGlzKS52YWwoZm9ybWF0ZWQpO1xufS8vLy8gZnVuLiBmb3JtYXRQaG9uZVxuXG52YXIgcmVzdHJpY3REYXRlID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcblxuICB2YXIgYWxsb3dlZENoYXJzID0gWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJy8nXVxuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpXG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciBmb3JtYXREYXRlID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC8vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICcvJztcbiAgICByYXcgPSByYXcuc2xpY2UoMik7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICcvJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufS8vLy8gZnVuLiBmb3JtYXRlRGF0ZVxuXG52YXIgZm9ybWF0Q2FyZERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIC8vIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgLy8gICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIC8vICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIC8vIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdENhcmREYXRlXG5cbnZhciByZXN0cmljdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC1cIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciBmb3JtYXRTU04gPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwtL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDMpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMykgKyAnLSc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDMpO1xuXG4gICAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLSc7XG4gICAgICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn1cblxudmFyIHJlc3RyaWN0TnVtYmVycyA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciByZXN0cmljdEN1cnJlbmN5ID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwJCxcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFs5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5oaWRlRXJyb3IoKTtcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdEN1cnJlbmN5ID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG5cbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwuc3BsaXQoL1tcXCR8IHxcXCxdLykuam9pbignJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+IDMpe1xuICAgICAgdmFyIGFyciA9IHJhdy5zcGxpdCgnJyk7XG4gICAgICB2YXIgc2VwID0gMTtcbiAgICAgIGZvcih2YXIgeD1hcnIubGVuZ3RoLTE7IHg+PTA7IHgtLSl7XG4gICAgICAgIC8vLy8gYWRkIHJlYWRpbmcgY29tbWEgYWZ0ZXIgMyBkaWdpdHMgYW5kIG9ubHkgaWYgdGhlcmUgaXMgbmV4dCBkaWdpdFxuICAgICAgICByZXQgPSAoc2VwICUgMyA9PSAwICYmIHRydWUgPT09ICEhYXJyW3gtMV0/ICcsJyA6ICcnKSArIGFyclt4XSAgKyByZXQ7XG4gICAgICAgIHNlcCsrO1xuICAgICAgfVxuICAgICAgcmV0ID0gJyQnICsgcmV0O1xuICB9XG4gIGVsc2UgaWYocmF3Lmxlbmd0aCA+IDApe1xuICAgIHJldCA9ICckJyArIHJhdztcbiAgfVxuICBlbHNle1xuICAgIHJldCA9IHJhdztcbiAgfVxuXG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLy8gZnVuLiBmb3JtYXRDdXJyZW5jeVxuXG52YXIgYW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uKHksIHRpbWUpe1xuXG4gICAgY2xlYXJJbnRlcnZhbChfYXBwR2xvYmFsLnNjcm9sbEludGUpOy8vLy8gc3RvcCBhbnlzY3JvbGxpbmdcblxuICAgIGlmKHVuZGVmaW5lZCA9PT0gdGltZSkgdGltZSA9IDE7Ly8vLyBzZXQgZGVmYXVsdCB2YWx1ZSBmb3IgdGltZVxuICAgIHZhciBmcHMgPSA2MDsgLy8vLyBmcmFtZXMgcGVyIHNlY29uc1xuICAgIHZhciBmcmFtZVRpbWUgPSBNYXRoLmNlaWwoMTAwMCAvIGZwcyk7XG4gICAgdmFyIGQgPSB0aW1lICogZnJhbWVUaW1lOyAvLy8gbnVtYmVyIG9mIGZyYW1lcyBkdXJhdGlvblxuICAgIHZhciB0ID0gMDsgLy8vLyB0aW1lIHRpY2tlciAvIGZyYW1lIGNvdW50ZXJcblxuICAgIC8vLy8gc2V0IGJlZ2luIHBvaW50IHdoaWhjIHRoZSBjdXJycmVudCBwb2ludFxuICAgIC8vIGIgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IHdpbmRvdy5zY3JvbGxZO1xuICAgIHZhciBiID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCB3aW5kb3cucGFnZVlPZmZzZXQgfHwgMDtcbiAgICAvL1xuICAgIGlmKGIgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGIgPSAwO1xuICAgIH1cblxuXG4gICAgLy8vLyBjaGVjayBpZiBzY3JvbGxpbmcgZGVzdGluYXRpb24gaXMgYmlnZ2VyIHRoYW4gcGFnZSBoZWlnaHQgbGltaXRzXG4gICAgdmFyIGxpbWl0ID0gTWF0aC5tYXgoIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodFxuICAgICk7XG4gICAgaWYoeT5saW1pdCl7XG4gICAgICAgIHkgPSBsaW1pdDtcbiAgICB9XG5cbiAgICAvLy8vIHNldCB0aGUgY2hhbmdlIGJldHdlZW4gY3VycmVudCBhbmQgZGVzdGluYXRpb24gcG9pbnRcbiAgICBjID0gYiAtIHk7XG5cbiAgICAvLy8vIGRvIG5vdGhpbmcgaWYgZGVzdGluYXRpb24gaXMgc2FtZSBhcyBjdXJyZW50XG4gICAgaWYoTWF0aC5hYnMoYykgPCAxKSByZXR1cm47XG5cbiAgICAvLy8vIHN0YXJ0IHRpbWUgdGlja2VyXG4gICAgX2FwcEdsb2JhbC5zY3JvbGxJbnRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8vIGVhc2Ugb3V0IG1hdGhcbiAgICAgICAgdmFyIHBlciA9IDEgLSB0L2Q7XG4gICAgICAgIHZhciBuZXdZID0gIC1jICogKDEtcGVyKnBlcipwZXIqcGVyKSArIGI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI+PlwiLCAxLSgxLXBlcikqKDEtcGVyKSk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXdZKTtcblxuXG4gICAgICAgIGlmKHQgPT0gZCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF9hcHBHbG9iYWwuc2Nyb2xsSW50ZSk7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignYW5pbWF0ZVNjcm9sbEVuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHQrKztcblxuICAgIH0sIGZyYW1lVGltZSk7XG59Ly8vLyBmdW4uIGFuaW1hdGVTY3JvbGxcblxuZnVuY3Rpb24gb3ZlcmxheShvKXtcbiAgICAvLyBhZGQgYSBiYWNrZ3JvdW5kIHRvIG92ZXJsYXlcbiAgICB2YXIgdyA9ICQoZG9jdW1lbnQpLndpZHRoKCk7XG4gICAgdmFyIGggPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcblxuICAgIC8vLyBjYXNzaCB0aGUgb3ZlcmxheSBEaXZcbiAgICB2YXIgb3ZlcmxheURpdiA9ICQob1snc2VsZWN0b3InXSk7XG5cbiAgICB0aGlzLmNsb3NlT3ZlcmxheT0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gcmVtb3ZlIGtleXByZXNzIGV2ZW50IGxpc250ZXJcbiAgICAgICAgJCh3aW5kb3cpLm9mZigna2V5cHJlc3MnKTtcblxuICAgICAgICBpZihvLm9uQmVmb3JlQ2xvc2UpIG8ub25CZWZvcmVDbG9zZSgpO1xuXG4gICAgICAgIC8vIGhpZGUgdGhlIG1ha3MgYW5kIG92ZXJsYXlcbiAgICAgICAgb3ZlcmxheURpdi5oaWRlKCk7XG5cbiAgICAgICAgJCgnI292ZXJsYXlNYXNrJykucmVtb3ZlKCk7XG4gICAgICAgIG92ZXJsYXlEaXYuZmluZCgnYS5jbG9zZScpLm9mZignY2xpY2snKTtcbiAgICAgICAgZGVsZXRlIF9hcHBHbG9iYWwub3ZlcmxheTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogW2FkanVzdCBzZXQgdGhlIHRvcCBhbmQgbGVmdCBwb3NpdGlvbiBvZiBvdmVybGF5ZWQgZGl2IHRvIGJlIGNlbnRlcmVkXG4gICAgICovXG4gICAgdGhpcy5hZGp1c3QgPSBmdW5jdGlvbigpe1xuICAgICAgdmFyIHdpbmRvd1cgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgIHZhciB3aW5kb3dIID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgICAgdmFyIGwgPSAod2luZG93VyAtIG92ZXJsYXlEaXYub3V0ZXJXaWR0aCgpICkgLyAyO1xuICAgICAgdmFyIHQgPSAod2luZG93SCAtIG92ZXJsYXlEaXYuaGVpZ2h0KCkgKSAvIDI7XG5cbiAgICAgIGlmKHQ8MCkgdCA9IDA7XG5cbiAgICAgIGlmKHdpbmRvd1cgPCA3Njgpe1xuICAgICAgICBsID0gMDsgLy8vIGlmIG1vYmlsZSBtYWtlIGl0IGNvdmVyIGFsbCBzY3JlZW5cbiAgICAgICAgdCA9IDA7XG4gICAgICB9XG4gICAgICBlbHNle1xuICAgICAgICAvLy8vIGlmIG5vdCBtb2JpbGUgbWFrZSBzdXJlIHRoZSB0aGUgbWF4IGhlaWdodCBpcyBzZXQgaWYgaGVpZ2h0IGlzIGJpZ2dlciB0aGFuIHdpbmRvdyBoZWlnaHRcbiAgICAgICAgaWYod2luZG93SCA8IG92ZXJsYXlEaXYuaGVpZ2h0KCkpe1xuICAgICAgICAgIG92ZXJsYXlEaXYuY3NzKCdtYXgtaGVpZ2h0Jywgd2luZG93SCAtIDIwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhvdmVybGF5RGl2Lm91dGVyV2lkdGgoKSlcbiAgICAgIG92ZXJsYXlEaXYuY3NzKCdtYXJnaW4tbGVmdCcsICctJysob3ZlcmxheURpdi5vdXRlcldpZHRoKCkvMikrJ3B4JykuY3NzKCdsZWZ0JywgJzUwJScpLmNzcygndG9wJywgdCsncHgnKTtcbiAgICB9Ly8vLyBmdW4uIGFkanVzdFxuXG4gICAgJCgnYm9keScpLmFwcGVuZCgnPGRpdiBpZD1cIm92ZXJsYXlNYXNrXCIgc3R5bGU9XCJ0b3A6MDsgcmlnaHQ6MDsgYm90dG9tOjA7IGxlZnQ6MDsgcG9zaXRpb246Zml4ZWQ7IGJhY2tncm91bmQtY29sb3I6IzAwMDsgei1pbmRleDo5OTk4OyB0b3A6MHB4OyBsZWZ0OjBweDtcIj48L2Rpdj4nKTtcbiAgICAvLyAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwib3ZlcmxheU1hc2tcIiBzdHlsZT1cIndpZHRoOicrIHcgKydweDsgaGVpZ2h0OicrIGggKydweDsgcG9zaXRpb246YWJzb2x1dGU7IGJhY2tncm91bmQtY29sb3I6IzAwMDsgei1pbmRleDo5OTk4OyB0b3A6MHB4OyBsZWZ0OjBweDtcIj48L2Rpdj4nKTtcbiAgICB2YXIgbWFzayA9ICQoJyNvdmVybGF5TWFzaycpO1xuICAgIG1hc2suYWRkQ2xhc3MoXCJmYWRldG85MFwiKS5jc3MoXCJvcGFjaXR5XCIsICcwLjYnKTtcblxuICAgIC8vIGFzc2luZyBjbGljayB0byBjbG9zZVxuICAgIG1hc2sub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY2xvc2VPdmVybGF5KCk7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBlbmQgdGhlIGNsb3NlIGJ1dHRvblxuICAgIC8vIGlmKG92ZXJsYXlEaXYuZmluZCgnLmNsb3NlJykubGVuZ3RoPD0wKXtcbiAgICAvLyAgICAgb3ZlcmxheURpdi5hcHBlbmQoJzxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCIgY2xhc3M9XCJjbG9zZSBpY29uLWNsb3NlIGNsb3NlLW92ZXJsYXlcIj48YS8+Jyk7XG4gICAgLy8gfVxuICAgIG92ZXJsYXlEaXYuZmluZCgnLmNsb3NlJykuY3NzKCd6LWluZGV4JywgMTAwMSk7XG5cbiAgICBvdmVybGF5RGl2LmZpbmQoJy5jbG9zZS1vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgY2xvc2VPdmVybGF5KCk7XG4gICAgfSk7XG5cbiAgICBpZihvLm9uQmVmb3JlTG9hZCkgby5vbkJlZm9yZUxvYWQoKTtcblxuICAgIG92ZXJsYXlEaXYuY3NzKCd6LWluZGV4JywnOTk5OScpLnJlbW92ZUNsYXNzKCdmYWRlaW4nKS5zaG93KCkuYWRkQ2xhc3MoJ2ZhZGVpbicpO1xuXG4gICAgLyoqXG4gICAgICogQ2VudGVyIHRoZSBvdmVybGF5IGRpdlxuICAgICAqL1xuICAgIHRoaXMuYWRqdXN0KCk7XG5cbiAgICBpZihvLm9uQWZ0ZXJMb2FkKSBvLm9uQWZ0ZXJMb2FkKCk7XG5cbiAgICAvLy8gYWRkIGxpc3RlbmVyIGZvciBFc2Mga2V5XG4gICAgJCh3aW5kb3cpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uKGspe1xuICAgICAgICBpZihrLmtleUNvZGUgJiYgay5rZXlDb2RlID09IDI3KSBjbG9zZU92ZXJsYXkoKTtcbiAgICB9KTtcblxuICAgIC8vLy8vLy8gc2V0IHJlZmVyZW5jZSBpbiBhcHBsaWNhdGlvbiB2YXJpYWJsZXNcbiAgICBfYXBwR2xvYmFsLm92ZXJsYXkgPSB0aGlzO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59Ly8gZW5kIG9mIGZ1bi4gb3ZlcmxheVxuXG4vKipcbiAqIFtyZXNldEZpZWxkcyB3aWxsIHNlYXJjaCBmb3IgaW5wdXQgZmllbGQgaW5zaWRlIGEgY29udGFpbmVyIGFuZCByZXN0IGl0cyB2YWx1ZSBhbmQgYW55IGVycm9yIHN0YXR1c11cbiAqIEBwYXJhbSAge1t0eXBlXX0gY29udGFpbmVyIFtqUXVleXIgb2JqZWN0IHRoYXQgc2hvdWxkIGNvbnRhaW4gaW5wdXQgZmlsZWQgdGhhdCBuZWVkIGJlIHJlc2V0XVxuICovXG52YXIgcmVzZXRGaWVsZHMgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICB2YXIgZmllbGRzID0gY29udGFpbmVyLmZpbmQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XG5cbiAgZmllbGRzLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgdmFyIHR5cGUgPSAkKHRoaXMpLmF0dHIoJ3R5cGUnKTtcbiAgICBpZih0eXBlID09PSAncmFkaW8nKXtcbiAgICAgICQodGhpcykucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maWx0ZXIoJ2xhYmVsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICQodGhpcykudmFsKCcnKTtcbiAgICB9XG4gICAgJCh0aGlzKS5oaWRlRXJyb3IoKTtcbiAgfSk7XG5cbn0vLy8vIGZ1bi4gcmVzZXRGaWVsZHNcblxuLyoqXG4gKiBbaW5jbHVkZUZpZWxkcyB3aWxsIGFkZCBoaWRkZW4gZmllbGRzIGluIGZvcm0gYW5kIHNldCB0aGUgcmlnaHQgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGluY2x1ZGVkIGUuZy4gXCIubmV3LWZpZWxkc1wiLCBcIiNjbG9kaW5nRGF0ZVwiXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgaW5jbHVkZSBpbiB2YWxpZGF0aW9uXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG52YXIgaW5jbHVkZUZpZWxkcyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucy5zZWxlY3RvciB8fCAhb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpIHJldHVybiBmYWxzZTtcblxuICB2YXIgZmllbGRzID0gJChvcHRpb25zLnNlbGVjdG9yKTtcbiAgZmllbGRzLmZpbmQob3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICBmaWVsZHMuc2xpZGVEb3duKCk7XG5cbn1cblxuLyoqXG4gKiBbZXhjbHVkZUZpZWxkcyB3aWxsIGV4Y2x1ZGUgZmllbGRzIGZyb20gZm9ybSBhbmQgc2V0IHJlbW92ZSB0aGUgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGV4Y2x1ZGVkXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgZXhjbHVkZWQgZnJvbSB2YWxpZGF0aW9uXG4gKi9cbnZhciBleGNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIHJlc2V0RmllbGRzKGZpZWxkcyk7XG4gIGZpZWxkcy5zbGlkZVVwKCk7XG59XG5cbi8qKlxuICogW2FkZEF1dG9BZGRyZXNzIHdpbGwgYWRkIGFkZHJlc3MgdHlwZSBhaGVhZCBmdW5jdGlvbmFsaXR5IHRvIHRleHQgZmllbGQgd2l0aCBpZCAnYm9fYWRkcmVzcyddXG4gKiBAcGFyYW0ge1t0eXBlXX0gaW5kZXggW2luIG11bHRpLWFkZHJlc3MgY2FzZSB0aGlzIHZhcmlhYmxlIHdpbGwgdGVsIHRoZSBmdW5jdGlvbiB3aGljaCBhZGRyZXNzIHRvIGJpbmQgdGhlIHR5cGUgYWhlYWQgdG9dXG4gKi9cbmZ1bmN0aW9uIGFkZEF1dG9BZGRyZXNzKGluZGV4LCBzdGFydEZyb20xKXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID49IDIgfHwgdHJ1ZSA9PT0gc3RhcnRGcm9tMSA/ICcnK2luZGV4IDogJyc7XG5cbiAgICB2YXIgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib19hZGRyZXNzJyArIHBvc3QpLFxuICAgICAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnICsgcG9zdCkuZmlsdGVyKCdpbnB1dCcpWzBdLFxuICAgICAgICB7dHlwZXM6IFsnZ2VvY29kZSddfVxuICAgICk7XG4gICAgLy8vLyBzZXQgdGhlIGFkZHJlc3MgaW5kZXggYW5kIHBvc3QgaW4gYXV0b2NvbXBsZXRlIG9iamVjdCB0byBiZSB1c2VkIGluIGZpbGxJbkFkZHJlc3MgZnVuY3Rpb25cbiAgICBhdXRvY29tcGxldGUuaW5kZXggPSAwO1xuICAgIGF1dG9jb21wbGV0ZS5wb3N0ID0gcG9zdDtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhZGRyZXNzIGZyb20gdGhlIGRyb3Bkb3duLCBwb3B1bGF0ZSB0aGUgYWRkcmVzc1xuICAgIC8vIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBmaWxsSW5BZGRyZXNzKTtcbn1cblxuLyoqXG4gKiBbZmlsbEluQWRkcmVzcyB3aWxsIHVwZGF0ZSB0aGUgYWRkcmVzcyBjaXR5LCBzdGF0LCBhbmQgemlwIGZpbGVkIGFmdGVyIHVzZXIgc2VsZWN0IGFkZHJlc3MgZm9ybSB0eXBlIGFoZWFkXVxuICogdGhpcyBpbnNpZGUgdGhpcyBmdW5jdGlvbiB3aWxsIHJlZmVyZW5jZSBnb29nbGUgYXV0b2NvbXBldGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtbbnVsbF19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmlsbEluQWRkcmVzcygpe1xuICAgIC8vLy8gdGhpcyByZWZlciB0byB0aGUgYXV0byBjb21wbGV0ZSBvYmplY3RcblxuICAgIHZhciBwbGFjZSA9IHRoaXMuZ2V0UGxhY2UoKTtcblxuICAgIHZhciBjb21wb25lbnRGb3JtID0ge1xuICAgICAgICBzdHJlZXRfbnVtYmVyOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIHJvdXRlOiAnbG9uZ19uYW1lJyxcbiAgICAgICAgbG9jYWxpdHk6ICdsb25nX25hbWUnLFxuICAgICAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzE6ICdzaG9ydF9uYW1lJyxcbiAgICAgICAgYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8yOiAnbG9uZ19uYW1lJyxcbiAgICAgICAgY291bnRyeTogJ2xvbmdfbmFtZScsXG4gICAgICAgIHBvc3RhbF9jb2RlOiAnc2hvcnRfbmFtZSdcbiAgICB9O1xuXG4gICAgdmFyIGFkZHJlc3MgPSB7fTtcbiAgICB2YXIgbG9uZ19uYW1lID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR5cGUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbMF07XG4gICAgICAgIHZhciBhZGRyZXNzVHlwZSA9IHR5cGU7XG5cbiAgICAgIGlmIChjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXSkge1xuICAgICAgICB2YXIgdmFsID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldW2NvbXBvbmVudEZvcm1bYWRkcmVzc1R5cGVdXTtcbiAgICAgICAgYWRkcmVzc1thZGRyZXNzVHlwZV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBpZihhZGRyZXNzVHlwZSA9PT0gJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpe1xuICAgICAgICAgICAgbG9uZ19uYW1lID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldWydsb25nX25hbWUnXTtcbiAgICAgICAgfVxuICAgIH0vLy8vIGZvclxuICAgIGFkZHJlc3MuYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xX2xvbmdfbmFtZSA9IGxvbmdfbmFtZTtcblxuICAgICQoJy50eXBlYWhlYWRfYWRkcmVzcycrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5zdHJlZXRfbnVtYmVyICsgJyAnICsgYWRkcmVzcy5yb3V0ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9jaXR5Jyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLmxvY2FsaXR5KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3N0YXRlJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9jb3VudHknK3RoaXMucG9zdCkudmFsKGFkZHJlc3MuYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8yKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3ppcCcrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5wb3N0YWxfY29kZSkudHJpZ2dlcignY2hhbmdlJyk7XG59XG4iLCIvKipcbiAqIFRoZXNlIGdsb2JhbCB2YXJpYWJsZXMgc2hhcmVkIHdpdGggMDItY29ib3Jyb3dlci5qc1xuICogX2FwcEdsb2JhbC5hZGRyZXNzVGVtcGxhdGUsIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4O1xuICovXG5cbihmdW5jdGlvbigpe1xuICAgIHZhciBsb2dpbkZvcm0sIGxvZ2luT3ZlcmxheSwgYXBwT3ZlcmxheTtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShib3Jyb3dlclJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGJvcnJvd2VyUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2JvcnJvd2VyRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA9IDE7XG5cbiAgICAgICAgX2FwcEdsb2JhbC5hZGRyZXNzVGVtcGxhdGUgPSAkKCcjYWRkcmVzc1RlbXBsYXRlJykuaHRtbCgpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNDb0JvcnJvd2VyID0gIFN0cmluZygnMjM0Jykuc3BsaXQoJycpLmluZGV4T2YoICQoJyNib19hcHBseXR5cGUnKS52YWwoKSApID4gLTE7XG5cbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc0NvQm9ycm93ZXIpe1xuICAgICAgICAgICAgICAgICAgICBteUZvcm0uYXR0cignYWN0aW9uJywgJzAyLWNvYm9ycm93ZXIuaHRtbCcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgLy8vLyBpZiB0aGUgZm9ybSBpcyBub3QgdmFsaWQgYW5kIGNvbnRpbnVlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdG8gdGhlIHBhZ2UgdG8gZmlyc3QgZmllbGQgd2l0aCBlcnJvclxuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTsgIC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLy8vIGlmIGlzVmFsaWQgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIGV2ZW50IGhhbmRsZXJzIGFyZSBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSlcblxuXG5cbiAgICAgICAgJCgnI2JvX2hvd2hlYXInKS5vZmYoJ2NoYW5nZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLDEwKTtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbMiwzLDQsNV07XG4gICAgICAgICAgICBpZihhcnIuaW5kZXhPZih2YWwpID4gLTEpe1xuICAgICAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgICAgICovXG4gICAgICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2JvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgY2hhbmdlIG9mIHJhZGlvIGJ1dHRvbiBjdXJyZW50IGFkZHJlc3Mgb3duL3JlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9Ym9fY3VycmVudGx5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICB2YXIgcmVudENvbCA9ICQoJyNtb250aGx5UmVudCcpO1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbnRDb2wuZmluZCgnLmNjLWZpZWxkJykuZXEoMCk7XG4gICAgICAgICAgICBpZih2YWwudG9Mb3dlckNhc2UoKSA9PT0gJ3JlbnQnKXtcbiAgICAgICAgICAgICAgICByZW50Q29sLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJlbnRDb2wuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgbWVzc2FnZSBlcnJvcicpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLnNhZmFyaT09PSB0cnVlID8gJ2JsdXInIDogJ2NoYW5nZSc7IC8vLy8gY2hhbmdlIGlzIG5vdCBmaXJlZCB3aGVuIGF1dG9maWxsIGlzIHVzZWQgb24gc2FmYXJpXG4gICAgICAgICQoJyNib19lbWFpbCcpLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogbWFrZSBzdXJlIGVtYWlsIGZpZWxkIGlzIHZhbGlkYXRlIGJlZm9yZSBkb2luZyBhbnkgY2hlY2tcbiAgICAgICAgICAgICAqIGlkICNlbWFpbEZpZWxkIGlzIGdpdmVuIHRvIC5jYy1maWVsZCBjb250YWluZXIgb2YgZW1haWwgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgJCgnI2VtYWlsRmllbGQnKS52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSAkLnRyaW0oJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICB2YXIgaXNWYWxpZCA9ICQodGhpcykuZGF0YSgnaXNWYWxpZCcpO1xuXG4gICAgICAgICAgICBpZih2YWwgJiYgdHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOl9hcHBHbG9iYWwudXJsRW1haWxFeGlzdHNBUEksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6e2VtYWlsOnZhbH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmVtYWlsLnRvTG93ZXJDYXNlKCkgPT0gdmFsLnRvTG93ZXJDYXNlKCkgJiYgcmV0LmV4aXN0cyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKHJldC5leGlzdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9Ly8vIGlmIHZhbFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgfS8vLy8gbm90IHZhbFxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gYWRkcmVzc1xuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogTG9naW4gRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgbG9naW5Gb3JtID0gJChcIiNsb2dpbkZvcm1cIik7XG4gICAgICAgIGxvZ2luT3ZlcmxheSA9ICQoXCIjbG9naW5PdmVybGF5XCIpO1xuICAgICAgICAkKCcjbG9naW5Gb3JtJykudmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBMb2dpbiBmb3JtIGlzIHZhbGlkIGRvIGFqYXggY2FsbCB0byBhdXRoZW50aWNhdGlvblxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ge307XG5cbiAgICAgICAgICAgICAgICBkYXRhLmVtYWlsID0gJC50cmltKCQoXCIjbG9naW5fZW1haWxcIikudmFsKCkpO1xuICAgICAgICAgICAgICAgIGRhdGEucGFzc3dvcmQgPSAkLnRyaW0oJChcIiNsb2dpbl9wYXNzd29yZFwiKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IGxvZ2luT3ZlcmxheS5hZGRDbGFzcyhcImJ1c3lcIikuZmluZCgnLmVycm9yLW1lc3NhZ2UnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgbXNnLnRleHQobXNnLmF0dHIoJ2RhdGEtZGVmYXVsdCcpKTtcbiAgICAgICAgICAgICAgICAkKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbCgnJyk7XG5cbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6X2FwcEdsb2JhbC51cmxBdXRoZW50aWNhdGlvbkFQSSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTpkYXRhLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcjpmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ2luT3ZlcmxheS5yZW1vdmVDbGFzcygnYnVzeScpLmZpbmQoJy5lcnJvci1tZXNzYWdlJykuc2xpZGVEb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgPT09IHJldC5zdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmV0LmVtYWlsLnRvTG93ZXJDYXNlKCkgPT09IGRhdGEuZW1haWwudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLm92ZXJsYXkuY2xvc2VPdmVybGF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZUxvZ2luRm9ybSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0FwcGxpY2F0aW9uc0xpc3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5PdmVybGF5LnJlbW92ZUNsYXNzKCdidXN5JykuZmluZCgnLmVycm9yLW1lc3NhZ2UnKS50ZXh0KHJldC5tZXNzYWdlKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTsgLy8vLyBubyBjYWxsYmFjayBpcyByZXF1aXJlZFxuXG4gICAgICAgICQoJyNsb2dpblNraXBCdG4nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbG9naW5TZWN0aW9uJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNsb2dpbkJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICAkKCcjbG9naW5fZW1haWwnKS52YWwoICQoJyNib19lbWFpbCcpLnZhbCgpICk7XG5cbiAgICAgICAgICAgIG92ZXJsYXkoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicjbG9naW5PdmVybGF5JyxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZUxvYWQ6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBub3RoaW5nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkJlZm9yZUNsb3NlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVMb2dpbkZvcm0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYXBwT3ZlcmxheSA9ICQoJyNhcHBzTGlzdCcpO1xuXG5cbiAgICAgICAgLy8gc2hvd0FwcGxpY2F0aW9uc0xpc3QoKTtcbiAgICB9Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9naW5TZWN0aW9uKGVtYWlsRXhpc3RzKXtcbiAgICAgICAgaWYodHJ1ZSA9PT0gZW1haWxFeGlzdHMpIHtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbG9naW5TZWN0aW9uJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2xvZ2luU2VjdGlvbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0vLy8vLyBmdW4uIHVwZGF0ZUxvZ2luU2VjdGlvblxuXG4gICAgZnVuY3Rpb24gaGlkZUxvZ2luRm9ybSgpe1xuICAgICAgICByZXNldEZpZWxkcyhsb2dpbkZvcm0pOyAvLy8gcmVzZXRGaWVsZHMgaW4gbWFpbi5qc1xuICAgICAgICBsb2dpbk92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2J1c3knKS5maW5kKCcuZXJyb3ItbWVzc2FnZScpLmhpZGUoKTtcbiAgICB9Ly8vLyBmdW4uIGhpZGVMb2dpbkZvcm1cblxuXG5cbn0pKCk7XG5cblxuXG5mdW5jdGlvbiBjaGVja0FkZHJlc3NMZW5ndGgoY29udGFpbmVyLCBpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+IDEgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcblxuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG4gICAgICAgIGlmKCF2KSB2ID0wO1xuICAgICAgICBpZigheWVhcnMpe1xuICAgICAgICAgICAgeWVhcnMgPSAwO1xuICAgICAgICAgICAgJCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApLnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG5cbiAgICAgICAgaWYoIXYpIHtcbiAgICAgICAgICAgIHYgPTA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXllYXJzKSB5ZWFycyA9IDA7XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSlcbn0vLy8vLyBmdW4uIGNoZWNrQWRkcmVzc0xlbmd0aFxuXG5mdW5jdGlvbiBhZGRBZGRyZXNzKG5leHRJZCl7XG4gICAgaWYobmV4dElkID49IDUpIHJldHVybiBmYWxzZTtcbiAgICBpZihfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA+PSBuZXh0SWQpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA9IG5leHRJZDtcbiAgICB2YXIgYWRkcmVzcyA9ICQoX2FwcEdsb2JhbC5hZGRyZXNzVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpKTtcblxuICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkLmNjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGFkZHJlc3MuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTsgLy8vLyBmdW4uIGluIG1haW4uanNcblxuICAgIGFkZHJlc3MuZmluZCgnaW5wdXQubnVtYmVycycpLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKTtcblxuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChhZGRyZXNzLCBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCk7XG5cbiAgICBzZWN0aW9uLmFwcGVuZChhZGRyZXNzKS5zaG93KCk7XG4gICAgYWRkQXV0b0FkZHJlc3MoX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICBhZGRyZXNzLnNsaWRlRG93bigpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVBZGRyZXNzKGlkUmVtb3ZlKXtcblxuICAgIGlmKGlkUmVtb3ZlIDw9MSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKGlkUmVtb3ZlID4gX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9X2FwcEdsb2JhbC5hZGRyZXNzSW5kZXg7IHgrKyl7XG4gICAgICAgIHZhciBhZGRyZXNzID0gc2VjdGlvbi5maW5kKCcjYWRkcmVzc18nICsgeCk7XG5cbiAgICAgICAgYWRkcmVzcy5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAvLyBhZGRyZXNzLnJlbW92ZSgpO1xuICAgICAgICBhZGRyZXNzLnNsaWRlVXAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgfVxuICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gaWRSZW1vdmUtMTtcbiAgICBpZihfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCA8PSAxKSBzZWN0aW9uLnNsaWRlVXAoKVxufVxuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShjb0JvcnJvd2VyUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gY29Cb3Jyb3dlclJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0JvcnJvd2VyRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYWRkcmVzc0luZGV4IHdpbGwgdHJhY2sgdGhlIG51bWJlciBvZiBhZGRyZXNzIGFkZGVkIGFuZCBzdG9wIGlmIHRvdGFsIG9mIDQgYWRkcmVzc11cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gMTtcblxuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGNvLWJvcnJvd2VyIGxpdmUgaW4gZGlmZmVyZW50IGFkZHJlc3NcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9Y29fbGl2ZXNhbWVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCkgPT09ICd5ZXMnKXtcblxuICAgICAgICAgICAgICAgICQoJyNhZGRyZXNzRGl2Jykuc2xpZGVVcCgpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYy12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgICAgIC5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAkKCcjcHJlQWRkcmVzcycpLnNsaWRlVXAoKS5lbXB0eSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAkKCcjYWRkcmVzc0RpdicpLnNsaWRlRG93bigpXG4gICAgICAgICAgICAgICAgLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KG15Rm9ybSk7IC8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCYWNrIGJ1dHRvbiBjbGljayBoYW5kbGVyc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2JhY2snKS5vbignY2xpY2snLCBmdW5jdGlvbihjZSl7XG4gICAgICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAgICAgKiBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAgICAgKi9cbiAgICAgICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBudW1iZXIgb2YgZGVwZW5kZW50cyBjaGFuZ2UgYW5kIHNob3cgYWdlcyBmaWVsZHNcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb19kZXBlbmRhbnRzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgICAgIHZhciBhZ2VzRGl2ID0gJCgnI2RlcGVuZGVudFNlY3Rpb24nKTtcbiAgICAgICAgICAgIHZhciBjb2xzID0gYWdlc0Rpdi5maW5kKCcuY29sLXhzLTYnKS5oaWRlKCk7XG5cbiAgICAgICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgICAgICBmb3IodmFyIHg9MDsgeDx2OyB4Kyspe1xuICAgICAgICAgICAgICAgICAgICBjb2xzLmVxKHgpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWdlc0Rpdi5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYWdlc0Rpdi5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHVwZGF0ZSBjby1ib3Jyb3dlciBuYW1lIGluIHN1YiB0aXRsZXNcbiAgICAgICAgICovXG4gICAgICAgIHZhciBuYW1lSG9sZGVyID0gJCgnLmNvQm9ycm93ZXJOYW1lJyk7XG4gICAgICAgICQoJyNjb19mbmFtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQudHJpbSggJCh0aGlzKS52YWwoKSApO1xuICAgICAgICAgICAgbmFtZUhvbGRlci50ZXh0KCB2YWwgPyB2YWwgOiAnQ28tQm9ycm93ZXInKTtcbiAgICAgICAgfSlcbiAgICB9Oy8vLy8gY29Cb3Jyb3dlclJlYWR5XG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShwdXJjaGFzZVJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIHB1cmNoYXNlUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI3B1cmNoYXNlRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIHJlYWwgc3RhdGUgYWdlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfdXNpbmdhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgdmFyIGFnZW50ID0gJCgnI2FnZW50Q29udGFjdCcpO1xuICAgICAgICAgICAgdmFyIGFnZW50RmllbGRzID0gJCgnI2FnZW50RmllbGRzJyk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudENvbnRhY3QnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonI2FnZW50RmllbGRzLCAjYWdlbnRDb250YWN0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOy8vLy8vIG9uLmNoYW5nZVxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIGNvbnRhY3QgYWdlbnRcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfY29udGFjdGFnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgcHJvcGVydHlcbiAgICAgICAgICovXG4gICAgICAgICQoJyNwdV9zZWFyY2h0eXBlcHVyY2hhc2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IFN0cmluZygnMzQnKS5zcGxpdCgnJykuaW5kZXhPZih2YWwpID4gLTE7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09IGlzUHJvcGVydHkpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHktZmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5wcm9wZXJ0eS1maWVsZHMsICNzdWJOYW1lLCAjY2xvc2luZ0RhdGUsICNtb250aGx5SE9BJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1zdWIsIC5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nLCAuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTsvLy8gb24uY2hhbmdlXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGNoZWNrIGlmIEhPQSBkdWVzXG4gICAgICAgICAqL1xuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X3BsYW5uZWR1bml0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1IT0EnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X2hhdmVjbG9zaW5nZGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV9tYW51ZmFjdHVyZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3ViJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTsvLy8vIHB1cmNoYXNlUmVhZHlcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkocmVmaW5hbmNlUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gcmVmaW5hbmNlUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI3JlZmluYW5jZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LnNzbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9wcm9wZXJ0eXJlZmluYW5jaW5nXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih2YWwgPT09ICdubycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vdGhlckFkZHJlc3MnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgSE9BIGR1ZXNcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX2ZvcnNhbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfc3ViamVjdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2NvbnN0cnVjdGlvbkJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX2lzdGl0bGVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9oYXZlTW9ydGdhZ2UxXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZmlyc3RNb3J0Z2FnZSwgLnNlY29uZE1vcnRnYWdlLCAuY3JlZGl0LWxpbWl0JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTIsIC5jYy10by1iZS12YWxpZGF0ZS1jbCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfc2VjbW9ydGdhZ2VdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlY29uZE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNlY29uZE1vcnRnYWdlLCAuY3JlZGl0LWxpbWl0LCAjYWRkaXRpb25hbExpZW5zJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2wsIC5jYy10by1iZS12YWxpZGF0ZS1saW5lJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9tb3J0Z2FnZTJMT0NdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNyZWRpdC1saW1pdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxsaWVuc10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FkZGl0aW9uYWxMaWVucycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpZW4nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Oy8vLy8gYm9ycm93ZXJSZWFkeVxufSkoKTsiLCIvKipcbiAqIEJlbG93IGdsb2JhbCB2YXJpYWJsZXMgYXJlIHNoYXJlZCB3aXRoIGNvLWJvcnJvd2VyIGluY29tZSBwYWdlIDA2LWNvLWluY29tZS5qc1xuICogX2FwcEdsb2JhbC5lbXBsb3llclRlbXBsYXRlLCBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXgsIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyO1xuICogX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUsIF9hcHBHbG9iYWwucmVudEluZGV4LCBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyLCBfYXBwR2xvYmFsLnJlbnRzQXJyYXk7XG4gKi9cblxuXG4oZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShib0luY29tZVJlYWR5KTtcblxuXG4gICAgZnVuY3Rpb24gYm9JbmNvbWVSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYm9JbmNvbWVGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJUZW1wbGF0ZSA9ICQoJyNlbXBsb3llclRtcGx0JykudGV4dCgpO1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSAxO1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlciA9ICQoJyNlbXBsb3llcnNIb2xkZXInKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZSA9ICQoJyNyZW50VG1wbHQnKS50ZXh0KCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSByZW50IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudEluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudHNIb2xkZXIgdGhlIGRpdiB3aGVyZSByZW50IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIgPSAkKCcjcmVudHNIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIHJlbnQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVudHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IHJlbnQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCByZW50IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZVJlbnRzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBlbXBsb3llcnNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKG15SW5kZXgpO1xuICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKG15SW5kZXgpO1xuICAgICAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgcmVudCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49cmVfYWRkcmVzc10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdyZV9hZGRyZXNzJylbMV0sIDEwKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMTAwICsgbXlJbmRleCk7XG5cbiAgICAgICAgICAgIF9hcHBHbG9iYWwucmVudEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwucmVudHNBcnJheS5wdXNoKF9hcHBHbG9iYWwucmVudEluZGV4KTtcblxuICAgICAgICAgICAgYmluZFJlbnRNb3J0Z2FnZShteUlkKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lMl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZSgxKTtcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmVtcGxveW1lbnQsIC5wcmVFbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0sIC5jYy10by1iZS12YWxpZGF0ZS1wcmUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKDIpOyAvLy8gd2lsbCB0YWtlIGNhcmUgb2YgdGhlIHJlc3Qgb2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlbGYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg1KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2VsZicsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFkZGl0aW9uYWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg2KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuYWRkaXRpb25hbCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldGlyZW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0aXJlbWVudCwgLnJldC00MDEsIC5yZXQtaXJhLCAucmV0LXBlbiwgLnJldC1hbm51aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCwgY2MtdG8tYmUtdmFsaWRhdGUtYW5udWl0eSwgY2MtdG8tYmUtdmFsaWRhdGUtcGVuLCBjYy10by1iZS12YWxpZGF0ZS1pcmEsIGNjLXRvLWJlLXZhbGlkYXRlLTQwMSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aGF2ZV80MDFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LTQwMScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLTQwMSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldC00MDEnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS00MDEnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWhhdmVfaXJhXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldC1pcmEnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1pcmEnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0LWlyYScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWlyYSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aGF2ZV9wZW5dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LXBlbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXBlbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXQtcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcGVuJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1oYXZlX2FubnVpdHldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LWFubnVpdHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hbm51aXR5J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldC1hbm51aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYW5udWl0eSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lNl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc3NuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc3NuJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU3XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jaGlsZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuY2hpbGQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lOF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZGl2aWRlbmQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmRpdmlkZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJlbnRhbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEFkZCBuZXcgcHJvcGVydHkgaWYgdGhlIHByb3BlcnR5IGNvdW50IGlzIDBcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGFkZFJlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLnNob3coKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJlbnRhbCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIHdoaWxlKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUmVudChfYXBwR2xvYmFsLnJlbnRzQXJyYXlbX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgICAgICAgICAgfS8vLyB3aGlsZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFkZFJlbnQoKTtcbiAgICAgICAgfSlcblxuICAgIH07Ly8vLyBib3Jyb3dlclJlYWR5XG59KSgpO1xuXG5cbmZ1bmN0aW9uIGJpbmRFbXBsb3ltZW50RGF0ZShpbmRleCl7XG5cbiAgICB2YXIgZmllbGRzID0gJCgnaW5wdXQuc3RhcnREYXRlJyArIGluZGV4ICsgJywgaW5wdXQuZW5kRGF0ZScgKyBpbmRleCk7XG4gICAgdmFyIGV2ZW50TmFtZSA9ICQuYnJvd3Nlci5tc2llID8gJ2tleXVwJyA6ICdjaGFuZ2UnOyAvLy8gY2hhbmdlIGlzIG5vdCBmaXJpbmcgb24gSUUgISEhXG4gICAgZmllbGRzLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5vZmYoZXZlbnROYW1lLCBjaGVja0VtcGxveW1lbnREYXRlKVxuICAgICAgICAub24oZXZlbnROYW1lLCBjaGVja0VtcGxveW1lbnREYXRlKTtcbiAgICB9KVxuICAgIC8vIGZpZWxkcy5vZmYoJ2NoYW5nZScsIGNoZWNrRW1wbG95bWVudERhdGUpXG59Ly8vLy8gZnVuLiBiaW5kRW1wbG95bWVudERhdGVcblxuZnVuY3Rpb24gYWRkRW1wbG95ZXIoaW5kZXgpe1xuICAgIC8qKlxuICAgICAqIExpbWl0IHRvIDQgcHJldmlvdXMgZW1wbG95ZXJzXG4gICAgICovXG4gICAgaWYoaW5kZXggPiA0KSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBFbXBsb3llcnMgc2hvdWxkIGJlIGFkZGVkIGluIGluY3JlYXNpbmcgaW5kZXhcbiAgICAgKi9cbiAgICBpZihpbmRleCA8IF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogaWYgdGhlIGVtcGxveWVyIHdpdGggaW5kZXggaXMgYWxyZWFkeSBhZGRlZCBkbyBub3RoaW5nXG4gICAgICovXG4gICAgaWYoJCgnI2VtcGxveWVyXycgKyBpbmRleCkubGVuZ3RoID4gMCl7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSBpbmRleDtcblxuICAgIHZhciBlbXBsb3llciA9ICQoX2FwcEdsb2JhbC5lbXBsb3llclRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNcXH0pL2csIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCkpO1xuXG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGVtcGxveWVyLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cbiAgICB5ZXNOb1JhZGlvKGVtcGxveWVyKTtcbiAgICBkcm9wZG93bkxhYmVsKGVtcGxveWVyKTtcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIuYXBwZW5kKGVtcGxveWVyKTtcblxuICAgIGFkZEF1dG9BZGRyZXNzKF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCk7XG4gICAgYmluZEVtcGxveW1lbnREYXRlKF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgZW1wbG95ZXIuc2xpZGVEb3duKCk7XG59Ly8vLyBmdW4uIGFkZEVtcGxveWVyXG5cbmZ1bmN0aW9uIHJlbW92ZUVtcGxveWVyKHJlbW92ZUluZGV4KXtcblxuICAgIGlmKHJlbW92ZUluZGV4IDw9IDEpIHJldHVybjtcbiAgICAvLyBpZihyZW1vdmVJbmRleCA+IDQpIHJldHVybjtcblxuICAgIGZvcih2YXIgeD1yZW1vdmVJbmRleDsgeDw9X2FwcEdsb2JhbC5lbXBsb3llckluZGV4OyB4Kyspe1xuICAgICAgICAkKCcjZW1wbG95ZXJfJyArIHgpLnNsaWRlVXAoe1xuICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRldGFjaCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSByZW1vdmVJbmRleCAtIDE7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRW1wbG95bWVudERhdGUoZXYpe1xuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgZW5kIGRhdGUgYW5kIGFkZCBwcmV2aW91cyBqb2IgaWYgYXBwbGljYWJsZVxuICAgICAqL1xuICAgIHZhciBpbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICB2YXIgZW5kRGF0ZUZpZWxkID0gJCgnLmVuZERhdGUnK2luZGV4KS5lcSgwKTtcbiAgICB2YXIgc3RhcnREYXRlRmllbGQgPSAkKCcuc3RhcnREYXRlJytpbmRleCkuZXEoMCk7XG4gICAgdmFyIGVuZERhdGUsIHN0YXJ0RGF0ZTtcblxuICAgIGlmKGVuZERhdGVGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgdmFyIGRhdGVTcGxpdCA9IGVuZERhdGVGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoTnVtYmVyKGRhdGVTcGxpdFsyXSksIE51bWJlcihkYXRlU3BsaXRbMF0pLTEsIE51bWJlcihkYXRlU3BsaXRbMV0pKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYoc3RhcnREYXRlRmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgIHZhciBkYXRlU3BsaXQgPSBzdGFydERhdGVGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoZW5kRGF0ZSA8PSBzdGFydERhdGUpe1xuICAgICAgICBlbmREYXRlRmllbGQuYWRkRXJyb3IoJ2NjLWRhdGUtZ3QnKS5zaG93RXJyb3IoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoZW5kRGF0ZSAtIHN0YXJ0RGF0ZSA8ICAyICogMzY1ICogMjQgKiA2MCAqIDYwICogMTAwMCApe1xuICAgICAgICAgICAgLy8gaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcmVFbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcHJlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIGFkZEVtcGxveWVyKGluZGV4KzEpXG4gICAgICAgIH0vLy8vXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVFbXBsb3llcihpbmRleCsxKVxuICAgICAgICB9XG4gICAgfS8vLy8gZWxzZVxufS8vLy8gZnVuLiBjaGVja0VtcGx5bWVudERhdGVcblxuZnVuY3Rpb24gYWRkUmVudCgpe1xuXG4gICAgaWYoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICBfYXBwR2xvYmFsLnJlbnRJbmRleCsrO1xuICAgIF9hcHBHbG9iYWwucmVudHNBcnJheS5wdXNoKF9hcHBHbG9iYWwucmVudEluZGV4KTtcbiAgICB2YXIgdGVtcGxhdGUgPSBfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIF9hcHBHbG9iYWwucmVudEluZGV4KTtcblxuICAgIHZhciBpZCA9IF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGg7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCBpcyB1c2VkIHRvIGhlbHAgYWRkIGFuZCB0cmFjayB0aGUgYWRkcmVzcyBmaWVsZHMgZm9yIHR5cGUgYWhlYWQgYWRkcmVzcyBmdW5jdGlvbmFsaXR5XVxuICAgICAqIDEwMCArIGlzIGFkZGVkIHRvIGRpZmZlcmVudGlhdGUgdGhlIHJlbnQgcHJvcGVydHkgYWRkcmVzcyBmaWVsZHMgZnJvbSBlbXBsb3llciBhZGRyZXNzIGZpZWxkc1xuICAgICAqL1xuICAgIHZhciBhZGRyZXNzSW5kZXggPSAxMDAgKyBfYXBwR2xvYmFsLnJlbnRJbmRleDtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFBsdXNcXH0pL2csIGFkZHJlc3NJbmRleCk7XG5cblxuICAgIHZhciByZW50ID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICByZW50LmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICB9KTtcblxuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCByZW50LmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvbiBiZWhhdmlvclxuICAgICAqL1xuICAgIHllc05vUmFkaW8ocmVudCk7XG4gICAgZHJvcGRvd25MYWJlbChyZW50KTtcblxuXG5cbiAgICAvKipcbiAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAqL1xuICAgIHJlbnQuZmluZCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgcmVudC5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyLmFwcGVuZChyZW50KTtcblxuICAgIHJlbnQuc2xpZGVEb3duKCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgbW9ydGdhZ2UgeWVzL25vIGFjdGlvblxuICAgICAqL1xuICAgIGJpbmRSZW50TW9ydGdhZ2UoaWQpO1xuXG4gICAgYWRkQXV0b0FkZHJlc3MoYWRkcmVzc0luZGV4KTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIGFkZFJlbnRcblxuZnVuY3Rpb24gcmVtb3ZlUmVudChyZW1vdmVJbmRleCl7XG4gICAgdmFyIHBvc2l0aW9uID0gX2FwcEdsb2JhbC5yZW50c0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgJCgnI3Byb3BlcnR5XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgIHVwZGF0ZVJlbnRzRmllbGRzKCk7XG5cbiAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gcmVtb3ZlUmVudFxuXG4vKipcbiAqIFt1cGRhdGVSZW50c0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW50IHByb3BlcnR5IG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkUmVudCBhbmQgcmVtb3ZlUmVudFxuICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVJlbnRzRmllbGRzKCl7XG4gICAgdmFyIGxpbWl0ID0gX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aDtcbiAgICBpZihsaW1pdCA8IDEpIHJldHVybjtcblxuICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXlbeF07XG5cbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG5cbiAgICAgICAgcmVudERpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmb3IgeFxufS8vLy8gZnVuLiB1cGRhdGVSZW50c0ZpZWxkc1xuXG4vKipcbiAqIFt1cGRhdGVSZW50Q2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgcHJvcGVydHldXG4gKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZFJlbnQgYW5kIHJlbW92ZVJlbnRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUmVudENsb3NlQnRuKCl7XG4gICAgaWYoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXlbMF07XG4gICAgICAgIHZhciByZW50RGl2ID0gJCgnI3Byb3BlcnR5XycraW5kZXgpO1xuICAgICAgICByZW50RGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwucmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpZihfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAvLyAkKCcjYWRkUmVudFByb3BlcnR5JykuYXR0cih7J2Rpc2FibGVkJzp0cnVlfSkuY3NzKHsnb3BhY2l0eSc6MC41fSk7XG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIC8vICQoJyNhZGRSZW50UHJvcGVydHknKS5hdHRyKHsnZGlzYWJsZWQnOmZhbHNlfSkuY3NzKHsnb3BhY2l0eSc6MX0pO1xuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgIH1cblxufS8vLy8gZnVuLiB1cGRhdGVSZW50Q2xvc2VCdG5cblxuZnVuY3Rpb24gYmluZFJlbnRNb3J0Z2FnZShpbmRleCl7XG4gICAgJCgnaW5wdXQubW9ydGdhZ2VSYWRpbycraW5kZXgpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbXlJbmRleCA9ICQodGhpcykuYXR0cignZGF0YS1pbmRleCcpO1xuICAgICAgICB2YXIgbXlWYWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIG15VmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG59Ly8vLyBmdW4uIGJpbmRSZW50TW9ydGdhZ2UiLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShjb0luY29tZVJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGNvSW5jb21lUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2NvSW5jb21lRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVsb3cgZ2xvYmFsIHZhcmlhYmxlcyBkZWZpbmVkIGluIDA1LWluY29tZS5qc1xuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llclRlbXBsYXRlID0gJCgnI2VtcGxveWVyVG1wbHQnKS50ZXh0KCk7XG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IDE7XG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyID0gJCgnI2VtcGxveWVyc0hvbGRlcicpO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudFRlbXBsYXRlID0gJCgnI3JlbnRUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSByZW50IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudEluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudHNIb2xkZXIgdGhlIGRpdiB3aGVyZSByZW50IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIgPSAkKCcjcmVudHNIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIHJlbnQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVudHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IHJlbnQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCByZW50IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZVJlbnRzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBlbXBsb3llcnNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKG15SW5kZXgpO1xuICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKG15SW5kZXgpO1xuICAgICAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgcmVudCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLnJlbnRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49cmVfY29fYWRkcmVzc10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdyZV9jb19hZGRyZXNzJylbMV0sIDEwKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMTAwICsgbXlJbmRleCk7XG5cbiAgICAgICAgICAgIF9hcHBHbG9iYWwucmVudEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwucmVudHNBcnJheS5wdXNoKF9hcHBHbG9iYWwucmVudEluZGV4KTtcblxuICAgICAgICAgICAgYmluZFJlbnRNb3J0Z2FnZShteUlkKTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAgICAgKi9cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lMl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZSgxKTtcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmVtcGxveW1lbnQsIC5wcmVFbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0sIC5jYy10by1iZS12YWxpZGF0ZS1wcmUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKDIpOyAvLy8gd2lsbCB0YWtlIGNhcmUgb2YgdGhlIHJlc3Qgb2ZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlbGYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg1KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2VsZicsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFkZGl0aW9uYWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg2KVxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuYWRkaXRpb25hbCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldGlyZW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0aXJlbWVudCwgLnJldC00MDEsIC5yZXQtaXJhLCAucmV0LXBlbiwgLnJldC1hbm51aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCwgY2MtdG8tYmUtdmFsaWRhdGUtYW5udWl0eSwgY2MtdG8tYmUtdmFsaWRhdGUtcGVuLCBjYy10by1iZS12YWxpZGF0ZS1pcmEsIGNjLXRvLWJlLXZhbGlkYXRlLTQwMSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9Y29faGF2ZV80MDFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LTQwMScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLTQwMSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldC00MDEnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS00MDEnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWNvX2hhdmVfaXJhXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldC1pcmEnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1pcmEnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0LWlyYScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWlyYSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9Y29faGF2ZV9wZW5dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LXBlbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXBlbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXQtcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcGVuJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1jb19oYXZlX2FubnVpdHldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LWFubnVpdHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hbm51aXR5J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldC1hbm51aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYW5udWl0eSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc3NuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc3NuJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU3XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jaGlsZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuY2hpbGQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lOF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZGl2aWRlbmQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmRpdmlkZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVudGFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWRkIG5ldyBwcm9wZXJ0eSBpZiB0aGUgcHJvcGVydHkgY291bnQgaXMgMFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVSZW50KF9hcHBHbG9iYWwucmVudHNBcnJheVtfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICB9KVxuXG4gICAgfTsvLy8vIGNvSW5jb21lUmVhZHlcbn0pKCk7XG4iLCIvKipcbiAqIEdsb2JhbCB2YXJpYWJsZXMgZm9yIHRoaXMgcGFnZVxuICogdmFyIF9hcHBHbG9iYWwuYXNzZXRUZW1wbGF0ZSwgX2FwcEdsb2JhbC5hc3NldEluZGV4LCBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlciwgX2FwcEdsb2JhbC5hc3NldHNBcnJheTtcbiAqIHZhciBfYXBwR2xvYmFsLmVzdGF0ZVRlbXBsYXRlLCBfYXBwR2xvYmFsLmVzdGF0ZUluZGV4LCBfYXBwR2xvYmFsLmVzdGF0ZXNIb2xkZXIsIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5O1xuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgJChkb2N1bWVudCkucmVhZHkoYXNzZXRzUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gYXNzZXRzUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2Fzc2V0c0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0VGVtcGxhdGUgPSAkKCcjYXNzZXRUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVUZW1wbGF0ZSA9ICQoJyNlc3RhdGVUbXBsdCcpLnRleHQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYXNzZXRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSBhc3NldCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0SW5kZXggPSAwO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZUluZGV4ID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYXNzZXRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgYXNzZXQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIgPSAkKCcjYXNzZXRzSG9sZGVyJyk7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0hvbGRlciA9ICQoJyNlc3RhdGVIb2xkZXInKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYXNzZXRzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCBhc3NldCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyBhc3NldHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IGFzc2V0IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgYXNzZXQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlYXNzZXRzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0FycmF5ID0gW107XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBhc3NldFxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1hc19iYW5rXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ2FzX2JhbmsnKVsxXSwgMTApO1xuXG5cbiAgICAgICAgICAgIF9hcHBHbG9iYWwuYXNzZXRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0FycmF5LnB1c2goX2FwcEdsb2JhbC5hc3NldEluZGV4KTtcblxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHJlbW92ZUFzc2V0KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICQoJyNhZGRBbm90aGVyQXNzZXQnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGFkZEFzc2V0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJyNhZGRBbm90aGVyRXN0YXRlJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBhZGRFc3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1hc19hc3NldHNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZWxheSBhZGRpbmcgZm9yIHNtb290aCBzbGlkIGRvd24gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBhZGRBc3NldCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFzc2V0cycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWRUb1JlbW92ZSA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhc3NldF8nICsgaWRUb1JlbW92ZSkuc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hc3NldHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1hc19hZGRpdGlvbmFscmVhbGVzdGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBEZWxheSBhZGRpbmcgZm9yIHNtb290aCBzbGlkIGRvd24gYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBhZGRFc3RhdGUoKTtcbiAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkVG9SZW1vdmUgPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2VzdGF0ZV8nICsgaWRUb1JlbW92ZSkuc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuXG5cbiAgICBmdW5jdGlvbiBhZGRBc3NldCgpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0SW5kZXgrKztcbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNBcnJheS5wdXNoKF9hcHBHbG9iYWwuYXNzZXRJbmRleCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IF9hcHBHbG9iYWwuYXNzZXRUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIF9hcHBHbG9iYWwuYXNzZXRJbmRleCk7XG5cbiAgICAgICAgdmFyIGlkID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGg7XG4gICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgICAgICB2YXIgYXNzZXQgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBhc3NldC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlQXNzZXQoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAgICAgKi9cblxuICAgICAgICBhc3NldC5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgZHJvcGRvd25MYWJlbChhc3NldCk7XG5cblxuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlci5hcHBlbmQoYXNzZXQpO1xuXG4gICAgICAgIGFzc2V0LnNsaWRlRG93bigpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbiAgICB9Ly8vLyBmdW4uIGFkZFJlbnRcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUFzc2V0KHJlbW92ZUluZGV4KXtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheS5pbmRleE9mKHJlbW92ZUluZGV4KTtcblxuICAgICAgICAkKCcjYXNzZXRfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVBc3NldHNGaWVsZHMoKTtcblxuICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVBc3NldFxuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUFzc2V0c0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRBc3NldCBhbmQgcmVtb3ZlQXNzZXRcbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUFzc2V0c0ZpZWxkcygpe1xuICAgICAgICB2YXIgbGltaXQgPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aDtcbiAgICAgICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICAgICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5W3hdO1xuXG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjYXNzZXRfJytpbmRleCk7XG5cbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gbmFtZS5yZXBsYWNlKC9cXGR7MSwyfS9nLCB4KzEpO1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgICAgICBsYWJlbC5hdHRyKCdmb3InLCBuZXdOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vLyBmb3IgeFxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlQXNzZXRzRmllbGRzXG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiBbdXBkYXRlQXNzZXRzQ2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgYXNzZXRdXG4gICAgLy8gICogaXQgd2lsbCBiZSBjYWxsZWQgZnJvbSBhZGRBc3NldCBhbmQgcmVtb3ZlQXNzZXRcbiAgICAvLyAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVBc3NldENsb3NlQnRuKCl7XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjYXNzZXRfJytpbmRleCk7XG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfS8vLy8gZnVuLiB1cGRhdGVBc3NldENsb3NlQnRuXG5cblxuICAgIGZ1bmN0aW9uIGFkZEVzdGF0ZSgpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVJbmRleCsrO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5wdXNoKF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBfYXBwR2xvYmFsLmVzdGF0ZVRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgX2FwcEdsb2JhbC5lc3RhdGVJbmRleCk7XG5cbiAgICAgICAgdmFyIGlkID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAgICAgdmFyIGVzdGF0ZSA9ICQodGVtcGxhdGUpO1xuXG4gICAgICAgIGVzdGF0ZS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlRXN0YXRlKGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgICAgICovXG5cbiAgICAgICAgZXN0YXRlLmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZXNIb2xkZXIuYXBwZW5kKGVzdGF0ZSk7XG5cbiAgICAgICAgZHJvcGRvd25MYWJlbChlc3RhdGUpO1xuICAgICAgICB5ZXNOb1JhZGlvKGVzdGF0ZSk7XG4gICAgICAgIGZpbGxTdGF0ZURyb3Bkb3duKGVzdGF0ZSk7XG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgsIHRydWUpOyAvLy8gdHJ1ZSBpcyB0byBmb3JjZSB0aGUgbGFiZWwgdG8gc3RhcnQgZnJvbSAxLCBkZWZhdWx0IDEgd2lsbCBiZSBpZ25vcmVkXG4gICAgICAgIGJpbmRFc3RhdGVNb3J0Z2FnZShfYXBwR2xvYmFsLmVzdGF0ZUluZGV4KTtcblxuICAgICAgICBlc3RhdGUuc2xpZGVEb3duKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICAgICAgdXBkYXRlRXN0YXRlQ2xvc2VCdG4oKTtcbiAgICB9Ly8vLyBmdW4uIGFkZFJlbnRcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUVzdGF0ZShyZW1vdmVJbmRleCl7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNlc3RhdGVfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAgICAgdXBkYXRlRXN0YXRlc0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVBc3NldFxuXG4gICAgLyoqXG4gICAgICogW3VwZGF0ZUVzdGF0ZXNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgRXN0YXRlIG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICAgICAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZEVzdGF0ZSBhbmQgcmVtb3ZlRXN0YXRlXG4gICAgICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4gICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVFc3RhdGVzRmllbGRzKCl7XG4gICAgICAgIHZhciBsaW1pdCA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICAgICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheVt4XTtcblxuICAgICAgICAgICAgdmFyIGVzdGF0ZURpdiA9ICQoJyNlc3RhdGVfJytpbmRleCk7XG5cbiAgICAgICAgICAgIGVzdGF0ZURpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7bmFtZTpuZXdOYW1lLCBpZDpuZXdOYW1lfSk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfS8vLy8gZm9yIHhcbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZWVzdGF0ZXNGaWVsZHNcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVFc3RhdGVzQ2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgRXN0YXRlXVxuICAgICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkRXN0YXRlIGFuZCByZW1vdmVFc3RhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVFc3RhdGVDbG9zZUJ0bigpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgZXN0YXRlRGl2ID0gJCgnI2VzdGF0ZV8nK2luZGV4KTtcbiAgICAgICAgICAgIGVzdGF0ZURpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBlc3RhdGVEaXYgPSAkKCcjZXN0YXRlXycraW5kZXgpO1xuICAgICAgICAgICAgZXN0YXRlRGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgICAgICAkKCcjYWRkQW5vdGhlckVzdGF0ZScpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJFc3RhdGUnKS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlRXN0YXRlQ2xvc2VCdG5cblxuICAgIGZ1bmN0aW9uIGJpbmRFc3RhdGVNb3J0Z2FnZShpbmRleCl7XG4gICAgICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICAgIHZhciBteVZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhteUluZGV4LCBteVZhbClcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgbXlWYWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmdW4uIGJpbmRFc2F0ZU1vcnRnYWdlXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkobGlhYmlsaXRpZXNSZWFkeSk7XG4gICAgdmFyIGxpYWJpbGl0eVRlbXBsYXRlLCBsaWFiaWxpdHlJbmRleCwgbGlhYmlsaXRpZXNIb2xkZXIsIGxpYWJpbGl0aWVzQXJyYXk7XG5cbiAgICBmdW5jdGlvbiBsaWFiaWxpdGllc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNsaWFiaWxpdGllc0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdHlUZW1wbGF0ZSA9ICQoJyNsaWFiaWxpdHlUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdHlJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSBhc3NldCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdHlJbmRleCA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdGllc0hvbGRlciB0aGUgZGl2IHdoZXJlIGFzc2V0IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyID0gJCgnI2xpYWJpbGl0aWVzSG9sZGVyJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtsaWFiaWxpdGllc0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggYXNzZXQgcHJvcGVydHkgaW5kZXhcbiAgICAgICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgYXNzZXRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCBhc3NldCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIGFzc2V0IGhhcyBpbmRleCBvZiA2XG4gICAgICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5ID0gW107XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgYXNzZXRcbiAgICAgICAgICovXG4gICAgICAgIGxpYWJpbGl0aWVzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49bGlfY3JlZGl0b3JdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnbGlfY3JlZGl0b3InKVsxXSwgMTApO1xuXG5cbiAgICAgICAgICAgIGxpYWJpbGl0eUluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG5cbiAgICAgICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICByZW1vdmVMaWFiaWxpdHkoaSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpYWJpbGl0aWVzQXJyYXkpXG4gICAgICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aGF2ZV9saWFiaWxpdGllc10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5saWFiaWxpdHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1saWFiJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgICAgICBhZGRMaWFiaWxpdHkoKTtcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmxpYWJpbGl0eScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpYWInXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpID0gbGlhYmlsaXRpZXNBcnJheS5wb3AobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggLTEgKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xpYWJpbGl0eV8nK2xpKS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0vLy8vIHdpbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFkZExpYWJpbGl0eSgpO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICB9Oy8vLy8gbGlhYmlsaXRpZXNSZWFkeVxuXG5cblxuICAgIGZ1bmN0aW9uIGFkZExpYWJpbGl0eSgpe1xuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgICAgICBsaWFiaWxpdHlJbmRleCsrO1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5LnB1c2gobGlhYmlsaXR5SW5kZXgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBsaWFiaWxpdHlUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIGxpYWJpbGl0eUluZGV4KTtcblxuICAgICAgICB2YXIgaWQgPSBsaWFiaWxpdGllc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgICAgIHZhciBsaWFiaWxpdHkgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBsaWFiaWxpdHkuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZUxpYWJpbGl0eShpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGxpYWJpbGl0eS5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgeWVzTm9SYWRpbyhsaWFiaWxpdHkpO1xuICAgICAgICBkcm9wZG93bkxhYmVsKGxpYWJpbGl0eSk7XG5cblxuICAgICAgICBsaWFiaWxpdGllc0hvbGRlci5hcHBlbmQobGlhYmlsaXR5KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBsaWFiaWxpdHkuc2xpZGVEb3duKCk7XG4gICAgICAgIH0sIDIwMClcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVMaWFiaWxpdHkocmVtb3ZlSW5kZXgpe1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBsaWFiaWxpdGllc0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNsaWFiaWxpdHlfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVMaWFiaWxpdHlcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRMaWFiaWxpdHkgYW5kIHJlbW92ZUxpYWJpbGl0eVxuICAgICAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMoKXtcbiAgICAgICAgdmFyIGxpbWl0ID0gbGlhYmlsaXRpZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVt4XTtcblxuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcblxuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0vLy8vIGZvciB4XG4gICAgfS8vLy8gZnVuLiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkc1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogW3VwZGF0ZUFzc2V0c0Nsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIGFzc2V0XVxuICAgIC8vICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbiAgICAvLyAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpe1xuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBsaWFiaWxpdGllc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjbGlhYmlsaXR5XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJMaWFiaWxpdHknKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5Jykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0Q2xvc2VCdG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZGVjbGFyYXRpb25zUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZGVjbGFyYXRpb25zUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2RlY2xhcmF0aW9uc0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfb3duZXJzaGlwXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9b3Rfd29ya2luZ3dpdGhdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3llZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3llZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9jaXRpemVuXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ25vJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXNpZGVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXNpZGVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9icHJpbWFyeV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm93bmVyc2hpcCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vd25lcnNoaXAsIC5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBkZWNsYXJhdGlvbnNSZWFkeVxufSkoKTtcblxuXG5cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29EZWNsYXJhdGlvbnNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBjb0RlY2xhcmF0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0RlY2xhcmF0aW9uc0Zvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWRlX2NvX2NpdGl6ZW5dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAnbm8nKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFsaWVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFsaWVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfTsvLy8vIGNvRGVjbGFyYXRpb25zUmVhZHlcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZ292ZXJubWVudFJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGdvdmVybm1lbnRSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjZ292Rm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gZ292ZXJubWVudFJlYWR5XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGFja1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGFja1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNhY2tGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBhY2tSZWFkeVxufSkoKTtcblxuXG5cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZWRpc2Nsb3N1cmVSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBlZGlzY2xvc3VyZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNlZGlzY2xvc3VyZUZvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgfTsvLy8vIGVkaXNjbG9zdXJlUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGluc3RydWN0aW9uc1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGluc3RydWN0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNpbnN0cnVjdGlvbnNGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBpbnN0cnVjdGlvbnNSZWFkeVxufSkoKTtcblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGRlcG9zaXRSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBkZXBvc2l0UmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2RlcG9zaXRGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhvbGQgY3JlZGl0IGNhcmQgdHlwZSBhZnRlciBkZXRlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHZhciBjYXJkVHlwZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAkKCdpbnB1dC5jYXJkZXhwaXJhdGlvbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdENhcmREYXRlKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVkaXQgY2FyZCBmb3JtIGlzIG5vdCByZXF1aXJlZCBidXQgdXNlciBlbnRlciBhIHZhbHVlIGluIG9uZSBmaWxlZCB0aGUgZm9ybSBzaG91bGQgYmUgdmFsaWRhdGVkXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgY2NGaWxlZHMgPSAkKCcuY2MtZmllbGQuY2MtdG8tYmUtdmFsaWRhdGUgaW5wdXQnKS5vbigna2V5dXAgY2hhbmdlJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGluY2x1ZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNjRmlsZWRzLmVhY2goZnVuY3Rpb24obil7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA9IGluY2x1ZGUgfHwgJCh0aGlzKS52YWwoKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgIHJldHVybiAhaW5jbHVkZTsgLy8vLyBubyBuZWVkIHRvIGNvbnRpbnVlIC5lYWNoIGlmIGluY2x1ZGUgaXMgdHJ1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09IGluY2x1ZGUpe1xuICAgICAgICAgICAgICAgIC8vLy8gY2MgZGF0YSBzaG91bGQgYmUgdmFsaWRhdGVcbiAgICAgICAgICAgICAgICBteUZvcm0uZmluZCgnLmNjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vLy8gbm8gZmllbGQgaGFzIGRhdGEsIHJlbW92ZSB2YWxpZGF0aW9uXG4gICAgICAgICAgICAgICAgbXlGb3JtLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgICAgIHJlc2V0RmllbGRzKG15Rm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlY3QgY3JlZGl0IGNhcmQgdHlwZSBvbiBrZXl1cCBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXQjY2NfY2FyZG51bWJlcicpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBkZXRlY3RDYXJkVHlwZSh2YWwpO1xuXG4gICAgICAgICAgICBpZih2YWwubGVuZ3RoID4zKXtcbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSAhIXR5cGUgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZSAhPT0gY2FyZFR5cGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZFR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNjLWNhcmRzIGxpJykuY3NzKCdvcGFjaXR5JywgMC40KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jYy1jYXJkcyAuY2FyZC0nK2NhcmRUeXBlKS5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjYXJkVHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNjLWNhcmRzIGxpJykuY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cblxuICAgIH07Ly8vLyBkZXBvc2l0UmVhZHlcblxuICAgIC8qKlxuICAgICAqIFtkZXRlY3RDYXJkVHlwZSB3aWxsIHJldHVybiBjcmVkaXQgY2FyZCB0eXBlIGJhc2VkIG9uIFJlZ0V4IHRlc3RdXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBjb3BpZWQgZm9ybSBTYWNrT3ZlcmZsb3cuY29tIHBvc3RcbiAgICAgKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyNzY4L2hvdy1kby15b3UtZGV0ZWN0LWNyZWRpdC1jYXJkLXR5cGUtYmFzZWQtb24tbnVtYmVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGV0ZWN0Q2FyZFR5cGUobnVtYmVyKSB7XG4gICAgICAgIHZhciByZSA9IHtcbiAgICAgICAgICAgIHZpc2E6IC9eNFswLTldezEyfSg/OlswLTldezN9KT8kLyxcbiAgICAgICAgICAgIGVsZWN0cm9uOiAvXig0MDI2fDQxNzUwMHw0NDA1fDQ1MDh8NDg0NHw0OTEzfDQ5MTcpXFxkKyQvLFxuICAgICAgICAgICAgbWFlc3RybzogL14oNTAxOHw1MDIwfDUwMzh8NTYxMnw1ODkzfDYzMDR8Njc1OXw2NzYxfDY3NjJ8Njc2M3wwNjA0fDYzOTApXFxkKyQvLFxuICAgICAgICAgICAgZGFua29ydDogL14oNTAxOSlcXGQrJC8sXG4gICAgICAgICAgICBpbnRlcnBheW1lbnQ6IC9eKDYzNilcXGQrJC8sXG4gICAgICAgICAgICB1bmlvbnBheTogL14oNjJ8ODgpXFxkKyQvLFxuICAgICAgICAgICAgbWFzdGVyY2FyZDogL141WzEtNV1bMC05XXsxNH0kLyxcbiAgICAgICAgICAgIGFtZXg6IC9eM1s0N11bMC05XXsxM30kLyxcbiAgICAgICAgICAgIGRpbmVyczogL14zKD86MFswLTVdfFs2OF1bMC05XSlbMC05XXsxMX0kLyxcbiAgICAgICAgICAgIGRpc2NvdmVyOiAvXjYoPzowMTF8NVswLTldezJ9KVswLTldezEyfSQvLFxuICAgICAgICAgICAgamNiOiAvXig/OjIxMzF8MTgwMHwzNVxcZHszfSlcXGR7MTF9JC9cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlLmVsZWN0cm9uLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdFTEVDVFJPTic7XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFlc3Ryby50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnTUFFU1RSTyc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuZGFua29ydC50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnREFOS09SVCc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuaW50ZXJwYXltZW50LnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdJTlRFUlBBWU1FTlQnO1xuICAgICAgICB9IGVsc2UgaWYgKHJlLnVuaW9ucGF5LnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdVTklPTlBBWSc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUudmlzYS50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnVklTQSc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFzdGVyY2FyZC50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnTUFTVEVSQ0FSRCc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuYW1leC50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnQU1FWCc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuZGluZXJzLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdESU5FUlMnO1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRpc2NvdmVyLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdESVNDT1ZFUic7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuamNiLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdKQ0InO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
