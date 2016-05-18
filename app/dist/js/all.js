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

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));
(function( $ ) {
    $.fn.dropdown = function() {
        var dropdowns = this.filter('.cc-dropdown');


        dropdowns.each(function(x){
            var menu = $(this).find('ul').eq(0);
            var link = $(this).find('a.link').eq(0);
            var labelField = $(this).find('input[type=text]').eq(0);
            var valueField = $(this).find('input[type=hidden]').eq(0);
            var label = $(this).find('label').eq(0);
            var list = menu.find('li');
            var navI = 0;
            var navC = 0;
            var navChar = null;

            function openMenu(eventType){
                navI = -1;
                navC = -1;
                navChar = null;

                menu.find('a').off('click focus').on('click', function(item_e){
                    if(item_e.preventDefault) item_e.preventDefault(); else item_e.returnValue = false;
                    var value = $(this).attr('data-value')
                    var label = $(this).text();
                    labelField.val(label).trigger('change');
                    valueField.val(value).trigger('change');
                    menu.find('.active').removeClass('active')
                    $(this).parent().addClass('active');
                })
                .on('focus', function(item_e){
                    if(item_e.preventDefault) item_e.preventDefault(); else item_e.returnValue = false;
                    // labelField.focus();
                })

                labelField.off('keydown').on('keydown', function(item_e){
                    var code = item_e.keyCode || item_e.which;
                    // if(code !== 9){
                    //     if(item_e.preventDefault) item_e.preventDefault(); else item_e.returnValue = false;
                    // }
                    labelField.val('');
                })
                menu.scrollTop(0);

                var keyboardClicks = function(keyEv){
                    var top;
                    var code = keyEv.keyCode || keyEv.which;

                    switch(true){
                        case (code === 40): /// down arrow
                            navI = navI < list.length-1 ? navI+1 : list.length-1;
                            list.removeClass('hover');
                            list.eq(navI).addClass('hover');
                            list.eq(navI).find('a').focus(); //// in case user press enter click event will trigger

                            if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
                            break;
                        case (code === 38): //// up arrow
                            navI = navI > 0 ? navI-1 : 0;
                            list.removeClass('hover');
                            list.eq(navI).addClass('hover')
                            list.eq(navI).find('a').focus(); //// in case user press enter click event will trigger

                            if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
                            break;
                        case (code === 27): /// escape  click
                            link.trigger('click');
                            break;
                        case (code === 9): /// tab key
                            if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
                            // var next = parseInt(labelField.attr('tabindex'),10)+1;
                            // console.log(next)
                            // $('input[tabindex='+next+']').focus();
                            break;
                        case (code >= 65 && code <= 90):
                            var char = String.fromCharCode(code);
                            if(char === navChar){
                                navC++;
                            }
                            else{
                                navC = 0;
                            }
                            list.removeClass('hover');
                            var charList = list.find(':startsWith('+char+')');
                            if(navC > charList.length-1) navC = 0;
                            charList.eq(navC).trigger('focus').parent().addClass('hover');
                            navChar = char;
                            break;
                        default: break;
                    }

                }

                var handleDropClick = function(ev){

                    if (true === menu.hasClass('open')){
                        menu.removeClass('open');
                        $('body').off('click', handleDropClick);
                        list.removeClass('hover');
                        document.removeEventListener('keyup', keyboardClicks);
                    }
                    else {
                        menu.addClass('open');
                        // ev.stopPropagation();
                    }
                }
                if (false === menu.hasClass('open')) {
                    $('body').on('click', handleDropClick);
                    document.addEventListener('keyup', keyboardClicks);
                    if(eventType === 'focus'){
                        handleDropClick()
                    }
                }
            } //// fun. openMenu

            link.off('click').on('click', function(e){
                if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
                openMenu();
            })//// click

            labelField.off('focus blur').on('focus', function(e){
                if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
                openMenu('focus'); //// the focus is the event type which will tell the openMenu to open the menu without click
            })
            .on('blur', function(e){
                if(navI == -1 && navC ==-1){
                    link.trigger('click')
                }
            });
        });/// each
    };
}( jQuery ));
(function( $ ) {
    $.fn.validate = function(callback) {
        var form = this.filter('form');

        var fieldChangedAfterError = function(e){
            // self.removeClass('error')
            validateField($(this).parent())
        }

        var validateField = function(self){
            var f = self.find('input[type="text"], input[type="hidden"]').eq(0)
            var v = $.trim(f.val());
            var err = {};
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

            //// if field passed through validation show error if any
            if(true === isValidated){
                if(false === isValid){
                    self.addClass('error');
                    self.removeClass('correct');

                    var str = [];
                    for(var e in err){
                        str.push(err[e]);
                    }

                    if(str.length > 0 ){
                        var msg = $('<div class="message" id="errorMsg"><i class="icon-error glyphicon glyphicon-remove-sign"></i> ' + str.join(' | ') + '</div>').show();
                        self.append(msg);
                        self.addClass('message');
                    }
                    else{
                        //// nothting
                    }

                    f.off('keyup change', fieldChangedAfterError).on('keyup change', fieldChangedAfterError)

                    return false;
                }
                else if(true === isValid){
                    self.addClass('correct');
                    self.removeClass('error');
                    self.removeClass('message');

                    return true;
                }

            }//// if isValidated

        }//// fun. validateFild

        form.off('submit').on('submit', function(e){
            var isFormValid = true;

            form.find('.cc-field.cc-validate').each(function(n){
                var self = $(this);

                var isValid = validateField(self);

                //// false and true strictly test as null will returned is field is not validated
                if(false === isValid){
                    isFormValid = isFormValid && false;
                }


            }); /// .each

            var extra = callback(isFormValid);

            isFormValid = isFormValid && extra;

            if(true !== isFormValid){
                if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            }

        });//// .on submit
        return this;
    };
}( jQuery ));
jQuery(document).ready(ccDocumentReady);
$.extend($.expr[':'], {
    startsWith: function(elem,i,match) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf(match[3].toLowerCase()) == 0;
    }
});
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
     * Drop-down behavior
     */
    $('.cc-dropdown').dropdown();


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



}

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
        $(this).find('input[type=text]')
        .eq(0).attr('tabindex', x);
    })
}//// fun. updateTabIndex

