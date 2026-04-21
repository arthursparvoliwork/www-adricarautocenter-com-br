// Edge function: puxa reviews do Google Places API.
// Requer secret GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");
  const placeId = Deno.env.get("GOOGLE_PLACE_ID");

  if (!apiKey || !placeId) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: "missing_secrets",
        message: "Configure GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID nos secrets.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&language=pt-BR&key=${apiKey}`;
    const r = await fetch(url);
    const data = await r.json();
    return new Response(
      JSON.stringify({
        ok: true,
        rating: data.result?.rating,
        total: data.result?.user_ratings_total,
        reviews: (data.result?.reviews ?? []).slice(0, 5),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
