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
  const issueUrl = "https://github.com/AhmedTrooper/WarSync/issues";
  const repoUrl = "https://github.com/AhmedTrooper/WarSync";
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
      {/* Dynamic colorful blobs */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,var(--color-secondary)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,var(--color-accent)_0%,transparent_50%)] opacity-25 mix-blend-multiply dark:opacity-20 dark:mix-blend-screen" />
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[500px] w-[500px] animate-float rounded-full bg-primary/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] animate-float-delayed rounded-full bg-secondary/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-[40%] top-[40%] h-[400px] w-[400px] animate-float rounded-full bg-accent/20 blur-[100px]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <Card className="animate-fade-in-up rounded-3xl border-primary/20 bg-background/80 shadow-lg backdrop-blur-xl">
          <CardHeader className="space-y-4">
            <Badge variant="outline" className="w-fit gap-2 rounded-full border-primary/30 bg-primary/10 py-1.5 px-3 text-primary">
              <ShieldAlert className="size-4" />
              Curated war update channels
            </Badge>
            <CardTitle className="bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl drop-shadow-sm">
              WarSync Live Tracker
            </CardTitle>
            <CardDescription className="max-w-3xl text-base text-foreground/80 sm:text-lg">
              Follow trusted and trending war-update channels in one place.
              Search fast, open source accounts instantly, and monitor
              engagement through analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="overflow-hidden rounded-2xl border-none bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-primary">Total channels</p>
                  <p className="mt-2 flex items-center gap-2 text-3xl font-bold text-foreground">
                    <Users className="size-6 text-primary" />
                    {totalChannels}
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden rounded-2xl border-none bg-gradient-to-br from-secondary/20 to-secondary/5 shadow-inner">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-secondary">Categories</p>
                  <p className="mt-2 flex items-center gap-2 text-3xl font-bold text-foreground">
                    <Activity className="size-6 text-secondary" />
                    {totalCategories}
                  </p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden rounded-2xl border-none bg-gradient-to-br from-accent/20 to-accent/5 shadow-inner">
                <CardContent className="p-5">
                  <p className="text-sm font-medium text-accent">Visible now</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{visibleChannels}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={() => track("new_link_issue_clicked")}
              >
                <a href={issueUrl} target="_blank" rel="noreferrer noopener" className="font-semibold text-white">
                  <Plus className="size-5" />
                  Add New Link (Issues)
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl border-secondary/50 bg-secondary/20 text-foreground hover:bg-secondary/40 transition-all hover:scale-105 font-semibold">
                <a href={issueUrl} target="_blank" rel="noreferrer noopener" className="font-semibold">
                  <Github className="size-5" />
                  Open GitHub Issues
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl border-accent/50 bg-accent/20 text-foreground hover:bg-accent/40 transition-all hover:scale-105 font-semibold"
                onClick={() => track("star_repo_clicked")}
              >
                <a href={repoUrl} target="_blank" rel="noreferrer noopener" className="font-semibold">
                  <Github className="size-5" />
                  Star the Repo
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up animation-delay-100 rounded-2xl border-none bg-background/60 p-2 shadow-lg backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 sm:p-3">
          <label className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 size-5 text-primary" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search channel, handle, or category..."
              className="h-14 rounded-xl border-none bg-white/70 pl-12 text-base text-foreground font-medium placeholder:text-muted-foreground/70 shadow-inner transition-all focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/50 dark:bg-black/20 dark:focus-visible:bg-black/40"
            />
          </label>
        </Card>

        <section className="grid gap-6">
          {filteredCategories.length === 0 ? (
            <Card className="animate-fade-in-up rounded-2xl border-dashed border-primary/30 bg-primary/5 p-12 text-center">
              <p className="text-lg font-medium text-foreground">No channels found for this search.</p>
            </Card>
          ) : (
            filteredCategories.map((group, groupIndex) => (
              <Card
                key={group.category}
                style={{ animationDelay: `${groupIndex * 90 + 120}ms` }}
                className="animate-fade-in-up overflow-hidden rounded-3xl border-none bg-background/80 shadow-lg backdrop-blur-xl ring-1 ring-black/5 transition-all hover:ring-primary/30 dark:ring-white/10"
              >
                <div className="border-b border-black/5 bg-white/60 p-5 dark:border-white/10 dark:bg-black/40 sm:px-6 sm:py-4">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                      {group.category}
                    </h2>
                    <Badge variant="secondary" className="rounded-full border-none bg-primary/20 px-3 py-1 text-sm font-bold text-foreground ring-1 ring-primary/40 shadow-sm dark:bg-primary/30">
                      {group.accounts.length} channels
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
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
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/40 dark:bg-black/40 dark:ring-white/10 dark:hover:bg-black/60 dark:hover:ring-primary/50"
                    >
                      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-70 opacity-0" />
                      
                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <p className="font-bold text-foreground line-clamp-2">{account.name}</p>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
                          <ExternalLink className="size-4" />
                        </div>
                      </div>
                      <p className="relative z-10 mt-3 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary">
                        @{account.id}
                      </p>
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
