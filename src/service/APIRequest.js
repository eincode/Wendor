import metrics from '../config/metrics'

class ApiRequest {
  static post = async (route, params, header) => {
    return await fetch(metrics.BASE_URL + route, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        ...header
      },
      body: JSON.stringify(params)
    })
  }

  static get = async (route, header) => {
    return await fetch(metrics.BASE_URL + route, {
      method: 'GET',
      headers: {
        ...header
      }
    })
  }

  static patch = async(route, params, header) => {
    return await fetch(metrics.BASE_URL + route, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        ...header
      },
      body: JSON.stringify(params)
    })
  }
}

export default ApiRequest
