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
