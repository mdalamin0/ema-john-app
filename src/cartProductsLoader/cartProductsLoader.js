import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async () => {
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    const storedCart = getShoppingCart();
    let savedCart = [];
    for (const id in storedCart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = storedCart[id]
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }
    return savedCart;
}

export default cartProductsLoader