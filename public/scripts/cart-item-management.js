const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');


async function updateCartItem(event) {
    event.preventDefault();

    const form = event.target;

    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response;
    try {
        response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        alert('Something went wrong!');
        return;
    }

    if (!response.ok) {
        alert('Something went wrong!');
        return;
    };

    const responseData = await response.json();

    if (responseData.updatedCartData.updatedItemPrice === 0) {
        const articleElement = document.querySelector('.cart-item');
        articleElement.remove();
    } else {

    const cartItemTotalPriceElement = form.parentElement.querySelector('.cart-item-price');
    cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);
}
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    const badgeElement = document.querySelector('.nav-items .badge');
    badgeElement.textContent = responseData.updatedCartData.newTotalQuantity;

}


for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener('submit', updateCartItem)
}