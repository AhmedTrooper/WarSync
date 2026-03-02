"use client";

import { track } from "@vercel/analytics";
import {
  Activity,
  ExternalLink,
  Github,
  Plus,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import type { ChannelCategory } from "@/lib/data/channels";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ChannelDirectoryProps = {
  categories: ChannelCategory[];
  totalChannels: number;
  totalCategories: number;
};

export function ChannelDirectory({
  categories,
  totalChannels,
  totalCategories,
}: ChannelDirectoryProps) {
  const issueUrl = "https://github.com/AhmedTrooper/4/issues/new";
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories
      .map((category) => ({
        ...category,
        accounts: category.accounts.filter((account) => {
          return (
            account.name.toLowerCase().includes(normalizedQuery) ||
            account.id.toLowerCase().includes(normalizedQuery) ||
            category.category.toLowerCase().includes(normalizedQuery)
          );
        }),
      }))
      .filter((category) => category.accounts.length > 0);
  }, [categories, query]);

  const visibleChannels = filteredCategories.reduce(
    (sum, category) => sum + category.accounts.length,
    0,
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/40 via-background to-background" />
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 animate-float rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 animate-float-delayed rounded-full bg-chart-2/15 blur-3xl" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <Card className="animate-fade-in-up rounded-3xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-4">
            <Badge variant="outline" className="gap-2 rounded-full py-1">
              <ShieldAlert className="size-3.5" />
              Curated war update channels
            </Badge>
            <CardTitle className="text-3xl tracking-tight sm:text-5xl">
              WarSync Live Tracker
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm sm:text-base">
              Follow trusted and trending war-update channels in one place.
              Search fast, open source accounts instantly, and monitor
              engagement through analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="rounded-2xl bg-background/70 shadow-none">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Total channels</p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-semibold">
                    <Users className="size-5 text-primary" />
                    {totalChannels}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl bg-background/70 shadow-none">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Categories</p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-semibold">
                    <Activity className="size-5 text-chart-2" />
                    {totalCategories}
                  </p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl bg-background/70 shadow-none">
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">Visible now</p>
                  <p className="mt-1 text-2xl font-semibold">{visibleChannels}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                className="rounded-xl"
                onClick={() => track("new_link_issue_clicked")}
              >
                <a href={issueUrl} target="_blank" rel="noreferrer noopener">
                  <Plus className="size-4" />
                  Add New Link (Issue)
                </a>
              </Button>
              <Button asChild variant="secondary" className="rounded-xl">
                <a href={issueUrl} target="_blank" rel="noreferrer noopener">
                  <Github className="size-4" />
                  Open GitHub Issues
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up animation-delay-100 rounded-2xl bg-card/80 p-4 backdrop-blur-sm sm:p-5">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search channel, handle, or category..."
              className="h-11 rounded-xl bg-background pl-10 text-sm"
            />
          </label>
        </Card>

        <section className="grid gap-5">
          {filteredCategories.length === 0 ? (
            <Card className="animate-fade-in-up rounded-2xl p-8 text-center text-sm text-muted-foreground">
              No channels found for this search.
            </Card>
          ) : (
            filteredCategories.map((group, groupIndex) => (
              <Card
                key={group.category}
                style={{ animationDelay: `${groupIndex * 90 + 120}ms` }}
                className="animate-fade-in-up rounded-3xl bg-card/90 p-5 backdrop-blur-sm sm:p-6"
              >
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {group.category}
                  </h2>
                  <Badge variant="secondary" className="rounded-full px-2.5 py-1">
                    {group.accounts.length} channels
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.accounts.map((account) => (
                    <a
                      key={account.id}
                      href={account.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => {
                        track("channel_open", {
                          channelId: account.id,
                          category: group.category,
                        });
                      }}
                      className="group rounded-2xl border bg-background/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent/40"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{account.name}</p>
                        <ExternalLink className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">@{account.id}</p>
                    </a>
                  ))}
                </div>
              </Card>
            ))
          )}
        </section>
      </main>
    </div>
  );
}
