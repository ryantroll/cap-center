(function( $ ) {
    $.fn.validate = function() {
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
                var regx = /^\d*$/;
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

            if(true === isValidated){
                self.find('#errorMsg').remove();
                if(false === isValid){
                    self.addClass('error');
                    self.removeClass('correct');

                    var str = ''
                    for(var e in err){
                        str += err[e]+'<br>';
                    }
                    if('' !== str ){
                        var msg = $('<div class="message" id="errorMsg">' + str + '</div>').show();
                        self.append(msg);
                    }

                    f.off('keyup change').on('keyup change', fieldChangedAfterError)
                }
                else if(true === isValid){
                    self.addClass('correct');
                    self.removeClass('error');
                }
                return isValid;
            }//// if isValidated

        }//// fun. validateFild

        form.off('submit').on('submit', function(e){

            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;

            form.find('.cc-field').each(function(n){
                var self = $(this);

                var isValid = validateField(self);

                //// false and true strictly test as null will returned is field is not validated

            });

        })
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
     * initialize form validation
     */
    $('#borrowerForm').validate();

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
     * Drop-down behavior
     */
    $('.cc-dropdown').each(function(x){
        var menu = $(this).find('ul').eq(0);
        var link = $(this).find('a.link').eq(0);
        var labelField = $(this).find('input[type=text]').eq(0);
        var valueField = $(this).find('input[type=hidden]').eq(0);
        var label = $(this).find('label').eq(0);
        var list = menu.find('li');
        var navI = 0;
        var navC = 0;
        var navChar = null;

        function openMenu(){
            navI = -1;
            navC = -1;
            navChar = null;

            menu.find('a').off('click').on('click', function(item_e){
                if(item_e.preventDefault) item_e.preventDefault(); else item_e.returnValue = false;
                var value = $(this).attr('data-value')
                var label = $(this).text();
                labelField.val(label).trigger('change');
                valueField.val(value).trigger('change');
                menu.find('.active').removeClass('active')
                $(this).parent().addClass('active');
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

                        // top = list.eq(navI).position().top;
                        // console.log(navI, top, menu.height(), menu.scrollTop())
                        // if(top > menu.height() - menu.scrollTop() ){
                        //     menu.scrollTop( menu.scrollTop() + list.eq(navI).height() )
                        // }

                        if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
                        break;
                    case (code === 38): //// up arrow
                        navI = navI > 0 ? navI-1 : 0;
                        list.removeClass('hover');
                        list.eq(navI).addClass('hover')
                        list.eq(navI).find('a').focus(); //// in case user press enter click event will trigger
                        // top = list.eq(navI).position().top;
                        // if(top < 0){
                        //     menu.scrollTop(menu.scrollTop() + top)
                        // }
                        if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
                        break;
                    case (code === 27): /// escape  click
                        link.trigger('click');
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
                    ev.stopPropagation();
                }
            }
            if (false === menu.hasClass('open')) {
                $('body').on('click', handleDropClick);
                document.addEventListener('keyup', keyboardClicks)
            }
        } //// openMenu

        link.off('click').on('click', function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;

           openMenu();
        })//// click


        labelField.off('focus').on('focus', function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            $(this).trigger('blur');
            openMenu();
        });
    });/// each

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
     * Field formating while typing
     */
    $('input.phone').on('keyup',function(e){
        var val = $(this).val();
        $(this).val(formatPhone(val));
    })
    // $('input.date').on('blur',function(e){
    //     var val = $(this).val();
    //     $(this).val(formatDate(val));
    // })
    //
    $('#address_time').on('change', function(e){
        var v = parseInt($(this).val(), 10);
        var length = $('#address_length').val();
        console.log(length)
        if(length == 'y'){
            v *= 12;
        }

        if(v >= 24){
            $('#preAddress0').slideDown();
        }
        else{
            $('#preAddress0').slideUp();
        }
    })
    //
    $('#address_length').on('change', function(e){
        var v = parseInt($('#address_length').val(), 10);
        var length = $(this).val();

        if(length == 'y'){
            v *= 12;
        }

        if(v >= 24){
            $('#preAddress0').slideDown();
        }
        else{
            $('#preAddress0').slideUp();
        }
    })

    $('#num_dependents').on('change', function(e){

        var v = parseInt($(this).val(), 10);
        var agesDiv = $('#dependentSection');
        var cols = agesDiv.find('.col-xs-6').hide();

        if(v > 0){
            for(var x=0; x<v; x++){
                cols.eq(x).show();
            }
            agesDiv.slideDown();
        }
        else{
            agesDiv.slideUp();
        }
    })

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

var formatDate = function(val){
  var ret = '';
  val = new Date(val);

  var m = val.getMonth()+1;
  var d = val.getDate();
  var y = val.getFullYear();

  ret += (m<10 ? '0' : '') + m + '/';
  ret += (d<10 ? '0' : '') + d + '/';
  ret += y;

  return ret;
}