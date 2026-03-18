import Link from "next/link";

import { Container } from "@/src/components/layout/container";
import { Button } from "@/src/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] max-w-7xl flex-col items-start justify-center gap-4 py-16">
      <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">404</p>
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="max-w-xl text-muted-foreground">
        The requested route does not exist in the new app router structure.
      </p>
      <Button asChild>
        <Link href="/">Return home</Link>
      </Button>
    </Container>
  );
}
