import { IIntegration } from '@octobots/ui-inbox/src/settings/integrations/types';
import { IUser } from '@octobots/ui/src/auth/types';
import { QueryResponse } from '@octobots/ui/src/types';

export interface assignementConfig {
  smartAssignement?: boolean;
  assignType?: string;
  maxAllowed?: number;
  reOpened?: boolean;
  newOutgoingMsg?: boolean;
  idleAutomation?: boolean;
  idleAction?: string;
  automationNs?: string;
  idleTime?: number;
}

// query types
export interface IChannel {
  _id: string;
  name: string;
  description?: string;
  integrationIds: string[];
  memberIds: string[];
  skillIds: string[];
  members: IUser[];
  assignementConfig: assignementConfig;
}

export interface IChannelDoc extends IChannel {
  integrations: IIntegration[];
}

// query types
export type ChannelsQueryResponse = {
  channels: IChannel[];
} & QueryResponse;

export type ChannelDetailQueryResponse = {
  channelDetail: IChannel;
} & QueryResponse;

export type ChannelsGetLastQueryResponse = {
  channelsGetLast: IChannel;
} & QueryResponse;

export type ChannelsCountQueryResponse = {
  channelsTotalCount: number;
} & QueryResponse;

// mutation types
export type EditChannelMutationVariables = {
  _id?: string;
  name: string;
  memberIds: string[];
  description?: string;
  integrationIds: string[];
  assignementConfig?: assignementConfig;
};

export type EditChannelMutationResponse = {
  editMutation: (params: {
    variables: EditChannelMutationVariables;
  }) => Promise<void>;
};
