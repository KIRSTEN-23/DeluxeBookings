# Button system

Use [`AppButton`](../frontend/src/components/common/AppButton.jsx) for action buttons and button-shaped navigation links. [`Buttons.css`](../frontend/src/styles/Buttons.css) owns appearance. Page styles own placement, wrapping and full-width layouts. Do not add page-specific colours, radii, icon padding or Bootstrap variants.

| Intent | Fill | Use |
| --- | --- | --- |
| `primary` | `#332A23` on light surfaces; white with `onDark` | Main action such as Save, Continue, Apply or Book |
| `secondary` | `#8C8578` | Supporting actions such as Save draft; outline for Back, Cancel, Clear, View and Log Out |
| `tertiary` | `#7B593F` | Additional brand action |
| `neutral` | `#EFEBEA` with `#332A23` text | Filled View in the admin review queue |
| `success` | `#246344` | Publish, Accept or Approve; Approve uses outline |
| `danger` | `#B24747` | Delete, Remove or Reject |
| `warning` | `#8A5A13` | Unpublish or another caution action |
| `info` | `#245678` | Informational action when needed |

Each intent supports `appearance="fill"` and `appearance="outline"`. Hierarchy and appearance are independent. Use a semantic intent when the action needs a clear meaning. In the admin review queue, View uses neutral fill with dark brown text and Approve uses success outline.

Secondary fill uses a dark label because white text on `#8C8578` has insufficient contrast at normal text sizes. Secondary outline uses a darker taupe label on light surfaces. Outline labels on dark surfaces use lighter tones.

Primary outline on dark surfaces uses a white border and label, with an 8% white fill (18% on hover). This treatment is shared by Apply search and the secondary call-to-action treatment on dark hero sections.

## Shared dimensions and states

- 12px radius, 1px border and minimum 44px target height.
- 16px body font, 10px vertical / 20px horizontal padding, 8px label/icon gap.
- 20px icons using the label colour, with no separate coloured tile or margin.
- Visible keyboard focus ring, hover and pressed feedback.
- Disabled and loading actions block activation. Loading sets `aria-busy`; callers supply meaningful pending text such as “Saving…”.
- Icon-only actions are 44px square and must have an `aria-label`.
- Native action buttons default to `type="button"`. Set `type="submit"` explicitly for form submission.

## Examples

```jsx
import AppButton from './components/common/AppButton';
import { Link } from 'react-router-dom';
import { Save, Trash2, X } from 'lucide-react';

<AppButton type="submit" icon={Save}>Save changes</AppButton>
<AppButton intent="primary" onDark>Apply</AppButton>
<AppButton intent="secondary" appearance="outline" onClick={cancel}>Cancel</AppButton>
<AppButton intent="neutral" onClick={view}>View</AppButton>
<AppButton intent="success" appearance="outline" onClick={approve}>Approve</AppButton>
<AppButton intent="danger" icon={Trash2} onClick={remove}>Delete</AppButton>
<AppButton intent="secondary" icon={Save} showIcon={false}>Save draft</AppButton>
<AppButton icon={X} iconOnly aria-label="Close listing" onClick={close} />
<AppButton as={Link} to="/account/profile" appearance="outline">My Profile</AppButton>
<AppButton loading={saving}>{saving ? 'Saving…' : 'Save'}</AppButton>
```

`iconPosition="start"` places an optional icon before the label. `showIcon={false}` hides icons, including existing inline SVG children. Existing children-based icons remain supported during migration.

Picture-password tiles, property-type cards, filter chips, rating stars, navigation toggles and accordion headings are selection/navigation controls. They retain their specialised structure and selected/expanded feedback.

## Verification

Run frontend `npm test`, `npm run lint` and `npm run build`. The button tests cover accidental form submission, disabled/loading activation, navigation accessibility and optional icons. Browser checks should cover light/dark surfaces, both appearances, keyboard focus, icons, long labels and wrapping at 390px and 1440px.
