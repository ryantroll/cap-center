jQuery(document).ready(ccDocumentReady);

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
            console.log('soso')
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

        function openMenu(){
            console.log('open')
             menu.find('a').off('click').on('click', function(item_e){
                if(item_e.preventDefault) item_e.preventDefault(); else item_e.returnValue = false;
                var value = $(this).attr('data-value')
                var label = $(this).text();
                labelField.val(label);
                valueField.val(value);
                menu.find('.active').removeClass('active')
                $(this).parent().addClass('active');
            })

            var handleDropClick = function(ev){
                if (true === menu.hasClass('open')){
                    menu.removeClass('open');
                    $('body').unbind('click', handleDropClick);
                }
                else {
                    menu.addClass('open');
                    ev.stopPropagation();
                }
            }
            if (false === menu.hasClass('open')) {
                $('body').bind('click', handleDropClick);
            }
        } //// openMenu

        link.off('click').on('click', function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;

           openMenu();
        })//// click


        labelField.off('focus').on('focus', function(e){
            console.log('fo')
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            $(this).trigger('blur');
            openMenu();
        });

        // label.off('click').on('click', function(e){
        //     console.log('lc')
        //     if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
        //     link.trigger('click');
        // });

    });/// each
}