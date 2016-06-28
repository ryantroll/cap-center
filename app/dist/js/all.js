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

  radios.each(function(){
    $(this).parent().find('span').prepend('<i class="circle glyphicon glyphicon-ok"></i>')
  })

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
                 * and add the  first assets fields only if no assets is added or pre-loaded in form
                 */

                if(_appGlobal.assetsArray.length < 1)
                setTimeout(function(){
                    addAsset();
                }, 300)
                includeFields({selector:'.assets', validationClass:'.cc-to-be-validate'}); //// function in main.js

            }
            else if(true === !!$(this).attr('checked') && val === 'no'){
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

        }).trigger('change');


        $('input[name=as_additionalrealestate]').on('change', function(){
            var val = $(this).val();
            if(true === !!$(this).attr('checked') && val === 'yes'){
                /**
                 * Delay adding for smooth slid down animation
                 * Add the first estate only if no estates is add or pre-loaded inside the form
                 */
                if(_appGlobal.estatesArray.length < 1)
                setTimeout(function(){
                    addEstate();
                }, 300)
                includeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js

            }
            if(true === !!$(this).attr('checked') && val === 'no'){
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

            updateLiabilityCloseBtn();
        });


        $('input[name=have_liabilities]').on('change', function(){
            var val = $(this).val().toLowerCase();

            if(true === !!$(this).attr('checked') && val === 'yes'){
                includeFields({selector:'.liability', validationClass:'.cc-to-be-validate-liab'}); //// function in main.js
                if(liabilitiesArray.length < 1) addLiability();
            }//// if
            if(true === !!$(this).attr('checked') && val === 'no'){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwic3VwcG9ydC1wbHVnaW4uanMiLCJtYWluLmpzIiwiMDEtYm9ycm93ZXIuanMiLCIwMi1jb2JvcnJvd2VyLmpzIiwiMDMtcHVyY2hhc2UuanMiLCIwNC1yZWZpbmFuY2UuanMiLCIwNS1pbmNvbWUuanMiLCIwNi1jby1pbmNvbWUuanMiLCIwNy1hc3NldHMuanMiLCIwOC1saWFiaWxpdGllcy5qcyIsIjA5LWRlY2xhcmF0aW9ucy5qcyIsIjEwLWNvLWRlY2xhcmF0aW9ucy5qcyIsIjExLWdvdmVybm1lbnQuanMiLCIxMi1hY2tub3dsZWRnZW10bi5qcyIsIjEzLWVkaXNjbG9zdXJlLmpzIiwiMTQtaW5zdHJ1Y3Rpb25zLmpzIiwiMTUtZGVwb3NpdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdmVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2g1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbFlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcG9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDclhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbmJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzU3RhdGVzID0gW1xuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYWJhbWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQWxhc2thXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFyaXpvbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQXJrYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb2xvcmFkb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ09cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ1RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEZWxhd2FyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiREVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRENcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZNXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmxvcmlkYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRkxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkd1YW1cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkdVXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSGF3YWlpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJISVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklkYWhvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklsbGlub2lzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkluZGlhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklOXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW93YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJLYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktTXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2VudHVja3lcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJMQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1haW5lXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFyeWxhbmRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1EXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaWNoaWdhblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1OXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1TXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc291cmlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1PXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTW9udGFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZWJyYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXZhZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5WXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOSlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5NXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IFlvcmtcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5ZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5DXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJORFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPaGlvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9rbGFob21hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9yZWdvblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT1JcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQYWxhdVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUFdcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJSSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJTQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlROXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGV4YXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlRYXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVXRhaFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWZXJtb250XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1ZcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXaXNjb25zaW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV3lvbWluZ1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1lcIlxuICAgICAgfVxuICBdOyIsIihmdW5jdGlvbiggJCApIHtcbiAgICAkLmZuLnZhbGlkYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbHRlcignZm9ybScpO1xuICAgICAgICB2YXIgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgIGZvcm0ub2ZmKCdzdWJtaXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaXNGb3JtVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3JtLmZpbmQoJy5jYy1maWVsZC5jYy12YWxpZGF0ZScpLmVhY2goZnVuY3Rpb24obil7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHNlbGYudmFsaWRhdGVGaWVsZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy8vIGZhbHNlIGFuZCB0cnVlIHN0cmljdGx5IHRlc3QgYXMgbnVsbCB3aWxsIHJldHVybmVkIGlzIGZpZWxkIGlzIG5vdCB2YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICBpZihmYWxzZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gc2VsZi5maW5kKCdsYWJlbCcpLmVxKDApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmRXJyID0ge2ZpbGVkOmxhYmVsLnRleHQoKSwgaWQ6ZmllbGQuYXR0cignaWQnKSwgZXJyb3I6ZXJyfTtcbiAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpZWxkcy5wdXNoKGZFcnIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8vLyAuZWFjaFxuXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogY2FwdHVyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gcmV0dXJuIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBleHRyYSA9IHRydWU7XG4gICAgICAgICAgICBpZignZnVuY3Rpb24nID09PSB0eXBlb2YgY2FsbGJhY2spe1xuICAgICAgICAgICAgICAgIGV4dHJhID0gY2FsbGJhY2soaXNGb3JtVmFsaWQsIGludmFsaWRGaWVsZHMubGVuZ3RoID4gMCA/IGludmFsaWRGaWVsZHMgOiBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgISFleHRyYTtcblxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc0Zvcm1WYWxpZCl7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pOy8vLy8gLm9uIHN1Ym1pdFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgdmFyIGdldE15Q29udGFpbmVyID0gZnVuY3Rpb24oZmllbGQpe1xuICAgICAgICB2YXIgcCA9IGZpZWxkLnBhcmVudCgpO1xuICAgICAgICBpZih0cnVlID09PSBwLmhhc0NsYXNzKCdjYy1maWVsZCcpKXtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TXlDb250YWluZXIocCk7XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmdW4uIGdldE15Q29udGFpbmVyXG5cblxuICAgIHZhciBmaWVsZENoYW5nZWRBZnRlckVycm9yID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcigkKHRoaXMpKTtcbiAgICAgICAgY29udGFpbmVyLnZhbGlkYXRlRmllbGQoKVxuICAgIH1cblxuICAgICQuZm4udmFsaWRhdGVGaWVsZCA9IGZ1bmN0aW9uKHNlbGYpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBmID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCBpbnB1dFt0eXBlPVwidGVsXCJdLCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sIGlucHV0W3R5cGU9XCJkYXRlXCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICB2YXIgdiA9ICQudHJpbShmLnZhbCgpKTtcbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgaWYoIWVycikgZXJyID0ge307XG5cbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgaXNWYWxpZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1yZXF1aXJlZCcpKXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8vLyBoYW5kbGUgcmFkaW8gYnV0dG9uIGNhc2VcbiAgICAgICAgICAgIGlmKHR5cGUgJiYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykgKXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGYuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciByYWRpb3MgPSBzZWxmLmZpbmQoXCJpbnB1dFtuYW1lPVwiK25hbWUrXCJdXCIpO1xuICAgICAgICAgICAgICAgIHJhZGlvcy5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gISFyYWRpb3MuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmID0gcmFkaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlICYmIHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jyl7XG4gICAgICAgICAgICAgICAgaWYoZi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZi5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhZi5lcShyKS5hdHRyKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9Ly8vLyBpZiBMZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaWYodi5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHR5cGUgcmFkaW8gZWxzZVxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXJlcXVpcmVkJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8vIGlmIHYubGVuZ3RoXG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGNjLXJlcXVpcmVkXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtbnVtYmVyJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKFxcZCkrKFxcLlxcZCspPyQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLW51bWJlcicpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1udW1iZXInXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1lbWFpbCcpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1lbWFpbCcpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1lbWFpbCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlJykpe1xuXG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC87XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBtID0gc3BsaXRbMF0gPyBOdW1iZXIoc3BsaXRbMF0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHNwbGl0WzFdID8gTnVtYmVyKHNwbGl0WzFdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBzcGxpdFsyXSA/IE51bWJlcihzcGxpdFsyXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBtMzEgPSBbMSwgMywgNSwgNywgOCwgMTAsIDEyXTtcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighbSB8fCBtID4gMTIgfHwgbSA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0zMS5pbmRleE9mKG0pID49MCApe1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzEgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobSA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0geSAlIDQgPT0gMCA/IDI5IDogMjg7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiBfZCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWRhdGUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaGFzQ2xhc3MgY2MtZGF0ZVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAvLyB9XG5cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlIGNjLWRhdGUtZ3QnKSl7XG4gICAgICAgICAgICB2YXIgZ3RGaWVsZCA9ICQoJyMnK3NlbGYuYXR0cignZGF0YS1kYXRlLWd0JykpO1xuICAgICAgICAgICAgdmFyIGd0VmFsLCBzdGFydERhdGUsIGVuZERhdGU7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihndEZpZWxkLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlmKGd0RmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSBndEZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZW5kRGF0ZSA8IHN0YXJ0RGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBndEZpZWxkLmxlbmd0aCA+IDBcblxuICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUtZ3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlLWd0J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZS1ndCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBoYXNDbGFzcyBjYy1kYXRlLWd0XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtY2FyZC1leHBpcmF0aW9uJykpe1xuXG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezJ9XFwvXFxkezR9JC87XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBtID0gc3BsaXRbMF0gPyBOdW1iZXIoc3BsaXRbMF0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IDE7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBzcGxpdFsxXSA/IE51bWJlcihzcGxpdFsxXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbnVsbFxuXG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKHksIG0tMSwgZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoIW0gfHwgbSA+IDEyIHx8IG0gPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKG51bGwgIT09IGRhdGUgJiYgZGF0ZSA8PSBub3cgKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1jYXJkLWV4cGlyYXRpb24nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWNhcmQtZXhwaXJhdGlvbiddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWNhcmQtZXhwaXJhdGlvbiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jYXJkLWV4cGlyYXRpb24nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXBob25lJykpe1xuICAgICAgICAgICAgaWYodi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcKFxcZHszfVxcKSggKT9cXGR7M31cXC1cXGR7NH0kLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1waG9uZScpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXBob25lJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXBob25lJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXBob25lJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1jdXJyZW5jeScpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFwkPyhcXGR7MSwzfSkrKFxcLCpcXGR7M30pKiQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWN1cnJlbmN5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtY3VycmVuY3knXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWN1cnJlbmN5J107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1zc24nKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHszfShcXC0pP1xcZHsyfShcXC0pP1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXNzbicpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXNzbiddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2Mtc3NuJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1yZXF1aXJlZC1vbmUtb2YnKSl7XG4gICAgICAgICAgICB2YXIgZmllbGRzID0gJCgnLicrc2VsZi5hdHRyKCdkYXRhLW9uZS1vZi1jbGFzcycpICsgJyBpbnB1dCcpO1xuXG4gICAgICAgICAgICB2YXIgX2lzVmFsaWQgPSBmYWxzZTsgLy8vLyBsb2NhbCBpc1ZhbGlkIHZhciB3aWxsIGJlICYmIHdpdGggaXNWYWxpZFxuICAgICAgICAgICAgZmllbGRzLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICAgICAgX2lzVmFsaWQgPSBfaXNWYWxpZCB8fCAhISQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gX2lzVmFsaWQpIHJldHVybiBmYWxzZTsvLy8vIHN0b3AgZWFjaCBpZiBvbmUgZmlsZWQgaXMgZm91bmRcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiBfaXNWYWxpZDtcblxuICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXJlcXVpcmVkLW9uZS1vZicpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXJlcXVpcmVkLW9uZS1vZiddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXJlcXVpcmVkLW9uZS1vZiddO1xuXG4gICAgICAgICAgICAgICAgZmllbGRzLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIHZhciBfZXJyID0gJCh0aGlzKS5kYXRhKCdlcnInKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGVsZXRlIF9lcnJbJ2NjLXJlcXVpcmVkLW9uZS1vZiddO1xuICAgICAgICAgICAgICAgICAgICAvLyAkKHRoaXMpLmRhdGEoJ2VycicsIF9lcnIpO1xuXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLXJlcXVpcmVkLW9uZS1vZicpLmhpZGVFcnJvcigpLnNob3dFcnJvcigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBoYXNDbGFzcyBjYy1yZXF1aXJlZC1vbmUtb2ZcblxuICAgICAgICAvLy8vIHJlc2V0IHRoZSBmaWVsZCBlcnJvcnMgYmVmb3JlIGFkZGluZyB0aGVtIGFnYWluXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2Vycm9yIGNvcnJlY3QgbWVzc2FnZScpLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuXG4gICAgICAgIGYuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgZi5kYXRhKCdpc1ZhbGlkJywgaXNWYWxpZCk7XG5cbiAgICAgICAgLy8vLyBpZiBmaWVsZCBwYXNzZWQgdGhyb3VnaCB2YWxpZGF0aW9uIHNob3cgZXJyb3IgaWYgYW55XG4gICAgICAgIC8vIGlmKHRydWUgPT09IGlzVmFsaWRhdGVkICl7XG4gICAgICAgIC8vIGlmKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID4gMCl7XG5cbiAgICAgICAgICAgIGlmKGZhbHNlID09IGlzVmFsaWQgfHwgT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgICAgIGYuc2hvd0Vycm9yKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRydWUgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIGYuaGlkZUVycm9yKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAvLyB9Ly8vLyBpZiBpc1ZhbGlkYXRlZFxuXG4gICAgfS8vLy8gZnVuLiB2YWxpZGF0ZUZpbGRcblxuICAgICQuZm4uc2hvd0Vycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKGYpO1xuICAgICAgICB2YXIgdHlwZSA9IGYuYXR0cigndHlwZScpO1xuXG4gICAgICAgIHZhciBlcnIgPSBmLmRhdGEoJ2VycicpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IGYuZGF0YSgnaXNWYWxpZCcpO1xuXG4gICAgICAgIHZhciBzdHIgPSBbXTtcbiAgICAgICAgZm9yKHZhciBlIGluIGVycil7XG4gICAgICAgICAgICBzdHIucHVzaChlcnJbZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdlcnJvcicpLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuXG4gICAgICAgIGYub2ZmKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKTtcblxuICAgICAgICBpZih0cnVlICE9PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIGYub2ZmKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKS5vbigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcilcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYoc3RyLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIHZhciBtc2cgPSAkKCc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiIGlkPVwiZXJyb3JNc2dcIj48aSBjbGFzcz1cImljb24tZXJyb3IgZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUtc2lnblwiPjwvaT4gJyArIHN0ci5qb2luKCcgfCAnKSArICc8L2Rpdj4nKS5zaG93KCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKG1zZyk7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ21lc3NhZ2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0vLy8vIGZ1bi4gc2hvd0Vycm9yXG5cbiAgICAkLmZuLmhpZGVFcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBmID0gdGhpcy5maWx0ZXIoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykuZXEoMCk7XG5cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKGYpO1xuXG4gICAgICAgIC8vIGNvbnRhaW5lci5hZGRDbGFzcygnY29ycmVjdCcpO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2Vycm9yIG1lc3NhZ2UnKTtcblxuICAgICAgICBjb250YWluZXIuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgJC5mbi5hZGRFcnJvciA9IGZ1bmN0aW9uKGVycm9yQ2xhc3MpIHtcbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5maWx0ZXIoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG4gICAgICAgIGlmKGZpZWxkLmxlbmd0aCA8IDEpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZmllbGQpO1xuXG4gICAgICAgIHZhciBtc2cgPSBjb250YWluZXIuZmluZCgnLm1lc3NhZ2UuJytlcnJvckNsYXNzKS5lcSgwKS50ZXh0KCk7XG4gICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgaWYoIWVycikgZXJyID0ge307XG5cbiAgICAgICAgZXJyW2Vycm9yQ2xhc3NdID0gbXNnO1xuXG4gICAgICAgIGZpZWxkLmRhdGEoJ2VycicsIGVycik7XG4gICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgICQuZm4ucmVtb3ZlRXJyb3IgPSBmdW5jdGlvbihlcnJvckNsYXNzKSB7XG5cbiAgICAgICAgdmFyIGZpZWxkID0gdGhpcy5maWx0ZXIoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG4gICAgICAgIGlmKGZpZWxkLmxlbmd0aCA8IDEpIHJldHVybiB0aGlzO1xuICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgIGlmKCFlcnIpIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGRlbGV0ZSBlcnJbZXJyb3JDbGFzc107XG4gICAgICAgIGZpZWxkLmRhdGEoJ2VycicsIGVycik7XG4gICAgICAgIGlmKE9iamVjdC5rZXlzKGVycikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmaWVsZC5kYXRhKCdpc1ZhbGlkJywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmaWVsZC5kYXRhKCdpc1ZhbGlkJywgdHJ1ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxufSggalF1ZXJ5ICkpOyIsIihmdW5jdGlvbiggJCApIHtcbiAgICB2YXIgcGFubGUsIHBvcHVwLCBidG4sIHF1ZXN0aW9ucywgYWN0aXZlUXVlc3Rpb24sIGZpZWxkcztcbiAgICB2YXIgaGVsbG9NZXNzYWdlO1xuXG4gICAgJC5mbi5jY1N1cHBvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLmZpbmQoJy5jYy1zdXBwb3J0Jyk7XG5cblxuICAgICAgICBpZihzZWxmLmxlbmd0aCA8IDEpIHJldHVybjtcblxuICAgICAgICBwYW5lbCA9IHNlbGYuZmluZCgnLmNjLXN1cHBvcnQtcGFuZWwnKS5lcSgwKTtcbiAgICAgICAgcG9wdXAgPSBzZWxmLmZpbmQoJy5jYy1zdXBwb3J0LXBvcHVwJykuZXEoMCk7XG4gICAgICAgIGJ0biA9IHNlbGYuZmluZCgnLmJ0bicpLmVxKDApO1xuICAgICAgICBxdWVzdGlvbnMgPSBwYW5lbC5maW5kKCcuY2Mtc3VwcG9ydC1xdWVzdGlvbnMgbGknKTtcbiAgICAgICAgYWN0aXZlUXVlc3Rpb24gPSBudWxsO1xuXG4gICAgICAgIGZpZWxkcyA9IHt9O1xuXG4gICAgICAgIGhlbGxvTWVzc2FnZSA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuaGVsbG8nKS50ZXh0KCk7XG5cbiAgICAgICAgcXVlc3Rpb25zLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISFpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHtpbmRleDp4LCBxOiQodGhpcykuZmluZCgnYScpLmVxKDApLnRleHQoKX07XG4gICAgICAgICAgICAgICAgZmllbGRzW2lkXSA9IG9iajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIHZhciB0b2dnbGVQYW5lbCA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHBhbmVsLmhhc0NsYXNzKCdleHBhbmRlZCcpKXtcbiAgICAgICAgICAgICAgICBwYW5lbC5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgICAgIHF1ZXN0aW9ucy5maWx0ZXIoJy5leHBhbmRlZCcpLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCdpJykuYWRkQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1yaWdodCcpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtYm90dG9tJyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGJ0bi5yZW1vdmVDbGFzcygnb3V0JylcbiAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICB9Ly8vLyBpZiBoYXNDYWxzc1xuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBidG4uYWRkQ2xhc3MoJ291dCcpO1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGhpZGUgdGhlIHBvcHVwIGlmIGl0cyB2aXNpYmxlXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYocG9wdXAuaGFzQ2xhc3MoJ3Zpc2libGUnKSl7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIEV4cGFuZCBxdWVzdGlvbiB3aGVuIHBhbmVsIGlzIG9wZW5lZCBpZiB0aGUgYWN0aXZlUXVzdGlvbiBpc1xuICAgICAgICAgICAgICAgICAgICAgKiBiZWVuIHNldCB3aXRoIGZpZWxkIGZvY3VzIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBpZihudWxsICE9PSBhY3RpdmVRdWVzdGlvbil7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbnMuZXEoYWN0aXZlUXVlc3Rpb24pLmZpbmQoJ2EnKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlUXVlc3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIH0sIDMwMCk7IC8vLyBzZXRUaW1lb3V0XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIH0vLy8gaWYgaGFzQ2xhc3MgZWxzZVxuICAgICAgICB9Ly8vLyBmdW4uIHRvZ2dsZVBhbmVsXG5cbiAgICAgICAgdmFyIHRvZ2dsZVF1ZXN0aW9uID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KCk7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcmVudC5maW5kKCdpJyk7XG5cbiAgICAgICAgICAgIGlmKHBhcmVudC5oYXNDbGFzcygnZXhwYW5kZWQnKSl7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIGkuYWRkQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1yaWdodCcpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVlc3Rpb25zLmZpbHRlcignLmV4cGFuZGVkJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgICAgICAuZmluZCgnaScpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtcmlnaHQnKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLWJvdHRvbScpO1xuXG4gICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICBpLmFkZENsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtYm90dG9tJykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1yaWdodCcpO1xuXG4gICAgICAgIH0vLy8vIGZ1bi4gdG9nZ2xlUXVlc3Rpb25cblxuICAgICAgICAvKipcbiAgICAgICAgICogRm9jdXMgRXZlbnQgaGFuZGxlciBmb3IgZmllbGRzIHRvIHNob3cgaGVscGVyIG1lc3NhZ2VcbiAgICAgICAgICovXG4gICAgICAgIHZhciBzaG93UG9wdXAgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignaWQnKTtcblxuICAgICAgICAgICAgaWYoaWQgaW4gZmllbGRzKXtcbiAgICAgICAgICAgICAgICBwb3B1cC5hZGRDbGFzcygndmlzaWJsZScpLnRleHQoZmllbGRzW2lkXS5xKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVRdWVzdGlvbiA9IGZpZWxkc1tpZF0uaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGZ1bi5zaG93UG9wdXBcblxuICAgICAgICB2YXIgaGlkZVBvcHVwID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpLnRleHQoJycpO1xuICAgICAgICB9Ly8vLyBmdW4uc2hvd1BvcHVwXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGFuZWwgY2xvc2UgYnV0dG9uXG4gICAgICAgICAqL1xuICAgICAgICBwYW5lbC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgdG9nZ2xlUGFuZWwpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiA/IGJ1dHRvbiBiZWhhdmlvclxuICAgICAgICAgKi9cbiAgICAgICAgYnRuLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKVxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISFoZWxsb01lc3NhZ2Upe1xuICAgICAgICAgICAgICAgICQodGhpcykuc2hvd1N1cHBvcnRNZXNzYWdlKGhlbGxvTWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBwb3B1cCBiZWhhdmlvclxuICAgICAgICAgKi9cbiAgICAgICAgcG9wdXAub24oJ2NsaWNrJywgdG9nZ2xlUGFuZWwpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbnNpZGUgcGFuZWwgcXVlc3Rpb24gY2xpY2sgYmVoYXZpb3JcbiAgICAgICAgICovXG4gICAgICAgIHBhbmVsLmZpbmQoJy5jYy1zdXBwb3J0LXF1ZXN0aW9ucyBsaSBhJykub24oJ2NsaWNrJywgdG9nZ2xlUXVlc3Rpb24pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgZm9jdXMgZXZlbnQgZm9yIGZpZWxkcyB0byBzaG93IHRoZSByaWdodCBxdWVzdGlvbiBhcyBwb3B1cFxuICAgICAgICAgKiBpZiB0aGVyZSBhIHF1ZXN0aW9uIHJlbGF0ZWQgdG8gdGhpcyBmaWVsZFxuICAgICAgICAgKi9cbiAgICAgICAgLy8gJCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5vbignYmx1cicsIGhpZGVQb3B1cCkub24oJ2ZvY3VzJywgc2hvd1BvcHVwKTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBidG4ucmVtb3ZlQ2xhc3MoJ291dCcpO1xuICAgICAgICB9LCAzKjEwMDApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07Ly8vLyAkLmZuIGZ1bmN0aW9uXG5cbiAgICAkLmZuLnNob3dTdXBwb3J0TWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYoZmFsc2UgPT09ICEhcG9wdXApIHJldHVybiB0aGlzO1xuXG4gICAgICAgIHZhciBpbnRlO1xuICAgICAgICB2YXIgYmVmb3JlSGlkZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGUpO1xuICAgICAgICAgICAgaW50ZSA9IHNldFRpbWVvdXQoaGlkZU1lc3NhZ2UsIDIwMCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhpZGVNZXNzYWdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBvcHVwLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0b3BIaWRlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBidG4ub2ZmKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpLm9uKCdtb3VzZW91dCcsIGJlZm9yZUhpZGUpO1xuICAgICAgICBwb3B1cC5vZmYoJ21vdXNlb3V0JywgYmVmb3JlSGlkZSkub24oJ21vdXNlb3V0JywgYmVmb3JlSGlkZSk7XG4gICAgICAgIHBvcHVwLm9mZignbW91c2VvdmVyJywgc3RvcEhpZGUpLm9uKCdtb3VzZW92ZXInLCBzdG9wSGlkZSk7XG5cbiAgICAgICAgcG9wdXAudGV4dChtZXNzYWdlKS5hZGRDbGFzcygndmlzaWJsZScpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn0oIGpRdWVyeSApKTsiLCIvKipcbiAqIFtfYXBwR2xvYmFsIE5hbWVzcGFjZSBmb3IgZ2xvYmFsIHZhcmlhYmxlc11cbiAqIHRoaXMgd2lsbCBkZWZpbmUgYSBwcm90ZWN0IG5hbWUgc3BhY2UgZm9yIGdsb2JhbCB2YXJpYWJsZSB0byBwcnZlbnQgYW55IGNvbmZsZWN0IHdpdGggbG9jYWwgdmFyaWFibGVzXG4gKi9cbnZhciBfYXBwR2xvYmFsID0ge307XG5fYXBwR2xvYmFsLnVybEVtYWlsRXhpc3RzQVBJID0gXCJhcGktcmVzcG9uc2UvaXMtZW1haWwtZXhpc3RzLmpzb25cIjtcbl9hcHBHbG9iYWwudXJsQXV0aGVudGljYXRpb25BUEkgPSBcImFwaS1yZXNwb25zZS9hdXRoZW50aWNhdGlvbi5qc29uXCI7XG5fYXBwR2xvYmFsLnVybEFwcGxpY2F0aW9uc0xpc3RBUEkgPSBcImFwaS1yZXNwb25zZS9hcHBsaWNhdGlvbnMtbGlzdC5qc29uXCI7XG5cbl9hcHBHbG9iYWwudXJsU2F2ZVRlbXBsYXRlID0gXCJ0ZW1wbGF0ZS1zYXZlLmh0bWxcIjtcbl9hcHBHbG9iYWwuc2F2ZU1vZGFsID0gbnVsbDtcblxuX2FwcEdsb2JhbC51cmxBcHNMaXN0VGVtcGFsdGUgPSBcInRlbXBsYXRlLWFwcGxpY2F0aW9ucy5odG1sXCJcbl9hcHBHbG9iYWwuYXBwc0xpc3RNb2RhbCA9IG51bGw7XG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoY2NEb2N1bWVudFJlYWR5KTtcblxuZnVuY3Rpb24gY2NEb2N1bWVudFJlYWR5KCl7XG4gICAgLyoqXG4gICAgICogUHJvZ3Jlc3MgbmF2aWdhdGlvbiBtb2JpbGUgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcjcHJvZ3Jlc3Nfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBwcm9ncmVzc05hdiA9ICQoJyNwcm9ncmVzc19uYXYnKTtcbiAgICAgICAgdmFyIGhhbmRsZVBvcmdyZXNOYXZDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gcHJvZ3Jlc3NOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKCcxMDAlJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlUG9yZ3Jlc05hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzTmF2LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYud2lkdGgoNDApOyAvLyBjaGFuZ2luZyB0aGUgd2lkdGggdG8gbWFrZSB0aGUgZmlyc3QgYnV0dG9uIG9mIHByb2dyZXNzIGJhciBjbGlja2FibGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0byBib2R5IHNvIGRvIHRoZSB3b3JrIG9uIGJvZHkgY2xpY2sgXFwgb25seSBpZiBtZW51IGlzIGNsb3NlZFxuICAgICAgICAgKiB0aGlzIHRvIG1ha2Ugc3VyZSB0aGUgbWVudSBpcyBjbG9zZWQgd2hlbiBjbGljayBvdXRzaWRlIHRoZSBtZW51XG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZmFsc2UgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEhhbWJ1cmdlciBtZW51IGJ1dHRvbiBtb2JpbGUgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcjbWVudV9zd2l0Y2gnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG1lbnVOYXYgPSAkKCcjbWVudV9uYXYnKTtcbiAgICAgICAgdmFyIGhhbmRsZU1lbnVOYXZDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAvLy8vIHVuYmluZCB3aGVuIG1lbnUgY2xvc2VkIG5vIG5lZWQgdG8gY2hlY2sgZm9yIGNsaWNrXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnVuYmluZCgnY2xpY2snLCBoYW5kbGVNZW51TmF2Q2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVudU5hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZhbHNlID09PSBtZW51TmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVNZW51TmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgc2Nyb2xsaW5nIGV2ZW50IGxpc3RlbmVyIHRvIG1ha2UgdGhlIHByb2dyZXNzIGJhciBzdGlja3lcbiAgICAgKi9cbiAgICAvLyBpZigkKCdib2R5Jykud2lkdGgoKSA8IDY3OCl7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcpLm9uKCdzY3JvbGwnLCBtYWluU2Nyb2xsKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgc3RhdGVzIGRyb3AtZG93bnNcbiAgICAgKi9cbiAgICAgZmlsbFN0YXRlRHJvcGRvd24oICQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cblxuICAgICAvKipcbiAgICAgICogU3RhcnQgU3VwcG9ydFxuICAgICAgKi9cbiAgICAgJChkb2N1bWVudCkuY2NTdXBwb3J0KCk7XG5cblxuICAgIC8qKlxuICAgICAqIEZsb2F0IGxhYmVsIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnLmNjLWZpZWxkLmZsb2F0JykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0nKS5lcSgwKTtcblxuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50ID0gJ2tleXVwJztcbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZHJvcGRvd24nKSl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQgPSAnY2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkLm9uKHRyaWdnZXJFdmVudCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihmaWVsZC52YWwoKSl7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZWRpdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pOy8vLyAuZWFjaFxuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5qc0NvbGxhcHNlJykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLmZpbmQoJ2EuY2xvc2UsIGEuZGlzbWlzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuc2xpZGVVcCgnZmFzdCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0pOy8vLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIFNldCB5ZXMvbm8gcmFkaW8gYnV0dG9uXG4gICAgICovXG4gICAgeWVzTm9SYWRpbygpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IG11bHRpIGNoZWNrYm94XG4gICAgICovXG4gICAgbXVsdGlDaGVja2JveCgpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IGFycm93IGxhYmVsIGJlaGF2aW9yIGZvciA8c2VsZWN0PlxuICAgICAqL1xuICAgIGRyb3Bkb3duTGFiZWwoKTtcblxuXG4gICAgLyoqXG4gICAgICogQmFjayBidXR0b24gY2xpY2sgaGFuZGxlcnNcbiAgICAgKi9cbiAgICAkKCcjYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIExvYXMgU2F2ZSBvciBsb2dpbiBleHRlcm5hbCBsYXRlciB0ZW1wbGF0ZVxuICAgICAqL1xuICAgICQoJy5zYXZlQnRuJykuaGlkZSgpOy8vLy8gaGlkZSB1bnRpbCB0ZW1wbGF0ZSBpcyBsb2FkZWRcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiBfYXBwR2xvYmFsLnVybFNhdmVUZW1wbGF0ZSxcbiAgICAgIG1ldGhvZDonR0VUJyxcbiAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgX2FwcEdsb2JhbC5zYXZlTW9kYWwgPSAkKHJldCk7XG5cbiAgICAgICAgaW5pdGlhbGl6ZVNhdmVNb2RhbCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTG9hZCBhcHBsaWNhdGlvbnMgbGlzdCB0ZW1wbGF0ZVxuICAgICAqL1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IF9hcHBHbG9iYWwudXJsQXBzTGlzdFRlbXBhbHRlLFxuICAgICAgbWV0aG9kOidHRVQnLFxuICAgICAgZXJyb3I6ZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0sXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXQpe1xuICAgICAgICBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwgPSAkKHJldCk7XG5cbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwpXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjbXlBcHBzQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgc2hvd0FwcGxpY2F0aW9uc0xpc3QoKTtcbiAgICB9KVxuXG59Ly8vLyBmdW4uIGNjRG9jdW1lbnRSZWFkeVxuXG5cbi8qKlxuICogW2luaXRpYWxpemVTYXZlTW9kYWwgd2lsbCBiZSBjYWxsZWQgdG8gaW5pdGlhbGl6ZSB0aGUgc2F2ZSBmb3IgbGF0ZXIgZm9ybSBhZnRlciBpdCBsb2FkZWQgZnJvbSBhamF4XVxuICogYW5kIHNldCB0aGUgY2xpY2sgZXZlbnQgZm9yICdTYXZlIGZvciBMYXRlcicgYnV0dG9uXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemVTYXZlTW9kYWwoKXtcbiAgaWYoZmFsc2UgPT09ICEhX2FwcEdsb2JhbC5zYXZlTW9kYWwpIHJldHVybjtcblxuICAkKCdib2R5JykuYXBwZW5kKF9hcHBHbG9iYWwuc2F2ZU1vZGFsKTtcblxuICB5ZXNOb1JhZGlvKF9hcHBHbG9iYWwuc2F2ZU1vZGFsKTtcblxuICB1cGRhdGVUYWJJbmRleChfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCcjbG9naW4nKSwgMTAwKVxuICB1cGRhdGVUYWJJbmRleChfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCcjcmVnaXN0ZXInKSwgMTIwKVxuXG4gIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJ2Zvcm0jbG9naW5Gb3JtJykudmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBfYXBwR2xvYmFsLnNhdmVNb2RhbC5maW5kKCdmb3JtI3JlZ2lzdGVyRnJvbScpLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG5cbiAgX2FwcEdsb2JhbC5zYXZlTW9kYWwuZmluZCgnaW5wdXQucGhvbmUnKVxuICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgX2FwcEdsb2JhbC5zYXZlTW9kYWwuZmluZCgnaW5wdXRbbmFtZT1zYXZlX2xvZ2luXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAnbG9naW4nKXtcbiAgICAgIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJyNsb2dpbicpLnNob3coKTtcbiAgICAgIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJyNyZWdpc3RlcicpLmhpZGUoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJyNsb2dpbicpLmhpZGUoKTtcbiAgICAgIF9hcHBHbG9iYWwuc2F2ZU1vZGFsLmZpbmQoJyNyZWdpc3RlcicpLnNob3coKTtcbiAgICB9XG4gICAgX2FwcEdsb2JhbC5vdmVybGF5LmFkanVzdCgpO1xuICB9KVxuXG4gICQoJy5zYXZlQnRuJykuc2hvdygpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgb3ZlcmxheSh7XG4gICAgICBzZWxlY3RvcjpcIiNzYXZlTW9kYWxcIlxuICAgIH0pOy8vLy9vdmVybGF5XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn0vLy8vIGZ1bi4gaW5pdGlhbGl6ZVNhdmVNb2RhbFxuXG4vKipcbiAqIFtzaG93QXBwbGljYXRpb25zTGlzdCBzaG93cyB1c2VyIHNhdmVkIGFwcGxpY2F0aW9uIG1vZGFsIHRoZSBtb2RhbCBpcyBsb2FkZWQgZnJvbSBleHRlcm5hbCB0ZW1wbGF0ZV1cbiAqL1xuZnVuY3Rpb24gc2hvd0FwcGxpY2F0aW9uc0xpc3QoKXtcbiAgICBvdmVybGF5KHtcbiAgICAgICAgc2VsZWN0b3I6JyNhcHBzTGlzdCcsXG4gICAgICAgIG9uQmVmb3JlTG9hZDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgbG9hZEFwcGxpY2F0aW9ucygpO1xuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUNsb3NlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcjYXBwc0hvbGRlcicpLmVtcHR5KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0vLy8vIGZ1bi4gc2hvd0FwcGxpY2F0aW9uc0xpc3RcblxuLyoqXG4gKiBbbG9hZEFwcGxpY2F0aW9ucyBsb2FkIHRoZSBsaXN0IG9mIHByZXZpb3VzbHkgc2F2ZWQgYXBwbGljYXRpb25zIGFuZCBkaXNwbGF5IHRoZW0gaW5zaWRlIGZvcm1dXG4gKiBUaGlzIGZ1bmN0aW9uIHVzZSBleHRyYSB0ZW1wbGF0ZSB0aGF0IGlzIHNhdmVkIGFzIDxzY3JpcHQ+IHRhZyBpbnNpZGUgdGhlIG1vZGFsIGV4dGVybmFsIEhUTUwgdG8gZGlzcGxheSB0aGUgYXBwbGljYXRpb25zIHJvd3NcbiAqIEByZXR1cm4ge1t0eXBlXX0gW25vbmVdXG4gKi9cbmZ1bmN0aW9uIGxvYWRBcHBsaWNhdGlvbnMoKXtcbiAgICBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwuYWRkQ2xhc3MoJ2J1c3knKTtcblxuICAgIHZhciB0ZW1wbGF0ZSA9IF9hcHBHbG9iYWwuYXBwc0xpc3RNb2RhbC5maW5kKCcjYXBwVGVtcGxhdGUnKS5lcSgwKS50ZXh0KCk7XG4gICAgdmFyIGFwcHNIb2xkZXIgPSBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwuZmluZCgnI2FwcHNIb2xkZXInKS5lcSgwKTtcblxuICAgIHZhciBkYXRhID0ge307XG4gICAgZGF0YS5lbWFpbCA9ICQudHJpbSggJCgnI2xvZ2luX2VtYWlsJykudmFsKCkgKTtcbiAgICBkYXRhLnVzZXJJZCA9ICcwMDAwMDAwJztcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDpfYXBwR2xvYmFsLnVybEFwcGxpY2F0aW9uc0xpc3RBUEksXG4gICAgICAgIGRhdGE6ZGF0YSxcbiAgICAgICAgbWV0aG9kOlwicG9zdFwiLFxuICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcbiAgICAgICAgZXJyb3I6ZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkocmV0KSl7XG4gICAgICAgICAgICAgICAgdmFyIHg7XG4gICAgICAgICAgICAgICAgZm9yKHg9MDsgeDxyZXQubGVuZ3RoOyB4Kyspe1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gcmV0W3hdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGVtcGxhdGU7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yKGxhYmVsIGluIG9iail7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCdcXHtcXCMnICsgbGFiZWwgKyAnXFx9JywgJ2cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IHJvdy5yZXBsYWNlKCByZWdleCAsIG9ialtsYWJlbF0pO1xuICAgICAgICAgICAgICAgICAgICB9IC8vLyBmb3JcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gJChyb3cpO1xuICAgICAgICAgICAgICAgICAgICByb3cuZmluZCgnYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwuZmluZCgnYS5jbG9zZScpLnRyaWdnZXIoJ2NsaWNrJylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgYXBwc0hvbGRlci5hcHBlbmQocm93KTtcbiAgICAgICAgICAgICAgICB9Ly8vIGZvclxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogV2FpdCBmb3Igc29tZSB0aW1lIGZvciBhY2N1cmF0ZSB3aWR0aCBhbmQgaGVpZ2h0IHJlYWRpbmdcbiAgICAgICAgICAgICAgICAgKiBAcGFyYW0gIHtbdHlwZV19ICl7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hcHBHbG9iYWwub3ZlcmxheS5hZGp1c3QoKTsgICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwucmVtb3ZlQ2xhc3MoJ2J1c3knKTsgICAgICAgICAgICAgICAgfSBbZGVzY3JpcHRpb25dXG4gICAgICAgICAgICAgICAgICogQHBhcmFtICB7W3R5cGVdfSAyMDAgW2Rlc2NyaXB0aW9uXVxuICAgICAgICAgICAgICAgICAqIEByZXR1cm4ge1t0eXBlXX0gICAgIFtkZXNjcmlwdGlvbl1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLm92ZXJsYXkuYWRqdXN0KCk7XG4gICAgICAgICAgICAgICAgICBfYXBwR2xvYmFsLmFwcHNMaXN0TW9kYWwucmVtb3ZlQ2xhc3MoJ2J1c3knKTtcbiAgICAgICAgICAgICAgICB9LCAyMDApXG5cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgfS8vLy8gc3VjY2Vzc1xuICAgIH0pO1xufS8vLy8gZnVuLiBsb2FkQXBwbGljYXRpb25zXG5cblxuLyoqXG4gKiBbbWFpblNjcm9sbCBXaW5kb3cgc2Nyb2xsIGV2ZW50IGhhbmxkZXIgdG8gbWFrZSBwcm9ncmVzcyBoZWFkZXIgc3RpY2t5IG9uIG1vYmlsZV1cbiAqL1xuZnVuY3Rpb24gbWFpblNjcm9sbChlKXtcbiAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGlmKCQoJ2JvZHknKS53aWR0aCgpID4gNjc4KSByZXR1cm47XG5cbiAgICB2YXIgcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICB2YXIgYmFyID0gJCgnI3Byb2dyZXNzX25hdicpO1xuICAgIGlmKHMgPiAyMDApe1xuICAgICAgICBpZihmYWxzZSA9PT0gYmFyLmhhc0NsYXNzKCdmbG9hdCcpKXtcbiAgICAgICAgICAgIGJhci5hZGRDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYmFyLmhlaWdodCgpKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGJhci5yZW1vdmVDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBudWxsKVxuICAgIH1cblxufS8vLy8gZnVuLiBtYWluU2Nyb2xsXG5cblxuLyoqXG4gKiBbdXBkYXRlVGFiSW5kZXggV2lsbGwgdXBkYXRlIHRoZSB0YWIgaW5kZXggb2YgZnJvbSBmaWVsZHMgZm91bmQgaW5zaWRlIHRoZSBzZWxlY3RvciBwYXNzZWRdXG4gKiBAcGFyYW0gIHtbalF1ZXJ5XX0gc2VsZWN0b3IgIFt1c2VkIHRvIGxvY2F0ZSB0aGUgZmllbGRzIGluc2lkZSBpdF1cbiAqIEBwYXJhbSAge1tpbnRdfSBzdGFydEZyb20gW251bWJlciB0byBzdGFydCB0aGUgdGFiIGluZGV4IGZyb20gaWYgbm90IHBhc3NlZCAwIHdpbGwgYmUgdXNlZCwgdXNlZnVsIHdoZW4gcGFnZSBoYXMgbXVsaXBsZSBmb3Jtc11cbiAqL1xuZnVuY3Rpb24gdXBkYXRlVGFiSW5kZXgoc2VsZWN0b3IsIHN0YXJ0RnJvbSl7XG4gIHZhciB4ID0gc3RhcnRGcm9tIHx8IDA7XG5cbiAgICBzZWxlY3Rvci5maW5kKCcuY2MtZmllbGQnKS5lYWNoKGZ1bmN0aW9uKGkpe1xuICAgICAgICB2YXIgcyA9ICQodGhpcykuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPWRhdGVdLCBpbnB1dFt0eXBlPXRlbF0sIGlucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSwgaW5wdXRbdHlwZT1udW1iZXJdLCB0ZXh0YXJlYSwgc2VsZWN0JylcbiAgICAgICAgcy5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICQodGhpcykuYXR0cigndGFiaW5kZXgnLCB4KzEpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgfSlcbiAgICB9KVxufS8vLy8gZnVuLiB1cGRhdGVUYWJJbmRleFxuXG4vKipcbiAqIFt5ZXNOb1JhZGlvIFdpbGwgc2V0IHRoZSBiZWhhdmlvciBvZiB5ZXMvbm8gcmFkaW8gYnV0dG9ucyBieSBhZGRpbmcgLmNoZWNrZWQgY2xhc3MgdG8gdGhlIGxhYmVsIG9mIHRoZSBidXR0b25dXG4gKiB0aGUgZnVuY3Rpb24gYXNzdW1lIHRoZSBpbnB1dFt0eXBlPXJhZGlvbl0gaXMgaW5jbHVkZWQgaW5zaWRlIDxsYWJlbD4gdGFnXG4gKi9cbmZ1bmN0aW9uIHllc05vUmFkaW8oY29udGFpbmVyKXtcbiAgLy8vLyBpZiBjb250YWluZXIgaXMgcGFzc2VkIGZpbmQgdGhlIHJhZGlvcyBpbnNpZGUgaXQgb3IgZG8gYSBkb2N1bWVudCBnbG9iYWwgZmluZFxuICB2YXIgcmFkaW9zID0gISFjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykgOiAkKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKTtcbiAgcmFkaW9zLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZigkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xhYmVsLmNoZWNrZWQnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgfSlcbiAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gIH0pXG4gIC5vbignYmx1ciBraWxsZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICB9KTtcblxuICByYWRpb3MuZWFjaChmdW5jdGlvbigpe1xuICAgICQodGhpcykucGFyZW50KCkuZmluZCgnc3BhbicpLnByZXBlbmQoJzxpIGNsYXNzPVwiY2lyY2xlIGdseXBoaWNvbiBnbHlwaGljb24tb2tcIj48L2k+JylcbiAgfSlcblxuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpOy8vLy8gdGhpcyB0byBzZXQgdGhlIGluaXRpYWwgc3RhdGVcbn1cblxuZnVuY3Rpb24gbXVsdGlDaGVja2JveCgpe1xuICB2YXIgcmFkaW9zID0gJCgnLmNjLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgIC8vICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uIGdseXBoaWNvbi1vaycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpO1xufS8vLy8gZnVuLiBtdWx0aUNoZWNrQm94XG5cbi8qKlxuICogW2Ryb3Bkb3duTGFiZWwgU2V0IHRoZSBjbGljayBldmVudCBmb3IgYXJyb3cgbGFiZWwgZm9yIDxzZWxlY3Q+IGVsZW1lbnRdXG4gKiB0aGlzIHNvbHV0aW9uIHdvcmtzIG9ubHkgc2FmYXJpIGFuZCBjaHJvbWUgZHVlIHRvIGJyb3dzZXIgbGltaXRhdGlvblxuICovXG5mdW5jdGlvbiBkcm9wZG93bkxhYmVsKGNvbnRhaW5lcil7XG4gIHZhciBsYWJlbHMgPSBjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLmNjLWRyb3Bkb3duIGxhYmVsLmFycm93JykgOiAkKCcuY2MtZHJvcGRvd24gbGFiZWwuYXJyb3cnKTtcbiAgbGFiZWxzLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLmF0dHIoJ2ZvcicpO1xuICAgICAgaWYoZmFsc2UgPT09ICEhaWQpIHJldHVybjtcbiAgICAgIHZhciBmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBNb3VzZUV2ZW50KCdtb3VzZWRvd24nKTtcbiAgICAgIGZpZWxkLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH0pXG59Ly8vLyBmdW4uIGRyb3Bkb3duTGFiZWxcblxuLyoqXG4gKiBbZmlsbFN0YXRlRHJvcGRvd24gd2lsbCBmaWxsIHRoZSBkcm9wZG9uIG9mIFVTQSBzdGF0ZXMgZm9ybSB1c1N0YXRlIHZhcmlhYmxlXVxuICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciBbalF1ZXJ5IG9iamVjdCB0aGF0IGNvbnRhaW4gPHNlbGVjdD4gdGFnIHRvIGJlIGZpbGxlZF1cbiAqIHVzU2F0ZSBpcyBhcnJheSBvZiBvYmplY3QgZGVmaW5lZCBpbiB1cy1zdGF0dXMuanMgZmlsZVxuICovXG5mdW5jdGlvbiBmaWxsU3RhdGVEcm9wZG93bihzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHVsID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKHZhciBzPTA7IHM8dXNTdGF0ZXMubGVuZ3RoOyBzKyspe1xuICAgICAgICAgICAgdmFyIGxpID0gJCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB1c1N0YXRlc1tzXS5hYmJyZXZpYXRpb24gKyAnXCI+JyArIHVzU3RhdGVzW3NdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgICAgICB9Ly8vLyBmb3JcbiAgICB9KTtcbn0vLy8vIGZ1bi4gZmlsbFN0YXRlRHJvcGRvd25cblxuLyoqXG4gKiBbaXNBbmRyb2lkIHNpbXBsZSBmdW5jdGlvbiB0byBkZXRlY3QgQW5kcm9pZCBPU11cbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlY3QgdGhlIGJ1ZyBpbiBBbmRyb2lkIHdoZW4ga2V5ZG93biwga2V5dXAgZXZlbnQgZG9lc24ndCBzZW5kIHRoZSByaWdodCBrZXkgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gW3RydWUgaWYgQW5kcm9pZCBPU11cbiAqL1xudmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn0vLy8vIGZ1bi4gaXNBbmRyb2lkXG5cblxudmFyIHJlc3RyaWN0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC0oKSBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDQ4LCA1NywgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJhd1ZhbHVlID0gdmFsLnNwbGl0KC9bXFwofFxcKXwgfFxcLXxcXCt8XFwuXS8pLmpvaW4oJycpO1xuICB2YXIgZm9ybWF0ZWQgPSAnJztcbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9ICcoJyArIHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnKSAnO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9IHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnLSc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBmb3JtYXRlZCArPSByYXdWYWx1ZTtcblxuICAkKHRoaXMpLnZhbChmb3JtYXRlZCk7XG59Ly8vLyBmdW4uIGZvcm1hdFBob25lXG5cbnZhciByZXN0cmljdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnLyddXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciBmb3JtYXRDYXJkRGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwvL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuXG4gICAgLy8gaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAvLyAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgLy8gICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgLy8gfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vIGZ1bi4gZm9ybWF0Q2FyZERhdGVcblxudmFyIHJlc3RyaWN0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLVwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC0vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMyl7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAzKSArICctJztcbiAgICByYXcgPSByYXcuc2xpY2UoMyk7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICctJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufVxuXG52YXIgcmVzdHJpY3ROdW1iZXJzID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JykuaGlkZUVycm9yKCk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIHJlc3RyaWN0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAkLFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZVNTTlxuXG52YXIgZm9ybWF0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcblxuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5zcGxpdCgvW1xcJHwgfFxcLF0vKS5qb2luKCcnKTtcblxuICBpZihyYXcubGVuZ3RoID4gMyl7XG4gICAgICB2YXIgYXJyID0gcmF3LnNwbGl0KCcnKTtcbiAgICAgIHZhciBzZXAgPSAxO1xuICAgICAgZm9yKHZhciB4PWFyci5sZW5ndGgtMTsgeD49MDsgeC0tKXtcbiAgICAgICAgLy8vLyBhZGQgcmVhZGluZyBjb21tYSBhZnRlciAzIGRpZ2l0cyBhbmQgb25seSBpZiB0aGVyZSBpcyBuZXh0IGRpZ2l0XG4gICAgICAgIHJldCA9IChzZXAgJSAzID09IDAgJiYgdHJ1ZSA9PT0gISFhcnJbeC0xXT8gJywnIDogJycpICsgYXJyW3hdICArIHJldDtcbiAgICAgICAgc2VwKys7XG4gICAgICB9XG4gICAgICByZXQgPSAnJCcgKyByZXQ7XG4gIH1cbiAgZWxzZSBpZihyYXcubGVuZ3RoID4gMCl7XG4gICAgcmV0ID0gJyQnICsgcmF3O1xuICB9XG4gIGVsc2V7XG4gICAgcmV0ID0gcmF3O1xuICB9XG5cbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vLyBmdW4uIGZvcm1hdEN1cnJlbmN5XG5cbnZhciBhbmltYXRlU2Nyb2xsID0gZnVuY3Rpb24oeSwgdGltZSl7XG5cbiAgICBjbGVhckludGVydmFsKF9hcHBHbG9iYWwuc2Nyb2xsSW50ZSk7Ly8vLyBzdG9wIGFueXNjcm9sbGluZ1xuXG4gICAgaWYodW5kZWZpbmVkID09PSB0aW1lKSB0aW1lID0gMTsvLy8vIHNldCBkZWZhdWx0IHZhbHVlIGZvciB0aW1lXG4gICAgdmFyIGZwcyA9IDYwOyAvLy8vIGZyYW1lcyBwZXIgc2Vjb25zXG4gICAgdmFyIGZyYW1lVGltZSA9IE1hdGguY2VpbCgxMDAwIC8gZnBzKTtcbiAgICB2YXIgZCA9IHRpbWUgKiBmcmFtZVRpbWU7IC8vLyBudW1iZXIgb2YgZnJhbWVzIGR1cmF0aW9uXG4gICAgdmFyIHQgPSAwOyAvLy8vIHRpbWUgdGlja2VyIC8gZnJhbWUgY291bnRlclxuXG4gICAgLy8vLyBzZXQgYmVnaW4gcG9pbnQgd2hpaGMgdGhlIGN1cnJyZW50IHBvaW50XG4gICAgLy8gYiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogd2luZG93LnNjcm9sbFk7XG4gICAgdmFyIGIgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xuICAgIC8vXG4gICAgaWYoYiA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgYiA9IDA7XG4gICAgfVxuXG5cbiAgICAvLy8vIGNoZWNrIGlmIHNjcm9sbGluZyBkZXN0aW5hdGlvbiBpcyBiaWdnZXIgdGhhbiBwYWdlIGhlaWdodCBsaW1pdHNcbiAgICB2YXIgbGltaXQgPSBNYXRoLm1heCggZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgKTtcbiAgICBpZih5PmxpbWl0KXtcbiAgICAgICAgeSA9IGxpbWl0O1xuICAgIH1cblxuICAgIC8vLy8gc2V0IHRoZSBjaGFuZ2UgYmV0d2VlbiBjdXJyZW50IGFuZCBkZXN0aW5hdGlvbiBwb2ludFxuICAgIGMgPSBiIC0geTtcblxuICAgIC8vLy8gZG8gbm90aGluZyBpZiBkZXN0aW5hdGlvbiBpcyBzYW1lIGFzIGN1cnJlbnRcbiAgICBpZihNYXRoLmFicyhjKSA8IDEpIHJldHVybjtcblxuICAgIC8vLy8gc3RhcnQgdGltZSB0aWNrZXJcbiAgICBfYXBwR2xvYmFsLnNjcm9sbEludGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAvLy8gZWFzZSBvdXQgbWF0aFxuICAgICAgICB2YXIgcGVyID0gMSAtIHQvZDtcbiAgICAgICAgdmFyIG5ld1kgPSAgLWMgKiAoMS1wZXIqcGVyKnBlcipwZXIpICsgYjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+XCIsIDEtKDEtcGVyKSooMS1wZXIpKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG5ld1kpO1xuXG5cbiAgICAgICAgaWYodCA9PSBkKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2FwcEdsb2JhbC5zY3JvbGxJbnRlKTtcbiAgICAgICAgICAgICQod2luZG93KS50cmlnZ2VyKCdhbmltYXRlU2Nyb2xsRW5kJyk7XG4gICAgICAgIH1cbiAgICAgICAgdCsrO1xuXG4gICAgfSwgZnJhbWVUaW1lKTtcbn0vLy8vIGZ1bi4gYW5pbWF0ZVNjcm9sbFxuXG5mdW5jdGlvbiBvdmVybGF5KG8pe1xuICAgIC8vIGFkZCBhIGJhY2tncm91bmQgdG8gb3ZlcmxheVxuICAgIHZhciB3ID0gJChkb2N1bWVudCkud2lkdGgoKTtcbiAgICB2YXIgaCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xuXG4gICAgLy8vIGNhc3NoIHRoZSBvdmVybGF5IERpdlxuICAgIHZhciBvdmVybGF5RGl2ID0gJChvWydzZWxlY3RvciddKTtcblxuICAgIHRoaXMuY2xvc2VPdmVybGF5PSBmdW5jdGlvbigpe1xuICAgICAgICAvLyByZW1vdmUga2V5cHJlc3MgZXZlbnQgbGlzbnRlclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdrZXlwcmVzcycpO1xuXG4gICAgICAgIGlmKG8ub25CZWZvcmVDbG9zZSkgby5vbkJlZm9yZUNsb3NlKCk7XG5cbiAgICAgICAgLy8gaGlkZSB0aGUgbWFrcyBhbmQgb3ZlcmxheVxuICAgICAgICBvdmVybGF5RGl2LmhpZGUoKTtcblxuICAgICAgICAkKCcjb3ZlcmxheU1hc2snKS5yZW1vdmUoKTtcbiAgICAgICAgb3ZlcmxheURpdi5maW5kKCdhLmNsb3NlJykub2ZmKCdjbGljaycpO1xuICAgICAgICBkZWxldGUgX2FwcEdsb2JhbC5vdmVybGF5O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBbYWRqdXN0IHNldCB0aGUgdG9wIGFuZCBsZWZ0IHBvc2l0aW9uIG9mIG92ZXJsYXllZCBkaXYgdG8gYmUgY2VudGVyZWRcbiAgICAgKi9cbiAgICB0aGlzLmFkanVzdCA9IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgd2luZG93VyA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgdmFyIHdpbmRvd0ggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICB2YXIgbCA9ICh3aW5kb3dXIC0gb3ZlcmxheURpdi5vdXRlcldpZHRoKCkgKSAvIDI7XG4gICAgICB2YXIgdCA9ICh3aW5kb3dIIC0gb3ZlcmxheURpdi5oZWlnaHQoKSApIC8gMjtcblxuICAgICAgaWYodDwwKSB0ID0gMDtcblxuICAgICAgaWYod2luZG93VyA8IDc2OCl7XG4gICAgICAgIGwgPSAwOyAvLy8gaWYgbW9iaWxlIG1ha2UgaXQgY292ZXIgYWxsIHNjcmVlblxuICAgICAgICB0ID0gMDtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIC8vLy8gaWYgbm90IG1vYmlsZSBtYWtlIHN1cmUgdGhlIHRoZSBtYXggaGVpZ2h0IGlzIHNldCBpZiBoZWlnaHQgaXMgYmlnZ2VyIHRoYW4gd2luZG93IGhlaWdodFxuICAgICAgICBpZih3aW5kb3dIIDwgb3ZlcmxheURpdi5oZWlnaHQoKSl7XG4gICAgICAgICAgb3ZlcmxheURpdi5jc3MoJ21heC1oZWlnaHQnLCB3aW5kb3dIIC0gMjApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKG92ZXJsYXlEaXYub3V0ZXJXaWR0aCgpKVxuICAgICAgb3ZlcmxheURpdi5jc3MoJ21hcmdpbi1sZWZ0JywgJy0nKyhvdmVybGF5RGl2Lm91dGVyV2lkdGgoKS8yKSsncHgnKS5jc3MoJ2xlZnQnLCAnNTAlJykuY3NzKCd0b3AnLCB0KydweCcpO1xuICAgIH0vLy8vIGZ1bi4gYWRqdXN0XG5cbiAgICAkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGlkPVwib3ZlcmxheU1hc2tcIiBzdHlsZT1cInRvcDowOyByaWdodDowOyBib3R0b206MDsgbGVmdDowOyBwb3NpdGlvbjpmaXhlZDsgYmFja2dyb3VuZC1jb2xvcjojMDAwOyB6LWluZGV4Ojk5OTg7IHRvcDowcHg7IGxlZnQ6MHB4O1wiPjwvZGl2PicpO1xuICAgIC8vICQoJ2JvZHknKS5hcHBlbmQoJzxkaXYgaWQ9XCJvdmVybGF5TWFza1wiIHN0eWxlPVwid2lkdGg6JysgdyArJ3B4OyBoZWlnaHQ6JysgaCArJ3B4OyBwb3NpdGlvbjphYnNvbHV0ZTsgYmFja2dyb3VuZC1jb2xvcjojMDAwOyB6LWluZGV4Ojk5OTg7IHRvcDowcHg7IGxlZnQ6MHB4O1wiPjwvZGl2PicpO1xuICAgIHZhciBtYXNrID0gJCgnI292ZXJsYXlNYXNrJyk7XG4gICAgbWFzay5hZGRDbGFzcyhcImZhZGV0bzkwXCIpLmNzcyhcIm9wYWNpdHlcIiwgJzAuNicpO1xuXG4gICAgLy8gYXNzaW5nIGNsaWNrIHRvIGNsb3NlXG4gICAgbWFzay5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBjbG9zZU92ZXJsYXkoKTtcbiAgICB9KTtcblxuICAgIC8vIGFwcGVuZCB0aGUgY2xvc2UgYnV0dG9uXG4gICAgLy8gaWYob3ZlcmxheURpdi5maW5kKCcuY2xvc2UnKS5sZW5ndGg8PTApe1xuICAgIC8vICAgICBvdmVybGF5RGl2LmFwcGVuZCgnPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIiBjbGFzcz1cImNsb3NlIGljb24tY2xvc2UgY2xvc2Utb3ZlcmxheVwiPjxhLz4nKTtcbiAgICAvLyB9XG4gICAgb3ZlcmxheURpdi5maW5kKCcuY2xvc2UnKS5jc3MoJ3otaW5kZXgnLCAxMDAxKTtcblxuICAgIG92ZXJsYXlEaXYuZmluZCgnLmNsb3NlLW92ZXJsYXknKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBjbG9zZU92ZXJsYXkoKTtcbiAgICB9KTtcblxuICAgIGlmKG8ub25CZWZvcmVMb2FkKSBvLm9uQmVmb3JlTG9hZCgpO1xuXG4gICAgb3ZlcmxheURpdi5jc3MoJ3otaW5kZXgnLCc5OTk5JykucmVtb3ZlQ2xhc3MoJ2ZhZGVpbicpLnNob3coKS5hZGRDbGFzcygnZmFkZWluJyk7XG5cbiAgICAvKipcbiAgICAgKiBDZW50ZXIgdGhlIG92ZXJsYXkgZGl2XG4gICAgICovXG4gICAgdGhpcy5hZGp1c3QoKTtcblxuICAgIGlmKG8ub25BZnRlckxvYWQpIG8ub25BZnRlckxvYWQoKTtcblxuICAgIC8vLyBhZGQgbGlzdGVuZXIgZm9yIEVzYyBrZXlcbiAgICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgZnVuY3Rpb24oayl7XG4gICAgICAgIGlmKGsua2V5Q29kZSAmJiBrLmtleUNvZGUgPT0gMjcpIGNsb3NlT3ZlcmxheSgpO1xuICAgIH0pO1xuXG4gICAgLy8vLy8vLyBzZXQgcmVmZXJlbmNlIGluIGFwcGxpY2F0aW9uIHZhcmlhYmxlc1xuICAgIF9hcHBHbG9iYWwub3ZlcmxheSA9IHRoaXM7XG5cbiAgICByZXR1cm4gdGhpcztcbn0vLyBlbmQgb2YgZnVuLiBvdmVybGF5XG5cbi8qKlxuICogW3Jlc2V0RmllbGRzIHdpbGwgc2VhcmNoIGZvciBpbnB1dCBmaWVsZCBpbnNpZGUgYSBjb250YWluZXIgYW5kIHJlc3QgaXRzIHZhbHVlIGFuZCBhbnkgZXJyb3Igc3RhdHVzXVxuICogQHBhcmFtICB7W3R5cGVdfSBjb250YWluZXIgW2pRdWV5ciBvYmplY3QgdGhhdCBzaG91bGQgY29udGFpbiBpbnB1dCBmaWxlZCB0aGF0IG5lZWQgYmUgcmVzZXRdXG4gKi9cbnZhciByZXNldEZpZWxkcyA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gIHZhciBmaWVsZHMgPSBjb250YWluZXIuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICB2YXIgdHlwZSA9ICQodGhpcykuYXR0cigndHlwZScpO1xuICAgIGlmKHR5cGUgPT09ICdyYWRpbycpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbHRlcignbGFiZWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgIH1cbiAgICAkKHRoaXMpLmhpZGVFcnJvcigpO1xuICB9KTtcblxufS8vLy8gZnVuLiByZXNldEZpZWxkc1xuXG4vKipcbiAqIFtpbmNsdWRlRmllbGRzIHdpbGwgYWRkIGhpZGRlbiBmaWVsZHMgaW4gZm9ybSBhbmQgc2V0IHRoZSByaWdodCB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgZS5nLiBcIi5uZXctZmllbGRzXCIsIFwiI2Nsb2RpbmdEYXRlXCJcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBpbmNsdWRlIGluIHZhbGlkYXRpb25cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbnZhciBpbmNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIGZpZWxkcy5zbGlkZURvd24oKTtcblxufVxuXG4vKipcbiAqIFtleGNsdWRlRmllbGRzIHdpbGwgZXhjbHVkZSBmaWVsZHMgZnJvbSBmb3JtIGFuZCBzZXQgcmVtb3ZlIHRoZSB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgZXhjbHVkZWRcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBleGNsdWRlZCBmcm9tIHZhbGlkYXRpb25cbiAqL1xudmFyIGV4Y2x1ZGVGaWVsZHMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMuc2VsZWN0b3IgfHwgIW9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcyA9ICQob3B0aW9ucy5zZWxlY3Rvcik7XG4gIGZpZWxkcy5maW5kKG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgcmVzZXRGaWVsZHMoZmllbGRzKTtcbiAgZmllbGRzLnNsaWRlVXAoKTtcbn1cblxuLyoqXG4gKiBbYWRkQXV0b0FkZHJlc3Mgd2lsbCBhZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gdGV4dCBmaWVsZCB3aXRoIGlkICdib19hZGRyZXNzJ11cbiAqIEBwYXJhbSB7W3R5cGVdfSBpbmRleCBbaW4gbXVsdGktYWRkcmVzcyBjYXNlIHRoaXMgdmFyaWFibGUgd2lsbCB0ZWwgdGhlIGZ1bmN0aW9uIHdoaWNoIGFkZHJlc3MgdG8gYmluZCB0aGUgdHlwZSBhaGVhZCB0b11cbiAqL1xuZnVuY3Rpb24gYWRkQXV0b0FkZHJlc3MoaW5kZXgsIHN0YXJ0RnJvbTEpe1xuICAgIHZhciBwb3N0ID0gaW5kZXggPj0gMiB8fCB0cnVlID09PSBzdGFydEZyb20xID8gJycraW5kZXggOiAnJztcblxuICAgIHZhciBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvX2FkZHJlc3MnICsgcG9zdCksXG4gICAgICAgICQoJy50eXBlYWhlYWRfYWRkcmVzcycgKyBwb3N0KS5maWx0ZXIoJ2lucHV0JylbMF0sXG4gICAgICAgIHt0eXBlczogWydnZW9jb2RlJ119XG4gICAgKTtcbiAgICAvLy8vIHNldCB0aGUgYWRkcmVzcyBpbmRleCBhbmQgcG9zdCBpbiBhdXRvY29tcGxldGUgb2JqZWN0IHRvIGJlIHVzZWQgaW4gZmlsbEluQWRkcmVzcyBmdW5jdGlvblxuICAgIGF1dG9jb21wbGV0ZS5pbmRleCA9IDA7XG4gICAgYXV0b2NvbXBsZXRlLnBvc3QgPSBwb3N0O1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBzZWxlY3RzIGFuIGFkZHJlc3MgZnJvbSB0aGUgZHJvcGRvd24sIHBvcHVsYXRlIHRoZSBhZGRyZXNzXG4gICAgLy8gZmllbGRzIGluIHRoZSBmb3JtLlxuICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsIGZpbGxJbkFkZHJlc3MpO1xufVxuXG4vKipcbiAqIFtmaWxsSW5BZGRyZXNzIHdpbGwgdXBkYXRlIHRoZSBhZGRyZXNzIGNpdHksIHN0YXQsIGFuZCB6aXAgZmlsZWQgYWZ0ZXIgdXNlciBzZWxlY3QgYWRkcmVzcyBmb3JtIHR5cGUgYWhlYWRdXG4gKiB0aGlzIGluc2lkZSB0aGlzIGZ1bmN0aW9uIHdpbGwgcmVmZXJlbmNlIGdvb2dsZSBhdXRvY29tcGV0ZSBvYmplY3RcbiAqIEByZXR1cm4ge1tudWxsXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaWxsSW5BZGRyZXNzKCl7XG4gICAgLy8vLyB0aGlzIHJlZmVyIHRvIHRoZSBhdXRvIGNvbXBsZXRlIG9iamVjdFxuXG4gICAgdmFyIHBsYWNlID0gdGhpcy5nZXRQbGFjZSgpO1xuXG4gICAgdmFyIGNvbXBvbmVudEZvcm0gPSB7XG4gICAgICAgIHN0cmVldF9udW1iZXI6ICdzaG9ydF9uYW1lJyxcbiAgICAgICAgcm91dGU6ICdsb25nX25hbWUnLFxuICAgICAgICBsb2NhbGl0eTogJ2xvbmdfbmFtZScsXG4gICAgICAgIGFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMTogJ3Nob3J0X25hbWUnLFxuICAgICAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzI6ICdsb25nX25hbWUnLFxuICAgICAgICBjb3VudHJ5OiAnbG9uZ19uYW1lJyxcbiAgICAgICAgcG9zdGFsX2NvZGU6ICdzaG9ydF9uYW1lJ1xuICAgIH07XG5cbiAgICB2YXIgYWRkcmVzcyA9IHt9O1xuICAgIHZhciBsb25nX25hbWUgPSAnJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHlwZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXS50eXBlc1swXTtcbiAgICAgICAgdmFyIGFkZHJlc3NUeXBlID0gdHlwZTtcblxuICAgICAgaWYgKGNvbXBvbmVudEZvcm1bYWRkcmVzc1R5cGVdKSB7XG4gICAgICAgIHZhciB2YWwgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV1bY29tcG9uZW50Rm9ybVthZGRyZXNzVHlwZV1dO1xuICAgICAgICBhZGRyZXNzW2FkZHJlc3NUeXBlXSA9IHZhbDtcbiAgICAgIH1cbiAgICAgIGlmKGFkZHJlc3NUeXBlID09PSAnYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xJyl7XG4gICAgICAgICAgICBsb25nX25hbWUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV1bJ2xvbmdfbmFtZSddO1xuICAgICAgICB9XG4gICAgfS8vLy8gZm9yXG4gICAgYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFfbG9uZ19uYW1lID0gbG9uZ19uYW1lO1xuXG4gICAgJCgnLnR5cGVhaGVhZF9hZGRyZXNzJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLnN0cmVldF9udW1iZXIgKyAnICcgKyBhZGRyZXNzLnJvdXRlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX2NpdHknK3RoaXMucG9zdCkuZXEoMCkudmFsKGFkZHJlc3MubG9jYWxpdHkpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfc3RhdGUnK3RoaXMucG9zdCkuZXEoMCkudmFsKGFkZHJlc3MuYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX2NvdW50eScrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzIpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfemlwJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLnBvc3RhbF9jb2RlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbn1cbiIsIi8qKlxuICogVGhlc2UgZ2xvYmFsIHZhcmlhYmxlcyBzaGFyZWQgd2l0aCAwMi1jb2JvcnJvd2VyLmpzXG4gKiBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSwgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXg7XG4gKi9cblxuKGZ1bmN0aW9uKCl7XG4gICAgdmFyIGxvZ2luRm9ybSwgbG9naW5PdmVybGF5LCBhcHBPdmVybGF5O1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGJvcnJvd2VyUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gYm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYm9ycm93ZXJGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjYm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwuYWRkcmVzc0luZGV4IHdpbGwgdHJhY2sgdGhlIG51bWJlciBvZiBhZGRyZXNzIGFkZGVkIGFuZCBzdG9wIGlmIHRvdGFsIG9mIDQgYWRkcmVzc11cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gMTtcblxuICAgICAgICBfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHZhciBpc0NvQm9ycm93ZXIgPSAgU3RyaW5nKCcyMzQnKS5zcGxpdCgnJykuaW5kZXhPZiggJCgnI2JvX2FwcGx5dHlwZScpLnZhbCgpICkgPiAtMTtcblxuICAgICAgICAgICAgICAgIGlmKHRydWUgPT09IGlzQ29Cb3Jyb3dlcil7XG4gICAgICAgICAgICAgICAgICAgIG15Rm9ybS5hdHRyKCdhY3Rpb24nLCAnMDItY29ib3Jyb3dlci5odG1sJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICAvLy8vIGlmIHRoZSBmb3JtIGlzIG5vdCB2YWxpZCBhbmQgY29udGludWUgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0byB0aGUgcGFnZSB0byBmaXJzdCBmaWVsZCB3aXRoIGVycm9yXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpOyAgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vLy8gaWYgaXNWYWxpZCBlbHNlXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogZXZlbnQgaGFuZGxlcnMgYXJlIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cblxuICAgICAgICAkKCcjYm9faG93aGVhcicpLm9mZignY2hhbmdlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIHZhbCA9IHBhcnNlSW50KCQodGhpcykudmFsKCksMTApO1xuICAgICAgICAgICAgdmFyIGFyciA9IFsyLDMsNCw1XTtcbiAgICAgICAgICAgIGlmKGFyci5pbmRleE9mKHZhbCkgPiAtMSl7XG4gICAgICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAgICAgKi9cbiAgICAgICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXgpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgbnVtYmVyIG9mIGRlcGVuZGVudHMgY2hhbmdlIGFuZCBzaG93IGFnZXMgZmllbGRzXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjYm9fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgICB2YXIgYWdlc0RpdiA9ICQoJyNkZXBlbmRlbnRTZWN0aW9uJyk7XG4gICAgICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZih2ID4gMCl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciB4PTA7IHg8djsgeCsrKXtcbiAgICAgICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBjaGFuZ2Ugb2YgcmFkaW8gYnV0dG9uIGN1cnJlbnQgYWRkcmVzcyBvd24vcmVudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1ib19jdXJyZW50bHldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIHZhciByZW50Q29sID0gJCgnI21vbnRobHlSZW50Jyk7XG4gICAgICAgICAgICB2YXIgY29udGFpbmVyID0gcmVudENvbC5maW5kKCcuY2MtZmllbGQnKS5lcSgwKTtcbiAgICAgICAgICAgIGlmKHZhbC50b0xvd2VyQ2FzZSgpID09PSAncmVudCcpe1xuICAgICAgICAgICAgICAgIHJlbnRDb2wucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmVudENvbC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBtZXNzYWdlIGVycm9yJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBldmVudE5hbWUgPSAkLmJyb3dzZXIuc2FmYXJpPT09IHRydWUgPyAnYmx1cicgOiAnY2hhbmdlJzsgLy8vLyBjaGFuZ2UgaXMgbm90IGZpcmVkIHdoZW4gYXV0b2ZpbGwgaXMgdXNlZCBvbiBzYWZhcmlcbiAgICAgICAgJCgnI2JvX2VtYWlsJykub24oZXZlbnROYW1lLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBtYWtlIHN1cmUgZW1haWwgZmllbGQgaXMgdmFsaWRhdGUgYmVmb3JlIGRvaW5nIGFueSBjaGVja1xuICAgICAgICAgICAgICogaWQgI2VtYWlsRmllbGQgaXMgZ2l2ZW4gdG8gLmNjLWZpZWxkIGNvbnRhaW5lciBvZiBlbWFpbCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAkKCcjZW1haWxGaWVsZCcpLnZhbGlkYXRlRmllbGQoKTtcblxuICAgICAgICAgICAgdmFyIHZhbCA9ICQudHJpbSgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gJCh0aGlzKS5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgICAgIGlmKHZhbCAmJiB0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6X2FwcEdsb2JhbC51cmxFbWFpbEV4aXN0c0FQSSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7ZW1haWw6dmFsfSxcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOlwicG9zdFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJldCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXQuZW1haWwudG9Mb3dlckNhc2UoKSA9PSB2YWwudG9Mb3dlckNhc2UoKSAmJiByZXQuZXhpc3RzID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24ocmV0LmV4aXN0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxvZ2luU2VjdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0vLy8gaWYgdmFsXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHVwZGF0ZUxvZ2luU2VjdGlvbihmYWxzZSk7XG4gICAgICAgICAgICB9Ly8vLyBub3QgdmFsXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBhZGRyZXNzIHR5cGUgYWhlYWQgZnVuY3Rpb25hbGl0eSB0byBhZGRyZXNzXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMb2dpbiBGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBsb2dpbkZvcm0gPSAkKFwiI2xvZ2luRm9ybVwiKTtcbiAgICAgICAgbG9naW5PdmVybGF5ID0gJChcIiNsb2dpbk92ZXJsYXlcIik7XG4gICAgICAgICQoJyNsb2dpbkZvcm0nKS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgICAgIGlmKHRydWUgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExvZ2luIGZvcm0gaXMgdmFsaWQgZG8gYWpheCBjYWxsIHRvIGF1dGhlbnRpY2F0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcblxuICAgICAgICAgICAgICAgIGRhdGEuZW1haWwgPSAkLnRyaW0oJChcIiNsb2dpbl9lbWFpbFwiKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgZGF0YS5wYXNzd29yZCA9ICQudHJpbSgkKFwiI2xvZ2luX3Bhc3N3b3JkXCIpLnZhbCgpKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gbG9naW5PdmVybGF5LmFkZENsYXNzKFwiYnVzeVwiKS5maW5kKCcuZXJyb3ItbWVzc2FnZScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBtc2cudGV4dChtc2cuYXR0cignZGF0YS1kZWZhdWx0JykpO1xuICAgICAgICAgICAgICAgICQoXCIjbG9naW5fcGFzc3dvcmRcIikudmFsKCcnKTtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDpfYXBwR2xvYmFsLnVybEF1dGhlbnRpY2F0aW9uQVBJLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6XCJqc29uXCIsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9naW5PdmVybGF5LnJlbW92ZUNsYXNzKCdidXN5JykuZmluZCgnLmVycm9yLW1lc3NhZ2UnKS5zbGlkZURvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSA9PT0gcmV0LnN1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByZXQuZW1haWwudG9Mb3dlckNhc2UoKSA9PT0gZGF0YS5lbWFpbC50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hcHBHbG9iYWwub3ZlcmxheS5jbG9zZU92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlTG9naW5Gb3JtKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93QXBwbGljYXRpb25zTGlzdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dpbk92ZXJsYXkucmVtb3ZlQ2xhc3MoJ2J1c3knKS5maW5kKCcuZXJyb3ItbWVzc2FnZScpLnRleHQocmV0Lm1lc3NhZ2UpLnNsaWRlRG93bigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pOyAvLy8vIG5vIGNhbGxiYWNrIGlzIHJlcXVpcmVkXG5cbiAgICAgICAgJCgnI2xvZ2luU2tpcEJ0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2xvZ2luQnRuJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgICQoJyNsb2dpbl9lbWFpbCcpLnZhbCggJCgnI2JvX2VtYWlsJykudmFsKCkgKTtcblxuICAgICAgICAgICAgb3ZlcmxheSh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6JyNsb2dpbk92ZXJsYXknLFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlTG9hZDpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAvLy8vIG5vdGhpbmdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQmVmb3JlQ2xvc2U6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgaGlkZUxvZ2luRm9ybSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBhcHBPdmVybGF5ID0gJCgnI2FwcHNMaXN0Jyk7XG5cblxuICAgICAgICAvLyBzaG93QXBwbGljYXRpb25zTGlzdCgpO1xuICAgIH07Ly8vLyBib3Jyb3dlclJlYWR5XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2dpblNlY3Rpb24oZW1haWxFeGlzdHMpe1xuICAgICAgICBpZih0cnVlID09PSBlbWFpbEV4aXN0cykge1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbG9naW5TZWN0aW9uJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfS8vLy8vIGZ1bi4gdXBkYXRlTG9naW5TZWN0aW9uXG5cbiAgICBmdW5jdGlvbiBoaWRlTG9naW5Gb3JtKCl7XG4gICAgICAgIHJlc2V0RmllbGRzKGxvZ2luRm9ybSk7IC8vLyByZXNldEZpZWxkcyBpbiBtYWluLmpzXG4gICAgICAgIGxvZ2luT3ZlcmxheS5yZW1vdmVDbGFzcygnYnVzeScpLmZpbmQoJy5lcnJvci1tZXNzYWdlJykuaGlkZSgpO1xuICAgIH0vLy8vIGZ1bi4gaGlkZUxvZ2luRm9ybVxuXG5cblxufSkoKTtcblxuXG5cbmZ1bmN0aW9uIGNoZWNrQWRkcmVzc0xlbmd0aChjb250YWluZXIsIGluZGV4KXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID4gMSA/ICcnK2luZGV4IDogJyc7XG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuXG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQoJy5hZGRyZXNzTGVuZ3RoWScgKyBwb3N0KS5lcSgwKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1hZGRyZXNzJyksIDEwKTtcbiAgICAgICAgaWYoIXYpIHYgPTA7XG4gICAgICAgIGlmKCF5ZWFycyl7XG4gICAgICAgICAgICB5ZWFycyA9IDA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFycyl7XG4gICAgICAgICAgICB2ICs9IHllYXJzICogMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIGNvbnRhaW5lci5maW5kKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMClcbiAgICAuYXR0cignZGF0YS1hZGRyZXNzJywgaW5kZXgpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIHllYXJzID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1hZGRyZXNzJyksIDEwKTtcblxuICAgICAgICBpZighdikge1xuICAgICAgICAgICAgdiA9MDtcbiAgICAgICAgICAgICQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKS52YWwoMClcbiAgICAgICAgfVxuICAgICAgICBpZigheWVhcnMpIHllYXJzID0gMDtcblxuICAgICAgICBpZih5ZWFycyl7XG4gICAgICAgICAgICB2ICs9IHllYXJzICogMTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZih2IDwgMjQpe1xuICAgICAgICAgICAgYWRkQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICB9KVxufS8vLy8vIGZ1bi4gY2hlY2tBZGRyZXNzTGVuZ3RoXG5cbmZ1bmN0aW9uIGFkZEFkZHJlc3MobmV4dElkKXtcbiAgICBpZihuZXh0SWQgPj0gNSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID49IG5leHRJZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHNlY3Rpb24gPSAkKCcjcHJlQWRkcmVzcycpO1xuICAgIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4ID0gbmV4dElkO1xuICAgIHZhciBhZGRyZXNzID0gJChfYXBwR2xvYmFsLmFkZHJlc3NUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjXFx9KS9nLCBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCkpO1xuXG4gICAgYWRkcmVzcy5maW5kKCcuY2MtZmllbGQuY2MtdG8tYmUtdmFsaWRhdGUnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICBmaWxsU3RhdGVEcm9wZG93biggYWRkcmVzcy5maW5kKCcuc3RhdGUtZHJvcGRvd24nKSApOyAvLy8vIGZ1bi4gaW4gbWFpbi5qc1xuXG4gICAgYWRkcmVzcy5maW5kKCdpbnB1dC5udW1iZXJzJykub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpO1xuXG4gICAgY2hlY2tBZGRyZXNzTGVuZ3RoKGFkZHJlc3MsIF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4KTtcblxuICAgIHNlY3Rpb24uYXBwZW5kKGFkZHJlc3MpLnNob3coKTtcbiAgICBhZGRBdXRvQWRkcmVzcyhfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIGFkZHJlc3Muc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHNlY3Rpb24gPSAkKCcjcHJlQWRkcmVzcycpO1xuICAgIGZvcih2YXIgeCA9IGlkUmVtb3ZlOyB4PD1fYXBwR2xvYmFsLmFkZHJlc3NJbmRleDsgeCsrKXtcbiAgICAgICAgdmFyIGFkZHJlc3MgPSBzZWN0aW9uLmZpbmQoJyNhZGRyZXNzXycgKyB4KTtcblxuICAgICAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgIC8vIGFkZHJlc3MucmVtb3ZlKCk7XG4gICAgICAgIGFkZHJlc3Muc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG4gICAgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXggPSBpZFJlbW92ZS0xO1xuICAgIGlmKF9hcHBHbG9iYWwuYWRkcmVzc0luZGV4IDw9IDEpIHNlY3Rpb24uc2xpZGVVcCgpXG59XG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGNvQm9ycm93ZXJSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBjb0JvcnJvd2VyUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2NvQm9ycm93ZXJGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXggd2lsbCB0cmFjayB0aGUgbnVtYmVyIG9mIGFkZHJlc3MgYWRkZWQgYW5kIHN0b3AgaWYgdG90YWwgb2YgNCBhZGRyZXNzXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5hZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgICAgIF9hcHBHbG9iYWwuYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5zc24nKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFNTTilcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgY28tYm9ycm93ZXIgbGl2ZSBpbiBkaWZmZXJlbnQgYWRkcmVzc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1jb19saXZlc2FtZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoJCh0aGlzKS52YWwoKSA9PT0gJ3llcycpe1xuXG4gICAgICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZVVwKClcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNjLXZhbGlkYXRlJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QgbWVzc2FnZScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICQoJyNwcmVBZGRyZXNzJykuc2xpZGVVcCgpLmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICQoJyNhZGRyZXNzRGl2Jykuc2xpZGVEb3duKClcbiAgICAgICAgICAgICAgICAuZmluZCgnLmNjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG5cbiAgICAgICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgobXlGb3JtKTsgLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJhY2sgYnV0dG9uIGNsaWNrIGhhbmRsZXJzXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGNlKXtcbiAgICAgICAgICAgIGhpc3RvcnkuYmFjaygpO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGVjayBmb3IgYWRkcmVzcyBsZW5ndGggY2hhbmdlXG4gICAgICAgICAqIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG4gICAgICAgICAqL1xuICAgICAgICBjaGVja0FkZHJlc3NMZW5ndGgobXlGb3JtLCBfYXBwR2xvYmFsLmFkZHJlc3NJbmRleCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogdXBkYXRlIGNvLWJvcnJvd2VyIG5hbWUgaW4gc3ViIHRpdGxlc1xuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG5hbWVIb2xkZXIgPSAkKCcuY29Cb3Jyb3dlck5hbWUnKTtcbiAgICAgICAgJCgnI2NvX2ZuYW1lJykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJC50cmltKCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICAgICAgICBuYW1lSG9sZGVyLnRleHQoIHZhbCA/IHZhbCA6ICdDby1Cb3Jyb3dlcicpO1xuICAgICAgICB9KVxuICAgIH07Ly8vLyBjb0JvcnJvd2VyUmVhZHlcbn0pKCk7XG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KHB1cmNoYXNlUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gcHVyY2hhc2VSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjcHVyY2hhc2VGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgcmVhbCBzdGF0ZSBhZ2VudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV91c2luZ2FnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICB2YXIgYWdlbnQgPSAkKCcjYWdlbnRDb250YWN0Jyk7XG4gICAgICAgICAgICB2YXIgYWdlbnRGaWVsZHMgPSAkKCcjYWdlbnRGaWVsZHMnKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FnZW50Q29udGFjdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicjYWdlbnRGaWVsZHMsICNhZ2VudENvbnRhY3QnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7Ly8vLy8gb24uY2hhbmdlXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgY29udGFjdCBhZ2VudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1wdV9jb250YWN0YWdlbnRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FnZW50RmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FnZW50RmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBwcm9wZXJ0eVxuICAgICAgICAgKi9cbiAgICAgICAgJCgnI3B1X3NlYXJjaHR5cGVwdXJjaGFzZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpc1Byb3BlcnR5ID0gU3RyaW5nKCczNCcpLnNwbGl0KCcnKS5pbmRleE9mKHZhbCkgPiAtMTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNQcm9wZXJ0eSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eS1maWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnByb3BlcnR5LWZpZWxkcywgI3N1Yk5hbWUsICNjbG9zaW5nRGF0ZSwgI21vbnRobHlIT0EnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSwgLmNjLXRvLWJlLXZhbGlkYXRlLXN1YiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcsIC5jYy10by1iZS12YWxpZGF0ZS1IT0EnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pOy8vLyBvbi5jaGFuZ2VcblxuICAgICAgICAvKipcbiAgICAgICAgICogY2hlY2sgaWYgSE9BIGR1ZXNcbiAgICAgICAgICovXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cHVfaGF2ZWNsb3NpbmdkYXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjbG9zaW5nRGF0ZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjbG9zaW5nRGF0ZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXB1X21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXN1Yid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9Oy8vLy8gcHVyY2hhc2VSZWFkeVxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShyZWZpbmFuY2VSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiByZWZpbmFuY2VSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjcmVmaW5hbmNlRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuc3NuJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkaW5nIGdvb2dsZSBhZGRyZXNzIHR5cGUgYWhlYWRcbiAgICAgICAgICovXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX3Byb3BlcnR5cmVmaW5hbmNpbmddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ25vJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicub3RoZXJBZGRyZXNzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBjaGVjayBpZiBIT0EgZHVlc1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9wbGFubmVkdW5pdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfZm9yc2FsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjZGF0ZU9mZk1hcmtldCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjZGF0ZU9mZk1hcmtldCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9zdWJqZWN0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjb25zdHJ1Y3Rpb25CcmllZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfaXN0aXRsZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3RydXN0QnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3RydXN0QnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9cmZfbWFudWZhY3R1cmVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX2hhdmVNb3J0Z2FnZTFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmZpcnN0TW9ydGdhZ2UnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlLCAuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSwgLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnRnYWdlMiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1yZl9zZWNtb3J0Z2FnZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQsICNhZGRpdGlvbmFsTGllbnMnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTIsIC5jYy10by1iZS12YWxpZGF0ZS1jbCwgLmNjLXRvLWJlLXZhbGlkYXRlLWxpbmUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPXJmX21vcnRnYWdlMkxPQ10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jcmVkaXQtbGltaXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9YXNfYWRkaXRpb25hbGxpZW5zXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZGRpdGlvbmFsTGllbnMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1saWVuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07Ly8vLyBib3Jyb3dlclJlYWR5XG59KSgpOyIsIi8qKlxuICogQmVsb3cgZ2xvYmFsIHZhcmlhYmxlcyBhcmUgc2hhcmVkIHdpdGggY28tYm9ycm93ZXIgaW5jb21lIHBhZ2UgMDYtY28taW5jb21lLmpzXG4gKiBfYXBwR2xvYmFsLmVtcGxveWVyVGVtcGxhdGUsIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCwgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXI7XG4gKiBfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZSwgX2FwcEdsb2JhbC5yZW50SW5kZXgsIF9hcHBHbG9iYWwucmVudHNIb2xkZXIsIF9hcHBHbG9iYWwucmVudHNBcnJheTtcbiAqL1xuXG5cbihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGJvSW5jb21lUmVhZHkpO1xuXG5cbiAgICBmdW5jdGlvbiBib0luY29tZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNib0luY29tZUZvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llclRlbXBsYXRlID0gJCgnI2VtcGxveWVyVG1wbHQnKS50ZXh0KCk7XG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IDE7XG4gICAgICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJzSG9sZGVyID0gJCgnI2VtcGxveWVyc0hvbGRlcicpO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtfYXBwR2xvYmFsLnJlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudFRlbXBsYXRlID0gJCgnI3JlbnRUbXBsdCcpLnRleHQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIHJlbnQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50SW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50c0hvbGRlciB0aGUgZGl2IHdoZXJlIHJlbnQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0hvbGRlciA9ICQoJyNyZW50c0hvbGRlcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggcmVudCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyByZW50cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgcmVudCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIHJlbnQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlUmVudHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNBcnJheSA9IFtdO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGVtcGxveWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MobXlJbmRleCk7XG4gICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUobXlJbmRleCk7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSBteUluZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciByZW50IHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1yZV9hZGRyZXNzXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ3JlX2FkZHJlc3MnKVsxXSwgMTApO1xuXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxMDAgKyBteUluZGV4KTtcblxuICAgICAgICAgICAgX2FwcEdsb2JhbC5yZW50SW5kZXggPSBteUluZGV4O1xuICAgICAgICAgICAgX2FwcEdsb2JhbC5yZW50c0FycmF5LnB1c2goX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuXG4gICAgICAgICAgICBiaW5kUmVudE1vcnRnYWdlKG15SWQpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWUyXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKDEpO1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZW1wbG95bWVudCwgLnByZUVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSwgLmNjLXRvLWJlLXZhbGlkYXRlLXByZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBpZihfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPiAxKXtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW1wbG95ZXIoMik7IC8vLyB3aWxsIHRha2UgY2FyZSBvZiB0aGUgcmVzdCBvZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lM10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2VsZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDUpXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWxmJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZidcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lNF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYWRkaXRpb25hbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDYpXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5hZGRpdGlvbmFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lNV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0aXJlbWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXRpcmVtZW50LCAucmV0LTQwMSwgLnJldC1pcmEsIC5yZXQtcGVuLCAucmV0LWFubnVpdHknLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50LCBjYy10by1iZS12YWxpZGF0ZS1hbm51aXR5LCBjYy10by1iZS12YWxpZGF0ZS1wZW4sIGNjLXRvLWJlLXZhbGlkYXRlLWlyYSwgY2MtdG8tYmUtdmFsaWRhdGUtNDAxJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1oYXZlXzQwMV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXQtNDAxJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtNDAxJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0LTQwMScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLTQwMSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aGF2ZV9pcmFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LWlyYScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWlyYSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXQtaXJhJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtaXJhJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1oYXZlX3Blbl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXQtcGVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcGVuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldC1wZW4nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1wZW4nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWhhdmVfYW5udWl0eV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXQtYW5udWl0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFubnVpdHknfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0LWFubnVpdHknLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hbm51aXR5J1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zc24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZGl2aWRlbmQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lOV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVudGFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQWRkIG5ldyBwcm9wZXJ0eSBpZiB0aGUgcHJvcGVydHkgY291bnQgaXMgMFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVSZW50KF9hcHBHbG9iYWwucmVudHNBcnJheVtfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICB9KVxuXG4gICAgfTsvLy8vIGJvcnJvd2VyUmVhZHlcbn0pKCk7XG5cblxuZnVuY3Rpb24gYmluZEVtcGxveW1lbnREYXRlKGluZGV4KXtcblxuICAgIHZhciBmaWVsZHMgPSAkKCdpbnB1dC5zdGFydERhdGUnICsgaW5kZXggKyAnLCBpbnB1dC5lbmREYXRlJyArIGluZGV4KTtcbiAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLm1zaWUgPyAna2V5dXAnIDogJ2NoYW5nZSc7IC8vLyBjaGFuZ2UgaXMgbm90IGZpcmluZyBvbiBJRSAhISFcbiAgICBmaWVsZHMuZWFjaChmdW5jdGlvbigpe1xuXG4gICAgICAgICQodGhpcylcbiAgICAgICAgLm9mZihldmVudE5hbWUsIGNoZWNrRW1wbG95bWVudERhdGUpXG4gICAgICAgIC5vbihldmVudE5hbWUsIGNoZWNrRW1wbG95bWVudERhdGUpO1xuICAgIH0pXG4gICAgLy8gZmllbGRzLm9mZignY2hhbmdlJywgY2hlY2tFbXBsb3ltZW50RGF0ZSlcbn0vLy8vLyBmdW4uIGJpbmRFbXBsb3ltZW50RGF0ZVxuXG5mdW5jdGlvbiBhZGRFbXBsb3llcihpbmRleCl7XG4gICAgLyoqXG4gICAgICogTGltaXQgdG8gNCBwcmV2aW91cyBlbXBsb3llcnNcbiAgICAgKi9cbiAgICBpZihpbmRleCA+IDQpIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIEVtcGxveWVycyBzaG91bGQgYmUgYWRkZWQgaW4gaW5jcmVhc2luZyBpbmRleFxuICAgICAqL1xuICAgIGlmKGluZGV4IDwgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgZW1wbG95ZXIgd2l0aCBpbmRleCBpcyBhbHJlYWR5IGFkZGVkIGRvIG5vdGhpbmdcbiAgICAgKi9cbiAgICBpZigkKCcjZW1wbG95ZXJfJyArIGluZGV4KS5sZW5ndGggPiAwKXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IGluZGV4O1xuXG4gICAgdmFyIGVtcGxveWVyID0gJChfYXBwR2xvYmFsLmVtcGxveWVyVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KSk7XG5cbiAgICBmaWxsU3RhdGVEcm9wZG93biggZW1wbG95ZXIuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIHllc05vUmFkaW8oZW1wbG95ZXIpO1xuICAgIGRyb3Bkb3duTGFiZWwoZW1wbG95ZXIpO1xuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICBfYXBwR2xvYmFsLmVtcGxveWVyc0hvbGRlci5hcHBlbmQoZW1wbG95ZXIpO1xuXG4gICAgYWRkQXV0b0FkZHJlc3MoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KTtcbiAgICBiaW5kRW1wbG95bWVudERhdGUoX2FwcEdsb2JhbC5lbXBsb3llckluZGV4KTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICBlbXBsb3llci5zbGlkZURvd24oKTtcbn0vLy8vIGZ1bi4gYWRkRW1wbG95ZXJcblxuZnVuY3Rpb24gcmVtb3ZlRW1wbG95ZXIocmVtb3ZlSW5kZXgpe1xuXG4gICAgaWYocmVtb3ZlSW5kZXggPD0gMSkgcmV0dXJuO1xuICAgIC8vIGlmKHJlbW92ZUluZGV4ID4gNCkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PXJlbW92ZUluZGV4OyB4PD1fYXBwR2xvYmFsLmVtcGxveWVySW5kZXg7IHgrKyl7XG4gICAgICAgICQoJyNlbXBsb3llcl8nICsgeCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykuZGV0YWNoKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIF9hcHBHbG9iYWwuZW1wbG95ZXJJbmRleCA9IHJlbW92ZUluZGV4IC0gMTtcbn1cblxuZnVuY3Rpb24gY2hlY2tFbXBsb3ltZW50RGF0ZShldil7XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBlbmQgZGF0ZSBhbmQgYWRkIHByZXZpb3VzIGpvYiBpZiBhcHBsaWNhYmxlXG4gICAgICovXG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIHZhciBlbmREYXRlRmllbGQgPSAkKCcuZW5kRGF0ZScraW5kZXgpLmVxKDApO1xuICAgIHZhciBzdGFydERhdGVGaWVsZCA9ICQoJy5zdGFydERhdGUnK2luZGV4KS5lcSgwKTtcbiAgICB2YXIgZW5kRGF0ZSwgc3RhcnREYXRlO1xuXG4gICAgaWYoZW5kRGF0ZUZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZW5kRGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZihzdGFydERhdGVGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgdmFyIGRhdGVTcGxpdCA9IHN0YXJ0RGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihlbmREYXRlIDw9IHN0YXJ0RGF0ZSl7XG4gICAgICAgIGVuZERhdGVGaWVsZC5hZGRFcnJvcignY2MtZGF0ZS1ndCcpLnNob3dFcnJvcigpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihlbmREYXRlIC0gc3RhcnREYXRlIDwgIDIgKiAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwICl7XG4gICAgICAgICAgICAvLyBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByZUVtcGxveW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1wcmUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkRW1wbG95ZXIoaW5kZXgrMSlcbiAgICAgICAgfS8vLy9cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKGluZGV4KzEpXG4gICAgICAgIH1cbiAgICB9Ly8vLyBlbHNlXG59Ly8vLyBmdW4uIGNoZWNrRW1wbHltZW50RGF0ZVxuXG5mdW5jdGlvbiBhZGRSZW50KCl7XG5cbiAgICBpZihfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgIF9hcHBHbG9iYWwucmVudEluZGV4Kys7XG4gICAgX2FwcEdsb2JhbC5yZW50c0FycmF5LnB1c2goX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuICAgIHZhciB0ZW1wbGF0ZSA9IF9hcHBHbG9iYWwucmVudFRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuXG4gICAgdmFyIGlkID0gX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aDtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAvKipcbiAgICAgKiBbYWRkcmVzc0luZGV4IGlzIHVzZWQgdG8gaGVscCBhZGQgYW5kIHRyYWNrIHRoZSBhZGRyZXNzIGZpZWxkcyBmb3IgdHlwZSBhaGVhZCBhZGRyZXNzIGZ1bmN0aW9uYWxpdHldXG4gICAgICogMTAwICsgaXMgYWRkZWQgdG8gZGlmZmVyZW50aWF0ZSB0aGUgcmVudCBwcm9wZXJ0eSBhZGRyZXNzIGZpZWxkcyBmcm9tIGVtcGxveWVyIGFkZHJlc3MgZmllbGRzXG4gICAgICovXG4gICAgdmFyIGFkZHJlc3NJbmRleCA9IDEwMCArIF9hcHBHbG9iYWwucmVudEluZGV4O1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4UGx1c1xcfSkvZywgYWRkcmVzc0luZGV4KTtcblxuXG4gICAgdmFyIHJlbnQgPSAkKHRlbXBsYXRlKTtcblxuICAgIHJlbnQuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgIH0pO1xuXG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIHJlbnQuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIC8qKlxuICAgICAqIFNldCB5ZXMvbm8gcmFkaW8gYnV0dG9uIGJlaGF2aW9yXG4gICAgICovXG4gICAgeWVzTm9SYWRpbyhyZW50KTtcbiAgICBkcm9wZG93bkxhYmVsKHJlbnQpO1xuXG5cblxuICAgIC8qKlxuICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICovXG4gICAgcmVudC5maW5kKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICByZW50LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIuYXBwZW5kKHJlbnQpO1xuXG4gICAgcmVudC5zbGlkZURvd24oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtb3J0Z2FnZSB5ZXMvbm8gYWN0aW9uXG4gICAgICovXG4gICAgYmluZFJlbnRNb3J0Z2FnZShpZCk7XG5cbiAgICBhZGRBdXRvQWRkcmVzcyhhZGRyZXNzSW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gYWRkUmVudFxuXG5mdW5jdGlvbiByZW1vdmVSZW50KHJlbW92ZUluZGV4KXtcbiAgICB2YXIgcG9zaXRpb24gPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAkKCcjcHJvcGVydHlfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIF9hcHBHbG9iYWwucmVudHNBcnJheS5zcGxpY2UocG9zaXRpb24sIDEpO1xuXG4gICAgdXBkYXRlUmVudHNGaWVsZHMoKTtcblxuICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xufS8vLy8gZnVuLiByZW1vdmVSZW50XG5cbi8qKlxuICogW3VwZGF0ZVJlbnRzRmllbGRzIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbnQgcHJvcGVydHkgbmFtZSBhbmQgaWQgaXMgYWx3YXlzIGluIHNlcmllcyBvZiAxLDIsMyw0LC4uLi5dXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRSZW50IGFuZCByZW1vdmVSZW50XG4gKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUmVudHNGaWVsZHMoKXtcbiAgICB2YXIgbGltaXQgPSBfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoO1xuICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwucmVudHNBcnJheVt4XTtcblxuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcblxuICAgICAgICByZW50RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0vLy8vIGZvciB4XG59Ly8vLyBmdW4uIHVwZGF0ZVJlbnRzRmllbGRzXG5cbi8qKlxuICogW3VwZGF0ZVJlbnRDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBwcm9wZXJ0eV1cbiAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkUmVudCBhbmQgcmVtb3ZlUmVudFxuICovXG5mdW5jdGlvbiB1cGRhdGVSZW50Q2xvc2VCdG4oKXtcbiAgICBpZihfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwucmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5yZW50c0FycmF5WzBdO1xuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcbiAgICAgICAgcmVudERpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgIH1cblxuICAgIGlmKF9hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgIC8vICQoJyNhZGRSZW50UHJvcGVydHknKS5hdHRyKHsnZGlzYWJsZWQnOnRydWV9KS5jc3MoeydvcGFjaXR5JzowLjV9KTtcbiAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmhpZGUoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgLy8gJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmF0dHIoeydkaXNhYmxlZCc6ZmFsc2V9KS5jc3MoeydvcGFjaXR5JzoxfSk7XG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgfVxuXG59Ly8vLyBmdW4uIHVwZGF0ZVJlbnRDbG9zZUJ0blxuXG5mdW5jdGlvbiBiaW5kUmVudE1vcnRnYWdlKGluZGV4KXtcbiAgICAkKCdpbnB1dC5tb3J0Z2FnZVJhZGlvJytpbmRleCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBteUluZGV4ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIHZhciBteVZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgbXlWYWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2UnK215SW5kZXgsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQnK215SW5kZXh9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2UnK215SW5kZXgsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQnK215SW5kZXh9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcbn0vLy8vIGZ1bi4gYmluZFJlbnRNb3J0Z2FnZSIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGNvSW5jb21lUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gY29JbmNvbWVSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjY29JbmNvbWVGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCZWxvdyBnbG9iYWwgdmFyaWFibGVzIGRlZmluZWQgaW4gMDUtaW5jb21lLmpzXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVyVGVtcGxhdGUgPSAkKCcjZW1wbG95ZXJUbXBsdCcpLnRleHQoKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llckluZGV4ID0gMTtcbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIgPSAkKCcjZW1wbG95ZXJzSG9sZGVyJyk7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50VGVtcGxhdGUgPSAkKCcjcmVudFRtcGx0JykudGV4dCgpO1xuICAgICAgICAvKipcbiAgICAgICAgICogW19hcHBHbG9iYWwucmVudEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIHJlbnQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50SW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50c0hvbGRlciB0aGUgZGl2IHdoZXJlIHJlbnQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5yZW50c0hvbGRlciA9ICQoJyNyZW50c0hvbGRlcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5yZW50c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggcmVudCBwcm9wZXJ0eSBpbmRleFxuICAgICAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyByZW50cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgcmVudCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIHJlbnQgaGFzIGluZGV4IG9mIDZcbiAgICAgICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlUmVudHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNBcnJheSA9IFtdO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGVtcGxveWVyc1xuICAgICAgICAgKi9cbiAgICAgICAgX2FwcEdsb2JhbC5lbXBsb3llcnNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MobXlJbmRleCk7XG4gICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUobXlJbmRleCk7XG4gICAgICAgICAgICBfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPSBteUluZGV4O1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciByZW50IHByb3BlcnRpZXNcbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwucmVudHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1yZV9jb19hZGRyZXNzXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ3JlX2NvX2FkZHJlc3MnKVsxXSwgMTApO1xuXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxMDAgKyBteUluZGV4KTtcblxuICAgICAgICAgICAgX2FwcEdsb2JhbC5yZW50SW5kZXggPSBteUluZGV4O1xuICAgICAgICAgICAgX2FwcEdsb2JhbC5yZW50c0FycmF5LnB1c2goX2FwcEdsb2JhbC5yZW50SW5kZXgpO1xuXG4gICAgICAgICAgICBiaW5kUmVudE1vcnRnYWdlKG15SWQpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICAgICAqL1xuICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWUyXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKDEpO1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZW1wbG95bWVudCwgLnByZUVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSwgLmNjLXRvLWJlLXZhbGlkYXRlLXByZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBpZihfYXBwR2xvYmFsLmVtcGxveWVySW5kZXggPiAxKXtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRW1wbG95ZXIoMik7IC8vLyB3aWxsIHRha2UgY2FyZSBvZiB0aGUgcmVzdCBvZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lM10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2VsZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDUpXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWxmJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZidcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYWRkaXRpb25hbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDYpXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5hZGRpdGlvbmFsJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0aXJlbWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXRpcmVtZW50LCAucmV0LTQwMSwgLnJldC1pcmEsIC5yZXQtcGVuLCAucmV0LWFubnVpdHknLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50LCBjYy10by1iZS12YWxpZGF0ZS1hbm51aXR5LCBjYy10by1iZS12YWxpZGF0ZS1wZW4sIGNjLXRvLWJlLXZhbGlkYXRlLWlyYSwgY2MtdG8tYmUtdmFsaWRhdGUtNDAxJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1jb19oYXZlXzQwMV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXQtNDAxJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtNDAxJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0LTQwMScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLTQwMSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9Y29faGF2ZV9pcmFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0LWlyYScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWlyYSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXQtaXJhJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtaXJhJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1jb19oYXZlX3Blbl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXQtcGVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcGVuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH0vLy8vIGlmXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldC1wZW4nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1wZW4nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWNvX2hhdmVfYW5udWl0eV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXQtYW5udWl0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFubnVpdHknfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0LWFubnVpdHknLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hbm51aXR5J1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zc24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ1xuICAgICAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZGl2aWRlbmQnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lOV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZW50YWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5yZW50c0FycmF5Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZW50YWwnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLnJlbnRzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQoX2FwcEdsb2JhbC5yZW50c0FycmF5W19hcHBHbG9iYWwucmVudHNBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgICAgIH0vLy8gd2hpbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgIH0pXG5cbiAgICB9Oy8vLy8gY29JbmNvbWVSZWFkeVxufSkoKTtcbiIsIi8qKlxuICogR2xvYmFsIHZhcmlhYmxlcyBmb3IgdGhpcyBwYWdlXG4gKiB2YXIgX2FwcEdsb2JhbC5hc3NldFRlbXBsYXRlLCBfYXBwR2xvYmFsLmFzc2V0SW5kZXgsIF9hcHBHbG9iYWwuYXNzZXRzSG9sZGVyLCBfYXBwR2xvYmFsLmFzc2V0c0FycmF5O1xuICogdmFyIF9hcHBHbG9iYWwuZXN0YXRlVGVtcGxhdGUsIF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgsIF9hcHBHbG9iYWwuZXN0YXRlc0hvbGRlciwgX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXk7XG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICAkKGRvY3VtZW50KS5yZWFkeShhc3NldHNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBhc3NldHNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjYXNzZXRzRm9ybScpO1xuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW3JlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRUZW1wbGF0ZSA9ICQoJyNhc3NldFRtcGx0JykudGV4dCgpO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZVRlbXBsYXRlID0gJCgnI2VzdGF0ZVRtcGx0JykudGV4dCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hc3NldEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIGFzc2V0IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRJbmRleCA9IDA7XG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlSW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIgdGhlIGRpdiB3aGVyZSBhc3NldCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlciA9ICQoJyNhc3NldHNIb2xkZXInKTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzSG9sZGVyID0gJCgnI2VzdGF0ZUhvbGRlcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbX2FwcEdsb2JhbC5hc3NldHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGFzc2V0IHByb3BlcnR5IGluZGV4XG4gICAgICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIGFzc2V0cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgYXNzZXQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCBhc3NldCBoYXMgaW5kZXggb2YgNlxuICAgICAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVhc3NldHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkgPSBbXTtcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkgPSBbXTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGFzc2V0XG4gICAgICAgICAqL1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePWFzX2JhbmtdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnYXNfYmFuaycpWzFdLCAxMCk7XG5cblxuICAgICAgICAgICAgX2FwcEdsb2JhbC5hc3NldEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkucHVzaChfYXBwR2xvYmFsLmFzc2V0SW5kZXgpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQXNzZXQoaSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlQXNzZXRDbG9zZUJ0bigpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgYWRkQXNzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2FkZEFub3RoZXJFc3RhdGUnKVxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGFkZEVzdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWFzX2Fzc2V0c10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERlbGF5IGFkZGluZyBmb3Igc21vb3RoIHNsaWQgZG93biBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgKiBhbmQgYWRkIHRoZSAgZmlyc3QgYXNzZXRzIGZpZWxkcyBvbmx5IGlmIG5vIGFzc2V0cyBpcyBhZGRlZCBvciBwcmUtbG9hZGVkIGluIGZvcm1cbiAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICAgIGlmKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGFkZEFzc2V0KCk7XG4gICAgICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYXNzZXRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAnbm8nKXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBSZW1vdmUgYWxsIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICB3aGlsZShfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWRUb1JlbW92ZSA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhc3NldF8nICsgaWRUb1JlbW92ZSkuc2xpZGVVcChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hc3NldHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkudHJpZ2dlcignY2hhbmdlJyk7XG5cblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxyZWFsZXN0YXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIERlbGF5IGFkZGluZyBmb3Igc21vb3RoIHNsaWQgZG93biBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgKiBBZGQgdGhlIGZpcnN0IGVzdGF0ZSBvbmx5IGlmIG5vIGVzdGF0ZXMgaXMgYWRkIG9yIHByZS1sb2FkZWQgaW5zaWRlIHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIGFkZEVzdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ25vJyl7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogUmVtb3ZlIGFsbCBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgd2hpbGUoX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZFRvUmVtb3ZlID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNlc3RhdGVfJyArIGlkVG9SZW1vdmUpLnNsaWRlVXAoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfS8vLyB3aGlsZVxuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cblxuICAgIH07Ly8vLyBib3Jyb3dlclJlYWR5XG5cblxuXG4gICAgZnVuY3Rpb24gYWRkQXNzZXQoKXtcblxuICAgICAgICBpZihfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldEluZGV4Kys7XG4gICAgICAgIF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkucHVzaChfYXBwR2xvYmFsLmFzc2V0SW5kZXgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBfYXBwR2xvYmFsLmFzc2V0VGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBfYXBwR2xvYmFsLmFzc2V0SW5kZXgpO1xuXG4gICAgICAgIHZhciBpZCA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoO1xuICAgICAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAgICAgdmFyIGFzc2V0ID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICAgICAgYXNzZXQuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZUFzc2V0KGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgICAgICovXG5cbiAgICAgICAgYXNzZXQuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgICAgIGRyb3Bkb3duTGFiZWwoYXNzZXQpO1xuXG5cbiAgICAgICAgX2FwcEdsb2JhbC5hc3NldHNIb2xkZXIuYXBwZW5kKGFzc2V0KTtcblxuICAgICAgICBhc3NldC5zbGlkZURvd24oKTtcblxuICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVBc3NldChyZW1vdmVJbmRleCl7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAgICAgJCgnI2Fzc2V0XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfYXBwR2xvYmFsLmFzc2V0c0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICAgICAgdXBkYXRlQXNzZXRzRmllbGRzKCk7XG5cbiAgICAgICAgdXBkYXRlQXNzZXRDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gcmVtb3ZlQXNzZXRcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVBc3NldHNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgYXNzZXQgbmFtZSBhbmQgaWQgaXMgYWx3YXlzIGluIHNlcmllcyBvZiAxLDIsMyw0LC4uLi5dXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkQXNzZXQgYW5kIHJlbW92ZUFzc2V0XG4gICAgICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4gICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVBc3NldHNGaWVsZHMoKXtcbiAgICAgICAgdmFyIGxpbWl0ID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheVt4XTtcblxuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuXG4gICAgICAgICAgICBhc3NldERpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7bmFtZTpuZXdOYW1lLCBpZDpuZXdOYW1lfSk7XG4gICAgICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfS8vLy8gZm9yIHhcbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0c0ZpZWxkc1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogW3VwZGF0ZUFzc2V0c0Nsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIGFzc2V0XVxuICAgIC8vICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkQXNzZXQgYW5kIHJlbW92ZUFzc2V0XG4gICAgLy8gICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQXNzZXRDbG9zZUJ0bigpe1xuXG4gICAgICAgIGlmKF9hcHBHbG9iYWwuYXNzZXRzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfYXBwR2xvYmFsLmFzc2V0c0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5hc3NldHNBcnJheVswXTtcbiAgICAgICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihfYXBwR2xvYmFsLmFzc2V0c0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyQXNzZXQnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyQXNzZXQnKS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgIH0vLy8vIGZ1bi4gdXBkYXRlQXNzZXRDbG9zZUJ0blxuXG5cbiAgICBmdW5jdGlvbiBhZGRFc3RhdGUoKXtcblxuICAgICAgICBpZihfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgICAgIF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgrKztcbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkucHVzaChfYXBwR2xvYmFsLmVzdGF0ZUluZGV4KTtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gX2FwcEdsb2JhbC5lc3RhdGVUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIF9hcHBHbG9iYWwuZXN0YXRlSW5kZXgpO1xuXG4gICAgICAgIHZhciBpZCA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgICAgIHZhciBlc3RhdGUgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBlc3RhdGUuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZUVzdGF0ZShpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGVzdGF0ZS5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgX2FwcEdsb2JhbC5lc3RhdGVzSG9sZGVyLmFwcGVuZChlc3RhdGUpO1xuXG4gICAgICAgIGRyb3Bkb3duTGFiZWwoZXN0YXRlKTtcbiAgICAgICAgeWVzTm9SYWRpbyhlc3RhdGUpO1xuICAgICAgICBmaWxsU3RhdGVEcm9wZG93bihlc3RhdGUpO1xuICAgICAgICBhZGRBdXRvQWRkcmVzcyhfYXBwR2xvYmFsLmVzdGF0ZUluZGV4LCB0cnVlKTsgLy8vIHRydWUgaXMgdG8gZm9yY2UgdGhlIGxhYmVsIHRvIHN0YXJ0IGZyb20gMSwgZGVmYXVsdCAxIHdpbGwgYmUgaWdub3JlZFxuICAgICAgICBiaW5kRXN0YXRlTW9ydGdhZ2UoX2FwcEdsb2JhbC5lc3RhdGVJbmRleCk7XG5cbiAgICAgICAgZXN0YXRlLnNsaWRlRG93bigpO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFc3RhdGUocmVtb3ZlSW5kZXgpe1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5pbmRleE9mKHJlbW92ZUluZGV4KTtcblxuICAgICAgICAkKCcjZXN0YXRlXycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5zcGxpY2UocG9zaXRpb24sIDEpO1xuXG4gICAgICAgIHVwZGF0ZUVzdGF0ZXNGaWVsZHMoKTtcblxuICAgICAgICB1cGRhdGVFc3RhdGVDbG9zZUJ0bigpO1xuICAgIH0vLy8vIGZ1bi4gcmVtb3ZlQXNzZXRcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVFc3RhdGVzRmllbGRzIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIEVzdGF0ZSBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRFc3RhdGUgYW5kIHJlbW92ZUVzdGF0ZVxuICAgICAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlRXN0YXRlc0ZpZWxkcygpe1xuICAgICAgICB2YXIgbGltaXQgPSBfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXlbeF07XG5cbiAgICAgICAgICAgIHZhciBlc3RhdGVEaXYgPSAkKCcjZXN0YXRlXycraW5kZXgpO1xuXG4gICAgICAgICAgICBlc3RhdGVEaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0vLy8vIGZvciB4XG4gICAgfS8vLy8gZnVuLiB1cGRhdGVlc3RhdGVzRmllbGRzXG5cbiAgICAvKipcbiAgICAgKiBbdXBkYXRlRXN0YXRlc0Nsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIEVzdGF0ZV1cbiAgICAgKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZEVzdGF0ZSBhbmQgcmVtb3ZlRXN0YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlRXN0YXRlQ2xvc2VCdG4oKXtcblxuICAgICAgICBpZihfYXBwR2xvYmFsLmVzdGF0ZXNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF9hcHBHbG9iYWwuZXN0YXRlc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGVzdGF0ZURpdiA9ICQoJyNlc3RhdGVfJytpbmRleCk7XG4gICAgICAgICAgICBlc3RhdGVEaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgZXN0YXRlRGl2ID0gJCgnI2VzdGF0ZV8nK2luZGV4KTtcbiAgICAgICAgICAgIGVzdGF0ZURpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoX2FwcEdsb2JhbC5lc3RhdGVzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJFc3RhdGUnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyRXN0YXRlJykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZUVzdGF0ZUNsb3NlQnRuXG5cbiAgICBmdW5jdGlvbiBiaW5kRXN0YXRlTW9ydGdhZ2UoaW5kZXgpe1xuICAgICAgICAkKCdpbnB1dC5tb3J0Z2FnZVJhZGlvJytpbmRleCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBteUluZGV4ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgICB2YXIgbXlWYWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXlJbmRleCwgbXlWYWwpXG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIG15VmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfS8vLy8gZnVuLiBiaW5kRXNhdGVNb3J0Z2FnZVxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGxpYWJpbGl0aWVzUmVhZHkpO1xuICAgIHZhciBsaWFiaWxpdHlUZW1wbGF0ZSwgbGlhYmlsaXR5SW5kZXgsIGxpYWJpbGl0aWVzSG9sZGVyLCBsaWFiaWxpdGllc0FycmF5O1xuXG4gICAgZnVuY3Rpb24gbGlhYmlsaXRpZXNSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjbGlhYmlsaXRpZXNGb3JtJyk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbcmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAgICAgKi9cbiAgICAgICAgbGlhYmlsaXR5VGVtcGxhdGUgPSAkKCcjbGlhYmlsaXR5VG1wbHQnKS50ZXh0KCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbbGlhYmlsaXR5SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgYXNzZXQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgbGlhYmlsaXR5SW5kZXggPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbbGlhYmlsaXRpZXNIb2xkZXIgdGhlIGRpdiB3aGVyZSBhc3NldCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdGllc0hvbGRlciA9ICQoJyNsaWFiaWxpdGllc0hvbGRlcicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbbGlhYmlsaXRpZXNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGFzc2V0IHByb3BlcnR5IGluZGV4XG4gICAgICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIGFzc2V0cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgYXNzZXQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCBhc3NldCBoYXMgaW5kZXggb2YgNlxuICAgICAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcyBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbGlhYmlsaXRpZXNBcnJheSA9IFtdO1xuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGFzc2V0XG4gICAgICAgICAqL1xuICAgICAgICBsaWFiaWxpdGllc0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePWxpX2NyZWRpdG9yXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ2xpX2NyZWRpdG9yJylbMV0sIDEwKTtcblxuXG4gICAgICAgICAgICBsaWFiaWxpdHlJbmRleCA9IG15SW5kZXg7XG4gICAgICAgICAgICBsaWFiaWxpdGllc0FycmF5LnB1c2gobGlhYmlsaXR5SW5kZXgpO1xuXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTGlhYmlsaXR5KGkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1oYXZlX2xpYWJpbGl0aWVzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmxpYWJpbGl0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpYWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoIDwgMSkgYWRkTGlhYmlsaXR5KCk7XG4gICAgICAgICAgICB9Ly8vLyBpZlxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICdubycpe1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmxpYWJpbGl0eScsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpYWInXG4gICAgICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgd2hpbGUobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpID0gbGlhYmlsaXRpZXNBcnJheS5wb3AobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggLTEgKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xpYWJpbGl0eV8nK2xpKS5zbGlkZVVwKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0vLy8vIHdpbGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5JylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGFkZExpYWJpbGl0eSgpO1xuXG4gICAgICAgIH0pO1xuXG5cbiAgICB9Oy8vLy8gbGlhYmlsaXRpZXNSZWFkeVxuXG5cblxuICAgIGZ1bmN0aW9uIGFkZExpYWJpbGl0eSgpe1xuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgICAgICBsaWFiaWxpdHlJbmRleCsrO1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5LnB1c2gobGlhYmlsaXR5SW5kZXgpO1xuICAgICAgICB2YXIgdGVtcGxhdGUgPSBsaWFiaWxpdHlUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIGxpYWJpbGl0eUluZGV4KTtcblxuICAgICAgICB2YXIgaWQgPSBsaWFiaWxpdGllc0FycmF5Lmxlbmd0aDtcbiAgICAgICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgICAgIHZhciBsaWFiaWxpdHkgPSAkKHRlbXBsYXRlKTtcblxuICAgICAgICBsaWFiaWxpdHkuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZUxpYWJpbGl0eShpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICAgICAqL1xuXG4gICAgICAgIGxpYWJpbGl0eS5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAgICAgeWVzTm9SYWRpbyhsaWFiaWxpdHkpO1xuICAgICAgICBkcm9wZG93bkxhYmVsKGxpYWJpbGl0eSk7XG5cblxuICAgICAgICBsaWFiaWxpdGllc0hvbGRlci5hcHBlbmQobGlhYmlsaXR5KTtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBsaWFiaWxpdHkuc2xpZGVEb3duKCk7XG4gICAgICAgIH0sIDIwMClcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiBhZGRSZW50XG5cbiAgICBmdW5jdGlvbiByZW1vdmVMaWFiaWxpdHkocmVtb3ZlSW5kZXgpe1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBsaWFiaWxpdGllc0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgICAgICQoJyNsaWFiaWxpdHlfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgICAgICB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcygpO1xuXG4gICAgICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG4gICAgfS8vLy8gZnVuLiByZW1vdmVMaWFiaWxpdHlcblxuICAgIC8qKlxuICAgICAqIFt1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAgICAgKiB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBpbiBhZGRMaWFiaWxpdHkgYW5kIHJlbW92ZUxpYWJpbGl0eVxuICAgICAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMoKXtcbiAgICAgICAgdmFyIGxpbWl0ID0gbGlhYmlsaXRpZXNBcnJheS5sZW5ndGg7XG4gICAgICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgICAgIGZvcih2YXIgeD0wOyB4PGxpbWl0OyB4Kyspe1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVt4XTtcblxuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcblxuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnaW5wdXQnKS5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gJCgnbGFiZWxbZm9yPScgKyBuYW1lICsgJ10nKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0vLy8vIGZvciB4XG4gICAgfS8vLy8gZnVuLiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkc1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogW3VwZGF0ZUFzc2V0c0Nsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIGFzc2V0XVxuICAgIC8vICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbiAgICAvLyAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpe1xuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBsaWFiaWxpdGllc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjbGlhYmlsaXR5XycraW5kZXgpO1xuICAgICAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAgICAgJCgnI2FkZEFub3RoZXJMaWFiaWxpdHknKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5Jykuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICB9Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0Q2xvc2VCdG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZGVjbGFyYXRpb25zUmVhZHkpO1xuXG4gICAgZnVuY3Rpb24gZGVjbGFyYXRpb25zUmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2RlY2xhcmF0aW9uc0Zvcm0nKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgICAgICQoJ2lucHV0W25hbWU9ZGVfb3duZXJzaGlwXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ2lucHV0W25hbWU9b3Rfd29ya2luZ3dpdGhdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3llZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3llZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9jaXRpemVuXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ25vJyl7XG4gICAgICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXNpZGVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXNpZGVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnaW5wdXRbbmFtZT1kZV9icHJpbWFyeV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm93bmVyc2hpcCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vd25lcnNoaXAsIC5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cblxuICAgIH07Ly8vLyBkZWNsYXJhdGlvbnNSZWFkeVxufSkoKTtcblxuXG5cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoY29EZWNsYXJhdGlvbnNSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBjb0RlY2xhcmF0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNjb0RlY2xhcmF0aW9uc0Zvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAkKCdpbnB1dFtuYW1lPWRlX2NvX2NpdGl6ZW5dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAnbm8nKXtcbiAgICAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFsaWVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFsaWVuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfTsvLy8vIGNvRGVjbGFyYXRpb25zUmVhZHlcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZ292ZXJubWVudFJlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGdvdmVybm1lbnRSZWFkeSgpe1xuXG4gICAgICAgIHZhciBteUZvcm0gPSAkKCcjZ292Rm9ybScpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgICAgICovXG4gICAgICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgICAgICovXG4gICAgICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgICAgICB9KVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgICAgICovXG5cbiAgICAgICAgJCgnaW5wdXQucGhvbmUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAgICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAgICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICB9Oy8vLy8gZ292ZXJubWVudFJlYWR5XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGFja1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGFja1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNhY2tGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBhY2tSZWFkeVxufSkoKTtcblxuXG5cblxuIiwiKGZ1bmN0aW9uKCl7XG4gICAgJChkb2N1bWVudCkucmVhZHkoZWRpc2Nsb3N1cmVSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBlZGlzY2xvc3VyZVJlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNlZGlzY2xvc3VyZUZvcm0nKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICAgICAqL1xuICAgICAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuXG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAvKipcbiAgICAgICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICAgICAqL1xuICAgICAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgfTsvLy8vIGVkaXNjbG9zdXJlUmVhZHlcbn0pKCk7XG5cblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGluc3RydWN0aW9uc1JlYWR5KTtcblxuICAgIGZ1bmN0aW9uIGluc3RydWN0aW9uc1JlYWR5KCl7XG5cbiAgICAgICAgdmFyIG15Rm9ybSA9ICQoJyNpbnN0cnVjdGlvbnNGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICovXG4gICAgICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIH0pXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAgICAgKi9cblxuICAgICAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgICAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAgICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIH07Ly8vLyBpbnN0cnVjdGlvbnNSZWFkeVxufSkoKTtcblxuXG5cbiIsIihmdW5jdGlvbigpe1xuICAgICQoZG9jdW1lbnQpLnJlYWR5KGRlcG9zaXRSZWFkeSk7XG5cbiAgICBmdW5jdGlvbiBkZXBvc2l0UmVhZHkoKXtcblxuICAgICAgICB2YXIgbXlGb3JtID0gJCgnI2RlcG9zaXRGb3JtJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAgICAgKi9cbiAgICAgICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cblxuICAgICAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGhvbGQgY3JlZGl0IGNhcmQgdHlwZSBhZnRlciBkZXRlY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIHZhciBjYXJkVHlwZTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICAgICAqL1xuICAgICAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICAgICAgfSlcblxuICAgICAgICAvKipcbiAgICAgICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICAgICAqL1xuXG4gICAgICAgICQoJ2lucHV0LnBob25lJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgICAgICQoJ2lucHV0LmRhdGUnKVxuICAgICAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAgICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgICAgICAkKCdpbnB1dC5jYXJkZXhwaXJhdGlvbicpXG4gICAgICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAgICAgLm9uKCdrZXl1cCcsIGZvcm1hdENhcmREYXRlKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVkaXQgY2FyZCBmb3JtIGlzIG5vdCByZXF1aXJlZCBidXQgdXNlciBlbnRlciBhIHZhbHVlIGluIG9uZSBmaWxlZCB0aGUgZm9ybSBzaG91bGQgYmUgdmFsaWRhdGVkXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgY2NGaWxlZHMgPSAkKCcuY2MtZmllbGQuY2MtdG8tYmUtdmFsaWRhdGUgaW5wdXQnKS5vbigna2V5dXAgY2hhbmdlJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICAgICAgdmFyIGluY2x1ZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGNjRmlsZWRzLmVhY2goZnVuY3Rpb24obil7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA9IGluY2x1ZGUgfHwgJCh0aGlzKS52YWwoKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICAgIHJldHVybiAhaW5jbHVkZTsgLy8vLyBubyBuZWVkIHRvIGNvbnRpbnVlIC5lYWNoIGlmIGluY2x1ZGUgaXMgdHJ1ZVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09IGluY2x1ZGUpe1xuICAgICAgICAgICAgICAgIC8vLy8gY2MgZGF0YSBzaG91bGQgYmUgdmFsaWRhdGVcbiAgICAgICAgICAgICAgICBteUZvcm0uZmluZCgnLmNjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vLy8gbm8gZmllbGQgaGFzIGRhdGEsIHJlbW92ZSB2YWxpZGF0aW9uXG4gICAgICAgICAgICAgICAgbXlGb3JtLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICAgICAgICAgIHJlc2V0RmllbGRzKG15Rm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXRlY3QgY3JlZGl0IGNhcmQgdHlwZSBvbiBrZXl1cCBldmVudFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnaW5wdXQjY2NfY2FyZG51bWJlcicpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBkZXRlY3RDYXJkVHlwZSh2YWwpO1xuXG4gICAgICAgICAgICBpZih2YWwubGVuZ3RoID4zKXtcbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSAhIXR5cGUgKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZSAhPT0gY2FyZFR5cGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FyZFR5cGUgPSB0eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmNjLWNhcmRzIGxpJykuY3NzKCdvcGFjaXR5JywgMC40KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5jYy1jYXJkcyAuY2FyZC0nK2NhcmRUeXBlKS5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjYXJkVHlwZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmNjLWNhcmRzIGxpJykuY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cblxuICAgIH07Ly8vLyBkZXBvc2l0UmVhZHlcblxuICAgIC8qKlxuICAgICAqIFtkZXRlY3RDYXJkVHlwZSB3aWxsIHJldHVybiBjcmVkaXQgY2FyZCB0eXBlIGJhc2VkIG9uIFJlZ0V4IHRlc3RdXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBjb3BpZWQgZm9ybSBTYWNrT3ZlcmZsb3cuY29tIHBvc3RcbiAgICAgKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyNzY4L2hvdy1kby15b3UtZGV0ZWN0LWNyZWRpdC1jYXJkLXR5cGUtYmFzZWQtb24tbnVtYmVyXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGV0ZWN0Q2FyZFR5cGUobnVtYmVyKSB7XG4gICAgICAgIHZhciByZSA9IHtcbiAgICAgICAgICAgIHZpc2E6IC9eNFswLTldezEyfSg/OlswLTldezN9KT8kLyxcbiAgICAgICAgICAgIGVsZWN0cm9uOiAvXig0MDI2fDQxNzUwMHw0NDA1fDQ1MDh8NDg0NHw0OTEzfDQ5MTcpXFxkKyQvLFxuICAgICAgICAgICAgbWFlc3RybzogL14oNTAxOHw1MDIwfDUwMzh8NTYxMnw1ODkzfDYzMDR8Njc1OXw2NzYxfDY3NjJ8Njc2M3wwNjA0fDYzOTApXFxkKyQvLFxuICAgICAgICAgICAgZGFua29ydDogL14oNTAxOSlcXGQrJC8sXG4gICAgICAgICAgICBpbnRlcnBheW1lbnQ6IC9eKDYzNilcXGQrJC8sXG4gICAgICAgICAgICB1bmlvbnBheTogL14oNjJ8ODgpXFxkKyQvLFxuICAgICAgICAgICAgbWFzdGVyY2FyZDogL141WzEtNV1bMC05XXsxNH0kLyxcbiAgICAgICAgICAgIGFtZXg6IC9eM1s0N11bMC05XXsxM30kLyxcbiAgICAgICAgICAgIGRpbmVyczogL14zKD86MFswLTVdfFs2OF1bMC05XSlbMC05XXsxMX0kLyxcbiAgICAgICAgICAgIGRpc2NvdmVyOiAvXjYoPzowMTF8NVswLTldezJ9KVswLTldezEyfSQvLFxuICAgICAgICAgICAgamNiOiAvXig/OjIxMzF8MTgwMHwzNVxcZHszfSlcXGR7MTF9JC9cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHJlLmVsZWN0cm9uLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdFTEVDVFJPTic7XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFlc3Ryby50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnTUFFU1RSTyc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuZGFua29ydC50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnREFOS09SVCc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuaW50ZXJwYXltZW50LnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdJTlRFUlBBWU1FTlQnO1xuICAgICAgICB9IGVsc2UgaWYgKHJlLnVuaW9ucGF5LnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdVTklPTlBBWSc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUudmlzYS50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnVklTQSc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUubWFzdGVyY2FyZC50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnTUFTVEVSQ0FSRCc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuYW1leC50ZXN0KG51bWJlcikpIHtcbiAgICAgICAgICAgIHJldHVybiAnQU1FWCc7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuZGluZXJzLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdESU5FUlMnO1xuICAgICAgICB9IGVsc2UgaWYgKHJlLmRpc2NvdmVyLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdESVNDT1ZFUic7XG4gICAgICAgIH0gZWxzZSBpZiAocmUuamNiLnRlc3QobnVtYmVyKSkge1xuICAgICAgICAgICAgcmV0dXJuICdKQ0InO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
