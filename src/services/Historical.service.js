import ApiService from './Api.service'

class HistoricalService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const historicalService = new HistoricalService('historical{/id}')
