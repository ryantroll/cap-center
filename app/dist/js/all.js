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

                var isValid = self.validateField();
                // if(e.preventDefault) e.preventDefault(); else e.returnValue = false;


                //// false and true strictly test as null will returned is field is not validated
                if(false === isValid){
                    isFormValid = isFormValid && false;
                    var field = self.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="radio"], input[type="hidden"], select, textarea');
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
        var f = self.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="radio"], input[type="hidden"], select, textarea');
        var v = $.trim(f.val());
        var err = f.data('err');
        var type = f.attr('type');

        if(!err) err = {};

        var isValid = true;
        var isValidated = false;

        if(true === self.hasClass('cc-required')){
            isValidated = true;

            //// handle radio button case
            if(type && type.toLowerCase() === 'radio'){
                var name = f.attr('name');
                var radios = self.find("input[name="+name+"]");
                radios.each(function(r){
                    isValid = !!radios.eq(r).attr('checked');
                    ///// break .each of on radio button found checked
                    if(true === isValid) return false;
                })
                f = radios;
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
        }
        else{
            delete err['cc-date'];
        }

        if(true === self.hasClass('cc-phone')){
            if(v){
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

        container.find('#errorMsg').remove();

        f.off('keyup change', fieldChangedAfterError);

        if(true !== isValid){
            container.addClass('error');
            f.off('keyup change', fieldChangedAfterError).on('keyup change', fieldChangedAfterError)
        }


        if(str.length > 0 ){
            var msg = $('<div class="message" id="errorMsg"><i class="icon-error glyphicon glyphicon-remove-sign"></i> ' + str.join(' | ') + '</div>').show();
            container.append(msg);
            container.addClass('message');
        }

    }//// fun. showError

    $.fn.hideError = function(){
        var f = this.filter('input, select, textarea').eq(0);

        var container = getMyContainer(f);

        // container.addClass('correct');
        container.removeClass('error message');

        container.find('#errorMsg').remove();
    }

    $.fn.addError = function(errorClass) {
        var field = this.filter('input, textarea, select');
        if(field.length < 1) return;
        var container = getMyContainer(field);

        var msg = container.find('.message.'+errorClass).eq(0).text();
        var err = field.data('err');
        if(!err) err = {};

        err[errorClass] = msg;

        field.data('err', err);
    }

    $.fn.removeError = function(errorClass) {
        var field = this.filter('input, textarea, select');
        if(field.length < 1) return;
        var err = field.data('err');
        if(!err) return;
        delete err[errorClass];
        field.data('err', err);
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
    selector.find('.cc-field').each(function(x){
        var s = $(this).find('input[type=text], input[type=email], input[type=date], input[type=tel], input[type=radio], input[type=checkbox], input[type=number], textarea, select')
        .attr('tabindex', x+1);

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
      $(this).parent().addClass('checked');
    }
    else{
      $(this).parent().removeClass('checked');
    }
  });

  radios.trigger('change');//// this to set the initial state
}

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
  $(this).removeError('cc-numbers-only');

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
  $(this).removeError('cc-numbers-only');

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only');
    $(this).showError();
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

    container.find('#bo_time_month' + post)
    .attr('data-address', index)
    .on('change', function(e){
        var v = parseInt($(this).val(), 10);

        var years = parseInt($('#bo_time_year' + post).val(), 10);
        var myId = parseInt($(this).attr('data-address'), 10);
        if(!v) v =0;
        if(!years){
            years = 0;
            $('#bo_time_year' + post).val(0)
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


    container.find('#bo_time_year' + post)
    .attr('data-address', index)
    .on('change', function(e){
        var v = parseInt($('#bo_time_month' + post).val(), 10);
        var years = parseInt($(this).val(), 10);
        var myId = parseInt($(this).attr('data-address'), 10);

        if(!v) {
            v =0;
            $('#bo_time_month' + post).val(0)
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
        document.getElementById('bo_address' + post),
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

    $('#bo_address'+this.post).val(address.street_number + ' ' + address.route).trigger('change');
    $('#bo_city'+this.post).val(address.locality).trigger('change');
    $('#bo_state'+this.post).val(address.administrative_area_level_1).trigger('change');
    // $('#state_label'+this.post).val(address.administrative_area_level_1_long_name).trigger('change');
    $('#bo_zip'+this.post).val(address.postal_code).trigger('change');
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

$(document).ready(coBorrowerReady);
var addressTemplate;
var addressIndex;

function coBorrowerReady(){

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
            excludeFields({selector:'.property-fields, #subName, #closingDate, #monthlyHOA', validationClass:'.cc-to-be-validate, .cc-to-be-validate-sub, .cc-to-be-validate-closing, .cc-to-be-validate-HOA'}); //// function in main.js
        }

    });/// on.change

    /**
     * check if HOA dues
     */
    $('input[name=rf_plannedunit]').on('change', function(){
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


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwibWFpbi5qcyIsIjAxLWJvcnJvd2VyLmpzIiwiMDItY29ib3Jyb3dlci5qcyIsIjAzLXB1cmNoYXNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNWRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdXNTdGF0ZXMgPSBbXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQWxhYmFtYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQUxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBbGFza2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFLXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQW1lcmljYW4gU2Ftb2FcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFTXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQXJpem9uYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVpcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJBcmthbnNhc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQVJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDYWxpZm9ybmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJDQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNvbG9yYWRvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJDT1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkNvbm5lY3RpY3V0XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJDVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkRlbGF3YXJlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJERVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkRpc3RyaWN0IE9mIENvbHVtYmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJEQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkZlZGVyYXRlZCBTdGF0ZXMgT2YgTWljcm9uZXNpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRk1cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJGbG9yaWRhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJGTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkdlb3JnaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkdBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiR3VhbVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiR1VcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJIYXdhaWlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkhJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSWRhaG9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklEXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSWxsaW5vaXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW5kaWFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSU5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJJb3dhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkthbnNhc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiS1NcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJLZW50dWNreVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiS1lcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJMb3Vpc2lhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkxBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFpbmVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1FXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFyc2hhbGwgSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXJ5bGFuZFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTURcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNYXNzYWNodXNldHRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pY2hpZ2FuXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1pbm5lc290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTU5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaXNzaXNzaXBwaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaXNzb3VyaVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTU9cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNb250YW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5lYnJhc2thXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJORVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldmFkYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTlZcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgSGFtcHNoaXJlXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBKZXJzZXlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5KXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IE1leGljb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTk1cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgWW9ya1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTllcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aCBDYXJvbGluYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkNcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOb3J0aCBEYWtvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5EXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGhlcm4gTWFyaWFuYSBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNUFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9oaW9cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT2tsYWhvbWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk9LXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiT3JlZ29uXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPUlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlBhbGF1XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJQV1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlBlbm5zeWx2YW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUEFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQdWVydG8gUmljb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUFJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJSaG9kZSBJc2xhbmRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlJJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiU291dGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlNDXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiU291dGggRGFrb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJTRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRlbm5lc3NlZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVE5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUZXhhc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVFhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJVdGFoXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJVVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZlcm1vbnRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlZUXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmlyZ2luIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlZJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVmlyZ2luaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlZBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2FzaGluZ3RvblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXZXN0IFZpcmdpbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXVlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldpc2NvbnNpblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV0lcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXeW9taW5nXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJXWVwiXG4gICAgICB9XG4gIF07IiwiKGZ1bmN0aW9uKCAkICkge1xuICAgICQuZm4udmFsaWRhdGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICB2YXIgZm9ybSA9IHRoaXMuZmlsdGVyKCdmb3JtJyk7XG4gICAgICAgIHZhciBpbnZhbGlkRmllbGRzID0gW107XG5cbiAgICAgICAgZm9ybS5vZmYoJ3N1Ym1pdCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIHZhciBpc0Zvcm1WYWxpZCA9IHRydWU7XG4gICAgICAgICAgICBpbnZhbGlkRmllbGRzID0gW107XG5cbiAgICAgICAgICAgIGZvcm0uZmluZCgnLmNjLWZpZWxkLmNjLXZhbGlkYXRlJykuZWFjaChmdW5jdGlvbihuKXtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHNlbGYudmFsaWRhdGVGaWVsZCgpO1xuICAgICAgICAgICAgICAgIC8vIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG5cblxuICAgICAgICAgICAgICAgIC8vLy8gZmFsc2UgYW5kIHRydWUgc3RyaWN0bHkgdGVzdCBhcyBudWxsIHdpbGwgcmV0dXJuZWQgaXMgZmllbGQgaXMgbm90IHZhbGlkYXRlZFxuICAgICAgICAgICAgICAgIGlmKGZhbHNlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICAgICAgaXNGb3JtVmFsaWQgPSBpc0Zvcm1WYWxpZCAmJiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPVwidGV4dFwiXSwgaW5wdXRbdHlwZT1cIm51bWJlclwiXSwgaW5wdXRbdHlwZT1cInRlbFwiXSwgaW5wdXRbdHlwZT1cImVtYWlsXCJdLCBpbnB1dFt0eXBlPVwiZGF0ZVwiXSwgaW5wdXRbdHlwZT1cInJhZGlvXCJdLCBpbnB1dFt0eXBlPVwiaGlkZGVuXCJdLCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHNlbGYuZmluZCgnbGFiZWwnKS5lcSgwKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZkVyciA9IHtmaWxlZDpsYWJlbC50ZXh0KCksIGlkOmZpZWxkLmF0dHIoJ2lkJyksIGVycm9yOmVycn07XG4gICAgICAgICAgICAgICAgICAgIGludmFsaWRGaWVsZHMucHVzaChmRXJyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pOyAvLy8gLmVhY2hcblxuXG4gICAgICAgICAgICB2YXIgZXh0cmEgPSBjYWxsYmFjayhpc0Zvcm1WYWxpZCwgaW52YWxpZEZpZWxkcy5sZW5ndGggPiAwID8gaW52YWxpZEZpZWxkcyA6IG51bGwpO1xuXG4gICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmICEhZXh0cmE7XG5cblxuICAgICAgICAgICAgaWYodHJ1ZSAhPT0gaXNGb3JtVmFsaWQpe1xuICAgICAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTsvLy8vIC5vbiBzdWJtaXRcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIHZhciBnZXRNeUNvbnRhaW5lciA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgICAgICAgdmFyIHAgPSBmaWVsZC5wYXJlbnQoKTtcbiAgICAgICAgaWYodHJ1ZSA9PT0gcC5oYXNDbGFzcygnY2MtZmllbGQnKSl7XG4gICAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGdldE15Q29udGFpbmVyKHApO1xuICAgICAgICB9XG4gICAgfS8vLy8gZnVuLiBnZXRNeUNvbnRhaW5lclxuXG5cbiAgICB2YXIgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoJCh0aGlzKSk7XG4gICAgICAgIGNvbnRhaW5lci52YWxpZGF0ZUZpZWxkKClcbiAgICB9XG5cbiAgICAkLmZuLnZhbGlkYXRlRmllbGQgPSBmdW5jdGlvbihzZWxmKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZiA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJyYWRpb1wiXSwgaW5wdXRbdHlwZT1cImhpZGRlblwiXSwgc2VsZWN0LCB0ZXh0YXJlYScpO1xuICAgICAgICB2YXIgdiA9ICQudHJpbShmLnZhbCgpKTtcbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgaWYoIWVycikgZXJyID0ge307XG5cbiAgICAgICAgdmFyIGlzVmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgaXNWYWxpZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1yZXF1aXJlZCcpKXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8vLyBoYW5kbGUgcmFkaW8gYnV0dG9uIGNhc2VcbiAgICAgICAgICAgIGlmKHR5cGUgJiYgdHlwZS50b0xvd2VyQ2FzZSgpID09PSAncmFkaW8nKXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGYuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICAgIHZhciByYWRpb3MgPSBzZWxmLmZpbmQoXCJpbnB1dFtuYW1lPVwiK25hbWUrXCJdXCIpO1xuICAgICAgICAgICAgICAgIHJhZGlvcy5lYWNoKGZ1bmN0aW9uKHIpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gISFyYWRpb3MuZXEocikuYXR0cignY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLy8vLyBicmVhayAuZWFjaCBvZiBvbiByYWRpbyBidXR0b24gZm91bmQgY2hlY2tlZFxuICAgICAgICAgICAgICAgICAgICBpZih0cnVlID09PSBpc1ZhbGlkKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmID0gcmFkaW9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpZih2Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS8vLy8gaWYgdHlwZSByYWRpbyBlbHNlXG5cbiAgICAgICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXJlcXVpcmVkJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtcmVxdWlyZWQnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLy8gaWYgdi5sZW5ndGhcbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1yZXF1aXJlZCddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IC8vLy8gaWYgY2MtcmVxdWlyZWRcblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1udW1iZXInKSAmJiB2KXtcbiAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciByZWd4ID0gL14oXFxkKSsoXFwuXFxkKyk/JC87XG4gICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtbnVtYmVyJyk7XG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLW51bWJlciddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLW51bWJlciddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWVtYWlsJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWVtYWlsJyk7XG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWVtYWlsJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZW1haWwnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZW1haWwnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRhdGUnKSl7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC87XG4gICAgICAgICAgICB2YXIgc3BsaXQgPSB2LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICB2YXIgbSA9IHNwbGl0WzBdID8gTnVtYmVyKHNwbGl0WzBdKSA6IG51bGw7XG4gICAgICAgICAgICB2YXIgZCA9IHNwbGl0WzFdID8gTnVtYmVyKHNwbGl0WzFdKSA6IG51bGw7XG4gICAgICAgICAgICB2YXIgeSA9IHNwbGl0WzJdID8gTnVtYmVyKHNwbGl0WzJdKSA6IG51bGw7XG4gICAgICAgICAgICB2YXIgbTMxID0gWzEsIDMsIDUsIDcsIDgsIDEwLCAxMl07XG4gICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighbSB8fCBtID4gMTIgfHwgbSA8IDEpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG0zMS5pbmRleE9mKG0pID49MCApe1xuICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMSB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiAzMCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtID09IDIpe1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IHkgJSA0ID09IDAgPyAyOSA6IDI4O1xuICAgICAgICAgICAgICAgIGlmKCFkIHx8IGQgPiBfZCB8fCBkIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1kYXRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGVyclsnY2MtZGF0ZSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtZGF0ZSddO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcGhvbmUnKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcKFxcZHszfVxcKSggKT9cXGR7M31cXC1cXGR7NH0kLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1waG9uZScpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXBob25lJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXBob25lJ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXBob25lJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1jdXJyZW5jeScpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFwkPyhcXGR7MSwzfSkrKFxcLCpcXGR7M30pKiQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLWN1cnJlbmN5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2MtY3VycmVuY3knXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtY3VycmVuY3knXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXNzbicpKXtcbiAgICAgICAgICAgIGlmKHYpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVneCA9IC9eXFxkezN9KFxcLSk/XFxkezJ9KFxcLSk/XFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2Mtc3NuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVyclsnY2Mtc3NuJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLXNzbiddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vLy8gcmVzZXQgdGhlIGZpZWxkIGVycm9ycyBiZWZvcmUgYWRkaW5nIHRoZW0gYWdhaW5cbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnZXJyb3IgY29ycmVjdCBtZXNzYWdlJykuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5kYXRhKCdlcnInLCBlcnIpO1xuICAgICAgICBmLmRhdGEoJ2lzVmFsaWQnLCBpc1ZhbGlkKTtcblxuICAgICAgICAvLy8vIGlmIGZpZWxkIHBhc3NlZCB0aHJvdWdoIHZhbGlkYXRpb24gc2hvdyBlcnJvciBpZiBhbnlcbiAgICAgICAgLy8gaWYodHJ1ZSA9PT0gaXNWYWxpZGF0ZWQgKXtcbiAgICAgICAgLy8gaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcblxuICAgICAgICAgICAgaWYoZmFsc2UgPT0gaXNWYWxpZCB8fCBPYmplY3Qua2V5cyhlcnIpLmxlbmd0aCA+IDApe1xuXG4gICAgICAgICAgICAgICAgZi5zaG93RXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYodHJ1ZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgZi5oaWRlRXJyb3IoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIC8vIH0vLy8vIGlmIGlzVmFsaWRhdGVkXG5cbiAgICB9Ly8vLyBmdW4uIHZhbGlkYXRlRmlsZFxuXG4gICAgJC5mbi5zaG93RXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZ2V0TXlDb250YWluZXIoZik7XG4gICAgICAgIHZhciB0eXBlID0gZi5hdHRyKCd0eXBlJyk7XG5cbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG4gICAgICAgIHZhciBpc1ZhbGlkID0gZi5kYXRhKCdpc1ZhbGlkJyk7XG5cbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IodmFyIGUgaW4gZXJyKXtcbiAgICAgICAgICAgIHN0ci5wdXNoKGVycltlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpO1xuXG4gICAgICAgIGlmKHRydWUgIT09IGlzVmFsaWQpe1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpLm9uKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZihzdHIubGVuZ3RoID4gMCApe1xuICAgICAgICAgICAgdmFyIG1zZyA9ICQoJzxkaXYgY2xhc3M9XCJtZXNzYWdlXCIgaWQ9XCJlcnJvck1zZ1wiPjxpIGNsYXNzPVwiaWNvbi1lcnJvciBnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZS1zaWduXCI+PC9pPiAnICsgc3RyLmpvaW4oJyB8ICcpICsgJzwvZGl2PicpLnNob3coKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQobXNnKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnbWVzc2FnZScpO1xuICAgICAgICB9XG5cbiAgICB9Ly8vLyBmdW4uIHNob3dFcnJvclxuXG4gICAgJC5mbi5oaWRlRXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYScpLmVxKDApO1xuXG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmKTtcblxuICAgICAgICAvLyBjb250YWluZXIuYWRkQ2xhc3MoJ2NvcnJlY3QnKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdlcnJvciBtZXNzYWdlJyk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgICQuZm4uYWRkRXJyb3IgPSBmdW5jdGlvbihlcnJvckNsYXNzKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgICAgIHZhciBjb250YWluZXIgPSBnZXRNeUNvbnRhaW5lcihmaWVsZCk7XG5cbiAgICAgICAgdmFyIG1zZyA9IGNvbnRhaW5lci5maW5kKCcubWVzc2FnZS4nK2Vycm9yQ2xhc3MpLmVxKDApLnRleHQoKTtcbiAgICAgICAgdmFyIGVyciA9IGZpZWxkLmRhdGEoJ2VycicpO1xuICAgICAgICBpZighZXJyKSBlcnIgPSB7fTtcblxuICAgICAgICBlcnJbZXJyb3JDbGFzc10gPSBtc2c7XG5cbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICB9XG5cbiAgICAkLmZuLnJlbW92ZUVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgIGlmKCFlcnIpIHJldHVybjtcbiAgICAgICAgZGVsZXRlIGVycltlcnJvckNsYXNzXTtcbiAgICAgICAgZmllbGQuZGF0YSgnZXJyJywgZXJyKTtcbiAgICB9XG5cblxufSggalF1ZXJ5ICkpOyIsInZhciBfYXBwVmFycyA9IHt9O1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShjY0RvY3VtZW50UmVhZHkpO1xuXG5mdW5jdGlvbiBjY0RvY3VtZW50UmVhZHkoKXtcblxuICAgIC8qKlxuICAgICAqIFByb2dyZXNzIG5hdmlnYXRpb24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI3Byb2dyZXNzX3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3NOYXYgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVQb3JncmVzTmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCgnMTAwJScpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKDQwKTsgLy8gY2hhbmdpbmcgdGhlIHdpZHRoIHRvIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiBvZiBwcm9ncmVzcyBiYXIgY2xpY2thYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gYm9keSBzbyBkbyB0aGUgd29yayBvbiBib2R5IGNsaWNrIFxcIG9ubHkgaWYgbWVudSBpcyBjbG9zZWRcbiAgICAgICAgICogdGhpcyB0byBtYWtlIHN1cmUgdGhlIG1lbnUgaXMgY2xvc2VkIHdoZW4gY2xpY2sgb3V0c2lkZSB0aGUgbWVudVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGZhbHNlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBIYW1idXJnZXIgbWVudSBidXR0b24gbW9iaWxlIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnI21lbnVfc3dpdGNoJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBtZW51TmF2ID0gJCgnI21lbnVfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVNZW51TmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IG1lbnVOYXYuaGFzQ2xhc3MoJ2V4cGFuZGVkJykpIHtcbiAgICAgICAgICAgICAgICBtZW51TmF2LnJlbW92ZUNsYXNzKCdleHBhbmRlZCcpO1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgLy8vLyB1bmJpbmQgd2hlbiBtZW51IGNsb3NlZCBubyBuZWVkIHRvIGNoZWNrIGZvciBjbGlja1xuICAgICAgICAgICAgICAgICQoJ2JvZHknKS51bmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1lbnVOYXYuYWRkQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChmYWxzZSA9PT0gbWVudU5hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuICAgICAgICAgICAgJCgnYm9keScpLmJpbmQoJ2NsaWNrJywgaGFuZGxlTWVudU5hdkNsaWNrKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNjcm9sbGluZyBldmVudCBsaXN0ZW5lciB0byBtYWtlIHRoZSBwcm9ncmVzcyBiYXIgc3RpY2t5XG4gICAgICovXG4gICAgLy8gaWYoJCgnYm9keScpLndpZHRoKCkgPCA2Nzgpe1xuICAgICAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnKS5vbignc2Nyb2xsJywgbWFpblNjcm9sbCk7XG4gICAgLy8gfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIHN0YXRlcyBkcm9wLWRvd25zXG4gICAgICovXG4gICAgIGZpbGxTdGF0ZURyb3Bkb3duKCAkKCcuc3RhdGUtZHJvcGRvd24nKSApO1xuXG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBGbG9hdCBsYWJlbCBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5jYy1maWVsZC5mbG9hdCcpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGZpZWxkID0gc2VsZi5maW5kKCdpbnB1dFt0eXBlPXRleHRdJykuZXEoMCk7XG5cbiAgICAgICAgdmFyIHRyaWdnZXJFdmVudCA9ICdrZXl1cCc7XG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLWRyb3Bkb3duJykpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50ID0gJ2NoYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICBmaWVsZC5vbih0cmlnZ2VyRXZlbnQsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZmllbGQudmFsKCkpe1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdlZGl0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KTsvLy8gLmVhY2hcblxuICAgIC8qKlxuICAgICAqIE1lc3NhZ2UgYmVoYXZpb3JcbiAgICAgKi9cbiAgICAkKCcuanNDb2xsYXBzZScpLmVhY2goZnVuY3Rpb24oeCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5maW5kKCdhLmNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7IGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5zbGlkZVVwKCdmYXN0JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfSk7Ly8vLyAuZWFjaFxuXG4gICAgLyoqXG4gICAgICogU2V0IHllcy9ubyByYWRpbyBidXR0b25cbiAgICAgKi9cbiAgICB5ZXNOb1JhZGlvKCk7XG59Ly8vLyBmdW4uIGNjRG9jdW1lbnRSZWFkeVxuXG5mdW5jdGlvbiBtYWluU2Nyb2xsKGUpe1xuICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgaWYoJCgnYm9keScpLndpZHRoKCkgPiA2NzgpIHJldHVybjtcblxuICAgIHZhciBzID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIHZhciBiYXIgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgaWYocyA+IDIwMCl7XG4gICAgICAgIGlmKGZhbHNlID09PSBiYXIuaGFzQ2xhc3MoJ2Zsb2F0Jykpe1xuICAgICAgICAgICAgYmFyLmFkZENsYXNzKCdmbG9hdCcpO1xuICAgICAgICAgICAgYmFyLnBhcmVudCgpLmNzcygncGFkZGluZy1ib3R0b20nLCBiYXIuaGVpZ2h0KCkpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgYmFyLnJlbW92ZUNsYXNzKCdmbG9hdCcpO1xuICAgICAgICBiYXIucGFyZW50KCkuY3NzKCdwYWRkaW5nLWJvdHRvbScsIG51bGwpXG4gICAgfVxuXG59Ly8vLyBmdW4uIG1haW5TY3JvbGxcblxuXG5mdW5jdGlvbiB1cGRhdGVUYWJJbmRleChzZWxlY3Rvcil7XG4gICAgc2VsZWN0b3IuZmluZCgnLmNjLWZpZWxkJykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHMgPSAkKHRoaXMpLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9ZW1haWxdLCBpbnB1dFt0eXBlPWRhdGVdLCBpbnB1dFt0eXBlPXRlbF0sIGlucHV0W3R5cGU9cmFkaW9dLCBpbnB1dFt0eXBlPWNoZWNrYm94XSwgaW5wdXRbdHlwZT1udW1iZXJdLCB0ZXh0YXJlYSwgc2VsZWN0JylcbiAgICAgICAgLmF0dHIoJ3RhYmluZGV4JywgeCsxKTtcblxuICAgIH0pXG59Ly8vLyBmdW4uIHVwZGF0ZVRhYkluZGV4XG5cbi8qKlxuICogW3llc05vUmFkaW8gV2lsbCBzZXQgdGhlIGJlaGF2aW9yIG9mIHllcy9ubyByYWRpbyBidXR0b25zIGJ5IGFkZGluZyAuY2hlY2tlZCBjbGFzcyB0byB0aGUgbGFiZWwgb2YgdGhlIGJ1dHRvbl1cbiAqIHRoZSBmdW5jdGlvbiBhc3N1bWUgdGhlIGlucHV0W3R5cGU9cmFkaW9uXSBpcyBpbmNsdWRlZCBpbnNpZGUgPGxhYmVsPiB0YWdcbiAqL1xuZnVuY3Rpb24geWVzTm9SYWRpbygpe1xuICB2YXIgcmFkaW9zID0gJCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICB9KTtcblxuICByYWRpb3MudHJpZ2dlcignY2hhbmdlJyk7Ly8vLyB0aGlzIHRvIHNldCB0aGUgaW5pdGlhbCBzdGF0ZVxufVxuXG4vKipcbiAqIFtmaWxsU3RhdGVEcm9wZG93biB3aWxsIGZpbGwgdGhlIGRyb3Bkb24gb2YgVVNBIHN0YXRlcyBmb3JtIHVzU3RhdGUgdmFyaWFibGVdXG4gKiBAcGFyYW0gIHtbdHlwZV19IHNlbGVjdG9yIFtqUXVlcnkgb2JqZWN0IHRoYXQgY29udGFpbiA8c2VsZWN0PiB0YWcgdG8gYmUgZmlsbGVkXVxuICogdXNTYXRlIGlzIGFycmF5IG9mIG9iamVjdCBkZWZpbmVkIGluIHVzLXN0YXR1cy5qcyBmaWxlXG4gKi9cbmZ1bmN0aW9uIGZpbGxTdGF0ZURyb3Bkb3duKHNlbGVjdG9yKXtcbiAgICBzZWxlY3Rvci5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgdWwgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpO1xuICAgICAgICBmb3IodmFyIHM9MDsgczx1c1N0YXRlcy5sZW5ndGg7IHMrKyl7XG4gICAgICAgICAgICB2YXIgbGkgPSAkKCc8b3B0aW9uIHZhbHVlPVwiJyArIHVzU3RhdGVzW3NdLmFiYnJldmlhdGlvbiArICdcIj4nICsgdXNTdGF0ZXNbc10ubmFtZSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICAgIHVsLmFwcGVuZChsaSk7XG4gICAgICAgIH0vLy8vIGZvclxuICAgIH0pO1xufS8vLy8gZnVuLiBmaWxsU3RhdGVEcm9wZG93blxuXG4vKipcbiAqIFtpc0FuZHJvaWQgc2ltcGxlIGZ1bmN0aW9uIHRvIGRldGVjdCBBbmRyb2lkIE9TXVxuICogdGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGRldGVjdCB0aGUgYnVnIGluIEFuZHJvaWQgd2hlbiBrZXlkb3duLCBrZXl1cCBldmVudCBkb2Vzbid0IHNlbmQgdGhlIHJpZ2h0IGtleSBjb2RlXG4gKiBAcmV0dXJuIHtCb29sZWFufSBbdHJ1ZSBpZiBBbmRyb2lkIE9TXVxuICovXG52YXIgaXNBbmRyb2lkID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIC8oYW5kcm9pZCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xufS8vLy8gZnVuLiBpc0FuZHJvaWRcblxuXG52YXIgcmVzdHJpY3RQaG9uZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG5cbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLSgpIFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgNDgsIDU3LCA5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKVxuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG52YXIgZm9ybWF0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmF3VmFsdWUgPSB2YWwuc3BsaXQoL1tcXCh8XFwpfCB8XFwtfFxcK3xcXC5dLykuam9pbignJyk7XG4gIHZhciBmb3JtYXRlZCA9ICcnO1xuICBpZihyYXdWYWx1ZS5sZW5ndGggPj0gMyl7XG4gICAgZm9ybWF0ZWQgKz0gJygnICsgcmF3VmFsdWUuc2xpY2UoMCwzKSArICcpICc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBpZihyYXdWYWx1ZS5sZW5ndGggPj0gMyl7XG4gICAgZm9ybWF0ZWQgKz0gcmF3VmFsdWUuc2xpY2UoMCwzKSArICctJztcbiAgICByYXdWYWx1ZSA9IHJhd1ZhbHVlLnNsaWNlKDMpO1xuICB9XG4gIGZvcm1hdGVkICs9IHJhd1ZhbHVlO1xuXG4gICQodGhpcykudmFsKGZvcm1hdGVkKTtcbn0vLy8vIGZ1bi4gZm9ybWF0UGhvbmVcblxudmFyIHJlc3RyaWN0RGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG5cbiAgdmFyIGFsbG93ZWRDaGFycyA9IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcvJ11cbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKVxuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlRGF0ZVxuXG52YXIgZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwvL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuXG4gICAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIHJlc3RyaWN0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLVwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC0vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMyl7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAzKSArICctJztcbiAgICByYXcgPSByYXcuc2xpY2UoMyk7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICctJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufVxuXG52YXIgcmVzdHJpY3ROdW1iZXJzID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIHJlc3RyaWN0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAkLFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciBmb3JtYXRDdXJyZW5jeSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuXG4gIHZhciBhbGxvd2VkID0gWzE5MSwgOSwgMzcsIDM4LCAzOSwgNDAsIDEzXTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID4gLTEpIHJldHVybjtcblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgdmFyIHJldCA9ICcnO1xuICB2YXIgcmF3ID0gdmFsLnNwbGl0KC9bXFwkfCB8XFwsXS8pLmpvaW4oJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPiAzKXtcbiAgICAgIHZhciBhcnIgPSByYXcuc3BsaXQoJycpO1xuICAgICAgdmFyIHNlcCA9IDE7XG4gICAgICBmb3IodmFyIHg9YXJyLmxlbmd0aC0xOyB4Pj0wOyB4LS0pe1xuICAgICAgICAvLy8vIGFkZCByZWFkaW5nIGNvbW1hIGFmdGVyIDMgZGlnaXRzIGFuZCBvbmx5IGlmIHRoZXJlIGlzIG5leHQgZGlnaXRcbiAgICAgICAgcmV0ID0gKHNlcCAlIDMgPT0gMCAmJiB0cnVlID09PSAhIWFyclt4LTFdPyAnLCcgOiAnJykgKyBhcnJbeF0gICsgcmV0O1xuICAgICAgICBzZXArKztcbiAgICAgIH1cbiAgICAgIHJldCA9ICckJyArIHJldDtcbiAgfVxuICBlbHNlIGlmKHJhdy5sZW5ndGggPiAwKXtcbiAgICByZXQgPSAnJCcgKyByYXc7XG4gIH1cbiAgZWxzZXtcbiAgICByZXQgPSByYXc7XG4gIH1cblxuICAkKHRoaXMpLnZhbChyZXQpO1xufS8vLy8vIGZ1bi4gZm9ybWF0Q3VycmVuY3lcblxudmFyIGFuaW1hdGVTY3JvbGwgPSBmdW5jdGlvbih5LCB0aW1lKXtcblxuICAgIGNsZWFySW50ZXJ2YWwoX2FwcFZhcnMuc2Nyb2xsSW50ZSk7Ly8vLyBzdG9wIGFueXNjcm9sbGluZ1xuXG4gICAgaWYodW5kZWZpbmVkID09PSB0aW1lKSB0aW1lID0gMTsvLy8vIHNldCBkZWZhdWx0IHZhbHVlIGZvciB0aW1lXG4gICAgdmFyIGZwcyA9IDYwOyAvLy8vIGZyYW1lcyBwZXIgc2Vjb25zXG4gICAgdmFyIGZyYW1lVGltZSA9IE1hdGguY2VpbCgxMDAwIC8gZnBzKTtcbiAgICB2YXIgZCA9IHRpbWUgKiBmcmFtZVRpbWU7IC8vLyBudW1iZXIgb2YgZnJhbWVzIGR1cmF0aW9uXG4gICAgdmFyIHQgPSAwOyAvLy8vIHRpbWUgdGlja2VyIC8gZnJhbWUgY291bnRlclxuXG4gICAgLy8vLyBzZXQgYmVnaW4gcG9pbnQgd2hpaGMgdGhlIGN1cnJyZW50IHBvaW50XG4gICAgLy8gYiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIDogd2luZG93LnNjcm9sbFk7XG4gICAgdmFyIGIgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAwO1xuICAgIC8vXG4gICAgaWYoYiA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgYiA9IDA7XG4gICAgfVxuXG5cbiAgICAvLy8vIGNoZWNrIGlmIHNjcm9sbGluZyBkZXN0aW5hdGlvbiBpcyBiaWdnZXIgdGhhbiBwYWdlIGhlaWdodCBsaW1pdHNcbiAgICB2YXIgbGltaXQgPSBNYXRoLm1heCggZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgKTtcbiAgICBpZih5PmxpbWl0KXtcbiAgICAgICAgeSA9IGxpbWl0O1xuICAgIH1cblxuICAgIC8vLy8gc2V0IHRoZSBjaGFuZ2UgYmV0d2VlbiBjdXJyZW50IGFuZCBkZXN0aW5hdGlvbiBwb2ludFxuICAgIGMgPSBiIC0geTtcblxuICAgIC8vLy8gZG8gbm90aGluZyBpZiBkZXN0aW5hdGlvbiBpcyBzYW1lIGFzIGN1cnJlbnRcbiAgICBpZihNYXRoLmFicyhjKSA8IDEpIHJldHVybjtcblxuICAgIC8vLy8gc3RhcnQgdGltZSB0aWNrZXJcbiAgICBfYXBwVmFycy5zY3JvbGxJbnRlID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8vIGVhc2Ugb3V0IG1hdGhcbiAgICAgICAgdmFyIHBlciA9IDEgLSB0L2Q7XG4gICAgICAgIHZhciBuZXdZID0gIC1jICogKDEtcGVyKnBlcipwZXIqcGVyKSArIGI7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI+PlwiLCAxLSgxLXBlcikqKDEtcGVyKSk7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXdZKTtcblxuXG4gICAgICAgIGlmKHQgPT0gZCl7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF9hcHBWYXJzLnNjcm9sbEludGUpO1xuICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ2FuaW1hdGVTY3JvbGxFbmQnKTtcbiAgICAgICAgfVxuICAgICAgICB0Kys7XG5cbiAgICB9LCBmcmFtZVRpbWUpO1xufS8vLy8gZnVuLiBhbmltYXRlU2Nyb2xsXG5cbi8qKlxuICogW3Jlc2V0RmllbGRzIHdpbGwgc2VhcmNoIGZvciBpbnB1dCBmaWVsZCBpbnNpZGUgYSBjb250YWluZXIgYW5kIHJlc3QgaXRzIHZhbHVlIGFuZCBhbnkgZXJyb3Igc3RhdHVzXVxuICogQHBhcmFtICB7W3R5cGVdfSBjb250YWluZXIgW2pRdWV5ciBvYmplY3QgdGhhdCBzaG91bGQgY29udGFpbiBpbnB1dCBmaWxlZCB0aGF0IG5lZWQgYmUgcmVzZXRdXG4gKi9cbnZhciByZXNldEZpZWxkcyA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gIHZhciBmaWVsZHMgPSBjb250YWluZXIuZmluZCgnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblxuICBmaWVsZHMuZWFjaChmdW5jdGlvbih4KXtcbiAgICB2YXIgdHlwZSA9ICQodGhpcykuYXR0cigndHlwZScpO1xuICAgIGlmKHR5cGUgPT09ICdyYWRpbycpe1xuICAgICAgJCh0aGlzKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbHRlcignbGFiZWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgJCh0aGlzKS52YWwoJycpO1xuICAgIH1cbiAgICAkKHRoaXMpLmhpZGVFcnJvcigpO1xuICB9KTtcblxufS8vLy8gZnVuLiByZXNldEZpZWxkc1xuXG4vKipcbiAqIFtpbmNsdWRlRmllbGRzIHdpbGwgYWRkIGhpZGRlbiBmaWVsZHMgaW4gZm9ybSBhbmQgc2V0IHRoZSByaWdodCB2YWxpZGF0aW9uXVxuICogQHBhcmFtICB7T2JqZWN0fSBvcHRpb25zIHNob3VsZCBoYXZlIDIgcHJvcGVydGllcyBhcyBiZWxvd1xuICogb3B0aW9ucy5zZWxlY3RvciBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gc2VsZWN0IHRoZSBzZWN0aW9uIG5lZWQgdG8gYmUgaW5jbHVkZWQgZS5nLiBcIi5uZXctZmllbGRzXCIsIFwiI2Nsb2RpbmdEYXRlXCJcbiAqIG9wdGlvbnMudmFsaWRhdGlvbkNsYXNzIGEgc3RyaW5nIHRoYXQgcGFzc2VkIHRvIGpRdWVyeSB0byBpZGVudGlmeSB0aGUgLmNjLWZpZWxkIHRoYXQgbmVlZCB0byBiZSBpbmNsdWRlIGluIHZhbGlkYXRpb25cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbnZhciBpbmNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIGZpZWxkcy5zbGlkZURvd24oKTtcbn1cblxuLyoqXG4gKiBbZXhjbHVkZUZpZWxkcyB3aWxsIGV4Y2x1ZGUgZmllbGRzIGZyb20gZm9ybSBhbmQgc2V0IHJlbW92ZSB0aGUgdmFsaWRhdGlvbl1cbiAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyBzaG91bGQgaGF2ZSAyIHByb3BlcnRpZXMgYXMgYmVsb3dcbiAqIG9wdGlvbnMuc2VsZWN0b3IgYSBzdHJpbmcgdGhhdCBwYXNzZWQgdG8galF1ZXJ5IHRvIHNlbGVjdCB0aGUgc2VjdGlvbiBuZWVkIHRvIGJlIGV4Y2x1ZGVkXG4gKiBvcHRpb25zLnZhbGlkYXRpb25DbGFzcyBhIHN0cmluZyB0aGF0IHBhc3NlZCB0byBqUXVlcnkgdG8gaWRlbnRpZnkgdGhlIC5jYy1maWVsZCB0aGF0IG5lZWQgdG8gYmUgZXhjbHVkZWQgZnJvbSB2YWxpZGF0aW9uXG4gKi9cbnZhciBleGNsdWRlRmllbGRzID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gIGlmKCFvcHRpb25zLnNlbGVjdG9yIHx8ICFvcHRpb25zLnZhbGlkYXRpb25DbGFzcykgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBmaWVsZHMgPSAkKG9wdGlvbnMuc2VsZWN0b3IpO1xuICBmaWVsZHMuZmluZChvcHRpb25zLnZhbGlkYXRpb25DbGFzcykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gIHJlc2V0RmllbGRzKGZpZWxkcyk7XG4gIGZpZWxkcy5zbGlkZVVwKCk7XG59XG4iLCIkKGRvY3VtZW50KS5yZWFkeShib3Jyb3dlclJlYWR5KTtcbnZhciBhZGRyZXNzVGVtcGxhdGU7XG52YXIgYWRkcmVzc0luZGV4O1xuXG5cbmZ1bmN0aW9uIGJvcnJvd2VyUmVhZHkoKXtcblxuICAgIHZhciBteUZvcm0gPSAkKCcjYm9ycm93ZXJGb3JtJyk7XG4gICAgLyoqXG4gICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsZCwgaW52YWxpZEZpZWxkcyl7XG5cbiAgICAgICAgaWYoaXNWYWxkKXtcblxuICAgICAgICAgICAgdmFyIGlzQ29Cb3Jyb3dlciA9ICBTdHJpbmcoJzIzNCcpLnNwbGl0KCcnKS5pbmRleE9mKCAkKCcjYm9fYXBwbHl0eXBlJykudmFsKCkgKSA+IC0xO1xuXG4gICAgICAgICAgICBpZih0cnVlID09PSBpc0NvQm9ycm93ZXIpe1xuICAgICAgICAgICAgICAgIG15Rm9ybS5hdHRyKCdhY3Rpb24nLCAnMDItY29ib3Jyb3dlci5odG1sJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vLy8gaWYgdGhlIGZvcm0gaXMgbm90IHZhbGlkIGFuZCBjb250aW51ZSBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgLy8vLyBzY3JvbGwgdG8gdGhlIHBhZ2UgdG8gZmlyc3QgZmllbGQgd2l0aCBlcnJvclxuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsVG8gPSAkKCcjJyArIGludmFsaWRGaWVsZHNbMF0uaWQpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAvLy8vIHNjcm9sbCB0aGUgZm9ybSB0byB0aGUgZmlyc3QgZXJyb3JcbiAgICAgICAgICAgICAgICBhbmltYXRlU2Nyb2xsKHNjcm9sbFRvLTIwLCAxKTsgIC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGlzVmFsaWQgZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBldmVudCBoYW5kbGVycyBhcmUgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpXG5cblxuXG4gICAgJCgnI2JvX2hvd2hlYXInKS5vZmYoJ2NoYW5nZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHZhbCA9IHBhcnNlSW50KCQodGhpcykudmFsKCksMTApO1xuICAgICAgICB2YXIgYXJyID0gWzIsMyw0LDVdO1xuICAgICAgICBpZihhcnIuaW5kZXhPZih2YWwpID4gLTEpe1xuICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZURvd24oKS5maW5kKCcuY2MtZmllbGQnKS5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI3JlZmVycmFsRmllbGQnKS5zbGlkZVVwKCkuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlJylcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBmb3IgYWRkcmVzcyBsZW5ndGggY2hhbmdlXG4gICAgICovXG4gICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgYWRkcmVzc0luZGV4KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBudW1iZXIgb2YgZGVwZW5kZW50cyBjaGFuZ2UgYW5kIHNob3cgYWdlcyBmaWVsZHNcbiAgICAgKi9cbiAgICAkKCcjYm9fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBjaGFuZ2Ugb2YgcmFkaW8gYnV0dG9uIGN1cnJlbnQgYWRkcmVzcyBvd24vcmVudFxuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9Ym9fY3VycmVudGx5XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdmFyIHJlbnRDb2wgPSAkKCcjbW9udGhseVJlbnQnKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IHJlbnRDb2wuZmluZCgnLmNjLWZpZWxkJykuZXEoMCk7XG4gICAgICAgIGlmKHZhbC50b0xvd2VyQ2FzZSgpID09PSAncmVudCcpe1xuICAgICAgICAgICAgcmVudENvbC5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbnRDb2wuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgY29udGFpbmVyXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIG1lc3NhZ2UgZXJyb3InKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBhZGRyZXNzIHR5cGUgYWhlYWQgZnVuY3Rpb25hbGl0eSB0byBhZGRyZXNzXG4gICAgICovXG4gICAgYWRkQXV0b0FkZHJlc3MoMSk7XG5cbn07Ly8vLyBib3Jyb3dlclJlYWR5XG5cblxuXG5mdW5jdGlvbiBjaGVja0FkZHJlc3NMZW5ndGgoY29udGFpbmVyLCBpbmRleCl7XG4gICAgdmFyIHBvc3QgPSBpbmRleCA+IDEgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgY29udGFpbmVyLmZpbmQoJyNib190aW1lX21vbnRoJyArIHBvc3QpXG4gICAgLmF0dHIoJ2RhdGEtYWRkcmVzcycsIGluZGV4KVxuICAgIC5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuXG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQoJyNib190aW1lX3llYXInICsgcG9zdCkudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG4gICAgICAgIGlmKCF2KSB2ID0wO1xuICAgICAgICBpZigheWVhcnMpe1xuICAgICAgICAgICAgeWVhcnMgPSAwO1xuICAgICAgICAgICAgJCgnI2JvX3RpbWVfeWVhcicgKyBwb3N0KS52YWwoMClcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHllYXJzKXtcbiAgICAgICAgICAgIHYgKz0geWVhcnMgKiAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZih2IDwgMjQpe1xuICAgICAgICAgICAgYWRkQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgY29udGFpbmVyLmZpbmQoJyNib190aW1lX3llYXInICsgcG9zdClcbiAgICAuYXR0cignZGF0YS1hZGRyZXNzJywgaW5kZXgpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKCcjYm9fdGltZV9tb250aCcgKyBwb3N0KS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgeWVhcnMgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciBteUlkID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdkYXRhLWFkZHJlc3MnKSwgMTApO1xuXG4gICAgICAgIGlmKCF2KSB7XG4gICAgICAgICAgICB2ID0wO1xuICAgICAgICAgICAgJCgnI2JvX3RpbWVfbW9udGgnICsgcG9zdCkudmFsKDApXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXllYXJzKSB5ZWFycyA9IDA7XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodiA8IDI0KXtcbiAgICAgICAgICAgIGFkZEFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmVtb3ZlQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgfSlcbn0vLy8vLyBmdW4uIGNoZWNrQWRkcmVzc0xlbmd0aFxuXG5mdW5jdGlvbiBhZGRBZGRyZXNzKG5leHRJZCl7XG4gICAgaWYobmV4dElkID49IDUpIHJldHVybiBmYWxzZTtcbiAgICBpZihhZGRyZXNzSW5kZXggPj0gbmV4dElkKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgc2VjdGlvbiA9ICQoJyNwcmVBZGRyZXNzJyk7XG4gICAgYWRkcmVzc0luZGV4ID0gbmV4dElkO1xuICAgIHZhciBhZGRyZXNzID0gJChhZGRyZXNzVGVtcGxhdGUucmVwbGFjZSgvKFxce1xcI1xcfSkvZywgYWRkcmVzc0luZGV4KSk7XG5cbiAgICBhZGRyZXNzLmZpbmQoJy5jYy1maWVsZC5jYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgIGZpbGxTdGF0ZURyb3Bkb3duKCBhZGRyZXNzLmZpbmQoJy5zdGF0ZS1kcm9wZG93bicpICk7IC8vLy8gZnVuLiBpbiBtYWluLmpzXG5cbiAgICBhZGRyZXNzLmZpbmQoJ2lucHV0Lm51bWJlcnMnKS5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycyk7XG5cbiAgICBjaGVja0FkZHJlc3NMZW5ndGgoYWRkcmVzcywgYWRkcmVzc0luZGV4KTtcblxuICAgIHNlY3Rpb24uYXBwZW5kKGFkZHJlc3MpO1xuICAgIGFkZEF1dG9BZGRyZXNzKGFkZHJlc3NJbmRleCk7XG5cbiAgICB1cGRhdGVUYWJJbmRleCggJCgnLmNjLWZvcm0nKSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgIHNlY3Rpb24uc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBhZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9YWRkcmVzc0luZGV4OyB4Kyspe1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHNlY3Rpb24uZmluZCgnI2FkZHJlc3NfJyArIHgpO1xuXG4gICAgICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgYWRkcmVzcy5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoICQoJy5jYy1mb3JtJykpOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICB9XG4gICAgYWRkcmVzc0luZGV4ID0gaWRSZW1vdmUtMTtcbiAgICBpZihhZGRyZXNzSW5kZXggPD0gMSkgc2VjdGlvbi5zbGlkZVVwKClcbn1cblxuLyoqXG4gKiBbYWRkQXV0b0FkZHJlc3Mgd2lsbCBhZGQgYWRkcmVzcyB0eXBlIGFoZWFkIGZ1bmN0aW9uYWxpdHkgdG8gdGV4dCBmaWVsZCB3aXRoIGlkICdib19hZGRyZXNzJ11cbiAqIEBwYXJhbSB7W3R5cGVdfSBpbmRleCBbaW4gbXVsdGktYWRkcmVzcyBjYXNlIHRoaXMgdmFyaWFibGUgd2lsbCB0ZWwgdGhlIGZ1bmN0aW9uIHdoaWNoIGFkZHJlc3MgdG8gYmluZCB0aGUgdHlwZSBhaGVhZCB0b11cbiAqL1xuZnVuY3Rpb24gYWRkQXV0b0FkZHJlc3MoaW5kZXgpe1xuICAgIHZhciBwb3N0ID0gaW5kZXggPj0gMiA/ICcnK2luZGV4IDogJyc7XG5cbiAgICB2YXIgYXV0b2NvbXBsZXRlID0gbmV3IGdvb2dsZS5tYXBzLnBsYWNlcy5BdXRvY29tcGxldGUoXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib19hZGRyZXNzJyArIHBvc3QpLFxuICAgICAgICB7dHlwZXM6IFsnZ2VvY29kZSddfVxuICAgICk7XG4gICAgLy8vLyBzZXQgdGhlIGFkZHJlc3MgaW5kZXggYW5kIHBvc3QgaW4gYXV0b2NvbXBsZXRlIG9iamVjdCB0byBiZSB1c2VkIGluIGZpbGxJbkFkZHJlc3MgZnVuY3Rpb25cbiAgICBhdXRvY29tcGxldGUuaW5kZXggPSAwO1xuICAgIGF1dG9jb21wbGV0ZS5wb3N0ID0gcG9zdDtcblxuICAgIC8vIFdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhbiBhZGRyZXNzIGZyb20gdGhlIGRyb3Bkb3duLCBwb3B1bGF0ZSB0aGUgYWRkcmVzc1xuICAgIC8vIGZpZWxkcyBpbiB0aGUgZm9ybS5cbiAgICBhdXRvY29tcGxldGUuYWRkTGlzdGVuZXIoJ3BsYWNlX2NoYW5nZWQnLCBmaWxsSW5BZGRyZXNzKTtcbn1cblxuLyoqXG4gKiBbZmlsbEluQWRkcmVzcyB3aWxsIHVwZGF0ZSB0aGUgYWRkcmVzcyBjaXR5LCBzdGF0LCBhbmQgemlwIGZpbGVkIGFmdGVyIHVzZXIgc2VsZWN0IGFkZHJlc3MgZm9ybSB0eXBlIGFoZWFkXVxuICogdGhpcyBpbnNpZGUgdGhpcyBmdW5jdGlvbiB3aWxsIHJlZmVyZW5jZSBnb29nbGUgYXV0b2NvbXBldGUgb2JqZWN0XG4gKiBAcmV0dXJuIHtbbnVsbF19IFtkZXNjcmlwdGlvbl1cbiAqL1xuZnVuY3Rpb24gZmlsbEluQWRkcmVzcygpe1xuICAgIC8vLy8gdGhpcyByZWZlciB0byB0aGUgYXV0byBjb21wbGV0ZSBvYmplY3RcblxuICAgIHZhciBwbGFjZSA9IHRoaXMuZ2V0UGxhY2UoKTtcbiAgICB2YXIgY29tcG9uZW50Rm9ybSA9IHtcbiAgICAgICAgc3RyZWV0X251bWJlcjogJ3Nob3J0X25hbWUnLFxuICAgICAgICByb3V0ZTogJ2xvbmdfbmFtZScsXG4gICAgICAgIGxvY2FsaXR5OiAnbG9uZ19uYW1lJyxcbiAgICAgICAgYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIGNvdW50cnk6ICdsb25nX25hbWUnLFxuICAgICAgICBwb3N0YWxfY29kZTogJ3Nob3J0X25hbWUnXG4gICAgfTtcblxuICAgIHZhciBhZGRyZXNzID0ge307XG4gICAgdmFyIGxvbmdfbmFtZSA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2UuYWRkcmVzc19jb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0eXBlID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldLnR5cGVzWzBdO1xuICAgICAgICB2YXIgYWRkcmVzc1R5cGUgPSB0eXBlO1xuXG4gICAgICBpZiAoY29tcG9uZW50Rm9ybVthZGRyZXNzVHlwZV0pIHtcbiAgICAgICAgdmFyIHZhbCA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVtjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXV07XG4gICAgICAgIGFkZHJlc3NbYWRkcmVzc1R5cGVdID0gdmFsO1xuICAgICAgfVxuICAgICAgaWYoYWRkcmVzc1R5cGUgPT09ICdhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnKXtcbiAgICAgICAgICAgIGxvbmdfbmFtZSA9IHBsYWNlLmFkZHJlc3NfY29tcG9uZW50c1tpXVsnbG9uZ19uYW1lJ107XG4gICAgICAgIH1cbiAgICB9Ly8vLyBmb3JcbiAgICBhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUgPSBsb25nX25hbWU7XG5cbiAgICAkKCcjYm9fYWRkcmVzcycrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5zdHJlZXRfbnVtYmVyICsgJyAnICsgYWRkcmVzcy5yb3V0ZSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnI2JvX2NpdHknK3RoaXMucG9zdCkudmFsKGFkZHJlc3MubG9jYWxpdHkpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJyNib19zdGF0ZScrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIC8vICQoJyNzdGF0ZV9sYWJlbCcrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5hZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzFfbG9uZ19uYW1lKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcjYm9femlwJyt0aGlzLnBvc3QpLnZhbChhZGRyZXNzLnBvc3RhbF9jb2RlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbn0iLCIkKGRvY3VtZW50KS5yZWFkeShjb0JvcnJvd2VyUmVhZHkpO1xudmFyIGFkZHJlc3NUZW1wbGF0ZTtcbnZhciBhZGRyZXNzSW5kZXg7XG5cbmZ1bmN0aW9uIGNvQm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNjb0JvcnJvd2VyRm9ybScpO1xuICAgIC8qKlxuICAgICAqIGRvIG5vdGhpbmcgaWYgdGhlIGZvcm0gaXMgbm90ICNjb0JvcnJvd2VyRm9ybVxuICAgICAqL1xuICAgIGlmKG15Rm9ybS5sZW5ndGggPD0gMCkgcmV0dXJuO1xuXG4gICAgLyoqXG4gICAgICogW2FkZHJlc3NJbmRleCB3aWxsIHRyYWNrIHRoZSBudW1iZXIgb2YgYWRkcmVzcyBhZGRlZCBhbmQgc3RvcCBpZiB0b3RhbCBvZiA0IGFkZHJlc3NdXG4gICAgICogQHR5cGUge051bWJlcn1cbiAgICAgKi9cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIGluaXRpYWxpemUgZm9ybSB2YWxpZGF0aW9uXG4gICAgICovXG4gICAgbXlGb3JtLnZhbGlkYXRlKGZ1bmN0aW9uKGlzVmFsaWQsIGludmFsaWRGaWVsZHMpe1xuICAgICAgICBpZihpc1ZhbGlkKXtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0vLy8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogaWYgTm90IHZhbGlkIHNjcm9sbCB0byBmaXJzdCBpbnZhbGlkIGZpZWxkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZCBFbHNlXG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ29udGludWUgQ2xpY2tcbiAgICAgKi9cbiAgICAkKCcjY29udGludWUnKS5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pXG5cbiAgICAvKipcbiAgICAgKiBGaWVsZCBmb3JtYXRpbmcgd2hpbGUgdHlwaW5nXG4gICAgICogRXZlbnQgaGFuZGxlcnMgaW4gbWFpbi5qc1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpXG5cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGNvLWJvcnJvd2VyIGxpdmUgaW4gZGlmZmVyZW50IGFkZHJlc3NcbiAgICAgKi9cbiAgICAkKCdpbnB1dFtuYW1lPWNvX2xpdmVzYW1lXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldil7XG4gICAgICAgIGlmKCQodGhpcykudmFsKCkgPT09ICd5ZXMnKXtcblxuICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZVVwKClcbiAgICAgICAgICAgIC5maW5kKCcuY2MtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0IG1lc3NhZ2UnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCcjcHJlQWRkcmVzcycpLnNsaWRlVXAoKS5lbXB0eSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAkKCcjYWRkcmVzc0RpdicpLnNsaWRlRG93bigpXG4gICAgICAgICAgICAuZmluZCgnLmNjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuXG4gICAgICAgICAgICBhZGRBdXRvQWRkcmVzcygxKTsgLy8vLyBmdW5jdGlvbiBpbiAwMS1ib3Jyb3dlci5qc1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVRhYkluZGV4KG15Rm9ybSk7IC8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBCYWNrIGJ1dHRvbiBjbGljayBoYW5kbGVyc1xuICAgICAqL1xuICAgICQoJyNiYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oY2Upe1xuICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAqIGZ1bmN0aW9uIGluIDAxLWJvcnJvd2VyLmpzXG4gICAgICovXG4gICAgY2hlY2tBZGRyZXNzTGVuZ3RoKG15Rm9ybSwgYWRkcmVzc0luZGV4KTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIG51bWJlciBvZiBkZXBlbmRlbnRzIGNoYW5nZSBhbmQgc2hvdyBhZ2VzIGZpZWxkc1xuICAgICAqL1xuICAgICQoJyNjb19kZXBlbmRhbnRzJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIHZhciB2ID0gcGFyc2VJbnQoJCh0aGlzKS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgYWdlc0RpdiA9ICQoJyNkZXBlbmRlbnRTZWN0aW9uJyk7XG4gICAgICAgIHZhciBjb2xzID0gYWdlc0Rpdi5maW5kKCcuY29sLXhzLTYnKS5oaWRlKCk7XG5cbiAgICAgICAgaWYodiA+IDApe1xuICAgICAgICAgICAgZm9yKHZhciB4PTA7IHg8djsgeCsrKXtcbiAgICAgICAgICAgICAgICBjb2xzLmVxKHgpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGFnZXNEaXYuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBlcnJvciBjb3JyZWN0Jyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZSBjby1ib3Jyb3dlciBuYW1lIGluIHN1YiB0aXRsZXNcbiAgICAgKi9cbiAgICB2YXIgbmFtZUhvbGRlciA9ICQoJy5jb0JvcnJvd2VyTmFtZScpO1xuICAgICQoJyNjb19mbmFtZScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdmFsID0gJC50cmltKCAkKHRoaXMpLnZhbCgpICk7XG4gICAgICAgIG5hbWVIb2xkZXIudGV4dCggdmFsID8gdmFsIDogJ0NvLUJvcnJvd2VyJyk7XG4gICAgfSlcbn07Ly8vLyBib3Jyb3dlclJlYWR5XG4iLCIkKGRvY3VtZW50KS5yZWFkeShjb0JvcnJvd2VyUmVhZHkpO1xudmFyIGFkZHJlc3NUZW1wbGF0ZTtcbnZhciBhZGRyZXNzSW5kZXg7XG5cbmZ1bmN0aW9uIGNvQm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNwdXJjaGFzZUZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjY29Cb3Jyb3dlckZvcm1cbiAgICAgKi9cbiAgICBpZihteUZvcm0ubGVuZ3RoIDw9IDApIHJldHVybjtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgIC8qKlxuICAgICAqIFtpc0NvbnRpbnVlQ2xpY2tlZCBpdCB3aWxsIGJlIHNldCB0byB0cnVlIHdoZW4gY29udGludWUgYnV0dG9uIGNsaWNrZWQgXVxuICAgICAqIHRoaXMgdmFyIHdpbGwgaGVscCBkZXRlY3QgZm9ybSBzdWJtaXQgb24gYnV0dG9uIGNsaWNrIGFuZCBzY3JvbGwgdXAgdGhlIHBhZ2UgdG8gdGhlIGZpcnN0IGZvcm0gZXJyb3JcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFtpc1Byb3BlcnR5IGJvb2xlYW4gdmFsdWUgdG8ga25vdyBpZiB1c2VyIGhhcyBhIHByb3BlcnR5IG9yIG5vdF1cbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgaXNQcm9wZXJ0eSA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBpZiBOb3QgdmFsaWQgc2Nyb2xsIHRvIGZpcnN0IGludmFsaWQgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSlcblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKiBFdmVudCBoYW5kbGVycyBpbiBtYWluLmpzXG4gICAgICovXG5cbiAgICAkKCdpbnB1dC5waG9uZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RQaG9uZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0UGhvbmUpXG5cbiAgICAkKCdpbnB1dC5kYXRlJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdERhdGUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdERhdGUpO1xuXG4gICAgJCgnaW5wdXQubnVtYmVycycpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKVxuXG4gICAgJCgnaW5wdXQuc3NuJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFNTTilcbiAgICAub24oJ2tleXVwJywgZm9ybWF0U1NOKTtcblxuICAgICQoJ2lucHV0LmN1cnJlbmN5JylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdEN1cnJlbmN5KVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRDdXJyZW5jeSk7XG5cbiAgICAvKipcbiAgICAgKiBjaGVjayBpZiByZWFsIHN0YXRlIGFnZW50XG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1wdV91c2luZ2FnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdmFyIGFnZW50ID0gJCgnI2FnZW50Q29udGFjdCcpO1xuICAgICAgICB2YXIgYWdlbnRGaWVsZHMgPSAkKCcjYWdlbnRGaWVsZHMnKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudENvbnRhY3QnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOicjYWdlbnRGaWVsZHMsICNhZ2VudENvbnRhY3QnLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ1xuICAgICAgICAgICAgfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuXG4gICAgICAgIH1cbiAgICB9KTsvLy8vLyBvbi5jaGFuZ2VcblxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgaWYgY29udGFjdCBhZ2VudFxuICAgICAqL1xuICAgICQoJ2lucHV0W25hbWU9cHVfY29udGFjdGFnZW50XScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNhZ2VudEZpZWxkcycsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBwcm9wZXJ0eVxuICAgICAqL1xuICAgICQoJyNwdV9zZWFyY2h0eXBlcHVyY2hhc2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlzUHJvcGVydHkgPSBTdHJpbmcoJzM0Jykuc3BsaXQoJycpLmluZGV4T2YodmFsKSA+IC0xO1xuXG4gICAgICAgIGlmKHRydWUgPT09IGlzUHJvcGVydHkpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6Jy5wcm9wZXJ0eS1maWVsZHMnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicucHJvcGVydHktZmllbGRzLCAjc3ViTmFtZSwgI2Nsb3NpbmdEYXRlLCAjbW9udGhseUhPQScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLCAuY2MtdG8tYmUtdmFsaWRhdGUtc3ViLCAuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZywgLmNjLXRvLWJlLXZhbGlkYXRlLUhPQSd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cblxuICAgIH0pOy8vLyBvbi5jaGFuZ2VcblxuICAgIC8qKlxuICAgICAqIGNoZWNrIGlmIEhPQSBkdWVzXG4gICAgICovXG4gICAgJCgnaW5wdXRbbmFtZT1yZl9wbGFubmVkdW5pdF0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI21vbnRobHlIT0EnLCB2YWxpZGF0aW9uQ2xhc3M6Jy5jYy10by1iZS12YWxpZGF0ZS1IT0EnfSk7IC8vLy8gZnVuY3Rpb24gaW4gbWFpbi5qc1xuICAgICAgICB9Ly8vLyBpZlxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZXhjbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNtb250aGx5SE9BJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtSE9BJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1wdV9oYXZlY2xvc2luZ2RhdGVdJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuXG4gICAgICAgIGlmKHZhbCA9PT0gJ3llcycgJiYgISEkKHRoaXMpLmF0dHIoJ2NoZWNrZWQnKSl7XG4gICAgICAgICAgICBpbmNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2Nsb3NpbmdEYXRlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH0vLy8vIGlmXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBleGNsdWRlRmllbGRzKHtzZWxlY3RvcjonI2Nsb3NpbmdEYXRlJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtY2xvc2luZyd9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoJ2lucHV0W25hbWU9cHVfbWFudWZhY3R1cmVkXScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICBpZih2YWwgPT09ICd5ZXMnICYmICEhJCh0aGlzKS5hdHRyKCdjaGVja2VkJykpe1xuICAgICAgICAgICAgaW5jbHVkZUZpZWxkcyh7c2VsZWN0b3I6JyNzdWJOYW1lJywgdmFsaWRhdGlvbkNsYXNzOicuY2MtdG8tYmUtdmFsaWRhdGUtc3ViJ30pOyAvLy8vIGZ1bmN0aW9uIGluIG1haW4uanNcbiAgICAgICAgfS8vLy8gaWZcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGV4Y2x1ZGVGaWVsZHMoe3NlbGVjdG9yOicjc3ViTmFtZScsIHZhbGlkYXRpb25DbGFzczonLmNjLXRvLWJlLXZhbGlkYXRlLXN1Yid9KTsgLy8vLyBmdW5jdGlvbiBpbiBtYWluLmpzXG4gICAgICAgIH1cbiAgICB9KVxufTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
