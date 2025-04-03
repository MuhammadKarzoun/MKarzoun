import React from 'react';
import { ResponseTemplateStyled } from '@octobots/ui-inbox/src/inbox/styles';
import Button from '@octobots/ui/src/components/Button';
import Tip from '@octobots/ui/src/components/Tip';
import Icon from '@octobots/ui/src/components/Icon';
import { __ } from '@octobots/ui/src/utils/core';

// Import our specialized WhatsApp modal
import WhatsappTemplateModal from './Modal';
import { IAutomation } from '@octobots/ui-automations/src/types';
import { IConversation } from '@octobots/ui-inbox/src/inbox/types';
import { ITemplate } from '../types';
import { Integration } from '../../../plugin-automations-ui/src/types';
import { ICustomer } from '@octobots/ui-contacts/src/customers/types';
import { ICompany } from '@octobots/ui-contacts/src/companies/types';

interface IProps {
  buttonFrom: string;
  customer?: ICustomer | ICompany;
  conversation?: IConversation;
  sendMessage: (messageData: any) => Promise<void> | void;
  onClose?: () => void;
  buttonStyle?: boolean;
  getWhatsappTemplates: (integrationId: string, callback: (objects?: ITemplate[]) => void) => void;
  getAutomations: (integrationId: string, callback: (objects?: IAutomation[]) => void) => void;
  getIntegrations: (kind: string, callback: (objects?: Integration[]) => void) => void;
}

/**
 * This component does two things:
 * 1) Renders a "Send WhatsApp Template" trigger (button with an icon)
 * 2) Renders a modal (WhatsappTemplateModal) that:
 *    - Lists templates in a dropdown
 *    - Dynamically shows mapping fields
 *    - Calls sendMessage on submit
 */
function WhatsappTemplates(props: IProps) {
  const { buttonFrom, buttonStyle } = props;

  // The button that triggers the modal
  let trigger;

  if (buttonFrom == "inbox") {
    trigger =
      buttonStyle ? (
        <Button
          btnStyle='success'
          size='small'
          icon='whatsapp'>
          <Tip placement="top" text={__('Send WhatsApp template')}>
            {'Templates'}
          </Tip>
        </Button>
      )
        :
        (<Button id="whatsapp-template-handler" btnStyle="link">
          <Tip placement="top" text={__('Send WhatsApp template')}>
            <Icon icon="whatsapp" />
          </Tip>
        </Button>);
  } else if (buttonFrom == "customer") {
    trigger = (
      <Button
        size='small'
        btnStyle={'success'}
      >
        <Icon icon='whatsapp-1' />
      </Button>
    );
  } else if (buttonFrom == "global") {
    trigger = (
      <Button style={{ padding: 0 }} id="whatsapp-template-handler" btnStyle="link">
        <Icon icon="whatsapp-1" color='#3CCC38' size={20} />
      </Button>
    );
  }

  return (
    <ResponseTemplateStyled $noPadding={buttonFrom == "inbox" ? false : true}>
      <WhatsappTemplateModal
        {...props}
        trigger={trigger}
      />
    </ResponseTemplateStyled>
  );
}

export default WhatsappTemplates;
