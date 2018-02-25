import ApiService from './Api.service'

class EventService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const eventService = new EventService('event{/id}')
