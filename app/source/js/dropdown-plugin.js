(function( $ ) {
    $.extend($.expr[':'], {
        startsWith: function(elem,i,match) {
            return (elem.textContent || elem.innerText || "").toLowerCase().indexOf(match[3].toLowerCase()) == 0;
        }
    });
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