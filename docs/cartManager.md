# useCartManager Composable

## Overview

The `useCartManager` composable is a Vue 3 composition function that provides a centralized way to manage shopping cart item interactions. Think of it as your cart's command center - it handles focusing on specific items, modifying quantities, and performing cart operations like adding or removing items.

This composable follows the single responsibility principle by managing one "focused item" at a time, which represents the item currently being viewed or modified by the user (like in a modal or detail view).

## Core Concept

The composable revolves around the concept of a "focused item" - a single product that the user is currently interacting with. This pattern is particularly useful for:

- Product detail modals where users adjust quantities before adding to cart
- Quick-add interfaces from product listings
- Cart editing functionality where users modify existing items

## API Reference

### Returned Properties

#### `currentFocusedItem`
**Type:** `Ref<Object>`

A reactive reference containing the currently focused item object. This item will always include a `quantity` property, which gets added automatically if it doesn't exist.

```javascript
// Example focused item structure
{
  id: 123,
  name: "Wireless Headphones",
  price: 99.99,
  quantity: 2 // Added by the composable if not present
}
```

### Methods

#### `focusItem(options)`

Sets the current focused item from either an object or array source. This is your primary method for "selecting" which item the user wants to work with.

**Parameters:**
- `options` (Object) - Configuration object with the following properties:
  - `from` (String, required) - Source type: either `"object"` or `"array"`
  - `data` (Object|Array, required) - The source data containing the item
  - `id` (Any, required when `from` is `"array"`) - The ID to search for in the array

**Usage Examples:**

```javascript
const cartManager = useCartManager()

// Focus from a single object (like from a product detail page)
cartManager.focusItem({
  from: "object",
  data: ref(productObject) // Pass a ref containing the product
})

// Focus from an array by ID (like from a product listing)
cartManager.focusItem({
  from: "array", 
  data: productsArray,
  id: 123 // Find the item with this ID
})
```

**Error Handling:** The function will log console errors for missing required properties or invalid `from` values, making debugging straightforward during development.

#### `changeFocusedItemQuantity(number)`

Adjusts the quantity of the currently focused item by the specified amount. This method includes built-in validation to prevent invalid quantities.

**Parameters:**
- `number` (Number) - The amount to change the quantity by (can be positive or negative)

**Validation Rules:**
- Final quantity must be between 0 and 100 (inclusive)
- Changes that would result in invalid quantities are ignored

**Usage Examples:**

```javascript
// Increase quantity by 1
cartManager.changeFocusedItemQuantity(1)

// Decrease quantity by 1  
cartManager.changeFocusedItemQuantity(-1)

// Bulk increase
cartManager.changeFocusedItemQuantity(5)
```

#### `addFocusedItemToCart(cart)`

Adds the currently focused item to the provided cart array. This method intelligently handles both new items and existing items.

**Parameters:**
- `cart` (Array) - The cart array to add the item to

**Behavior:**
- If the item already exists in the cart (matched by `id`), it increases the existing item's quantity
- If the item is new, it adds the entire focused item object to the cart
- The cart array is modified directly (mutated)

**Usage Example:**

```javascript
const shoppingCart = ref([])
const cartManager = useCartManager()

// First, focus on an item and set its quantity
cartManager.focusItem({ from: "object", data: productRef })
cartManager.changeFocusedItemQuantity(3)

// Then add it to the cart
cartManager.addFocusedItemToCart(shoppingCart.value)
```

#### `deleteCurrentFocusedItemFromCart(cart)`

Removes the currently focused item from the provided cart array entirely, regardless of quantity.

**Parameters:**
- `cart` (Array) - The cart array to remove the item from

**Behavior:**
- Finds the item in the cart by matching the `id` property
- Removes the item completely using `splice()`
- The cart array is modified directly (mutated)

**Usage Example:**

```javascript
// Focus on the item you want to remove
cartManager.focusItem({ from: "array", data: cartItems, id: 123 })

// Remove it from the cart
cartManager.deleteCurrentFocusedItemFromCart(shoppingCart.value)
```

## Common Usage Patterns

### Product Modal Workflow

This is the most common pattern - when a user clicks "Add to Cart" from a product listing:

```javascript
const cartManager = useCartManager()
const { cart } = useCartStore() // Your cart store

// User clicks on a product card
function handleProductClick(productId, productsArray) {
  // Focus the clicked product
  cartManager.focusItem({ 
    from: "array", 
    data: productsArray, 
    id: productId 
  })
  
  // Set initial quantity
  cartManager.changeFocusedItemQuantity(1)
  
  // Show modal where user can adjust quantity
  showProductModal.value = true
}

// User confirms adding to cart
function confirmAddToCart() {
  cartManager.addFocusedItemToCart(cart.value)
  showProductModal.value = false
}
```

### Cart Editing Workflow

For modifying items already in the cart:

```javascript
// User wants to edit a cart item
function editCartItem(itemId) {
  cartManager.focusItem({ 
    from: "array", 
    data: cart.value, 
    id: itemId 
  })
  // Now user can adjust quantity or remove the item
}

// Quantity adjustment buttons
function increaseQuantity() {
  cartManager.changeFocusedItemQuantity(1)
}

function decreaseQuantity() {
  cartManager.changeFocusedItemQuantity(-1)
}

// Remove item entirely
function removeFromCart() {
  cartManager.deleteCurrentFocusedItemFromCart(cart.value)
}
```

## Implementation Notes

### Quantity Management
The composable automatically ensures every focused item has a `quantity` property. If the original item doesn't include this property, it gets added with a value of 0. This prevents errors when working with data sources that might not include quantity information.

### Array Mutation vs Immutability
The cart modification methods (`addFocusedItemToCart` and `deleteCurrentFocusedItemFromCart`) directly mutate the provided arrays. This is intentional for performance reasons and works seamlessly with Vue's reactivity system. If you need immutable operations, you'll want to create copies of your arrays before passing them to these methods.

### Error Handling
The composable includes helpful error messages that will appear in the browser console during development. These help catch common mistakes like forgetting the required `from` property or using invalid source types.

This composable provides a clean, reusable way to handle the complex dance of cart interactions while keeping your components focused on presentation rather than cart logic.
