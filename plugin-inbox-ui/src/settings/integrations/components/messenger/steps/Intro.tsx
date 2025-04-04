import { FlexItem, LeftItem } from "@octobots/ui/src/components/step/styles";
import { IMessages, ISkillData } from "../../../types";

import BuildSkill from "../../../containers/messenger/BuildSkill";
import ControlLabel from "@octobots/ui/src/components/form/Label";
import FormControl from "@octobots/ui/src/components/form/Control";
import FormGroup from "@octobots/ui/src/components/form/Group";
import React from "react";
import { SubHeading } from "@octobots/ui-settings/src/styles";
import { __ } from "coreui/utils";

type Props = {
  skillData?: ISkillData;
  onChange: (
    name: "supporterIds" | "messages",
    value: IMessages | string[]
  ) => void;
  languageCode: string;
  messages: IMessages;
};

type State = {
  messages: IMessages;
};

class Intro extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { messages } = props;

    this.state = {
      messages,
    };
  }

  onMessageChange = (name, value) => {
    const messages = { ...this.state.messages };

    messages[this.props.languageCode][name] = value;

    this.setState({ messages });

    this.props.onChange("messages", messages);
  };

  render() {
    const { languageCode, skillData } = this.props;
    const message = this.state.messages[languageCode] || ({} as IMessages);

    const welcomeOnChange = (e) =>
      this.onMessageChange("welcome", (e.target as HTMLInputElement).value);

    const awayMessage = (e) =>
      this.onMessageChange("away", (e.target as HTMLInputElement).value);

    const thankMessage = (e) =>
      this.onMessageChange("thank", (e.target as HTMLInputElement).value);

    return (
      <FlexItem>
        <LeftItem>
          <SubHeading>{__("Online messaging")}</SubHeading>

          <FormGroup>
            <ControlLabel>Welcome message</ControlLabel>

            <FormControl
              componentclass="textarea"
              placeholder={__("Write here Welcome message") + "."}
              rows={3}
              value={message.welcome}
              onChange={welcomeOnChange}
            />
          </FormGroup>

          <SubHeading>{__("Offline messaging")}</SubHeading>

          <FormGroup>
            <ControlLabel>Away message</ControlLabel>

            <FormControl
              componentclass="textarea"
              placeholder={__("Write here Away message") + "."}
              rows={3}
              value={message.away}
              onChange={awayMessage}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Thank you message</ControlLabel>

            <FormControl
              componentclass="textarea"
              placeholder={__("Write here Thank you message") + "."}
              rows={3}
              value={message.thank}
              onChange={thankMessage}
            />
          </FormGroup>

          <SubHeading>{__("Skills")}</SubHeading>

          <FormGroup>
            <BuildSkill skillData={skillData} onChange={this.props.onChange} />
          </FormGroup>
        </LeftItem>
      </FlexItem>
    );
  }
}

export default Intro;
