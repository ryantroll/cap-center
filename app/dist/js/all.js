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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwibWFpbi5qcyIsIjAxLWJvcnJvd2VyLmpzIiwiMDItY29ib3Jyb3dlci5qcyIsIjAzLXB1cmNoYXNlLmpzIiwiMDQtcmVmaW5hbmNlLmpzIiwiMDUtaW5jb21lLmpzIiwiMDYtY28taW5jb21lLmpzIiwiMDctYXNzZXRzLmpzIiwiMDgtbGlhYmlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM2dCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdGpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzU3RhdGVzID0gW1xuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYWJhbWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQWxhc2thXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFyaXpvbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQXJrYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb2xvcmFkb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ09cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ1RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEZWxhd2FyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiREVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRENcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZNXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmxvcmlkYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRkxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkd1YW1cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkdVXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSGF3YWlpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJISVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklkYWhvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklsbGlub2lzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkluZGlhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklOXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW93YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJLYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktTXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2VudHVja3lcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJMQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1haW5lXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFyeWxhbmRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1EXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaWNoaWdhblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1OXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1TXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc291cmlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1PXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTW9udGFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZWJyYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXZhZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5WXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOSlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5NXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IFlvcmtcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5ZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5DXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJORFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPaGlvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9rbGFob21hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9yZWdvblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT1JcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQYWxhdVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUFdcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJSSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJTQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlROXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGV4YXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlRYXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVXRhaFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWZXJtb250XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1ZcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXaXNjb25zaW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV3lvbWluZ1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1lcIlxuICAgICAgfVxuICBdOyIsIihmdW5jdGlvbiggJCApIHtcbiAgICAkLmZuLnZhbGlkYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbHRlcignZm9ybScpO1xuICAgICAgICB2YXIgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgIGZvcm0ub2ZmKCdzdWJtaXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaXNGb3JtVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3JtLmZpbmQoJy5jYy1maWVsZC5jYy12YWxpZGF0ZScpLmVhY2goZnVuY3Rpb24obil7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHNlbGYudmFsaWRhdGVGaWVsZCgpO1xuXG5cbiAgICAgICAgICAgICAgICAvLy8vIGZhbHNlIGFuZCB0cnVlIHN0cmljdGx5IHRlc3QgYXMgbnVsbCB3aWxsIHJldHVybmVkIGlzIGZpZWxkIGlzIG5vdCB2YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICBpZihmYWxzZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gc2VsZi5maW5kKCdsYWJlbCcpLmVxKDApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmRXJyID0ge2ZpbGVkOmxhYmVsLnRleHQoKSwgaWQ6ZmllbGQuYXR0cignaWQnKSwgZXJyb3I6ZXJyfTtcbiAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpZWxkcy5wdXNoKGZFcnIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8vLyAuZWFjaFxuXG5cbiAgICAgICAgICAgIHZhciBleHRyYSA9IGNhbGxiYWNrKGlzRm9ybVZhbGlkLCBpbnZhbGlkRmllbGRzLmxlbmd0aCA+IDAgPyBpbnZhbGlkRmllbGRzIDogbnVsbCk7XG5cbiAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgISFleHRyYTtcblxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc0Zvcm1WYWxpZCl7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pOy8vLy8gLm9uIHN1Ym1pdFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgdmFyIGdldE15Q29udGFpbmVyID0gZnVuY3Rpb24oZmllbGQpe1xuICAgICAgICB2YXIgcCA9IGZpZWxkLnBhcmVudCgpO1xuICAgICAgICBpZih0cnVlID09PSBwLmhhc0NsYXNzKCdjYy1maWVsZCcpKXtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZ2V0TXlDb250YWluZXIocCk7XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmdW4uIGdldE15Q29udGFpbmVyXG5cblxuICAgIHZhciBmaWVsZENoYW5nZWRBZnRlckVycm9yID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcigkKHRoaXMpKTtcbiAgICAgICAgY29udGFpbmVyLnZhbGlkYXRlRmllbGQoKVxuICAgIH1cblxuICAgICQuZm4udmFsaWRhdGVGaWVsZCA9IGZ1bmN0aW9uKHNlbGYpe1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBmID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLCBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0sICBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCBpbnB1dFt0eXBlPVwidGVsXCJdLCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sIGlucHV0W3R5cGU9XCJkYXRlXCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICB2YXIgdiA9ICQudHJpbShmLnZhbCgpKTtcbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgaWYoIWVycikgZXJyID0ge307XG5cbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgaXNWYWxpZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1yZXF1aXJlZCcpKXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8vLyBoYW5kbGUgcmFkaW8gYnV0dG9uIGNhc2VcbiAgICAgICAgICAgIGlmKHR5cGUgJiYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykgKXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGYuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciByYWRpb3MgPSBzZWxmLmZpbmQoXCJpbnB1dFtuYW1lPVwiK25hbWUrXCJdXCIpO1xuICAgICAgICAgICAgICAgIHJhZGlvcy5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gISFyYWRpb3MuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmID0gcmFkaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlICYmIHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jyl7XG4gICAgICAgICAgICAgICAgaWYoZi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZi5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhZi5lcShyKS5hdHRyKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9Ly8vLyBpZiBMZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaWYodi5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHR5cGUgcmFkaW8gZWxzZVxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXJlcXVpcmVkJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8vIGlmIHYubGVuZ3RoXG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGNjLXJlcXVpcmVkXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtbnVtYmVyJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKFxcZCkrKFxcLlxcZCspPyQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLW51bWJlcicpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1udW1iZXInXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1lbWFpbCcpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1lbWFpbCcpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1lbWFpbCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlJykpe1xuXG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC87XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBtID0gc3BsaXRbMF0gPyBOdW1iZXIoc3BsaXRbMF0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHNwbGl0WzFdID8gTnVtYmVyKHNwbGl0WzFdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBzcGxpdFsyXSA/IE51bWJlcihzcGxpdFsyXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBtMzEgPSBbMSwgMywgNSwgNywgOCwgMTAsIDEyXTtcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighbSB8fCBtID4gMTIgfHwgbSA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0zMS5pbmRleE9mKG0pID49MCApe1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzEgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobSA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0geSAlIDQgPT0gMCA/IDI5IDogMjg7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiBfZCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWRhdGUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaGFzQ2xhc3MgY2MtZGF0ZVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAvLyB9XG5cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlIGNjLWRhdGUtZ3QnKSl7XG4gICAgICAgICAgICB2YXIgZ3RGaWVsZCA9ICQoJyMnK3NlbGYuYXR0cignZGF0YS1kYXRlLWd0JykpO1xuICAgICAgICAgICAgdmFyIGd0VmFsLCBzdGFydERhdGUsIGVuZERhdGU7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihndEZpZWxkLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlmKGd0RmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSBndEZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZW5kRGF0ZSA8IHN0YXJ0RGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBndEZpZWxkLmxlbmd0aCA+IDBcblxuICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUtZ3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlLWd0J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZS1ndCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBoYXNDbGFzcyBjYy1kYXRlLWd0XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcGhvbmUnKSl7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFwoXFxkezN9XFwpKCApP1xcZHszfVxcLVxcZHs0fSQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXBob25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcGhvbmUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWN1cnJlbmN5Jykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXCQ/KFxcZHsxLDN9KSsoXFwsKlxcZHszfSkqJC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY3VycmVuY3knKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jdXJyZW5jeSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXNzbicpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezN9KFxcLSk/XFxkezJ9KFxcLSk/XFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2Mtc3NuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2Mtc3NuJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXJlcXVpcmVkLW9uZS1vZicpKXtcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAkKCcuJytzZWxmLmF0dHIoJ2RhdGEtb25lLW9mLWNsYXNzJykgKyAnIGlucHV0Jyk7XG5cbiAgICAgICAgICAgIHZhciBfaXNWYWxpZCA9IGZhbHNlOyAvLy8vIGxvY2FsIGlzVmFsaWQgdmFyIHdpbGwgYmUgJiYgd2l0aCBpc1ZhbGlkXG4gICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICBfaXNWYWxpZCA9IF9pc1ZhbGlkIHx8ICEhJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBfaXNWYWxpZCkgcmV0dXJuIGZhbHNlOy8vLy8gc3RvcCBlYWNoIGlmIG9uZSBmaWxlZCBpcyBmb3VuZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIF9pc1ZhbGlkO1xuXG4gICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQtb25lLW9mJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG5cbiAgICAgICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIF9lcnIgPSAkKHRoaXMpLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgX2VyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG4gICAgICAgICAgICAgICAgICAgIC8vICQodGhpcykuZGF0YSgnZXJyJywgX2Vycik7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtcmVxdWlyZWQtb25lLW9mJykuaGlkZUVycm9yKCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGhhc0NsYXNzIGNjLXJlcXVpcmVkLW9uZS1vZlxuXG4gICAgICAgIC8vLy8gcmVzZXQgdGhlIGZpZWxkIGVycm9ycyBiZWZvcmUgYWRkaW5nIHRoZW0gYWdhaW5cbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXJyb3IgY29ycmVjdCBtZXNzYWdlJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmLmRhdGEoJ2lzVmFsaWQnLCBpc1ZhbGlkKTtcblxuICAgICAgICAvLy8vIGlmIGZpZWxkIHBhc3NlZCB0aHJvdWdoIHZhbGlkYXRpb24gc2hvdyBlcnJvciBpZiBhbnlcbiAgICAgICAgLy8gaWYodHJ1ZSA9PT0gaXNWYWxpZGF0ZWQgKXtcbiAgICAgICAgLy8gaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgaWYoZmFsc2UgPT0gaXNWYWxpZCB8fCBPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICAgICAgZi5zaG93RXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgZi5oaWRlRXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIH0vLy8vIGlmIGlzVmFsaWRhdGVkXG5cbiAgICB9Ly8vLyBmdW4uIHZhbGlkYXRlRmlsZFxuXG4gICAgJC5mbi5zaG93RXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gZi5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IodmFyIGUgaW4gZXJyKXtcbiAgICAgICAgICAgIHN0ci5wdXNoKGVycltlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2Vycm9yJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpO1xuXG4gICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpLm9uKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZihzdHIubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgdmFyIG1zZyA9ICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCIgaWQ9XCJlcnJvck1zZ1wiPjxpIGNsYXNzPVwiaWNvbi1lcnJvciBnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZS1zaWduXCI+PC9pPiAnICsgc3RyLmpvaW4oJyB8ICcpICsgJzwvZGl2PicpLnNob3coKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQobXNnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnbWVzc2FnZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfS8vLy8gZnVuLiBzaG93RXJyb3JcblxuICAgICQuZm4uaGlkZUVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZpbHRlcignaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lcSgwKTtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG5cbiAgICAgICAgLy8gY29udGFpbmVyLmFkZENsYXNzKCdjb3JyZWN0Jyk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3IgbWVzc2FnZScpO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLmFkZEVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmaWVsZCk7XG5cbiAgICAgICAgdmFyIG1zZyA9IGNvbnRhaW5lci5maW5kKCcubWVzc2FnZS4nK2Vycm9yQ2xhc3MpLmVxKDApLnRleHQoKTtcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSBlcnIgPSB7fTtcblxuICAgICAgICBlcnJbZXJyb3JDbGFzc10gPSBtc2c7XG5cbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgJC5mbi5yZW1vdmVFcnJvciA9IGZ1bmN0aW9uKGVycm9yQ2xhc3MpIHtcblxuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgaWYoIWVycikgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgZGVsZXRlIGVycltlcnJvckNsYXNzXTtcbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG59KCBqUXVlcnkgKSk7IiwidmFyIF9hcHBWYXJzID0ge307XG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGNjRG9jdW1lbnRSZWFkeSk7XG5cbmZ1bmN0aW9uIGNjRG9jdW1lbnRSZWFkeSgpe1xuXG4gICAgLyoqXG4gICAgICogUHJvZ3Jlc3MgbmF2aWdhdGlvbiBtb2JpbGUgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcjcHJvZ3Jlc3Nfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBwcm9ncmVzc05hdiA9ICQoJyNwcm9ncmVzc19uYXYnKTtcbiAgICAgICAgdmFyIGhhbmRsZVBvcmdyZXNOYXZDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gcHJvZ3Jlc3NOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKCcxMDAlJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlUG9yZ3Jlc05hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzTmF2LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYud2lkdGgoNDApOyAvLyBjaGFuZ2luZyB0aGUgd2lkdGggdG8gbWFrZSB0aGUgZmlyc3QgYnV0dG9uIG9mIHByb2dyZXNzIGJhciBjbGlja2FibGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0byBib2R5IHNvIGRvIHRoZSB3b3JrIG9uIGJvZHkgY2xpY2sgXFwgb25seSBpZiBtZW51IGlzIGNsb3NlZFxuICAgICAgICAgKiB0aGlzIHRvIG1ha2Ugc3VyZSB0aGUgbWVudSBpcyBjbG9zZWQgd2hlbiBjbGljayBvdXRzaWRlIHRoZSBtZW51XG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZmFsc2UgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEhhbWJ1cmdlciBtZW51IGJ1dHRvbiBtb2JpbGUgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcjbWVudV9zd2l0Y2gnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG1lbnVOYXYgPSAkKCcjbWVudV9uYXYnKTtcbiAgICAgICAgdmFyIGhhbmRsZU1lbnVOYXZDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAvLy8vIHVuYmluZCB3aGVuIG1lbnUgY2xvc2VkIG5vIG5lZWQgdG8gY2hlY2sgZm9yIGNsaWNrXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnVuYmluZCgnY2xpY2snLCBoYW5kbGVNZW51TmF2Q2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVudU5hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZhbHNlID09PSBtZW51TmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVNZW51TmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgc2Nyb2xsaW5nIGV2ZW50IGxpc3RlbmVyIHRvIG1ha2UgdGhlIHByb2dyZXNzIGJhciBzdGlja3lcbiAgICAgKi9cbiAgICAvLyBpZigkKCdib2R5Jykud2lkdGgoKSA8IDY3OCl7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcpLm9uKCdzY3JvbGwnLCBtYWluU2Nyb2xsKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgc3RhdGVzIGRyb3AtZG93bnNcbiAgICAgKi9cbiAgICAgZmlsbFN0YXRlRHJvcGRvd24oICQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEZsb2F0IGxhYmVsIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnLmNjLWZpZWxkLmZsb2F0JykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0nKS5lcSgwKTtcblxuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50ID0gJ2tleXVwJztcbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZHJvcGRvd24nKSl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQgPSAnY2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkLm9uKHRyaWdnZXJFdmVudCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihmaWVsZC52YWwoKSl7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZWRpdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pOy8vLyAuZWFjaFxuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5qc0NvbGxhcHNlJykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLmZpbmQoJ2EuY2xvc2UsIGEuZGlzbWlzcycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYuc2xpZGVVcCgnZmFzdCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH0pOy8vLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIFNldCB5ZXMvbm8gcmFkaW8gYnV0dG9uXG4gICAgICovXG4gICAgeWVzTm9SYWRpbygpO1xuXG4gICAgLyoqXG4gICAgICogU2V0IG11bHRpIGNoZWNrYm94XG4gICAgICovXG4gICAgbXVsdGlDaGVja2JveCgpO1xuXG4gICAgLyoqXG4gICAgICogQmFjayBidXR0b24gY2xpY2sgaGFuZGxlcnNcbiAgICAgKi9cbiAgICAkKCcjYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfSlcblxufS8vLy8gZnVuLiBjY0RvY3VtZW50UmVhZHlcblxuZnVuY3Rpb24gbWFpblNjcm9sbChlKXtcbiAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIGlmKCQoJ2JvZHknKS53aWR0aCgpID4gNjc4KSByZXR1cm47XG5cbiAgICB2YXIgcyA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICB2YXIgYmFyID0gJCgnI3Byb2dyZXNzX25hdicpO1xuICAgIGlmKHMgPiAyMDApe1xuICAgICAgICBpZihmYWxzZSA9PT0gYmFyLmhhc0NsYXNzKCdmbG9hdCcpKXtcbiAgICAgICAgICAgIGJhci5hZGRDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgYmFyLmhlaWdodCgpKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGJhci5yZW1vdmVDbGFzcygnZmxvYXQnKTtcbiAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBudWxsKVxuICAgIH1cblxufS8vLy8gZnVuLiBtYWluU2Nyb2xsXG5cblxuZnVuY3Rpb24gdXBkYXRlVGFiSW5kZXgoc2VsZWN0b3Ipe1xuICB2YXIgeCA9IDA7XG4gICAgc2VsZWN0b3IuZmluZCgnLmNjLWZpZWxkJykuZWFjaChmdW5jdGlvbihpKXtcbiAgICAgICAgdmFyIHMgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPWRhdGVdLCBpbnB1dFt0eXBlPXRlbF0sIGlucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSwgaW5wdXRbdHlwZT1udW1iZXJdLCB0ZXh0YXJlYSwgc2VsZWN0JylcbiAgICAgICAgcy5lYWNoKGZ1bmN0aW9uKHope1xuICAgICAgICAgICQodGhpcykuYXR0cigndGFiaW5kZXgnLCB4KzEpO1xuICAgICAgICAgIHgrKztcbiAgICAgICAgfSlcbiAgICB9KVxufS8vLy8gZnVuLiB1cGRhdGVUYWJJbmRleFxuXG4vKipcbiAqIFt5ZXNOb1JhZGlvIFdpbGwgc2V0IHRoZSBiZWhhdmlvciBvZiB5ZXMvbm8gcmFkaW8gYnV0dG9ucyBieSBhZGRpbmcgLmNoZWNrZWQgY2xhc3MgdG8gdGhlIGxhYmVsIG9mIHRoZSBidXR0b25dXG4gKiB0aGUgZnVuY3Rpb24gYXNzdW1lIHRoZSBpbnB1dFt0eXBlPXJhZGlvbl0gaXMgaW5jbHVkZWQgaW5zaWRlIDxsYWJlbD4gdGFnXG4gKi9cbmZ1bmN0aW9uIHllc05vUmFkaW8oY29udGFpbmVyKXtcbiAgLy8vLyBpZiBjb250YWluZXIgaXMgcGFzc2VkIGZpbmQgdGhlIHJhZGlvcyBpbnNpZGUgaXQgb3IgZG8gYSBkb2N1bWVudCBnbG9iYWwgZmluZFxuICB2YXIgcmFkaW9zID0gISFjb250YWluZXIgPyBjb250YWluZXIuZmluZCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykgOiAkKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKTtcbiAgcmFkaW9zLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICBpZigkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJ2xhYmVsLmNoZWNrZWQnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgfSlcbiAgLm9uKCdmb2N1cycsIGZ1bmN0aW9uKGUpe1xuICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2ZvY3VzJyk7XG4gIH0pXG4gIC5vbignYmx1ciBraWxsZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICB9KTtcblxuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpOy8vLy8gdGhpcyB0byBzZXQgdGhlIGluaXRpYWwgc3RhdGVcbn1cblxuZnVuY3Rpb24gbXVsdGlDaGVja2JveCgpe1xuICB2YXIgcmFkaW9zID0gJCgnLmNjLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgIC8vICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uIGdseXBoaWNvbi1vaycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH0pO1xuICAvKipcbiAgICogVHJpZ2dlciBjaGFuZ2UgdG8gc2V0IHRoZSByaWdodCBhcHBlYXJhbmNlIHdoZW4gZm9ybSBpcyBwcmUtbG9hZGVkIHdpdGggZGF0YVxuICAgKi9cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpO1xufS8vLy8gZnVuLiBtdWx0aUNoZWNrQm94XG5cbi8qKlxuICogW2ZpbGxTdGF0ZURyb3Bkb3duIHdpbGwgZmlsbCB0aGUgZHJvcGRvbiBvZiBVU0Egc3RhdGVzIGZvcm0gdXNTdGF0ZSB2YXJpYWJsZV1cbiAqIEBwYXJhbSAge1t0eXBlXX0gc2VsZWN0b3IgW2pRdWVyeSBvYmplY3QgdGhhdCBjb250YWluIDxzZWxlY3Q+IHRhZyB0byBiZSBmaWxsZWRdXG4gKiB1c1NhdGUgaXMgYXJyYXkgb2Ygb2JqZWN0IGRlZmluZWQgaW4gdXMtc3RhdHVzLmpzIGZpbGVcbiAqL1xuZnVuY3Rpb24gZmlsbFN0YXRlRHJvcGRvd24oc2VsZWN0b3Ipe1xuICAgIHNlbGVjdG9yLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciB1bCA9ICQodGhpcykuZmluZCgnc2VsZWN0Jyk7XG4gICAgICAgIGZvcih2YXIgcz0wOyBzPHVzU3RhdGVzLmxlbmd0aDsgcysrKXtcbiAgICAgICAgICAgIHZhciBsaSA9ICQoJzxvcHRpb24gdmFsdWU9XCInICsgdXNTdGF0ZXNbc10uYWJicmV2aWF0aW9uICsgJ1wiPicgKyB1c1N0YXRlc1tzXS5uYW1lICsgJzwvb3B0aW9uPicpO1xuICAgICAgICAgICAgdWwuYXBwZW5kKGxpKTtcbiAgICAgICAgfS8vLy8gZm9yXG4gICAgfSk7XG59Ly8vLyBmdW4uIGZpbGxTdGF0ZURyb3Bkb3duXG5cbi8qKlxuICogW2lzQW5kcm9pZCBzaW1wbGUgZnVuY3Rpb24gdG8gZGV0ZWN0IEFuZHJvaWQgT1NdXG4gKiB0aGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gZGV0ZWN0IHRoZSBidWcgaW4gQW5kcm9pZCB3aGVuIGtleWRvd24sIGtleXVwIGV2ZW50IGRvZXNuJ3Qgc2VuZCB0aGUgcmlnaHQga2V5IGNvZGVcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFt0cnVlIGlmIEFuZHJvaWQgT1NdXG4gKi9cbnZhciBpc0FuZHJvaWQgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gLyhhbmRyb2lkKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59Ly8vLyBmdW4uIGlzQW5kcm9pZFxuXG5cbnZhciByZXN0cmljdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcblxuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAtKCkgXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbMTg5LCA0OCwgNTcsIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpXG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBmb3JtYXRQaG9uZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByYXdWYWx1ZSA9IHZhbC5zcGxpdCgvW1xcKHxcXCl8IHxcXC18XFwrfFxcLl0vKS5qb2luKCcnKTtcbiAgdmFyIGZvcm1hdGVkID0gJyc7XG4gIGlmKHJhd1ZhbHVlLmxlbmd0aCA+PSAzKXtcbiAgICBmb3JtYXRlZCArPSAnKCcgKyByYXdWYWx1ZS5zbGljZSgwLDMpICsgJykgJztcbiAgICByYXdWYWx1ZSA9IHJhd1ZhbHVlLnNsaWNlKDMpO1xuICB9XG4gIGlmKHJhd1ZhbHVlLmxlbmd0aCA+PSAzKXtcbiAgICBmb3JtYXRlZCArPSByYXdWYWx1ZS5zbGljZSgwLDMpICsgJy0nO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgZm9ybWF0ZWQgKz0gcmF3VmFsdWU7XG5cbiAgJCh0aGlzKS52YWwoZm9ybWF0ZWQpO1xufS8vLy8gZnVuLiBmb3JtYXRQaG9uZVxuXG52YXIgcmVzdHJpY3REYXRlID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcblxuICB2YXIgYWxsb3dlZENoYXJzID0gWycwJywgJzEnLCAnMicsICczJywgJzQnLCAnNScsICc2JywgJzcnLCAnOCcsICc5JywgJy8nXVxuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpXG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciBmb3JtYXREYXRlID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC8vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICcvJztcbiAgICByYXcgPSByYXcuc2xpY2UoMik7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICcvJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufS8vLy8gZnVuLiBmb3JtYXRlRGF0ZVxuXG52YXIgcmVzdHJpY3RTU04gPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAtXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbMTg5LCA5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZVNTTlxuXG52YXIgZm9ybWF0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLS9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAzKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDMpICsgJy0nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgzKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy0nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59XG5cbnZhciByZXN0cmljdE51bWJlcnMgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFs5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5oaWRlRXJyb3IoKTtcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZVNTTlxuXG52YXIgcmVzdHJpY3RDdXJyZW5jeSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MCQsXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JykuaGlkZUVycm9yKCk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciBmb3JtYXRDdXJyZW5jeSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnNwbGl0KC9bXFwkfCB8XFwsXS8pLmpvaW4oJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPiAzKXtcbiAgICAgIHZhciBhcnIgPSByYXcuc3BsaXQoJycpO1xuICAgICAgdmFyIHNlcCA9IDE7XG4gICAgICBmb3IodmFyIHg9YXJyLmxlbmd0aC0xOyB4Pj0wOyB4LS0pe1xuICAgICAgICAvLy8vIGFkZCByZWFkaW5nIGNvbW1hIGFmdGVyIDMgZGlnaXRzIGFuZCBvbmx5IGlmIHRoZXJlIGlzIG5leHQgZGlnaXRcbiAgICAgICAgcmV0ID0gKHNlcCAlIDMgPT0gMCAmJiB0cnVlID09PSAhIWFyclt4LTFdPyAnLCcgOiAnJykgKyBhcnJbeF0gICsgcmV0O1xuICAgICAgICBzZXArKztcbiAgICAgIH1cbiAgICAgIHJldCA9ICckJyArIHJldDtcbiAgfVxuICBlbHNlIGlmKHJhdy5sZW5ndGggPiAwKXtcbiAgICByZXQgPSAnJCcgKyByYXc7XG4gIH1cbiAgZWxzZXtcbiAgICByZXQgPSByYXc7XG4gIH1cblxuICAkKHRoaXMpLnZhbChyZXQpO1xufS8vLy8vIGZ1bi4gZm9ybWF0Q3VycmVuY3lcblxudmFyIGFuaW1hdGVTY3JvbGwgPSBmdW5jdGlvbih5LCB0aW1lKXtcblxuICAgIGNsZWFySW50ZXJ2YWwoX2FwcFZhcnMuc2Nyb2xsSW50ZSk7Ly8vLyBzdG9wIGFueXNjcm9sbGluZ1xuXG4gICAgaWYodW5kZWZpbmVkID09PSB0aW1lKSB0aW1lID0gMTsvLy8vIHNldCBkZWZhdWx0IHZhbHVlIGZvciB0aW1lXG4gICAgdmFyIGZwcyA9IDYwOyAvLy8vIGZyYW1lcyBwZXIgc2Vjb25zXG4gICAgdmFyIGZyYW1lVGltZSA9IE1hdGguY2VpbCgxMDAwIC8gZnBzKTtcbiAgICB2YXIgZCA9IHRpbWUgKiBmcmFtZVRpbWU7IC8vLyBudW1iZXIgb2YgZnJhbWVzIGR1cmF0aW9uXG4gICAgdmFyIHQgPSAwOyAvLy8vIHRpbWUgdGlja2VyIC8gZnJhbWUgY291bnRlclxuXG4gICAgLy8vLyBzZXQgYmVnaW4gcG9pbnQgd2hpaGMgdGhlIGN1cnJyZW50IHBvaW50XG4gICAgLy8gYiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogd2luZG93LnNjcm9sbFk7XG4gICAgdmFyIGIgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xuICAgIC8vXG4gICAgaWYoYiA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgYiA9IDA7XG4gICAgfVxuXG5cbiAgICAvLy8vIGNoZWNrIGlmIHNjcm9sbGluZyBkZXN0aW5hdGlvbiBpcyBiaWdnZXIgdGhhbiBwYWdlIGhlaWdodCBsaW1pdHNcbiAgICB2YXIgbGltaXQgPSBNYXRoLm1heCggZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgKTtcbiAgICBpZih5PmxpbWl0KXtcbiAgICAgICAgeSA9IGxpbWl0O1xuICAgIH1cblxuICAgIC8vLy8gc2V0IHRoZSBjaGFuZ2UgYmV0d2VlbiBjdXJyZW50IGFuZCBkZXN0aW5hdGlvbiBwb2ludFxuICAgIGMgPSBiIC0geTtcblxuICAgIC8vLy8gZG8gbm90aGluZyBpZiBkZXN0aW5hdGlvbiBpcyBzYW1lIGFzIGN1cnJlbnRcbiAgICBpZihNYXRoLmFicyhjKSA8IDEpIHJldHVybjtcblxuICAgIC8vLy8gc3RhcnQgdGltZSB0aWNrZXJcbiAgICBfYXBwVmFycy5zY3JvbGxJbnRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8vIGVhc2Ugb3V0IG1hdGhcbiAgICAgICAgdmFyIHBlciA9IDEgLSB0L2Q7XG4gICAgICAgIHZhciBuZXdZID0gIC1jICogKDEtcGVyKnBlcipwZXIqcGVyKSArIGI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI+PlwiLCAxLSgxLXBlcikqKDEtcGVyKSk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXdZKTtcblxuXG4gICAgICAgIGlmKHQgPT0gZCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF9hcHBWYXJzLnNjcm9sbEludGUpO1xuICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2FuaW1hdGVTY3JvbGxFbmQnKTtcbiAgICAgICAgfVxuICAgICAgICB0Kys7XG5cbiAgICB9LCBmcmFtZVRpbWUpO1xufS8vLy8gZnVuLiBhbmltYXRlU2Nyb2xsXG5cbi8qKlxuICogW3Jlc2V0RmllbGRzIHdpbGwgc2VhcmNoIGZvciBpbnB1dCBmaWVsZCBpbnNpZGUgYSBjb250YWluZXIgYW5kIHJlc3QgaXRzIHZhbHVlIGFuZCBhbnkgZXJyb3Igc3RhdHVzXVxuICogQHBhcmFtICB7W3R5cGVdfSBjb250YWluZXIgW2pRdWV5ciBvYmplY3QgdGhhdCBzaG91bGQgY29udGFpbiBpbnB1dCBmaWxlZCB0aGF0IG5lZWQgYmUgcmVzZXRdXG4gKi9cbnZhciByZXNldEZpZWxkcyA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gIHZhciBmaWVsZHMgPSBjb250YWluZXIuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICB2YXIgdHlwZSA9ICQodGhpcykuYXR0cigndHlwZScpO1xuICAgIGlmKHR5cGUgPT09ICdyYWRpbycpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbHRlcignbGFiZWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgIH1cbiAgICAkKHRoaXMpLmhpZGVFcnJvcigpO1xuICB9KTtcblxufS8vLy8gZnVuLiByZXNldEZpZWxkc1xuXG4vKipcbiAqIFtpbmNsdWRlRmllbGRzIHdpbGwgYWRkIGhpZGRlbiBmaWVsZHMgaW4gZm9ybSBhbmQgc2V0IHRoZSByaWdodCB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgZS5nLiBcIi5uZXctZmllbGRzXCIsIFwiI2Nsb2RpbmdEYXRlXCJcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBpbmNsdWRlIGluIHZhbGlkYXRpb25cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbnZhciBpbmNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIGZpZWxkcy5zbGlkZURvd24oKTtcblxufVxuXG4vKipcbiAqIFtleGNsdWRlRmllbGRzIHdpbGwgZXhjbHVkZSBmaWVsZHMgZnJvbSBmb3JtIGFuZCBzZXQgcmVtb3ZlIHRoZSB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgZXhjbHVkZWRcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBleGNsdWRlZCBmcm9tIHZhbGlkYXRpb25cbiAqL1xudmFyIGV4Y2x1ZGVGaWVsZHMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMuc2VsZWN0b3IgfHwgIW9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcyA9ICQob3B0aW9ucy5zZWxlY3Rvcik7XG4gIGZpZWxkcy5maW5kKG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgcmVzZXRGaWVsZHMoZmllbGRzKTtcbiAgZmllbGRzLnNsaWRlVXAoKTtcblxufVxuIiwiJChkb2N1bWVudCkucmVhZHkoYm9ycm93ZXJSZWFkeSk7XG52YXIgYWRkcmVzc1RlbXBsYXRlO1xudmFyIGFkZHJlc3NJbmRleDtcblxuXG5mdW5jdGlvbiBib3Jyb3dlclJlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI2JvcnJvd2VyRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNib3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIFthZGRyZXNzSW5kZXggd2lsbCB0cmFjayB0aGUgbnVtYmVyIG9mIGFkZHJlc3MgYWRkZWQgYW5kIHN0b3AgaWYgdG90YWwgb2YgNCBhZGRyZXNzXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgYWRkcmVzc0luZGV4ID0gMTtcblxuICAgIGFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGQsIGludmFsaWRGaWVsZHMpe1xuXG4gICAgICAgIGlmKGlzVmFsZCl7XG5cbiAgICAgICAgICAgIHZhciBpc0NvQm9ycm93ZXIgPSAgU3RyaW5nKCcyMzQnKS5zcGxpdCgnJykuaW5kZXhPZiggJCgnI2JvX2FwcGx5dHlwZScpLnZhbCgpICkgPiAtMTtcblxuICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNDb0JvcnJvd2VyKXtcbiAgICAgICAgICAgICAgICBteUZvcm0uYXR0cignYWN0aW9uJywgJzAyLWNvYm9ycm93ZXIuaHRtbCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8vLyBpZiB0aGUgZm9ybSBpcyBub3QgdmFsaWQgYW5kIGNvbnRpbnVlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICAgICAgICAvLy8vIHNjcm9sbCB0byB0aGUgcGFnZSB0byBmaXJzdCBmaWVsZCB3aXRoIGVycm9yXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcblxuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpOyAgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IC8vLy8gaWYgaXNWYWxpZCBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KTtcblxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIGV2ZW50IGhhbmRsZXJzIGFyZSBpbiBtYWluLmpzXG4gICAgICovXG5cbiAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgJCgnaW5wdXQuc3NuJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFNTTilcbiAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSlcblxuXG5cbiAgICAkKCcjYm9faG93aGVhcicpLm9mZignY2hhbmdlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdmFsID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwxMCk7XG4gICAgICAgIHZhciBhcnIgPSBbMiwzLDQsNV07XG4gICAgICAgIGlmKGFyci5pbmRleE9mKHZhbCkgPiAtMSl7XG4gICAgICAgICAgICAkKCcjcmVmZXJyYWxGaWVsZCcpLnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjcmVmZXJyYWxGaWVsZCcpLnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUnKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgKi9cbiAgICBjaGVja0FkZHJlc3NMZW5ndGgobXlGb3JtLCBhZGRyZXNzSW5kZXgpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAqL1xuICAgICQoJyNib19kZXBlbmRhbnRzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgYWdlc0RpdiA9ICQoJyNkZXBlbmRlbnRTZWN0aW9uJyk7XG4gICAgICAgIHZhciBjb2xzID0gYWdlc0Rpdi5maW5kKCcuY29sLXhzLTYnKS5oaWRlKCk7XG5cbiAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgZm9yKHZhciB4PTA7IHg8djsgeCsrKXtcbiAgICAgICAgICAgICAgICBjb2xzLmVxKHgpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGNoYW5nZSBvZiByYWRpbyBidXR0b24gY3VycmVudCBhZGRyZXNzIG93bi9yZW50XG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1ib19jdXJyZW50bHldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICB2YXIgcmVudENvbCA9ICQoJyNtb250aGx5UmVudCcpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gcmVudENvbC5maW5kKCcuY2MtZmllbGQnKS5lcSgwKTtcbiAgICAgICAgaWYodmFsLnRvTG93ZXJDYXNlKCkgPT09ICdyZW50Jyl7XG4gICAgICAgICAgICByZW50Q29sLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVudENvbC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICBjb250YWluZXJcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgbWVzc2FnZSBlcnJvcicpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGV2ZW50TmFtZSA9ICQuYnJvd3Nlci5zYWZhcmk9PT0gdHJ1ZSA/ICdibHVyJyA6ICdjaGFuZ2UnOyAvLy8vIGNoYW5nZSBpcyBub3QgZmlyZWQgd2hlbiBhdXRvZmlsbCBpcyB1c2VkIG9uIHNhZmFyaVxuICAgICQoJyNib19lbWFpbCcpLm9uKGV2ZW50TmFtZSwgZnVuY3Rpb24oKXtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIG1ha2Ugc3VyZSBlbWFpbCBmaWVsZCBpcyB2YWxpZGF0ZSBiZWZvcmUgZG9pbmcgYW55IGNoZWNrXG4gICAgICAgICAqIGlkICNlbWFpbEZpZWxkIGlzIGdpdmVuIHRvIC5jYy1maWVsZCBjb250YWluZXIgb2YgZW1haWwgZmllbGRcbiAgICAgICAgICovXG4gICAgICAgICQoJyNlbWFpbEZpZWxkJykudmFsaWRhdGVGaWVsZCgpO1xuXG4gICAgICAgIHZhciB2YWwgPSAkLnRyaW0oJCh0aGlzKS52YWwoKSk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gJCh0aGlzKS5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgaWYodmFsICYmIHRydWUgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6XCJhcGktcmVzcG9uc2UvaXMtZW1haWwtZXhpc3RzLmpzb25cIixcbiAgICAgICAgICAgICAgICBkYXRhOntlbWFpbDp2YWx9LFxuICAgICAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTpcImpzb25cIixcbiAgICAgICAgICAgICAgICBlcnJvcjpmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2dpblNlY3Rpb24oZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICBpZihyZXQuZW1haWwudG9Mb3dlckNhc2UoKSA9PSB2YWwudG9Mb3dlckNhc2UoKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9naW5TZWN0aW9uKHJldC5leGlzdHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmV0LmV4aXN0cyA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2xvZ2luX2VtYWlsJykudmFsKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxvZ2luU2VjdGlvbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfS8vLyBpZiB2YWxcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHVwZGF0ZUxvZ2luU2VjdGlvbihmYWxzZSk7XG4gICAgICAgIH0vLy8vIG5vdCB2YWxcblxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIGFkZHJlc3MgdHlwZSBhaGVhZCBmdW5jdGlvbmFsaXR5IHRvIGFkZHJlc3NcbiAgICAgKi9cbiAgICBhZGRBdXRvQWRkcmVzcygxKTtcblxufTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuZnVuY3Rpb24gdXBkYXRlTG9naW5TZWN0aW9uKGVtYWlsRXhpc3RzKXtcbiAgICBpZih0cnVlID09PSBlbWFpbEV4aXN0cykge1xuICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2xvZ2luU2VjdGlvbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNsb2dpblNlY3Rpb24nLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgfVxufS8vLy8vIGZ1bi4gdXBkYXRlTG9naW5TZWN0aW9uXG5cblxuXG5mdW5jdGlvbiBjaGVja0FkZHJlc3NMZW5ndGgoY29udGFpbmVyLCBpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+IDEgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcblxuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG4gICAgICAgIGlmKCF2KSB2ID0wO1xuICAgICAgICBpZigheWVhcnMpe1xuICAgICAgICAgICAgeWVhcnMgPSAwO1xuICAgICAgICAgICAgJCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApLnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG5cbiAgICAgICAgaWYoIXYpIHtcbiAgICAgICAgICAgIHYgPTA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXllYXJzKSB5ZWFycyA9IDA7XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSlcbn0vLy8vLyBmdW4uIGNoZWNrQWRkcmVzc0xlbmd0aFxuXG5mdW5jdGlvbiBhZGRBZGRyZXNzKG5leHRJZCl7XG4gICAgaWYobmV4dElkID49IDUpIHJldHVybiBmYWxzZTtcbiAgICBpZihhZGRyZXNzSW5kZXggPj0gbmV4dElkKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgc2VjdGlvbiA9ICQoJyNwcmVBZGRyZXNzJyk7XG4gICAgYWRkcmVzc0luZGV4ID0gbmV4dElkO1xuICAgIHZhciBhZGRyZXNzID0gJChhZGRyZXNzVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgYWRkcmVzc0luZGV4KSk7XG5cbiAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZC5jYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBhZGRyZXNzLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7IC8vLy8gZnVuLiBpbiBtYWluLmpzXG5cbiAgICBhZGRyZXNzLmZpbmQoJ2lucHV0Lm51bWJlcnMnKS5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycyk7XG5cbiAgICBjaGVja0FkZHJlc3NMZW5ndGgoYWRkcmVzcywgYWRkcmVzc0luZGV4KTtcblxuICAgIHNlY3Rpb24uYXBwZW5kKGFkZHJlc3MpO1xuICAgIGFkZEF1dG9BZGRyZXNzKGFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIHNlY3Rpb24uc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBhZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9YWRkcmVzc0luZGV4OyB4Kyspe1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHNlY3Rpb24uZmluZCgnI2FkZHJlc3NfJyArIHgpO1xuXG4gICAgICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgYWRkcmVzcy5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG4gICAgYWRkcmVzc0luZGV4ID0gaWRSZW1vdmUtMTtcbiAgICBpZihhZGRyZXNzSW5kZXggPD0gMSkgc2VjdGlvbi5zbGlkZVVwKClcbn1cblxuLyoqXG4gKiBbYWRkQXV0b0FkZHJlc3Mgd2lsbCBhZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gdGV4dCBmaWVsZCB3aXRoIGlkICdib19hZGRyZXNzJ11cbiAqIEBwYXJhbSB7W3R5cGVdfSBpbmRleCBbaW4gbXVsdGktYWRkcmVzcyBjYXNlIHRoaXMgdmFyaWFibGUgd2lsbCB0ZWwgdGhlIGZ1bmN0aW9uIHdoaWNoIGFkZHJlc3MgdG8gYmluZCB0aGUgdHlwZSBhaGVhZCB0b11cbiAqL1xuZnVuY3Rpb24gYWRkQXV0b0FkZHJlc3MoaW5kZXgpe1xuICAgIHZhciBwb3N0ID0gaW5kZXggPj0gMiA/ICcnK2luZGV4IDogJyc7XG5cbiAgICB2YXIgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib19hZGRyZXNzJyArIHBvc3QpLFxuICAgICAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnICsgcG9zdCkuZmlsdGVyKCdpbnB1dCcpWzBdLFxuICAgICAgICB7dHlwZXM6IFsnZ2VvY29kZSddfVxuICAgICk7XG4gICAgLy8vLyBzZXQgdGhlIGFkZHJlc3MgaW5kZXggYW5kIHBvc3QgaW4gYXV0b2NvbXBsZXRlIG9iamVjdCB0byBiZSB1c2VkIGluIGZpbGxJbkFkZHJlc3MgZnVuY3Rpb25cbiAgICBhdXRvY29tcGxldGUuaW5kZXggPSAwO1xuICAgIGF1dG9jb21wbGV0ZS5wb3N0ID0gcG9zdDtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhZGRyZXNzIGZyb20gdGhlIGRyb3Bkb3duLCBwb3B1bGF0ZSB0aGUgYWRkcmVzc1xuICAgIC8vIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBmaWxsSW5BZGRyZXNzKTtcbn1cblxuLyoqXG4gKiBbZmlsbEluQWRkcmVzcyB3aWxsIHVwZGF0ZSB0aGUgYWRkcmVzcyBjaXR5LCBzdGF0LCBhbmQgemlwIGZpbGVkIGFmdGVyIHVzZXIgc2VsZWN0IGFkZHJlc3MgZm9ybSB0eXBlIGFoZWFkXVxuICogdGhpcyBpbnNpZGUgdGhpcyBmdW5jdGlvbiB3aWxsIHJlZmVyZW5jZSBnb29nbGUgYXV0b2NvbXBldGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtbbnVsbF19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmlsbEluQWRkcmVzcygpe1xuICAgIC8vLy8gdGhpcyByZWZlciB0byB0aGUgYXV0byBjb21wbGV0ZSBvYmplY3RcblxuICAgIHZhciBwbGFjZSA9IHRoaXMuZ2V0UGxhY2UoKTtcbiAgICB2YXIgY29tcG9uZW50Rm9ybSA9IHtcbiAgICAgICAgc3RyZWV0X251bWJlcjogJ3Nob3J0X25hbWUnLFxuICAgICAgICByb3V0ZTogJ2xvbmdfbmFtZScsXG4gICAgICAgIGxvY2FsaXR5OiAnbG9uZ19uYW1lJyxcbiAgICAgICAgYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIGNvdW50cnk6ICdsb25nX25hbWUnLFxuICAgICAgICBwb3N0YWxfY29kZTogJ3Nob3J0X25hbWUnXG4gICAgfTtcblxuICAgIHZhciBhZGRyZXNzID0ge307XG4gICAgdmFyIGxvbmdfbmFtZSA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0eXBlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzWzBdO1xuICAgICAgICB2YXIgYWRkcmVzc1R5cGUgPSB0eXBlO1xuXG4gICAgICBpZiAoY29tcG9uZW50Rm9ybVthZGRyZXNzVHlwZV0pIHtcbiAgICAgICAgdmFyIHZhbCA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVtjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXV07XG4gICAgICAgIGFkZHJlc3NbYWRkcmVzc1R5cGVdID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYoYWRkcmVzc1R5cGUgPT09ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKXtcbiAgICAgICAgICAgIGxvbmdfbmFtZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVsnbG9uZ19uYW1lJ107XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmb3JcbiAgICBhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUgPSBsb25nX25hbWU7XG5cbiAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnK3RoaXMucG9zdCkuZXEoMCkudmFsKGFkZHJlc3Muc3RyZWV0X251bWJlciArICcgJyArIGFkZHJlc3Mucm91dGUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfY2l0eScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5sb2NhbGl0eSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9zdGF0ZScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIC8vICQoJyNzdGF0ZV9sYWJlbCcrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFfbG9uZ19uYW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3ppcCcrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5wb3N0YWxfY29kZSkudHJpZ2dlcignY2hhbmdlJyk7XG59IiwiJChkb2N1bWVudCkucmVhZHkoY29Cb3Jyb3dlclJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5mdW5jdGlvbiBjb0JvcnJvd2VyUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjY29Cb3Jyb3dlckZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIFthZGRyZXNzSW5kZXggd2lsbCB0cmFjayB0aGUgbnVtYmVyIG9mIGFkZHJlc3MgYWRkZWQgYW5kIHN0b3AgaWYgdG90YWwgb2YgNCBhZGRyZXNzXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgYWRkcmVzc0luZGV4ID0gMTtcblxuICAgIGFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5zc24nKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBjby1ib3Jyb3dlciBsaXZlIGluIGRpZmZlcmVudCBhZGRyZXNzXG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1jb19saXZlc2FtZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSAneWVzJyl7XG5cbiAgICAgICAgICAgICQoJyNhZGRyZXNzRGl2Jykuc2xpZGVVcCgpXG4gICAgICAgICAgICAuZmluZCgnLmNjLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCBtZXNzYWdlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnI3ByZUFkZHJlc3MnKS5zbGlkZVVwKCkuZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZURvd24oKVxuICAgICAgICAgICAgLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVUYWJJbmRleChteUZvcm0pOyAvLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQmFjayBidXR0b24gY2xpY2sgaGFuZGxlcnNcbiAgICAgKi9cbiAgICAkKCcjYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGNlKXtcbiAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgKiBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAqL1xuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIGFkZHJlc3NJbmRleCk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBudW1iZXIgb2YgZGVwZW5kZW50cyBjaGFuZ2UgYW5kIHNob3cgYWdlcyBmaWVsZHNcbiAgICAgKi9cbiAgICAkKCcjY29fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgY28tYm9ycm93ZXIgbmFtZSBpbiBzdWIgdGl0bGVzXG4gICAgICovXG4gICAgdmFyIG5hbWVIb2xkZXIgPSAkKCcuY29Cb3Jyb3dlck5hbWUnKTtcbiAgICAkKCcjY29fZm5hbWUnKS5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHZhbCA9ICQudHJpbSggJCh0aGlzKS52YWwoKSApO1xuICAgICAgICBuYW1lSG9sZGVyLnRleHQoIHZhbCA/IHZhbCA6ICdDby1Cb3Jyb3dlcicpO1xuICAgIH0pXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuIiwiJChkb2N1bWVudCkucmVhZHkocHVyY2hhc2VSZWFkeSk7XG52YXIgYWRkcmVzc1RlbXBsYXRlO1xudmFyIGFkZHJlc3NJbmRleDtcblxuZnVuY3Rpb24gcHVyY2hhc2VSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNwdXJjaGFzZUZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgcmVhbCBzdGF0ZSBhZ2VudFxuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cHVfdXNpbmdhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIHZhciBhZ2VudCA9ICQoJyNhZ2VudENvbnRhY3QnKTtcbiAgICAgICAgdmFyIGFnZW50RmllbGRzID0gJCgnI2FnZW50RmllbGRzJyk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRDb250YWN0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonI2FnZW50RmllbGRzLCAjYWdlbnRDb250YWN0JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSk7Ly8vLy8gb24uY2hhbmdlXG5cblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGlmIGNvbnRhY3QgYWdlbnRcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPXB1X2NvbnRhY3RhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRGaWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRGaWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgcHJvcGVydHlcbiAgICAgKi9cbiAgICAkKCcjcHVfc2VhcmNodHlwZXB1cmNoYXNlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpc1Byb3BlcnR5ID0gU3RyaW5nKCczNCcpLnNwbGl0KCcnKS5pbmRleE9mKHZhbCkgPiAtMTtcblxuICAgICAgICBpZih0cnVlID09PSBpc1Byb3BlcnR5KXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHktZmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnByb3BlcnR5LWZpZWxkcywgI3N1Yk5hbWUsICNjbG9zaW5nRGF0ZSwgI21vbnRobHlIT0EnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtc3ViLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZywgLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuXG4gICAgfSk7Ly8vIG9uLmNoYW5nZVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgSE9BIGR1ZXNcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPXB1X3BsYW5uZWR1bml0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1IT0EnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXB1X2hhdmVjbG9zaW5nZGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1wdV9tYW51ZmFjdHVyZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3ViJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG4iLCIkKGRvY3VtZW50KS5yZWFkeShyZWZpbmFuY2VSZWFkeSk7XG52YXIgYWRkcmVzc1RlbXBsYXRlO1xudmFyIGFkZHJlc3NJbmRleDtcblxuZnVuY3Rpb24gcmVmaW5hbmNlUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjcmVmaW5hbmNlRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5zc24nKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIC8qKlxuICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICovXG4gICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9wcm9wZXJ0eXJlZmluYW5jaW5nXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodmFsID09PSAnbm8nICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vdGhlckFkZHJlc3MnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBIT0EgZHVlc1xuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cmZfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX2ZvcnNhbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfc3ViamVjdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2NvbnN0cnVjdGlvbkJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX2lzdGl0bGVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9oYXZlTW9ydGdhZ2UxXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlLCAuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2wnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfc2VjbW9ydGdhZ2VdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlY29uZE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQsICNhZGRpdGlvbmFsTGllbnMnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnRnYWdlMiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsLCAuY2MtdG8tYmUtdmFsaWRhdGUtbGluZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9tb3J0Z2FnZTJMT0NdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNyZWRpdC1saW1pdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxsaWVuc10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FkZGl0aW9uYWxMaWVucycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpZW4nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG4iLCIkKGRvY3VtZW50KS5yZWFkeShib0luY29tZVJlYWR5KTtcbnZhciBlbXBsb3llclRlbXBsYXRlLCBlbXBsb3llckluZGV4LCBlbXBsb3llcnNIb2xkZXI7XG52YXIgcmVudFRlbXBsYXRlLCByZW50SW5kZXgsIHJlbnRzSG9sZGVyLCByZW50c0FycmF5O1xuZnVuY3Rpb24gYm9JbmNvbWVSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNib0luY29tZUZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIGVtcGxveWVyVGVtcGxhdGUgPSAkKCcjZW1wbG95ZXJUbXBsdCcpLnRleHQoKTtcbiAgICBlbXBsb3llckluZGV4ID0gMTtcbiAgICBlbXBsb3llcnNIb2xkZXIgPSAkKCcjZW1wbG95ZXJzSG9sZGVyJyk7XG5cblxuICAgIC8qKlxuICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICovXG4gICAgcmVudFRlbXBsYXRlID0gJCgnI3JlbnRUbXBsdCcpLnRleHQoKTtcbiAgICAvKipcbiAgICAgKiBbcmVudEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIHJlbnQgcHJvcGVydHkgaW5zaWRlIHRoZSBET01cbiAgICAgKiB0aGlzIHZhcmlhYmxlIHdvcmsgc2ltaWxhciB0byBhdXRvIGluY3JlbWVudCBmaWVsZCBpbiBkYXRhIGJhc2UgYW5kIGl0IGlzIG5vdCByZWxhdGVkIHRvIGZpZWxkcyBuYW1lIGFuZCBmaWVsZHMgaWRdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICByZW50SW5kZXggPSAwO1xuXG4gICAgLyoqXG4gICAgICogW3JlbnRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgcmVudCBwcm9wZXJ0aWVzIHdpbGwgYmUgYXBwZW5kZWRdXG4gICAgICovXG4gICAgcmVudHNIb2xkZXIgPSAkKCcjcmVudHNIb2xkZXInKTtcblxuICAgIC8qKlxuICAgICAqIFtyZW50c0FycmF5IHdpbGwgdHJhY2sgdGhlIHBvc2l0aW9uIG9mIGVhY2ggcmVudCBwcm9wZXJ0eSBpbmRleFxuICAgICAqIHdoZW4gdXNlciBzdGFydCBhZGRpbmcgYW5kIHJlbW92aW5nIHJlbnRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IHJlbnQgaGFzIGluZGV4IG9mIDQgYW5kIHNlY29uZCByZW50IGhhcyBpbmRleCBvZiA2XG4gICAgICogdGhlIHBvc2l0aW9ucyBvZiB0aGlzIGFycmF5IGVsZW1lbnRzIHdpbGwgaGVscCBlbmZvcmNlIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyB0byBzdGF5IGluIHNlcXVlbmNlIG9mIDEsMiwzLC4uLiB3aXRoIGhlbHAgb2YgdXBkYXRlUmVudHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgKi9cbiAgICByZW50c0FycmF5ID0gW107XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciBlbXBsb3llcnNcbiAgICAgKi9cbiAgICBlbXBsb3llcnNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKG15SW5kZXgpO1xuICAgICAgICBiaW5kRW1wbG95bWVudERhdGUobXlJbmRleCk7XG4gICAgICAgIGVtcGxveWVySW5kZXggPSBteUluZGV4O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSB0aGUgZm9ybSB3aGVuIGl0cyBwcmVsb2FkZWQgd2l0aCBzYXZlZCBkYXRhIGZvciByZW50IHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICByZW50c0hvbGRlci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBteUluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmZpbmQoJ2lucHV0W2lkXj1yZV9hZGRyZXNzXScpLmVxKDApLmF0dHIoJ2lkJykuc3BsaXQoJ3JlX2FkZHJlc3MnKVsxXSwgMTApO1xuXG4gICAgICAgIGFkZEF1dG9BZGRyZXNzKDEwMCArIG15SW5kZXgpO1xuXG4gICAgICAgIHJlbnRJbmRleCA9IG15SW5kZXg7XG4gICAgICAgIHJlbnRzQXJyYXkucHVzaChyZW50SW5kZXgpO1xuXG4gICAgICAgIGJpbmRSZW50TW9ydGdhZ2UobXlJZCk7XG5cbiAgICAgICAgJCh0aGlzKS5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaSA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgICAgICByZW1vdmVSZW50KGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICovXG4gICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWUyXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5lbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICBiaW5kRW1wbG95bWVudERhdGUoMSk7XG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmVtcGxveW1lbnQsIC5wcmVFbXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1lbSwgLmNjLXRvLWJlLXZhbGlkYXRlLXByZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgaWYoZW1wbG95ZXJJbmRleCA+IDEpe1xuICAgICAgICAgICAgICAgIHJlbW92ZUVtcGxveWVyKDIpOyAvLy8gd2lsbCB0YWtlIGNhcmUgb2YgdGhlIHJlc3Qgb2ZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWUzXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5zZWxmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcyg1KVxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zZWxmJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zZWxmJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lNF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuYWRkaXRpb25hbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNilcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuYWRkaXRpb25hbCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtYWRkaXRpb25hbCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJldGlyZW1lbnQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5yZXRpcmVtZW50JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZXRpcmVtZW50J1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lNl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc3NuJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3NuJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5zc24nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbidcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTddJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNoaWxkJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmNoaWxkJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jaGlsZCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZThdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmRpdmlkZW5kJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmRpdmlkZW5kJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1kaXZpZGVuZCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTldJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJlbnRhbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKHJlbnRzQXJyYXkubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgd2hpbGUocmVudHNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICByZW1vdmVSZW50KHJlbnRzQXJyYXlbcmVudHNBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfS8vLyB3aGlsZVxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIGFkZFJlbnQoKTtcbiAgICB9KVxuXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG5mdW5jdGlvbiBiaW5kRW1wbG95bWVudERhdGUoaW5kZXgpe1xuXG4gICAgdmFyIGZpZWxkcyA9ICQoJ2lucHV0LnN0YXJ0RGF0ZScgKyBpbmRleCArICcsIGlucHV0LmVuZERhdGUnICsgaW5kZXgpO1xuICAgIHZhciBldmVudE5hbWUgPSAkLmJyb3dzZXIubXNpZSA/ICdrZXl1cCcgOiAnY2hhbmdlJzsgLy8vIGNoYW5nZSBpcyBub3QgZmlyaW5nIG9uIElFICEhIVxuICAgIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgJCh0aGlzKVxuICAgICAgICAub2ZmKGV2ZW50TmFtZSwgY2hlY2tFbXBsb3ltZW50RGF0ZSlcbiAgICAgICAgLm9uKGV2ZW50TmFtZSwgY2hlY2tFbXBsb3ltZW50RGF0ZSk7XG4gICAgfSlcbiAgICAvLyBmaWVsZHMub2ZmKCdjaGFuZ2UnLCBjaGVja0VtcGxveW1lbnREYXRlKVxufS8vLy8vIGZ1bi4gYmluZEVtcGxveW1lbnREYXRlXG5cbmZ1bmN0aW9uIGFkZEVtcGxveWVyKGluZGV4KXtcbiAgICAvKipcbiAgICAgKiBMaW1pdCB0byA0IHByZXZpb3VzIGVtcGxveWVyc1xuICAgICAqL1xuICAgIGlmKGluZGV4ID4gNCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogRW1wbG95ZXJzIHNob3VsZCBiZSBhZGRlZCBpbiBpbmNyZWFzaW5nIGluZGV4XG4gICAgICovXG4gICAgaWYoaW5kZXggPCBlbXBsb3llckluZGV4KSByZXR1cm47XG5cbiAgICAvKipcbiAgICAgKiBpZiB0aGUgZW1wbG95ZXIgd2l0aCBpbmRleCBpcyBhbHJlYWR5IGFkZGVkIGRvIG5vdGhpbmdcbiAgICAgKi9cbiAgICBpZigkKCcjZW1wbG95ZXJfJyArIGluZGV4KS5sZW5ndGggPiAwKXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGVtcGxveWVySW5kZXggPSBpbmRleDtcblxuICAgIHZhciBlbXBsb3llciA9ICQoZW1wbG95ZXJUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjXFx9KS9nLCBlbXBsb3llckluZGV4KSk7XG5cbiAgICBmaWxsU3RhdGVEcm9wZG93biggZW1wbG95ZXIuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIHllc05vUmFkaW8oZW1wbG95ZXIpO1xuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgIGVtcGxveWVyLmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICBlbXBsb3llcnNIb2xkZXIuYXBwZW5kKGVtcGxveWVyKTtcblxuICAgIGFkZEF1dG9BZGRyZXNzKGVtcGxveWVySW5kZXgpO1xuICAgIGJpbmRFbXBsb3ltZW50RGF0ZShlbXBsb3llckluZGV4KTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICBlbXBsb3llci5zbGlkZURvd24oKTtcbn0vLy8vIGZ1bi4gYWRkRW1wbG95ZXJcblxuZnVuY3Rpb24gcmVtb3ZlRW1wbG95ZXIocmVtb3ZlSW5kZXgpe1xuXG4gICAgaWYocmVtb3ZlSW5kZXggPD0gMSkgcmV0dXJuO1xuICAgIC8vIGlmKHJlbW92ZUluZGV4ID4gNCkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PXJlbW92ZUluZGV4OyB4PD1lbXBsb3llckluZGV4OyB4Kyspe1xuICAgICAgICAkKCcjZW1wbG95ZXJfJyArIHgpLnNsaWRlVXAoe1xuICAgICAgICAgICAgY29tcGxldGU6ZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRldGFjaCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICBlbXBsb3llckluZGV4ID0gcmVtb3ZlSW5kZXggLSAxO1xufVxuXG5mdW5jdGlvbiBjaGVja0VtcGxveW1lbnREYXRlKGV2KXtcblxuICAgIC8qKlxuICAgICAqIFZhbGlkYXRlIGVuZCBkYXRlIGFuZCBhZGQgcHJldmlvdXMgam9iIGlmIGFwcGxpY2FibGVcbiAgICAgKi9cbiAgICB2YXIgaW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgdmFyIGVuZERhdGVGaWVsZCA9ICQoJy5lbmREYXRlJytpbmRleCkuZXEoMCk7XG4gICAgdmFyIHN0YXJ0RGF0ZUZpZWxkID0gJCgnLnN0YXJ0RGF0ZScraW5kZXgpLmVxKDApO1xuICAgIHZhciBlbmREYXRlLCBzdGFydERhdGU7XG5cbiAgICBpZihlbmREYXRlRmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgIHZhciBkYXRlU3BsaXQgPSBlbmREYXRlRmllbGQudmFsKCkuc3BsaXQoJy8nKTtcbiAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIH1cblxuICAgIGlmKHN0YXJ0RGF0ZUZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gc3RhcnREYXRlRmllbGQudmFsKCkuc3BsaXQoJy8nKTtcbiAgICAgICAgc3RhcnREYXRlID0gbmV3IERhdGUoTnVtYmVyKGRhdGVTcGxpdFsyXSksIE51bWJlcihkYXRlU3BsaXRbMF0pLTEsIE51bWJlcihkYXRlU3BsaXRbMV0pKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKGVuZERhdGUgPD0gc3RhcnREYXRlKXtcbiAgICAgICAgZW5kRGF0ZUZpZWxkLmFkZEVycm9yKCdjYy1kYXRlLWd0Jykuc2hvd0Vycm9yKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKGVuZERhdGUgLSBzdGFydERhdGUgPCAgMiAqIDM2NSAqIDI0ICogNjAgKiA2MCAqIDEwMDAgKXtcbiAgICAgICAgICAgIC8vIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJlRW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXByZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgICAgICBhZGRFbXBsb3llcihpbmRleCsxKVxuICAgICAgICB9Ly8vL1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlRW1wbG95ZXIoaW5kZXgrMSlcbiAgICAgICAgfVxuICAgIH0vLy8vIGVsc2Vcbn0vLy8vIGZ1bi4gY2hlY2tFbXBseW1lbnREYXRlXG5cbmZ1bmN0aW9uIGFkZFJlbnQoKXtcblxuICAgIGlmKHJlbnRzQXJyYXkubGVuZ3RoID49IDUpIHJldHVybjtcblxuICAgIHJlbnRJbmRleCsrO1xuICAgIHJlbnRzQXJyYXkucHVzaChyZW50SW5kZXgpO1xuICAgIHZhciB0ZW1wbGF0ZSA9IHJlbnRUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIHJlbnRJbmRleCk7XG5cbiAgICB2YXIgaWQgPSByZW50c0FycmF5Lmxlbmd0aDtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICAvKipcbiAgICAgKiBbYWRkcmVzc0luZGV4IGlzIHVzZWQgdG8gaGVscCBhZGQgYW5kIHRyYWNrIHRoZSBhZGRyZXNzIGZpZWxkcyBmb3IgdHlwZSBhaGVhZCBhZGRyZXNzIGZ1bmN0aW9uYWxpdHldXG4gICAgICogMTAwICsgaXMgYWRkZWQgdG8gZGlmZmVyZW50aWF0ZSB0aGUgcmVudCBwcm9wZXJ0eSBhZGRyZXNzIGZpZWxkcyBmcm9tIGVtcGxveWVyIGFkZHJlc3MgZmllbGRzXG4gICAgICovXG4gICAgdmFyIGFkZHJlc3NJbmRleCA9IDEwMCArIHJlbnRJbmRleDtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpbmRleFBsdXNcXH0pL2csIGFkZHJlc3NJbmRleCk7XG5cblxuICAgIHZhciByZW50ID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICByZW50LmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICB9KTtcblxuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCByZW50LmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvbiBiZWhhdmlvclxuICAgICAqL1xuICAgIHllc05vUmFkaW8ocmVudCk7XG5cblxuXG4gICAgLyoqXG4gICAgICogQmVoYXZpb3Igc2V0dGluZyBmb3IgbnVtYmVycyBvbmx5IGFuZCBjdXJyZW5jeSBmaWVsZHNcbiAgICAgKi9cbiAgICByZW50LmZpbmQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgIHJlbnQuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuXG4gICAgcmVudHNIb2xkZXIuYXBwZW5kKHJlbnQpO1xuXG4gICAgcmVudC5zbGlkZURvd24oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtb3J0Z2FnZSB5ZXMvbm8gYWN0aW9uXG4gICAgICovXG4gICAgYmluZFJlbnRNb3J0Z2FnZShpZCk7XG5cbiAgICBhZGRBdXRvQWRkcmVzcyhhZGRyZXNzSW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICB1cGRhdGVSZW50Q2xvc2VCdG4oKTtcbn0vLy8vIGZ1bi4gYWRkUmVudFxuXG5mdW5jdGlvbiByZW1vdmVSZW50KHJlbW92ZUluZGV4KXtcbiAgICB2YXIgcG9zaXRpb24gPSByZW50c0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgJCgnI3Byb3BlcnR5XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZW50c0FycmF5LnNwbGljZShwb3NpdGlvbiwgMSk7XG5cbiAgICB1cGRhdGVSZW50c0ZpZWxkcygpO1xuXG4gICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIHJlbW92ZVJlbnRcblxuLyoqXG4gKiBbdXBkYXRlUmVudHNGaWVsZHMgdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVudCBwcm9wZXJ0eSBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZFJlbnQgYW5kIHJlbW92ZVJlbnRcbiAqIHRoaXMgZnVuY3Rpb24gYXNzdW1lIHRoZSBmaWVsZHMgbmFtZXMgYW5kIGlkcyBjb250YWluIE9ORSBudW1iZXIgb2YgMSBvciAyIGRpZ2l0c1xuICovXG5mdW5jdGlvbiB1cGRhdGVSZW50c0ZpZWxkcygpe1xuICAgIHZhciBsaW1pdCA9IHJlbnRzQXJyYXkubGVuZ3RoO1xuICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgIHZhciBpbmRleCA9IHJlbnRzQXJyYXlbeF07XG5cbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG5cbiAgICAgICAgcmVudERpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmb3IgeFxufS8vLy8gZnVuLiB1cGRhdGVSZW50c0ZpZWxkc1xuXG4vKipcbiAqIFt1cGRhdGVSZW50Q2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgcHJvcGVydHldXG4gKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZFJlbnQgYW5kIHJlbW92ZVJlbnRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUmVudENsb3NlQnRuKCl7XG4gICAgaWYocmVudHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIGluZGV4ID0gcmVudHNBcnJheVswXTtcbiAgICAgICAgdmFyIHJlbnREaXYgPSAkKCcjcHJvcGVydHlfJytpbmRleCk7XG4gICAgICAgIHJlbnREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpZihyZW50c0FycmF5Lmxlbmd0aCA+PSA1KXtcbiAgICAgICAgLy8gJCgnI2FkZFJlbnRQcm9wZXJ0eScpLmF0dHIoeydkaXNhYmxlZCc6dHJ1ZX0pLmNzcyh7J29wYWNpdHknOjAuNX0pO1xuICAgICAgICAkKCcjYWRkUmVudFByb3BlcnR5JykuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICAvLyAkKCcjYWRkUmVudFByb3BlcnR5JykuYXR0cih7J2Rpc2FibGVkJzpmYWxzZX0pLmNzcyh7J29wYWNpdHknOjF9KTtcbiAgICAgICAgJCgnI2FkZFJlbnRQcm9wZXJ0eScpLnNob3coKTtcbiAgICB9XG5cbn0vLy8vIGZ1bi4gdXBkYXRlUmVudENsb3NlQnRuXG5cbmZ1bmN0aW9uIGJpbmRSZW50TW9ydGdhZ2UoaW5kZXgpe1xuICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgdmFyIG15VmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiBteVZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xufS8vLy8gZnVuLiBiaW5kUmVudE1vcnRnYWdlIiwiJChkb2N1bWVudCkucmVhZHkoY29JbmNvbWVSZWFkeSk7XG52YXIgZW1wbG95ZXJUZW1wbGF0ZSwgZW1wbG95ZXJJbmRleCwgZW1wbG95ZXJzSG9sZGVyO1xudmFyIHJlbnRUZW1wbGF0ZSwgcmVudEluZGV4LCByZW50c0hvbGRlciwgcmVudHNBcnJheTtcbmZ1bmN0aW9uIGNvSW5jb21lUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjY29JbmNvbWVGb3JtJyk7XG4gICAgLyoqXG4gICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICovXG4gICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICBlbXBsb3llclRlbXBsYXRlID0gJCgnI2VtcGxveWVyVG1wbHQnKS50ZXh0KCk7XG4gICAgZW1wbG95ZXJJbmRleCA9IDE7XG4gICAgZW1wbG95ZXJzSG9sZGVyID0gJCgnI2VtcGxveWVyc0hvbGRlcicpO1xuXG5cbiAgICAvKipcbiAgICAgKiBbcmVudFRlbXBsYXRlIHZhcmlhYmxlIHRvIGhvbGQgdGhlIGh0bWwgdGVtcGxhdGUgYXMgc3RyaW5nXVxuICAgICAqL1xuICAgIHJlbnRUZW1wbGF0ZSA9ICQoJyNyZW50VG1wbHQnKS50ZXh0KCk7XG4gICAgLyoqXG4gICAgICogW3JlbnRJbmRleCBhIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSByZW50IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgcmVudEluZGV4ID0gMDtcblxuICAgIC8qKlxuICAgICAqIFtyZW50c0hvbGRlciB0aGUgZGl2IHdoZXJlIHJlbnQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAqL1xuICAgIHJlbnRzSG9sZGVyID0gJCgnI3JlbnRzSG9sZGVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBbcmVudHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIHJlbnQgcHJvcGVydHkgaW5kZXhcbiAgICAgKiB3aGVuIHVzZXIgc3RhcnQgYWRkaW5nIGFuZCByZW1vdmluZyByZW50cyByYW5kb21seSB0aGlzIGFycmF5IHdpbGwga2VlcCB0cmFjayBvZlxuICAgICAqIGUuZyByZXRuc0FycmF5ID0gWzQsIDZdIG1lYW5zIHRoZSBmaXJzdCByZW50IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgcmVudCBoYXMgaW5kZXggb2YgNlxuICAgICAqIHRoZSBwb3NpdGlvbnMgb2YgdGhpcyBhcnJheSBlbGVtZW50cyB3aWxsIGhlbHAgZW5mb3JjZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgdG8gc3RheSBpbiBzZXF1ZW5jZSBvZiAxLDIsMywuLi4gd2l0aCBoZWxwIG9mIHVwZGF0ZVJlbnRzRmllbGRzIGZ1bmN0aW9uXG4gICAgICovXG4gICAgcmVudHNBcnJheSA9IFtdO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICovXG5cbiAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgZW1wbG95ZXJzXG4gICAgICovXG4gICAgZW1wbG95ZXJzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICBhZGRBdXRvQWRkcmVzcyhteUluZGV4KTtcbiAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKG15SW5kZXgpO1xuICAgICAgICBlbXBsb3llckluZGV4ID0gbXlJbmRleDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgdGhlIGZvcm0gd2hlbiBpdHMgcHJlbG9hZGVkIHdpdGggc2F2ZWQgZGF0YSBmb3IgcmVudCBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgcmVudHNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49cmVfY29fYWRkcmVzc10nKS5lcSgwKS5hdHRyKCdpZCcpLnNwbGl0KCdyZV9jb19hZGRyZXNzJylbMV0sIDEwKTtcblxuICAgICAgICBhZGRBdXRvQWRkcmVzcygxMDAgKyBteUluZGV4KTtcblxuICAgICAgICByZW50SW5kZXggPSBteUluZGV4O1xuICAgICAgICByZW50c0FycmF5LnB1c2gocmVudEluZGV4KTtcblxuICAgICAgICBiaW5kUmVudE1vcnRnYWdlKG15SWQpO1xuXG4gICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlUmVudChpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXBkYXRlUmVudENsb3NlQnRuKCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAqL1xuICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lMl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKDEpO1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5lbXBsb3ltZW50LCAucHJlRW1wbG95bWVudCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0sIC5jYy10by1iZS12YWxpZGF0ZS1wcmUnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIGlmKGVtcGxveWVySW5kZXggPiAxKXtcbiAgICAgICAgICAgICAgICByZW1vdmVFbXBsb3llcigyKTsgLy8vIHdpbGwgdGFrZSBjYXJlIG9mIHRoZSByZXN0IG9mXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC50cmlnZ2VyKCdjaGFuZ2UnKTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY29fY2tfaW5jb21lM10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2VsZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNSlcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2VsZicsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZidcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFkZGl0aW9uYWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDYpXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmFkZGl0aW9uYWwnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU1XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXRpcmVtZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0aXJlbWVudCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NvX2NrX2luY29tZTZdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNzbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc3NuJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU3XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jaGlsZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5kaXZpZGVuZCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9jb19ja19pbmNvbWU5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnJlbnRhbCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbmV3IHByb3BlcnR5IGlmIHRoZSBwcm9wZXJ0eSBjb3VudCBpcyAwXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKHJlbnRzQXJyYXkubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgYWRkUmVudCgpO1xuICAgICAgICAgICAgICAgICQoJyNhZGRSZW50UHJvcGVydHknKS5zaG93KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmVudGFsJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgd2hpbGUocmVudHNBcnJheS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICByZW1vdmVSZW50KHJlbnRzQXJyYXlbcmVudHNBcnJheS5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgfS8vLyB3aGlsZVxuICAgICAgICB9XG4gICAgfSlcbiAgICAudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICAkKCcjYWRkUmVudFByb3BlcnR5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZihldi5wcmV2ZW50RGVmYXVsdCkgZXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBldi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgIGFkZFJlbnQoKTtcbiAgICB9KVxuXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuIiwiJChkb2N1bWVudCkucmVhZHkoYXNzZXRzUmVhZHkpO1xudmFyIGFzc2V0VGVtcGxhdGUsIGFzc2V0SW5kZXgsIGFzc2V0c0hvbGRlciwgYXNzZXRzQXJyYXk7XG5cbmZ1bmN0aW9uIGFzc2V0c1JlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI2Fzc2V0c0Zvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICovXG4gICAgYXNzZXRUZW1wbGF0ZSA9ICQoJyNhc3NldFRtcGx0JykudGV4dCgpO1xuICAgIC8qKlxuICAgICAqIFthc3NldEluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIGFzc2V0IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgYXNzZXRJbmRleCA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBbYXNzZXRzSG9sZGVyIHRoZSBkaXYgd2hlcmUgYXNzZXQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAqL1xuICAgIGFzc2V0c0hvbGRlciA9ICQoJyNhc3NldHNIb2xkZXInKTtcblxuICAgIC8qKlxuICAgICAqIFthc3NldHNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGFzc2V0IHByb3BlcnR5IGluZGV4XG4gICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgYXNzZXRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IGFzc2V0IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgYXNzZXQgaGFzIGluZGV4IG9mIDZcbiAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVhc3NldHNGaWVsZHMgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBhc3NldHNBcnJheSA9IFtdO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcblxuXG4gICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICovXG5cbiAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIGFkZEF1dG9BZGRyZXNzKDcpO1xuXG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGFzc2V0XG4gICAgICovXG4gICAgYXNzZXRzSG9sZGVyLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIG15SW5kZXggPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuZmluZCgnaW5wdXRbaWRePWFzX2JhbmtdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnYXNfYmFuaycpWzFdLCAxMCk7XG5cblxuICAgICAgICBhc3NldEluZGV4ID0gbXlJbmRleDtcbiAgICAgICAgYXNzZXRzQXJyYXkucHVzaChhc3NldEluZGV4KTtcblxuICAgICAgICAkKHRoaXMpLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBpID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgIHJlbW92ZUFzc2V0KGkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG4gICAgfSk7XG5cblxuXG4gICAgJCgnI2FkZEFub3RoZXJBc3NldCcpXG4gICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgYWRkQXNzZXQoKTtcbiAgICB9KTtcblxuXG4gICAgJCgnaW5wdXRbbmFtZT1hc19hZGRpdGlvbmFscmVhbGVzdGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnByb3BlcnR5LCAubW9ydGdhZ2U3JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUsIC5jYy10by1iZS12YWxpZGF0ZS1tb3J0Nyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW83Jykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpICYmIHZhbCA9PT0gJ3llcycpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZTcnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Nyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicubW9ydGdhZ2U3JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydDcnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSlcblxufTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuXG5cbmZ1bmN0aW9uIGFkZEFzc2V0KCl7XG5cbiAgICBpZihhc3NldHNBcnJheS5sZW5ndGggPj0gNSkgcmV0dXJuO1xuXG4gICAgYXNzZXRJbmRleCsrO1xuICAgIGFzc2V0c0FycmF5LnB1c2goYXNzZXRJbmRleCk7XG4gICAgdmFyIHRlbXBsYXRlID0gYXNzZXRUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjaW5kZXhcXH0pL2csIGFzc2V0SW5kZXgpO1xuXG4gICAgdmFyIGlkID0gYXNzZXRzQXJyYXkubGVuZ3RoO1xuICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2lkXFx9KS9nLCBpZCk7XG5cblxuICAgIHZhciBhc3NldCA9ICQodGVtcGxhdGUpO1xuXG4gICAgYXNzZXQuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICByZW1vdmVBc3NldChpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEJlaGF2aW9yIHNldHRpbmcgZm9yIG51bWJlcnMgb25seSBhbmQgY3VycmVuY3kgZmllbGRzXG4gICAgICovXG5cbiAgICBhc3NldC5maW5kKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG5cbiAgICBhc3NldHNIb2xkZXIuYXBwZW5kKGFzc2V0KTtcblxuICAgIGFzc2V0LnNsaWRlRG93bigpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG5cbiAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIGFkZFJlbnRcblxuZnVuY3Rpb24gcmVtb3ZlQXNzZXQocmVtb3ZlSW5kZXgpe1xuICAgIHZhciBwb3NpdGlvbiA9IGFzc2V0c0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgJCgnI2Fzc2V0XycgKyByZW1vdmVJbmRleCkuc2xpZGVVcCh7XG4gICAgICAgIGNvbXBsZXRlOmZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhc3NldHNBcnJheS5zcGxpY2UocG9zaXRpb24sIDEpO1xuXG4gICAgdXBkYXRlQXNzZXRzRmllbGRzKCk7XG5cbiAgICB1cGRhdGVBc3NldENsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIHJlbW92ZUFzc2V0XG5cbi8qKlxuICogW3VwZGF0ZUFzc2V0c0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZEFzc2V0IGFuZCByZW1vdmVBc3NldFxuICogdGhpcyBmdW5jdGlvbiBhc3N1bWUgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIGNvbnRhaW4gT05FIG51bWJlciBvZiAxIG9yIDIgZGlnaXRzXG4qL1xuZnVuY3Rpb24gdXBkYXRlQXNzZXRzRmllbGRzKCl7XG4gICAgdmFyIGxpbWl0ID0gYXNzZXRzQXJyYXkubGVuZ3RoO1xuICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgIHZhciBpbmRleCA9IGFzc2V0c0FycmF5W3hdO1xuXG4gICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcblxuICAgICAgICBhc3NldERpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmb3IgeFxufS8vLy8gZnVuLiB1cGRhdGVBc3NldHNGaWVsZHNcblxuLy8gLyoqXG4vLyAgKiBbdXBkYXRlQXNzZXRzQ2xvc2VCdG4gdGhpcyBmdW5jdGlvbiB3aWxsIGVuc3VyZSB0aGUgcmVtb3ZlIGJ1dHRvbiBpcyBoaWRkZW4gaWYgdGhlcmUgaXMgb25seSBvbmUgYXNzZXRdXG4vLyAgKiBpdCB3aWxsIGJlIGNhbGxlZCBmcm9tIGFkZEFzc2V0IGFuZCByZW1vdmVBc3NldFxuLy8gICovXG5mdW5jdGlvbiB1cGRhdGVBc3NldENsb3NlQnRuKCl7XG5cbiAgICBpZihhc3NldHNBcnJheS5sZW5ndGggPiAxKXtcbiAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRzQXJyYXlbMF07XG4gICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcbiAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLnNob3coKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgdmFyIGluZGV4ID0gYXNzZXRzQXJyYXlbMF07XG4gICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNhc3NldF8nK2luZGV4KTtcbiAgICAgICAgYXNzZXREaXYuZmluZCgnYS5jbG9zZScpLmhpZGUoKTtcbiAgICB9XG5cbiAgICBpZihhc3NldHNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgICQoJyNhZGRBbm90aGVyQXNzZXQnKS5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgICQoJyNhZGRBbm90aGVyQXNzZXQnKS5zaG93KCk7XG4gICAgfVxuXG59Ly8vLyBmdW4uIHVwZGF0ZUFzc2V0Q2xvc2VCdG5cblxuLy8gZnVuY3Rpb24gYmluZGFzc2V0TW9ydGdhZ2UoaW5kZXgpe1xuLy8gICAgICQoJ2lucHV0Lm1vcnRnYWdlUmFkaW8nK2luZGV4KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbi8vICAgICAgICAgdmFyIG15SW5kZXggPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKTtcbi8vICAgICAgICAgdmFyIG15VmFsID0gJCh0aGlzKS52YWwoKTtcbi8vICAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiBteVZhbCA9PT0gJ3llcycpe1xuLy8gICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZScrbXlJbmRleCwgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydCcrbXlJbmRleH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbi8vICAgICAgICAgfVxuLy8gICAgIH0pO1xuLy8gfS8vLy8gZnVuLiBiaW5kUmVudE1vcnRnYWdlIiwiJChkb2N1bWVudCkucmVhZHkobGlhYmlsaXRpZXNSZWFkeSk7XG52YXIgbGlhYmlsaXR5VGVtcGxhdGUsIGxpYWJpbGl0eUluZGV4LCBsaWFiaWxpdGllc0hvbGRlciwgbGlhYmlsaXRpZXNBcnJheTtcblxuZnVuY3Rpb24gbGlhYmlsaXRpZXNSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNsaWFiaWxpdGllc0Zvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIFtyZW50VGVtcGxhdGUgdmFyaWFibGUgdG8gaG9sZCB0aGUgaHRtbCB0ZW1wbGF0ZSBhcyBzdHJpbmddXG4gICAgICovXG4gICAgbGlhYmlsaXR5VGVtcGxhdGUgPSAkKCcjbGlhYmlsaXR5VG1wbHQnKS50ZXh0KCk7XG4gICAgLyoqXG4gICAgICogW2xpYWJpbGl0eUluZGV4IGEgdmFyaWFibGUgdG8gdHJhY2sgdGhlIGFzc2V0IHByb3BlcnR5IGluc2lkZSB0aGUgRE9NXG4gICAgICogdGhpcyB2YXJpYWJsZSB3b3JrIHNpbWlsYXIgdG8gYXV0byBpbmNyZW1lbnQgZmllbGQgaW4gZGF0YSBiYXNlIGFuZCBpdCBpcyBub3QgcmVsYXRlZCB0byBmaWVsZHMgbmFtZSBhbmQgZmllbGRzIGlkXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbGlhYmlsaXR5SW5kZXggPSAwO1xuXG4gICAgLyoqXG4gICAgICogW2xpYWJpbGl0aWVzSG9sZGVyIHRoZSBkaXYgd2hlcmUgYXNzZXQgcHJvcGVydGllcyB3aWxsIGJlIGFwcGVuZGVkXVxuICAgICAqL1xuICAgIGxpYWJpbGl0aWVzSG9sZGVyID0gJCgnI2xpYWJpbGl0aWVzSG9sZGVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBbbGlhYmlsaXRpZXNBcnJheSB3aWxsIHRyYWNrIHRoZSBwb3NpdGlvbiBvZiBlYWNoIGFzc2V0IHByb3BlcnR5IGluZGV4XG4gICAgICogd2hlbiB1c2VyIHN0YXJ0IGFkZGluZyBhbmQgcmVtb3ZpbmcgYXNzZXRzIHJhbmRvbWx5IHRoaXMgYXJyYXkgd2lsbCBrZWVwIHRyYWNrIG9mXG4gICAgICogZS5nIHJldG5zQXJyYXkgPSBbNCwgNl0gbWVhbnMgdGhlIGZpcnN0IGFzc2V0IGhhcyBpbmRleCBvZiA0IGFuZCBzZWNvbmQgYXNzZXQgaGFzIGluZGV4IG9mIDZcbiAgICAgKiB0aGUgcG9zaXRpb25zIG9mIHRoaXMgYXJyYXkgZWxlbWVudHMgd2lsbCBoZWxwIGVuZm9yY2UgdGhlIGZpZWxkcyBuYW1lcyBhbmQgaWRzIHRvIHN0YXkgaW4gc2VxdWVuY2Ugb2YgMSwyLDMsLi4uIHdpdGggaGVscCBvZiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcyBmdW5jdGlvblxuICAgICAqL1xuICAgIGxpYWJpbGl0aWVzQXJyYXkgPSBbXTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG5cblxuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIHRoZSBmb3JtIHdoZW4gaXRzIHByZWxvYWRlZCB3aXRoIHNhdmVkIGRhdGEgZm9yIGFzc2V0XG4gICAgICovXG4gICAgbGlhYmlsaXRpZXNIb2xkZXIuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgbXlJbmRleCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1pbmRleCcpLCAxMCk7XG4gICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5maW5kKCdpbnB1dFtpZF49bGlfY3JlZGl0b3JdJykuZXEoMCkuYXR0cignaWQnKS5zcGxpdCgnbGlfY3JlZGl0b3InKVsxXSwgMTApO1xuXG5cbiAgICAgICAgbGlhYmlsaXR5SW5kZXggPSBteUluZGV4O1xuICAgICAgICBsaWFiaWxpdGllc0FycmF5LnB1c2gobGlhYmlsaXR5SW5kZXgpO1xuXG4gICAgICAgICQodGhpcykuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgcmVtb3ZlTGlhYmlsaXR5KGkpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2cobGlhYmlsaXRpZXNBcnJheSlcbiAgICAgICAgdXBkYXRlTGlhYmlsaXR5Q2xvc2VCdG4oKTtcbiAgICB9KTtcblxuXG5cbiAgICAkKCcjYWRkQW5vdGhlckxpYWJpbGl0eScpXG4gICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgaWYoZXYucHJldmVudERlZmF1bHQpIGV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuICAgICAgICBhZGRMaWFiaWxpdHkoKTtcblxuICAgIH0pO1xuXG5cbiAgICAvLyAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxyZWFsZXN0YXRlXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgIC8vICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAvLyAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSAmJiB2YWwgPT09ICd5ZXMnKXtcbiAgICAvLyAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHknLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHksIC5tb3J0Z2FnZTcnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSwgLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQ3J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuXG4gICAgLy8gJCgnaW5wdXQubW9ydGdhZ2VSYWRpbzcnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgLy8gICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykgJiYgdmFsID09PSAneWVzJyl7XG4gICAgLy8gICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm1vcnRnYWdlNycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnQ3J30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5tb3J0Z2FnZTcnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1tb3J0Nyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgLy8gICAgIH1cbiAgICAvLyB9KVxuXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG5cblxuZnVuY3Rpb24gYWRkTGlhYmlsaXR5KCl7XG5cbiAgICBpZihsaWFiaWxpdGllc0FycmF5Lmxlbmd0aCA+PSA1KSByZXR1cm47XG5cbiAgICBsaWFiaWxpdHlJbmRleCsrO1xuICAgIGxpYWJpbGl0aWVzQXJyYXkucHVzaChsaWFiaWxpdHlJbmRleCk7XG4gICAgdmFyIHRlbXBsYXRlID0gbGlhYmlsaXR5VGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI2luZGV4XFx9KS9nLCBsaWFiaWxpdHlJbmRleCk7XG5cbiAgICB2YXIgaWQgPSBsaWFiaWxpdGllc0FycmF5Lmxlbmd0aDtcbiAgICB0ZW1wbGF0ZSA9IHRlbXBsYXRlLnJlcGxhY2UoLyhcXHtcXCNpZFxcfSkvZywgaWQpO1xuXG5cbiAgICB2YXIgbGlhYmlsaXR5ID0gJCh0ZW1wbGF0ZSk7XG5cbiAgICBsaWFiaWxpdHkuZmluZCgnYS5jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIGkgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgICAgICByZW1vdmVMaWFiaWxpdHkoaSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBCZWhhdmlvciBzZXR0aW5nIGZvciBudW1iZXJzIG9ubHkgYW5kIGN1cnJlbmN5IGZpZWxkc1xuICAgICAqL1xuXG4gICAgbGlhYmlsaXR5LmZpbmQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICB5ZXNOb1JhZGlvKGxpYWJpbGl0eSlcblxuXG4gICAgbGlhYmlsaXRpZXNIb2xkZXIuYXBwZW5kKGxpYWJpbGl0eSk7XG5cbiAgICBsaWFiaWxpdHkuc2xpZGVEb3duKCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCgkKCcuY2MtZm9ybScpKTtcblxuICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIGFkZFJlbnRcblxuZnVuY3Rpb24gcmVtb3ZlTGlhYmlsaXR5KHJlbW92ZUluZGV4KXtcbiAgICB2YXIgcG9zaXRpb24gPSBsaWFiaWxpdGllc0FycmF5LmluZGV4T2YocmVtb3ZlSW5kZXgpO1xuXG4gICAgJCgnI2xpYWJpbGl0eV8nICsgcmVtb3ZlSW5kZXgpLnNsaWRlVXAoe1xuICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHVwZGF0ZVRhYkluZGV4KCQoJy5jYy1mb3JtJykpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGlhYmlsaXRpZXNBcnJheS5zcGxpY2UocG9zaXRpb24sIDEpO1xuXG4gICAgdXBkYXRlTGlhYmlsaXRpZXNGaWVsZHMoKTtcblxuICAgIHVwZGF0ZUxpYWJpbGl0eUNsb3NlQnRuKCk7XG59Ly8vLyBmdW4uIHJlbW92ZUxpYWJpbGl0eVxuXG4vKipcbiAqIFt1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcyB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSBhc3NldCBuYW1lIGFuZCBpZCBpcyBhbHdheXMgaW4gc2VyaWVzIG9mIDEsMiwzLDQsLi4uLl1cbiAqIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIGluIGFkZExpYWJpbGl0eSBhbmQgcmVtb3ZlTGlhYmlsaXR5XG4gKiB0aGlzIGZ1bmN0aW9uIGFzc3VtZSB0aGUgZmllbGRzIG5hbWVzIGFuZCBpZHMgY29udGFpbiBPTkUgbnVtYmVyIG9mIDEgb3IgMiBkaWdpdHNcbiovXG5mdW5jdGlvbiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkcygpe1xuICAgIHZhciBsaW1pdCA9IGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoO1xuICAgIGlmKGxpbWl0IDwgMSkgcmV0dXJuO1xuXG4gICAgZm9yKHZhciB4PTA7IHg8bGltaXQ7IHgrKyl7XG4gICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbeF07XG5cbiAgICAgICAgdmFyIGFzc2V0RGl2ID0gJCgnI2xpYWJpbGl0eV8nK2luZGV4KTtcblxuICAgICAgICBhc3NldERpdi5maW5kKCdpbnB1dCcpLmVhY2goZnVuY3Rpb24oeil7XG4gICAgICAgICAgICB2YXIgbmFtZSA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgdmFyIG5ld05hbWUgPSBuYW1lLnJlcGxhY2UoL1xcZHsxLDJ9L2csIHgrMSk7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSAkKCdsYWJlbFtmb3I9JyArIG5hbWUgKyAnXScpO1xuICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtuYW1lOm5ld05hbWUsIGlkOm5ld05hbWV9KTtcbiAgICAgICAgICAgIGxhYmVsLmF0dHIoJ2ZvcicsIG5ld05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9Ly8vLyBmb3IgeFxufS8vLy8gZnVuLiB1cGRhdGVMaWFiaWxpdGllc0ZpZWxkc1xuXG4vLyAvKipcbi8vICAqIFt1cGRhdGVBc3NldHNDbG9zZUJ0biB0aGlzIGZ1bmN0aW9uIHdpbGwgZW5zdXJlIHRoZSByZW1vdmUgYnV0dG9uIGlzIGhpZGRlbiBpZiB0aGVyZSBpcyBvbmx5IG9uZSBhc3NldF1cbi8vICAqIGl0IHdpbGwgYmUgY2FsbGVkIGZyb20gYWRkTGlhYmlsaXR5IGFuZCByZW1vdmVMaWFiaWxpdHlcbi8vICAqL1xuZnVuY3Rpb24gdXBkYXRlTGlhYmlsaXR5Q2xvc2VCdG4oKXtcblxuICAgIGlmKGxpYWJpbGl0aWVzQXJyYXkubGVuZ3RoID4gMSl7XG4gICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbMF07XG4gICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNsaWFiaWxpdHlfJytpbmRleCk7XG4gICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5zaG93KCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHZhciBpbmRleCA9IGxpYWJpbGl0aWVzQXJyYXlbMF07XG4gICAgICAgIHZhciBhc3NldERpdiA9ICQoJyNsaWFiaWxpdHlfJytpbmRleCk7XG4gICAgICAgIGFzc2V0RGl2LmZpbmQoJ2EuY2xvc2UnKS5oaWRlKCk7XG4gICAgfVxuXG4gICAgaWYobGlhYmlsaXRpZXNBcnJheS5sZW5ndGggPj0gNSl7XG4gICAgICAgICQoJyNhZGRBbm90aGVyTGlhYmlsaXR5JykuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICAkKCcjYWRkQW5vdGhlckxpYWJpbGl0eScpLnNob3coKTtcbiAgICB9XG5cbn0vLy8vIGZ1bi4gdXBkYXRlQXNzZXRDbG9zZUJ0biJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
