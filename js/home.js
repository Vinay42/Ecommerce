document.addEventListener('DOMContentLoaded', () => {
    setupHomePageFunctionality();
    setupTestimonialsSlider();
});

function setupHomePageFunctionality() {
    // Load featured products
    loadFeaturedProducts();
}

function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    
    if (!featuredProductsContainer) return;
    
    // In a real application, this would be an API call
    // For demo purposes, we'll use mock data
    const featuredProducts = [
        {
            id: 1,
            name: 'Business Analytics Platform',
            category: 'Software',
            price: 199.99,
            image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            isFeatured: true,
            isNew: true
        },
        {
            id: 2,
            name: 'Cloud Storage Solution',
            category: 'Service',
            price: 49.99,
            image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            isFeatured: true,
            isNew: false
        },
        {
            id: 3,
            name: 'Enterprise Security Suite',
            category: 'Software',
            price: 299.99,
            image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            isFeatured: true,
            isNew: false
        }
    ];
    
    // Remove loading spinner
    featuredProductsContainer.innerHTML = '';
    
    // Add products to container
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card animate-fade-in';
    
    const productImage = document.createElement('div');
    productImage.className = 'product-image';
    
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;
    productImage.appendChild(img);
    
    if (product.isNew) {
        const badge = document.createElement('div');
        badge.className = 'product-badge';
        badge.textContent = 'New';
        productImage.appendChild(badge);
    }
    
    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';
    
    const category = document.createElement('div');
    category.className = 'product-category';
    category.textContent = product.category;
    productDetails.appendChild(category);
    
    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.name;
    productDetails.appendChild(title);
    
    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = window.appFunctions.formatCurrency(product.price);
    productDetails.appendChild(price);
    
    const actions = document.createElement('div');
    actions.className = 'product-actions';
    
    const detailsLink = document.createElement('a');
    detailsLink.href = `product-detail.html?id=${product.id}`;
    detailsLink.className = 'btn btn-secondary btn-sm';
    detailsLink.textContent = 'View Details';
    actions.appendChild(detailsLink);
    
    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'btn btn-primary btn-sm';
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.addEventListener('click', () => {
        window.appFunctions.addToCart(product);
        alert(`${product.name} added to cart!`);
    });
    actions.appendChild(addToCartBtn);
    
    productDetails.appendChild(actions);
    
    productCard.appendChild(productImage);
    productCard.appendChild(productDetails);
    
    return productCard;
}