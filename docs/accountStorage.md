# useAccountStore - Pinia Store 👤

## Overview

The `useAccountStore` is a Pinia store that manages all user account-related data in your application. It serves as the single source of truth for user information, shopping cart, order history, and account balance. The store uses Pinia's composition API style and includes automatic persistence to maintain user data across browser sessions.

This store centralizes user state management, making it easy to access and modify account information from any component in your application without prop drilling or complex state synchronization.

## Store Structure

The store is built around a main `account` ref object with the following structure:

```javascript
account: {
  userInfo: {
    userName: "",
    userProfilePic: "",
    userBillingInformation: {
      address: "",
      phone: "",
    },
    userShippingInformation: {
      address: "",
      zipCode: "",
      state: ""
    }
  },
  cart: [],
  orderedItems: [],
  balance: 0.00
}
```

## API Reference

### State Properties

#### `account`
**Type:** `Ref<Object>`

The main reactive account object containing all user data. This is the root state that holds user information, cart contents, order history, and balance.

### Actions

#### `addToBalance(quantity)`

Adds the specified amount to the user's account balance. Includes type validation to prevent errors.

**Parameters:**
- `quantity` (Number) - The amount to add to the balance (can be positive or negative)

**Error Handling:**
- Logs a console error if the parameter is not a number
- Returns early without modifying balance on invalid input

**Usage Examples:**

```javascript
const accountStore = useAccountStore()

// Add funds to account
accountStore.addToBalance(50.00)   // Adds $50
accountStore.addToBalance(25.99)   // Adds $25.99

// Deduct funds (negative amount)
accountStore.addToBalance(-15.50)  // Subtracts $15.50
```

#### `setUserName(newUserName)`

Updates the user's display name in their profile information.

**Parameters:**
- `newUserName` (String, optional) - The new username to set. Defaults to empty string if not provided.

**Usage Examples:**

```javascript
const accountStore = useAccountStore()

// Set a new username
accountStore.setUserName("john_doe_123")

// Clear the username
accountStore.setUserName() // Sets to empty string
```

### Computed Getters

#### `getUserCart`
**Type:** `ComputedRef<Array>`

Returns the user's current shopping cart contents as a reactive computed property.

```javascript
const accountStore = useAccountStore()
const cartItems = accountStore.getUserCart // Reactive array of cart items
```

#### `getProfilePic`
**Type:** `ComputedRef<String>`

Returns the user's profile picture URL or path.

```javascript
const accountStore = useAccountStore()
const profilePicUrl = accountStore.getProfilePic
```

#### `getUserName`
**Type:** `ComputedRef<String>`

Returns the user's current username.

```javascript
const accountStore = useAccountStore()
const currentUsername = accountStore.getUserName
```

#### `getUserBillingInformation`
**Type:** `ComputedRef<Object>`

Returns the user's billing address and phone information.

```javascript
const accountStore = useAccountStore()
const billing = accountStore.getUserBillingInformation
// Contains: { address: "", phone: "" }
```

#### `getUserShippingInformation`
**Type:** `ComputedRef<Object>`

Returns the user's shipping address information.

```javascript
const accountStore = useAccountStore()
const shipping = accountStore.getUserShippingInformation
// Should contain: { address: "", zipCode: "", state: "" }
```
