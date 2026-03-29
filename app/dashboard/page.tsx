import { redirect } from "next/navigation";
import { LockKeyhole, User } from "lucide-react";

import { auth } from "@/src/auth";
import { Container } from "@/src/components/layout/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <Container className="mx-auto max-w-7xl py-16">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Authenticated User
            </CardTitle>
            <CardDescription>
              This page is protected by the Next.js backend with NextAuth credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{session.user?.name}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-4 w-4 text-primary" />
              Auth Flow
            </CardTitle>
            <CardDescription>
              Username and password are checked by the credentials provider in `src/auth.ts`.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Default credentials are `admin / structui` unless `AUTH_USERNAME` and
            `AUTH_PASSWORD` are overridden in the environment.
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
