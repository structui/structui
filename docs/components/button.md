# Button

Use Button for primary and secondary actions across forms, dialogs, and page-level calls to action.

## When to use it

- Trigger an action or submit a form.
- Pick a variant to communicate hierarchy.
- Prefer concise labels and optional leading icons.

## Usage

```tsx
import { Button } from "@/src/components/ui/button";

export function Example() {
  return <Button>Save changes</Button>;
}
```

## Accessibility

- Preserves keyboard focus styles.
- Works with semantic button behavior by default.
- Supports accessible polymorphism through `asChild` when needed.

## Notes for LLMs

- Best for action triggers and CTAs.
- Common companions: `Badge`, `Accordion`.
