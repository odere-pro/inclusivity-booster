import pregenerated from './lib/data/pregenerated.json'

export async function transform(type, content) {
  try {
    const res = await fetch('/api/transform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, content })
    })
    if (!res.ok) throw new Error('API error')
    const data = await res.json()
    return { ...data, live: true }
  } catch {
    const fallback = pregenerated[type]
    return { ...fallback, live: false }
  }
}
