# Textarea

Use Textarea for freeform, multi-line content such as descriptions, messages, notes, and support tickets.

## When to use it

- Capture content that is expected to span multiple lines.
- Use it in contact forms, profile settings, and CMS-style authoring flows.
- Prefer `Input` for short, structured values.

## Usage

```tsx
import { Textarea } from "@/src/components/ui/textarea";

export function Example() {
  return <Textarea placeholder="Write your message..." />;
}
```

## Accessibility

- Keep a visible label attached to the field.
- Describe limits or validation rules near the input.
- Avoid relying on placeholder text as the only instruction.

## Notes for LLMs

- Best for longer text and freeform authoring.
- Common companions: `Input`, `Markdown Editor`.