function fillStateDropdown(selector){
    selector.each(function(x){
        var ul = $(this).find('ul');
        for(var s=0; s<usStates.length; s++){
            var li = $('<li><a href="javascript:void(0)" data-value="' + usStates[s].abbreviation + '">' + usStates[s].name + '</a></li>');
            ul.append(li);
        }//// for
    });
}

var clearPhoneFormat = function(val){
  if (val) {
    return val.split(/[\(|\)| |\-|\+|\.]/).join('');
  } else return '';
}

var formatPhone = function(val){
  var rawValue = clearPhoneFormat(val);
  var formated = '';
  if(rawValue.length > 3){
    formated += '(' + rawValue.slice(0,3) + ') ';
    rawValue = rawValue.slice(3);
  }
  if(rawValue.length > 3){
    formated += rawValue.slice(0,3) + '-';
    rawValue = rawValue.slice(3);
  }
  formated += rawValue;

  return formated;
}//// fun. formatPhone

var restrictDate = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var char = String.fromCharCode(code);
  var allowed = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 191, 9, 8, 37, 38, 39, 40, 13];

  if(allowed.indexOf(code) == -1 ){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
  }

}//// fun. formateDate

var formatDate = function(val){
  var ret = '';
  var raw = val.replace(/\//g, '');

  if(raw.length > 2){
    ret += raw.slice(0, 2) + '/';
    raw = raw.slice(2);

    if(raw.length > 2){
      ret += raw.slice(0, 2) + '/';
      raw = raw.slice(2);
    }
  }

  ret += raw;
  return ret;
}

var restrictSSN = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var char = String.fromCharCode(code);

  var allowed = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 189, 9, 8, 37, 38, 39, 40, 13];

  if(allowed.indexOf(code) == -1 ){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
  }
}//// fun. formateSSN

