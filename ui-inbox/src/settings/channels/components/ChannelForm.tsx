import { IButtonMutateProps, IFormProps } from "@octobots/ui/src/types";

import Button from "@octobots/ui/src/components/Button";
import ControlLabel from "@octobots/ui/src/components/form/Label";
import Form from "@octobots/ui/src/components/form/Form";
import FormControl from "@octobots/ui/src/components/form/Control";
import FormGroup from "@octobots/ui/src/components/form/Group";
import { assignementConfig, IChannel } from "../types";
import { ModalFooter } from "@octobots/ui/src/styles/main";
import React from "react";
import SelectTeamMembers from "@octobots/ui/src/team/containers/SelectTeamMembers";
import { Description, FlexBetween, SubHeading } from "@octobots/ui-settings/src/styles";
import { __ } from "@octobots/ui/src/utils";
import Toggle from "@octobots/ui/src/components/Toggle";
import Select, { OnChangeValue } from "react-select";
import { ISkillDocument } from "../../skills/types";

type Props = {
  channel?: IChannel;
  skills: ISkillDocument[];
  selectedMembers: string[];
  selectedSkills: string[];
  assignementConfig: assignementConfig;
  closeModal: () => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
};

type State = {
  selectedMembers: string[];
  selectedSkills: string[];
  assignementConfig: assignementConfig
};

class ChannelForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedMembers: props.selectedMembers || [],
      selectedSkills: props.selectedSkills || [],
      assignementConfig : { 
      smartAssignement: props.assignementConfig?.smartAssignement || false,
      reOpened: props.assignementConfig?.reOpened || false,
      newOutgoingMsg: props.assignementConfig?.newOutgoingMsg || false,
      idleAutomation: props.assignementConfig?.idleAutomation || false,
      }
    };

    if(props.assignementConfig?.assignType) this.state.assignementConfig.assignType= props.assignementConfig?.assignType
    if(props.assignementConfig?.maxAllowed) this.state.assignementConfig.maxAllowed= props.assignementConfig?.maxAllowed
    if(props.assignementConfig?.idleTime) this.state.assignementConfig.idleTime= props.assignementConfig?.idleTime
    if(props.assignementConfig?.idleAction) this.state.assignementConfig.idleAction= props.assignementConfig?.idleAction
    if(props.assignementConfig?.automationNs) this.state.assignementConfig.automationNs= props.assignementConfig?.automationNs
  }

  generateDoc = (values: {
    _id?: string;
    name: string;
    description: string;
  }) => {
    const { channel } = this.props;
    const finalValues = values;

    if (channel) {
      finalValues._id = channel._id;
    }

    return {
      ...finalValues,
      memberIds: this.state.selectedMembers,
      skillIds: this.state.selectedSkills,
      assignementConfig: this.state.assignementConfig
    };
  };

  renderContent = (formProps: IFormProps) => {
    const { closeModal, channel, renderButton, selectedMembers, skills} = this.props;
    const { values, isSubmitted } = formProps;

    const object = channel || ({} as IChannel);
    const self = this;
    
    const onChange = (items) => {
      self.setState({...this.state, selectedMembers: items });
    };

    const itemOptions = [
        { label: 'Assign equally', value: 'equally' },
        { label: 'Assign based on agent assigned conversations count', value: 'conversations count' }
    ];

    const idleOptions = [
        { label: 'Not do anything', value: 'not do anything' },
        { label: 'Reassign to another agent', value: 'reassign to another agent' },
        { label: 'Make unassigned', value: 'make unassigned' }
    ];

    const automationOptions = [
      { label: 'Null', value: 'null' },
    ];

    const handleSkillsChange = (
      options: OnChangeValue<{ label: string; value: string }, true>
    ) => { 
      self.setState({...this.state, selectedSkills: options.map((option) => option.value) });
    };

    const generateOptions = (options) => {
      return options.map((item) => ({ label: item.name, value: item._id }));
    };

    // Cannot add property reOpened, object is not extensible
    const changeState = (e) => {
      var key = e.target.id;
      var obj  = {}
      obj[key] = e.target.checked; 
      this.state.assignementConfig[key] = e.target.checked; 
      self.setState(this.state);
    };

   const smartAssignementContent=()=> {
      if (!this.state.assignementConfig.smartAssignement) {
        return null;
      }
  
      return (
        <>
        <FormGroup>
          <ControlLabel required={true}>Assign newly opened conversations to a department agents.</ControlLabel>
          <Select
            isClearable={false}
            value={itemOptions.find((option) => option.value === this.state.assignementConfig.assignType)}
            onChange={(e: any) => self.setState({...this.state, assignementConfig:{...this.state.assignementConfig, assignType: e.value}})}
            options={itemOptions}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel required={true}>Max allowed assigned conversations per agent</ControlLabel>
          <Description>
            <ul>
              <li>check is based on open conversations.</li>
              <li>if all agents reached max allowed convs keep conv unassigned.</li>
            </ul>
          </Description>
          <FormControl
            type="number"
            min={1}
            value={this.state.assignementConfig.maxAllowed}
            onChange={(e: any) => self.setState({...this.state, assignementConfig:{...this.state.assignementConfig, maxAllowed: parseInt(e.target.value)}})}
          />
        </FormGroup>
        </>
      );
    }

    const idleContent=()=> {
      return (
        <>
        <FormGroup>
          <ControlLabel required={true}>Idle conversations assignement.</ControlLabel>
          <Select
            isClearable={false}
            value={idleOptions.find((option) => option.value === this.state.assignementConfig.idleAction)}
            onChange={(e: any) => self.setState({...this.state, assignementConfig:{...this.state.assignementConfig, idleAction: e.value}})}
            options={idleOptions}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel required={true}>Time to become idle (min)</ControlLabel>
          <FormControl
            type="number"
            min={1}
            value={this.state.assignementConfig.idleTime}
            onChange={(e: any) => self.setState({...this.state, assignementConfig:{...this.state.assignementConfig, idleTime: parseInt(e.target.value)}})}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Send idle conversations to an automation.</ControlLabel>
          <div>
            <Toggle
              id="idleAutomation"
              checked={this.state.assignementConfig.idleAutomation}
              onChange={changeState}
              icons={{
                checked: <span>Yes</span>,
                unchecked: <span>No</span>,
              }}
            />
          </div>
        </FormGroup>
        { this.state.assignementConfig.idleAutomation &&
          <FormGroup>
          <ControlLabel required={true}>Choose an automation.</ControlLabel>
          <Select
            isClearable={false}
            value={automationOptions.find((option) => option.value === this.state.assignementConfig.automationNs)}
            onChange={(e: any) => self.setState({...this.state, assignementConfig:{...this.state.assignementConfig, automationNs: e.value}})}
            options={automationOptions}
          />
        </FormGroup>
        }
        </>
      );
    }

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>

          <FormControl
            {...formProps}
            name="name"
            autoFocus={true}
            defaultValue={object.name}
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>

          <FormControl
            {...formProps}
            name="description"
            componentclass="textarea"
            rows={5}
            defaultValue={object.description}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Members</ControlLabel>

          <SelectTeamMembers
            label="Choose members"
            name="selectedMembers"
            initialValue={selectedMembers}
            onSelect={onChange}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Skills</ControlLabel>
          <Select
            placeholder={__("Choose skills")}
            value={generateOptions(skills).filter((o) =>
              this.state.selectedSkills.includes(o.value)
            )}
            options={generateOptions(skills)}
            onChange={handleSkillsChange}
            isMulti={true}
          />
        </FormGroup>
        <SubHeading>{__("Conversation Assignement")}</SubHeading>
        <FormGroup>
          <ControlLabel>Smart assignement rules</ControlLabel>
          <div>
            <Toggle
              id="smartAssignement"
              checked={this.state.assignementConfig.smartAssignement}
              onChange={changeState}
              icons={{
                checked: <span>Yes</span>,
                unchecked: <span>No</span>,
              }}
            />
          </div>
        </FormGroup>
        {smartAssignementContent()}

        <SubHeading></SubHeading>
        <FormGroup>
          <ControlLabel>Re-opened conversations</ControlLabel>
          <Description>
            <ul>
              <li>Assign to the same agent </li>
              <li>When contact re-opens a closed conversation you can assign it to the same agent that previously worked on it.
              Either way conversation will be moved to the Unassigned folder.</li>
              <li>if this is true and conditions match, ignore smart assignment.</li>
            </ul>
          </Description>
          <div>
            <Toggle
              id="reOpened"
              checked={this.state.assignementConfig.reOpened}
              onChange={changeState}
              icons={{
                checked: <span>Yes</span>,
                unchecked: <span>No</span>,
              }}
            />
          </div>
        </FormGroup>

        <SubHeading></SubHeading>
        <FormGroup>
          <ControlLabel>On new outgoing message while no assignee</ControlLabel>
          <Description>
            <ul>
              <li>assign conversation to the sender agent.</li>
            </ul>
          </Description>
          <div>
            <Toggle
              id="newOutgoingMsg"
              checked={this.state.assignementConfig.newOutgoingMsg}
              onChange={changeState}
              icons={{
                checked: <span>Yes</span>,
                unchecked: <span>No</span>,
              }}
            />
          </div>
        </FormGroup>

        <SubHeading>Idle conversation rules</SubHeading>
        {idleContent()}
        
        <ModalFooter>
        <FlexBetween style={{justifyContent:'end'}}> 
            <Button
              btnStyle="simple"
              type="button"
              icon="cancel-1"
              onClick={closeModal}
            >
              Cancel
            </Button>

            {renderButton({
              name: "channel",
              values: this.generateDoc(values),
              isSubmitted,
              callback: closeModal,
              object: channel,
            })}
          </FlexBetween>
        </ModalFooter>
      </>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default ChannelForm;
