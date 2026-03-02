import channelsJson from "./channels.json";

export type ChannelAccount = {
  id: string;
  name: string;
  url: string;
};

export type ChannelCategory = {
  category: string;
  accounts: ChannelAccount[];
};

const channelsData = channelsJson as ChannelCategory[];

export function getChannelCategories(): ChannelCategory[] {
  return channelsData;
}

export function getChannelStats() {
  const totalChannels = channelsData.reduce(
    (sum, category) => sum + category.accounts.length,
    0,
  );

  return {
    totalCategories: channelsData.length,
    totalChannels,
  };
}
