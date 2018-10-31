
//cart-branch

//npm install -g nodemon -> automatically restart node when code change is saved
//nodemon server

var ShoppingCart = function () {

  // an array with all of our cart items
  var cart = [];

  var _findIndex = function(name){ 
    for(var i in cart){
      if(name === cart[i].name)
        return i;
    }
    
    return -1;
  }

  var updateCart = function () {
    // TODO:
    //Write this function. In this function we render the page.
    //Meaning we make sure that all our cart items are displayed in the browser.
    //Remember to empty the "cart div" before you re-add all the item elements.
    $('.cart-list').empty();

    var totalPirce = 0;

    for(var i in cart){
       var trash = '<a role="button" class="remove-item" data-id=' + i + '> <i class="fa fa-trash"></i> </a> </p>';
      if(cart[i].amount !== 1){
        $('.cart-list').append('<p class="cart-item"> ' + cart[i].name + ' (' + cart[i].amount + ')' +
        ' - $' + cart[i].price + trash + '</p>');
      }
      else{
        $('.cart-list').append('<p class="cart-itme">' + cart[i].name + ' - $' + cart[i].price + trash + '</p>');
      }

      totalPirce += cart[i].price * cart[i].amount;
    }//for
    $('.total').text(totalPirce); //text() set the text content of the selected element

  }//Done - updateCart func


  var addItem = function (clickedItem) {
    // TODO:
    //Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    
    console.log(clickedItem.data()); //the data in the card
    var index = _findIndex(clickedItem.data().name)
    if (index !== -1){
      cart[index].amount++;

    } else {
      var item = {
        name: clickedItem.data().name,
        price: clickedItem.data().price,
        amount: 1
      }//item obj

      console.log("new item added:\nName- " + item.name + " Price- " + item.price + " Amount- " + item.amount)
      cart.push(item);
    }//else
    
  }//Done - addItem func


  var removeItem = function(item){
    if(cart[item] === 1)
      cart.splice(item,1);
    else
    cart[item].amount--;
  }//Done



  var clearCart = function () {
    // TODO:
    //Write a function that clears the cart ;-)
    $('.total').text(0); // set back the total to $ 0
    cart.length = 0;     // clear all the cart array
    $('.cart-list').empty(); // clear the cartlist from page
  }//Done
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    removeItem: removeItem
  }
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO:  hide/show the shopping cart!
  //when press on 'view-cart' i add 'shopping-cart' to him and by "toggleClass" i can show ro remove
  $('.shopping-cart').toggleClass('show');
});//Done

//listen to all 6 items
$('.add-to-cart').on('click', function () {
  // TODO:  get the "item" object from the page
  
  var $clickedItem = $(this).closest('.card.item');
  //console.log($clickedItem[0]);
  //dataset: {name: "glass", price: "68"} => dataset.name + dataset.price
  //console.log($clickedItem[0].dataset.name + " "+ $clickedItem[0].dataset.price); //good!
  
  app.addItem($clickedItem);
  app.updateCart();
});//Done


//remove 1 amount at a time and not all the the item 
$('.cart-list').on('click', '.remove-item' ,function(){
  var itemToRemove = $(this).data().id; //get the id of the item i want to remove
  app.removeItem(itemToRemove);
  app.updateCart();
});


$('.clear-cart').on('click', function () {
  app.clearCart();
});