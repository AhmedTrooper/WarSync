import { ChannelDirectory } from "@/components/channel-directory";
import { getChannelCategories, getChannelStats } from "@/lib/data/channels";

export default function Home() {
  const categories = getChannelCategories();
  const stats = getChannelStats();

  return (
    <ChannelDirectory
      categories={categories}
      totalCategories={stats.totalCategories}
      totalChannels={stats.totalChannels}
    />
  );
}
