import axios from 'axios';

export default async function imageGen(req, context) {
  if (req.method === 'OPTIONS') return new Response('ok', { status: 200 })
  
  const { prompt } = await req.json()

  if (!prompt) new Response('Missing prompt', { status: 405 })

    const api_key = Netlify.env.get('IMG_API_KEY')

    try {
      const response = await axios.post('https://api.siliconflow.cn/v1/images/generations', {
        model: 'black-forest-labs/FLUX.1-schnell',
        prompt,
        image_size: '1024x1024',
        seed: Math.floor(Math.random() * 9999999999),
        prompt_enhancement: true
      }, {
        headers: {
          'Authorization': 'Bearer ' + api_key,
          'Content-Type': 'application/json'
        }
      })

      const url = response.data.images[0].url

      return new Response(JSON.stringify({ url }), { status: 200 })
    } catch (err) {
      console.log(err)
      return new Response(err?.message || err?.response?.data?.message || 'error', { status: 500 })
    }
}