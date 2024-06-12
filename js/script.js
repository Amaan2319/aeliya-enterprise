// JavaScript code for index.html
// This script should generate product cards on the home page
const products = [
    {
        id: 1,
        name: 'Moss Agate Bowl 5"',
        price: '$100',
        images: [
            'images/moss-agate-bowl/mossagate1.jpg',
            'images/moss-agate-bowl/mossagate2.jpg',
            'images/moss-agate-bowl/mossagate3.jpg',
            'images/moss-agate-bowl/mossagate4.jpg',
            'images/moss-agate-bowl/mossagate5.jpg'
        ]
    },
    {
        id: 2,
        name: 'Crystal Sphere',
        price: '$110',
        images: [
            'images/jasper-bowl/jasper1.jpg',
            'images/jasper-bowl/jasper2.jpg',
            'images/jasper-bowl/jasper3.jpg',
            'images/jasper-bowl/jasper4.jpg',
            'images/jasper-bowl/jasper5.jpg'
        ]
    },
    {
        id: 3,
        name: 'Selenite bowl 5"',
        price: '$100',
        images: [
            'images/selenite-bowl/selenite1.jpg',
            'images/selenite-bowl/selenite2.jpg',
            'images/selenite-bowl/selenite3.jpg',
            'images/selenite-bowl/selenite4.jpg'
        ]
    },
    {
        id: 4,
        name: 'Amethyst bowl 5"',
        price: '$100',
        images: [
            'images/amethyst-bowl/amethyst1.jpg',
            'images/amethyst-bowl/amethyst2.jpg',
            'images/amethyst-bowl/amethyst3.jpg',
            'images/amethyst-bowl/amethyst4.jpg'
        ]
    },
    {
        id: 5,
        name: 'Carnelian bowl 4"',
        price: '$100',
        images: [
            'images/carnelian-bowl/3.png',
            'images/carnelian-bowl/4.png'
        ]
    },
    {
        id: 6,
        name: 'Margaj bowl 5"',
        price: '$100',
        images: [
            'images/margaj-bowl/1.png',
            'images/margaj-bowl/2.png'
        ]
    },
    {
        id: 7,
        name: 'Amethyst Sphere',
        price: '$110',
        images: [
            'images/spheres/amethyst sphere/amethyst1.jpg',
            'images/spheres/amethyst sphere/amethyst2.jpg',
            // 'Images/spheres/amethyst sphere/amethyst3.jpg'
        ]
    },
    {
        id: 8,
        name: 'Jasper Sphere',
        price: '$110',
        images: [
            'images/spheres/jasper sphere/jasper1.jpg',
            'images/spheres/jasper sphere/jasper2.jpg',
            'images/spheres/jasper sphere/jasper3.jpg'
        ]
    },
    {
        id: 9,
        name: 'chakra tree',
        price: '$110',
        images: [
            'images/trees/chakra small tree/chakra1.jpg',
        ]
    },
    {
        id: 10,
        name: 'Black crystal pryamid',
        price: '$110',
        images: [
            'images/pyramids/black/black1.jpg',
            'images/pyramid/black/black2.jpg',
            'images/pyramid/black/black3.jpg',
            'images/pyramid/black/black4.jpg'
        ]
    },
    {
        id: 11,
        name: 'White crystal pyramid',
        price: '$110',
        images: [
            'images/pyramid/white/white1.jpg',
            'images/pyramid/white/white2.jpg',
            'images/pyramid/white/white3.jpg'
            // 'Images/pyramid/white/white4.jpg',
        ]
    },
    {
        id: 12,
        name: 'Tiger Eye Cube',
        price: '$110',
        images: [
            'images/cubes/tiger eye cube/1717561915379.JPG',
            'images/cubes/tiger eye cube/1717561915387.JPG',
            'images/cubes/tiger eye cube/1717561915395.JPG',
            'images/cubes/tiger eye cube/1717561915403.JPG',
        ]
    }
    // Add more products here if needed
];
// JavaScript code for index.html
// This script should generate product cards on the home page

document.addEventListener('DOMContentLoaded', () => {
    const productGallery = document.getElementById('product-gallery');
    const cartCount = document.getElementById('cart-count');
    const cartAlert = document.createElement('div');
    cartAlert.classList.add('alert', 'alert-success', 'fade', 'show');
    cartAlert.setAttribute('role', 'alert');
    cartAlert.style.display = 'none';
    document.body.prepend(cartAlert); // Change append to prepend


    function showAlert(message) {
        cartAlert.textContent = message;
        cartAlert.style.display = 'block';
        setTimeout(() => {
            cartAlert.style.display = 'none';
        }, 2000);
    }

    function addToCart(productId) {
        const product = products.find(item => item.id == productId);
        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showAlert(`${product.name} added to cart`);
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-4 product-card';
        productCard.innerHTML = `
        <div class="card mb-4 shadow">
        <div id="carousel${product.id}" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                ${product.images.map((image, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${image}" class="d-block w-100" style="height: 250px; object-fit: cover;" alt="${product.name}">
                    </div>
                `).join('')}
            </div>
            <a class="carousel-control-prev" href="#carousel${product.id}" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel${product.id}" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.price}</p>
            <button class="btn btn-dark btn-block add-to-cart" data-id="${product.id}">Add to Cart</button> <!-- Apply Bootstrap btn-block styling -->
        </div>
    </div>
        `;
        return productCard;
    }

    function renderProductCards() {
        productGallery.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productGallery.appendChild(productCard);
        });
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    renderProductCards();

    productGallery.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });
});
