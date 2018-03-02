import ApiService from './Api.service'

class ClusterService extends ApiService {
  constructor (endpoint) {
    super(endpoint)
    this.name = endpoint
  }
}

export const clusterService = new ClusterService('cluster{/id}')
