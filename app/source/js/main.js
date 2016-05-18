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
        var ul = $(this).find('select');
        for(var s=0; s<usStates.length; s++){
            var li = $('<option value="' + usStates[s].abbreviation + '">' + usStates[s].name + '</option>');
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