var formatSSN = function(val){
  var ret = '';
  var raw = val.replace(/\-/g, '');

  if(raw.length > 3){
    ret += raw.slice(0, 3) + '-';
    raw = raw.slice(3);

    if(raw.length > 2){
      ret += raw.slice(0, 2) + '-';
      raw = raw.slice(2);
    }
  }

  ret += raw;
  return ret;
}

var restrictNumbers = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var char = String.fromCharCode(code);

  var allowed = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 9, 8, 37, 38, 39, 40, 13];

  if(allowed.indexOf(code) == -1 ){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
  }
}//// fun. formateSSN

var restrictCurrency = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;
  var char = String.fromCharCode(code);

  var allowed = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 9, 8, 37, 38, 39, 40, 13];

  if(allowed.indexOf(code) == -1 ){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
  }
}//// fun. formateSSN

var formateCurrency = function(val){
    var ret = '';
    var raw = val.split(/[\$| \,]/).join('');

    // if(raw.length > 0){
    //     ret = ret + ',' + raw.slice(-3);
    //     raw = raw.split(0, raw.length-4)
    // }

    if(raw.length > 0){
      ret += '$' + raw;
    }

    return ret;
}

var dynamicPlacholder = function(selector){
  selector.find('.cc-field').each(function(x){
      var self = $(this)
      var field = self.find('input[type=text]');
      var placeholder = self.find('.placeholder');

      if(placeholder.length > 0){
        field.on('keyup', function(){
          if(field.val()){
            self.addClass('placeholder');
          }
          else{
            self.removeClass('placeholder')
          }
        })
      }

    });
}
$(document).ready(borrowerReady);
var addressTemplate;
var addressIndex;


