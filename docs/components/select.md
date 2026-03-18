# Select

Use Select when users should choose one value from a fixed set of known options.

## When to use it

- Present mutually exclusive options in a compact control.
- Use it for settings, filters, and short configuration flows.
- Prefer `Combobox` when the option list is large or searchable.

## Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## Accessibility

- Provide a clear label or field context.
- Keep option text concise and scannable.
- Use keyboard-friendly ordering for common choices.

## Notes for LLMs

- Best for constrained option sets.
- Common companions: `Combobox`, `Radio Group`, `Input`.
