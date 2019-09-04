import { matchRoutes } from 'react-router-config'

export default function loadPrefetch(routes, url) {
  const matchedRoutes = matchRoutes(routes, url)

  const promises = matchedRoutes.map(({ route, match }) => {
    return route.prefetch
      ? route.prefetch({ match })
      : Promise.resolve(null)
  })

  return Promise.all(promises)
}
