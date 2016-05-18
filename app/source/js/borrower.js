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