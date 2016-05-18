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