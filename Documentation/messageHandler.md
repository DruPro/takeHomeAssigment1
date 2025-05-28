# useMessageHandler Composable 📨

## Overview

The `useMessageHandler` composable is a lightweight Vue 3 utility for managing temporary notification messages in your application. Think of it as your app's friendly messenger - it shows users quick feedback messages and automatically hides them after a few seconds.

This composable is perfect for those fleeting moments when you need to tell users something happened: "Item added to cart!", "Settings saved!", "Error occurred!" - you know, the little confirmations that make apps feel responsive and alive.

## Core Concept

The composable manages two key pieces of state: what message to show and whether it should be visible. It follows a simple pattern: show a message, wait 3 seconds, then hide it automatically. No user interaction required, no complex timing logic to manage in your components.

This "fire and forget" approach keeps your component code clean while providing consistent user feedback across your entire application.

## API Reference

### Returned Properties

#### `isMessageHidden`
**Type:** `Ref<Boolean>`  
**Default:** `true`

A reactive boolean that controls message visibility. When `true`, the message should be hidden; when `false`, it should be visible. The naming follows the "hidden" convention to work naturally with `v-show` directives.

```javascript
// In your template:
<Message v-show="!messageHandler.isMessageHidden" />
// or
<Message :is-hidden="messageHandler.isMessageHidden" />
```

#### `messageText`
**Type:** `Ref<String>`  
**Default:** `"Added Item To Cart"`

A reactive string containing the current message content. The default message provides a sensible fallback for cart-related applications, but you'll typically override this with custom messages.

```javascript
// Access the current message
console.log(messageHandler.messageText.value) // "Your custom message"
```

### Methods

#### `displayMessage(message)`

Shows a custom message for 3 seconds, then automatically hides it. This is your main interface for triggering notifications.

**Parameters:**
- `message` (String) - The text content to display to the user

**Behavior:**
1. Sets the message text to your custom content
2. Makes the message visible immediately  
3. Starts a 3-second timer
4. Automatically hides the message when the timer expires

**Usage Examples:**

```javascript
const messageHandler = useMessageHandler()

// Success messages
messageHandler.displayMessage("Item added to cart!")
messageHandler.displayMessage("Profile updated successfully")

// Error messages  
messageHandler.displayMessage("Failed to save changes")

// Info messages
messageHandler.displayMessage("Loading complete")
```

## Usage Patterns

### Basic Setup

The most straightforward way to use the message handler in a component:

```javascript
<script setup>
import useMessageHandler from './composables/useMessageHandler'
import Message from './components/Message.vue'

const messageHandler = useMessageHandler()

function handleSuccess() {
  messageHandler.displayMessage("Operation completed!")
}
</script>

<template>
  <button @click="handleSuccess">Do Something</button>
  
  <!-- Option 1: Using v-show with negation -->
  <Message 
    v-show="!messageHandler.isMessageHidden"
    :text="messageHandler.messageText" 
  />
  
  <!-- Option 2: Passing the hidden state directly -->
  <Message 
    :is-hidden="messageHandler.isMessageHidden"
    :message-text="messageHandler.messageText" 
  />
</template>
```

### Cart Integration Example

Perfect for e-commerce applications where users need feedback on cart actions:

```javascript
const messageHandler = useMessageHandler()
const cartStore = useCartStore()

function addToCart(item) {
  cartStore.addItem(item)
  messageHandler.displayMessage(`${item.name} added to cart!`)
}

function removeFromCart(item) {
  cartStore.removeItem(item)
  messageHandler.displayMessage(`${item.name} removed from cart`)
}

function clearCart() {
  cartStore.clear()
  messageHandler.displayMessage("Cart cleared")
}
```

### Form Validation Feedback

Great for providing immediate feedback on form interactions:

```javascript
const messageHandler = useMessageHandler()

async function saveSettings(formData) {
  try {
    await api.saveSettings(formData)
    messageHandler.displayMessage("Settings saved successfully!")
  } catch (error) {
    messageHandler.displayMessage("Failed to save settings. Please try again.")
  }
}

function resetForm() {
  form.reset()
  messageHandler.displayMessage("Form reset to defaults")
}
```

### Template Usage Notes

When binding to your Message component, you have two approaches:

**Approach 1: Direct binding (requires .value in templates)**
```vue
<Message
  :is-hidden="messageHandler.isMessageHidden.value" 
  :message-text="messageHandler.messageText.value"
/>
```

**Approach 2: Destructured refs (cleaner templates)**
```javascript
const { isMessageHidden, messageText, displayMessage } = useMessageHandler()
```
```vue
<Message
  :is-hidden="isMessageHidden" 
  :message-text="messageText"
/>
```

## Implementation Details

### Timing Behavior
The 3-second auto-hide timeout is hardcoded for consistency across your application. This duration follows common UX patterns where users need enough time to read the message but not so long that it becomes intrusive.

If you need different timing for specific use cases, you could enhance the composable:

```javascript
// Enhanced version with configurable timing
const displayMessage = function (message, duration = 3000) {
  messageText.value = message
  isMessageHidden.value = false;
  setTimeout(() => {
    isMessageHidden.value = true;
  }, duration);
}
```

### State Management
Each component that uses `useMessageHandler()` gets its own independent message state. This prevents messages from different parts of your app from interfering with each other.

If you need global message handling (where only one message shows at a time across your entire app), consider making this a singleton pattern by moving the refs outside the function.

### Memory Management
The setTimeout is automatically cleaned up when it expires, so you don't need to worry about memory leaks. However, if you're using this in components that mount/unmount frequently, you might want to add cleanup logic:

```javascript
// Enhanced version with cleanup
let timeoutId = null

const displayMessage = function (message) {
  // Clear any existing timeout
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  messageText.value = message
  isMessageHidden.value = false;
  
  timeoutId = setTimeout(() => {
    isMessageHidden.value = true;
    timeoutId = null
  }, 3000);
}

// In your component's onUnmounted hook:
onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
```

## Design Philosophy

This composable embodies the principle of "simple things should be simple." Showing a temporary message is a common need that shouldn't require complex setup or state management. The API is intentionally minimal - one method to show messages, automatic hiding, and reactive state that works seamlessly with Vue's template system.

The composable handles the timing complexity internally while exposing simple, predictable behavior to your components. This makes it easy to add user feedback throughout your application without cluttering your component logic with setTimeout management.