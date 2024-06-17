document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Moss Agate Bowl 5"', price: '$80', images: ['images/moss-agate-bowl/mossagate1.jpg'] },
        { id: 2, name: 'Jasper Bowl 4.5"', price: '$82', images: ['images/jasper-bowl/jasper1.jpg'] },
        { id: 3, name: 'Selenite bowl 5"', price: '$100', images: ['images/selenite-bowl/selenite1.jpg'] },
        { id: 4, name: 'Amethyst bowl 5"', price: '$100', images: ['images/amethyst-bowl/amethyst1.jpg'] },
        { id: 5, name: 'Carnelian bowl 4"', price: '$102', images: ['images/carnelian-bowl/3.png'] },
        { id: 6, name: 'Margaj bowl 5"', price: '$69', images: ['images/margaj-bowl/1.png'] },
        { id: 7, name: 'Amethyst Sphere', price: '$135', images: ['images/spheres/amethyst sphere/amethyst1.jpg'] },
        { id: 8, name: 'Jasper Sphere', price: '$110', images: ['images/spheres/jasper sphere/jasper1.jpg'] },
        { id: 9, name: 'chakra tree', price: '$40', images: ['images/trees/chakra small tree/chakra1.jpg'] },
        { id: 10, name: 'Black crystal pyramid', price: '$5', images: ['images/pyramid/black/black1.JPG'] },
        { id: 11, name: 'White crystal pyramid', price: '$5', images: ['images/pyramid/white/white1.JPG'] },
        { id: 12, name: 'Tiger Eye Cube', price: '$50', images: ['images/cubes/tiger eye cube/1717561915379.JPG'] }
    ];

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const orderTotal = document.getElementById('order-total');
    const alertContainer = document.getElementById('alert-container');

    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        alertContainer.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.classList.remove('show');
            alertDiv.classList.add('hide');
            setTimeout(() => {
                alertContainer.removeChild(alertDiv);
            }, 500);
        }, 3000);
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function updateOrderTotal() {
        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            const price = parseFloat(product.price.replace('$', ''));
            return sum + (price * item.quantity);
        }, 0);
        orderTotal.textContent = `$${total.toFixed(2)}`;
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';

        if (cart.length > 0) {
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item col-12 mb-3';
                cartItem.innerHTML = `
                    <div class="card">
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="${product.images[0]}" class="card-img" alt="${product.name}">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                    <p class="card-text">${product.price}</p>
                                    <div class="quantity-controls">
                                        <button class="btn btn-sm btn-secondary decrease-quantity" data-id="${item.id}">-</button>
                                        <span class="quantity">${item.quantity}</span>
                                        <button class="btn btn-sm btn-secondary increase-quantity" data-id="${item.id}">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            // Attach event listeners for the quantity control buttons
            document.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', event => {
                    const id = parseInt(event.target.getAttribute('data-id'));
                    updateItemQuantity(id, 1);
                    showAlert('Quantity increased');
                });
            });

            document.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', event => {
                    const id = parseInt(event.target.getAttribute('data-id'));
                    updateItemQuantity(id, -1);
                    showAlert('Quantity decreased');
                });
            });
        } else {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }

        updateOrderTotal();
    }

    function updateItemQuantity(id, change) {
        cart.forEach(item => {
            if (item.id === id) {
                item.quantity += change;
                if (item.quantity < 1) {
                    item.quantity = 1;
                }
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    }

    function generateWhatsAppMessage() {
        let message = 'Order Details:\n\n';
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            message += `${product.name} - ${product.price} (Quantity: ${item.quantity})\n`;
        });
        const total = orderTotal.textContent;
        message += `\nTotal: ${total}`;
        return message;
    }

    updateCartCount();
    updateCartDisplay();

    // Reset Cart Button
    const resetCartButton = document.getElementById('reset-cart');
    resetCartButton.addEventListener('click', function() {
        localStorage.removeItem('cart');
        updateCartCount();
        updateCartDisplay();
        showAlert('Cart reset', 'warning');
        window.location.reload(); // Refresh the page
    });

    // Place Order Button
    const placeOrderButton = document.getElementById('place-order');
    placeOrderButton.addEventListener('click', function() {
        const message = generateWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);

        // Replace the below URL with your WhatsApp API URL
        const whatsappAPIURL = `https://api.whatsapp.com/send?phone=916354824270&text=${encodedMessage}`;
        window.open(whatsappAPIURL, '_blank');
    });
});
