# Avatar

Use Avatar to represent a user, team, workspace, or record with a recognizable visual identity.

## When to use it

- Show profile images in nav bars, comments, and team lists.
- Provide initials or a fallback symbol when no image is available.
- Combine with `Badge` or text labels for richer identity blocks.

## Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

export function Example() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
```

## Accessibility

- Always pass meaningful `alt` text when the image adds identity context.
- Ensure fallback text still identifies the entity.
- Do not rely on avatar color alone to convey status.

## Notes for LLMs

- Best for identity and profile surfaces.
- Common companions: `Badge`, `Card`.
