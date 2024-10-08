interface Env {
  AI: Ai;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {

  const requestParams = new URL(request.url).searchParams;
  const text = requestParams.get('text');

  if (!text) return new Response('Missing data ' + requestParams.toString(), { status: 400, statusText: 'Missing data'});

  const inputs = {
    text,
    source_lang: 'he',
    target_lang: 'en'
  };
  const response = await env.AI.run('@cf/meta/m2m100-1.2b', inputs);

  return Response.json({ inputs, response });
}
