import React from 'react';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import * as compose from 'lodash.flowright';
import { Alert, withProps } from '@octobots/ui/src/utils';
import WhatsappTemplates from '../components/WhatsappTemplates';
import { mutations, queries } from '../graphql';
import { IAutomation } from '@octobots/ui-automations/src/types';
import { ITemplate, whatsappSendTemplateMessageMutation, whatsappSendTemplateMessageResponse } from '../types';
import { __ } from "coreui/utils";
import { IConversation } from '@octobots/ui-inbox/src/inbox/types';
import { ICustomer } from '@octobots/ui-contacts/src/customers/types';
import { ICompany } from '@octobots/ui-contacts/src/companies/types';
import client from "@octobots/ui/src/apolloClient";
import { queries as integrationQueries } from '@octobots/ui-inbox/src/settings/integrations/graphql';
import { Integration } from '../../../plugin-automations-ui/src/types';

type Props = {
  conversation?: IConversation;
  customer?: ICustomer | ICompany;
  onClose?: () => void;
  buttonFrom: string;
  buttonStyle?: boolean;
};

type FinalProps = whatsappSendTemplateMessageResponse & Props;

function WhatsappTemplatesContainer(props: FinalProps) {
  const { sendWhatsappTemplateMessageMutation } = props;

  const sendWhatsappTemplate = (variables: whatsappSendTemplateMessageMutation) => {
    sendWhatsappTemplateMessageMutation({ variables })
      .then(() => {
        Alert.info('Whatsapp template sent');
      })
      .catch(error => {
        Alert.error(error.message);
        //Alert.error('Failed to send WhatsApp template');
      });
  };

  const getIntegrations = (
    kind: string,
    callback: (data?: Integration[]) => void
  ) => {
    client
      .query({
        query: gql(integrationQueries.integrations),
        variables: { kind },
      })
      .then((response: any) => {
        if (typeof callback === "function") {
          callback(response.data.integrations);
        }
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  };

  const getWhatsappTemplates = (
    integrationId: string,
    callback: (data?: ITemplate[]) => void
  ) => {
    client
      .query({
        query: gql(queries.whatsappGetMessageTemplates),
        variables: { integrationId, limit: 100 },
      })
      .then((response: any) => {
        if (typeof callback === "function") {
          callback(response.data.whatsappGetMessageTemplates);
        }
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  };

  const getAutomations = (
    integrationId: string,
    callback: (data?: IAutomation[]) => void
  ) => {
    client
      .query({
        query: gql(queries.automations),
        variables: { integrationId },
      })
      .then((response: any) => {
        if (typeof callback === "function") {
          callback(response.data.automations);
        }
      })
      .catch((error) => {
        Alert.error(error.message);
      });
  };

  // if (loading) return <div></div>;
  // if (error) return <Tip placement="top" text={__('Error loading WhatsApp Templates')}>
  //   <Icon icon="whatsapp" color='red' />
  // </Tip>;
  // if (loading || props.automationsQuery.loading) {
  //   return <Spinner objective={true} />;
  // }

  return (
    <WhatsappTemplates
      {...props}
      sendMessage={sendWhatsappTemplate}
      getWhatsappTemplates={getWhatsappTemplates}
      getAutomations={getAutomations}
      getIntegrations={getIntegrations}
    />
  );
}

export default withProps<Props>(
  compose(
    graphql<
      Props,
      whatsappSendTemplateMessageResponse,
      whatsappSendTemplateMessageMutation
    >(gql(mutations.whatsappSendTemplateMessage), {
      name: 'sendWhatsappTemplateMessageMutation',
      options: {}
    })
  )(WhatsappTemplatesContainer)
);
