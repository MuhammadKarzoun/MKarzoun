import { QueryResponse } from '@octobots/ui/src/types';

export interface IMapping {
  name: string;
  type: string; // e.g., "text"
}

export interface ITemplate {
  _id: string;
  template_id: string;
  name: string;
  mapping?: IMapping[];
}

export interface IResponseTemplate {
  _id: string;
  name: string;
}

export type whatsappSendTemplateMessageMutation = {
  integrationId: string;
  conversationId?: string;
  customerId?: string;
  recepient?: string;
  templateId?: string;
  templateName?: string;
  language?: string;
  params: any;
};

export type whatsappSendTemplateMessageResponse = {
  sendWhatsappTemplateMessageMutation: (doc: {
    variables: whatsappSendTemplateMessageMutation;
  }) => Promise<any>;
};

export type WhatsappTemplateMutationVariables = {
  name: string;
  params: any;
};

export type WhatsappTemplateMutationResponse = {
  saveResponseTemplateMutation: (doc: {
    variables: WhatsappTemplateMutationVariables;
  }) => Promise<any>;
};


interface IWhatsappTemplate {
  _id: string;
  name: string;
}

/**
 * Base structure for any Apollo query response
 */
export type QueryResponse = {
  loading: boolean;
  refetch: (variables?: any) => Promise<any>;
  error?: string;
};

/**
 * The specific shape of our WhatsApp templates query response
 */
export type WhatsappTemplatesQueryResponse = {
  whatsappGetMessageTemplates: IWhatsappTemplate[];
  fetchMore: (variables: any) => void;
} & QueryResponse;
