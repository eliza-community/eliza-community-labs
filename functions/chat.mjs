import axios from "axios"

export default async (req, context) => {
  if (req.method === 'OPTIONS') return new Response('ok', { status: 200 })

  const body = await req.json()

  const messages = body.messages

  if (!messages) new Response('messages is required', { status: 405 })

  const api_key = Netlify.env.get('API_KEY')

  try {
    const res = await axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      model: 'glm-4-flash',
      messages,
      tools: [{
        'type': 'web_search',
        'web_search': {
          enable: true
        }
      }]
    }, {
      headers: {
        'Authorization': 'Bearer ' + api_key,
        'Content-Type': 'application/json'
      }
    })

    return new Response(JSON.stringify(res.data))
  } catch (err) {
    return new Response(err?.message || err?.response?.data?.message || 'error', { status: 500 })
  }
}