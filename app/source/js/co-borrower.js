$(document).ready(coBorrowerReady);
var addressTemplate;
var addressIndex;

function coBorrowerReady(){

    /**
     * do nothing if the form is not #coBorrowerForm
     */
    if($('#coBorrowerForm').length <= 0) return;

    addressIndex = 0;

    addressTemplate = $('#addressTemplate').html();

    updateTabIndex( $('#coBorrowerForm'));

    // $.cookie.json = true;
    // var address = $.cookie('address');

    // address = {street_address:'24 Kenter Place', apt_unit:'', state:'NJ', state_name:'New Jersey', city:'Clifton', zip:'07012'};

    /**
     * initialize form validation
     */
    $('#coBorrowerForm').validate(function(isValid){

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


    $('input[name=co_livesame]').off('change').on('change', function(ev){
        if($(this).val() === 'yes'){

            $('#addressDiv').slideUp();
            // $('#street_address').val(address.street_address);
            // $('#apt_unit').val(address.apt_unit);
            // $('#city').val(address.city);
            // $('#state').val(address.state);
            // $('#state_label').val(address.state_name);
            // $('#zip').val(address.zip);
        }
        else{
            $('#addressDiv').slideDown();

            // $('#street_address').val('');
            // $('#apt_unit').val('');
            // $('#city').val('');
            // $('#state').val('');
            // $('#state_label').val('');
            // $('#zip').val('');
        }
    });

    $('#back').on('click', function(ce){
        history.back();
    })

    /**
     * check for address length change
     */
    checkAddressLength($('#coBorrowerForm'), addressIndex);

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

    /**
     * Dynamic placeholder
     */
    dynamicPlacholder($('#coBorrowerForm'))
};//// borrowerReady

// function checkAddressLength(container, index){
//     var post = index > 0 ? '_'+index : '';

//     container.find('#address_time_month' + post)
//     .attr('data-address', index)
//     .on('change', function(e){
//         var v = parseInt($(this).val(), 10);

//         var years = parseInt($('#address_time_year' + post).val(), 10);
//         var myId = parseInt($(this).attr('data-address'), 10);
//         if(!v) v =0;
//         if(!years) years = 0;

//         if(years){
//             v += years * 12;
//         }
//         if(v < 24){
//             addAddress(myId+1);
//         }
//         else{
//             removeAddress(myId+1);
//         }
//     });


//     container.find('#address_time_year' + post)
//     .attr('data-address', index)
//     .on('change', function(e){
//         var v = parseInt($('#address_time_month' + post).val(), 10);
//         var years = parseInt($(this).val(), 10);
//         var myId = parseInt($(this).attr('data-address'), 10);

//         if(!v) v =0;
//         if(!years) years = 0;

//         if(years){
//             v += years * 12;
//         }
//         console.log(v)
//         if(v < 24){
//             addAddress(myId+1);
//         }
//         else{
//             removeAddress(myId+1);
//         }
//     })
// }///// fun. checkAddressLength

// function addAddress(nextId){
//     if(nextId >= 4) return false;
//     if(addressIndex >= nextId) return false;

//     var section = $('#preAddress');
//     addressIndex = nextId;
//     var address = $(addressTemplate.replace(/(\_1)/g, '_'+addressIndex));

//     address.find('.cc-field').addClass('cc-validate');
//     fillStateDropdown( address.find('.state-dropdown') );
//     address.find('.cc-dropdown').dropdown();
//     address.find('input.numbers').on('keydown', restrictNumbers);

//     checkAddressLength(address, addressIndex)
//     section.append(address);
//     updateTabIndex( $('#coBorrowerForm'))
//     section.slideDown();
// }

// function removeAddress(idRemove){

//     if(idRemove <=0) return false;
//     if(idRemove > addressIndex) return false;

//     var section = $('#preAddress');
//     for(var x = idRemove; x<=addressIndex; x++){
//         var address = section.find('#address_' + x);

//         address.find('.cc-field').removeClass('cc-validate error correct');
//         address.remove();
//         updateTabIndex( $('#coBorrowerForm'));
//     }
//     addressIndex = idRemove-1;
//     if(addressIndex == 0) section.slideUp()
// }