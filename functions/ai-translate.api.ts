import {Ai} from '@cloudflare/ai';

interface Env {
  AI: any
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {

  const requestParams = new URL(request.url).searchParams;
  const text = requestParams.get('text');

  if (!text) return new Response('Missing data ' + requestParams.toString(), { status: 400, statusText: 'Missing data'});

  const ai = new Ai(env.AI);
  const inputs = {
    // text: 'מצפה תת ימי ים סוף בעמ חנ ',
    text,
    source_lang: 'he',
    target_lang: 'en'
  };
  const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);

  return Response.json({ inputs, response });
}
