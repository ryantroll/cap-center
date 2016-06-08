(function( $ ) {
    $.fn.ccSupport = function() {
        var self = this.find('.cc-support');


        if(self.length < 1) return;

        var panel = self.find('.cc-support-panel').eq(0);
        var popup = self.find('.cc-support-popup').eq(0);
        var btn = self.find('.btn').eq(0);
        var questions = panel.find('.cc-support-questions li');
        var activeQuestion = null;

        var fields = {};

        questions.each(function(x){
            var id = $(this).attr('for');
            if(true === !!id){
                var obj = {index:x, q:$(this).find('a').eq(0).text()};
                fields[id] = obj;
            }
        });



        var togglePanel = function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            if(panel.hasClass('expanded')){
                panel.removeClass('expanded');

                questions.filter('.expanded').removeClass('expanded')
                    .find('i').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-bottom');

                setTimeout(function(){
                    btn.removeClass('out')
                }, 300)
            }//// if hasCalss
            else{
                btn.addClass('out');
                setTimeout(function(){
                    panel.addClass('expanded');
                    if(null !== activeQuestion){
                        questions.eq(activeQuestion).find('a').trigger('click');
                        activeQuestion = null;
                    }
                }, 300)
                //
            }/// if hasClass else
        }//// fun. togglePanel

        var toggleQuestion = function(e){
            if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
            var parent = $(this).parent();
            var i = parent.find('i');

            if(parent.hasClass('expanded')){
                parent.removeClass('expanded');
                i.addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-bottom');
                return;
            }
            questions.filter('.expanded').removeClass('expanded')
                .find('i').addClass('glyphicon-triangle-right').removeClass('glyphicon-triangle-bottom');

            parent.addClass('expanded');
            i.addClass('glyphicon-triangle-bottom').removeClass('glyphicon-triangle-right');

        }//// fun. toggleQuestion

        var showPopup = function(e){
            var id = $(this).attr('id');

            if(id in fields){
                popup.addClass('visible').text(fields[id].q);
                activeQuestion = fields[id].index;
            }
        }//// fun.showPopup

        var hidePopup = function(e){
            popup.removeClass('visible').text('');
        }//// fun.showPopup

        panel.find('a.close').on('click', togglePanel);
        btn.on('click', togglePanel);
        popup.on('click', togglePanel);

        panel.find('.cc-support-questions li a').on('click', toggleQuestion);

        $('input, select, textarea').on('blur', hidePopup).on('focus', showPopup);


    };//// $.fn funcion
}( jQuery ));