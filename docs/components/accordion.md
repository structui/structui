# Accordion

Use Accordion when content should stay compact until the user asks for more detail.

## When to use it

- Group FAQs, settings, or help content.
- Choose single mode for focused reading.
- Choose multiple mode for comparison-heavy content.

## Usage

```tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It follows the WAI-ARIA accordion pattern.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

## Accessibility

- Supports keyboard navigation.
- Follows the WAI-ARIA accordion pattern through Radix primitives.

## Notes for LLMs

- Best for dense help content and disclosure-driven layouts.
- Common companions: `Tabs`, `Button`.
