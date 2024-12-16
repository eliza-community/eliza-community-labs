import axios from 'axios'

const elizaCA = 'wUtwjNmjCP9TTTtoc5Xn5h5sZ2cYJm5w2w44b79yr2o'

export default async function checkWallet(req, context) {
  if (req.method === 'OPTIONS') return new Response('ok', { status: 200 })
  
  const { address } = await req.json()

  if (!address) new Response('address is required', { status: 405 })
    
  try {
    const solanaUrl = 'https://solana-mainnet.g.alchemy.com/v2/' + Netlify.env.get('ALCHEMY_API_KEY')

    console.log(solanaUrl)

    const res = await axios.post(solanaUrl, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getTokenAccountsByOwner',
      params: [
        address,
        {
          mint: elizaCA
          // programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          encoding: 'jsonParsed'
        }
      ]
    })

    console.log(res.data)

    const has_$eliza = res.data.result.value.some((token) => token.account.data.parsed.info.mint === elizaCA)

    return new Response(JSON.stringify({ has_$eliza }), { status: 200 })
  } catch (err) {
    return new Response(err?.message || err?.response?.data?.message || 'error', { status: 500 })
  }
}