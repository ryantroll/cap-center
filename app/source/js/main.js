/**
 * [_appGlobal Namespace for global variables]
 * this will define a protect name space for global variable to prvent any conflect with local variables
 */
var _appGlobal = {};
_appGlobal.urlEmailExistsAPI = "api-response/is-email-exists.json";
_appGlobal.urlAuthenticationAPI = "api-response/authentication.json";
_appGlobal.urlApplicationsListAPI = "api-response/applications-list.json";

_appGlobal.urlSaveTemplate = "template-save.html";
_appGlobal.saveModal = null;

_appGlobal.urlApsListTempalte = "template-applications.html"
_appGlobal.appsListModal = null;

jQuery(document).ready(ccDocumentReady);

function ccDocumentReady(){
    /**
     * Progress navigation mobile behavior
     */
    $('#progress_switch').on('click', function(ev){
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
     * Hamburger menu button mobile behavior
     */
    $('#menu_switch').on('click', function(ev){
        var self = $(this);
        var menuNav = $('#menu_nav');
        var handleMenuNavClick = function (e) {
            if (true === menuNav.hasClass('expanded')) {
                menuNav.removeClass('expanded');
                self.removeClass('expanded');
                //// unbind when menu closed no need to check for click
                $('body').unbind('click', handleMenuNavClick);
            }
            else {
                menuNav.addClass('expanded');
                self.addClass('expanded');

            }
        };

        if (false === menuNav.hasClass('expanded')) {
            $('body').bind('click', handleMenuNavClick);
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
      * Start Support
      */
     $(document).ccSupport();


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
        self.find('a.close, a.dismiss').on('click', function(e){
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

    /**
     * Set multi checkbox
     */
    multiCheckbox();

    /**
     * Set arrow label behavior for <select>
     */
    dropdownLabel();


    /**
     * Back button click handlers
     */
    $('#back').on('click', function(ev){
        if(ev.preventDefault) ev.preventDefault(); else ev.returnValue = false;
        history.back();
    });


    /**
     * Loas Save or login external later template
     */
    $('.saveBtn').hide();//// hide until template is loaded
    $.ajax({
      url: _appGlobal.urlSaveTemplate,
      method:'GET',
      error:function(err){
        console.log(err);
      },
      success: function(ret){
        _appGlobal.saveModal = $(ret);

        initializeSaveModal();
      }
    });

    /**
     * Load applications list template
     */
    $.ajax({
      url: _appGlobal.urlApsListTempalte,
      method:'GET',
      error:function(err){
        console.log(err);
      },
      success: function(ret){
        _appGlobal.appsListModal = $(ret);

        $('body').append(_appGlobal.appsListModal)
      }
    });

    $('#myAppsBtn').on('click', function(e){
      if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
      showApplicationsList();
    })

}//// fun. ccDocumentReady


/**
 * [initializeSaveModal will be called to initialize the save for later form after it loaded from ajax]
 * and set the click event for 'Save for Later' button
 */
function initializeSaveModal(){
  if(false === !!_appGlobal.saveModal) return;

  $('body').append(_appGlobal.saveModal);

  yesNoRadio(_appGlobal.saveModal);

  updateTabIndex(_appGlobal.saveModal.find('#login'), 100)
  updateTabIndex(_appGlobal.saveModal.find('#register'), 120)

  _appGlobal.saveModal.find('form#loginForm').validate(function(isValid, invalidFields){
      return false;
  });
  _appGlobal.saveModal.find('form#registerFrom').validate(function(isValid, invalidFields){
    return false;
  });

  _appGlobal.saveModal.find('input.phone')
  .on('keydown', restrictPhone)
  .on('keyup', formatPhone)

  _appGlobal.saveModal.find('input[name=save_login]').on('change', function(){
    var val = $(this).val();
    if(true === !!$(this).attr('checked') && val === 'login'){
      _appGlobal.saveModal.find('#login').show();
      _appGlobal.saveModal.find('#register').hide();
    }
    else{
      _appGlobal.saveModal.find('#login').hide();
      _appGlobal.saveModal.find('#register').show();
    }
    _appGlobal.overlay.adjust();
  })

  $('.saveBtn').show().on('click', function(e){
    if(e.preventDefault) e.preventDefault(); else e.returnValue = false;
    overlay({
      selector:"#saveModal"
    });////overlay
    return false;
  });
}//// fun. initializeSaveModal

/**
 * [showApplicationsList shows user saved application modal the modal is loaded from external template]
 */
function showApplicationsList(){
    overlay({
        selector:'#appsList',
        onBeforeLoad:function(){
            loadApplications();
        },
        onBeforeClose:function(){
            $('#appsHolder').empty();
        }
    });
}//// fun. showApplicationsList

/**
 * [loadApplications load the list of previously saved applications and display them inside form]
 * This function use extra template that is saved as <script> tag inside the modal external HTML to display the applications rows
 * @return {[type]} [none]
 */
function loadApplications(){
    _appGlobal.appsListModal.addClass('busy');

    var template = _appGlobal.appsListModal.find('#appTemplate').eq(0).text();
    var appsHolder = _appGlobal.appsListModal.find('#appsHolder').eq(0);

    var data = {};
    data.email = $.trim( $('#login_email').val() );
    data.userId = '0000000';

    $.ajax({
        url:_appGlobal.urlApplicationsListAPI,
        data:data,
        method:"post",
        dataType:"json",
        error:function(err){
            console.log(err);
        },
        success:function(ret){
            if(Array.isArray(ret)){
                var x;
                for(x=0; x<ret.length; x++){
                    var obj = ret[x];
                    var row = template;

                    for(label in obj){
                        var regex = new RegExp('\{\#' + label + '\}', 'g');
                        row = row.replace( regex , obj[label]);
                    } /// for
                    row = $(row);
                    row.find('a').on('click', function(){
                        _appGlobal.appsListModal.find('a.close').trigger('click')
                    })
                    appsHolder.append(row);
                }/// for

                /**
                 * Wait for some time for accurate width and height reading
                 * @param  {[type]} ){                               _appGlobal.overlay.adjust();                  _appGlobal.appsListModal.removeClass('busy');                } [description]
                 * @param  {[type]} 200 [description]
                 * @return {[type]}     [description]
                 */
                setTimeout(function(){
                  _appGlobal.overlay.adjust();
                  _appGlobal.appsListModal.removeClass('busy');
                }, 200)


            }//// if
        }//// success
    });
}//// fun. loadApplications


/**
 * [mainScroll Window scroll event hanlder to make progress header sticky on mobile]
 */
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


/**
 * [updateTabIndex Willl update the tab index of from fields found inside the selector passed]
 * @param  {[jQuery]} selector  [used to locate the fields inside it]
 * @param  {[int]} startFrom [number to start the tab index from if not passed 0 will be used, useful when page has muliple forms]
 */
function updateTabIndex(selector, startFrom){
  var x = startFrom || 0;

    selector.find('.cc-field').each(function(i){
        var s = $(this).find('input[type=text], input[type=password], input[type=email], input[type=date], input[type=tel], input[type=radio], input[type=checkbox], input[type=number], textarea, select')
        s.each(function(z){
          $(this).attr('tabindex', x+1);
          x++;
        })
    })
}//// fun. updateTabIndex

/**
 * [yesNoRadio Will set the behavior of yes/no radio buttons by adding .checked class to the label of the button]
 * the function assume the input[type=radion] is included inside <label> tag
 */
function yesNoRadio(container){
  //// if container is passed find the radios inside it or do a document global find
  var radios = !!container ? container.find('.radio-yesno input[type=radio]') : $('.radio-yesno input[type=radio]');
  radios.on('change', function(e){
    if($(this).attr('checked')){
      $(this).parent().parent().find('label.checked').removeClass('checked');
      $(this).parent().addClass('checked').removeClass('focus');
    }
    else{
      $(this).parent().removeClass('checked');
    }
  })
  .on('focus', function(e){
    $(this).parent().addClass('focus');
  })
  .on('blur killfocus', function(e){
    $(this).parent().removeClass('focus');
  });

  /**
   * Trigger change to set the right appearance when form is pre-loaded with data
   */
  radios.trigger('change');//// this to set the initial state
}

function multiCheckbox(){
  var radios = $('.cc-checkbox input[type=checkbox]').on('change', function(e){
    if($(this).attr('checked')){
      // $(this).parent().parent().find('label.checked').removeClass('checked');
      $(this).parent().addClass('checked').removeClass('focus');
      $(this).parent().find('i').addClass('glyphicon glyphicon-ok');
    }
    else{
      $(this).parent().removeClass('checked');
      $(this).parent().find('i').removeClass();
    }
  });
  /**
   * Trigger change to set the right appearance when form is pre-loaded with data
   */
  radios.trigger('change');
}//// fun. multiCheckBox

/**
 * [dropdownLabel Set the click event for arrow label for <select> element]
 * this solution works only safari and chrome due to browser limitation
 */
function dropdownLabel(container){
  var labels = container ? container.find('.cc-dropdown label.arrow') : $('.cc-dropdown label.arrow');
  labels.on('click', function(){
      var id = $(this).attr('for');
      if(false === !!id) return;
      var field = document.getElementById(id);
      var event = new MouseEvent('mousedown');
      field.dispatchEvent(event);
    })
}//// fun. dropdownLabel

/**
 * [fillStateDropdown will fill the dropdon of USA states form usState variable]
 * @param  {[type]} selector [jQuery object that contain <select> tag to be filled]
 * usSate is array of object defined in us-status.js file
 */
function fillStateDropdown(selector){
    selector.each(function(x){
        var ul = $(this).find('select');
        for(var s=0; s<usStates.length; s++){
            var li = $('<option value="' + usStates[s].abbreviation + '">' + usStates[s].name + '</option>');
            ul.append(li);
        }//// for
    });
}//// fun. fillStateDropdown

/**
 * [isAndroid simple function to detect Android OS]
 * this function is used to detect the bug in Android when keydown, keyup event doesn't send the right key code
 * @return {Boolean} [true if Android OS]
 */
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

var formatCardDate = function(keyEv){
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

    // if(raw.length >= 2){
    //   ret += raw.slice(0, 2) + '/';
    //   raw = raw.slice(2);
    // }
  }

  ret += raw;
  $(this).val(ret);
}//// fun. formatCardDate

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
  $(this).removeError('cc-numbers-only').hideError();

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
  $(this).removeError('cc-numbers-only').hideError();

  if(allowed.indexOf(code) == -1 && allowedChars.indexOf(char) == -1){
    if(keyEv.preventDefault) keyEv.preventDefault(); else keyEv.returnValue = false;
    $(this).addError('cc-numbers-only').showError();
    return false;
  }
}//// fun. formateSSN

var formatCurrency = function(keyEv){
  var code = keyEv.keyCode || keyEv.which;

  var allowed = [191, 9, 37, 38, 39, 40, 13];
  if(isAndroid() && code == 229) return;
  if(allowed.indexOf(code) > -1) return;

  var val = $(this).val();
  var ret = '';
  var raw = val.split(/[\$| |\,]/).join('');

  if(raw.length > 3){
      var arr = raw.split('');
      var sep = 1;
      for(var x=arr.length-1; x>=0; x--){
        //// add reading comma after 3 digits and only if there is next digit
        ret = (sep % 3 == 0 && true === !!arr[x-1]? ',' : '') + arr[x]  + ret;
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

    clearInterval(_appGlobal.scrollInte);//// stop anyscrolling

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
    _appGlobal.scrollInte = setInterval(function(){
        /// ease out math
        var per = 1 - t/d;
        var newY =  -c * (1-per*per*per*per) + b;

        // console.log(">>", 1-(1-per)*(1-per));
        window.scrollTo(0, newY);


        if(t == d){
            clearInterval(_appGlobal.scrollInte);
            $(window).trigger('animateScrollEnd');
        }
        t++;

    }, frameTime);
}//// fun. animateScroll

function overlay(o){
    // add a background to overlay
    var w = $(document).width();
    var h = $(document).height();

    /// cassh the overlay Div
    var overlayDiv = $(o['selector']);

    this.closeOverlay= function(){
        // remove keypress event lisnter
        $(window).off('keypress');

        if(o.onBeforeClose) o.onBeforeClose();

        // hide the maks and overlay
        overlayDiv.hide();

        $('#overlayMask').remove();
        overlayDiv.find('a.close').off('click');
        delete _appGlobal.overlay;
    };

    /**
     * [adjust set the top and left position of overlayed div to be centered
     */
    this.adjust = function(){
      var windowW = $(window).width();
      var windowH = $(window).height();
      var l = (windowW - overlayDiv.outerWidth() ) / 2;
      var t = (windowH - overlayDiv.height() ) / 2;

      if(t<0) t = 0;

      if(windowW < 768){
        l = 0; /// if mobile make it cover all screen
        t = 0;
      }
      else{
        //// if not mobile make sure the the max height is set if height is bigger than window height
        if(windowH < overlayDiv.height()){
          overlayDiv.css('max-height', windowH - 20)
        }
      }
      console.log(overlayDiv.outerWidth())
      overlayDiv.css('margin-left', '-'+(overlayDiv.outerWidth()/2)+'px').css('left', '50%').css('top', t+'px');
    }//// fun. adjust

    $('body').append('<div id="overlayMask" style="top:0; right:0; bottom:0; left:0; position:fixed; background-color:#000; z-index:9998; top:0px; left:0px;"></div>');
    // $('body').append('<div id="overlayMask" style="width:'+ w +'px; height:'+ h +'px; position:absolute; background-color:#000; z-index:9998; top:0px; left:0px;"></div>');
    var mask = $('#overlayMask');
    mask.addClass("fadeto90").css("opacity", '0.6');

    // assing click to close
    mask.on('click', function(){
        closeOverlay();
    });

    // append the close button
    // if(overlayDiv.find('.close').length<=0){
    //     overlayDiv.append('<a href="javascript:void(0);" class="close icon-close close-overlay"><a/>');
    // }
    overlayDiv.find('.close').css('z-index', 1001);

    overlayDiv.find('.close-overlay').on('click', function(){
        closeOverlay();
    });

    if(o.onBeforeLoad) o.onBeforeLoad();

    overlayDiv.css('z-index','9999').removeClass('fadein').show().addClass('fadein');

    /**
     * Center the overlay div
     */
    this.adjust();

    if(o.onAfterLoad) o.onAfterLoad();

    /// add listener for Esc key
    $(window).on('keypress', function(k){
        if(k.keyCode && k.keyCode == 27) closeOverlay();
    });

    /////// set reference in application variables
    _appGlobal.overlay = this;

    return this;
}// end of fun. overlay

/**
 * [resetFields will search for input field inside a container and rest its value and any error status]
 * @param  {[type]} container [jQueyr object that should contain input filed that need be reset]
 */
var resetFields = function(container){
  var fields = container.find('input, select, textarea');

  fields.each(function(x){
    var type = $(this).attr('type');
    if(type === 'radio'){
      $(this).removeAttr('checked');
      $(this).parent().filter('label').removeClass('checked');
    }
    else{
      $(this).val('');
    }
    $(this).hideError();
  });

}//// fun. resetFields

/**
 * [includeFields will add hidden fields in form and set the right validation]
 * @param  {Object} options should have 2 properties as below
 * options.selector a string that passed to jQuery to select the section need to be included e.g. ".new-fields", "#clodingDate"
 * options.validationClass a string that passed to jQuery to identify the .cc-field that need to be include in validation
 * @return {[type]}         [description]
 */
var includeFields = function(options){
  if(!options.selector || !options.validationClass) return false;

  var fields = $(options.selector);
  fields.find(options.validationClass).addClass('cc-validate');
  fields.slideDown();

}

/**
 * [excludeFields will exclude fields from form and set remove the validation]
 * @param  {Object} options should have 2 properties as below
 * options.selector a string that passed to jQuery to select the section need to be excluded
 * options.validationClass a string that passed to jQuery to identify the .cc-field that need to be excluded from validation
 */
var excludeFields = function(options){
  if(!options.selector || !options.validationClass) return false;

  var fields = $(options.selector);
  fields.find(options.validationClass).removeClass('cc-validate');
  resetFields(fields);
  fields.slideUp();
}

/**
 * [addAutoAddress will add address type ahead functionality to text field with id 'bo_address']
 * @param {[type]} index [in multi-address case this variable will tel the function which address to bind the type ahead to]
 */
function addAutoAddress(index, startFrom1){
    var post = index >= 2 || true === startFrom1 ? ''+index : '';

    var autocomplete = new google.maps.places.Autocomplete(
        // document.getElementById('bo_address' + post),
        $('.typeahead_address' + post).filter('input')[0],
        {types: ['geocode']}
    );
    //// set the address index and post in autocomplete object to be used in fillInAddress function
    autocomplete.index = 0;
    autocomplete.post = post;

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

/**
 * [fillInAddress will update the address city, stat, and zip filed after user select address form type ahead]
 * this inside this function will reference google autocompete object
 * @return {[null]} [description]
 */
function fillInAddress(){
    //// this refer to the auto complete object

    var place = this.getPlace();

    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        administrative_area_level_2: 'long_name',
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

    $('.typeahead_address'+this.post).eq(0).val(address.street_number + ' ' + address.route).trigger('change');
    $('.typeahead_city'+this.post).eq(0).val(address.locality).trigger('change');
    $('.typeahead_state'+this.post).eq(0).val(address.administrative_area_level_1).trigger('change');
    $('.typeahead_county'+this.post).val(address.administrative_area_level_2).trigger('change');
    $('.typeahead_zip'+this.post).eq(0).val(address.postal_code).trigger('change');
}
