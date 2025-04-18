import * as React from 'react';
import * as compose from 'lodash.flowright';

import { Alert, withProps } from '@octobots/ui/src/utils';
import {
  IntegrationsQueryResponse,
  SendSmsMutationResponse
} from '../../types';
import { mutations, queries } from '../../graphql';

import SmsForm from '../../components/telnyx/SmsForm';
import Spinner from '@octobots/ui/src/components/Spinner';
import { gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { queries as integrationQueries } from '@octobots/ui-inbox/src/settings/integrations/graphql';

type Props = {
  closeModal: () => void;
  primaryPhone: string;
};

type FinalProps = {
  sendSmsMutation: SendSmsMutationResponse;
  integrationsGetIntegrationsQuery: any;
  integrationsQuery: IntegrationsQueryResponse;
} & Props;

const SmsFormContainer = (props: FinalProps) => {
  const {
    integrationsQuery,
    integrationsGetIntegrationsQuery,
    closeModal,
    sendSmsMutation
  } = props;

  if (integrationsGetIntegrationsQuery.loading || integrationsQuery.loading) {
    return <Spinner objective={true} />;
  }

  const integrations = integrationsQuery.integrations || [];
  const externalIntegrations =
    integrationsGetIntegrationsQuery.integrationsGetIntegrations || [];

  const mappedIntegrations: any[] = [];

  for (const e of externalIntegrations) {
    const local = integrations.find(i => i._id === e.octoApiId);

    if (local) {
      mappedIntegrations.push({
        _id: local._id,
        name: local.name,
        phoneNumber: e.telnyxPhoneNumber,
        isActive: local.isActive
      });
    }
  }

  const sendSms = (integrationId: string, content: string, to: string) => {
    if (!integrationId) {
      return Alert.warning('Please choose phone number');
    }
    if (!content) {
      return Alert.warning('Please type sms text');
    }
    if (!to) {
      return Alert.warning('Customer or company does not have primary phone');
    }

    sendSmsMutation({
      variables: { integrationId, content, to }
    })
      .then(({ data }) => {
        const { status } = data.integrationsSendSms;

        if (status === 'ok') {
          Alert.success('SMS successfully sent');
        } else {
          Alert.info(status);
        }

        closeModal();
      })
      .catch(e => {
        Alert.error(e.message);
      });
  };

  const updatedProps = {
    ...props,
    sendSms,
    integrations: mappedIntegrations,
    closeModal
  };

  return <SmsForm {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql(gql(integrationQueries.integrationsGetIntegrations), {
      name: 'integrationsGetIntegrationsQuery',
      options: () => ({
        variables: { kind: 'telnyx' },
        fetchPolicy: 'network-only'
      })
    }),
    graphql<Props, IntegrationsQueryResponse>(gql(queries.integrations), {
      name: 'integrationsQuery',
      options: () => {
        return {
          variables: { kind: 'telnyx' },
          fetchPolicy: 'network-only'
        };
      }
    }),
    graphql<Props>(gql(mutations.integrationsSendSms), {
      name: 'sendSmsMutation'
    })
  )(SmsFormContainer)
);
