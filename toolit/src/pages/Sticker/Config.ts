import {
  AzureClientProps,
  AzureLocalConnectionConfig,
  AzureRemoteConnectionConfig,
} from '@fluidframework/azure-client'
import { SharedMap } from 'fluid-framework'
import { getRandomName } from '@fluidframework/server-services-client'
import { InsecureTokenProvider } from '@fluidframework/test-client-utils'

export const useAzure = process.env.REACT_APP_FLUID_CLIENT === 'azure'

export const containerSchema = {
  initialObjects: {
    map: SharedMap,
  },
}

const userConfig = {
  id: '123',
  name: getRandomName(),
}

const remoteConnectionConfig: AzureRemoteConnectionConfig = {
  type: 'remote',
  tenantId: '', // REPLACE WITH YOUR TENANT ID
  tokenProvider: new InsecureTokenProvider(
    '' /* REPLACE WITH YOUR PRIMARY KEY */,
    userConfig
  ),
  endpoint: '', // REPLACE WITH YOUR AZURE ENDPOINT
}

const localConnectionConfig: AzureLocalConnectionConfig = {
  type: 'local',
  tokenProvider: new InsecureTokenProvider('', userConfig),
  // endpoint: 'http://b8drab.natappfree.cc',
  endpoint: 'http://localhost:7070',
}

export const connectionConfig: AzureClientProps = {
  connection: localConnectionConfig,
}
