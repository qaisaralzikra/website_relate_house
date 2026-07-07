# Plan: Add category filter buttons to PriceList admin preview

## Goal
When viewing the Price section in the admin panel (`AdminLayout`), add clickable category tabs so the admin can filter which category's packages are shown, instead of always seeing all categories at once.

## Files to change

### 1. `resources/js/Pages/detail/PriceList.jsx`

**Changes:**
- Add `isAdmin` prop to both `PriceList` and `DynamicPriceList`
- In `DynamicPriceList`:
  - Add `useState` for `selectedCatId` (initialized to first category's id when `isAdmin`, else `null`)
  - When `isAdmin` and categories exist, render a row of pill/tab buttons above the content:
    - "Semua" button → sets `selectedCatId = null` (shows all)
    - One button per category → sets `selectedCatId = cat.id`
    - Active button uses `bg-primary text-white`, inactive uses `bg-gray-100 text-gray-600`
  - Filter `categories` based on `selectedCatId` when `isAdmin`:
    - `selectedCatId === null` → show all (same as public)
    - `selectedCatId === cat.id` → show only that category
- When `isAdmin` is not passed (public `DetailService` view), keep current behavior (show all categories sequentially)

### 2. `resources/js/Pages/admin/AdminLayout.jsx` (line 392)

**Change:**
```jsx
<PriceList data={priceData} isAdmin={true} />
```

## What does NOT change
- `DetailService.jsx` — unchanged, renders `<PriceList data={priceData} />` without `isAdmin`
- `PriceModal.jsx` — unchanged, the Edit modal
- Backend controllers — unchanged, data shape stays the same
- `PricingCard` rendering — unchanged

## Visual design
- Tabs are rendered immediately above the category hero images
- Responsive: `flex-wrap` so tabs wrap on small screens
- Active tab: filled primary color with shadow
- Inactive tab: light gray background
