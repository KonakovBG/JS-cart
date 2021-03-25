$(document).ready(function(){

ready();

function ready(){
	var buttons = document.getElementsByClassName('addButton');

	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		button.addEventListener('click',addProduct);
	}
}

function addProduct(event){
	var button = event.target;

	var ShopItem = button.parentElement.parentElement;

	var itemName = ShopItem.getElementsByClassName('name')[0].innerText;

	var itemPrice = ShopItem.getElementsByClassName('price')[0].innerText;

	var itemQuantity = ShopItem.getElementsByClassName('quantity')[0].value;

	var ProductQuantity = ShopItem.getElementsByClassName('stock-left')[0].innerText;

	var ProductLeft = +ProductQuantity - +itemQuantity;

	if(quantityValidation(ShopItem) == true){
		addItemToCart(itemName,itemPrice,itemQuantity);
	}
}

function addItemToCart(name,price,quantity){
	var product = document.createElement('div');

	product.classList.add('cart_product');

	var productPrice = price*quantity;	

	product.append(name + " " + price + " " + quantity + " - " + productPrice + " lv");

	$('#content_cart').append(product);

	cartFinalPrice();	
}

function cartFinalPrice(){
	var products = document.getElementsByClassName('cart_product');

	var total = 0;

	for (var i = 0; i < products.length; i++) {
		var productPrice = products[i].innerText.split(' ');

		total = +total + +productPrice[4];
	}

	document.getElementById('cart_price-amount').innerHTML = "Final Price: " + total;
}

function quantityValidation(input){
	var stockLeft = input.getElementsByClassName('stock-left')[0].innerText;

	var itemQuantity = input.getElementsByClassName('quantity')[0].value;

	var ProductQuantity = input.getElementsByClassName('stock-left')[0].innerText;

	var ProductLeft = +ProductQuantity - +itemQuantity;

	if(+stockLeft < input.getElementsByClassName('quantity')[0].value){
		alert("Not enough product!");

		return false;
	} else{
		input.getElementsByClassName('stock-left')[0].innerText = ProductLeft;

		return true;
	}
	
}	
});