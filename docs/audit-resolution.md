# Audit resolutions

The original 15 findings were implemented in separate commits. Follow-up commits address edge cases found while checking those changes. The existing `.gitignore` edit is outside this work.

| Original review row | Initial implementation commit |
| --- | --- |
| Booking model and persistence | `433b3ff` |
| Selected property and booking price | `b340bb4` |
| Seller publish callbacks | `c80a35b` |
| Broken navigation | `ebfcec4` |
| Profile endpoints | `5ad6ff0` |
| Account role and seller identity | `32889a2` |
| Role enforcement and status transitions | `0b41776` |
| Truthful checkout confirmation | `d75cb7d` |
| Listing detail loading and recovery | `bf12a5a` |
| Admin decision feedback | `f72b022` |
| Rejection reasons and resubmission | `372725d` |
| Create/edit validation and feedback | `6ee0101` |
| Local draft saving and recovery | `8f0eb05` |
| Delete/unpublish/publish feedback | `3943dbb` |
| Combined search and filter feedback | `b23621e` |

## Behaviour to expect

- New listings enter `in_review`. Approval changes them to `unpublished`; the owner can then publish. Unpublish only applies to a published listing.
- Editing an approved or published listing returns it to review. Rejected listings remain rejected while being corrected; Save and resubmit changes them to `in_review`.
- Rejection requires a reason, which sellers can read in listing details and the edit form.
- Public search returns published, unpaused listings. Search and amenity/bedroom filters combine. Guest counts mean sufficient capacity; 4+ bedrooms includes larger properties. Rating filters and rating sorting were removed because persisted listing ratings are not implemented; price and newest sorting work.
- Checkout keeps the selected listing, validates dates and capacity, and calculates the nightly-rate total on the server. New bookings are pending requests. There is no payment or email integration; the UI does not collect card details or claim those actions occurred.
- Seller booking management uses the same booking model as checkout and filters results to owned listings.
- Seller/admin APIs require authentication and appropriate current database roles. Public registration/profile updates cannot grant administrator access.
- Picture-password authentication is retained for this project. Complete picture selections are required and highlighted. Its 96 possible combinations remain unsuitable for production authentication.
- Drafts are per account and saved only in the current browser. The account offers Resume draft. Storage failures are shown without clearing the form.
- Listing photos support JPG/PNG up to 2MB each, 6MB total and 20 files. Upload/read/request-limit errors are visible.

## Repeatable checks

```sh
cd backend
npm test
```

```sh
cd frontend
npm test
npm run lint
npm run build
```

The regression suite covers server-side booking pricing and date rejection; seller ownership; status guards; rejection/resubmission; public search filters; role escalation rejection; token expiry/deleted accounts/current roles; seller booking scoping; form validation; and text-safe error feedback. Database operations are mocked: these checks do not write to the connected database.

## Manual checks still required

No browser was connected during this session. A live database/browser walkthrough has not been completed.

1. Sign up as customer and seller. Verify incomplete selections, duplicate email, incorrect login and successful redirects.
2. Create a listing with photos. Save/resume a local draft and confirm submission feedback.
3. With an existing administrator account, reject it with a reason. As its seller, correct and resubmit it. Approve it, then publish it as the owner.
4. Edit the published listing. Verify that it disappears from public results until reviewed and published again.
5. Combine location, guest capacity, bedroom and amenity searches. Check empty results, price/newest sorting and failed-request Retry.
6. Book a selected listing. Check dates, guest limits, pending status, saved reference and total; verify it appears only in its owner's bookings.
7. Test profile update, account role changes, sign out and an expired session.
8. Disconnect the API during submissions. Verify messages, retained input, disabled pending actions and retry recovery. Cancel deletion prompts and verify nothing is removed.
9. Check narrow screens and keyboard navigation. Inspect listing image uploads and detail panes visually.

Large source images remain in the repository. The build may report a JavaScript chunk-size advisory; no asset redesign or deployment was performed.