function borrowerReady(){

    /**
     * do nothing if the form is not #borrowerForm
     */
    if($('#borrowerForm').length <= 0) return;

    addressIndex = 0;

    addressTemplate = $('#addressTemplate').html();

    updateTabIndex( $('#borrowerForm'))

    /**
     * initialize form validation
     */
    $('#borrowerForm').validate(function(isVald){
        if(isVald){
            ///// save address in cookies
            $.cookie.json = true;
            var address = {};
            address.street_address = $('#street_address').val();
            address.apt_unit = $('#apt_unit').val();
            address.city = $('#city').val();
            address.state = $('#state').val();
            address.state_name = $('#state_label').val();
            address.zip = $('#zip').val();

            $.cookie('address', address);

            var isTwo =  $('#appling_as').val() === '2';

            if(true === isTwo){
                $('#borrowerForm').attr('action', 'index-co-borrower.html');
            }

            return true;
        }
        return false;
    });


    /**
     * Field formating while typing
     */
    $('input.phone').on('keyup',function(e){
        var val = $(this).val();
        $(this).val(formatPhone(val));
    });

    $('input.date')
    .on('keydown', restrictDate)
    .on('keyup', function(){
        var val = $(this).val();
        $(this).val(formatDate(val));
    });

    $('input.numbers')
    .on('keydown', restrictNumbers)

    $('input.ssn')
    .on('keydown', restrictSSN)
    .on('keyup', function(){
        var val = $(this).val();
        $(this).val(formatSSN(val));
    });

    $('input.currency')
    .on('keydown', restrictCurrency)
    .on('keyup',function(e){
        var val = $(this).val();
        $(this).val(formateCurrency(val));
    })

    $('#know_about_us').off('change').on('change', function(e){
        var val = parseInt($(this).val(),10);
        console.log(val)
        if(val === 2){
            $('#referralField').slideDown().find('.cc-field').addClass('cc-validate');
        }
        else{
            $('#referralField').slideUp().find('.cc-field').removeClass('cc-validate')
        }
    })

    /**
     * check for address length change
     */
    checkAddressLength($('#borrowerForm'), addressIndex);

    $('#num_dependents').on('change', function(e){

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

    addAutoAddress(0);

    /**
     * Dynamic placeholder
     */
    dynamicPlacholder($('#borrowerForm'))

};//// borrowerReady



function checkAddressLength(container, index){
    var post = index > 0 ? '_'+index : '';

    container.find('#address_time_month' + post)
    .attr('data-address', index)
    .on('change', function(e){
        var v = parseInt($(this).val(), 10);

        var years = parseInt($('#address_time_year' + post).val(), 10);
        var myId = parseInt($(this).attr('data-address'), 10);
        if(!v) v =0;
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
    });


    container.find('#address_time_year' + post)
    .attr('data-address', index)
    .on('change', function(e){
        var v = parseInt($('#address_time_month' + post).val(), 10);
        var years = parseInt($(this).val(), 10);
        var myId = parseInt($(this).attr('data-address'), 10);

        if(!v) v =0;
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
    if(nextId >= 4) return false;
    if(addressIndex >= nextId) return false;

    var section = $('#preAddress');
    addressIndex = nextId;
    var address = $(addressTemplate.replace(/(\_1)/g, '_'+addressIndex));

    address.find('.cc-field').addClass('cc-validate');
    fillStateDropdown( address.find('.state-dropdown') );
    address.find('.cc-dropdown').dropdown();
    address.find('input.numbers').on('keydown', restrictNumbers);


    checkAddressLength(address, addressIndex);
    dynamicPlacholder(address);
    section.append(address);

    addAutoAddress(addressIndex);
    updateTabIndex( $('#borrowerForm'))
    section.slideDown();
}

function removeAddress(idRemove){

    if(idRemove <=0) return false;
    if(idRemove > addressIndex) return false;

    var section = $('#preAddress');
    for(var x = idRemove; x<=addressIndex; x++){
        var address = section.find('#address_' + x);

        address.find('.cc-field').removeClass('cc-validate error correct');
        address.remove();
        updateTabIndex( $('#borrowerForm'));
    }
    addressIndex = idRemove-1;
    if(addressIndex == 0) section.slideUp()
}

function addAutoAddress(index){
    var post = index > 0 ? '_'+index : '';

    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('street_address' + post),
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

    $('#street_address'+this.post).val(address.street_number + ' ' + address.route).trigger('change');
    $('#city'+this.post).val(address.locality).trigger('change');
    $('#state'+this.post).val(address.administrative_area_level_1).trigger('change');
    $('#state_label'+this.post).val(address.administrative_area_level_1_long_name).trigger('change');
    $('#zip'+this.post).val(address.postal_code).trigger('change');
}
$(document).ready(coBorrowerReady);
var addressTemplate;
var addressIndex;

function coBorrowerReady(){

    /**
     * do nothing if the form is not #coBorrowerForm
     */
    if($('#coBorrowerForm').length <= 0) return;

    addressIndex = 0;

    addressTemplate = $('#addressTemplate').html();

    updateTabIndex( $('#coBorrowerForm'));

    // $.cookie.json = true;
    // var address = $.cookie('address');

    // address = {street_address:'24 Kenter Place', apt_unit:'', state:'NJ', state_name:'New Jersey', city:'Clifton', zip:'07012'};

    /**
     * initialize form validation
     */
    $('#coBorrowerForm').validate(function(isValid){

    });

    /**
     * Field formating while typing
     */
    $('input.phone').on('keyup',function(e){
        var val = $(this).val();
        $(this).val(formatPhone(val));
    });

    $('input.date')
    .on('keydown', restrictDate)
    .on('keyup', function(){
        var val = $(this).val();
        $(this).val(formatDate(val));
    });

    $('input.numbers')
    .on('keydown', restrictNumbers)

    $('input.ssn')
    .on('keydown', restrictSSN)
    .on('keyup', function(){
        var val = $(this).val();
        $(this).val(formatSSN(val));
    });

    $('input.currency')
    .on('keydown', restrictCurrency)
    .on('keyup',function(e){
        var val = $(this).val();
        $(this).val(formateCurrency(val));
    })


    $('input[name=co_livesame]').off('change').on('change', function(ev){
        if($(this).val() === 'yes'){

            $('#addressDiv').slideUp();
            // $('#street_address').val(address.street_address);
            // $('#apt_unit').val(address.apt_unit);
            // $('#city').val(address.city);
            // $('#state').val(address.state);
            // $('#state_label').val(address.state_name);
            // $('#zip').val(address.zip);
        }
        else{
            $('#addressDiv').slideDown();

            // $('#street_address').val('');
            // $('#apt_unit').val('');
            // $('#city').val('');
            // $('#state').val('');
            // $('#state_label').val('');
            // $('#zip').val('');
        }
    });

    $('#back').on('click', function(ce){
        history.back();
    })

    /**
     * check for address length change
     */
    checkAddressLength($('#coBorrowerForm'), addressIndex);

    $('#num_dependents').on('change', function(e){

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
     * Dynamic placeholder
     */
    dynamicPlacholder($('#coBorrowerForm'))
};//// borrowerReady

// function checkAddressLength(container, index){
//     var post = index > 0 ? '_'+index : '';

//     container.find('#address_time_month' + post)
//     .attr('data-address', index)
//     .on('change', function(e){
//         var v = parseInt($(this).val(), 10);

//         var years = parseInt($('#address_time_year' + post).val(), 10);
//         var myId = parseInt($(this).attr('data-address'), 10);
//         if(!v) v =0;
//         if(!years) years = 0;

//         if(years){
//             v += years * 12;
//         }
//         if(v < 24){
//             addAddress(myId+1);
//         }
//         else{
//             removeAddress(myId+1);
//         }
//     });


//     container.find('#address_time_year' + post)
//     .attr('data-address', index)
//     .on('change', function(e){
//         var v = parseInt($('#address_time_month' + post).val(), 10);
//         var years = parseInt($(this).val(), 10);
//         var myId = parseInt($(this).attr('data-address'), 10);

//         if(!v) v =0;
//         if(!years) years = 0;

//         if(years){
//             v += years * 12;
//         }
//         console.log(v)
//         if(v < 24){
//             addAddress(myId+1);
//         }
//         else{
//             removeAddress(myId+1);
//         }
//     })
// }///// fun. checkAddressLength

// function addAddress(nextId){
//     if(nextId >= 4) return false;
//     if(addressIndex >= nextId) return false;

//     var section = $('#preAddress');
//     addressIndex = nextId;
//     var address = $(addressTemplate.replace(/(\_1)/g, '_'+addressIndex));

//     address.find('.cc-field').addClass('cc-validate');
//     fillStateDropdown( address.find('.state-dropdown') );
//     address.find('.cc-dropdown').dropdown();
//     address.find('input.numbers').on('keydown', restrictNumbers);

//     checkAddressLength(address, addressIndex)
//     section.append(address);
//     updateTabIndex( $('#coBorrowerForm'))
//     section.slideDown();
// }

// function removeAddress(idRemove){

//     if(idRemove <=0) return false;
//     if(idRemove > addressIndex) return false;

//     var section = $('#preAddress');
//     for(var x = idRemove; x<=addressIndex; x++){
//         var address = section.find('#address_' + x);

//         address.find('.cc-field').removeClass('cc-validate error correct');
//         address.remove();
//         updateTabIndex( $('#coBorrowerForm'));
//     }
//     addressIndex = idRemove-1;
//     if(addressIndex == 0) section.slideUp()
// }