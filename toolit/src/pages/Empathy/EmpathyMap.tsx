import React, { useRef } from 'react'
import { LiveShareHost } from '@microsoft/teams-js'
import { LiveShareProvider } from '@microsoft/live-share-react'
import Empathy from './Empathy'

const EmpathyMap: React.FC = () => {
  const hostRef = useRef<LiveShareHost>(LiveShareHost.create())

  return (
    <LiveShareProvider joinOnLoad host={hostRef.current}>
      <Empathy />
    </LiveShareProvider>
  )
}

export default EmpathyMap
