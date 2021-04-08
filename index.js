$(document).ready(function(){

var vm = new Vue({
	el: '#app',
	data: {
		products: [
			{
				id:1,				
				name:'Apple',
				price:2,
				quantity:15,
				stock: 0			
			},
			{	id:2,			
				name:'Pear',
				price:3,
				quantity:47,
				stock: 0,
			},
			{
				id:3,				
				name:'Grape',
				price:5,
				quantity:25,
				stock: 0
			}
		],
		cart:{ items: [],cartPrice:0}
	},
	computed:{
		cartFinalPrice: function(){
			this.cartPrice = 0;

			for (var i = 0; i < this.cart.items.length; i++) {
				var productPrice = this.cart.items[i].price;

				this.cartPrice = Number(this.cartPrice) + Number(productPrice);
			} return this.cartPrice;
		}
	},
	methods: {
			addProduct: function(id){
				var Index = Number(id) - Number(1);

				var currentProduct = this.products[Index];

				var currentPrice = Number(currentProduct.stock) * Number(currentProduct.price);

				if(ifProductAlreadyAdded(currentProduct.id) != false){
					var cartProduct = this.cart.items[Index];

					cartProduct.quantity = Number(cartProduct.quantity) + Number(currentProduct.stock);

					currentProduct.quantity = Number(currentProduct.quantity) - Number(currentProduct.stock);

					cartProduct.price = (Number(currentProduct.stock) * Number(currentProduct.price)) + cartProduct.price;

				} else{
					var item = {id: currentProduct.id, name:currentProduct.name, price:currentPrice, quantity:currentProduct.stock};

					this.cart.items.push(item);

					currentProduct.quantity = Number(currentProduct.quantity) - Number(currentProduct.stock);

					for (var i = 0; i < this.cart.items.length; i++) {
						if(this.cart.items[i].id == id){
							this.cart.items[i].price = Number(currentProduct.stock) * Number(currentProduct.price);
						}
					}
				}	
			},
			removeProduct: function(id){
				var Index = Number(id) - Number(1);

				var productId = this.cart.items.map(x => {return x.id;}).indexOf(this.cart.items);	

				this.products[Index].quantity = Number(this.products[Index].quantity) + Number(this.products[Index].stock);

				for (var i = 0; i < this.cart.items.length; i++) {
					if(this.cart.items[i].id == id){
						this.cart.items.splice(i,1);
					}
				}		
			},
		}
});

function ifProductAlreadyAdded(input){
	for (var i = 0; i < vm.cart.items.length; i++) {
		if(vm.cart.items[i].id === input){
			return true;
		} 
	} return false;
}

});