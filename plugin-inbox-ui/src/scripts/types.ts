import { IIntegration } from '@octobots/ui-inbox/src/settings/integrations/types';

export interface IScript {
  _id: string;
  name: string;
  messengerId?: string;
  leadIds?: string[];
  leads?: IIntegration[];
  kbTopicId?: string;
}
