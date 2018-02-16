import Credentials from '@/services/Credentials.service.js'

export default function (request, next) {
  const credentials = new Credentials()
  if (request.url.includes(process.env.address.api)) request.headers.set('Authorization', credentials.getToken())
  request.headers.set('Accept', 'application/json')
  next()
}
