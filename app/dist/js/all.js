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
    $.fn.ccSupport = function() {
        var self = this.find('.cc-support');


        if(self.length < 1) return;

        var panel = self.find('.cc-support-panel').eq(0);
        var popup = self.find('.cc-support-popup').eq(0);
        var btn = self.find('.btn').eq(0);
        var questions = panel.find('.cc-support-questions li');
        var activeQuestion = null;

        var fields = {};

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
                setTimeout(function(){
                    panel.addClass('expanded');
                    if(null !== activeQuestion){
                        questions.eq(activeQuestion).find('a').trigger('click');
                        activeQuestion = null;
                    }
                }, 300)
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

        panel.find('a.close').on('click', togglePanel);
        btn.on('click', togglePanel);
        popup.on('click', togglePanel);

        panel.find('.cc-support-questions li a').on('click', toggleQuestion);

        $('input, select, textarea').on('blur', hidePopup).on('focus', showPopup);


    };//// $.fn funcion
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
     * Back button click handlers
     */
    $('#back').on('click', function(ev){
        if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;
        history.back();
    })

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

$(document).ready(borrowerReady);
var addressTemplate;
var addressIndex;


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

/**
 * [addAutoAddress will add address type ahead functionality to text field with id 'bo_address']
 * @param {[type]} index [in multi-address case this variable will tel the function which address to bind the type ahead to]
 */
function addAutoAddress(index){
    var post = index >= 2 ? ''+index : '';

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
$(document).ready(coBorrowerReady);
var addressTemplate;
var addressIndex;

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
};//// borrowerReady

$(document).ready(purchaseReady);
var addressTemplate;
var addressIndex;

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
    })
};//// borrowerReady


$(document).ready(refinanceReady);
var addressTemplate;
var addressIndex;

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


$(document).ready(boIncomeReady);
var employerTemplate, employerIndex, employersHolder;
var rentTemplate, rentIndex, rentsHolder, rentsArray;
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
$(document).ready(coIncomeReady);
var employerTemplate, employerIndex, employersHolder;
var rentTemplate, rentIndex, rentsHolder, rentsArray;
function coIncomeReady(){

    var myForm = $('#coIncomeForm');
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

};//// borrowerReady

$(document).ready(assetsReady);
var assetTemplate, assetIndex, assetsHolder, assetsArray;

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
    /**
     * [assetIndex a variable to track the asset property inside the DOM
     * this variable work similar to auto increment field in data base and it is not related to fields name and fields id]
     * @type {Number}
     */
    assetIndex = 0;

    /**
     * [assetsHolder the div where asset properties will be appended]
     */
    assetsHolder = $('#assetsHolder');

    /**
     * [assetsArray will track the position of each asset property index
     * when user start adding and removing assets randomly this array will keep track of
     * e.g retnsArray = [4, 6] means the first asset has index of 4 and second asset has index of 6
     * the positions of this array elements will help enforce the fields names and ids to stay in sequence of 1,2,3,... with help of updateassetsFields function
     */
    assetsArray = [];

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

    addAutoAddress(7);


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


    $('input[name=as_additionalrealestate]').on('change', function(){
        var val = $(this).val();
        if(true === !!$(this).attr('checked') && val === 'yes'){
            includeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
        }
        else{
            excludeFields({selector:'.property, .mortgage7', validationClass:'.cc-to-be-validate, .cc-to-be-validate-mort7'}); //// function in main.js
        }
    });

    $('input.mortgageRadio7').on('change', function(){
        var val = $(this).val();
        if(true === !!$(this).attr('checked') && val === 'yes'){
            includeFields({selector:'.mortgage7', validationClass:'.cc-to-be-validate-mort7'}); //// function in main.js
        }
        else{
            excludeFields({selector:'.mortgage7', validationClass:'.cc-to-be-validate-mort7'}); //// function in main.js
        }
    })

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

