/**
 * Function that removes an item from the shopping cart
 *
 * @param {Item} item - the item to remove
 * @return {Cart}
 */
export const removeFromCart = (cart, item) => {
  const newCart = {
    ...cart,
    [item.name]: cart[item.name] - 1,
  }

  if (!newCart[item.name]) {
    delete newCart[item.name]
  }

  return newCart
}

/**
 * Function that adds an item to the cart and then returns the cart
 *
 * @param {Item} item - the item to add
 * @return {Cart}
 */
export const addToCart = (cart, item) => {
  if (cart.hasOwnProperty(item.name)) {
    return {
      ...cart,
      [item.name]: cart[item.name] + 1,
    }
  }

  return {
    ...cart,
    [item.name]: 1,
  }
}

/**
 * Function that determines the number of items currently in the cart for a particular item
 *
 * @param {Item} item - the item in question
 * @return {Number}
 */
export const getQuantityOfItemInCart = (cart, item) => {
  return cart[item.name] || 0
}

export const getTotalItemsInCart = (cart) => {
  const ids = Object.keys(cart)
  if (!ids?.length) return 0

  return ids.reduce((acc, id) => {
    return acc + cart[id]
  }, 0)
}
