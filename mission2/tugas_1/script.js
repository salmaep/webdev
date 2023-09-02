class ShoppingCartApp {
    constructor() {
        this.productList = document.getElementById("product-list");
        this.cartOutput = document.getElementById("cart-output");
        this.cart = [];

        this.formatRupiah = (angka) => {
            var formatter = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 2,
            });
            return formatter.format(angka);
        };

        this.displayProducts = (products) => {
            products.forEach((product) => {
                const card = document.createElement("div");
                card.classList.add("col-md-4", "mb-4");

                card.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <p class="card-title" style="font-weight : 600">${product.name}</p>
                            <p class="card-text">${this.formatRupiah(product.price)}</p>
                            <div class="input-group">
                                <div class="input-group-btn">
                                    <button class="btn btn-primary decrement">-</button>
                                </div>                      
                                <input type="text" class="quantity form-control input-number" value="0" />
                                <div class="input-group-btn">
                                    <button class="btn btn-primary increment">+</button>
                                </div> 
                            </div>
                            <button class="btn btn-success add-to-cart mt-1">Tambah ke Keranjang</button>
                        </div>
                    </div>
                `;

                this.productList.appendChild(card);

                const decrementButton = card.querySelector(".decrement");
                decrementButton.addEventListener("click", () => {
                    const quantityInput = card.querySelector(".quantity");
                    let quantity = parseInt(quantityInput.value);
                    if (quantity > 0) {
                        quantity--;
                        quantityInput.value = quantity;
                    }
                });

                const incrementButton = card.querySelector(".increment");
                incrementButton.addEventListener("click", () => {
                    const quantityInput = card.querySelector(".quantity");
                    let quantity = parseInt(quantityInput.value);
                    quantity++;
                    quantityInput.value = quantity;
                });

                const addToCartButton = card.querySelector(".add-to-cart");
                addToCartButton.addEventListener("click", () => {
                    const quantityInput = card.querySelector(".quantity");
                    const quantity = parseInt(quantityInput.value);
                    if (quantity > 0) {
                        const cartItem = {
                            image: product.image,
                            name: product.name,
                            price: product.price,
                            quantity: quantity,
                        };
                        this.cart.push(cartItem);
                        this.updateCartOutput();
                    }
                });
            });
        };

        this.updateCartOutput = () => {
            this.cartOutput.innerHTML = "";
            let totalCartPrice = 0;

            this.cart.forEach((item) => {
                const itemTotalPrice = item.price * item.quantity;
                totalCartPrice += itemTotalPrice;

                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");

                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-quantity">${this.formatRupiah(item.price)} x ${item.quantity}</p>
                    </div>
                    <p class="cart-item-total">${this.formatRupiah(itemTotalPrice)}</p>
                `;

                this.cartOutput.appendChild(cartItemDiv);
            });

            const taxAmount = totalCartPrice * 0.11;
            const totalPayment = totalCartPrice + taxAmount;

            const totalPriceElement = document.createElement("div");
            totalPriceElement.innerHTML = `
                <p class="cart-total-price">Total Harga: ${this.formatRupiah(totalCartPrice)}</p>
                <p class="cart-tax">Pajak (11%): ${this.formatRupiah(taxAmount)}</p>
                <p class="cart-payment-total">Total Bayar: ${this.formatRupiah(totalPayment)}</p>
            `;

            this.cartOutput.appendChild(totalPriceElement);

            // Menambahkan tombol "Checkout" yang akan menampilkan modal saat ditekan.
            const checkoutButton = document.createElement("button");
            checkoutButton.classList.add("btn", "btn-primary");
            checkoutButton.textContent = "Checkout";
            checkoutButton.addEventListener("click", () => {
                this.showCheckoutModal(totalCartPrice, taxAmount, totalPayment);
            });
            this.cartOutput.appendChild(checkoutButton);
        };

        this.showCheckoutModal = (totalCartPrice, taxAmount, totalPayment) => {
            const modalBody = document.getElementById("checkoutModalBody");
            modalBody.innerHTML = `
                <p>Barang yang dibeli:</p>
                <ul>
                    ${this.cart.map(item => `<li>${item.name} (${this.formatRupiah(item.price)} x ${item.quantity})</li>`).join('')}
                </ul>
                <div style="margin-top : 5px; text-align: end; justify-content: end; align-items: flex-end; font-weight : 600">
                    <p>Total Harga: ${this.formatRupiah(totalCartPrice)}</p>
                    <p>Pajak (11%): ${this.formatRupiah(taxAmount)}</p>
                    <p>Total Bayar: ${this.formatRupiah(totalPayment)}</p>
                </div>
            `;

            // Menampilkan modal dengan menggunakan Bootstrap's modal function.
            const checkoutModal = new bootstrap.Modal(document.getElementById("checkoutModal"));
            checkoutModal.show();
        };

        this.fetchProducts = () => {
            fetch("data.json")
                .then((response) => response.json())
                .then((data) => {
                    this.displayProducts(data);
                })
                .catch((error) => {
                    console.error("Gagal mengambil data produk: ", error);
                });
        };

        this.initialize = () => {
            this.fetchProducts();
        };
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const shoppingCartApp = new ShoppingCartApp();
    shoppingCartApp.initialize();
});