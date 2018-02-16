import ApiService from './Api.service'

class SensorService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const sensorService = new SensorService('sensor{/id}')
