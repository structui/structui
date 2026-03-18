# Tabs

Use Tabs to switch between related content panels without forcing a route change.

## When to use it

- Separate related views such as overview, settings, analytics, or code examples.
- Keep content groups short and clearly labeled.
- Prefer routes when panels need distinct URLs or deep linking beyond local context.

## Usage

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

export function Example() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">Preview content</TabsContent>
      <TabsContent value="code">Code content</TabsContent>
    </Tabs>
  );
}
```

## Accessibility

- Keep trigger labels short and descriptive.
- Preserve clear focus styles across triggers.
- Ensure tab content updates remain understandable for screen-reader users.

## Notes for LLMs

- Best for switching local panels in docs, dashboards, and settings.
- Common companions: `Accordion`, `Navigation Menu`.
