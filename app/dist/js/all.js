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
                    var field = self.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="radio"], input[type="checkbox"], input[type="hidden"], select, textarea');
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
        var f = self.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="radio"], input[type="checkbox"], input[type="hidden"], select, textarea');
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
        self.find('a.close').on('click', function(e){
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
function yesNoRadio(){
  var radios = $('.radio-yesno input[type=radio]').on('change', function(e){
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
  })
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

    /**
     * Add address type ahead functionality to address
     */
    addAutoAddress(1);

};//// borrowerReady



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
var employerTemplate;
var employerIndex;
var employersHolder;

function boIncomeReady(){

    var myForm = $('#boIncomeForm');
    /**
     * do nothing if the form is not #coBorrowerForm
     */
    if(myForm.length <= 0) return;

    employerTemplate = $('#employerTmplt').text();
    employerIndex = 1;
    employersHolder = $('#employersHolder')


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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

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
    });

    $('input[name=in_ck_income9]').on('change', function(){
        var val = $(this).val().toLowerCase();

        if(true === !!$(this).attr('checked')){
            includeFields({selector:'.rental', validationClass:'.cc-to-be-validate-rental'}); //// function in main.js

        }//// if
        else{
            excludeFields({
                selector:'.rental',
                validationClass:'.cc-to-be-validate-rental'
            }); //// function in main.js

        }
    });

};//// borrowerReady

function bindEmploymentDate(index){

    var fields = $('input.startDate' + index + ', input.endDate' + index)
    .off('change', {index:index}, checkEmploymentDate)
    .on('change', checkEmploymentDate);

}///// fun. bindEmploymentDate

