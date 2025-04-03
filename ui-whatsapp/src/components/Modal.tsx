import React, { useEffect, useState } from 'react';
import ModalTrigger from '@octobots/ui/src/components/ModalTrigger';
import Button from '@octobots/ui/src/components/Button';
import FormGroup from '@octobots/ui/src/components/form/Group';
import ControlLabel from '@octobots/ui/src/components/form/Label';
import FormControl from '@octobots/ui/src/components/form/Control';
import { Flex, FormColumn, ModalFooter } from '@octobots/ui/src/styles/main';
import { __ } from '@octobots/ui/src/utils/core';
import { WhatsAppTemplatePreview } from './WhatsAppTemplatePreview';
import { ColumnContainer, EmulatorWrapper, MainColumn, SidebarColumn, WhatsappPreview } from '../styles';
import Select from "react-select";
import { Alert } from '@octobots/ui/src/utils';
import ActionGotoForm from '@octobots/ui-automations/src/components/integrations-ui/automations/subForms/GotoForm';
import { IAutomation, INode } from '@octobots/ui-automations/src/types';
import { ITemplate } from '../types';
import { Integration } from '../../../plugin-automations-ui/src/types';
import { FlexBetween } from '@octobots/ui-settings/src/styles';
import MediaSelectionForm from './media/MediaSelectionForm';
import Datetime from "@nateradebaugh/react-datetime";

