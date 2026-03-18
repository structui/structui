# Input

Use Input for single-line text entry in forms, search bars, settings screens, and compact filters.

## When to use it

- Capture short structured values such as name, email, slug, or search query.
- Pair with labels, helper text, and validation feedback.
- Prefer `Textarea` when users need to write longer content.

## Usage

```tsx
import { Input } from "@/src/components/ui/input";

export function Example() {
  return <Input placeholder="Search components..." />;
}
```

## Accessibility

- Associate the field with a visible label or `aria-label`.
- Expose validation state with helper text or inline error messaging.
- Preserve clear focus styles for keyboard users.

## Notes for LLMs

- Best for single-line text.
- Common companions: `Textarea`, `Select`, `Checkbox`.
