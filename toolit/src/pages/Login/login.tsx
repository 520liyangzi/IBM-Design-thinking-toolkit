import { pages } from '@microsoft/teams-js'
import { useEffect, useState } from 'react'
import { inTeams } from '../../utils/inTeams'
import { AppRoutes } from './AppRoutes'

function Login(): JSX.Element {
  const [selectedRoute, setSelectedRoute] = useState(undefined)
  //@ts-ignore
  const onSelectedRouteChange = (e) => {
    setSelectedRoute(e.currentTarget.value)
  }
  useEffect(() => {
    if (!inTeams) return
    pages.config.registerOnSaveHandler(function (saveEvent) {
      pages.config.setConfig({
        suggestedDisplayName: 'Live Share React',
        contentUrl: `${window.location.origin}${selectedRoute}?inTeams=true`,
      })
      saveEvent.notifySuccess()
    })
    pages.config.setValidityState(!!selectedRoute)
  }, [selectedRoute])

  return (
    <div>
      <input
        type="radio"
        name="Go Home Page"
        value={AppRoutes.Home}
        checked={selectedRoute === AppRoutes.Home}
        onChange={onSelectedRouteChange}
      />
      {'Go Home Page'}
    </div>
  )
}
export default Login