export default function WhatsappTemplateModal(props) {
  const { buttonFrom, trigger, conversation, customer, getWhatsappTemplates, getAutomations, getIntegrations, sendMessage } = props;

  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [nodes, setNodes] = useState([] as INode[]);
  const [nextNodeNs, setNextNodeNs] = useState({});
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [recepient, setRecepient] = useState("" as string);
  const [recepientName, setRecepientName] = useState("" as string);

  const [integrationId, setIntegration] = useState("" as string);

  const [automations, setAutomations] = useState([] as IAutomation[]);
  const [templates, setTemplates] = useState([] as ITemplate[]);
  const [integrations, setIntegrations] = useState([] as Integration[]);

  useEffect(() => {
    if (buttonFrom == "inbox" && conversation) {
      getWhatsappTemplates(conversation.integration._id, (objs) => setTemplates(objs));
      getAutomations(conversation.integration._id, (objs) => setAutomations(objs));
    } else {
      getIntegrations("whatsapp", (objs) => setIntegrations(objs));
      if (customer) {
        setRecepient(customer.primaryPhone || "");
        setRecepientName(customer.firstName || customer.middleName || customer.lastName || "");
      }
    }
  }, []);

  useEffect(() => {
    loadAutomations();
  }, [automations]);

  const generateOptions = (options) => {
    return options.map((item) => ({ label: `${item.name} (${item.kind})`, value: item._id }));
  };

  const handleIntegrationChange = (e) => {
    const input = e.value;
    setIntegration(input || "");
    // get the templates and automations for the selected integration
    if (input != "") {
      getWhatsappTemplates(input, (objs) => setTemplates(objs));
      getAutomations(input, (objs) => setAutomations(objs));
    }
  };

  const selectedTemplate = templates.find(t => t.template_id === selectedTemplateId);

  const loadAutomations = async () => {
    try {
      let tempNodes = automations?.flatMap((item) => item.nodes.map((item) => ({
        id: item.id,
        ns: item.ns,
        icon: item.icon,
        label: item.label,
        type: item.type,
        automationNs: item.automationNs,
        nextNodeNs: item.ns,
      }))) || [];
      setNodes(tempNodes);
    } catch (error) {
      Alert.error('Hmmm... Failed to load automations');
    }
  }

  const handleSelectTemplate = (value) => {
    //console.log('handleSelectTemplate', value);
    setSelectedTemplateId(value.template_id);
    setFormValues({});
  };

  const handleFieldChange = (mappingName: string, value: string) => {
    setFormValues(prev => ({ ...prev, [mappingName]: value }));
  };

  const handleSend = async (e, { closeModal }) => {
    e.preventDefault();

    if (!selectedTemplate) return;

    // Build the data shape your mutation expects
    let data: any = {
      templateId: selectedTemplate.template_id,
      params: { ...formValues, ...nextNodeNs },
    };

    if (buttonFrom == "inbox") {
      data = {
        ...data,
        integrationId: conversation.integration._id,
        conversationId: conversation._id,
      }
    } else if (buttonFrom == "customer") {
      data = {
        ...data,
        integrationId: integrationId,
        customerId: customer._id,
      }
    } else if (buttonFrom == "global") {
      data = {
        ...data,
        integrationId: integrationId,
        recipient: recepient,
        recipientName: recepientName,
      }
    }

    await sendMessage(data);

    // Close modal
    closeModal();
    //if (onClose) onClose();
  };

  const selectOptions = () => {
    return templates.map(item => ({ ...item, value: item.template_id, label: item.name }));
  }

  const customSelectStyles = {
    control: base => ({
      ...base,
      minHeight: 34
    })
  };

  const nextStepSelected = (data: { automationNs?: string; nextNodeNs?: string }, name) => {
    if (data.nextNodeNs != "") {
      setNextNodeNs({ ...nextNodeNs, [name]: data.nextNodeNs || "" });
    } else if (data.automationNs != "") {
      const automation = automations.find((item) => item.ns == data.automationNs);
      if (automation) {
        setNextNodeNs({ ...nextNodeNs, [name]: automation.startNodeNs || "" });
      }
    }
  };

  const mediaSelected = (data: { url: string; info?: object }, name) => {
    console.log("🚀 ~ mediaSelected ~ data:", data, name)
    handleFieldChange(name, data.url);
  };

  const onChangeDate = (mappingName: string, date) => {
    handleFieldChange(mappingName, (new Date(date).getTime() / 1000).toString() || "");
  };

  const extratContent = () => {

    if (buttonFrom == "customer") {
      return (
        <>
          <FormColumn style={{ paddingInlineEnd: 0 }}>
            <FlexBetween style={{
              gap: 20
            }}>
              <FormGroup>
                <ControlLabel required={true}>
                  Recepient
                </ControlLabel>
                <FormControl
                  disabled={true}
                  type="text"
                  placeholder={"Recepient"}
                  value={recepient}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel required={true}>
                  Recepient name
                </ControlLabel>
                <FormControl
                  disabled={true}
                  type="text"
                  placeholder={"Recepient name"}
                  value={recepientName}
                />
              </FormGroup>
            </FlexBetween>
          </FormColumn>
          <FormGroup>
            <ControlLabel required={true}>
              Integration
            </ControlLabel>
            <Select
              id='field'
              required={true}
              styles={customSelectStyles}
              menuPlacement="auto"
              isClearable={false}
              placeholder={__("Choose Integration")}
              value={generateOptions(integrations).filter((o) =>
                integrationId === o.value
              )}
              options={generateOptions(integrations)}
              onChange={(e) => handleIntegrationChange(e)}
            />
          </FormGroup>
        </>);
    }

    if (buttonFrom == "global") {
      return (
        <>
          <FormColumn style={{ paddingInlineEnd: 0 }}>
            <FlexBetween style={{
              gap: 20
            }}>
              <FormGroup>
                <ControlLabel required={true}>
                  Recepient
                </ControlLabel>
                <FormControl
                  required={true}
                  type="text"
                  placeholder={"Recepient"}
                  value={recepient}
                  onChange={(e) => setRecepient((e.currentTarget as HTMLInputElement).value)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel required={true}>
                  Recepient name
                </ControlLabel>
                <FormControl
                  required={true}
                  type="text"
                  placeholder={"Recepient name"}
                  value={recepientName}
                  onChange={(e) => setRecepientName((e.currentTarget as HTMLInputElement).value)}
                />
              </FormGroup>
            </FlexBetween>
          </FormColumn>
          <FormGroup>
            <ControlLabel required={true}>
              Integration
            </ControlLabel>
            <Select
              id='field'
              required={true}
              styles={customSelectStyles}
              menuPlacement="auto"
              isClearable={false}
              placeholder={__("Choose Integration")}
              value={generateOptions(integrations).filter((o) =>
                integrationId === o.value
              )}
              options={generateOptions(integrations)}
              onChange={(e) => handleIntegrationChange(e)}
            />
          </FormGroup>
        </>);
    }

    return null;
  }

  const renderForm = ({ closeModal }) => (
    <form onSubmit={(e) => handleSend(e, { closeModal })}>
      <ColumnContainer style={{ minHeight: "65vh" }}>
        <MainColumn>
          {extratContent()}
          <FormGroup>
            <ControlLabel required={true} >{__("Select Template")}</ControlLabel>
            <Select
              required={true}
              styles={customSelectStyles}
              options={selectOptions()}
              value={selectOptions().find((o) => o.value === selectedTemplateId)}
              onChange={handleSelectTemplate}
              placeholder={__(`Choose a template`)}
              isClearable={false}
            />
          </FormGroup>

          {/* Render dynamic fields for the chosen template.mappings */}
          {selectedTemplate?.mapping?.map(mapping => (
            <>
              {mapping.type == 'text' && <FormGroup key={mapping.name}>
                <ControlLabel required={true}>{mapping.name}</ControlLabel>
                <FormControl
                  required={true}
                  type="text"
                  placeholder={`Enter ${mapping.name}`}
                  value={formValues[mapping.name] || ''}
                  onChange={e => handleFieldChange(mapping.name, e.currentTarget.value)}
                />
              </FormGroup>}
              {mapping.type == 'datetime' && <FormGroup key={mapping.name}>
              <ControlLabel>{mapping.name}</ControlLabel>
              <Datetime
                inputProps={{ placeholder: `Enter ${mapping.name}` }}
                dateFormat="YYYY/MM/DD"
                timeFormat="HH:mm"
                closeOnSelect={false}
                closeOnTab={true}
                value={formValues[mapping.name] ? `${new Date(parseInt(formValues[mapping.name]) * 1000).toDateString()} ${new Date(parseInt(formValues[mapping.name]) * 1000).toTimeString()}` : ''}
                onChange={e => onChangeDate(mapping.name, e)}
              />
            </FormGroup>}
              {mapping.type == 'node' && <FormGroup key={mapping.name}>
                <ControlLabel>{mapping.name}</ControlLabel>
                <ActionGotoForm
                  nodes={nodes}
                  automations={automations}
                  nextStepSelected={(e) => nextStepSelected(e, mapping.name)}
                />
              </FormGroup>}
              {['image', 'video', 'document'].includes(mapping.type) && <FormGroup key={mapping.name}>
                <ControlLabel>{mapping.name}</ControlLabel>
                <MediaSelectionForm
                  mediaType={mapping.type.toUpperCase()}
                  withPreview={true}
                  mediaSelected={(e) => mediaSelected(e, mapping.name)}
                />
              </FormGroup>}
            </>
          ))}
        </MainColumn>

        <SidebarColumn>
          {/* Show a live preview of the selected template plus filled form values */}
          <WhatsappPreview $fullHeight={true}>
            <EmulatorWrapper>
              <div style={{ width: "70%" }}>
                {selectedTemplate && (
                  <WhatsAppTemplatePreview
                    template={selectedTemplate}
                    formValues={formValues}
                  />
                )}
              </div>
            </EmulatorWrapper>
          </WhatsappPreview>

        </SidebarColumn>
      </ColumnContainer>

      <ModalFooter>
        <Flex style={{ justifyContent: 'flex-end' }}>
          <Button btnStyle="primary" type="submit" icon="check">
            {__("Send")}
          </Button>
        </Flex>
      </ModalFooter>
    </form>
  );

  return (
    <ModalTrigger
      title={__("Send WhatsApp Template")}
      size='xl'
      trigger={trigger}
      content={renderForm}
      enforceFocus
    />
  );
}
