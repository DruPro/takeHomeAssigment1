# `useModalController` — Modal Visibility Controller (Vue 3 Composition API)

## Summary

`useModalController` is a simple custom Composition API function that provides reactive control over a modal’s visibility state. It encapsulates the modal's state and toggling logic, making it reusable and clean for multiple modal instances across the application.

---

## Import

```js
import { ref } from "vue"
```

---

## Function Declaration

```js
function useModalController() {
  const isModalActive = ref(false)

  const toggleModalVisibility = function () {
    if (isModalActive.value) {
      isModalActive.value = false
      return false
    } else {
      isModalActive.value = true
      return true
    }
  }

  return { toggleModalVisibility, isModalActive }
}
```

---

## Returns

* `isModalActive`: `Ref<Boolean>`
  A reactive reference indicating whether the modal is currently visible (`true`) or hidden (`false`).

* `toggleModalVisibility`: `Function`
  A function that toggles the visibility state of the modal. Returns the new visibility state as a boolean.

---

## Usage Example

```js
const cartMoreModalController = useModalController()
```

You can then use the returned values in your component's template and methods.

---

## Template Integration

The modal visibility is bound via the `:is-modal-active` prop. Here's how it's used with a custom `<cartMoreModal>` component:

```vue
<cartMoreModal
  style="z-index: 80;"
  :on-exit-click="onModalExit"
  :on-quantity-click="onQuanityClick"
  :current-item="cartManager.currentFocusedItem.value"
  :is-modal-active="cartMoreModalController.isModalActive.value"
  :on-delete-click="handleDeleteFromCart"
/>
```

### Explanation of Props:

* `:is-modal-active` — Controlled by the `useModalController` to show/hide the modal.
* `:on-exit-click`, `:on-quantity-click`, `:on-delete-click` — Event handlers.
* `:current-item` — Supplies context for the item currently selected.

---

## Example Workflow

1. When a user triggers a modal open action (e.g., clicks a "More Options" button), call:

   ```js
   cartMoreModalController.toggleModalVisibility()
   ```

2. The modal becomes visible (`isModalActive` is set to `true`).

3. When the user clicks outside the modal or on the exit button, the modal component calls a method like `onModalExit`, which toggles the visibility again.

---