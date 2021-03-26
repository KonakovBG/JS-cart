$(document).ready(function(){

ready();

function ready(){
	var buttons = document.getElementsByClassName('addButton');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		button.addEventListener('click',addProduct);
	}
}

var ShopProducts = {
	Apple: {name:'Apple', price:2, quantity:15},
	Pear: {name:'Pear', price:3, quantity:47},
	Grape: {name:'Grape', price:5, quantity:25},
};

const cart = { items: []};

PrintPorducts();

function PrintPorducts(){
	var productsLength = Object.entries(ShopProducts).length;

	for (var i = 0; i < productsLength; i++) {
		document.getElementsByClassName('name')[i].innerHTML = Object.entries(ShopProducts)[i][1].name;

		document.getElementsByClassName('price')[i].innerHTML = Object.entries(ShopProducts)[i][1].price;
		
		document.getElementsByClassName('stock-left')[i].innerHTML = Object.entries(ShopProducts)[i][1].quantity;
	}
	return true;
}

function addProduct(event){
	var button = event.target;

	var ShopItem = button.parentElement.parentElement;

	var itemName = ShopItem.getElementsByClassName('name')[0].innerText;

	var itemQuantity = ShopItem.getElementsByClassName('quantity')[0].value;

	var productPrice = (ShopProducts[itemName].price)*itemQuantity;

	var productToAdd = {name: itemName, quantity: itemQuantity, price: productPrice};

	if(ShopProducts.hasOwnProperty(itemName) === true){	
		if(itemQuantity <= ShopProducts[itemName].quantity){
			var productDiv = document.createElement('div');

			productDiv.classList.add('product_row');

			cart.items.push(productToAdd);

			productDiv.append(Object.values(productToAdd));

			$('#content_cart').append("",productDiv);

			$('#cart_price-amount').html("Cart: " + cartFinalPrice() + "$");

			ShopProducts[itemName].quantity = ShopProducts[itemName].quantity - itemQuantity;

			PrintPorducts();			
		}else{
			alert("Not enough quantity!");

			return false;
		}
				
	}

	cartFinalPrice();
}

function cartFinalPrice(){
	var total = 0;

	for (var i = 0; i < cart.items.length; i++) {
		var productPrice = cart.items[i].price;

		total = +total + +productPrice;
	}

	return total;
}


});