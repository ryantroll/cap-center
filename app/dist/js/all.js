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
        var progressNav = $('#progress_nav');
        var handlePorgresNavClick = function (e) {
            if (true === progressNav.hasClass('expanded')) {
                progressNav.removeClass('expanded')
                //// unbind when menu closed no need to check for click
                $('body').unbind('click', handlePorgresNavClick);
            }
            else {
                progressNav.addClass('expanded');
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
}