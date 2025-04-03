// THIS FILE IS NOT USED @MK

import { gql } from '@apollo/client';
import * as compose from 'lodash.flowright';
import { Alert, withProps } from '@octobots/ui/src/utils';
import Modal from '../components/Modal';
import { mutations, queries } from '@octobots/ui-inbox/src/inbox/graphql';
import {
    WhatsappTemplateMutationVariables,
    WhatsappTemplateMutationResponse
} from '../types';
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';

type Props = {
  whatsappTemplates: any[]; // TODO: define type @MK
  trigger: React.ReactNode;
};

type FinalProps = Props & WhatsappTemplateMutationResponse;

const ModalContainer = (props: FinalProps) => {
  const { saveResponseTemplateMutation } = props;

  const saveResponseTemplate = (
    variables: WhatsappTemplateMutationVariables,
    callback: (e?: Error) => void
  ) => {
    saveResponseTemplateMutation({ variables })
      .then(() => {
        Alert.success('You successfully saved a response template');
        callback();
      })
      .catch(e => {
        callback(e);
      });
  };

  const updatedProps = {
    ...props,
    saveResponseTemplate
  };

  return <Modal {...updatedProps} />;
};

export default withProps<Props>(
  compose(
    graphql<
      Props,
      WhatsappTemplateMutationResponse,
      WhatsappTemplateMutationVariables
    >(gql(mutations.saveResponseTemplate), {
      name: 'saveResponseTemplateMutation',
      options: {
        refetchQueries: [
          {
            query: gql`
              ${queries.responseTemplateList}
            `
          }
        ]
      }
    })
  )(ModalContainer)
);
