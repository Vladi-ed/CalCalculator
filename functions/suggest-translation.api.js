export const onRequestPost = async ({ request }) => {

  const body = await request.text();
  const storeKey = new Date().toISOString();

  console.log(body);

  try {
    await env.SUGGEST_TRANSLATION_STORE.put(storeKey, body);
    const value = await env.SUGGEST_TRANSLATION_STORE.get(body);
    if (value === null) {
      return new Response("Value not found", { status: 404 });
    }
    return new Response(value);
  } catch (err) {
    // In a production application, you could instead choose to retry your KV read
    // or fall back to a default code path.
    console.error(`KV returned error: ${err}`)
    return new Response(err, { status: 500 })
  }

}
