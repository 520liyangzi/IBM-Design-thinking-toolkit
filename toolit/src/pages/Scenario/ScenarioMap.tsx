import { useRef } from 'react'
import { LiveShareHost } from '@microsoft/teams-js'
import { LiveShareProvider } from '@microsoft/live-share-react'
import Scenario from './Scenario'
const ScenarioMap: React.FC = () => {
  const hostRef = useRef(LiveShareHost.create())
  return (
    <LiveShareProvider joinOnLoad host={hostRef.current}>
      <Scenario></Scenario>
    </LiveShareProvider>
  )
}

export default ScenarioMap
