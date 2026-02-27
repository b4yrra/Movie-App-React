import { WatchTVClient } from "./watch-tv-client";

// Minimal TV details fetcher (TMDB TV endpoint)
async function getTVDetails(tvId: string) {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
}

async function getTVCredits(tvId: string) {
  const token = process.env.TMDB_TOKEN;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}/credits?language=en-US`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.json();
}

const WatchTVPage = async ({
  params,
}: {
  params: Promise<{ tvId: string; season: string; episode: string }>;
}) => {
  const { tvId, season, episode } = await params;

  const seasonNum = Number(season) || 1;
  const episodeNum = Number(episode) || 1;

  const [show, credits] = await Promise.all([
    getTVDetails(tvId),
    getTVCredits(tvId),
  ]);

  return (
    <WatchTVClient
      show={show}
      credits={credits}
      season={seasonNum}
      episode={episodeNum}
    />
  );
};

export default WatchTVPage;
