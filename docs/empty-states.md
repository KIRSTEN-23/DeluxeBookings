# Section and page states

[`ContentState`](../frontend/src/components/common/ContentState.jsx) supplies a shared reading order:

1. Decorative icon.
2. Descriptive heading.
3. Explanatory text.
4. One useful action using the shared button system.

Use it for empty results, first-use sections, unavailable pages, loading and request failures. Small card placeholders and input choices retain their own patterns.

`busy` switches to a loading icon, announces status and disables the loading action. `error` announces a failure. An empty result must only appear after loading completes successfully; failed requests offer a retry or a route to available content.

The seller activity page uses “My listings” and “Guest bookings” outside their containers. Inside, use a different heading that explains the state. Populated containers use “Your property portfolio” and “Upcoming and past stays.” Do not repeat the outer heading as the empty-state title.

A first-time listing section offers Create a listing, or Resume your draft when a local draft exists. Filters and the duplicate toolbar creation action appear only once the seller has listings. A filtered-out list offers Show all listings. Empty bookings link back to the listings section; they do not imply that publishing guarantees a booking.

```jsx
<ContentState
  icon={CalendarDays}
  heading="Your next guests will appear here"
  description="When a guest books one of your properties, you’ll see their stay here."
  actionLabel="View your listings"
  href="#my-listings"
/>
```

Use `to` for an application route, `href` for an anchor, or `onAction` for retry/reset. `framed` adds a white bordered container when the parent does not already provide one. `headingLevel` defaults to `h6`; the display size is shared while the tag follows the page’s hierarchy.
