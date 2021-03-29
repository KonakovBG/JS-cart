$(document).ready(function(){

ready();

function ready(){
	var buttons = document.getElementsByClassName('addButton');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		button.addEventListener('click',addProduct);
	}
}

function addRemoveButtons(){
	var removeButtons = document.getElementsByClassName('removeButton-cart');
	for (var i = 0; i < removeButtons.length; i++) {
		var button = removeButtons[i];

		button.addEventListener('click',removeProduct);
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

	let itemQuantity = ShopItem.getElementsByClassName('quantity')[0].value;

	var itemImage = ShopItem.getElementsByClassName('image')[0].src;

	var productPrice = (ShopProducts[itemName].price)*itemQuantity;

	var productToAdd = {name: itemName, quantity: itemQuantity, price: productPrice, image:itemImage};

	if(ShopProducts.hasOwnProperty(itemName) === true){	
		if(itemQuantity <= ShopProducts[itemName].quantity){
			if(ifProductAlreadyAdded(itemName) === true){
				var productDiv = document.createElement('div');

				productDiv.classList.add('product_row');

				var productDivRow = `
				<tr id="product">         
		            <td class="px-6 py-4 whitespace-nowrap">
		            	<div class="text-sm text-gray-900 name" id="name-cart" width="140">${productToAdd.name}</div>
		            </td>
		            <td class="px-6 py-4 whitespace-nowrap">
		               	<div class="text-sm text-gray-900 quantity-cart" id ="quantity-cart" >${productToAdd.quantity}</div>
		            </td>
		            <td class="px-6 py-4 whitespace-nowrap">
		                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 price-cart" id="price-cart" >
		                  ${productToAdd.price}
		                </span>
		            </td>
		            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
		                <button class="text-indigo-600 hover:text-indigo-900 removeButton-cart">Remove</button>
		            </td>              
	            </tr>`;

	            productDiv.innerHTML = productDivRow;

				cart.items.push(productToAdd);

				$('#content_cart').append("",productDiv);

				$('#cart_price-amount').html("Cart: " + cartFinalPrice() + "$");

				ShopProducts[itemName].quantity = ShopProducts[itemName].quantity - itemQuantity;

				PrintPorducts();			
			} else{
				for (var i = 0; i < cart.items.length; i++) {
					if(cart.items[i].name === itemName){

						cart.items[i].quantity = Number(cart.items[i].quantity) + Number(itemQuantity);

						cart.items[i].price = cart.items[i].quantity * (ShopProducts[itemName].price);

						ShopProducts[itemName].quantity = ShopProducts[itemName].quantity - itemQuantity;

						document.getElementsByClassName('quantity-cart')[i].innerHTML = cart.items[i].quantity;

						document.getElementsByClassName('price-cart')[i].innerHTML = cart.items[i].price;

						$('#cart_price-amount').html("Cart: " + cartFinalPrice() + "$");

						PrintPorducts();
					}
				}
			}
		} else{
				alert("Not enough quantity!");

				return false;
		}							
	}
	addRemoveButtons();
}

function cartFinalPrice(){
	var total = 0;

	for (var i = 0; i < cart.items.length; i++) {
		var productPrice = cart.items[i].price;

		total = +total + +productPrice;
	}

	return total;
}

function removeProduct(event){
	var button = event.target;

	var productToRemove = button.parentElement;

	var productName = productToRemove.getElementsByClassName('name')[0].innerHTML;

	var productQuantity = productToRemove.getElementsByClassName('quantity-cart')[0].innerHTML;

	productToRemove.remove();

	for (var i = 0; i < cart.items.length; i++) {
		if(productName === cart.items[i].name){
			cart.items.splice(i,1);
		}		
	}

	ShopProducts[productName].quantity = Number(ShopProducts[productName].quantity) + Number(productQuantity);

	$('#cart_price-amount').html("Cart: " + cartFinalPrice() + "$");

	PrintPorducts();
}

function ifProductAlreadyAdded(input){
	for (var i = 0; i < cart.items.length; i++) {
		if(cart.items[i].name === input){
			return false;
		} 
	} return true;
}

});