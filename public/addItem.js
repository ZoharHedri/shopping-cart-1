

var addProduct = function (name, price, src) {
    console.log('Im in add product');

    var newProduct = '<div class="col-md-4"> '
        + '<div class="card-container"> '
        + '<div class="card item" item data-name="' + name + '" data-price="' + price + '"> '
        + '<div class="pricebox"> '
        + '<p class="price"> $' + price + '</p>'
        + '  </div><div class="buybox"> <p class="add-to-cart"> ADD TO CART </p> </div>'
        + '<div class="card-inner">'
        + ' <img src="' + src + '" class="proimage">'
        + '  <img  class="proimage"> </div>  </div> </div> </div> ';

    $('.container').append(newProduct);

}

$('#AddBtn').click(function () {
    //checking the values of all the fields
    var name = $('#name').val();
    var src = $('#src').val();
    var price = $('#price').val();

    var checkAllFill = true;
    //checking price
    if (price === '') {
        checkAllFill = false;
        $('#price').css('border-color', 'red');
    }
    else $('#price').css('border-color', 'gray');
    //checking name
    if (name === '') {
        checkAllFill = false;
        $('#name').css('border-color', 'red');
    }
    else $('#name').css('border-color', 'gray');
    //checking src
    if (src === '') {
        checkAllFill = false;
        $('#src').css('border-color', 'red');
    }
    else $('#src').css('border-color', 'gray');

    // all fields are filled
    if (checkAllFill) {
        var productArray = $('.container').find('.card.item');
        // check if the product name is already exist - then display error message
        // otherwise - add the product to the page
        for (var i = 0; i < productArray.length; i++){
            if (productArray[i].dataset.name === name) {
                // empty the input of name and display error message
                $('#name').val('');
                $("#msgError").css("display", "block").fadeOut(4000);
                return;
            }
        }

        // when all is o.k
        addProduct(name, price, src);
        //
        $('#name').val('');
        $('#src').val('');
        $('#price').val('');
    }

});


$('.view-form').on('click', function () {
    // hide/show the form of adding new product
    $('.addProduct-form').toggleClass('show');
});


// When plus-menu is clicked
$('.plus').on('click', function () {
    $('.addProduct-form').toggleClass('show');
});