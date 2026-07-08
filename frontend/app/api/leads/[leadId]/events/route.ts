import { NextRequest } from "next/server";

import { BASE_URL } from "@/lib/api/axios";
import { apiURLs } from "@/utils/apiUrls";
import { getAccessToken } from "@/lib/auth/cookies";
import { refreshAccessToken } from "@/lib/api/api-wrapper";

// Proxies the Express SSE stream to the browser. Needed because the access
// token lives in an httpOnly cookie (unreadable client-side) and EventSource
// can't set an Authorization header — so the browser talks to this
// same-origin route, which attaches the header server-side and forwards the
// raw stream through. Requires a persistent Node process (not serverless —
// long-lived streaming responses would get cut off by a function time limit).
export const dynamic = "force-dynamic";

async function fetchUpstream(url: string, accessToken: string) {
  return fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ leadId: string }> },
) {
  const { leadId } = await params;
  const workspaceId = req.nextUrl.searchParams.get("workspaceId");
  const pipelineId = req.nextUrl.searchParams.get("pipelineId");

  if (!workspaceId || !pipelineId) {
    return new Response("workspaceId and pipelineId are required", {
      status: 400,
    });
  }

  let accessToken = await getAccessToken();
  if (!accessToken) {
    try {
      accessToken = await refreshAccessToken();
    } catch {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  // BASE_URL may or may not have a trailing slash (it doesn't in prod, but
  // does in this repo's .env) — axios's baseURL joining normalizes that for
  // us elsewhere, but this is a raw fetch, so do it explicitly.
  const upstreamUrl = `${BASE_URL.replace(/\/+$/, "")}${apiURLs.LEAD.events(workspaceId, pipelineId, leadId)}`;

  let upstream = await fetchUpstream(upstreamUrl, accessToken);

  if (upstream.status === 401) {
    try {
      accessToken = await refreshAccessToken();
      upstream = await fetchUpstream(upstreamUrl, accessToken);
    } catch {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("Failed to connect to event stream", {
      status: upstream.status || 502,
    });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
