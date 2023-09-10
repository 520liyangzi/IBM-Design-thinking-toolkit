import React, { useEffect, useState } from 'react'
import { initializeIcons } from '@fluentui/react'
import {
  AzureClient,
  AzureContainerServices,
} from '@fluidframework/azure-client'
import { ConnectionState, IFluidContainer } from 'fluid-framework'
import ReactDOM from 'react-dom'
import { BrainstormView } from './view/BrainstormView'
import './view/index.css'
import './view/App.css'
import { connectionConfig, containerSchema } from './Config'

const BrainstormPage: React.FC = () => {
  const [container, setContainer] = useState<IFluidContainer | null>(null)
  const [services, setServices] = useState<AzureContainerServices | null>(null)

  useEffect(() => {
    const start = async () => {
      initializeIcons()

      const getContainerId = (): { containerId: string; isNew: boolean } => {
        let isNew = false
        if (window.location.hash.length === 0) {
          isNew = true
        }
        const containerId = window.location.hash.substring(1)
        return { containerId, isNew }
      }

      const { containerId, isNew } = getContainerId()

      const client = new AzureClient(connectionConfig)

      let container: IFluidContainer
      let services: AzureContainerServices

      if (isNew) {
        ;({ container, services } = await client.createContainer(
          containerSchema
        ))
        const containerId = await container.attach()
        window.location.hash = containerId
      } else {
        ;({ container, services } = await client.getContainer(
          containerId,
          containerSchema
        ))
      }

      if (container.connectionState !== ConnectionState.Connected) {
        await new Promise<void>((resolve) => {
          container.once('connected', () => {
            resolve()
          })
        })
      }

      setContainer(container)
      setServices(services)
    }

    start().catch((error) => console.error(error))
  }, [])

  if (!container || !services) {
    return <div>Loading...</div> // Or return a loading spinner.
  }

  return <BrainstormView container={container} services={services} />
}

export default BrainstormPage