function addEmployer(index){
    if(index > 4) return;

    employerIndex = index;
    var employer = $(employerTemplate.replace(/(\{\#\})/g, employerIndex));

    fillStateDropdown( employer.find('.state-dropdown') );

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
                $(this).remove();
                updateTabIndex($('.cc-form'))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwibWFpbi5qcyIsIjAxLWJvcnJvd2VyLmpzIiwiMDItY29ib3Jyb3dlci5qcyIsIjAzLXB1cmNoYXNlLmpzIiwiMDQtcmVmaW5hbmNlLmpzIiwiMDUtaW5jb21lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1c1N0YXRlcyA9IFtcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbGFiYW1hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQUtcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbWVyaWNhbiBTYW1vYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBcml6b25hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBWlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFya2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNhbGlmb3JuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29sb3JhZG9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNPXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ29ubmVjdGljdXRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkNUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGVsYXdhcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRFXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRGlzdHJpY3QgT2YgQ29sdW1iaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkRDXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmVkZXJhdGVkIFN0YXRlcyBPZiBNaWNyb25lc2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJGTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkZsb3JpZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR2VvcmdpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiR0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHdWFtXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHVVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkhhd2FpaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSElcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJZGFob1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSURcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbGxpbm9pc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJbmRpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklvd2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2Fuc2FzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIktlbnR1Y2t5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJLWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkxvdWlzaWFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTEFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYWluZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXJzaGFsbCBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnlsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hc3NhY2h1c2V0dHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1BXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWljaGlnYW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1JXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlubmVzb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3Npc3NpcHBpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pc3NvdXJpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNT1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1vbnRhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1UXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmVicmFza2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5FXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV2YWRhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOVlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBIYW1wc2hpcmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEplcnNleVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgTWV4aWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOTVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBZb3JrXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOWVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aGVybiBNYXJpYW5hIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1QXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2hpb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0hcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPa2xhaG9tYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT0tcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPcmVnb25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9SXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGFsYXVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBXXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUGVubnN5bHZhbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlB1ZXJ0byBSaWNvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlJob2RlIElzbGFuZFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBDYXJvbGluYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0NcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJTb3V0aCBEYWtvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlNEXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGVubmVzc2VlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUTlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRleGFzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJUWFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlV0YWhcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlVUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmVybW9udFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVlRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW4gSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVklcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVkFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXYXNoaW5ndG9uXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldlc3QgVmlyZ2luaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldWXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2lzY29uc2luXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIld5b21pbmdcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldZXCJcbiAgICAgIH1cbiAgXTsiLCIoZnVuY3Rpb24oICQgKSB7XG4gICAgJC5mbi52YWxpZGF0ZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBmb3JtID0gdGhpcy5maWx0ZXIoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICBmb3JtLm9mZignc3VibWl0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgdmFyIGlzRm9ybVZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIGludmFsaWRGaWVsZHMgPSBbXTtcblxuICAgICAgICAgICAgZm9ybS5maW5kKCcuY2MtZmllbGQuY2MtdmFsaWRhdGUnKS5lYWNoKGZ1bmN0aW9uKG4pe1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAvLyBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBzZWxmLnZhbGlkYXRlRmllbGQoKTtcblxuXG4gICAgICAgICAgICAgICAgLy8vLyBmYWxzZSBhbmQgdHJ1ZSBzdHJpY3RseSB0ZXN0IGFzIG51bGwgd2lsbCByZXR1cm5lZCBpcyBmaWVsZCBpcyBub3QgdmFsaWRhdGVkXG4gICAgICAgICAgICAgICAgaWYoZmFsc2UgPT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCBpbnB1dFt0eXBlPVwidGVsXCJdLCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sIGlucHV0W3R5cGU9XCJkYXRlXCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSBzZWxmLmZpbmQoJ2xhYmVsJykuZXEoMCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZFcnIgPSB7ZmlsZWQ6bGFiZWwudGV4dCgpLCBpZDpmaWVsZC5hdHRyKCdpZCcpLCBlcnJvcjplcnJ9O1xuICAgICAgICAgICAgICAgICAgICBpbnZhbGlkRmllbGRzLnB1c2goZkVycilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTsgLy8vIC5lYWNoXG5cblxuICAgICAgICAgICAgdmFyIGV4dHJhID0gY2FsbGJhY2soaXNGb3JtVmFsaWQsIGludmFsaWRGaWVsZHMubGVuZ3RoID4gMCA/IGludmFsaWRGaWVsZHMgOiBudWxsKTtcblxuICAgICAgICAgICAgaXNGb3JtVmFsaWQgPSBpc0Zvcm1WYWxpZCAmJiAhIWV4dHJhO1xuXG5cbiAgICAgICAgICAgIGlmKHRydWUgIT09IGlzRm9ybVZhbGlkKXtcbiAgICAgICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7Ly8vLyAub24gc3VibWl0XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0TXlDb250YWluZXIgPSBmdW5jdGlvbihmaWVsZCl7XG4gICAgICAgIHZhciBwID0gZmllbGQucGFyZW50KCk7XG4gICAgICAgIGlmKHRydWUgPT09IHAuaGFzQ2xhc3MoJ2NjLWZpZWxkJykpe1xuICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBnZXRNeUNvbnRhaW5lcihwKTtcbiAgICAgICAgfVxuICAgIH0vLy8vIGZ1bi4gZ2V0TXlDb250YWluZXJcblxuXG4gICAgdmFyIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdldE15Q29udGFpbmVyKCQodGhpcykpO1xuICAgICAgICBjb250YWluZXIudmFsaWRhdGVGaWVsZCgpXG4gICAgfVxuXG4gICAgJC5mbi52YWxpZGF0ZUZpZWxkID0gZnVuY3Rpb24oc2VsZil7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGYgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCBpbnB1dFt0eXBlPVwibnVtYmVyXCJdLCBpbnB1dFt0eXBlPVwidGVsXCJdLCBpbnB1dFt0eXBlPVwiZW1haWxcIl0sIGlucHV0W3R5cGU9XCJkYXRlXCJdLCBpbnB1dFt0eXBlPVwicmFkaW9cIl0sIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICB2YXIgdiA9ICQudHJpbShmLnZhbCgpKTtcbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgaWYoIWVycikgZXJyID0ge307XG5cbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgaXNWYWxpZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1yZXF1aXJlZCcpKXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8vLyBoYW5kbGUgcmFkaW8gYnV0dG9uIGNhc2VcbiAgICAgICAgICAgIGlmKHR5cGUgJiYgKHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3JhZGlvJykgKXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGYuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciByYWRpb3MgPSBzZWxmLmZpbmQoXCJpbnB1dFtuYW1lPVwiK25hbWUrXCJdXCIpO1xuICAgICAgICAgICAgICAgIHJhZGlvcy5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gISFyYWRpb3MuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmID0gcmFkaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0eXBlICYmIHR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ2NoZWNrYm94Jyl7XG4gICAgICAgICAgICAgICAgaWYoZi5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZi5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9ICEhZi5lcShyKS5hdHRyKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJ1ZSA9PT0gaXNWYWxpZCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9Ly8vLyBpZiBMZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaWYodi5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0vLy8vIGlmIHR5cGUgcmFkaW8gZWxzZVxuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXJlcXVpcmVkJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8vIGlmIHYubGVuZ3RoXG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGNjLXJlcXVpcmVkXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtbnVtYmVyJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKFxcZCkrKFxcLlxcZCspPyQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLW51bWJlcicpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1udW1iZXInXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1lbWFpbCcpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1lbWFpbCcpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1lbWFpbCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlJykpe1xuXG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC87XG4gICAgICAgICAgICAgICAgdmFyIHNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBtID0gc3BsaXRbMF0gPyBOdW1iZXIoc3BsaXRbMF0pIDogbnVsbDtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IHNwbGl0WzFdID8gTnVtYmVyKHNwbGl0WzFdKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBzcGxpdFsyXSA/IE51bWJlcihzcGxpdFsyXSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHZhciBtMzEgPSBbMSwgMywgNSwgNywgOCwgMTAsIDEyXTtcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighbSB8fCBtID4gMTIgfHwgbSA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKG0zMS5pbmRleE9mKG0pID49MCApe1xuICAgICAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzEgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYobSA9PSAyKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9kID0geSAlIDQgPT0gMCA/IDI5IDogMjg7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiBfZCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWRhdGUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdlxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaGFzQ2xhc3MgY2MtZGF0ZVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICAvLyB9XG5cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlIGNjLWRhdGUtZ3QnKSl7XG4gICAgICAgICAgICB2YXIgZ3RGaWVsZCA9ICQoJyMnK3NlbGYuYXR0cignZGF0YS1kYXRlLWd0JykpO1xuICAgICAgICAgICAgdmFyIGd0VmFsLCBzdGFydERhdGUsIGVuZERhdGU7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA9PT0gMTApe1xuICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihndEZpZWxkLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlmKGd0RmllbGQudmFsKCkubGVuZ3RoID09PSAxMCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRlU3BsaXQgPSBndEZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZW5kRGF0ZSA8IHN0YXJ0RGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ly8vLyBpZiBndEZpZWxkLmxlbmd0aCA+IDBcblxuICAgICAgICAgICAgaWYoIWlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWRhdGUtZ3QnKTtcblxuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1kYXRlLWd0J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZS1ndCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBoYXNDbGFzcyBjYy1kYXRlLWd0XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcGhvbmUnKSl7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFwoXFxkezN9XFwpKCApP1xcZHszfVxcLVxcZHs0fSQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXBob25lJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcGhvbmUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcGhvbmUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWN1cnJlbmN5Jykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXCQ/KFxcZHsxLDN9KSsoXFwsKlxcZHszfSkqJC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtY3VycmVuY3knKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1jdXJyZW5jeSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1jdXJyZW5jeSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXNzbicpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezN9KFxcLSk/XFxkezJ9KFxcLSk/XFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2Mtc3NuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2Mtc3NuJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXJlcXVpcmVkLW9uZS1vZicpKXtcbiAgICAgICAgICAgIHZhciBmaWVsZHMgPSAkKCcuJytzZWxmLmF0dHIoJ2RhdGEtb25lLW9mLWNsYXNzJykgKyAnIGlucHV0Jyk7XG5cbiAgICAgICAgICAgIHZhciBfaXNWYWxpZCA9IGZhbHNlOyAvLy8vIGxvY2FsIGlzVmFsaWQgdmFyIHdpbGwgYmUgJiYgd2l0aCBpc1ZhbGlkXG4gICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICBfaXNWYWxpZCA9IF9pc1ZhbGlkIHx8ICEhJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgICBpZih0cnVlID09PSBfaXNWYWxpZCkgcmV0dXJuIGZhbHNlOy8vLy8gc3RvcCBlYWNoIGlmIG9uZSBmaWxlZCBpcyBmb3VuZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIF9pc1ZhbGlkO1xuXG4gICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcmVxdWlyZWQtb25lLW9mJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG5cbiAgICAgICAgICAgICAgICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgICAgICAgICAgICAgLy8gdmFyIF9lcnIgPSAkKHRoaXMpLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkZWxldGUgX2VyclsnY2MtcmVxdWlyZWQtb25lLW9mJ107XG4gICAgICAgICAgICAgICAgICAgIC8vICQodGhpcykuZGF0YSgnZXJyJywgX2Vycik7XG5cbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtcmVxdWlyZWQtb25lLW9mJykuaGlkZUVycm9yKCkuc2hvd0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGhhc0NsYXNzIGNjLXJlcXVpcmVkLW9uZS1vZlxuXG4gICAgICAgIC8vLy8gcmVzZXQgdGhlIGZpZWxkIGVycm9ycyBiZWZvcmUgYWRkaW5nIHRoZW0gYWdhaW5cbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXJyb3IgY29ycmVjdCBtZXNzYWdlJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmLmRhdGEoJ2lzVmFsaWQnLCBpc1ZhbGlkKTtcblxuICAgICAgICAvLy8vIGlmIGZpZWxkIHBhc3NlZCB0aHJvdWdoIHZhbGlkYXRpb24gc2hvdyBlcnJvciBpZiBhbnlcbiAgICAgICAgLy8gaWYodHJ1ZSA9PT0gaXNWYWxpZGF0ZWQgKXtcbiAgICAgICAgLy8gaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgaWYoZmFsc2UgPT0gaXNWYWxpZCB8fCBPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICAgICAgZi5zaG93RXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgZi5oaWRlRXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIH0vLy8vIGlmIGlzVmFsaWRhdGVkXG5cbiAgICB9Ly8vLyBmdW4uIHZhbGlkYXRlRmlsZFxuXG4gICAgJC5mbi5zaG93RXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gZi5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IodmFyIGUgaW4gZXJyKXtcbiAgICAgICAgICAgIHN0ci5wdXNoKGVycltlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2Vycm9yJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpO1xuXG4gICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpLm9uKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZihzdHIubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgdmFyIG1zZyA9ICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCIgaWQ9XCJlcnJvck1zZ1wiPjxpIGNsYXNzPVwiaWNvbi1lcnJvciBnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZS1zaWduXCI+PC9pPiAnICsgc3RyLmpvaW4oJyB8ICcpICsgJzwvZGl2PicpLnNob3coKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQobXNnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnbWVzc2FnZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfS8vLy8gZnVuLiBzaG93RXJyb3JcblxuICAgICQuZm4uaGlkZUVycm9yID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGYgPSB0aGlzLmZpbHRlcignaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKS5lcSgwKTtcblxuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG5cbiAgICAgICAgLy8gY29udGFpbmVyLmFkZENsYXNzKCdjb3JyZWN0Jyk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcygnZXJyb3IgbWVzc2FnZScpO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcjZXJyb3JNc2cnKS5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAkLmZuLmFkZEVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmaWVsZCk7XG5cbiAgICAgICAgdmFyIG1zZyA9IGNvbnRhaW5lci5maW5kKCcubWVzc2FnZS4nK2Vycm9yQ2xhc3MpLmVxKDApLnRleHQoKTtcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSBlcnIgPSB7fTtcblxuICAgICAgICBlcnJbZXJyb3JDbGFzc10gPSBtc2c7XG5cbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgZmllbGQuZGF0YSgnaXNWYWxpZCcsIGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgJC5mbi5yZW1vdmVFcnJvciA9IGZ1bmN0aW9uKGVycm9yQ2xhc3MpIHtcblxuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuIHRoaXM7XG4gICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgaWYoIWVycikgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgZGVsZXRlIGVycltlcnJvckNsYXNzXTtcbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZpZWxkLmRhdGEoJ2lzVmFsaWQnLCB0cnVlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG59KCBqUXVlcnkgKSk7IiwidmFyIF9hcHBWYXJzID0ge307XG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGNjRG9jdW1lbnRSZWFkeSk7XG5cbmZ1bmN0aW9uIGNjRG9jdW1lbnRSZWFkeSgpe1xuXG4gICAgLyoqXG4gICAgICogUHJvZ3Jlc3MgbmF2aWdhdGlvbiBtb2JpbGUgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcjcHJvZ3Jlc3Nfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBwcm9ncmVzc05hdiA9ICQoJyNwcm9ncmVzc19uYXYnKTtcbiAgICAgICAgdmFyIGhhbmRsZVBvcmdyZXNOYXZDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gcHJvZ3Jlc3NOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKCcxMDAlJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlUG9yZ3Jlc05hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzTmF2LmFkZENsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYud2lkdGgoNDApOyAvLyBjaGFuZ2luZyB0aGUgd2lkdGggdG8gbWFrZSB0aGUgZmlyc3QgYnV0dG9uIG9mIHByb2dyZXNzIGJhciBjbGlja2FibGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRoZSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0byBib2R5IHNvIGRvIHRoZSB3b3JrIG9uIGJvZHkgY2xpY2sgXFwgb25seSBpZiBtZW51IGlzIGNsb3NlZFxuICAgICAgICAgKiB0aGlzIHRvIG1ha2Ugc3VyZSB0aGUgbWVudSBpcyBjbG9zZWQgd2hlbiBjbGljayBvdXRzaWRlIHRoZSBtZW51XG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZmFsc2UgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEhhbWJ1cmdlciBtZW51IGJ1dHRvbiBtb2JpbGUgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcjbWVudV9zd2l0Y2gnKS5vbignY2xpY2snLCBmdW5jdGlvbihldil7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG1lbnVOYXYgPSAkKCcjbWVudV9uYXYnKTtcbiAgICAgICAgdmFyIGhhbmRsZU1lbnVOYXZDbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAodHJ1ZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICAvLy8vIHVuYmluZCB3aGVuIG1lbnUgY2xvc2VkIG5vIG5lZWQgdG8gY2hlY2sgZm9yIGNsaWNrXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnVuYmluZCgnY2xpY2snLCBoYW5kbGVNZW51TmF2Q2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVudU5hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZENsYXNzKCdleHBhbmRlZCcpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGZhbHNlID09PSBtZW51TmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVNZW51TmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgc2Nyb2xsaW5nIGV2ZW50IGxpc3RlbmVyIHRvIG1ha2UgdGhlIHByb2dyZXNzIGJhciBzdGlja3lcbiAgICAgKi9cbiAgICAvLyBpZigkKCdib2R5Jykud2lkdGgoKSA8IDY3OCl7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcpLm9uKCdzY3JvbGwnLCBtYWluU2Nyb2xsKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgc3RhdGVzIGRyb3AtZG93bnNcbiAgICAgKi9cbiAgICAgZmlsbFN0YXRlRHJvcGRvd24oICQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEZsb2F0IGxhYmVsIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnLmNjLWZpZWxkLmZsb2F0JykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0nKS5lcSgwKTtcblxuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50ID0gJ2tleXVwJztcbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZHJvcGRvd24nKSl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQgPSAnY2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkLm9uKHRyaWdnZXJFdmVudCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihmaWVsZC52YWwoKSl7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZWRpdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pOy8vLyAuZWFjaFxuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5qc0NvbGxhcHNlJykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVXAoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTsvLy8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvblxuICAgICAqL1xuICAgIHllc05vUmFkaW8oKTtcblxuICAgIC8qKlxuICAgICAqIFNldCBtdWx0aSBjaGVja2JveFxuICAgICAqL1xuICAgIG11bHRpQ2hlY2tib3goKTtcbn0vLy8vIGZ1bi4gY2NEb2N1bWVudFJlYWR5XG5cbmZ1bmN0aW9uIG1haW5TY3JvbGwoZSl7XG4gICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICBpZigkKCdib2R5Jykud2lkdGgoKSA+IDY3OCkgcmV0dXJuO1xuXG4gICAgdmFyIHMgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgdmFyIGJhciA9ICQoJyNwcm9ncmVzc19uYXYnKTtcbiAgICBpZihzID4gMjAwKXtcbiAgICAgICAgaWYoZmFsc2UgPT09IGJhci5oYXNDbGFzcygnZmxvYXQnKSl7XG4gICAgICAgICAgICBiYXIuYWRkQ2xhc3MoJ2Zsb2F0Jyk7XG4gICAgICAgICAgICBiYXIucGFyZW50KCkuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGJhci5oZWlnaHQoKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBiYXIucmVtb3ZlQ2xhc3MoJ2Zsb2F0Jyk7XG4gICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgbnVsbClcbiAgICB9XG5cbn0vLy8vIGZ1bi4gbWFpblNjcm9sbFxuXG5cbmZ1bmN0aW9uIHVwZGF0ZVRhYkluZGV4KHNlbGVjdG9yKXtcbiAgdmFyIHggPSAwO1xuICAgIHNlbGVjdG9yLmZpbmQoJy5jYy1maWVsZCcpLmVhY2goZnVuY3Rpb24oaSl7XG4gICAgICAgIHZhciBzID0gJCh0aGlzKS5maW5kKCdpbnB1dFt0eXBlPXRleHRdLCBpbnB1dFt0eXBlPWVtYWlsXSwgaW5wdXRbdHlwZT1kYXRlXSwgaW5wdXRbdHlwZT10ZWxdLCBpbnB1dFt0eXBlPXJhZGlvXSwgaW5wdXRbdHlwZT1jaGVja2JveF0sIGlucHV0W3R5cGU9bnVtYmVyXSwgdGV4dGFyZWEsIHNlbGVjdCcpXG4gICAgICAgIHMuZWFjaChmdW5jdGlvbih6KXtcbiAgICAgICAgICAkKHRoaXMpLmF0dHIoJ3RhYmluZGV4JywgeCsxKTtcbiAgICAgICAgICB4Kys7XG4gICAgICAgIH0pXG4gICAgfSlcbn0vLy8vIGZ1bi4gdXBkYXRlVGFiSW5kZXhcblxuLyoqXG4gKiBbeWVzTm9SYWRpbyBXaWxsIHNldCB0aGUgYmVoYXZpb3Igb2YgeWVzL25vIHJhZGlvIGJ1dHRvbnMgYnkgYWRkaW5nIC5jaGVja2VkIGNsYXNzIHRvIHRoZSBsYWJlbCBvZiB0aGUgYnV0dG9uXVxuICogdGhlIGZ1bmN0aW9uIGFzc3VtZSB0aGUgaW5wdXRbdHlwZT1yYWRpb25dIGlzIGluY2x1ZGVkIGluc2lkZSA8bGFiZWw+IHRhZ1xuICovXG5mdW5jdGlvbiB5ZXNOb1JhZGlvKCl7XG4gIHZhciByYWRpb3MgPSAkKCcucmFkaW8teWVzbm8gaW5wdXRbdHlwZT1yYWRpb10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgaWYoJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCdsYWJlbC5jaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuYWRkQ2xhc3MoJ2NoZWNrZWQnKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICQodGhpcykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICB9XG4gIH0pXG4gIC5vbignZm9jdXMnLCBmdW5jdGlvbihlKXtcbiAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdmb2N1cycpO1xuICB9KVxuICAub24oJ2JsdXIga2lsbGZvY3VzJywgZnVuY3Rpb24oZSl7XG4gICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgfSk7XG5cbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpOy8vLy8gdGhpcyB0byBzZXQgdGhlIGluaXRpYWwgc3RhdGVcbn1cblxuZnVuY3Rpb24gbXVsdGlDaGVja2JveCgpe1xuICB2YXIgcmFkaW9zID0gJCgnLmNjLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgIC8vICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJ2knKS5hZGRDbGFzcygnZ2x5cGhpY29uIGdseXBoaWNvbi1vaycpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCdpJykucmVtb3ZlQ2xhc3MoKTtcbiAgICB9XG4gIH0pXG59Ly8vLyBmdW4uIG11bHRpQ2hlY2tCb3hcblxuLyoqXG4gKiBbZmlsbFN0YXRlRHJvcGRvd24gd2lsbCBmaWxsIHRoZSBkcm9wZG9uIG9mIFVTQSBzdGF0ZXMgZm9ybSB1c1N0YXRlIHZhcmlhYmxlXVxuICogQHBhcmFtICB7W3R5cGVdfSBzZWxlY3RvciBbalF1ZXJ5IG9iamVjdCB0aGF0IGNvbnRhaW4gPHNlbGVjdD4gdGFnIHRvIGJlIGZpbGxlZF1cbiAqIHVzU2F0ZSBpcyBhcnJheSBvZiBvYmplY3QgZGVmaW5lZCBpbiB1cy1zdGF0dXMuanMgZmlsZVxuICovXG5mdW5jdGlvbiBmaWxsU3RhdGVEcm9wZG93bihzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHVsID0gJCh0aGlzKS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgZm9yKHZhciBzPTA7IHM8dXNTdGF0ZXMubGVuZ3RoOyBzKyspe1xuICAgICAgICAgICAgdmFyIGxpID0gJCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB1c1N0YXRlc1tzXS5hYmJyZXZpYXRpb24gKyAnXCI+JyArIHVzU3RhdGVzW3NdLm5hbWUgKyAnPC9vcHRpb24+Jyk7XG4gICAgICAgICAgICB1bC5hcHBlbmQobGkpO1xuICAgICAgICB9Ly8vLyBmb3JcbiAgICB9KTtcbn0vLy8vIGZ1bi4gZmlsbFN0YXRlRHJvcGRvd25cblxuLyoqXG4gKiBbaXNBbmRyb2lkIHNpbXBsZSBmdW5jdGlvbiB0byBkZXRlY3QgQW5kcm9pZCBPU11cbiAqIHRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byBkZXRlY3QgdGhlIGJ1ZyBpbiBBbmRyb2lkIHdoZW4ga2V5ZG93biwga2V5dXAgZXZlbnQgZG9lc24ndCBzZW5kIHRoZSByaWdodCBrZXkgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gW3RydWUgaWYgQW5kcm9pZCBPU11cbiAqL1xudmFyIGlzQW5kcm9pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAvKGFuZHJvaWQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn0vLy8vIGZ1bi4gaXNBbmRyb2lkXG5cblxudmFyIHJlc3RyaWN0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC0oKSBcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDQ4LCA1NywgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGZvcm1hdFBob25lID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJhd1ZhbHVlID0gdmFsLnNwbGl0KC9bXFwofFxcKXwgfFxcLXxcXCt8XFwuXS8pLmpvaW4oJycpO1xuICB2YXIgZm9ybWF0ZWQgPSAnJztcbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9ICcoJyArIHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnKSAnO1xuICAgIHJhd1ZhbHVlID0gcmF3VmFsdWUuc2xpY2UoMyk7XG4gIH1cbiAgaWYocmF3VmFsdWUubGVuZ3RoID49IDMpe1xuICAgIGZvcm1hdGVkICs9IHJhd1ZhbHVlLnNsaWNlKDAsMykgKyAnLSc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBmb3JtYXRlZCArPSByYXdWYWx1ZTtcblxuICAkKHRoaXMpLnZhbChmb3JtYXRlZCk7XG59Ly8vLyBmdW4uIGZvcm1hdFBob25lXG5cbnZhciByZXN0cmljdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuXG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBbJzAnLCAnMScsICcyJywgJzMnLCAnNCcsICc1JywgJzYnLCAnNycsICc4JywgJzknLCAnLyddXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5JylcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG4gICAgJCh0aGlzKS5zaG93RXJyb3IoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnJlcGxhY2UoL1xcLy9nLCAnJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcblxuICAgIGlmKHJhdy5sZW5ndGggPj0gMil7XG4gICAgICByZXQgKz0gcmF3LnNsaWNlKDAsIDIpICsgJy8nO1xuICAgICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuICAgIH1cbiAgfVxuXG4gIHJldCArPSByYXc7XG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLyBmdW4uIGZvcm1hdGVEYXRlXG5cbnZhciByZXN0cmljdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MC1cIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFsxODksIDksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciBmb3JtYXRTU04gPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwtL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDMpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMykgKyAnLSc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDMpO1xuXG4gICAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLSc7XG4gICAgICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn1cblxudmFyIHJlc3RyaWN0TnVtYmVycyA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIHZhciBhbGxvd2VkQ2hhcnMgPSBTdHJpbmcoXCIwMTIzNDU2Nzg5MFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpLmhpZGVFcnJvcigpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciByZXN0cmljdEN1cnJlbmN5ID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwJCxcIikuc3BsaXQoJycpO1xuICB2YXIgYWxsb3dlZCA9IFs5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKS5oaWRlRXJyb3IoKTtcblxuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPT0gLTEgJiYgYWxsb3dlZENoYXJzLmluZGV4T2YoY2hhcikgPT0gLTEpe1xuICAgIGlmKGtleUV2LnByZXZlbnREZWZhdWx0KSBrZXlFdi5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGtleUV2LnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgJCh0aGlzKS5hZGRFcnJvcignY2MtbnVtYmVycy1vbmx5Jykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdEN1cnJlbmN5ID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2g7XG5cbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwuc3BsaXQoL1tcXCR8IHxcXCxdLykuam9pbignJyk7XG5cbiAgaWYocmF3Lmxlbmd0aCA+IDMpe1xuICAgICAgdmFyIGFyciA9IHJhdy5zcGxpdCgnJyk7XG4gICAgICB2YXIgc2VwID0gMTtcbiAgICAgIGZvcih2YXIgeD1hcnIubGVuZ3RoLTE7IHg+PTA7IHgtLSl7XG4gICAgICAgIC8vLy8gYWRkIHJlYWRpbmcgY29tbWEgYWZ0ZXIgMyBkaWdpdHMgYW5kIG9ubHkgaWYgdGhlcmUgaXMgbmV4dCBkaWdpdFxuICAgICAgICByZXQgPSAoc2VwICUgMyA9PSAwICYmIHRydWUgPT09ICEhYXJyW3gtMV0/ICcsJyA6ICcnKSArIGFyclt4XSAgKyByZXQ7XG4gICAgICAgIHNlcCsrO1xuICAgICAgfVxuICAgICAgcmV0ID0gJyQnICsgcmV0O1xuICB9XG4gIGVsc2UgaWYocmF3Lmxlbmd0aCA+IDApe1xuICAgIHJldCA9ICckJyArIHJhdztcbiAgfVxuICBlbHNle1xuICAgIHJldCA9IHJhdztcbiAgfVxuXG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLy8gZnVuLiBmb3JtYXRDdXJyZW5jeVxuXG52YXIgYW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uKHksIHRpbWUpe1xuXG4gICAgY2xlYXJJbnRlcnZhbChfYXBwVmFycy5zY3JvbGxJbnRlKTsvLy8vIHN0b3AgYW55c2Nyb2xsaW5nXG5cbiAgICBpZih1bmRlZmluZWQgPT09IHRpbWUpIHRpbWUgPSAxOy8vLy8gc2V0IGRlZmF1bHQgdmFsdWUgZm9yIHRpbWVcbiAgICB2YXIgZnBzID0gNjA7IC8vLy8gZnJhbWVzIHBlciBzZWNvbnNcbiAgICB2YXIgZnJhbWVUaW1lID0gTWF0aC5jZWlsKDEwMDAgLyBmcHMpO1xuICAgIHZhciBkID0gdGltZSAqIGZyYW1lVGltZTsgLy8vIG51bWJlciBvZiBmcmFtZXMgZHVyYXRpb25cbiAgICB2YXIgdCA9IDA7IC8vLy8gdGltZSB0aWNrZXIgLyBmcmFtZSBjb3VudGVyXG5cbiAgICAvLy8vIHNldCBiZWdpbiBwb2ludCB3aGloYyB0aGUgY3VycnJlbnQgcG9pbnRcbiAgICAvLyBiID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgOiB3aW5kb3cuc2Nyb2xsWTtcbiAgICB2YXIgYiA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IDA7XG4gICAgLy9cbiAgICBpZihiID09PSB1bmRlZmluZWQpe1xuICAgICAgICBiID0gMDtcbiAgICB9XG5cblxuICAgIC8vLy8gY2hlY2sgaWYgc2Nyb2xsaW5nIGRlc3RpbmF0aW9uIGlzIGJpZ2dlciB0aGFuIHBhZ2UgaGVpZ2h0IGxpbWl0c1xuICAgIHZhciBsaW1pdCA9IE1hdGgubWF4KCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICApO1xuICAgIGlmKHk+bGltaXQpe1xuICAgICAgICB5ID0gbGltaXQ7XG4gICAgfVxuXG4gICAgLy8vLyBzZXQgdGhlIGNoYW5nZSBiZXR3ZWVuIGN1cnJlbnQgYW5kIGRlc3RpbmF0aW9uIHBvaW50XG4gICAgYyA9IGIgLSB5O1xuXG4gICAgLy8vLyBkbyBub3RoaW5nIGlmIGRlc3RpbmF0aW9uIGlzIHNhbWUgYXMgY3VycmVudFxuICAgIGlmKE1hdGguYWJzKGMpIDwgMSkgcmV0dXJuO1xuXG4gICAgLy8vLyBzdGFydCB0aW1lIHRpY2tlclxuICAgIF9hcHBWYXJzLnNjcm9sbEludGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAvLy8gZWFzZSBvdXQgbWF0aFxuICAgICAgICB2YXIgcGVyID0gMSAtIHQvZDtcbiAgICAgICAgdmFyIG5ld1kgPSAgLWMgKiAoMS1wZXIqcGVyKnBlcipwZXIpICsgYjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+XCIsIDEtKDEtcGVyKSooMS1wZXIpKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG5ld1kpO1xuXG5cbiAgICAgICAgaWYodCA9PSBkKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2FwcFZhcnMuc2Nyb2xsSW50ZSk7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignYW5pbWF0ZVNjcm9sbEVuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHQrKztcblxuICAgIH0sIGZyYW1lVGltZSk7XG59Ly8vLyBmdW4uIGFuaW1hdGVTY3JvbGxcblxuLyoqXG4gKiBbcmVzZXRGaWVsZHMgd2lsbCBzZWFyY2ggZm9yIGlucHV0IGZpZWxkIGluc2lkZSBhIGNvbnRhaW5lciBhbmQgcmVzdCBpdHMgdmFsdWUgYW5kIGFueSBlcnJvciBzdGF0dXNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IGNvbnRhaW5lciBbalF1ZXlyIG9iamVjdCB0aGF0IHNob3VsZCBjb250YWluIGlucHV0IGZpbGVkIHRoYXQgbmVlZCBiZSByZXNldF1cbiAqL1xudmFyIHJlc2V0RmllbGRzID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgdmFyIGZpZWxkcyA9IGNvbnRhaW5lci5maW5kKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuXG4gIGZpZWxkcy5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgIHZhciB0eXBlID0gJCh0aGlzKS5hdHRyKCd0eXBlJyk7XG4gICAgaWYodHlwZSA9PT0gJ3JhZGlvJyl7XG4gICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAgICQodGhpcykucGFyZW50KCkuZmlsdGVyKCdsYWJlbCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAkKHRoaXMpLnZhbCgnJyk7XG4gICAgfVxuICAgICQodGhpcykuaGlkZUVycm9yKCk7XG4gIH0pO1xuXG59Ly8vLyBmdW4uIHJlc2V0RmllbGRzXG5cbi8qKlxuICogW2luY2x1ZGVGaWVsZHMgd2lsbCBhZGQgaGlkZGVuIGZpZWxkcyBpbiBmb3JtIGFuZCBzZXQgdGhlIHJpZ2h0IHZhbGlkYXRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgc2hvdWxkIGhhdmUgMiBwcm9wZXJ0aWVzIGFzIGJlbG93XG4gKiBvcHRpb25zLnNlbGVjdG9yIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBzZWxlY3QgdGhlIHNlY3Rpb24gbmVlZCB0byBiZSBpbmNsdWRlZCBlLmcuIFwiLm5ldy1maWVsZHNcIiwgXCIjY2xvZGluZ0RhdGVcIlxuICogb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIGlkZW50aWZ5IHRoZSAuY2MtZmllbGQgdGhhdCBuZWVkIHRvIGJlIGluY2x1ZGUgaW4gdmFsaWRhdGlvblxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xudmFyIGluY2x1ZGVGaWVsZHMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMuc2VsZWN0b3IgfHwgIW9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGZpZWxkcyA9ICQob3B0aW9ucy5zZWxlY3Rvcik7XG4gIGZpZWxkcy5maW5kKG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgZmllbGRzLnNsaWRlRG93bigpO1xuXG59XG5cbi8qKlxuICogW2V4Y2x1ZGVGaWVsZHMgd2lsbCBleGNsdWRlIGZpZWxkcyBmcm9tIGZvcm0gYW5kIHNldCByZW1vdmUgdGhlIHZhbGlkYXRpb25dXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgc2hvdWxkIGhhdmUgMiBwcm9wZXJ0aWVzIGFzIGJlbG93XG4gKiBvcHRpb25zLnNlbGVjdG9yIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBzZWxlY3QgdGhlIHNlY3Rpb24gbmVlZCB0byBiZSBleGNsdWRlZFxuICogb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIGlkZW50aWZ5IHRoZSAuY2MtZmllbGQgdGhhdCBuZWVkIHRvIGJlIGV4Y2x1ZGVkIGZyb20gdmFsaWRhdGlvblxuICovXG52YXIgZXhjbHVkZUZpZWxkcyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucy5zZWxlY3RvciB8fCAhb3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpIHJldHVybiBmYWxzZTtcblxuICB2YXIgZmllbGRzID0gJChvcHRpb25zLnNlbGVjdG9yKTtcbiAgZmllbGRzLmZpbmQob3B0aW9ucy52YWxpZGF0aW9uQ2xhc3MpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpO1xuICByZXNldEZpZWxkcyhmaWVsZHMpO1xuICBmaWVsZHMuc2xpZGVVcCgpO1xuXG59XG4iLCIkKGRvY3VtZW50KS5yZWFkeShib3Jyb3dlclJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5cbmZ1bmN0aW9uIGJvcnJvd2VyUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjYm9ycm93ZXJGb3JtJyk7XG4gICAgLyoqXG4gICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsZCwgaW52YWxpZEZpZWxkcyl7XG5cbiAgICAgICAgaWYoaXNWYWxkKXtcblxuICAgICAgICAgICAgdmFyIGlzQ29Cb3Jyb3dlciA9ICBTdHJpbmcoJzIzNCcpLnNwbGl0KCcnKS5pbmRleE9mKCAkKCcjYm9fYXBwbHl0eXBlJykudmFsKCkgKSA+IC0xO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSBpc0NvQm9ycm93ZXIpe1xuICAgICAgICAgICAgICAgIG15Rm9ybS5hdHRyKCdhY3Rpb24nLCAnMDItY29ib3Jyb3dlci5odG1sJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vLy8gaWYgdGhlIGZvcm0gaXMgbm90IHZhbGlkIGFuZCBjb250aW51ZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgLy8vLyBzY3JvbGwgdG8gdGhlIHBhZ2UgdG8gZmlyc3QgZmllbGQgd2l0aCBlcnJvclxuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTsgIC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGlzVmFsaWQgZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBldmVudCBoYW5kbGVycyBhcmUgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpXG5cblxuXG4gICAgJCgnI2JvX2hvd2hlYXInKS5vZmYoJ2NoYW5nZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHZhbCA9IHBhcnNlSW50KCQodGhpcykudmFsKCksMTApO1xuICAgICAgICB2YXIgYXJyID0gWzIsMyw0LDVdO1xuICAgICAgICBpZihhcnIuaW5kZXhPZih2YWwpID4gLTEpe1xuICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJylcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBmb3IgYWRkcmVzcyBsZW5ndGggY2hhbmdlXG4gICAgICovXG4gICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgYWRkcmVzc0luZGV4KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBudW1iZXIgb2YgZGVwZW5kZW50cyBjaGFuZ2UgYW5kIHNob3cgYWdlcyBmaWVsZHNcbiAgICAgKi9cbiAgICAkKCcjYm9fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBjaGFuZ2Ugb2YgcmFkaW8gYnV0dG9uIGN1cnJlbnQgYWRkcmVzcyBvd24vcmVudFxuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9Ym9fY3VycmVudGx5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdmFyIHJlbnRDb2wgPSAkKCcjbW9udGhseVJlbnQnKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbnRDb2wuZmluZCgnLmNjLWZpZWxkJykuZXEoMCk7XG4gICAgICAgIGlmKHZhbC50b0xvd2VyQ2FzZSgpID09PSAncmVudCcpe1xuICAgICAgICAgICAgcmVudENvbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbnRDb2wuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIG1lc3NhZ2UgZXJyb3InKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhZGRyZXNzIHR5cGUgYWhlYWQgZnVuY3Rpb25hbGl0eSB0byBhZGRyZXNzXG4gICAgICovXG4gICAgYWRkQXV0b0FkZHJlc3MoMSk7XG5cbn07Ly8vLyBib3Jyb3dlclJlYWR5XG5cblxuXG5mdW5jdGlvbiBjaGVja0FkZHJlc3NMZW5ndGgoY29udGFpbmVyLCBpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+IDEgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJy5hZGRyZXNzTGVuZ3RoTScgKyBwb3N0KS5lcSgwKVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcblxuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKCcuYWRkcmVzc0xlbmd0aFknICsgcG9zdCkuZXEoMCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG4gICAgICAgIGlmKCF2KSB2ID0wO1xuICAgICAgICBpZigheWVhcnMpe1xuICAgICAgICAgICAgeWVhcnMgPSAwO1xuICAgICAgICAgICAgJCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApLnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb250YWluZXIuZmluZCgnLmFkZHJlc3NMZW5ndGhZJyArIHBvc3QpLmVxKDApXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCgnLmFkZHJlc3NMZW5ndGhNJyArIHBvc3QpLmVxKDApLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG5cbiAgICAgICAgaWYoIXYpIHtcbiAgICAgICAgICAgIHYgPTA7XG4gICAgICAgICAgICAkKCcuYWRkcmVzc0xlbmd0aE0nICsgcG9zdCkuZXEoMCkudmFsKDApXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXllYXJzKSB5ZWFycyA9IDA7XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSlcbn0vLy8vLyBmdW4uIGNoZWNrQWRkcmVzc0xlbmd0aFxuXG5mdW5jdGlvbiBhZGRBZGRyZXNzKG5leHRJZCl7XG4gICAgaWYobmV4dElkID49IDUpIHJldHVybiBmYWxzZTtcbiAgICBpZihhZGRyZXNzSW5kZXggPj0gbmV4dElkKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgc2VjdGlvbiA9ICQoJyNwcmVBZGRyZXNzJyk7XG4gICAgYWRkcmVzc0luZGV4ID0gbmV4dElkO1xuICAgIHZhciBhZGRyZXNzID0gJChhZGRyZXNzVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgYWRkcmVzc0luZGV4KSk7XG5cbiAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZC5jYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBhZGRyZXNzLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7IC8vLy8gZnVuLiBpbiBtYWluLmpzXG5cbiAgICBhZGRyZXNzLmZpbmQoJ2lucHV0Lm51bWJlcnMnKS5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycyk7XG5cbiAgICBjaGVja0FkZHJlc3NMZW5ndGgoYWRkcmVzcywgYWRkcmVzc0luZGV4KTtcblxuICAgIHNlY3Rpb24uYXBwZW5kKGFkZHJlc3MpO1xuICAgIGFkZEF1dG9BZGRyZXNzKGFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIHNlY3Rpb24uc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBhZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9YWRkcmVzc0luZGV4OyB4Kyspe1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHNlY3Rpb24uZmluZCgnI2FkZHJlc3NfJyArIHgpO1xuXG4gICAgICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgYWRkcmVzcy5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG4gICAgYWRkcmVzc0luZGV4ID0gaWRSZW1vdmUtMTtcbiAgICBpZihhZGRyZXNzSW5kZXggPD0gMSkgc2VjdGlvbi5zbGlkZVVwKClcbn1cblxuLyoqXG4gKiBbYWRkQXV0b0FkZHJlc3Mgd2lsbCBhZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gdGV4dCBmaWVsZCB3aXRoIGlkICdib19hZGRyZXNzJ11cbiAqIEBwYXJhbSB7W3R5cGVdfSBpbmRleCBbaW4gbXVsdGktYWRkcmVzcyBjYXNlIHRoaXMgdmFyaWFibGUgd2lsbCB0ZWwgdGhlIGZ1bmN0aW9uIHdoaWNoIGFkZHJlc3MgdG8gYmluZCB0aGUgdHlwZSBhaGVhZCB0b11cbiAqL1xuZnVuY3Rpb24gYWRkQXV0b0FkZHJlc3MoaW5kZXgpe1xuICAgIHZhciBwb3N0ID0gaW5kZXggPj0gMiA/ICcnK2luZGV4IDogJyc7XG5cbiAgICB2YXIgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib19hZGRyZXNzJyArIHBvc3QpLFxuICAgICAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnICsgcG9zdCkuZmlsdGVyKCdpbnB1dCcpWzBdLFxuICAgICAgICB7dHlwZXM6IFsnZ2VvY29kZSddfVxuICAgICk7XG4gICAgLy8vLyBzZXQgdGhlIGFkZHJlc3MgaW5kZXggYW5kIHBvc3QgaW4gYXV0b2NvbXBsZXRlIG9iamVjdCB0byBiZSB1c2VkIGluIGZpbGxJbkFkZHJlc3MgZnVuY3Rpb25cbiAgICBhdXRvY29tcGxldGUuaW5kZXggPSAwO1xuICAgIGF1dG9jb21wbGV0ZS5wb3N0ID0gcG9zdDtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhZGRyZXNzIGZyb20gdGhlIGRyb3Bkb3duLCBwb3B1bGF0ZSB0aGUgYWRkcmVzc1xuICAgIC8vIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBmaWxsSW5BZGRyZXNzKTtcbn1cblxuLyoqXG4gKiBbZmlsbEluQWRkcmVzcyB3aWxsIHVwZGF0ZSB0aGUgYWRkcmVzcyBjaXR5LCBzdGF0LCBhbmQgemlwIGZpbGVkIGFmdGVyIHVzZXIgc2VsZWN0IGFkZHJlc3MgZm9ybSB0eXBlIGFoZWFkXVxuICogdGhpcyBpbnNpZGUgdGhpcyBmdW5jdGlvbiB3aWxsIHJlZmVyZW5jZSBnb29nbGUgYXV0b2NvbXBldGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtbbnVsbF19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmlsbEluQWRkcmVzcygpe1xuICAgIC8vLy8gdGhpcyByZWZlciB0byB0aGUgYXV0byBjb21wbGV0ZSBvYmplY3RcblxuICAgIHZhciBwbGFjZSA9IHRoaXMuZ2V0UGxhY2UoKTtcbiAgICB2YXIgY29tcG9uZW50Rm9ybSA9IHtcbiAgICAgICAgc3RyZWV0X251bWJlcjogJ3Nob3J0X25hbWUnLFxuICAgICAgICByb3V0ZTogJ2xvbmdfbmFtZScsXG4gICAgICAgIGxvY2FsaXR5OiAnbG9uZ19uYW1lJyxcbiAgICAgICAgYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIGNvdW50cnk6ICdsb25nX25hbWUnLFxuICAgICAgICBwb3N0YWxfY29kZTogJ3Nob3J0X25hbWUnXG4gICAgfTtcblxuICAgIHZhciBhZGRyZXNzID0ge307XG4gICAgdmFyIGxvbmdfbmFtZSA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0eXBlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzWzBdO1xuICAgICAgICB2YXIgYWRkcmVzc1R5cGUgPSB0eXBlO1xuXG4gICAgICBpZiAoY29tcG9uZW50Rm9ybVthZGRyZXNzVHlwZV0pIHtcbiAgICAgICAgdmFyIHZhbCA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVtjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXV07XG4gICAgICAgIGFkZHJlc3NbYWRkcmVzc1R5cGVdID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYoYWRkcmVzc1R5cGUgPT09ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKXtcbiAgICAgICAgICAgIGxvbmdfbmFtZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVsnbG9uZ19uYW1lJ107XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmb3JcbiAgICBhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUgPSBsb25nX25hbWU7XG5cbiAgICAkKCcudHlwZWFoZWFkX2FkZHJlc3MnK3RoaXMucG9zdCkuZXEoMCkudmFsKGFkZHJlc3Muc3RyZWV0X251bWJlciArICcgJyArIGFkZHJlc3Mucm91dGUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJy50eXBlYWhlYWRfY2l0eScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5sb2NhbGl0eSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnLnR5cGVhaGVhZF9zdGF0ZScrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIC8vICQoJyNzdGF0ZV9sYWJlbCcrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFfbG9uZ19uYW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcudHlwZWFoZWFkX3ppcCcrdGhpcy5wb3N0KS5lcSgwKS52YWwoYWRkcmVzcy5wb3N0YWxfY29kZSkudHJpZ2dlcignY2hhbmdlJyk7XG59IiwiJChkb2N1bWVudCkucmVhZHkoY29Cb3Jyb3dlclJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5mdW5jdGlvbiBjb0JvcnJvd2VyUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjY29Cb3Jyb3dlckZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIC8qKlxuICAgICAqIFthZGRyZXNzSW5kZXggd2lsbCB0cmFjayB0aGUgbnVtYmVyIG9mIGFkZHJlc3MgYWRkZWQgYW5kIHN0b3AgaWYgdG90YWwgb2YgNCBhZGRyZXNzXVxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICovXG4gICAgYWRkcmVzc0luZGV4ID0gMTtcblxuICAgIGFkZHJlc3NUZW1wbGF0ZSA9ICQoJyNhZGRyZXNzVGVtcGxhdGUnKS5odG1sKCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5zc24nKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBjby1ib3Jyb3dlciBsaXZlIGluIGRpZmZlcmVudCBhZGRyZXNzXG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1jb19saXZlc2FtZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSAneWVzJyl7XG5cbiAgICAgICAgICAgICQoJyNhZGRyZXNzRGl2Jykuc2xpZGVVcCgpXG4gICAgICAgICAgICAuZmluZCgnLmNjLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCBtZXNzYWdlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnI3ByZUFkZHJlc3MnKS5zbGlkZVVwKCkuZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZURvd24oKVxuICAgICAgICAgICAgLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVUYWJJbmRleChteUZvcm0pOyAvLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQmFjayBidXR0b24gY2xpY2sgaGFuZGxlcnNcbiAgICAgKi9cbiAgICAkKCcjYmFjaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGNlKXtcbiAgICAgICAgaGlzdG9yeS5iYWNrKCk7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGZvciBhZGRyZXNzIGxlbmd0aCBjaGFuZ2VcbiAgICAgKiBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAqL1xuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIGFkZHJlc3NJbmRleCk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBudW1iZXIgb2YgZGVwZW5kZW50cyBjaGFuZ2UgYW5kIHNob3cgYWdlcyBmaWVsZHNcbiAgICAgKi9cbiAgICAkKCcjY29fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgY28tYm9ycm93ZXIgbmFtZSBpbiBzdWIgdGl0bGVzXG4gICAgICovXG4gICAgdmFyIG5hbWVIb2xkZXIgPSAkKCcuY29Cb3Jyb3dlck5hbWUnKTtcbiAgICAkKCcjY29fZm5hbWUnKS5vbigna2V5dXAnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHZhbCA9ICQudHJpbSggJCh0aGlzKS52YWwoKSApO1xuICAgICAgICBuYW1lSG9sZGVyLnRleHQoIHZhbCA/IHZhbCA6ICdDby1Cb3Jyb3dlcicpO1xuICAgIH0pXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuIiwiJChkb2N1bWVudCkucmVhZHkocHVyY2hhc2VSZWFkeSk7XG52YXIgYWRkcmVzc1RlbXBsYXRlO1xudmFyIGFkZHJlc3NJbmRleDtcblxuZnVuY3Rpb24gcHVyY2hhc2VSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNwdXJjaGFzZUZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpO1xuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgcmVhbCBzdGF0ZSBhZ2VudFxuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cHVfdXNpbmdhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIHZhciBhZ2VudCA9ICQoJyNhZ2VudENvbnRhY3QnKTtcbiAgICAgICAgdmFyIGFnZW50RmllbGRzID0gJCgnI2FnZW50RmllbGRzJyk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRDb250YWN0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonI2FnZW50RmllbGRzLCAjYWdlbnRDb250YWN0JyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSk7Ly8vLy8gb24uY2hhbmdlXG5cblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGlmIGNvbnRhY3QgYWdlbnRcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPXB1X2NvbnRhY3RhZ2VudF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRGaWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWdlbnRGaWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgcHJvcGVydHlcbiAgICAgKi9cbiAgICAkKCcjcHVfc2VhcmNodHlwZXB1cmNoYXNlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpc1Byb3BlcnR5ID0gU3RyaW5nKCczNCcpLnNwbGl0KCcnKS5pbmRleE9mKHZhbCkgPiAtMTtcblxuICAgICAgICBpZih0cnVlID09PSBpc1Byb3BlcnR5KXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHktZmllbGRzJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnByb3BlcnR5LWZpZWxkcywgI3N1Yk5hbWUsICNjbG9zaW5nRGF0ZSwgI21vbnRobHlIT0EnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtc3ViLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZywgLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuXG4gICAgfSk7Ly8vIG9uLmNoYW5nZVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgSE9BIGR1ZXNcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPXB1X3BsYW5uZWR1bml0XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1IT0EnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXB1X2hhdmVjbG9zaW5nZGF0ZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY2xvc2luZ0RhdGUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1jbG9zaW5nJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1wdV9tYW51ZmFjdHVyZWRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI3N1Yk5hbWUnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zdWInfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3ViJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pXG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG4iLCIkKGRvY3VtZW50KS5yZWFkeShyZWZpbmFuY2VSZWFkeSk7XG52YXIgYWRkcmVzc1RlbXBsYXRlO1xudmFyIGFkZHJlc3NJbmRleDtcblxuZnVuY3Rpb24gcmVmaW5hbmNlUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjcmVmaW5hbmNlRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoIG15Rm9ybSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogW2lzUHJvcGVydHkgYm9vbGVhbiB2YWx1ZSB0byBrbm93IGlmIHVzZXIgaGFzIGEgcHJvcGVydHkgb3Igbm90XVxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc1Byb3BlcnR5ID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBpbml0aWFsaXplIGZvcm0gdmFsaWRhdGlvblxuICAgICAqL1xuICAgIG15Rm9ybS52YWxpZGF0ZShmdW5jdGlvbihpc1ZhbGlkLCBpbnZhbGlkRmllbGRzKXtcbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGlmIE5vdCB2YWxpZCBzY3JvbGwgdG8gZmlyc3QgaW52YWxpZCBmaWVsZFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZihpbnZhbGlkRmllbGRzICYmIHRydWUgPT09IGlzQ29udGludWVDbGlja2VkKXtcbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTtcblxuICAgICAgICAgICAgICAgIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWQgRWxzZVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbnRpbnVlIENsaWNrXG4gICAgICovXG4gICAgJCgnI2NvbnRpbnVlJykub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqIEV2ZW50IGhhbmRsZXJzIGluIG1haW4uanNcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5zc24nKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIC8qKlxuICAgICAqIEFkZGluZyBnb29nbGUgYWRkcmVzcyB0eXBlIGFoZWFkXG4gICAgICovXG4gICAgYWRkQXV0b0FkZHJlc3MoMSk7IC8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9wcm9wZXJ0eXJlZmluYW5jaW5nXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYodmFsID09PSAnbm8nICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5vdGhlckFkZHJlc3MnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonLm90aGVyQWRkcmVzcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiBIT0EgZHVlc1xuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cmZfcGxhbm5lZHVuaXRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX2ZvcnNhbGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2RhdGVPZmZNYXJrZXQnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfc3ViamVjdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjY29uc3RydWN0aW9uQnJpZWYnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2NvbnN0cnVjdGlvbkJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX2lzdGl0bGVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyN0cnVzdEJyaWVmJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPXJmX21hbnVmYWN0dXJlZF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9oYXZlTW9ydGdhZ2UxXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5maXJzdE1vcnRnYWdlLCAuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2wnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cmZfc2VjbW9ydGdhZ2VdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNlY29uZE1vcnRnYWdlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbW9ydGdhZ2UyJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2Vjb25kTW9ydGdhZ2UsIC5jcmVkaXQtbGltaXQsICNhZGRpdGlvbmFsTGllbnMnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLW1vcnRnYWdlMiwgLmNjLXRvLWJlLXZhbGlkYXRlLWNsLCAuY2MtdG8tYmUtdmFsaWRhdGUtbGluZSdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9tb3J0Z2FnZTJMT0NdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmNyZWRpdC1saW1pdCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuY3JlZGl0LWxpbWl0JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2wnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWFzX2FkZGl0aW9uYWxsaWVuc10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG5cbiAgICAgICAgaWYodmFsID09PSAneWVzJyAmJiAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjYWRkaXRpb25hbExpZW5zJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtbGllbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2FkZGl0aW9uYWxMaWVucycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWxpZW4nfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9XG4gICAgfSk7XG59Oy8vLy8gYm9ycm93ZXJSZWFkeVxuXG4iLCIkKGRvY3VtZW50KS5yZWFkeShib0luY29tZVJlYWR5KTtcbnZhciBlbXBsb3llclRlbXBsYXRlO1xudmFyIGVtcGxveWVySW5kZXg7XG52YXIgZW1wbG95ZXJzSG9sZGVyO1xuXG5mdW5jdGlvbiBib0luY29tZVJlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI2JvSW5jb21lRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgZW1wbG95ZXJUZW1wbGF0ZSA9ICQoJyNlbXBsb3llclRtcGx0JykudGV4dCgpO1xuICAgIGVtcGxveWVySW5kZXggPSAxO1xuICAgIGVtcGxveWVyc0hvbGRlciA9ICQoJyNlbXBsb3llcnNIb2xkZXInKVxuXG5cbiAgICB1cGRhdGVUYWJJbmRleCggbXlGb3JtKTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBbaXNDb250aW51ZUNsaWNrZWQgaXQgd2lsbCBiZSBzZXQgdG8gdHJ1ZSB3aGVuIGNvbnRpbnVlIGJ1dHRvbiBjbGlja2VkIF1cbiAgICAgKiB0aGlzIHZhciB3aWxsIGhlbHAgZGV0ZWN0IGZvcm0gc3VibWl0IG9uIGJ1dHRvbiBjbGljayBhbmQgc2Nyb2xsIHVwIHRoZSBwYWdlIHRvIHRoZSBmaXJzdCBmb3JtIGVycm9yXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzQ29udGludWVDbGlja2VkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBbaXNQcm9wZXJ0eSBib29sZWFuIHZhbHVlIHRvIGtub3cgaWYgdXNlciBoYXMgYSBwcm9wZXJ0eSBvciBub3RdXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGlzUHJvcGVydHkgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuXG5cbiAgICAgICAgaWYoaXNWYWxpZCl7XG5cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRpbmcgZ29vZ2xlIGFkZHJlc3MgdHlwZSBhaGVhZFxuICAgICAqL1xuICAgIGFkZEF1dG9BZGRyZXNzKDEpOyAvLy8gZnVuY3Rpb24gaW4gMDEtYm9ycm93ZXIuanNcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lMl0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuZW1wbG95bWVudCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWVtJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICAgICAgYmluZEVtcGxveW1lbnREYXRlKDEpO1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5lbXBsb3ltZW50LCAucHJlRW1wbG95bWVudCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZW0sIC5jYy10by1iZS12YWxpZGF0ZS1wcmUnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgICAgIGlmKGVtcGxveWVySW5kZXggPiAxKXtcbiAgICAgICAgICAgICAgICByZW1vdmVFbXBsb3llcigyKTsgLy8vIHdpbGwgdGFrZSBjYXJlIG9mIHRoZSByZXN0IG9mXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9aW5fY2tfaW5jb21lM10nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZih0cnVlID09PSAhISQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICAgICAgIGluY2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicuc2VsZicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNlbGYnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoNSlcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc2VsZicsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc2VsZidcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTRdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLmFkZGl0aW9uYWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1hZGRpdGlvbmFsJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIGFkZEF1dG9BZGRyZXNzKDYpXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLmFkZGl0aW9uYWwnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWFkZGl0aW9uYWwnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU1XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZXRpcmVtZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicucmV0aXJlbWVudCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmV0aXJlbWVudCdcbiAgICAgICAgICAgIH0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWluX2NrX2luY29tZTZdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonLnNzbicsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXNzbid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicuc3NuJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1zc24nXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU3XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5jaGlsZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWNoaWxkJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5jaGlsZCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2hpbGQnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU4XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5kaXZpZGVuZCcsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLWRpdmlkZW5kJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6Jy5kaXZpZGVuZCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtZGl2aWRlbmQnXG4gICAgICAgICAgICB9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1pbl9ja19pbmNvbWU5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmKHRydWUgPT09ICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5yZW50YWwnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1yZW50YWwnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjonLnJlbnRhbCcsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcmVudGFsJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KTtcblxufTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuZnVuY3Rpb24gYmluZEVtcGxveW1lbnREYXRlKGluZGV4KXtcblxuICAgIHZhciBmaWVsZHMgPSAkKCdpbnB1dC5zdGFydERhdGUnICsgaW5kZXggKyAnLCBpbnB1dC5lbmREYXRlJyArIGluZGV4KVxuICAgIC5vZmYoJ2NoYW5nZScsIHtpbmRleDppbmRleH0sIGNoZWNrRW1wbG95bWVudERhdGUpXG4gICAgLm9uKCdjaGFuZ2UnLCBjaGVja0VtcGxveW1lbnREYXRlKTtcblxufS8vLy8vIGZ1bi4gYmluZEVtcGxveW1lbnREYXRlXG5cbmZ1bmN0aW9uIGFkZEVtcGxveWVyKGluZGV4KXtcbiAgICBpZihpbmRleCA+IDQpIHJldHVybjtcblxuICAgIGVtcGxveWVySW5kZXggPSBpbmRleDtcbiAgICB2YXIgZW1wbG95ZXIgPSAkKGVtcGxveWVyVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgZW1wbG95ZXJJbmRleCkpO1xuXG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGVtcGxveWVyLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICBlbXBsb3llci5maW5kKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgZW1wbG95ZXIuZmluZCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KTtcblxuICAgIGVtcGxveWVyc0hvbGRlci5hcHBlbmQoZW1wbG95ZXIpO1xuXG4gICAgYWRkQXV0b0FkZHJlc3MoZW1wbG95ZXJJbmRleCk7XG4gICAgYmluZEVtcGxveW1lbnREYXRlKGVtcGxveWVySW5kZXgpO1xuXG4gICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIGVtcGxveWVyLnNsaWRlRG93bigpO1xufS8vLy8gZnVuLiBhZGRFbXBsb3llclxuXG5mdW5jdGlvbiByZW1vdmVFbXBsb3llcihyZW1vdmVJbmRleCl7XG5cbiAgICBpZihyZW1vdmVJbmRleCA8PSAxKSByZXR1cm47XG4gICAgLy8gaWYocmVtb3ZlSW5kZXggPiA0KSByZXR1cm47XG5cbiAgICBmb3IodmFyIHg9cmVtb3ZlSW5kZXg7IHg8PWVtcGxveWVySW5kZXg7IHgrKyl7XG4gICAgICAgICQoJyNlbXBsb3llcl8nICsgeCkuc2xpZGVVcCh7XG4gICAgICAgICAgICBjb21wbGV0ZTpmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgdXBkYXRlVGFiSW5kZXgoJCgnLmNjLWZvcm0nKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgZW1wbG95ZXJJbmRleCA9IHJlbW92ZUluZGV4IC0gMTtcbn1cblxuZnVuY3Rpb24gY2hlY2tFbXBsb3ltZW50RGF0ZShldil7XG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZSBlbmQgZGF0ZSBhbmQgYWRkIHByZXZpb3VzIGpvYiBpZiBhcHBsaWNhYmxlXG4gICAgICovXG4gICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIHZhciBlbmREYXRlRmllbGQgPSAkKCcuZW5kRGF0ZScraW5kZXgpLmVxKDApO1xuICAgIHZhciBzdGFydERhdGVGaWVsZCA9ICQoJy5zdGFydERhdGUnK2luZGV4KS5lcSgwKTtcbiAgICB2YXIgZW5kRGF0ZSwgc3RhcnREYXRlO1xuXG4gICAgaWYoZW5kRGF0ZUZpZWxkLnZhbCgpLmxlbmd0aCA9PT0gMTApe1xuICAgICAgICB2YXIgZGF0ZVNwbGl0ID0gZW5kRGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIGVuZERhdGUgPSBuZXcgRGF0ZShOdW1iZXIoZGF0ZVNwbGl0WzJdKSwgTnVtYmVyKGRhdGVTcGxpdFswXSktMSwgTnVtYmVyKGRhdGVTcGxpdFsxXSkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBlbmREYXRlID0gbmV3IERhdGUoKTtcbiAgICB9XG5cbiAgICBpZihzdGFydERhdGVGaWVsZC52YWwoKS5sZW5ndGggPT09IDEwKXtcbiAgICAgICAgdmFyIGRhdGVTcGxpdCA9IHN0YXJ0RGF0ZUZpZWxkLnZhbCgpLnNwbGl0KCcvJyk7XG4gICAgICAgIHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKE51bWJlcihkYXRlU3BsaXRbMl0pLCBOdW1iZXIoZGF0ZVNwbGl0WzBdKS0xLCBOdW1iZXIoZGF0ZVNwbGl0WzFdKSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoZW5kRGF0ZSA8PSBzdGFydERhdGUpe1xuICAgICAgICBlbmREYXRlRmllbGQuYWRkRXJyb3IoJ2NjLWRhdGUtZ3QnKS5zaG93RXJyb3IoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoZW5kRGF0ZSAtIHN0YXJ0RGF0ZSA8ICAyICogMzY1ICogMjQgKiA2MCAqIDYwICogMTAwMCApe1xuICAgICAgICAgICAgLy8gaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcmVFbXBsb3ltZW50JywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtcHJlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgICAgIGFkZEVtcGxveWVyKGluZGV4KzEpXG4gICAgICAgIH0vLy8vXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVFbXBsb3llcihpbmRleCsxKVxuICAgICAgICB9XG4gICAgfS8vLy8gZWxzZVxufS8vLy8gZnVuLiBjaGVja0VtcGx5bWVudERhdGUiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
