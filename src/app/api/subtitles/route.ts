import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // 1. Check API key first
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOWQ4MjI1MjFkZjgxZGY4YzdhYjFlOGIwNGIyYjU5ZSIsIm5iZiI6MTc3MDYzNTMzNi40MzUwMDAyLCJzdWIiOiI2OTg5YzA0ODZiMzMyYjhlZWY1ZDkzOWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-eBs0VvEU5hF3dYTPkFUiXzMFWlRXiVvmNoyyyeaf4o";
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set in .env.local" },
      { status: 500 },
    );
  }

  // 2. Parse request body
  let movie: any, credits: any;
  try {
    const body = await req.json();
    movie = body.movie;
    credits = body.credits;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const cast =
    credits?.cast
      ?.slice(0, 5)
      .map((c: { name: string }) => c.name)
      .join(", ") ?? "";
  const directors =
    credits?.crew
      ?.filter((c: { job: string }) => c.job === "Director")
      .map((d: { name: string }) => d.name)
      .join(", ") ?? "";

  const runtime_min = movie?.runtime ?? 120;
  const totalMs = runtime_min * 60 * 1000;

  const prompt = `You are a professional Mongolian subtitle writer. Write authentic dialogue subtitles for the movie "${movie?.title}" (${movie?.release_date?.slice(0, 4)}).

Story: ${movie?.overview}
Director: ${directors}
Cast: ${cast}
Runtime: ${runtime_min} minutes

Output exactly 40 subtitle lines in this pipe-separated format, one per line:
startMs|endMs|mongolian text

Rules:
- startMs starts at 8000 and increases steadily to ${totalMs - 15000}
- Each subtitle duration: 2500 to 4500ms
- Gap between lines: 800 to 2500ms  
- Write natural Mongolian Cyrillic dialogue that fits the movie
- Output ONLY the 40 lines, nothing else`;

  // 3. Call Anthropic
  let anthropicResponse: Response;
  try {
    anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 3000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
  } catch (fetchErr) {
    return NextResponse.json(
      { error: `Network error reaching Anthropic: ${fetchErr}` },
      { status: 500 },
    );
  }

  // 4. Handle non-OK Anthropic response
  if (!anthropicResponse.ok) {
    let detail = "";
    try {
      detail = await anthropicResponse.text();
    } catch {}
    return NextResponse.json(
      {
        error: `Anthropic returned ${anthropicResponse.status}: ${detail.slice(0, 200)}`,
      },
      { status: 500 },
    );
  }

  // 5. Parse Anthropic response
  let rawText = "";
  try {
    const data = await anthropicResponse.json();
    rawText =
      data.content
        ?.map((block: { type: string; text?: string }) =>
          block.type === "text" ? block.text : "",
        )
        .join("") ?? "";
  } catch (parseErr) {
    return NextResponse.json(
      { error: `Failed to parse Anthropic response: ${parseErr}` },
      { status: 500 },
    );
  }

  // 6. Parse subtitle lines
  const subtitles = rawText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\|\d+\|.+/.test(line))
    .map((line, index) => {
      const [startStr, endStr, ...rest] = line.split("|");
      return {
        id: index + 1,
        startMs: parseInt(startStr),
        endMs: parseInt(endStr),
        text: rest.join("|").trim(),
      };
    });

  if (subtitles.length === 0) {
    return NextResponse.json(
      {
        error: `AI returned unparseable output. Raw: "${rawText.slice(0, 300)}"`,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ subtitles });
}
