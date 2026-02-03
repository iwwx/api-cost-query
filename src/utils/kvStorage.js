// 简化版 API - 不需要设备 ID,使用固定 key
const API_ENDPOINT = '/api/sync'
const FIXED_USER_KEY = 'shared-data' // 所有用户共享的固定 key

/**
 * 保存数据到 KV (立即)
 */
export async function saveToKV(data) {
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-User-Key': FIXED_USER_KEY
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Save failed')
  }

  return await response.json()
}

/**
 * 从 KV 读取数据
 */
export async function loadFromKV() {
  const response = await fetch(API_ENDPOINT, {
    method: 'GET',
    headers: {
      'X-User-Key': FIXED_USER_KEY
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Load failed')
  }

  return await response.json()
}

/**
 * 删除 KV 数据
 */
export async function clearKV() {
  const response = await fetch(API_ENDPOINT, {
    method: 'DELETE',
    headers: {
      'X-User-Key': FIXED_USER_KEY
    }
  })

  if (!response.ok) {
    throw new Error('Clear failed')
  }

  return await response.json()
}