// function bindassetMortgage(index){
//     $('input.mortgageRadio'+index).on('change', function(){
//         var myIndex = $(this).attr('data-index');
//         var myVal = $(this).val();
//         if(true === !!$(this).attr('checked') && myVal === 'yes'){
//             includeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
//         }
//         else{
//             excludeFields({selector:'.mortgage'+myIndex, validationClass:'.cc-to-be-validate-mort'+myIndex}); //// function in main.js
//         }
//     });
// }//// fun. bindRentMortgage
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


    // $('input[name=as_additionalrealestate]').on('change', function(){
    //     var val = $(this).val();
    //     if(true === !!$(this).attr('checked') && val === 'yes'){
    //         includeFields({selector:'.property', validationClass:'.cc-to-be-validate'}); //// function in main.js
    //     }
    //     else{
    //         excludeFields({selector:'.property, .mortgage7', validationClass:'.cc-to-be-validate, .cc-to-be-validate-mort7'}); //// function in main.js
    //     }
    // });

    // $('input.mortgageRadio7').on('change', function(){
    //     var val = $(this).val();
    //     if(true === !!$(this).attr('checked') && val === 'yes'){
    //         includeFields({selector:'.mortgage7', validationClass:'.cc-to-be-validate-mort7'}); //// function in main.js
    //     }
    //     else{
    //         excludeFields({selector:'.mortgage7', validationClass:'.cc-to-be-validate-mort7'}); //// function in main.js
    //     }
    // })

};//// borrowerReady



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

    yesNoRadio(liability)


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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwic3VwcG9ydC5qcyIsIm1haW4uanMiLCIwMS1ib3Jyb3dlci5qcyIsIjAyLWNvYm9ycm93ZXIuanMiLCIwMy1wdXJjaGFzZS5qcyIsIjA0LXJlZmluYW5jZS5qcyIsIjA1LWluY29tZS5qcyIsIjA2LWNvLWluY29tZS5qcyIsIjA3LWFzc2V0cy5qcyIsIjA4LWxpYWJpbGl0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOWdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzU3RhdGVzID0gW1xuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYWJhbWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQWxhc2thXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFyaXpvbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQXJrYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb2xvcmFkb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ09cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ1RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEZWxhd2FyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiREVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRENcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZNXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmxvcmlkYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRkxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkd1YW1cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkdVXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSGF3YWlpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJISVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklkYWhvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklsbGlub2lzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkluZGlhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklOXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW93YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJLYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktTXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2VudHVja3lcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJMQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1haW5lXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFyeWxhbmRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1EXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaWNoaWdhblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1OXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1TXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc291cmlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1PXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTW9udGFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZWJyYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXZhZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5WXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOSlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5NXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IFlvcmtcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5ZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5DXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJORFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPaGlvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9rbGFob21hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9yZWdvblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT1JcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQYWxhdVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUFdcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJSSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJTQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlROXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGV4YXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlRYXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVXRhaFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWZXJtb250XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1ZcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXaXNjb25zaW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV3lvbWluZ1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1lcIlxuICAgICAgfVxuICBdOyIsIihmdW5jdGlvbiggJCApIHtcbiAgICAkLmZuLnZhbGlkYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbHRlcignZm9ybScpO1xuICAgICAgICB2YXIgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgIGZvcm0ub2ZmKCdzdWJtaXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaXNGb3JtVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3JtLmZpbmQoJy5jYy1maWVsZC5jYy12YWxpZGF0ZScpLmVhY2goZnVuY3Rpb24obil7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHNlbGYudmFsaWRhdGVGaWVsZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy8vIGZhbHNlIGFuZCB0cnVlIHN0cmljdGx5IHRlc3QgYXMgbnVsbCB3aWxsIHJldHVybmVkIGlzIGZpZWxkIGlzIG5vdCB2YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICBpZihmYWxzZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gc2VsZi5maW5kKCdsYWJlbCcpLmVxKDApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmRXJyID0ge2ZpbGVkOmxhYmVsLnRleHQoKSwgaWQ6ZmllbGQuYXR0cignaWQnKSwgZXJyb3I6ZXJyfTtcbiAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpZWxkcy5wdXNoKGZFcnIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8vLyAuZWFjaFxuXG5cbiAgICAgICAgICAgIHZhciBleHRyYSA9IGNhbGxiYWNrKGlzRm9ybVZhbGlkLCBpbnZhbGlkRmllbGRzLmxlbmd0aCA+IDAgPyBpbnZhbGlkRmllbGRzIDogbnVsbCk7XG5cbiAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgISFleHRyYTtcblxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc0Zvcm1WYWxpZCl7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pOy8vLy8gLm9uIHN1Ym1pdFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgdmFyIGdldE15Q29udGFpbmVyID0gZnVuY3Rpb24oZmllbGQpe1xuICAgICAgICB2YXIgcCA9IGZpZWxkLnBhcmVudCgpO1xuICAgICAgICBpZih0cnVlID09PSBwLmhhc0NsYXNzKCdjYy1maWVsZCcpKXtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TXlDb250YWluZXIocCk7XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmdW4uIGdldE15Q29udGFpbmVyXG5cblxuICAgIHZhciBmaWVsZENoYW5nZWRBZnRlckVycm9yID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcigkKHRoaXMpKTtcbiAgICAgICAgY29udGFpbmVyLnZhbGlkYXRlRmllbGQoKVxuICAgIH1cblxuICAgICQuZm4udmFsaWRhdGVGaWVsZCA9IGZ1bmN0aW9uKHNlbGYpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBmID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCBpbnB1dFt0eXBlPVwidGVsXCJdLCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sIGlucHV0W3R5cGU9XCJkYXRlXCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICB2YXIgdiA9ICQudHJpbShmLnZhbCgpKTtcbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgaWYoIWVycikgZXJyID0ge307XG5cbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgaXNWYWxpZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1yZXF1aXJlZCcpKXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8vLyBoYW5kbGUgcmFkaW8gYnV0dG9uIGNhc2VcbiAgICAgICAgICAgIGlmKHR5cGUgJiYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykgKXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGYuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciByYWRpb3MgPSBzZWxmLmZpbmQoXCJpbnB1dFtuYW1lPVwiK25hbWUrXCJdXCIpO1xuICAgICAgICAgICAgICAgIHJhZGlvcy5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gISFyYWRpb3MuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmID0gcmFkaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlICYmIHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jyl7XG4gICAgICAgICAgICAgICAgaWYoZi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZi5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhZi5lcShyKS5hdHRyKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9Ly8vLyBpZiBMZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaWYodi5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHR5cGUgcmFkaW8gZWxzZVxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXJlcXVpcmVkJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8vIGlmIHYubGVuZ3RoXG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGNjLXJlcXVpcmVkXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtbnVtYmVyJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKFxcZCkrKFxcLlxcZCspPyQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLW51bWJlcicpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1udW1iZXInXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1lbWFpbCcpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1lbWFpbCcpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1lbWFpbCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlJykpe1xuXG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC87XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBtID0gc3BsaXRbMF0gPyBOdW1iZXIoc3BsaXRbMF0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHNwbGl0WzFdID8gTnVtYmVyKHNwbGl0WzFdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBzcGxpdFsyXSA/IE51bWJlcihzcGxpdFsyXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBtMzEgPSBbMSwgMywgNSwgNywgOCwgMTAsIDEyXTtcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighbSB8fCBtID4gMTIgfHwgbSA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0zMS5pbmRleE9mKG0pID49MCApe1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzEgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobSA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0geSAlIDQgPT0gMCA/IDI5IDogMjg7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiBfZCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWRhdGUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaGFzQ2xhc3MgY2MtZGF0ZVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAvLyB9XG5cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlIGNjLWRhdGUtZ3QnKSl7XG4gICAgICAgICAgICB2YXIgZ3RGaWVsZCA9ICQoJyMnK3NlbGYuYXR0cignZGF0YS1kYXRlLWd0JykpO1xuICAgICAgICAgICAgdmFyIGd0VmFsLCBzdGFydERhdGUsIGVuZERhdGU7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihndEZpZWxkLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlmKGd0RmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSBndEZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZW5kRGF0ZSA8IHN0YXJ0RGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBndEZpZWxkLmxlbmd0aCA+IDBcblxuICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUtZ3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlLWd0J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZS1ndCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBoYXNDbGFzcyBjYy1kYXRlLWd0XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcGhvbmUnKSl7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFwoXFxkezN9XFwpKCApP1xcZHszfVxcLVxcZHs0fSQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXBob25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcGhvbmUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWN1cnJlbmN5Jykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXCQ/KFxcZHsxLDN9KSsoXFwsKlxcZHszfSkqJC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY3VycmVuY3knKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jdXJyZW5jeSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXNzbicpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezN9KFxcLSk/XFxkezJ9KFxcLSk/XFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2Mtc3NuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2Mtc3NuJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXJlcXVpcmVkLW9uZS1vZicpKXtcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAkKCcuJytzZWxmLmF0dHIoJ2RhdGEtb25lLW9mLWNsYXNzJykgKyAnIGlucHV0Jyk7XG5cbiAgICAgICAgICAgIHZhciBfaXNWYWxpZCA9IGZhbHNlOyAvLy8vIGxvY2FsIGlzVmFsaWQgdmFyIHdpbGwgYmUgJiYgd2l0aCBpc1ZhbGlkXG4gICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICBfaXNWYWxpZCA9IF9pc1ZhbGlkIHx8ICEhJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBfaXNWYWxpZCkgcmV0dXJuIGZhbHNlOy8vLy8gc3RvcCBlYWNoIGlmIG9uZSBmaWxlZCBpcyBmb3VuZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIF9pc1ZhbGlkO1xuXG4gICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQtb25lLW9mJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG5cbiAgICAgICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIF9lcnIgPSAkKHRoaXMpLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgX2VyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG4gICAgICAgICAgICAgICAgICAgIC8vICQodGhpcykuZGF0YSgnZXJyJywgX2Vycik7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtcmVxdWlyZWQtb25lLW9mJykuaGlkZUVycm9yKCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGhhc0NsYXNzIGNjLXJlcXVpcmVkLW9uZS1vZlxuXG4gICAgICAgIC8vLy8gcmVzZXQgdGhlIGZpZWxkIGVycm9ycyBiZWZvcmUgYWRkaW5nIHRoZW0gYWdhaW5cbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXJyb3IgY29ycmVjdCBtZXNzYWdlJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmLmRhdGEoJ2lzVmFsaWQnLCBpc1ZhbGlkKTtcblxuICAgICAgICAvLy8vIGlmIGZpZWxkIHBhc3NlZCB0aHJvdWdoIHZhbGlkYXRpb24gc2hvdyBlcnJvciBpZiBhbnlcbiAgICAgICAgLy8gaWYodHJ1ZSA9PT0gaXNWYWxpZGF0ZWQgKXtcbiAgICAgICAgLy8gaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgaWYoZmFsc2UgPT0gaXNWYWxpZCB8fCBPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICAgICAgZi5zaG93RXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgZi5oaWRlRXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIH0vLy8vIGlmIGlzVmFsaWRhdGVkXG5cbiAgICB9Ly8vLyBmdW4uIHZhbGlkYXRlRmlsZFxuXG4gICAgJC5mbi5zaG93RXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gZi5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IodmFyIGUgaW4gZXJyKXtcbiAgICAgICAgICAgIHN0ci5wdXNoKGVycltlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2Vycm9yJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpO1xuXG4gICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpLm9uKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZihzdHIubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgdmFyIG1zZyA9ICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCIgaWQ9XCJlcnJvck1zZ1wiPjxpIGNsYXNzPVwiaWNvbi1lcnJvciBnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZS1zaWduXCI+PC9pPiAnICsgc3RyLmpvaW4oJyB8ICcpICsgJzwvZGl2PicpLnNob3coKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQobXNnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnbWVzc2FnZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfS8vLy8gZnVuLiBzaG93RXJyb3JcblxuICAgICQuZm4uaGlkZUVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZpbHRlcignaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lcSgwKTtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG5cbiAgICAgICAgLy8gY29udGFpbmVyLmFkZENsYXNzKCdjb3JyZWN0Jyk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3IgbWVzc2FnZScpO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLmFkZEVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmaWVsZCk7XG5cbiAgICAgICAgdmFyIG1zZyA9IGNvbnRhaW5lci5maW5kKCcubWVzc2FnZS4nK2Vycm9yQ2xhc3MpLmVxKDApLnRleHQoKTtcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSBlcnIgPSB7fTtcblxuICAgICAgICBlcnJbZXJyb3JDbGFzc10gPSBtc2c7XG5cbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgJC5mbi5yZW1vdmVFcnJvciA9IGZ1bmN0aW9uKGVycm9yQ2xhc3MpIHtcblxuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgaWYoIWVycikgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgZGVsZXRlIGVycltlcnJvckNsYXNzXTtcbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG59KCBqUXVlcnkgKSk7IiwiKGZ1bmN0aW9uKCAkICkge1xuICAgICQuZm4uY2NTdXBwb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcy5maW5kKCcuY2Mtc3VwcG9ydCcpO1xuXG5cbiAgICAgICAgaWYoc2VsZi5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHBhbmVsID0gc2VsZi5maW5kKCcuY2Mtc3VwcG9ydC1wYW5lbCcpLmVxKDApO1xuICAgICAgICB2YXIgcG9wdXAgPSBzZWxmLmZpbmQoJy5jYy1zdXBwb3J0LXBvcHVwJykuZXEoMCk7XG4gICAgICAgIHZhciBidG4gPSBzZWxmLmZpbmQoJy5idG4nKS5lcSgwKTtcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHBhbmVsLmZpbmQoJy5jYy1zdXBwb3J0LXF1ZXN0aW9ucyBsaScpO1xuICAgICAgICB2YXIgYWN0aXZlUXVlc3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHZhciBmaWVsZHMgPSB7fTtcblxuICAgICAgICBxdWVzdGlvbnMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignZm9yJyk7XG4gICAgICAgICAgICBpZih0cnVlID09PSAhIWlkKXtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge2luZGV4OngsIHE6JCh0aGlzKS5maW5kKCdhJykuZXEoMCkudGV4dCgpfTtcbiAgICAgICAgICAgICAgICBmaWVsZHNbaWRdID0gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgdmFyIHRvZ2dsZVBhbmVsID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYocGFuZWwuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpe1xuICAgICAgICAgICAgICAgIHBhbmVsLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25zLmZpbHRlcignLmV4cGFuZGVkJykucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgYnRuLnJlbW92ZUNsYXNzKCdvdXQnKVxuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgIH0vLy8vIGlmIGhhc0NhbHNzXG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGJ0bi5hZGRDbGFzcygnb3V0Jyk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBwYW5lbC5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobnVsbCAhPT0gYWN0aXZlUXVlc3Rpb24pe1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25zLmVxKGFjdGl2ZVF1ZXN0aW9uKS5maW5kKCdhJykudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVF1ZXN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgfS8vLyBpZiBoYXNDbGFzcyBlbHNlXG4gICAgICAgIH0vLy8vIGZ1bi4gdG9nZ2xlUGFuZWxcblxuICAgICAgICB2YXIgdG9nZ2xlUXVlc3Rpb24gPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoKTtcbiAgICAgICAgICAgIHZhciBpID0gcGFyZW50LmZpbmQoJ2knKTtcblxuICAgICAgICAgICAgaWYocGFyZW50Lmhhc0NsYXNzKCdleHBhbmRlZCcpKXtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgaS5hZGRDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVzdGlvbnMuZmlsdGVyKCcuZXhwYW5kZWQnKS5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKVxuICAgICAgICAgICAgICAgIC5maW5kKCdpJykuYWRkQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1yaWdodCcpLnJlbW92ZUNsYXNzKCdnbHlwaGljb24tdHJpYW5nbGUtYm90dG9tJyk7XG5cbiAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgIGkuYWRkQ2xhc3MoJ2dseXBoaWNvbi10cmlhbmdsZS1ib3R0b20nKS5yZW1vdmVDbGFzcygnZ2x5cGhpY29uLXRyaWFuZ2xlLXJpZ2h0Jyk7XG5cbiAgICAgICAgfS8vLy8gZnVuLiB0b2dnbGVRdWVzdGlvblxuXG4gICAgICAgIHZhciBzaG93UG9wdXAgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cignaWQnKTtcblxuICAgICAgICAgICAgaWYoaWQgaW4gZmllbGRzKXtcbiAgICAgICAgICAgICAgICBwb3B1cC5hZGRDbGFzcygndmlzaWJsZScpLnRleHQoZmllbGRzW2lkXS5xKTtcbiAgICAgICAgICAgICAgICBhY3RpdmVRdWVzdGlvbiA9IGZpZWxkc1tpZF0uaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGZ1bi5zaG93UG9wdXBcblxuICAgICAgICB2YXIgaGlkZVBvcHVwID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBwb3B1cC5yZW1vdmVDbGFzcygndmlzaWJsZScpLnRleHQoJycpO1xuICAgICAgICB9Ly8vLyBmdW4uc2hvd1BvcHVwXG5cbiAgICAgICAgcGFuZWwuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcbiAgICAgICAgYnRuLm9uKCdjbGljaycsIHRvZ2dsZVBhbmVsKTtcbiAgICAgICAgcG9wdXAub24oJ2NsaWNrJywgdG9nZ2xlUGFuZWwpO1xuXG4gICAgICAgIHBhbmVsLmZpbmQoJy5jYy1zdXBwb3J0LXF1ZXN0aW9ucyBsaSBhJykub24oJ2NsaWNrJywgdG9nZ2xlUXVlc3Rpb24pO1xuXG4gICAgICAgICQoJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJykub24oJ2JsdXInLCBoaWRlUG9wdXApLm9uKCdmb2N1cycsIHNob3dQb3B1cCk7XG5cblxuICAgIH07Ly8vLyAkLmZuIGZ1bmNpb25cbn0oIGpRdWVyeSApKTsiLCJ2YXIgX2FwcFZhcnMgPSB7fTtcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoY2NEb2N1bWVudFJlYWR5KTtcblxuZnVuY3Rpb24gY2NEb2N1bWVudFJlYWR5KCl7XG5cbiAgICAvKipcbiAgICAgKiBQcm9ncmVzcyBuYXZpZ2F0aW9uIG1vYmlsZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJyNwcm9ncmVzc19zd2l0Y2gnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIHByb2dyZXNzTmF2ID0gJCgnI3Byb2dyZXNzX25hdicpO1xuICAgICAgICB2YXIgaGFuZGxlUG9yZ3Jlc05hdkNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICh0cnVlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzTmF2LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYud2lkdGgoJzEwMCUnKTtcbiAgICAgICAgICAgICAgICAvLy8vIHVuYmluZCB3aGVuIG1lbnUgY2xvc2VkIG5vIG5lZWQgdG8gY2hlY2sgZm9yIGNsaWNrXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnVuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCg0MCk7IC8vIGNoYW5naW5nIHRoZSB3aWR0aCB0byBtYWtlIHRoZSBmaXJzdCBidXR0b24gb2YgcHJvZ3Jlc3MgYmFyIGNsaWNrYWJsZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogdGhlIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvIGJvZHkgc28gZG8gdGhlIHdvcmsgb24gYm9keSBjbGljayBcXCBvbmx5IGlmIG1lbnUgaXMgY2xvc2VkXG4gICAgICAgICAqIHRoaXMgdG8gbWFrZSBzdXJlIHRoZSBtZW51IGlzIGNsb3NlZCB3aGVuIGNsaWNrIG91dHNpZGUgdGhlIG1lbnVcbiAgICAgICAgICovXG4gICAgICAgIGlmIChmYWxzZSA9PT0gcHJvZ3Jlc3NOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcblxuICAgICAgICAgICAgJCgnYm9keScpLmJpbmQoJ2NsaWNrJywgaGFuZGxlUG9yZ3Jlc05hdkNsaWNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogSGFtYnVyZ2VyIG1lbnUgYnV0dG9uIG1vYmlsZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJyNtZW51X3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgbWVudU5hdiA9ICQoJyNtZW51X25hdicpO1xuICAgICAgICB2YXIgaGFuZGxlTWVudU5hdkNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICh0cnVlID09PSBtZW51TmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgbWVudU5hdi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZU1lbnVOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZW51TmF2LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZmFsc2UgPT09IG1lbnVOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICQoJ2JvZHknKS5iaW5kKCdjbGljaycsIGhhbmRsZU1lbnVOYXZDbGljayk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBzY3JvbGxpbmcgZXZlbnQgbGlzdGVuZXIgdG8gbWFrZSB0aGUgcHJvZ3Jlc3MgYmFyIHN0aWNreVxuICAgICAqL1xuICAgIC8vIGlmKCQoJ2JvZHknKS53aWR0aCgpIDwgNjc4KXtcbiAgICAgICAgJCh3aW5kb3cpLm9mZignc2Nyb2xsJykub24oJ3Njcm9sbCcsIG1haW5TY3JvbGwpO1xuICAgIC8vIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBzdGF0ZXMgZHJvcC1kb3duc1xuICAgICAqL1xuICAgICBmaWxsU3RhdGVEcm9wZG93biggJCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuXG4gICAgIC8qKlxuICAgICAgKiBTdGFydCBTdXBwb3J0XG4gICAgICAqL1xuICAgICAkKGRvY3VtZW50KS5jY1N1cHBvcnQoKTtcblxuXG4gICAgLyoqXG4gICAgICogRmxvYXQgbGFiZWwgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcuY2MtZmllbGQuZmxvYXQnKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBmaWVsZCA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT10ZXh0XScpLmVxKDApO1xuXG4gICAgICAgIHZhciB0cmlnZ2VyRXZlbnQgPSAna2V5dXAnO1xuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kcm9wZG93bicpKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudCA9ICdjaGFuZ2UnO1xuICAgICAgICB9XG5cbiAgICAgICAgZmllbGQub24odHJpZ2dlckV2ZW50LCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGZpZWxkLnZhbCgpKXtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZENsYXNzKCdlZGl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZWRpdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSk7Ly8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBNZXNzYWdlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnLmpzQ29sbGFwc2UnKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHNlbGYuZmluZCgnYS5jbG9zZSwgYS5kaXNtaXNzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5zbGlkZVVwKCdmYXN0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSk7Ly8vLyAuZWFjaFxuXG4gICAgLyoqXG4gICAgICogU2V0IHllcy9ubyByYWRpbyBidXR0b25cbiAgICAgKi9cbiAgICB5ZXNOb1JhZGlvKCk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgbXVsdGkgY2hlY2tib3hcbiAgICAgKi9cbiAgICBtdWx0aUNoZWNrYm94KCk7XG5cbiAgICAvKipcbiAgICAgKiBCYWNrIGJ1dHRvbiBjbGljayBoYW5kbGVyc1xuICAgICAqL1xuICAgICQoJyNiYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICB9KVxuXG59Ly8vLyBmdW4uIGNjRG9jdW1lbnRSZWFkeVxuXG5mdW5jdGlvbiBtYWluU2Nyb2xsKGUpe1xuICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgaWYoJCgnYm9keScpLndpZHRoKCkgPiA2NzgpIHJldHVybjtcblxuICAgIHZhciBzID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIHZhciBiYXIgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgaWYocyA+IDIwMCl7XG4gICAgICAgIGlmKGZhbHNlID09PSBiYXIuaGFzQ2xhc3MoJ2Zsb2F0Jykpe1xuICAgICAgICAgICAgYmFyLmFkZENsYXNzKCdmbG9hdCcpO1xuICAgICAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBiYXIuaGVpZ2h0KCkpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgYmFyLnJlbW92ZUNsYXNzKCdmbG9hdCcpO1xuICAgICAgICBiYXIucGFyZW50KCkuY3NzKCdwYWRkaW5nLWJvdHRvbScsIG51bGwpXG4gICAgfVxuXG59Ly8vLyBmdW4uIG1haW5TY3JvbGxcblxuXG5mdW5jdGlvbiB1cGRhdGVUYWJJbmRleChzZWxlY3Rvcil7XG4gIHZhciB4ID0gMDtcbiAgICBzZWxlY3Rvci5maW5kKCcuY2MtZmllbGQnKS5lYWNoKGZ1bmN0aW9uKGkpe1xuICAgICAgICB2YXIgcyA9ICQodGhpcykuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1lbWFpbF0sIGlucHV0W3R5cGU9ZGF0ZV0sIGlucHV0W3R5cGU9dGVsXSwgaW5wdXRbdHlwZT1yYWRpb10sIGlucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPW51bWJlcl0sIHRleHRhcmVhLCBzZWxlY3QnKVxuICAgICAgICBzLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgJCh0aGlzKS5hdHRyKCd0YWJpbmRleCcsIHgrMSk7XG4gICAgICAgICAgeCsrO1xuICAgICAgICB9KVxuICAgIH0pXG59Ly8vLyBmdW4uIHVwZGF0ZVRhYkluZGV4XG5cbi8qKlxuICogW3llc05vUmFkaW8gV2lsbCBzZXQgdGhlIGJlaGF2aW9yIG9mIHllcy9ubyByYWRpbyBidXR0b25zIGJ5IGFkZGluZyAuY2hlY2tlZCBjbGFzcyB0byB0aGUgbGFiZWwgb2YgdGhlIGJ1dHRvbl1cbiAqIHRoZSBmdW5jdGlvbiBhc3N1bWUgdGhlIGlucHV0W3R5cGU9cmFkaW9uXSBpcyBpbmNsdWRlZCBpbnNpZGUgPGxhYmVsPiB0YWdcbiAqL1xuZnVuY3Rpb24geWVzTm9SYWRpbyhjb250YWluZXIpe1xuICAvLy8vIGlmIGNvbnRhaW5lciBpcyBwYXNzZWQgZmluZCB0aGUgcmFkaW9zIGluc2lkZSBpdCBvciBkbyBhIGRvY3VtZW50IGdsb2JhbCBmaW5kXG4gIHZhciByYWRpb3MgPSAhIWNvbnRhaW5lciA/IGNvbnRhaW5lci5maW5kKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKSA6ICQoJy5yYWRpby15ZXNubyBpbnB1dFt0eXBlPXJhZGlvXScpO1xuICByYWRpb3Mub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICB9KVxuICAub24oJ2ZvY3VzJywgZnVuY3Rpb24oZSl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnZm9jdXMnKTtcbiAgfSlcbiAgLm9uKCdibHVyIGtpbGxmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNoYW5nZSB0byBzZXQgdGhlIHJpZ2h0IGFwcGVhcmFuY2Ugd2hlbiBmb3JtIGlzIHByZS1sb2FkZWQgd2l0aCBkYXRhXG4gICAqL1xuICByYWRpb3MudHJpZ2dlcignY2hhbmdlJyk7Ly8vLyB0aGlzIHRvIHNldCB0aGUgaW5pdGlhbCBzdGF0ZVxufVxuXG5mdW5jdGlvbiBtdWx0aUNoZWNrYm94KCl7XG4gIHZhciByYWRpb3MgPSAkKCcuY2MtY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgaWYoJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgLy8gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsYWJlbC5jaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2NoZWNrZWQnKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnaScpLmFkZENsYXNzKCdnbHlwaGljb24gZ2x5cGhpY29uLW9rJyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5yZW1vdmVDbGFzcygpO1xuICAgIH1cbiAgfSk7XG4gIC8qKlxuICAgKiBUcmlnZ2VyIGNoYW5nZSB0byBzZXQgdGhlIHJpZ2h0IGFwcGVhcmFuY2Ugd2hlbiBmb3JtIGlzIHByZS1sb2FkZWQgd2l0aCBkYXRhXG4gICAqL1xuICByYWRpb3MudHJpZ2dlcignY2hhbmdlJyk7XG59Ly8vLyBmdW4uIG11bHRpQ2hlY2tCb3hcblxuLyoqXG4gKiBbZmlsbFN0YXRlRHJvcGRvd24gd2lsbCBmaWxsIHRoZSBkcm9wZG9uIG9mIFVTQSBzdGF0ZXMgZm9ybSB1c1N0YXRlIHZhcmlhYmxlXVxuICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciBbalF1ZXJ5IG9iamVjdCB0aGF0IGNvbnRhaW4gPHNlbGVjdD4gdGFnIHRvIGJlIGZpbGxlZF1cbiAqIHVzU2F0ZSBpcyBhcnJheSBvZiBvYmplY3QgZGVmaW5lZCBpbiB1cy1zdGF0dXMuanMgZmlsZVxuICovXG5mdW5jdGlvbiBmaWxsU3RhdGVEcm9wZG93bihzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHVsID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKHZhciBzPTA7IHM8dXNTdGF0ZXMubGVuZ3RoOyBzKyspe1xuICAgICAgICAgICAgdmFyIGxpID0gJCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB1c1N0YXRlc1tzXS5hYmJyZXZpYXRpb24gKyAnXCI+JyArIHVzU3RhdGVzW3NdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgICAgICB9Ly8vLyBmb3JcbiAgICB9KTtcbn0vLy8vIGZ1bi4gZmlsbFN0YXRlRHJvcGRvd25cblxuLyoqXG4gKiBbaXNBbmRyb2lkIHNpbXBsZSBmdW5jdGlvbiB0byBkZXRlY3QgQW5kcm9pZCBPU11cbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlY3QgdGhlIGJ1ZyBpbiBBbmRyb2lkIHdoZW4ga2V5ZG93biwga2V5dXAgZXZlbnQgZG9lc24ndCBzZW5kIHRoZSByaWdodCBrZXkgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gW3RydWUgaWYgQW5kcm9pZCBPU11cbiAqL1xudmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn0vLy8vIGZ1bi4gaXNBbmRyb2lkXG5cblxudmFyIHJlc3RyaWN0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC0oKSBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDQ4LCA1NywgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJhd1ZhbHVlID0gdmFsLnNwbGl0KC9bXFwofFxcKXwgfFxcLXxcXCt8XFwuXS8pLmpvaW4oJycpO1xuICB2YXIgZm9ybWF0ZWQgPSAnJztcbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9ICcoJyArIHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnKSAnO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9IHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnLSc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBmb3JtYXRlZCArPSByYXdWYWx1ZTtcblxuICAkKHRoaXMpLnZhbChmb3JtYXRlZCk7XG59Ly8vLyBmdW4uIGZvcm1hdFBob25lXG5cbnZhciByZXN0cmljdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnLyddXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciByZXN0cmljdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC1cIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciBmb3JtYXRTU04gPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwtL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDMpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMykgKyAnLSc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDMpO1xuXG4gICAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLSc7XG4gICAgICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn1cblxudmFyIHJlc3RyaWN0TnVtYmVycyA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciByZXN0cmljdEN1cnJlbmN5ID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwJCxcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFs5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5oaWRlRXJyb3IoKTtcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdEN1cnJlbmN5ID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG5cbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwuc3BsaXQoL1tcXCR8IHxcXCxdLykuam9pbignJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+IDMpe1xuICAgICAgdmFyIGFyciA9IHJhdy5zcGxpdCgnJyk7XG4gICAgICB2YXIgc2VwID0gMTtcbiAgICAgIGZvcih2YXIgeD1hcnIubGVuZ3RoLTE7IHg+PTA7IHgtLSl7XG4gICAgICAgIC8vLy8gYWRkIHJlYWRpbmcgY29tbWEgYWZ0ZXIgMyBkaWdpdHMgYW5kIG9ubHkgaWYgdGhlcmUgaXMgbmV4dCBkaWdpdFxuICAgICAgICByZXQgPSAoc2VwICUgMyA9PSAwICYmIHRydWUgPT09ICEhYXJyW3gtMV0/ICcsJyA6ICcnKSArIGFyclt4XSAgKyByZXQ7XG4gICAgICAgIHNlcCsrO1xuICAgICAgfVxuICAgICAgcmV0ID0gJyQnICsgcmV0O1xuICB9XG4gIGVsc2UgaWYocmF3Lmxlbmd0aCA+IDApe1xuICAgIHJldCA9ICckJyArIHJhdztcbiAgfVxuICBlbHNle1xuICAgIHJldCA9IHJhdztcbiAgfVxuXG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLy8gZnVuLiBmb3JtYXRDdXJyZW5jeVxuXG52YXIgYW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uKHksIHRpbWUpe1xuXG4gICAgY2xlYXJJbnRlcnZhbChfYXBwVmFycy5zY3JvbGxJbnRlKTsvLy8vIHN0b3AgYW55c2Nyb2xsaW5nXG5cbiAgICBpZih1bmRlZmluZWQgPT09IHRpbWUpIHRpbWUgPSAxOy8vLy8gc2V0IGRlZmF1bHQgdmFsdWUgZm9yIHRpbWVcbiAgICB2YXIgZnBzID0gNjA7IC8vLy8gZnJhbWVzIHBlciBzZWNvbnNcbiAgICB2YXIgZnJhbWVUaW1lID0gTWF0aC5jZWlsKDEwMDAgLyBmcHMpO1xuICAgIHZhciBkID0gdGltZSAqIGZyYW1lVGltZTsgLy8vIG51bWJlciBvZiBmcmFtZXMgZHVyYXRpb25cbiAgICB2YXIgdCA9IDA7IC8vLy8gdGltZSB0aWNrZXIgLyBmcmFtZSBjb3VudGVyXG5cbiAgICAvLy8vIHNldCBiZWdpbiBwb2ludCB3aGloYyB0aGUgY3VycnJlbnQgcG9pbnRcbiAgICAvLyBiID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgOiB3aW5kb3cuc2Nyb2xsWTtcbiAgICB2YXIgYiA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IDA7XG4gICAgLy9cbiAgICBpZihiID09PSB1bmRlZmluZWQpe1xuICAgICAgICBiID0gMDtcbiAgICB9XG5cblxuICAgIC8vLy8gY2hlY2sgaWYgc2Nyb2xsaW5nIGRlc3RpbmF0aW9uIGlzIGJpZ2dlciB0aGFuIHBhZ2UgaGVpZ2h0IGxpbWl0c1xuICAgIHZhciBsaW1pdCA9IE1hdGgubWF4KCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICApO1xuICAgIGlmKHk+bGltaXQpe1xuICAgICAgICB5ID0gbGltaXQ7XG4gICAgfVxuXG4gICAgLy8vLyBzZXQgdGhlIGNoYW5nZSBiZXR3ZWVuIGN1cnJlbnQgYW5kIGRlc3RpbmF0aW9uIHBvaW50XG4gICAgYyA9IGIgLSB5O1xuXG4gICAgLy8vLyBkbyBub3RoaW5nIGlmIGRlc3RpbmF0aW9uIGlzIHNhbWUgYXMgY3VycmVudFxuICAgIGlmKE1hdGguYWJzKGMpIDwgMSkgcmV0dXJuO1xuXG4gICAgLy8vLyBzdGFydCB0aW1lIHRpY2tlclxuICAgIF9hcHBWYXJzLnNjcm9sbEludGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAvLy8gZWFzZSBvdXQgbWF0aFxuICAgICAgICB2YXIgcGVyID0gMSAtIHQvZDtcbiAgICAgICAgdmFyIG5ld1kgPSAgLWMgKiAoMS1wZXIqcGVyKnBlcipwZXIpICsgYjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+XCIsIDEtKDEtcGVyKSooMS1wZXIpKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG5ld1kpO1xuXG5cbiAgICAgICAgaWYodCA9PSBkKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2FwcFZhcnMuc2Nyb2xsSW50ZSk7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignYW5pbWF0ZVNjcm9sbEVuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHQrKztcblxuICAgIH0sIGZyYW1lVGltZSk7XG59Ly8vLyBmdW4uIGFuaW1hdGVTY3JvbGxcblxuLyoqXG4gKiBbcmVzZXRGaWVsZHMgd2lsbCBzZWFyY2ggZm9yIGlucHV0IGZpZWxkIGluc2lkZSBhIGNvbnRhaW5lciBhbmQgcmVzdCBpdHMgdmFsdWUgYW5kIGFueSBlcnJvciBzdGF0dXNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IGNvbnRhaW5lciBbalF1ZXlyIG9iamVjdCB0aGF0IHNob3VsZCBjb250YWluIGlucHV0IGZpbGVkIHRoYXQgbmVlZCBiZSByZXNldF1cbiAqL1xudmFyIHJlc2V0RmllbGRzID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgdmFyIGZpZWxkcyA9IGNvbnRhaW5lci5maW5kKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuXG4gIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgIHZhciB0eXBlID0gJCh0aGlzKS5hdHRyKCd0eXBlJyk7XG4gICAgaWYodHlwZSA9PT0gJ3JhZGlvJyl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmlsdGVyKCdsYWJlbCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAkKHRoaXMpLnZhbCgnJyk7XG4gICAgfVxuICAgICQodGhpcykuaGlkZUVycm9yKCk7XG4gIH0pO1xuXG59Ly8vLyBmdW4uIHJlc2V0RmllbGRzXG5cbi8qKlxuICogW2luY2x1ZGVGaWVsZHMgd2lsbCBhZGQgaGlkZGVuIGZpZWxkcyBpbiBmb3JtIGFuZCBzZXQgdGhlIHJpZ2h0IHZhbGlkYXRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgc2hvdWxkIGhhdmUgMiBwcm9wZXJ0aWVzIGFzIGJlbG93XG4gKiBvcHRpb25zLnNlbGVjdG9yIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBzZWxlY3QgdGhlIHNlY3Rpb24gbmVlZCB0byBiZSBpbmNsdWRlZCBlLmcuIFwiLm5ldy1maWVsZHNcIiwgXCIjY2xvZGluZ0RhdGVcIlxuICogb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIGlkZW50aWZ5IHRoZSAuY2MtZmllbGQgdGhhdCBuZWVkIHRvIGJlIGluY2x1ZGUgaW4gdmFsaWRhdGlvblxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xudmFyIGluY2x1ZGVGaWVsZHMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMuc2VsZWN0b3IgfHwgIW9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcyA9ICQob3B0aW9ucy5zZWxlY3Rvcik7XG4gIGZpZWxkcy5maW5kKG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgZmllbGRzLnNsaWRlRG93bigpO1xuXG59XG5cbi8qKlxuICogW2V4Y2x1ZGVGaWVsZHMgd2lsbCBleGNsdWRlIGZpZWxkcyBmcm9tIGZvcm0gYW5kIHNldCByZW1vdmUgdGhlIHZhbGlkYXRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgc2hvdWxkIGhhdmUgMiBwcm9wZXJ0aWVzIGFzIGJlbG93XG4gKiBvcHRpb25zLnNlbGVjdG9yIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBzZWxlY3QgdGhlIHNlY3Rpb24gbmVlZCB0byBiZSBleGNsdWRlZFxuICogb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIGlkZW50aWZ5IHRoZSAuY2MtZmllbGQgdGhhdCBuZWVkIHRvIGJlIGV4Y2x1ZGVkIGZyb20gdmFsaWRhdGlvblxuICovXG52YXIgZXhjbHVkZUZpZWxkcyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucy5zZWxlY3RvciB8fCAhb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpIHJldHVybiBmYWxzZTtcblxuICB2YXIgZmllbGRzID0gJChvcHRpb25zLnNlbGVjdG9yKTtcbiAgZmllbGRzLmZpbmQob3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpO1xuICByZXNldEZpZWxkcyhmaWVsZHMpO1xuICBmaWVsZHMuc2xpZGVVcCgpO1xuXG59XG4iLCIkKGRvY3VtZW50KS5yZWFkeShib3Jyb3dlclJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5cbmZ1bmN0aW9uIGJvcnJvd2VyUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjYm9ycm93ZXJGb3JtJyk7XG4gICAgLyoqXG4gICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsZCwgaW52YWxpZEZpZWxkcyl7XG5cbiAgICAgICAgaWYoaXNWYWxkKXtcblxuICAgICAgICAgICAgdmFyIGlzQ29Cb3Jyb3dlciA9ICBTdHJpbmcoJzIzNCcpLnNwbGl0KCcnKS5pbmRleE9mKCAkKCcjYm9fYXBwbHl0eXBlJykudmFsKCkgKSA+IC0xO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSBpc0NvQm9ycm93ZXIpe1xuICAgICAgICAgICAgICAgIG15Rm9ybS5hdHRyKCdhY3Rpb24nLCAnMDItY29ib3Jyb3dlci5odG1sJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfS8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvLy8vIGlmIHRoZSBmb3JtIGlzIG5vdCB2YWxpZCBhbmQgY29udGludWUgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRvIHRoZSBwYWdlIHRvIGZpcnN0IGZpZWxkIHdpdGggZXJyb3JcbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuXG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7ICAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy8vLyBpZiBpc1ZhbGlkIGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogZXZlbnQgaGFuZGxlcnMgYXJlIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5zc24nKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cblxuICAgICQoJyNib19ob3doZWFyJykub2ZmKCdjaGFuZ2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLDEwKTtcbiAgICAgICAgdmFyIGFyciA9IFsyLDMsNCw1XTtcbiAgICAgICAgaWYoYXJyLmluZGV4T2YodmFsKSA+IC0xKXtcbiAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAqL1xuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIGFkZHJlc3NJbmRleCk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgbnVtYmVyIG9mIGRlcGVuZGVudHMgY2hhbmdlIGFuZCBzaG93IGFnZXMgZmllbGRzXG4gICAgICovXG4gICAgJCgnI2JvX2RlcGVuZGFudHMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciBhZ2VzRGl2ID0gJCgnI2RlcGVuZGVudFNlY3Rpb24nKTtcbiAgICAgICAgdmFyIGNvbHMgPSBhZ2VzRGl2LmZpbmQoJy5jb2wteHMtNicpLmhpZGUoKTtcblxuICAgICAgICBpZih2ID4gMCl7XG4gICAgICAgICAgICBmb3IodmFyIHg9MDsgeDx2OyB4Kyspe1xuICAgICAgICAgICAgICAgIGNvbHMuZXEoeCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWdlc0Rpdi5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgYWdlc0Rpdi5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgY2hhbmdlIG9mIHJhZGlvIGJ1dHRvbiBjdXJyZW50IGFkZHJlc3Mgb3duL3JlbnRcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPWJvX2N1cnJlbnRseV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIHZhciByZW50Q29sID0gJCgnI21vbnRobHlSZW50Jyk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSByZW50Q29sLmZpbmQoJy5jYy1maWVsZCcpLmVxKDApO1xuICAgICAgICBpZih2YWwudG9Mb3dlckNhc2UoKSA9PT0gJ3JlbnQnKXtcbiAgICAgICAgICAgIHJlbnRDb2wucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW50Q29sLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBtZXNzYWdlIGVycm9yJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZXZlbnROYW1lID0gJC5icm93c2VyLnNhZmFyaT09PSB0cnVlID8gJ2JsdXInIDogJ2NoYW5nZSc7IC8vLy8gY2hhbmdlIGlzIG5vdCBmaXJlZCB3aGVuIGF1dG9maWxsIGlzIHVzZWQgb24gc2FmYXJpXG4gICAgJCgnI2JvX2VtYWlsJykub24oZXZlbnROYW1lLCBmdW5jdGlvbigpe1xuICAgICAgICAvKipcbiAgICAgICAgICogbWFrZSBzdXJlIGVtYWlsIGZpZWxkIGlzIHZhbGlkYXRlIGJlZm9yZSBkb2luZyBhbnkgY2hlY2tcbiAgICAgICAgICogaWQgI2VtYWlsRmllbGQgaXMgZ2l2ZW4gdG8gLmNjLWZpZWxkIGNvbnRhaW5lciBvZiBlbWFpbCBmaWVsZFxuICAgICAgICAgKi9cbiAgICAgICAgJCgnI2VtYWlsRmllbGQnKS52YWxpZGF0ZUZpZWxkKCk7XG5cbiAgICAgICAgdmFyIHZhbCA9ICQudHJpbSgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgdmFyIGlzVmFsaWQgPSAkKHRoaXMpLmRhdGEoJ2lzVmFsaWQnKTtcblxuICAgICAgICBpZih2YWwgJiYgdHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDpcImFwaS1yZXNwb25zZS9pcy1lbWFpbC1leGlzdHMuanNvblwiLFxuICAgICAgICAgICAgICAgIGRhdGE6e2VtYWlsOnZhbH0sXG4gICAgICAgICAgICAgICAgbWV0aG9kOlwicG9zdFwiLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOlwianNvblwiLFxuICAgICAgICAgICAgICAgIGVycm9yOmZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxvZ2luU2VjdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJldCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJldC5lbWFpbC50b0xvd2VyQ2FzZSgpID09IHZhbC50b0xvd2VyQ2FzZSgpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24ocmV0LmV4aXN0cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXQuZXhpc3RzID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjbG9naW5fZW1haWwnKS52YWwodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9Ly8vIGlmIHZhbFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKGZhbHNlKTtcbiAgICAgICAgfS8vLy8gbm90IHZhbFxuXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gYWRkcmVzc1xuICAgICAqL1xuICAgIGFkZEF1dG9BZGRyZXNzKDEpO1xuXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG5mdW5jdGlvbiB1cGRhdGVMb2dpblNlY3Rpb24oZW1haWxFeGlzdHMpe1xuICAgIGlmKHRydWUgPT09IGVtYWlsRXhpc3RzKSB7XG4gICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbG9naW5TZWN0aW9uJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2xvZ2luU2VjdGlvbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG59Ly8vLy8gZnVuLiB1cGRhdGVMb2dpblNlY3Rpb25cblxuXG5cbmZ1bmN0aW9uIGNoZWNrQWRkcmVzc0xlbmd0aChjb250YWluZXIsIGluZGV4KXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID4gMSA/ICcnK2luZGV4IDogJyc7XG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuXG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQoJy5hZGRyZXNzTGVuZ3RoWScgKyBwb3N0KS5lcSgwKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1hZGRyZXNzJyksIDEwKTtcbiAgICAgICAgaWYoIXYpIHYgPTA7XG4gICAgICAgIGlmKCF5ZWFycyl7XG4gICAgICAgICAgICB5ZWFycyA9IDA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cblxuICAgICAgICBpZih5ZWFycyl7XG4gICAgICAgICAgICB2ICs9IHllYXJzICogMTI7XG4gICAgICAgIH1cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIGNvbnRhaW5lci5maW5kKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMClcbiAgICAuYXR0cignZGF0YS1hZGRyZXNzJywgaW5kZXgpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIHllYXJzID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1hZGRyZXNzJyksIDEwKTtcblxuICAgICAgICBpZighdikge1xuICAgICAgICAgICAgdiA9MDtcbiAgICAgICAgICAgICQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKS52YWwoMClcbiAgICAgICAgfVxuICAgICAgICBpZigheWVhcnMpIHllYXJzID0gMDtcblxuICAgICAgICBpZih5ZWFycyl7XG4gICAgICAgICAgICB2ICs9IHllYXJzICogMTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZih2IDwgMjQpe1xuICAgICAgICAgICAgYWRkQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICB9KVxufS8vLy8vIGZ1bi4gY2hlY2tBZGRyZXNzTGVuZ3RoXG5cbmZ1bmN0aW9uIGFkZEFkZHJlc3MobmV4dElkKXtcbiAgICBpZihuZXh0SWQgPj0gNSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKGFkZHJlc3NJbmRleCA+PSBuZXh0SWQpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBhZGRyZXNzSW5kZXggPSBuZXh0SWQ7XG4gICAgdmFyIGFkZHJlc3MgPSAkKGFkZHJlc3NUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjXFx9KS9nLCBhZGRyZXNzSW5kZXgpKTtcblxuICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkLmNjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGFkZHJlc3MuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTsgLy8vLyBmdW4uIGluIG1haW4uanNcblxuICAgIGFkZHJlc3MuZmluZCgnaW5wdXQubnVtYmVycycpLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKTtcblxuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChhZGRyZXNzLCBhZGRyZXNzSW5kZXgpO1xuXG4gICAgc2VjdGlvbi5hcHBlbmQoYWRkcmVzcyk7XG4gICAgYWRkQXV0b0FkZHJlc3MoYWRkcmVzc0luZGV4KTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgc2VjdGlvbi5zbGlkZURvd24oKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWRkcmVzcyhpZFJlbW92ZSl7XG5cbiAgICBpZihpZFJlbW92ZSA8PTEpIHJldHVybiBmYWxzZTtcbiAgICBpZihpZFJlbW92ZSA+IGFkZHJlc3NJbmRleCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHNlY3Rpb24gPSAkKCcjcHJlQWRkcmVzcycpO1xuICAgIGZvcih2YXIgeCA9IGlkUmVtb3ZlOyB4PD1hZGRyZXNzSW5kZXg7IHgrKyl7XG4gICAgICAgIHZhciBhZGRyZXNzID0gc2VjdGlvbi5maW5kKCcjYWRkcmVzc18nICsgeCk7XG5cbiAgICAgICAgYWRkcmVzcy5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICBhZGRyZXNzLnJlbW92ZSgpO1xuICAgICAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIH1cbiAgICBhZGRyZXNzSW5kZXggPSBpZFJlbW92ZS0xO1xuICAgIGlmKGFkZHJlc3NJbmRleCA8PSAxKSBzZWN0aW9uLnNsaWRlVXAoKVxufVxuXG4vKipcbiAqIFthZGRBdXRvQWRkcmVzcyB3aWxsIGFkZCBhZGRyZXNzIHR5cGUgYWhlYWQgZnVuY3Rpb25hbGl0eSB0byB0ZXh0IGZpZWxkIHdpdGggaWQgJ2JvX2FkZHJlc3MnXVxuICogQHBhcmFtIHtbdHlwZV19IGluZGV4IFtpbiBtdWx0aS1hZGRyZXNzIGNhc2UgdGhpcyB2YXJpYWJsZSB3aWxsIHRlbCB0aGUgZnVuY3Rpb24gd2hpY2ggYWRkcmVzcyB0byBiaW5kIHRoZSB0eXBlIGFoZWFkIHRvXVxuICovXG5mdW5jdGlvbiBhZGRBdXRvQWRkcmVzcyhpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+PSAyID8gJycraW5kZXggOiAnJztcblxuICAgIHZhciBhdXRvY29tcGxldGUgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZShcbiAgICAgICAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvX2FkZHJlc3MnICsgcG9zdCksXG4gICAgICAgICQoJy50eXBlYWhlYWRfYWRkcmVzcycgKyBwb3N0KS5maWx0ZXIoJ2lucHV0JylbMF0sXG4gICAgICAgIHt0eXBlczogWydnZW9jb2RlJ119XG4gICAgKTtcbiAgICAvLy8vIHNldCB0aGUgYWRkcmVzcyBpbmRleCBhbmQgcG9zdCBpbiBhdXRvY29tcGxldGUgb2JqZWN0IHRvIGJlIHVzZWQgaW4gZmlsbEluQWRkcmVzcyBmdW5jdGlvblxuICAgIGF1dG9jb21wbGV0ZS5pbmRleCA9IDA7XG4gICAgYXV0b2NvbXBsZXRlLnBvc3QgPSBwb3N0O1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBzZWxlY3RzIGFuIGFkZHJlc3MgZnJvbSB0aGUgZHJvcGRvd24sIHBvcHVsYXRlIHRoZSBhZGRyZXNzXG4gICAgLy8gZmllbGRzIGluIHRoZSBmb3JtLlxuICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsIGZpbGxJbkFkZHJlc3MpO1xufVxuXG4vKipcbiAqIFtmaWxsSW5BZGRyZXNzIHdpbGwgdXBkYXRlIHRoZSBhZGRyZXNzIGNpdHksIHN0YXQsIGFuZCB6aXAgZmlsZWQgYWZ0ZXIgdXNlciBzZWxlY3QgYWRkcmVzcyBmb3JtIHR5cGUgYWhlYWRdXG4gKiB0aGlzIGluc2lkZSB0aGlzIGZ1bmN0aW9uIHdpbGwgcmVmZXJlbmNlIGdvb2dsZSBhdXRvY29tcGV0ZSBvYmplY3RcbiAqIEByZXR1cm4ge1tudWxsXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5mdW5jdGlvbiBmaWxsSW5BZGRyZXNzKCl7XG4gICAgLy8vLyB0aGlzIHJlZmVyIHRvIHRoZSBhdXRvIGNvbXBsZXRlIG9iamVjdFxuXG4gICAgdmFyIHBsYWNlID0gdGhpcy5nZXRQbGFjZSgpO1xuICAgIHZhciBjb21wb25lbnRGb3JtID0ge1xuICAgICAgICBzdHJlZXRfbnVtYmVyOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIHJvdXRlOiAnbG9uZ19uYW1lJyxcbiAgICAgICAgbG9jYWxpdHk6ICdsb25nX25hbWUnLFxuICAgICAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzE6ICdzaG9ydF9uYW1lJyxcbiAgICAgICAgY291bnRyeTogJ2xvbmdfbmFtZScsXG4gICAgICAgIHBvc3RhbF9jb2RlOiAnc2hvcnRfbmFtZSdcbiAgICB9O1xuXG4gICAgdmFyIGFkZHJlc3MgPSB7fTtcbiAgICB2YXIgbG9uZ19uYW1lID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR5cGUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbMF07XG4gICAgICAgIHZhciBhZGRyZXNzVHlwZSA9IHR5cGU7XG5cbiAgICAgIGlmIChjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXSkge1xuICAgICAgICB2YXIgdmFsID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldW2NvbXBvbmVudEZvcm1bYWRkcmVzc1R5cGVdXTtcbiAgICAgICAgYWRkcmVzc1thZGRyZXNzVHlwZV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBpZihhZGRyZXNzVHlwZSA9PT0gJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpe1xuICAgICAgICAgICAgbG9uZ19uYW1lID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldWydsb25nX25hbWUnXTtcbiAgICAgICAgfVxuICAgIH0vLy8vIGZvclxuICAgIGFkZHJlc3MuYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xX2xvbmdfbmFtZSA9IGxvbmdfbmFtZTtcblxuICAgICQoJy50eXBlYWhlYWRfYWRkcmVzcycrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5zdHJlZXRfbnVtYmVyICsgJyAnICsgYWRkcmVzcy5yb3V0ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9jaXR5Jyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLmxvY2FsaXR5KS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3N0YXRlJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgLy8gJCgnI3N0YXRlX2xhYmVsJyt0aGlzLnBvc3QpLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfemlwJyt0aGlzLnBvc3QpLmVxKDApLnZhbChhZGRyZXNzLnBvc3RhbF9jb2RlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbn0iLCIkKGRvY3VtZW50KS5yZWFkeShjb0JvcnJvd2VyUmVhZHkpO1xudmFyIGFkZHJlc3NUZW1wbGF0ZTtcbnZhciBhZGRyZXNzSW5kZXg7XG5cbmZ1bmN0aW9uIGNvQm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNjb0JvcnJvd2VyRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNvLWJvcnJvd2VyIGxpdmUgaW4gZGlmZmVyZW50IGFkZHJlc3NcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPWNvX2xpdmVzYW1lXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKCQodGhpcykudmFsKCkgPT09ICd5ZXMnKXtcblxuICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZVVwKClcbiAgICAgICAgICAgIC5maW5kKCcuY2MtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCcjcHJlQWRkcmVzcycpLnNsaWRlVXAoKS5lbXB0eSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjYWRkcmVzc0RpdicpLnNsaWRlRG93bigpXG4gICAgICAgICAgICAuZmluZCgnLmNjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KG15Rm9ybSk7IC8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBCYWNrIGJ1dHRvbiBjbGljayBoYW5kbGVyc1xuICAgICAqL1xuICAgICQoJyNiYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oY2Upe1xuICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAqIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG4gICAgICovXG4gICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgYWRkcmVzc0luZGV4KTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAqL1xuICAgICQoJyNjb19kZXBlbmRhbnRzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgYWdlc0RpdiA9ICQoJyNkZXBlbmRlbnRTZWN0aW9uJyk7XG4gICAgICAgIHZhciBjb2xzID0gYWdlc0Rpdi5maW5kKCcuY29sLXhzLTYnKS5oaWRlKCk7XG5cbiAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgZm9yKHZhciB4PTA7IHg8djsgeCsrKXtcbiAgICAgICAgICAgICAgICBjb2xzLmVxKHgpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSBjby1ib3Jyb3dlciBuYW1lIGluIHN1YiB0aXRsZXNcbiAgICAgKi9cbiAgICB2YXIgbmFtZUhvbGRlciA9ICQoJy5jb0JvcnJvd2VyTmFtZScpO1xuICAgICQoJyNjb19mbmFtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdmFsID0gJC50cmltKCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICAgIG5hbWVIb2xkZXIudGV4dCggdmFsID8gdmFsIDogJ0NvLUJvcnJvd2VyJyk7XG4gICAgfSlcbn07Ly8vLyBib3Jyb3dlclJlYWR5XG4iLCIkKGRvY3VtZW50KS5yZWFkeShwdXJjaGFzZVJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5mdW5jdGlvbiBwdXJjaGFzZVJlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI3B1cmNoYXNlRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICovXG5cbiAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgJCgnaW5wdXQuc3NuJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFNTTilcbiAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiByZWFsIHN0YXRlIGFnZW50XG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1wdV91c2luZ2FnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdmFyIGFnZW50ID0gJCgnI2FnZW50Q29udGFjdCcpO1xuICAgICAgICB2YXIgYWdlbnRGaWVsZHMgPSAkKCcjYWdlbnRGaWVsZHMnKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudENvbnRhY3QnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicjYWdlbnRGaWVsZHMsICNhZ2VudENvbnRhY3QnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KTsvLy8vLyBvbi5jaGFuZ2VcblxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgY29udGFjdCBhZ2VudFxuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cHVfY29udGFjdGFnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBwcm9wZXJ0eVxuICAgICAqL1xuICAgICQoJyNwdV9zZWFyY2h0eXBlcHVyY2hhc2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlzUHJvcGVydHkgPSBTdHJpbmcoJzM0Jykuc3BsaXQoJycpLmluZGV4T2YodmFsKSA+IC0xO1xuXG4gICAgICAgIGlmKHRydWUgPT09IGlzUHJvcGVydHkpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eS1maWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucHJvcGVydHktZmllbGRzLCAjc3ViTmFtZSwgI2Nsb3NpbmdEYXRlLCAjbW9udGhseUhPQScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1zdWIsIC5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nLCAuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG5cbiAgICB9KTsvLy8gb24uY2hhbmdlXG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBIT0EgZHVlc1xuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cHVfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cHVfaGF2ZWNsb3NpbmdkYXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjbG9zaW5nRGF0ZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjbG9zaW5nRGF0ZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsb3NpbmcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXB1X21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXN1Yid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSlcbn07Ly8vLyBib3Jyb3dlclJlYWR5XG5cbiIsIiQoZG9jdW1lbnQpLnJlYWR5KHJlZmluYW5jZVJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5mdW5jdGlvbiByZWZpbmFuY2VSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNyZWZpbmFuY2VGb3JtJyk7XG4gICAgLyoqXG4gICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICovXG4gICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgLyoqXG4gICAgICogQWRkaW5nIGdvb2dsZSBhZGRyZXNzIHR5cGUgYWhlYWRcbiAgICAgKi9cbiAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX3Byb3BlcnR5cmVmaW5hbmNpbmddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih2YWwgPT09ICdubycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicub3RoZXJBZGRyZXNzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGlmIEhPQSBkdWVzXG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9wbGFubmVkdW5pdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfZm9yc2FsZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjZGF0ZU9mZk1hcmtldCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjZGF0ZU9mZk1hcmtldCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9zdWJqZWN0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNjb25zdHJ1Y3Rpb25CcmllZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfaXN0aXRsZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3RydXN0QnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3RydXN0QnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfbWFudWZhY3R1cmVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX2hhdmVNb3J0Z2FnZTFdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmZpcnN0TW9ydGdhZ2UnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmZpcnN0TW9ydGdhZ2UsIC5zZWNvbmRNb3J0Z2FnZSwgLmNyZWRpdC1saW1pdCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTIsIC5jYy10by1iZS12YWxpZGF0ZS1jbCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9zZWNtb3J0Z2FnZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Z2FnZTInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWNvbmRNb3J0Z2FnZSwgLmNyZWRpdC1saW1pdCwgI2FkZGl0aW9uYWxMaWVucycsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2wsIC5jYy10by1iZS12YWxpZGF0ZS1saW5lJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX21vcnRnYWdlMkxPQ10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jcmVkaXQtbGltaXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9YXNfYWRkaXRpb25hbGxpZW5zXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZGRpdGlvbmFsTGllbnMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1saWVuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcbn07Ly8vLyBib3Jyb3dlclJlYWR5XG5cbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGJvSW5jb21lUmVhZHkpO1xudmFyIGVtcGxveWVyVGVtcGxhdGUsIGVtcGxveWVySW5kZXgsIGVtcGxveWVyc0hvbGRlcjtcbnZhciByZW50VGVtcGxhdGUsIHJlbnRJbmRleCwgcmVudHNIb2xkZXIsIHJlbnRzQXJyYXk7XG5mdW5jdGlvbiBib0luY29tZVJlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI2JvSW5jb21lRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgZW1wbG95ZXJUZW1wbGF0ZSA9ICQoJyNlbXBsb3llclRtcGx0JykudGV4dCgpO1xuICAgIGVtcGxveWVySW5kZXggPSAxO1xuICAgIGVtcGxveWVyc0hvbGRlciA9ICQoJyNlbXBsb3llcnNIb2xkZXInKTtcblxuXG4gICAgLyoqXG4gICAgICogW3JlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgKi9cbiAgICByZW50VGVtcGxhdGUgPSAkKCcjcmVudFRtcGx0JykudGV4dCgpO1xuICAgIC8qKlxuICAgICAqIFtyZW50SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgcmVudCBwcm9wZXJ0eSBpbnNpZGUgdGhlIERPTVxuICAgICAqIHRoaXMgdmFyaWFibGUgd29yayBzaW1pbGFyIHRvIGF1dG8gaW5jcmVtZW50IGZpZWxkIGluIGRhdGEgYmFzZSBhbmQgaXQgaXMgbm90IHJlbGF0ZWQgdG8gZmllbGRzIG5hbWUgYW5kIGZpZWxkcyBpZF1cbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgICAqL1xuICAgIHJlbnRJbmRleCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBbcmVudHNIb2xkZXIgdGhlIGRpdiB3aGVyZSByZW50IHByb3BlcnRpZXMgd2lsbCBiZSBhcHBlbmRlZF1cbiAgICAgKi9cbiAgICByZW50c0hvbGRlciA9ICQoJyNyZW50c0hvbGRlcicpO1xuXG4gICAgLyoqXG4gICAgICogW3JlbnRzQXJyYXkgd2lsbCB0cmFjayB0aGUgcG9zaXRpb24gb2YgZWFjaCByZW50IHByb3BlcnR5IGluZGV4XG4gICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgcmVudHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgcmVudCBoYXMgaW5kZXggb2YgNCBhbmQgc2Vjb25kIHJlbnQgaGFzIGluZGV4IG9mIDZcbiAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVSZW50c0ZpZWxkcyBmdW5jdGlvblxuICAgICAqL1xuICAgIHJlbnRzQXJyYXkgPSBbXTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGVtcGxveWVyc1xuICAgICAqL1xuICAgIGVtcGxveWVyc0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgYWRkQXV0b0FkZHJlc3MobXlJbmRleCk7XG4gICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZShteUluZGV4KTtcbiAgICAgICAgZW1wbG95ZXJJbmRleCA9IG15SW5kZXg7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIHJlbnQgcHJvcGVydGllc1xuICAgICAqL1xuICAgIHJlbnRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePXJlX2FkZHJlc3NdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgncmVfYWRkcmVzcycpWzFdLCAxMCk7XG5cbiAgICAgICAgYWRkQXV0b0FkZHJlc3MoMTAwICsgbXlJbmRleCk7XG5cbiAgICAgICAgcmVudEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgcmVudHNBcnJheS5wdXNoKHJlbnRJbmRleCk7XG5cbiAgICAgICAgYmluZFJlbnRNb3J0Z2FnZShteUlkKTtcblxuICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZVJlbnQoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkaW5nIGdvb2dsZSBhZGRyZXNzIHR5cGUgYWhlYWRcbiAgICAgKi9cbiAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTJdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmVtcGxveW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIGJpbmRFbXBsb3ltZW50RGF0ZSgxKTtcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZW1wbG95bWVudCwgLnByZUVtcGxveW1lbnQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtLCAuY2MtdG8tYmUtdmFsaWRhdGUtcHJlJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICBpZihlbXBsb3llckluZGV4ID4gMSl7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRW1wbG95ZXIoMik7IC8vLyB3aWxsIHRha2UgY2FyZSBvZiB0aGUgcmVzdCBvZlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTNdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlbGYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDUpXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNlbGYnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5hZGRpdGlvbmFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg2KVxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5hZGRpdGlvbmFsJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lNV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmV0aXJlbWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJldGlyZW1lbnQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXJldGlyZW1lbnQnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU2XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zc24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnNzbicsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lN10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY2hpbGQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuY2hpbGQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lOF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZGl2aWRlbmQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuZGl2aWRlbmQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lOV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVudGFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZCBuZXcgcHJvcGVydHkgaWYgdGhlIHByb3BlcnR5IGNvdW50IGlzIDBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYocmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgICAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZW50YWwnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB3aGlsZShyZW50c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQocmVudHNBcnJheVtyZW50c0FycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgYWRkUmVudCgpO1xuICAgIH0pXG5cbn07Ly8vLyBib3Jyb3dlclJlYWR5XG5cbmZ1bmN0aW9uIGJpbmRFbXBsb3ltZW50RGF0ZShpbmRleCl7XG5cbiAgICB2YXIgZmllbGRzID0gJCgnaW5wdXQuc3RhcnREYXRlJyArIGluZGV4ICsgJywgaW5wdXQuZW5kRGF0ZScgKyBpbmRleCk7XG4gICAgdmFyIGV2ZW50TmFtZSA9ICQuYnJvd3Nlci5tc2llID8gJ2tleXVwJyA6ICdjaGFuZ2UnOyAvLy8gY2hhbmdlIGlzIG5vdCBmaXJpbmcgb24gSUUgISEhXG4gICAgZmllbGRzLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICAkKHRoaXMpXG4gICAgICAgIC5vZmYoZXZlbnROYW1lLCBjaGVja0VtcGxveW1lbnREYXRlKVxuICAgICAgICAub24oZXZlbnROYW1lLCBjaGVja0VtcGxveW1lbnREYXRlKTtcbiAgICB9KVxuICAgIC8vIGZpZWxkcy5vZmYoJ2NoYW5nZScsIGNoZWNrRW1wbG95bWVudERhdGUpXG59Ly8vLy8gZnVuLiBiaW5kRW1wbG95bWVudERhdGVcblxuZnVuY3Rpb24gYWRkRW1wbG95ZXIoaW5kZXgpe1xuICAgIC8qKlxuICAgICAqIExpbWl0IHRvIDQgcHJldmlvdXMgZW1wbG95ZXJzXG4gICAgICovXG4gICAgaWYoaW5kZXggPiA0KSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBFbXBsb3llcnMgc2hvdWxkIGJlIGFkZGVkIGluIGluY3JlYXNpbmcgaW5kZXhcbiAgICAgKi9cbiAgICBpZihpbmRleCA8IGVtcGxveWVySW5kZXgpIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIGlmIHRoZSBlbXBsb3llciB3aXRoIGluZGV4IGlzIGFscmVhZHkgYWRkZWQgZG8gbm90aGluZ1xuICAgICAqL1xuICAgIGlmKCQoJyNlbXBsb3llcl8nICsgaW5kZXgpLmxlbmd0aCA+IDApe1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZW1wbG95ZXJJbmRleCA9IGluZGV4O1xuXG4gICAgdmFyIGVtcGxveWVyID0gJChlbXBsb3llclRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNcXH0pL2csIGVtcGxveWVySW5kZXgpKTtcblxuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBlbXBsb3llci5maW5kKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG4gICAgeWVzTm9SYWRpbyhlbXBsb3llcik7XG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIGVtcGxveWVyc0hvbGRlci5hcHBlbmQoZW1wbG95ZXIpO1xuXG4gICAgYWRkQXV0b0FkZHJlc3MoZW1wbG95ZXJJbmRleCk7XG4gICAgYmluZEVtcGxveW1lbnREYXRlKGVtcGxveWVySW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIGVtcGxveWVyLnNsaWRlRG93bigpO1xufS8vLy8gZnVuLiBhZGRFbXBsb3llclxuXG5mdW5jdGlvbiByZW1vdmVFbXBsb3llcihyZW1vdmVJbmRleCl7XG5cbiAgICBpZihyZW1vdmVJbmRleCA8PSAxKSByZXR1cm47XG4gICAgLy8gaWYocmVtb3ZlSW5kZXggPiA0KSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9cmVtb3ZlSW5kZXg7IHg8PWVtcGxveWVySW5kZXg7IHgrKyl7XG4gICAgICAgICQoJyNlbXBsb3llcl8nICsgeCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykuZGV0YWNoKCkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGVtcGxveWVySW5kZXggPSByZW1vdmVJbmRleCAtIDE7XG59XG5cbmZ1bmN0aW9uIGNoZWNrRW1wbG95bWVudERhdGUoZXYpe1xuXG4gICAgLyoqXG4gICAgICogVmFsaWRhdGUgZW5kIGRhdGUgYW5kIGFkZCBwcmV2aW91cyBqb2IgaWYgYXBwbGljYWJsZVxuICAgICAqL1xuICAgIHZhciBpbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICB2YXIgZW5kRGF0ZUZpZWxkID0gJCgnLmVuZERhdGUnK2luZGV4KS5lcSgwKTtcbiAgICB2YXIgc3RhcnREYXRlRmllbGQgPSAkKCcuc3RhcnREYXRlJytpbmRleCkuZXEoMCk7XG4gICAgdmFyIGVuZERhdGUsIHN0YXJ0RGF0ZTtcblxuICAgIGlmKGVuZERhdGVGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgdmFyIGRhdGVTcGxpdCA9IGVuZERhdGVGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoTnVtYmVyKGRhdGVTcGxpdFsyXSksIE51bWJlcihkYXRlU3BsaXRbMF0pLTEsIE51bWJlcihkYXRlU3BsaXRbMV0pKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgfVxuXG4gICAgaWYoc3RhcnREYXRlRmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgIHZhciBkYXRlU3BsaXQgPSBzdGFydERhdGVGaWVsZC52YWwoKS5zcGxpdCgnLycpO1xuICAgICAgICBzdGFydERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoZW5kRGF0ZSA8PSBzdGFydERhdGUpe1xuICAgICAgICBlbmREYXRlRmllbGQuYWRkRXJyb3IoJ2NjLWRhdGUtZ3QnKS5zaG93RXJyb3IoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoZW5kRGF0ZSAtIHN0YXJ0RGF0ZSA8ICAyICogMzY1ICogMjQgKiA2MCAqIDYwICogMTAwMCApe1xuICAgICAgICAgICAgLy8gaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcmVFbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcHJlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIGFkZEVtcGxveWVyKGluZGV4KzEpXG4gICAgICAgIH0vLy8vXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVFbXBsb3llcihpbmRleCsxKVxuICAgICAgICB9XG4gICAgfS8vLy8gZWxzZVxufS8vLy8gZnVuLiBjaGVja0VtcGx5bWVudERhdGVcblxuZnVuY3Rpb24gYWRkUmVudCgpe1xuXG4gICAgaWYocmVudHNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgcmVudEluZGV4Kys7XG4gICAgcmVudHNBcnJheS5wdXNoKHJlbnRJbmRleCk7XG4gICAgdmFyIHRlbXBsYXRlID0gcmVudFRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgcmVudEluZGV4KTtcblxuICAgIHZhciBpZCA9IHJlbnRzQXJyYXkubGVuZ3RoO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgIC8qKlxuICAgICAqIFthZGRyZXNzSW5kZXggaXMgdXNlZCB0byBoZWxwIGFkZCBhbmQgdHJhY2sgdGhlIGFkZHJlc3MgZmllbGRzIGZvciB0eXBlIGFoZWFkIGFkZHJlc3MgZnVuY3Rpb25hbGl0eV1cbiAgICAgKiAxMDAgKyBpcyBhZGRlZCB0byBkaWZmZXJlbnRpYXRlIHRoZSByZW50IHByb3BlcnR5IGFkZHJlc3MgZmllbGRzIGZyb20gZW1wbG95ZXIgYWRkcmVzcyBmaWVsZHNcbiAgICAgKi9cbiAgICB2YXIgYWRkcmVzc0luZGV4ID0gMTAwICsgcmVudEluZGV4O1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4UGx1c1xcfSkvZywgYWRkcmVzc0luZGV4KTtcblxuXG4gICAgdmFyIHJlbnQgPSAkKHRlbXBsYXRlKTtcblxuICAgIHJlbnQuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgIH0pO1xuXG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIHJlbnQuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIC8qKlxuICAgICAqIFNldCB5ZXMvbm8gcmFkaW8gYnV0dG9uIGJlaGF2aW9yXG4gICAgICovXG4gICAgeWVzTm9SYWRpbyhyZW50KTtcblxuXG5cbiAgICAvKipcbiAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAqL1xuICAgIHJlbnQuZmluZCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgcmVudC5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICByZW50c0hvbGRlci5hcHBlbmQocmVudCk7XG5cbiAgICByZW50LnNsaWRlRG93bigpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IG1vcnRnYWdlIHllcy9ubyBhY3Rpb25cbiAgICAgKi9cbiAgICBiaW5kUmVudE1vcnRnYWdlKGlkKTtcblxuICAgIGFkZEF1dG9BZGRyZXNzKGFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgIHVwZGF0ZVJlbnRDbG9zZUJ0bigpO1xufS8vLy8gZnVuLiBhZGRSZW50XG5cbmZ1bmN0aW9uIHJlbW92ZVJlbnQocmVtb3ZlSW5kZXgpe1xuICAgIHZhciBwb3NpdGlvbiA9IHJlbnRzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAkKCcjcHJvcGVydHlfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJlbnRzQXJyYXkuc3BsaWNlKHBvc2l0aW9uLCAxKTtcblxuICAgIHVwZGF0ZVJlbnRzRmllbGRzKCk7XG5cbiAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gcmVtb3ZlUmVudFxuXG4vKipcbiAqIFt1cGRhdGVSZW50c0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW50IHByb3BlcnR5IG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkUmVudCBhbmQgcmVtb3ZlUmVudFxuICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVJlbnRzRmllbGRzKCl7XG4gICAgdmFyIGxpbWl0ID0gcmVudHNBcnJheS5sZW5ndGg7XG4gICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVudHNBcnJheVt4XTtcblxuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcblxuICAgICAgICByZW50RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0vLy8vIGZvciB4XG59Ly8vLyBmdW4uIHVwZGF0ZVJlbnRzRmllbGRzXG5cbi8qKlxuICogW3VwZGF0ZVJlbnRDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBwcm9wZXJ0eV1cbiAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkUmVudCBhbmQgcmVtb3ZlUmVudFxuICovXG5mdW5jdGlvbiB1cGRhdGVSZW50Q2xvc2VCdG4oKXtcbiAgICBpZihyZW50c0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICB2YXIgaW5kZXggPSByZW50c0FycmF5WzBdO1xuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcbiAgICAgICAgcmVudERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB2YXIgaW5kZXggPSByZW50c0FycmF5WzBdO1xuICAgICAgICB2YXIgcmVudERpdiA9ICQoJyNwcm9wZXJ0eV8nK2luZGV4KTtcbiAgICAgICAgcmVudERpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgIH1cblxuICAgIGlmKHJlbnRzQXJyYXkubGVuZ3RoID49IDUpe1xuICAgICAgICAvLyAkKCcjYWRkUmVudFByb3BlcnR5JykuYXR0cih7J2Rpc2FibGVkJzp0cnVlfSkuY3NzKHsnb3BhY2l0eSc6MC41fSk7XG4gICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIC8vICQoJyNhZGRSZW50UHJvcGVydHknKS5hdHRyKHsnZGlzYWJsZWQnOmZhbHNlfSkuY3NzKHsnb3BhY2l0eSc6MX0pO1xuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykuc2hvdygpO1xuICAgIH1cblxufS8vLy8gZnVuLiB1cGRhdGVSZW50Q2xvc2VCdG5cblxuZnVuY3Rpb24gYmluZFJlbnRNb3J0Z2FnZShpbmRleCl7XG4gICAgJCgnaW5wdXQubW9ydGdhZ2VSYWRpbycraW5kZXgpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbXlJbmRleCA9ICQodGhpcykuYXR0cignZGF0YS1pbmRleCcpO1xuICAgICAgICB2YXIgbXlWYWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIG15VmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG59Ly8vLyBmdW4uIGJpbmRSZW50TW9ydGdhZ2UiLCIkKGRvY3VtZW50KS5yZWFkeShjb0luY29tZVJlYWR5KTtcbnZhciBlbXBsb3llclRlbXBsYXRlLCBlbXBsb3llckluZGV4LCBlbXBsb3llcnNIb2xkZXI7XG52YXIgcmVudFRlbXBsYXRlLCByZW50SW5kZXgsIHJlbnRzSG9sZGVyLCByZW50c0FycmF5O1xuZnVuY3Rpb24gY29JbmNvbWVSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNjb0luY29tZUZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIGVtcGxveWVyVGVtcGxhdGUgPSAkKCcjZW1wbG95ZXJUbXBsdCcpLnRleHQoKTtcbiAgICBlbXBsb3llckluZGV4ID0gMTtcbiAgICBlbXBsb3llcnNIb2xkZXIgPSAkKCcjZW1wbG95ZXJzSG9sZGVyJyk7XG5cblxuICAgIC8qKlxuICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICovXG4gICAgcmVudFRlbXBsYXRlID0gJCgnI3JlbnRUbXBsdCcpLnRleHQoKTtcbiAgICAvKipcbiAgICAgKiBbcmVudEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIHJlbnQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICByZW50SW5kZXggPSAwO1xuXG4gICAgLyoqXG4gICAgICogW3JlbnRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgcmVudCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICovXG4gICAgcmVudHNIb2xkZXIgPSAkKCcjcmVudHNIb2xkZXInKTtcblxuICAgIC8qKlxuICAgICAqIFtyZW50c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggcmVudCBwcm9wZXJ0eSBpbmRleFxuICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlbnRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IHJlbnQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCByZW50IGhhcyBpbmRleCBvZiA2XG4gICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlUmVudHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgKi9cbiAgICByZW50c0FycmF5ID0gW107XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBlbXBsb3llcnNcbiAgICAgKi9cbiAgICBlbXBsb3llcnNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKG15SW5kZXgpO1xuICAgICAgICBiaW5kRW1wbG95bWVudERhdGUobXlJbmRleCk7XG4gICAgICAgIGVtcGxveWVySW5kZXggPSBteUluZGV4O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciByZW50IHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICByZW50c0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1yZV9jb19hZGRyZXNzXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ3JlX2NvX2FkZHJlc3MnKVsxXSwgMTApO1xuXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEwMCArIG15SW5kZXgpO1xuXG4gICAgICAgIHJlbnRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgIHJlbnRzQXJyYXkucHVzaChyZW50SW5kZXgpO1xuXG4gICAgICAgIGJpbmRSZW50TW9ydGdhZ2UobXlJZCk7XG5cbiAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICovXG4gICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWUyXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUoMSk7XG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmVtcGxveW1lbnQsIC5wcmVFbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSwgLmNjLXRvLWJlLXZhbGlkYXRlLXByZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgaWYoZW1wbG95ZXJJbmRleCA+IDEpe1xuICAgICAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKDIpOyAvLy8gd2lsbCB0YWtlIGNhcmUgb2YgdGhlIHJlc3Qgb2ZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWUzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zZWxmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg1KVxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWxmJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYWRkaXRpb25hbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNilcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuYWRkaXRpb25hbCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldGlyZW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXRpcmVtZW50JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lNl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc3NuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbidcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmNoaWxkJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZThdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmRpdmlkZW5kJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmRpdmlkZW5kJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucmVudGFsJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFkZCBuZXcgcHJvcGVydHkgaWYgdGhlIHByb3BlcnR5IGNvdW50IGlzIDBcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYocmVudHNBcnJheS5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICBhZGRSZW50KCk7XG4gICAgICAgICAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZW50YWwnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICB3aGlsZShyZW50c0FycmF5Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHJlbW92ZVJlbnQocmVudHNBcnJheVtyZW50c0FycmF5Lmxlbmd0aC0xXSk7XG4gICAgICAgICAgICB9Ly8vIHdoaWxlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKGV2LnByZXZlbnREZWZhdWx0KSBldi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGV2LnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgYWRkUmVudCgpO1xuICAgIH0pXG5cbn07Ly8vLyBib3Jyb3dlclJlYWR5XG4iLCIkKGRvY3VtZW50KS5yZWFkeShhc3NldHNSZWFkeSk7XG52YXIgYXNzZXRUZW1wbGF0ZSwgYXNzZXRJbmRleCwgYXNzZXRzSG9sZGVyLCBhc3NldHNBcnJheTtcblxuZnVuY3Rpb24gYXNzZXRzUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjYXNzZXRzRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW3JlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgKi9cbiAgICBhc3NldFRlbXBsYXRlID0gJCgnI2Fzc2V0VG1wbHQnKS50ZXh0KCk7XG4gICAgLyoqXG4gICAgICogW2Fzc2V0SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgYXNzZXQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBhc3NldEluZGV4ID0gMDtcblxuICAgIC8qKlxuICAgICAqIFthc3NldHNIb2xkZXIgdGhlIGRpdiB3aGVyZSBhc3NldCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICovXG4gICAgYXNzZXRzSG9sZGVyID0gJCgnI2Fzc2V0c0hvbGRlcicpO1xuXG4gICAgLyoqXG4gICAgICogW2Fzc2V0c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggYXNzZXQgcHJvcGVydHkgaW5kZXhcbiAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyBhc3NldHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgYXNzZXQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCBhc3NldCBoYXMgaW5kZXggb2YgNlxuICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZWFzc2V0c0ZpZWxkcyBmdW5jdGlvblxuICAgICAqL1xuICAgIGFzc2V0c0FycmF5ID0gW107XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgYWRkQXV0b0FkZHJlc3MoNyk7XG5cblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgYXNzZXRcbiAgICAgKi9cbiAgICBhc3NldHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49YXNfYmFua10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdhc19iYW5rJylbMV0sIDEwKTtcblxuXG4gICAgICAgIGFzc2V0SW5kZXggPSBteUluZGV4O1xuICAgICAgICBhc3NldHNBcnJheS5wdXNoKGFzc2V0SW5kZXgpO1xuXG4gICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlQXNzZXQoaSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbiAgICB9KTtcblxuXG5cbiAgICAkKCcjYWRkQW5vdGhlckFzc2V0JylcbiAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICBhZGRBc3NldCgpO1xuICAgIH0pO1xuXG5cbiAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxyZWFsZXN0YXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHksIC5tb3J0Z2FnZTcnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSwgLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQ3J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXQubW9ydGdhZ2VSYWRpbzcnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlNycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQ3J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZTcnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Nyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KVxuXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG5cblxuZnVuY3Rpb24gYWRkQXNzZXQoKXtcblxuICAgIGlmKGFzc2V0c0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICBhc3NldEluZGV4Kys7XG4gICAgYXNzZXRzQXJyYXkucHVzaChhc3NldEluZGV4KTtcbiAgICB2YXIgdGVtcGxhdGUgPSBhc3NldFRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFxcfSkvZywgYXNzZXRJbmRleCk7XG5cbiAgICB2YXIgaWQgPSBhc3NldHNBcnJheS5sZW5ndGg7XG4gICAgdGVtcGxhdGUgPSB0ZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaWRcXH0pL2csIGlkKTtcblxuXG4gICAgdmFyIGFzc2V0ID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICBhc3NldC5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHJlbW92ZUFzc2V0KGkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgKi9cblxuICAgIGFzc2V0LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuICAgIGFzc2V0c0hvbGRlci5hcHBlbmQoYXNzZXQpO1xuXG4gICAgYXNzZXQuc2xpZGVEb3duKCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gYWRkUmVudFxuXG5mdW5jdGlvbiByZW1vdmVBc3NldChyZW1vdmVJbmRleCl7XG4gICAgdmFyIHBvc2l0aW9uID0gYXNzZXRzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAkKCcjYXNzZXRfJyArIHJlbW92ZUluZGV4KS5zbGlkZVVwKHtcbiAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFzc2V0c0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICB1cGRhdGVBc3NldHNGaWVsZHMoKTtcblxuICAgIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gcmVtb3ZlQXNzZXRcblxuLyoqXG4gKiBbdXBkYXRlQXNzZXRzRmllbGRzIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIGFzc2V0IG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkQXNzZXQgYW5kIHJlbW92ZUFzc2V0XG4gKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiovXG5mdW5jdGlvbiB1cGRhdGVBc3NldHNGaWVsZHMoKXtcbiAgICB2YXIgbGltaXQgPSBhc3NldHNBcnJheS5sZW5ndGg7XG4gICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRzQXJyYXlbeF07XG5cbiAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuXG4gICAgICAgIGFzc2V0RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0vLy8vIGZvciB4XG59Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0c0ZpZWxkc1xuXG4vLyAvKipcbi8vICAqIFt1cGRhdGVBc3NldHNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBhc3NldF1cbi8vICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkQXNzZXQgYW5kIHJlbW92ZUFzc2V0XG4vLyAgKi9cbmZ1bmN0aW9uIHVwZGF0ZUFzc2V0Q2xvc2VCdG4oKXtcblxuICAgIGlmKGFzc2V0c0FycmF5Lmxlbmd0aCA+IDEpe1xuICAgICAgICB2YXIgaW5kZXggPSBhc3NldHNBcnJheVswXTtcbiAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuc2hvdygpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICB2YXIgaW5kZXggPSBhc3NldHNBcnJheVswXTtcbiAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2Fzc2V0XycraW5kZXgpO1xuICAgICAgICBhc3NldERpdi5maW5kKCdhLmNsb3NlJykuaGlkZSgpO1xuICAgIH1cblxuICAgIGlmKGFzc2V0c0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLmhpZGUoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgJCgnI2FkZEFub3RoZXJBc3NldCcpLnNob3coKTtcbiAgICB9XG5cbn0vLy8vIGZ1bi4gdXBkYXRlQXNzZXRDbG9zZUJ0blxuXG4vLyBmdW5jdGlvbiBiaW5kYXNzZXRNb3J0Z2FnZShpbmRleCl7XG4vLyAgICAgJCgnaW5wdXQubW9ydGdhZ2VSYWRpbycraW5kZXgpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuLy8gICAgICAgICB2YXIgbXlJbmRleCA9ICQodGhpcykuYXR0cignZGF0YS1pbmRleCcpO1xuLy8gICAgICAgICB2YXIgbXlWYWwgPSAkKHRoaXMpLnZhbCgpO1xuLy8gICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIG15VmFsID09PSAneWVzJyl7XG4vLyAgICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlJytteUluZGV4LCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0JytteUluZGV4fSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuLy8gICAgICAgICB9XG4vLyAgICAgfSk7XG4vLyB9Ly8vLyBmdW4uIGJpbmRSZW50TW9ydGdhZ2UiLCIkKGRvY3VtZW50KS5yZWFkeShsaWFiaWxpdGllc1JlYWR5KTtcbnZhciBsaWFiaWxpdHlUZW1wbGF0ZSwgbGlhYmlsaXR5SW5kZXgsIGxpYWJpbGl0aWVzSG9sZGVyLCBsaWFiaWxpdGllc0FycmF5O1xuXG5mdW5jdGlvbiBsaWFiaWxpdGllc1JlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI2xpYWJpbGl0aWVzRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW3JlbnRUZW1wbGF0ZSB2YXJpYWJsZSB0byBob2xkIHRoZSBodG1sIHRlbXBsYXRlIGFzIHN0cmluZ11cbiAgICAgKi9cbiAgICBsaWFiaWxpdHlUZW1wbGF0ZSA9ICQoJyNsaWFiaWxpdHlUbXBsdCcpLnRleHQoKTtcbiAgICAvKipcbiAgICAgKiBbbGlhYmlsaXR5SW5kZXggYSB2YXJpYWJsZSB0byB0cmFjayB0aGUgYXNzZXQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBsaWFiaWxpdHlJbmRleCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBbbGlhYmlsaXRpZXNIb2xkZXIgdGhlIGRpdiB3aGVyZSBhc3NldCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICovXG4gICAgbGlhYmlsaXRpZXNIb2xkZXIgPSAkKCcjbGlhYmlsaXRpZXNIb2xkZXInKTtcblxuICAgIC8qKlxuICAgICAqIFtsaWFiaWxpdGllc0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggYXNzZXQgcHJvcGVydHkgaW5kZXhcbiAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyBhc3NldHMgcmFuZG9tbHkgdGhpcyBhcnJheSB3aWxsIGtlZXAgdHJhY2sgb2ZcbiAgICAgKiBlLmcgcmV0bnNBcnJheSA9IFs0LCA2XSBtZWFucyB0aGUgZmlyc3QgYXNzZXQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCBhc3NldCBoYXMgaW5kZXggb2YgNlxuICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzIGZ1bmN0aW9uXG4gICAgICovXG4gICAgbGlhYmlsaXRpZXNBcnJheSA9IFtdO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICovXG5cbiAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG5cblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgYXNzZXRcbiAgICAgKi9cbiAgICBsaWFiaWxpdGllc0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1saV9jcmVkaXRvcl0nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdsaV9jcmVkaXRvcicpWzFdLCAxMCk7XG5cblxuICAgICAgICBsaWFiaWxpdHlJbmRleCA9IG15SW5kZXg7XG4gICAgICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG5cbiAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICByZW1vdmVMaWFiaWxpdHkoaSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhsaWFiaWxpdGllc0FycmF5KVxuICAgICAgICB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpO1xuICAgIH0pO1xuXG5cblxuICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5JylcbiAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIGFkZExpYWJpbGl0eSgpO1xuXG4gICAgfSk7XG5cblxuICAgIC8vICQoJ2lucHV0W25hbWU9YXNfYWRkaXRpb25hbHJlYWxlc3RhdGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgIC8vICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgIC8vICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eSwgLm1vcnRnYWdlNycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydDcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIC8vICAgICB9XG4gICAgLy8gfSk7XG5cbiAgICAvLyAkKCdpbnB1dC5tb3J0Z2FnZVJhZGlvNycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgIC8vICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAvLyAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAvLyAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2U3JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydDcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7XG4gICAgLy8gICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlNycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQ3J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pXG5cbn07Ly8vLyBib3Jyb3dlclJlYWR5XG5cblxuXG5mdW5jdGlvbiBhZGRMaWFiaWxpdHkoKXtcblxuICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgIGxpYWJpbGl0eUluZGV4Kys7XG4gICAgbGlhYmlsaXRpZXNBcnJheS5wdXNoKGxpYWJpbGl0eUluZGV4KTtcbiAgICB2YXIgdGVtcGxhdGUgPSBsaWFiaWxpdHlUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIGxpYWJpbGl0eUluZGV4KTtcblxuICAgIHZhciBpZCA9IGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgIHZhciBsaWFiaWxpdHkgPSAkKHRlbXBsYXRlKTtcblxuICAgIGxpYWJpbGl0eS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHJlbW92ZUxpYWJpbGl0eShpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICovXG5cbiAgICBsaWFiaWxpdHkuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIHllc05vUmFkaW8obGlhYmlsaXR5KVxuXG5cbiAgICBsaWFiaWxpdGllc0hvbGRlci5hcHBlbmQobGlhYmlsaXR5KTtcblxuICAgIGxpYWJpbGl0eS5zbGlkZURvd24oKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuXG4gICAgdXBkYXRlTGlhYmlsaXR5Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gYWRkUmVudFxuXG5mdW5jdGlvbiByZW1vdmVMaWFiaWxpdHkocmVtb3ZlSW5kZXgpe1xuICAgIHZhciBwb3NpdGlvbiA9IGxpYWJpbGl0aWVzQXJyYXkuaW5kZXhPZihyZW1vdmVJbmRleCk7XG5cbiAgICAkKCcjbGlhYmlsaXR5XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBsaWFiaWxpdGllc0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcygpO1xuXG4gICAgdXBkYXRlTGlhYmlsaXR5Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gcmVtb3ZlTGlhYmlsaXR5XG5cbi8qKlxuICogW3VwZGF0ZUxpYWJpbGl0aWVzRmllbGRzIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIGFzc2V0IG5hbWUgYW5kIGlkIGlzIGFsd2F5cyBpbiBzZXJpZXMgb2YgMSwyLDMsNCwuLi4uXVxuICogdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgaW4gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbiAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuKi9cbmZ1bmN0aW9uIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzKCl7XG4gICAgdmFyIGxpbWl0ID0gbGlhYmlsaXRpZXNBcnJheS5sZW5ndGg7XG4gICAgaWYobGltaXQgPCAxKSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9MDsgeDxsaW1pdDsgeCsrKXtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVt4XTtcblxuICAgICAgICB2YXIgYXNzZXREaXYgPSAkKCcjbGlhYmlsaXR5XycraW5kZXgpO1xuXG4gICAgICAgIGFzc2V0RGl2LmZpbmQoJ2lucHV0JykuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAgIHZhciBuYW1lID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICB2YXIgbmV3TmFtZSA9IG5hbWUucmVwbGFjZSgvXFxkezEsMn0vZywgeCsxKTtcbiAgICAgICAgICAgIHZhciBsYWJlbCA9ICQoJ2xhYmVsW2Zvcj0nICsgbmFtZSArICddJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmF0dHIoe25hbWU6bmV3TmFtZSwgaWQ6bmV3TmFtZX0pO1xuICAgICAgICAgICAgbGFiZWwuYXR0cignZm9yJywgbmV3TmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0vLy8vIGZvciB4XG59Ly8vLyBmdW4uIHVwZGF0ZUxpYWJpbGl0aWVzRmllbGRzXG5cbi8vIC8qKlxuLy8gICogW3VwZGF0ZUFzc2V0c0Nsb3NlQnRuIHRoaXMgZnVuY3Rpb24gd2lsbCBlbnN1cmUgdGhlIHJlbW92ZSBidXR0b24gaXMgaGlkZGVuIGlmIHRoZXJlIGlzIG9ubHkgb25lIGFzc2V0XVxuLy8gICogaXQgd2lsbCBiZSBjYWxsZWQgZnJvbSBhZGRMaWFiaWxpdHkgYW5kIHJlbW92ZUxpYWJpbGl0eVxuLy8gICovXG5mdW5jdGlvbiB1cGRhdGVMaWFiaWxpdHlDbG9zZUJ0bigpe1xuXG4gICAgaWYobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVswXTtcbiAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlhYmlsaXRpZXNBcnJheVswXTtcbiAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcbiAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgJCgnI2FkZEFub3RoZXJMaWFiaWxpdHknKS5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5Jykuc2hvdygpO1xuICAgIH1cblxufS8vLy8gZnVuLiB1cGRhdGVBc3NldENsb3NlQnRuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
