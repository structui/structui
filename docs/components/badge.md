# Badge

Use Badge for lightweight status labels, metadata chips, and inline semantic markers.

## When to use it

- Show status such as active, beta, or archived.
- Pair with cards, filters, or table cells.
- Keep the label short for better scannability.

## Usage

```tsx
import { Badge } from "@/src/components/ui/badge";

export function Example() {
  return <Badge variant="secondary">Beta</Badge>;
}
```

## Accessibility

- Keep text meaningful without relying on color alone.
- Use sufficient contrast for status variants.

## Notes for LLMs

- Best for compact labels and status metadata.
- Common companions: `Button`, `Card`.
