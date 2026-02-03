// CORS 配置
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-User-Key',
  'Content-Type': 'application/json'
}

export async function onRequest(context) {
  const { request, env } = context

  // 处理 CORS 预检
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 获取用户 Key (固定为 shared-data,所有用户共享)
  const userKey = request.headers.get('X-User-Key') || 'shared-data'
  const kvKey = `data:${userKey}`

  // GET: 读取数据
  if (request.method === 'GET') {
    const data = await env.USER_DATA.get(kvKey)
    return new Response(data || '{}', { headers: corsHeaders })
  }

  // POST: 保存数据
  if (request.method === 'POST') {
    const body = await request.json()

    // 验证数据结构
    if (!body || typeof body !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid data format' }),
        { status: 400, headers: corsHeaders }
      )
    }

    // 添加时间戳
    const dataWithMeta = {
      ...body,
      _meta: {
        lastUpdate: Date.now()
      }
    }

    await env.USER_DATA.put(kvKey, JSON.stringify(dataWithMeta))

    return new Response(
      JSON.stringify({ success: true, timestamp: dataWithMeta._meta.lastUpdate }),
      { headers: corsHeaders }
    )
  }

  // DELETE: 清除数据
  if (request.method === 'DELETE') {
    await env.USER_DATA.delete(kvKey)
    return new Response(
      JSON.stringify({ success: true }),
      { headers: corsHeaders }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: corsHeaders }
  )
}
