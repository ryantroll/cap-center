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

                if(e.preventDefault) e.preventDefault(); else e.returnValue = false;



                //// false and true strictly test as null will returned is field is not validated
                if(false === isValid){
                    isFormValid = isFormValid && false;
                    var field = self.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="hidden"], select, textarea');
                    var label = self.find('label').eq(0);
                    var err = field.data('err');
                    var fErr = {filed:label.text(), id:field.attr('id'), error:err};
                    invalidFields.push(fErr)
                }
            }); /// .each

            var extra = callback(isFormValid, invalidFields.length > 0 ? invalidFields : null);

            isFormValid = isFormValid && extra;

            if(true !== isFormValid){
                if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            }

            return true;
        });//// .on submit
        return this;
    };


    var fieldChangedAfterError = function(e){
        var container = $(this).parent()
        if(container.hasClass('cc-address-length')){
            container = container.parent();
        }
        container.validateField()
    }

    $.fn.validateField = function(self){
        var self = this;
        var f = self.find('input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="date"], input[type="hidden"], select, textarea');
        var v = $.trim(f.val());
        var err = f.data('err');

        if(!err) err = {};

        var isValid = true;
        var isValidated = false;

        if(true === self.hasClass('cc-required')){
            isValidated = true;
            if(v.length < 1){
                isValid = false;
                var msg = self.find('.message.cc-required');

                if(msg.length > 0){
                    err['cc-required'] = msg.eq(0).text();
                }
            }
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

        //// if field passed through validation show error if any
        // if(true === isValidated ){
        if(Object.keys(err).length > 0){
            if(false === isValid || Object.keys(err).length > 0){

                f.showError();

                return false;
            }
            else if(true === isValid){
                f.hideError();

                return true;
            }

        }//// if isValidated

    }//// fun. validateFild

    $.fn.showError = function(){
        var f = this.filter('input, textarea, select').eq(0);
        var container = f.parent();
        if(container.hasClass('cc-address-length')){
            container = container.parent();
        }

        var err = f.data('err');

        var str = [];
        for(var e in err){
            str.push(err[e]);
        }

        container.find('#errorMsg').remove();

        if(str.length > 0 ){
            var msg = $('<div class="message" id="errorMsg"><i class="icon-error glyphicon glyphicon-remove-sign"></i> ' + str.join(' | ') + '</div>').show();
            container.append(msg);
            container.addClass('error message');
            f.off('keyup change', fieldChangedAfterError).on('keyup change', fieldChangedAfterError)
        }
        else{
            f.off('keyup change', fieldChangedAfterError)
        }



    }//// fun. showError

    $.fn.hideError = function(){
        var f = this.filter('input').eq(0);
        var container = f.parent();
        if(container.hasClass('cc-address-length')){
            container = container.parent();
        }

        container.addClass('correct');
        container.removeClass('error message');
    }

    $.fn.addError = function(errorClass) {
        var field = this.filter('input, textarea, select');
        if(field.length < 1) return;
        var container = field.parent();
        if(container.hasClass('cc-address-length')){
            container = container.parent();
        }

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
    $('#progres_switch').on('click', function(ev){
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
  radios.trigger('change')
}

function fillStateDropdown(selector){
    selector.each(function(x){
        var ul = $(this).find('select');
        for(var s=0; s<usStates.length; s++){
            var li = $('<option value="' + usStates[s].abbreviation + '">' + usStates[s].name + '</option>');
            ul.append(li);
        }//// for
    });
}//// fun. fillStateDropdown

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
  var allowed = [191, 9, 8, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;

  var val = $(this).val();
  var ret = '';
  var raw = val.split(/[\$| |\,]/).join('');

  if(raw.length > 3){
      var arr = raw.split('');
      var sep = 1;
      for(var x=arr.length-1; x>=0; x--){
        ret = (sep % 3 == 0 ? ',' : '') + arr[x]  + ret;
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

$(document).ready(borrowerReady);
var addressTemplate;
var addressIndex;


function borrowerReady(){

    var myForm = $('#borrowerForm');
    /**
     * do nothing if the form is not #borrowerForm
     */
    if(myForm.length <= 0) return;

    addressIndex = 1;

    addressTemplate = $('#addressTemplate').html();

    updateTabIndex( myForm);

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
                myForm.attr('action', 'index-co-borrower.html');
            }

            return true;
        }/// if isValid
        else{
            if(invalidFields && true === isContinueClicked){
                var scrollTo = $('#' + invalidFields[0].id).offset().top;
                //// scroll the form to the first error
                animateScroll(scrollTo-20, 1);

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
    checkAddressLength(myForm, addressIndex);

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
    fillStateDropdown( address.find('.state-dropdown') );

    address.find('input.numbers').on('keydown', restrictNumbers);

    checkAddressLength(address, addressIndex);

    section.append(address);
    console.log(section.parent('form').hide())
    addAutoAddress(addressIndex);
    // updateTabIndex( $('#borrowerForm'))
    updateTabIndex( $('.cc-form'))
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
        updateTabIndex( $('#borrowerForm'));
    }
    addressIndex = idRemove-1;
    if(addressIndex <= 1) section.slideUp()
}

function addAutoAddress(index){
    var post = index >= 2 ? ''+index : '';

    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('bo_address' + post),
        {types: ['geocode']}
    );
    autocomplete.index = 0;
    autocomplete.post = post;

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

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

    addressIndex = 1;

    addressTemplate = $('#addressTemplate').html();

    updateTabIndex( myForm);

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

            addAutoAddress(1);
        }
        updateTabIndex(myForm);
    });

    $('#back').on('click', function(ce){
        history.back();
    })

    /**
     * check for address length change
     */
    checkAddressLength(myForm, addressIndex);

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
     * update co-borrower name
     */
    var nameHolder = $('.coBorrowerName');
    $('#co_fname').on('keyup', function(e){
        var val = $.trim( $(this).val() );
        nameHolder.text( val ? val : 'Co-Borrower');
    })
};//// borrowerReady

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzLXN0YXRlcy5qcyIsInZhbGlkYXRpb24tcGx1Z2luLmpzIiwibWFpbi5qcyIsImJvcnJvd2VyLmpzIiwiY28tYm9ycm93ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVzU3RhdGVzID0gW1xuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFsYWJhbWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFMXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQWxhc2thXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFtZXJpY2FuIFNhbW9hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJBU1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkFyaXpvbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFaXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQXJrYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkFSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiQ2FsaWZvcm5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ0FcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb2xvcmFkb1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ09cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJDb25uZWN0aWN1dFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiQ1RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEZWxhd2FyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiREVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJEaXN0cmljdCBPZiBDb2x1bWJpYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRENcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJGZWRlcmF0ZWQgU3RhdGVzIE9mIE1pY3JvbmVzaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkZNXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiRmxvcmlkYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiRkxcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJHZW9yZ2lhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJHQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkd1YW1cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIkdVXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSGF3YWlpXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJISVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklkYWhvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJRFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIklsbGlub2lzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJJTFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIkluZGlhbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIklOXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiSW93YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiSUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJLYW5zYXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktTXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiS2VudHVja3lcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIktZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTG91aXNpYW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJMQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1haW5lXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJNRVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk1hcnNoYWxsIElzbGFuZHNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1IXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFyeWxhbmRcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1EXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWFzc2FjaHVzZXR0c1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUFcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaWNoaWdhblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTUlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJNaW5uZXNvdGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1OXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc2lzc2lwcGlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1TXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTWlzc291cmlcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk1PXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTW9udGFuYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZWJyYXNrYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkVcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXZhZGFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5WXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IEhhbXBzaGlyZVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTkhcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJOZXcgSmVyc2V5XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJOSlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5ldyBNZXhpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5NXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTmV3IFlvcmtcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5ZXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggQ2Fyb2xpbmFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIk5DXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiTm9ydGggRGFrb3RhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJORFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk5vcnRoZXJuIE1hcmlhbmEgSXNsYW5kc1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiTVBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJPaGlvXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPSFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9rbGFob21hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJPS1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIk9yZWdvblwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiT1JcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQYWxhdVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiUFdcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJQZW5uc3lsdmFuaWFcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUHVlcnRvIFJpY29cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlBSXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiUmhvZGUgSXNsYW5kXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJSSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIENhcm9saW5hXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJTQ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlNvdXRoIERha290YVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiU0RcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUZW5uZXNzZWVcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlROXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGV4YXNcIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIlRYXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVXRhaFwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiVVRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJWZXJtb250XCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWVFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbiBJc2xhbmRzXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWSVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlZpcmdpbmlhXCIsXG4gICAgICAgICAgXCJhYmJyZXZpYXRpb25cIjogXCJWQVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIldhc2hpbmd0b25cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldBXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV2VzdCBWaXJnaW5pYVwiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1ZcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJXaXNjb25zaW5cIixcbiAgICAgICAgICBcImFiYnJldmlhdGlvblwiOiBcIldJXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiV3lvbWluZ1wiLFxuICAgICAgICAgIFwiYWJicmV2aWF0aW9uXCI6IFwiV1lcIlxuICAgICAgfVxuICBdOyIsIihmdW5jdGlvbiggJCApIHtcbiAgICAkLmZuLnZhbGlkYXRlID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGZvcm0gPSB0aGlzLmZpbHRlcignZm9ybScpO1xuICAgICAgICB2YXIgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgIGZvcm0ub2ZmKCdzdWJtaXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICB2YXIgaXNGb3JtVmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgaW52YWxpZEZpZWxkcyA9IFtdO1xuXG4gICAgICAgICAgICBmb3JtLmZpbmQoJy5jYy1maWVsZC5jYy12YWxpZGF0ZScpLmVhY2goZnVuY3Rpb24obil7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIC8vIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IHNlbGYudmFsaWRhdGVGaWVsZCgpO1xuXG4gICAgICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcblxuXG5cbiAgICAgICAgICAgICAgICAvLy8vIGZhbHNlIGFuZCB0cnVlIHN0cmljdGx5IHRlc3QgYXMgbnVsbCB3aWxsIHJldHVybmVkIGlzIGZpZWxkIGlzIG5vdCB2YWxpZGF0ZWRcbiAgICAgICAgICAgICAgICBpZihmYWxzZSA9PT0gaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgICAgIGlzRm9ybVZhbGlkID0gaXNGb3JtVmFsaWQgJiYgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZCA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gc2VsZi5maW5kKCdsYWJlbCcpLmVxKDApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmRXJyID0ge2ZpbGVkOmxhYmVsLnRleHQoKSwgaWQ6ZmllbGQuYXR0cignaWQnKSwgZXJyb3I6ZXJyfTtcbiAgICAgICAgICAgICAgICAgICAgaW52YWxpZEZpZWxkcy5wdXNoKGZFcnIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7IC8vLyAuZWFjaFxuXG4gICAgICAgICAgICB2YXIgZXh0cmEgPSBjYWxsYmFjayhpc0Zvcm1WYWxpZCwgaW52YWxpZEZpZWxkcy5sZW5ndGggPiAwID8gaW52YWxpZEZpZWxkcyA6IG51bGwpO1xuXG4gICAgICAgICAgICBpc0Zvcm1WYWxpZCA9IGlzRm9ybVZhbGlkICYmIGV4dHJhO1xuXG4gICAgICAgICAgICBpZih0cnVlICE9PSBpc0Zvcm1WYWxpZCl7XG4gICAgICAgICAgICAgICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pOy8vLy8gLm9uIHN1Ym1pdFxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5cbiAgICB2YXIgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvciA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgY29udGFpbmVyID0gJCh0aGlzKS5wYXJlbnQoKVxuICAgICAgICBpZihjb250YWluZXIuaGFzQ2xhc3MoJ2NjLWFkZHJlc3MtbGVuZ3RoJykpe1xuICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLnBhcmVudCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci52YWxpZGF0ZUZpZWxkKClcbiAgICB9XG5cbiAgICAkLmZuLnZhbGlkYXRlRmllbGQgPSBmdW5jdGlvbihzZWxmKXtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgZiA9IHNlbGYuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIGlucHV0W3R5cGU9XCJudW1iZXJcIl0sIGlucHV0W3R5cGU9XCJ0ZWxcIl0sIGlucHV0W3R5cGU9XCJlbWFpbFwiXSwgaW5wdXRbdHlwZT1cImRhdGVcIl0sIGlucHV0W3R5cGU9XCJoaWRkZW5cIl0sIHNlbGVjdCwgdGV4dGFyZWEnKTtcbiAgICAgICAgdmFyIHYgPSAkLnRyaW0oZi52YWwoKSk7XG4gICAgICAgIHZhciBlcnIgPSBmLmRhdGEoJ2VycicpO1xuXG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIHZhciBpc1ZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIGlzVmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtcmVxdWlyZWQnKSl7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICBpZih2Lmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1yZXF1aXJlZCcpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXJlcXVpcmVkJ10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtcmVxdWlyZWQnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGNjLXJlcXVpcmVkXG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtbnVtYmVyJykgJiYgdil7XG4gICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB2YXIgcmVneCA9IC9eKFxcZCkrKFxcLlxcZCspPyQvO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLW51bWJlcicpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1udW1iZXInXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1udW1iZXInXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZGVsZXRlIGVyclsnY2MtbnVtYmVyJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1lbWFpbCcpICYmIHYpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcbiAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1lbWFpbCcpO1xuICAgICAgICAgICAgICAgIGlmKG1zZy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1lbWFpbCddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWVtYWlsJ107XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1kYXRlJykpe1xuICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvO1xuICAgICAgICAgICAgdmFyIHNwbGl0ID0gdi5zcGxpdCgnLycpO1xuICAgICAgICAgICAgdmFyIG0gPSBzcGxpdFswXSA/IE51bWJlcihzcGxpdFswXSkgOiBudWxsO1xuICAgICAgICAgICAgdmFyIGQgPSBzcGxpdFsxXSA/IE51bWJlcihzcGxpdFsxXSkgOiBudWxsO1xuICAgICAgICAgICAgdmFyIHkgPSBzcGxpdFsyXSA/IE51bWJlcihzcGxpdFsyXSkgOiBudWxsO1xuICAgICAgICAgICAgdmFyIG0zMSA9IFsxLCAzLCA1LCA3LCA4LCAxMCwgMTJdO1xuICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIW0gfHwgbSA+IDEyIHx8IG0gPCAxKXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtMzEuaW5kZXhPZihtKSA+PTAgKXtcbiAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzEgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gMzAgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobSA9PSAyKXtcbiAgICAgICAgICAgICAgICB2YXIgX2QgPSB5ICUgNCA9PSAwID8gMjkgOiAyODtcbiAgICAgICAgICAgICAgICBpZighZCB8fCBkID4gX2QgfHwgZCA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighaXNWYWxpZCl7XG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtZGF0ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWRhdGUnXSA9IG1zZy5lcSgwKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1kYXRlJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWRhdGUnXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRydWUgPT09IHNlbGYuaGFzQ2xhc3MoJ2NjLXBob25lJykpe1xuICAgICAgICAgICAgaWYodil7XG4gICAgICAgICAgICAgICAgaXNWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciByZWd4ID0gL15cXChcXGR7M31cXCkoICk/XFxkezN9XFwtXFxkezR9JC87XG4gICAgICAgICAgICAgICAgaWYoIXJlZ3gudGVzdCh2KSl7XG4gICAgICAgICAgICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zZyA9IHNlbGYuZmluZCgnLm1lc3NhZ2UuY2MtcGhvbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobXNnLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyWydjYy1waG9uZSddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG5cbiAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1waG9uZSddO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtY3VycmVuY3knKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcJD8oXFxkezEsM30pKyhcXCwqXFxkezN9KSokLztcbiAgICAgICAgICAgICAgICBpZighcmVneC50ZXN0KHYpKXtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gc2VsZi5maW5kKCcubWVzc2FnZS5jYy1jdXJyZW5jeScpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLWN1cnJlbmN5J10gPSBtc2cuZXEoMCkudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWN1cnJlbmN5J107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBlcnJbJ2NjLWN1cnJlbmN5J107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cnVlID09PSBzZWxmLmhhc0NsYXNzKCdjYy1zc24nKSl7XG4gICAgICAgICAgICBpZih2KXtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ3ggPSAvXlxcZHszfShcXC0pP1xcZHsyfShcXC0pP1xcZHs0fSQvO1xuICAgICAgICAgICAgICAgIGlmKCFyZWd4LnRlc3Qodikpe1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSBzZWxmLmZpbmQoJy5tZXNzYWdlLmNjLXNzbicpO1xuICAgICAgICAgICAgICAgICAgICBpZihtc2cubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJbJ2NjLXNzbiddID0gbXNnLmVxKDApLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXJyWydjYy1zc24nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIGVyclsnY2Mtc3NuJ107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8vIHJlc2V0IHRoZSBmaWVsZCBlcnJvcnMgYmVmb3JlIGFkZGluZyB0aGVtIGFnYWluXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2Vycm9yIGNvcnJlY3QgbWVzc2FnZScpLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuXG4gICAgICAgIGYuZGF0YSgnZXJyJywgZXJyKTtcblxuICAgICAgICAvLy8vIGlmIGZpZWxkIHBhc3NlZCB0aHJvdWdoIHZhbGlkYXRpb24gc2hvdyBlcnJvciBpZiBhbnlcbiAgICAgICAgLy8gaWYodHJ1ZSA9PT0gaXNWYWxpZGF0ZWQgKXtcbiAgICAgICAgaWYoT2JqZWN0LmtleXMoZXJyKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGlmKGZhbHNlID09PSBpc1ZhbGlkIHx8IE9iamVjdC5rZXlzKGVycikubGVuZ3RoID4gMCl7XG5cbiAgICAgICAgICAgICAgICBmLnNob3dFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih0cnVlID09PSBpc1ZhbGlkKXtcbiAgICAgICAgICAgICAgICBmLmhpZGVFcnJvcigpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZGF0ZWRcblxuICAgIH0vLy8vIGZ1bi4gdmFsaWRhdGVGaWxkXG5cbiAgICAkLmZuLnNob3dFcnJvciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBmID0gdGhpcy5maWx0ZXIoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JykuZXEoMCk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBmLnBhcmVudCgpO1xuICAgICAgICBpZihjb250YWluZXIuaGFzQ2xhc3MoJ2NjLWFkZHJlc3MtbGVuZ3RoJykpe1xuICAgICAgICAgICAgY29udGFpbmVyID0gY29udGFpbmVyLnBhcmVudCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVyciA9IGYuZGF0YSgnZXJyJyk7XG5cbiAgICAgICAgdmFyIHN0ciA9IFtdO1xuICAgICAgICBmb3IodmFyIGUgaW4gZXJyKXtcbiAgICAgICAgICAgIHN0ci5wdXNoKGVycltlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250YWluZXIuZmluZCgnI2Vycm9yTXNnJykucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYoc3RyLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgICAgIHZhciBtc2cgPSAkKCc8ZGl2IGNsYXNzPVwibWVzc2FnZVwiIGlkPVwiZXJyb3JNc2dcIj48aSBjbGFzcz1cImljb24tZXJyb3IgZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmUtc2lnblwiPjwvaT4gJyArIHN0ci5qb2luKCcgfCAnKSArICc8L2Rpdj4nKS5zaG93KCk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKG1zZyk7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoJ2Vycm9yIG1lc3NhZ2UnKTtcbiAgICAgICAgICAgIGYub2ZmKCdrZXl1cCBjaGFuZ2UnLCBmaWVsZENoYW5nZWRBZnRlckVycm9yKS5vbigna2V5dXAgY2hhbmdlJywgZmllbGRDaGFuZ2VkQWZ0ZXJFcnJvcilcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZi5vZmYoJ2tleXVwIGNoYW5nZScsIGZpZWxkQ2hhbmdlZEFmdGVyRXJyb3IpXG4gICAgICAgIH1cblxuXG5cbiAgICB9Ly8vLyBmdW4uIHNob3dFcnJvclxuXG4gICAgJC5mbi5oaWRlRXJyb3IgPSBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZiA9IHRoaXMuZmlsdGVyKCdpbnB1dCcpLmVxKDApO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZi5wYXJlbnQoKTtcbiAgICAgICAgaWYoY29udGFpbmVyLmhhc0NsYXNzKCdjYy1hZGRyZXNzLWxlbmd0aCcpKXtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5wYXJlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcygnY29ycmVjdCcpO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2Vycm9yIG1lc3NhZ2UnKTtcbiAgICB9XG5cbiAgICAkLmZuLmFkZEVycm9yID0gZnVuY3Rpb24oZXJyb3JDbGFzcykge1xuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLmZpbHRlcignaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnKTtcbiAgICAgICAgaWYoZmllbGQubGVuZ3RoIDwgMSkgcmV0dXJuO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZmllbGQucGFyZW50KCk7XG4gICAgICAgIGlmKGNvbnRhaW5lci5oYXNDbGFzcygnY2MtYWRkcmVzcy1sZW5ndGgnKSl7XG4gICAgICAgICAgICBjb250YWluZXIgPSBjb250YWluZXIucGFyZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbXNnID0gY29udGFpbmVyLmZpbmQoJy5tZXNzYWdlLicrZXJyb3JDbGFzcykuZXEoMCkudGV4dCgpO1xuICAgICAgICB2YXIgZXJyID0gZmllbGQuZGF0YSgnZXJyJyk7XG4gICAgICAgIGlmKCFlcnIpIGVyciA9IHt9O1xuXG4gICAgICAgIGVycltlcnJvckNsYXNzXSA9IG1zZztcblxuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgIH1cblxuICAgICQuZm4ucmVtb3ZlRXJyb3IgPSBmdW5jdGlvbihlcnJvckNsYXNzKSB7XG4gICAgICAgIHZhciBmaWVsZCA9IHRoaXMuZmlsdGVyKCdpbnB1dCwgdGV4dGFyZWEsIHNlbGVjdCcpO1xuICAgICAgICBpZihmaWVsZC5sZW5ndGggPCAxKSByZXR1cm47XG4gICAgICAgIHZhciBlcnIgPSBmaWVsZC5kYXRhKCdlcnInKTtcbiAgICAgICAgaWYoIWVycikgcmV0dXJuO1xuICAgICAgICBkZWxldGUgZXJyW2Vycm9yQ2xhc3NdO1xuICAgICAgICBmaWVsZC5kYXRhKCdlcnInLCBlcnIpO1xuICAgIH1cbn0oIGpRdWVyeSApKTsiLCJ2YXIgX2FwcFZhcnMgPSB7fTtcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoY2NEb2N1bWVudFJlYWR5KTtcblxuZnVuY3Rpb24gY2NEb2N1bWVudFJlYWR5KCl7XG5cbiAgICAvKipcbiAgICAgKiBQcm9ncmVzcyBuYXZpZ2F0aW9uIG1vYmlsZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJyNwcm9ncmVzX3N3aXRjaCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3NOYXYgPSAkKCcjcHJvZ3Jlc3NfbmF2Jyk7XG4gICAgICAgIHZhciBoYW5kbGVQb3JncmVzTmF2Q2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRydWUgPT09IHByb2dyZXNzTmF2Lmhhc0NsYXNzKCdleHBhbmRlZCcpKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NOYXYucmVtb3ZlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgc2VsZi53aWR0aCgnMTAwJScpO1xuICAgICAgICAgICAgICAgIC8vLy8gdW5iaW5kIHdoZW4gbWVudSBjbG9zZWQgbm8gbmVlZCB0byBjaGVjayBmb3IgY2xpY2tcbiAgICAgICAgICAgICAgICAkKCdib2R5JykudW5iaW5kKCdjbGljaycsIGhhbmRsZVBvcmdyZXNOYXZDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzc05hdi5hZGRDbGFzcygnZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBzZWxmLndpZHRoKDQwKTsgLy8gY2hhbmdpbmcgdGhlIHdpZHRoIHRvIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiBvZiBwcm9ncmVzcyBiYXIgY2xpY2thYmxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0aGUgZXZlbnQgd2lsbCBidWJibGUgdXAgdG8gYm9keSBzbyBkbyB0aGUgd29yayBvbiBib2R5IGNsaWNrIFxcIG9ubHkgaWYgbWVudSBpcyBjbG9zZWRcbiAgICAgICAgICogdGhpcyB0byBtYWtlIHN1cmUgdGhlIG1lbnUgaXMgY2xvc2VkIHdoZW4gY2xpY2sgb3V0c2lkZSB0aGUgbWVudVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGZhbHNlID09PSBwcm9ncmVzc05hdi5oYXNDbGFzcygnZXhwYW5kZWQnKSkge1xuXG4gICAgICAgICAgICAkKCdib2R5JykuYmluZCgnY2xpY2snLCBoYW5kbGVQb3JncmVzTmF2Q2xpY2spO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBZGQgc2Nyb2xsaW5nIGV2ZW50IGxpc3RlbmVyIHRvIG1ha2UgdGhlIHByb2dyZXNzIGJhciBzdGlja3lcbiAgICAgKi9cbiAgICAvLyBpZigkKCdib2R5Jykud2lkdGgoKSA8IDY3OCl7XG4gICAgICAgICQod2luZG93KS5vZmYoJ3Njcm9sbCcpLm9uKCdzY3JvbGwnLCBtYWluU2Nyb2xsKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgc3RhdGVzIGRyb3AtZG93bnNcbiAgICAgKi9cbiAgICAgZmlsbFN0YXRlRHJvcGRvd24oICQoJy5zdGF0ZS1kcm9wZG93bicpICk7XG5cblxuXG5cblxuICAgIC8qKlxuICAgICAqIEZsb2F0IGxhYmVsIGJlaGF2aW9yXG4gICAgICovXG4gICAgJCgnLmNjLWZpZWxkLmZsb2F0JykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgZmllbGQgPSBzZWxmLmZpbmQoJ2lucHV0W3R5cGU9dGV4dF0nKS5lcSgwKTtcblxuICAgICAgICB2YXIgdHJpZ2dlckV2ZW50ID0gJ2tleXVwJztcbiAgICAgICAgaWYodHJ1ZSA9PT0gc2VsZi5oYXNDbGFzcygnY2MtZHJvcGRvd24nKSl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQgPSAnY2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGZpZWxkLm9uKHRyaWdnZXJFdmVudCwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZihmaWVsZC52YWwoKSl7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRDbGFzcygnZWRpdGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2VkaXRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pOy8vLyAuZWFjaFxuXG4gICAgLyoqXG4gICAgICogTWVzc2FnZSBiZWhhdmlvclxuICAgICAqL1xuICAgICQoJy5qc0NvbGxhcHNlJykuZWFjaChmdW5jdGlvbih4KXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICBzZWxmLmZpbmQoJ2EuY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTsgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVXAoJ2Zhc3QnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9KTsvLy8vIC5lYWNoXG5cbiAgICAvKipcbiAgICAgKiBTZXQgeWVzL25vIHJhZGlvIGJ1dHRvblxuICAgICAqL1xuICAgIHllc05vUmFkaW8oKTtcbn0vLy8vIGZ1bi4gY2NEb2N1bWVudFJlYWR5XG5cbmZ1bmN0aW9uIG1haW5TY3JvbGwoZSl7XG4gICAgaWYoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpOyBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICBpZigkKCdib2R5Jykud2lkdGgoKSA+IDY3OCkgcmV0dXJuO1xuXG4gICAgdmFyIHMgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgdmFyIGJhciA9ICQoJyNwcm9ncmVzc19uYXYnKTtcbiAgICBpZihzID4gMjAwKXtcbiAgICAgICAgaWYoZmFsc2UgPT09IGJhci5oYXNDbGFzcygnZmxvYXQnKSl7XG4gICAgICAgICAgICBiYXIuYWRkQ2xhc3MoJ2Zsb2F0Jyk7XG4gICAgICAgICAgICBiYXIucGFyZW50KCkuY3NzKCdwYWRkaW5nLWJvdHRvbScsIGJhci5oZWlnaHQoKSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBiYXIucmVtb3ZlQ2xhc3MoJ2Zsb2F0Jyk7XG4gICAgICAgIGJhci5wYXJlbnQoKS5jc3MoJ3BhZGRpbmctYm90dG9tJywgbnVsbClcbiAgICB9XG5cbn0vLy8vIGZ1bi4gbWFpblNjcm9sbFxuXG5cbmZ1bmN0aW9uIHVwZGF0ZVRhYkluZGV4KHNlbGVjdG9yKXtcbiAgICBzZWxlY3Rvci5maW5kKCcuY2MtZmllbGQnKS5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgcyA9ICQodGhpcykuZmluZCgnaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1lbWFpbF0sIGlucHV0W3R5cGU9ZGF0ZV0sIGlucHV0W3R5cGU9dGVsXSwgaW5wdXRbdHlwZT1yYWRpb10sIGlucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPW51bWJlcl0sIHRleHRhcmVhLCBzZWxlY3QnKVxuICAgICAgICAuYXR0cigndGFiaW5kZXgnLCB4KzEpO1xuXG4gICAgfSlcbn0vLy8vIGZ1bi4gdXBkYXRlVGFiSW5kZXhcblxuZnVuY3Rpb24geWVzTm9SYWRpbygpe1xuICB2YXIgcmFkaW9zID0gJCgnLnJhZGlvLXllc25vIGlucHV0W3R5cGU9cmFkaW9dJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgIGlmKCQodGhpcykuYXR0cignY2hlY2tlZCcpKXtcbiAgICAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnbGFiZWwuY2hlY2tlZCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgfVxuICB9KTtcbiAgcmFkaW9zLnRyaWdnZXIoJ2NoYW5nZScpXG59XG5cbmZ1bmN0aW9uIGZpbGxTdGF0ZURyb3Bkb3duKHNlbGVjdG9yKXtcbiAgICBzZWxlY3Rvci5lYWNoKGZ1bmN0aW9uKHgpe1xuICAgICAgICB2YXIgdWwgPSAkKHRoaXMpLmZpbmQoJ3NlbGVjdCcpO1xuICAgICAgICBmb3IodmFyIHM9MDsgczx1c1N0YXRlcy5sZW5ndGg7IHMrKyl7XG4gICAgICAgICAgICB2YXIgbGkgPSAkKCc8b3B0aW9uIHZhbHVlPVwiJyArIHVzU3RhdGVzW3NdLmFiYnJldmlhdGlvbiArICdcIj4nICsgdXNTdGF0ZXNbc10ubmFtZSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICAgIHVsLmFwcGVuZChsaSk7XG4gICAgICAgIH0vLy8vIGZvclxuICAgIH0pO1xufS8vLy8gZnVuLiBmaWxsU3RhdGVEcm9wZG93blxuXG52YXIgaXNBbmRyb2lkID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIC8oYW5kcm9pZCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xufS8vLy8gZnVuLiBpc0FuZHJvaWRcblxuXG52YXIgcmVzdHJpY3RQaG9uZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG5cbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLSgpIFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgNDgsIDU3LCA5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKVxuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG52YXIgZm9ybWF0UGhvbmUgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaDtcbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA4LCAzNywgMzgsIDM5LCA0MCwgMTNdO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICBpZihhbGxvd2VkLmluZGV4T2YoY29kZSkgPiAtMSkgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICB2YXIgcmF3VmFsdWUgPSB2YWwuc3BsaXQoL1tcXCh8XFwpfCB8XFwtfFxcK3xcXC5dLykuam9pbignJyk7XG4gIHZhciBmb3JtYXRlZCA9ICcnO1xuICBpZihyYXdWYWx1ZS5sZW5ndGggPj0gMyl7XG4gICAgZm9ybWF0ZWQgKz0gJygnICsgcmF3VmFsdWUuc2xpY2UoMCwzKSArICcpICc7XG4gICAgcmF3VmFsdWUgPSByYXdWYWx1ZS5zbGljZSgzKTtcbiAgfVxuICBpZihyYXdWYWx1ZS5sZW5ndGggPj0gMyl7XG4gICAgZm9ybWF0ZWQgKz0gcmF3VmFsdWUuc2xpY2UoMCwzKSArICctJztcbiAgICByYXdWYWx1ZSA9IHJhd1ZhbHVlLnNsaWNlKDMpO1xuICB9XG4gIGZvcm1hdGVkICs9IHJhd1ZhbHVlO1xuXG4gICQodGhpcykudmFsKGZvcm1hdGVkKTtcbn0vLy8vIGZ1bi4gZm9ybWF0UGhvbmVcblxudmFyIHJlc3RyaWN0RGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoIHx8IGtleUV2LmNoYXJDb2RlO1xuICB2YXIgY2hhciA9IFN0cmluZy5mcm9tQ2hhckNvZGUoY29kZSk7XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG5cbiAgdmFyIGFsbG93ZWRDaGFycyA9IFsnMCcsICcxJywgJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcvJ11cbiAgdmFyIGFsbG93ZWQgPSBbMTkxLCA5LCA5MSwgOCwgMzcsIDM4LCAzOSwgNDAsIDEzLCAxNiwgMTcsIDE4LCA5MywgMjBdO1xuICAkKHRoaXMpLnJlbW92ZUVycm9yKCdjYy1udW1iZXJzLW9ubHknKVxuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlRGF0ZVxuXG52YXIgZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cblxuICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcblxuICB2YXIgcmV0ID0gJyc7XG4gIHZhciByYXcgPSB2YWwucmVwbGFjZSgvXFwvL2csICcnKTtcblxuICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgcmF3ID0gcmF3LnNsaWNlKDIpO1xuXG4gICAgaWYocmF3Lmxlbmd0aCA+PSAyKXtcbiAgICAgIHJldCArPSByYXcuc2xpY2UoMCwgMikgKyAnLyc7XG4gICAgICByYXcgPSByYXcuc2xpY2UoMik7XG4gICAgfVxuICB9XG5cbiAgcmV0ICs9IHJhdztcbiAgJCh0aGlzKS52YWwocmV0KTtcbn0vLy8vIGZ1bi4gZm9ybWF0ZURhdGVcblxudmFyIHJlc3RyaWN0U1NOID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwLVwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzE4OSwgOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIGZvcm1hdFNTTiA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5yZXBsYWNlKC9cXC0vZywgJycpO1xuXG4gIGlmKHJhdy5sZW5ndGggPj0gMyl7XG4gICAgcmV0ICs9IHJhdy5zbGljZSgwLCAzKSArICctJztcbiAgICByYXcgPSByYXcuc2xpY2UoMyk7XG5cbiAgICBpZihyYXcubGVuZ3RoID49IDIpe1xuICAgICAgcmV0ICs9IHJhdy5zbGljZSgwLCAyKSArICctJztcbiAgICAgIHJhdyA9IHJhdy5zbGljZSgyKTtcbiAgICB9XG4gIH1cblxuICByZXQgKz0gcmF3O1xuICAkKHRoaXMpLnZhbChyZXQpO1xufVxuXG52YXIgcmVzdHJpY3ROdW1iZXJzID0gZnVuY3Rpb24oa2V5RXYpe1xuICB2YXIgY29kZSA9IGtleUV2LmtleUNvZGUgfHwga2V5RXYud2hpY2ggfHwga2V5RXYuY2hhckNvZGU7XG4gIHZhciBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKTtcbiAgaWYoaXNBbmRyb2lkKCkgJiYgY29kZSA9PSAyMjkpIHJldHVybjtcbiAgdmFyIGFsbG93ZWRDaGFycyA9IFN0cmluZyhcIjAxMjM0NTY3ODkwXCIpLnNwbGl0KCcnKTtcbiAgdmFyIGFsbG93ZWQgPSBbOSwgOTEsIDgsIDM3LCAzOCwgMzksIDQwLCAxMywgMTYsIDE3LCAxOCwgOTMsIDIwXTtcbiAgJCh0aGlzKS5yZW1vdmVFcnJvcignY2MtbnVtYmVycy1vbmx5Jyk7XG5cbiAgaWYoYWxsb3dlZC5pbmRleE9mKGNvZGUpID09IC0xICYmIGFsbG93ZWRDaGFycy5pbmRleE9mKGNoYXIpID09IC0xKXtcbiAgICBpZihrZXlFdi5wcmV2ZW50RGVmYXVsdCkga2V5RXYucHJldmVudERlZmF1bHQoKTsgZWxzZSBrZXlFdi5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICQodGhpcykuYWRkRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuICAgICQodGhpcykuc2hvd0Vycm9yKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Ly8vLyBmdW4uIGZvcm1hdGVTU05cblxudmFyIHJlc3RyaWN0Q3VycmVuY3kgPSBmdW5jdGlvbihrZXlFdil7XG4gIHZhciBjb2RlID0ga2V5RXYua2V5Q29kZSB8fCBrZXlFdi53aGljaCB8fCBrZXlFdi5jaGFyQ29kZTtcbiAgdmFyIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGUpO1xuICBpZihpc0FuZHJvaWQoKSAmJiBjb2RlID09IDIyOSkgcmV0dXJuO1xuICB2YXIgYWxsb3dlZENoYXJzID0gU3RyaW5nKFwiMDEyMzQ1Njc4OTAkLFwiKS5zcGxpdCgnJyk7XG4gIHZhciBhbGxvd2VkID0gWzksIDkxLCA4LCAzNywgMzgsIDM5LCA0MCwgMTMsIDE2LCAxNywgMTgsIDkzLCAyMF07XG4gICQodGhpcykucmVtb3ZlRXJyb3IoJ2NjLW51bWJlcnMtb25seScpO1xuXG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA9PSAtMSAmJiBhbGxvd2VkQ2hhcnMuaW5kZXhPZihjaGFyKSA9PSAtMSl7XG4gICAgaWYoa2V5RXYucHJldmVudERlZmF1bHQpIGtleUV2LnByZXZlbnREZWZhdWx0KCk7IGVsc2Uga2V5RXYucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAkKHRoaXMpLmFkZEVycm9yKCdjYy1udW1iZXJzLW9ubHknKTtcbiAgICAkKHRoaXMpLnNob3dFcnJvcigpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufS8vLy8gZnVuLiBmb3JtYXRlU1NOXG5cbnZhciBmb3JtYXRDdXJyZW5jeSA9IGZ1bmN0aW9uKGtleUV2KXtcbiAgdmFyIGNvZGUgPSBrZXlFdi5rZXlDb2RlIHx8IGtleUV2LndoaWNoO1xuICB2YXIgYWxsb3dlZCA9IFsxOTEsIDksIDgsIDM3LCAzOCwgMzksIDQwLCAxM107XG4gIGlmKGlzQW5kcm9pZCgpICYmIGNvZGUgPT0gMjI5KSByZXR1cm47XG4gIGlmKGFsbG93ZWQuaW5kZXhPZihjb2RlKSA+IC0xKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gIHZhciByZXQgPSAnJztcbiAgdmFyIHJhdyA9IHZhbC5zcGxpdCgvW1xcJHwgfFxcLF0vKS5qb2luKCcnKTtcblxuICBpZihyYXcubGVuZ3RoID4gMyl7XG4gICAgICB2YXIgYXJyID0gcmF3LnNwbGl0KCcnKTtcbiAgICAgIHZhciBzZXAgPSAxO1xuICAgICAgZm9yKHZhciB4PWFyci5sZW5ndGgtMTsgeD49MDsgeC0tKXtcbiAgICAgICAgcmV0ID0gKHNlcCAlIDMgPT0gMCA/ICcsJyA6ICcnKSArIGFyclt4XSAgKyByZXQ7XG4gICAgICAgIHNlcCsrO1xuICAgICAgfVxuICAgICAgcmV0ID0gJyQnICsgcmV0O1xuICB9XG4gIGVsc2UgaWYocmF3Lmxlbmd0aCA+IDApe1xuICAgIHJldCA9ICckJyArIHJhdztcbiAgfVxuICBlbHNle1xuICAgIHJldCA9IHJhdztcbiAgfVxuXG4gICQodGhpcykudmFsKHJldCk7XG59Ly8vLy8gZnVuLiBmb3JtYXRDdXJyZW5jeVxuXG52YXIgYW5pbWF0ZVNjcm9sbCA9IGZ1bmN0aW9uKHksIHRpbWUpe1xuXG4gICAgY2xlYXJJbnRlcnZhbChfYXBwVmFycy5zY3JvbGxJbnRlKTsvLy8vIHN0b3AgYW55c2Nyb2xsaW5nXG5cbiAgICBpZih1bmRlZmluZWQgPT09IHRpbWUpIHRpbWUgPSAxOy8vLy8gc2V0IGRlZmF1bHQgdmFsdWUgZm9yIHRpbWVcbiAgICB2YXIgZnBzID0gNjA7IC8vLy8gZnJhbWVzIHBlciBzZWNvbnNcbiAgICB2YXIgZnJhbWVUaW1lID0gTWF0aC5jZWlsKDEwMDAgLyBmcHMpO1xuICAgIHZhciBkID0gdGltZSAqIGZyYW1lVGltZTsgLy8vIG51bWJlciBvZiBmcmFtZXMgZHVyYXRpb25cbiAgICB2YXIgdCA9IDA7IC8vLy8gdGltZSB0aWNrZXIgLyBmcmFtZSBjb3VudGVyXG5cbiAgICAvLy8vIHNldCBiZWdpbiBwb2ludCB3aGloYyB0aGUgY3VycnJlbnQgcG9pbnRcbiAgICAvLyBiID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgOiB3aW5kb3cuc2Nyb2xsWTtcbiAgICB2YXIgYiA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IDA7XG4gICAgLy9cbiAgICBpZihiID09PSB1bmRlZmluZWQpe1xuICAgICAgICBiID0gMDtcbiAgICB9XG5cblxuICAgIC8vLy8gY2hlY2sgaWYgc2Nyb2xsaW5nIGRlc3RpbmF0aW9uIGlzIGJpZ2dlciB0aGFuIHBhZ2UgaGVpZ2h0IGxpbWl0c1xuICAgIHZhciBsaW1pdCA9IE1hdGgubWF4KCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgICAgZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICApO1xuICAgIGlmKHk+bGltaXQpe1xuICAgICAgICB5ID0gbGltaXQ7XG4gICAgfVxuXG4gICAgLy8vLyBzZXQgdGhlIGNoYW5nZSBiZXR3ZWVuIGN1cnJlbnQgYW5kIGRlc3RpbmF0aW9uIHBvaW50XG4gICAgYyA9IGIgLSB5O1xuXG4gICAgLy8vLyBkbyBub3RoaW5nIGlmIGRlc3RpbmF0aW9uIGlzIHNhbWUgYXMgY3VycmVudFxuICAgIGlmKE1hdGguYWJzKGMpIDwgMSkgcmV0dXJuO1xuXG4gICAgLy8vLyBzdGFydCB0aW1lIHRpY2tlclxuICAgIF9hcHBWYXJzLnNjcm9sbEludGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xuICAgICAgICAvLy8gZWFzZSBvdXQgbWF0aFxuICAgICAgICB2YXIgcGVyID0gMSAtIHQvZDtcbiAgICAgICAgdmFyIG5ld1kgPSAgLWMgKiAoMS1wZXIqcGVyKnBlcipwZXIpICsgYjtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj4+XCIsIDEtKDEtcGVyKSooMS1wZXIpKTtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIG5ld1kpO1xuXG5cbiAgICAgICAgaWYodCA9PSBkKXtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX2FwcFZhcnMuc2Nyb2xsSW50ZSk7XG4gICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignYW5pbWF0ZVNjcm9sbEVuZCcpO1xuICAgICAgICB9XG4gICAgICAgIHQrKztcblxuICAgIH0sIGZyYW1lVGltZSk7XG59Ly8vLyBmdW4uIGFuaW1hdGVTY3JvbGxcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGJvcnJvd2VyUmVhZHkpO1xudmFyIGFkZHJlc3NUZW1wbGF0ZTtcbnZhciBhZGRyZXNzSW5kZXg7XG5cblxuZnVuY3Rpb24gYm9ycm93ZXJSZWFkeSgpe1xuXG4gICAgdmFyIG15Rm9ybSA9ICQoJyNib3Jyb3dlckZvcm0nKTtcbiAgICAvKipcbiAgICAgKiBkbyBub3RoaW5nIGlmIHRoZSBmb3JtIGlzIG5vdCAjYm9ycm93ZXJGb3JtXG4gICAgICovXG4gICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pO1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxkLCBpbnZhbGlkRmllbGRzKXtcblxuICAgICAgICBpZihpc1ZhbGQpe1xuXG4gICAgICAgICAgICB2YXIgaXNDb0JvcnJvd2VyID0gIFN0cmluZygnMjM0Jykuc3BsaXQoJycpLmluZGV4T2YoICQoJyNib19hcHBseXR5cGUnKS52YWwoKSApID4gLTE7XG5cbiAgICAgICAgICAgIGlmKHRydWUgPT09IGlzQ29Cb3Jyb3dlcil7XG4gICAgICAgICAgICAgICAgbXlGb3JtLmF0dHIoJ2FjdGlvbicsICdpbmRleC1jby1ib3Jyb3dlci5odG1sJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9Ly8vIGlmIGlzVmFsaWRcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmKGludmFsaWRGaWVsZHMgJiYgdHJ1ZSA9PT0gaXNDb250aW51ZUNsaWNrZWQpe1xuICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUbyA9ICQoJyMnICsgaW52YWxpZEZpZWxkc1swXS5pZCkub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIC8vLy8gc2Nyb2xsIHRoZSBmb3JtIHRvIHRoZSBmaXJzdCBlcnJvclxuICAgICAgICAgICAgICAgIGFuaW1hdGVTY3JvbGwoc2Nyb2xsVG8tMjAsIDEpO1xuXG4gICAgICAgICAgICAgICAgaXNDb250aW51ZUNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLy8vIGlmIGlzVmFsaWQgZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IHRydWU7XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIEZpZWxkIGZvcm1hdGluZyB3aGlsZSB0eXBpbmdcbiAgICAgKi9cblxuICAgICQoJ2lucHV0LnBob25lJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdFBob25lKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRQaG9uZSlcblxuICAgICQoJ2lucHV0LmRhdGUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0RGF0ZSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0RGF0ZSk7XG5cbiAgICAkKCdpbnB1dC5udW1iZXJzJylcbiAgICAub24oJ2tleWRvd24nLCByZXN0cmljdE51bWJlcnMpXG5cbiAgICAkKCdpbnB1dC5zc24nKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0U1NOKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXRTU04pO1xuXG4gICAgJCgnaW5wdXQuY3VycmVuY3knKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0Q3VycmVuY3kpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdEN1cnJlbmN5KVxuXG5cblxuICAgICQoJyNib19ob3doZWFyJykub2ZmKCdjaGFuZ2UnKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLDEwKTtcbiAgICAgICAgdmFyIGFyciA9IFsyLDMsNCw1XTtcbiAgICAgICAgaWYoYXJyLmluZGV4T2YodmFsKSA+IC0xKXtcbiAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVEb3duKCkuZmluZCgnLmNjLWZpZWxkJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICQoJyNyZWZlcnJhbEZpZWxkJykuc2xpZGVVcCgpLmZpbmQoJy5jYy1maWVsZCcpLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZScpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAqL1xuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIGFkZHJlc3NJbmRleCk7XG5cbiAgICAkKCcjYm9fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCdpbnB1dFtuYW1lPWJvX2N1cnJlbnRseV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIHZhciByZW50Q29sID0gJCgnI21vbnRobHlSZW50Jyk7XG4gICAgICAgIHZhciBjb250YWluZXIgPSByZW50Q29sLmZpbmQoJy5jYy1maWVsZCcpLmVxKDApO1xuICAgICAgICBpZih2YWwudG9Mb3dlckNhc2UoKSA9PT0gJ3JlbnQnKXtcbiAgICAgICAgICAgIHJlbnRDb2wucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNsYXNzKCdjYy10by1iZS12YWxpZGF0ZScpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW50Q29sLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIGNvbnRhaW5lclxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdjYy12YWxpZGF0ZSBtZXNzYWdlIGVycm9yJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhZGRBdXRvQWRkcmVzcygxKTtcblxufTsvLy8vIGJvcnJvd2VyUmVhZHlcblxuXG5cbmZ1bmN0aW9uIGNoZWNrQWRkcmVzc0xlbmd0aChjb250YWluZXIsIGluZGV4KXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID4gMSA/ICcnK2luZGV4IDogJyc7XG5cbiAgICBjb250YWluZXIuZmluZCgnI2JvX3RpbWVfbW9udGgnICsgcG9zdClcbiAgICAuYXR0cignZGF0YS1hZGRyZXNzJywgaW5kZXgpXG4gICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIHYgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpLCAxMCk7XG5cbiAgICAgICAgdmFyIHllYXJzID0gcGFyc2VJbnQoJCgnI2JvX3RpbWVfeWVhcicgKyBwb3N0KS52YWwoKSwgMTApO1xuICAgICAgICB2YXIgbXlJZCA9IHBhcnNlSW50KCQodGhpcykuYXR0cignZGF0YS1hZGRyZXNzJyksIDEwKTtcbiAgICAgICAgaWYoIXYpIHYgPTA7XG4gICAgICAgIGlmKCF5ZWFycyl7XG4gICAgICAgICAgICB5ZWFycyA9IDA7XG4gICAgICAgICAgICAkKCcjYm9fdGltZV95ZWFyJyArIHBvc3QpLnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoeWVhcnMpe1xuICAgICAgICAgICAgdiArPSB5ZWFycyAqIDEyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHYgPCAyNCl7XG4gICAgICAgICAgICBhZGRBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJlbW92ZUFkZHJlc3MobXlJZCsxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBjb250YWluZXIuZmluZCgnI2JvX3RpbWVfeWVhcicgKyBwb3N0KVxuICAgIC5hdHRyKCdkYXRhLWFkZHJlc3MnLCBpbmRleClcbiAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQoJyNib190aW1lX21vbnRoJyArIHBvc3QpLnZhbCgpLCAxMCk7XG4gICAgICAgIHZhciB5ZWFycyA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIG15SWQgPSBwYXJzZUludCgkKHRoaXMpLmF0dHIoJ2RhdGEtYWRkcmVzcycpLCAxMCk7XG5cbiAgICAgICAgaWYoIXYpIHtcbiAgICAgICAgICAgIHYgPTA7XG4gICAgICAgICAgICAkKCcjYm9fdGltZV9tb250aCcgKyBwb3N0KS52YWwoMClcbiAgICAgICAgfVxuICAgICAgICBpZigheWVhcnMpIHllYXJzID0gMDtcblxuICAgICAgICBpZih5ZWFycyl7XG4gICAgICAgICAgICB2ICs9IHllYXJzICogMTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZih2IDwgMjQpe1xuICAgICAgICAgICAgYWRkQWRkcmVzcyhteUlkKzEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZW1vdmVBZGRyZXNzKG15SWQrMSk7XG4gICAgICAgIH1cbiAgICB9KVxufS8vLy8vIGZ1bi4gY2hlY2tBZGRyZXNzTGVuZ3RoXG5cbmZ1bmN0aW9uIGFkZEFkZHJlc3MobmV4dElkKXtcbiAgICBpZihuZXh0SWQgPj0gNSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmKGFkZHJlc3NJbmRleCA+PSBuZXh0SWQpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBhZGRyZXNzSW5kZXggPSBuZXh0SWQ7XG4gICAgdmFyIGFkZHJlc3MgPSAkKGFkZHJlc3NUZW1wbGF0ZS5yZXBsYWNlKC8oXFx7XFwjXFx9KS9nLCBhZGRyZXNzSW5kZXgpKTtcblxuICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkLmNjLXRvLWJlLXZhbGlkYXRlJykuYWRkQ2xhc3MoJ2NjLXZhbGlkYXRlJyk7XG4gICAgZmlsbFN0YXRlRHJvcGRvd24oIGFkZHJlc3MuZmluZCgnLnN0YXRlLWRyb3Bkb3duJykgKTtcblxuICAgIGFkZHJlc3MuZmluZCgnaW5wdXQubnVtYmVycycpLm9uKCdrZXlkb3duJywgcmVzdHJpY3ROdW1iZXJzKTtcblxuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChhZGRyZXNzLCBhZGRyZXNzSW5kZXgpO1xuXG4gICAgc2VjdGlvbi5hcHBlbmQoYWRkcmVzcyk7XG4gICAgY29uc29sZS5sb2coc2VjdGlvbi5wYXJlbnQoJ2Zvcm0nKS5oaWRlKCkpXG4gICAgYWRkQXV0b0FkZHJlc3MoYWRkcmVzc0luZGV4KTtcbiAgICAvLyB1cGRhdGVUYWJJbmRleCggJCgnI2JvcnJvd2VyRm9ybScpKVxuICAgIHVwZGF0ZVRhYkluZGV4KCAkKCcuY2MtZm9ybScpKVxuICAgIHNlY3Rpb24uc2xpZGVEb3duKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFkZHJlc3MoaWRSZW1vdmUpe1xuXG4gICAgaWYoaWRSZW1vdmUgPD0xKSByZXR1cm4gZmFsc2U7XG4gICAgaWYoaWRSZW1vdmUgPiBhZGRyZXNzSW5kZXgpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBzZWN0aW9uID0gJCgnI3ByZUFkZHJlc3MnKTtcbiAgICBmb3IodmFyIHggPSBpZFJlbW92ZTsgeDw9YWRkcmVzc0luZGV4OyB4Kyspe1xuICAgICAgICB2YXIgYWRkcmVzcyA9IHNlY3Rpb24uZmluZCgnI2FkZHJlc3NfJyArIHgpO1xuXG4gICAgICAgIGFkZHJlc3MuZmluZCgnLmNjLWZpZWxkJykucmVtb3ZlQ2xhc3MoJ2NjLXZhbGlkYXRlIGVycm9yIGNvcnJlY3QnKTtcbiAgICAgICAgYWRkcmVzcy5yZW1vdmUoKTtcbiAgICAgICAgdXBkYXRlVGFiSW5kZXgoICQoJyNib3Jyb3dlckZvcm0nKSk7XG4gICAgfVxuICAgIGFkZHJlc3NJbmRleCA9IGlkUmVtb3ZlLTE7XG4gICAgaWYoYWRkcmVzc0luZGV4IDw9IDEpIHNlY3Rpb24uc2xpZGVVcCgpXG59XG5cbmZ1bmN0aW9uIGFkZEF1dG9BZGRyZXNzKGluZGV4KXtcbiAgICB2YXIgcG9zdCA9IGluZGV4ID49IDIgPyAnJytpbmRleCA6ICcnO1xuXG4gICAgdmFyIGF1dG9jb21wbGV0ZSA9IG5ldyBnb29nbGUubWFwcy5wbGFjZXMuQXV0b2NvbXBsZXRlKFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9fYWRkcmVzcycgKyBwb3N0KSxcbiAgICAgICAge3R5cGVzOiBbJ2dlb2NvZGUnXX1cbiAgICApO1xuICAgIGF1dG9jb21wbGV0ZS5pbmRleCA9IDA7XG4gICAgYXV0b2NvbXBsZXRlLnBvc3QgPSBwb3N0O1xuXG4gICAgLy8gV2hlbiB0aGUgdXNlciBzZWxlY3RzIGFuIGFkZHJlc3MgZnJvbSB0aGUgZHJvcGRvd24sIHBvcHVsYXRlIHRoZSBhZGRyZXNzXG4gICAgLy8gZmllbGRzIGluIHRoZSBmb3JtLlxuICAgIGF1dG9jb21wbGV0ZS5hZGRMaXN0ZW5lcigncGxhY2VfY2hhbmdlZCcsIGZpbGxJbkFkZHJlc3MpO1xufVxuXG5mdW5jdGlvbiBmaWxsSW5BZGRyZXNzKCl7XG4gICAgLy8vLyB0aGlzIHJlZmVyIHRvIHRoZSBhdXRvIGNvbXBsZXRlIG9iamVjdFxuXG4gICAgdmFyIHBsYWNlID0gdGhpcy5nZXRQbGFjZSgpO1xuICAgIHZhciBjb21wb25lbnRGb3JtID0ge1xuICAgICAgICBzdHJlZXRfbnVtYmVyOiAnc2hvcnRfbmFtZScsXG4gICAgICAgIHJvdXRlOiAnbG9uZ19uYW1lJyxcbiAgICAgICAgbG9jYWxpdHk6ICdsb25nX25hbWUnLFxuICAgICAgICBhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzE6ICdzaG9ydF9uYW1lJyxcbiAgICAgICAgY291bnRyeTogJ2xvbmdfbmFtZScsXG4gICAgICAgIHBvc3RhbF9jb2RlOiAnc2hvcnRfbmFtZSdcbiAgICB9O1xuXG4gICAgdmFyIGFkZHJlc3MgPSB7fTtcbiAgICB2YXIgbG9uZ19uYW1lID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHR5cGUgPSBwbGFjZS5hZGRyZXNzX2NvbXBvbmVudHNbaV0udHlwZXNbMF07XG4gICAgICAgIHZhciBhZGRyZXNzVHlwZSA9IHR5cGU7XG5cbiAgICAgIGlmIChjb21wb25lbnRGb3JtW2FkZHJlc3NUeXBlXSkge1xuICAgICAgICB2YXIgdmFsID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldW2NvbXBvbmVudEZvcm1bYWRkcmVzc1R5cGVdXTtcbiAgICAgICAgYWRkcmVzc1thZGRyZXNzVHlwZV0gPSB2YWw7XG4gICAgICB9XG4gICAgICBpZihhZGRyZXNzVHlwZSA9PT0gJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScpe1xuICAgICAgICAgICAgbG9uZ19uYW1lID0gcGxhY2UuYWRkcmVzc19jb21wb25lbnRzW2ldWydsb25nX25hbWUnXTtcbiAgICAgICAgfVxuICAgIH0vLy8vIGZvclxuICAgIGFkZHJlc3MuYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8xX2xvbmdfbmFtZSA9IGxvbmdfbmFtZTtcblxuICAgICQoJyNib19hZGRyZXNzJyt0aGlzLnBvc3QpLnZhbChhZGRyZXNzLnN0cmVldF9udW1iZXIgKyAnICcgKyBhZGRyZXNzLnJvdXRlKS50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAkKCcjYm9fY2l0eScrdGhpcy5wb3N0KS52YWwoYWRkcmVzcy5sb2NhbGl0eSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgJCgnI2JvX3N0YXRlJyt0aGlzLnBvc3QpLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMSkudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgLy8gJCgnI3N0YXRlX2xhYmVsJyt0aGlzLnBvc3QpLnZhbChhZGRyZXNzLmFkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMV9sb25nX25hbWUpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICQoJyNib196aXAnK3RoaXMucG9zdCkudmFsKGFkZHJlc3MucG9zdGFsX2NvZGUpLnRyaWdnZXIoJ2NoYW5nZScpO1xufSIsIiQoZG9jdW1lbnQpLnJlYWR5KGNvQm9ycm93ZXJSZWFkeSk7XG52YXIgYWRkcmVzc1RlbXBsYXRlO1xudmFyIGFkZHJlc3NJbmRleDtcblxuZnVuY3Rpb24gY29Cb3Jyb3dlclJlYWR5KCl7XG5cbiAgICB2YXIgbXlGb3JtID0gJCgnI2NvQm9ycm93ZXJGb3JtJyk7XG4gICAgLyoqXG4gICAgICogZG8gbm90aGluZyBpZiB0aGUgZm9ybSBpcyBub3QgI2NvQm9ycm93ZXJGb3JtXG4gICAgICovXG4gICAgaWYobXlGb3JtLmxlbmd0aCA8PSAwKSByZXR1cm47XG5cbiAgICBhZGRyZXNzSW5kZXggPSAxO1xuXG4gICAgYWRkcmVzc1RlbXBsYXRlID0gJCgnI2FkZHJlc3NUZW1wbGF0ZScpLmh0bWwoKTtcblxuICAgIHVwZGF0ZVRhYkluZGV4KCBteUZvcm0pO1xuXG4gICAgLyoqXG4gICAgICogW2lzQ29udGludWVDbGlja2VkIGl0IHdpbGwgYmUgc2V0IHRvIHRydWUgd2hlbiBjb250aW51ZSBidXR0b24gY2xpY2tlZCBdXG4gICAgICogdGhpcyB2YXIgd2lsbCBoZWxwIGRldGVjdCBmb3JtIHN1Ym1pdCBvbiBidXR0b24gY2xpY2sgYW5kIHNjcm9sbCB1cCB0aGUgcGFnZSB0byB0aGUgZmlyc3QgZm9ybSBlcnJvclxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogaW5pdGlhbGl6ZSBmb3JtIHZhbGlkYXRpb25cbiAgICAgKi9cbiAgICBteUZvcm0udmFsaWRhdGUoZnVuY3Rpb24oaXNWYWxpZCwgaW52YWxpZEZpZWxkcyl7XG4gICAgICAgIGlmKGlzVmFsaWQpe1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfS8vLy8gaWYgaXNWYWxpZFxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYoaW52YWxpZEZpZWxkcyAmJiB0cnVlID09PSBpc0NvbnRpbnVlQ2xpY2tlZCl7XG4gICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvID0gJCgnIycgKyBpbnZhbGlkRmllbGRzWzBdLmlkKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgLy8vLyBzY3JvbGwgdGhlIGZvcm0gdG8gdGhlIGZpcnN0IGVycm9yXG4gICAgICAgICAgICAgICAgYW5pbWF0ZVNjcm9sbChzY3JvbGxUby0yMCwgMSk7XG5cbiAgICAgICAgICAgICAgICBpc0NvbnRpbnVlQ2xpY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9Ly8vLyBpZiBpc1ZhbGlkIEVsc2VcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb250aW51ZSBDbGlja1xuICAgICAqL1xuICAgICQoJyNjb250aW51ZScpLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICAgIGlzQ29udGludWVDbGlja2VkID0gdHJ1ZTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogRmllbGQgZm9ybWF0aW5nIHdoaWxlIHR5cGluZ1xuICAgICAqL1xuXG4gICAgJCgnaW5wdXQucGhvbmUnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0UGhvbmUpXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFBob25lKVxuXG4gICAgJCgnaW5wdXQuZGF0ZScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3REYXRlKVxuICAgIC5vbigna2V5dXAnLCBmb3JtYXREYXRlKTtcblxuICAgICQoJ2lucHV0Lm51bWJlcnMnKVxuICAgIC5vbigna2V5ZG93bicsIHJlc3RyaWN0TnVtYmVycylcblxuICAgICQoJ2lucHV0LnNzbicpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RTU04pXG4gICAgLm9uKCdrZXl1cCcsIGZvcm1hdFNTTik7XG5cbiAgICAkKCdpbnB1dC5jdXJyZW5jeScpXG4gICAgLm9uKCdrZXlkb3duJywgcmVzdHJpY3RDdXJyZW5jeSlcbiAgICAub24oJ2tleXVwJywgZm9ybWF0Q3VycmVuY3kpXG5cblxuXG4gICAgJCgnaW5wdXRbbmFtZT1jb19saXZlc2FtZV0nKS5vbignY2hhbmdlJywgZnVuY3Rpb24oZXYpe1xuICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSAneWVzJyl7XG5cbiAgICAgICAgICAgICQoJyNhZGRyZXNzRGl2Jykuc2xpZGVVcCgpXG4gICAgICAgICAgICAuZmluZCgnLmNjLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCBtZXNzYWdlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdG8tYmUtdmFsaWRhdGUnKVxuICAgICAgICAgICAgLmZpbmQoJyNlcnJvck1zZycpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnI3ByZUFkZHJlc3MnKS5zbGlkZVVwKCkuZW1wdHkoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgJCgnI2FkZHJlc3NEaXYnKS5zbGlkZURvd24oKVxuICAgICAgICAgICAgLmZpbmQoJy5jYy10by1iZS12YWxpZGF0ZScpXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NjLXRvLWJlLXZhbGlkYXRlJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY2MtdmFsaWRhdGUnKTtcblxuICAgICAgICAgICAgYWRkQXV0b0FkZHJlc3MoMSk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlVGFiSW5kZXgobXlGb3JtKTtcbiAgICB9KTtcblxuICAgICQoJyNiYWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24oY2Upe1xuICAgICAgICBoaXN0b3J5LmJhY2soKTtcbiAgICB9KVxuXG4gICAgLyoqXG4gICAgICogY2hlY2sgZm9yIGFkZHJlc3MgbGVuZ3RoIGNoYW5nZVxuICAgICAqL1xuICAgIGNoZWNrQWRkcmVzc0xlbmd0aChteUZvcm0sIGFkZHJlc3NJbmRleCk7XG5cbiAgICAkKCcjY29fZGVwZW5kYW50cycpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihlKXtcblxuICAgICAgICB2YXIgdiA9IHBhcnNlSW50KCQodGhpcykudmFsKCksIDEwKTtcbiAgICAgICAgdmFyIGFnZXNEaXYgPSAkKCcjZGVwZW5kZW50U2VjdGlvbicpO1xuICAgICAgICB2YXIgY29scyA9IGFnZXNEaXYuZmluZCgnLmNvbC14cy02JykuaGlkZSgpO1xuXG4gICAgICAgIGlmKHYgPiAwKXtcbiAgICAgICAgICAgIGZvcih2YXIgeD0wOyB4PHY7IHgrKyl7XG4gICAgICAgICAgICAgICAgY29scy5lcSh4KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlRG93bigpLmZpbmQoJy5jYy1maWVsZCcpLmFkZENsYXNzKCdjYy12YWxpZGF0ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBhZ2VzRGl2LnNsaWRlVXAoKS5maW5kKCcuY2MtZmllbGQnKS5yZW1vdmVDbGFzcygnY2MtdmFsaWRhdGUgZXJyb3IgY29ycmVjdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiB1cGRhdGUgY28tYm9ycm93ZXIgbmFtZVxuICAgICAqL1xuICAgIHZhciBuYW1lSG9sZGVyID0gJCgnLmNvQm9ycm93ZXJOYW1lJyk7XG4gICAgJCgnI2NvX2ZuYW1lJykub24oJ2tleXVwJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciB2YWwgPSAkLnRyaW0oICQodGhpcykudmFsKCkgKTtcbiAgICAgICAgbmFtZUhvbGRlci50ZXh0KCB2YWwgPyB2YWwgOiAnQ28tQm9ycm93ZXInKTtcbiAgICB9KVxufTsvLy8vIGJvcnJvd2VyUmVhZHlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
