import Button from "@octobots/ui/src/components/Button";
import ControlLabel from "@octobots/ui/src/components/form/Label";
import FormControl from "@octobots/ui/src/components/form/Control";
import FormGroup from "@octobots/ui/src/components/form/Group";
import { INTEGRATION_KINDS } from "@octobots/ui/src/constants/integrations";
import { IntegrationMutationVariables } from "../../types";
import React from "react";
import SelectBrand from "../../containers/SelectBrand";
import SelectChannels from "../../containers/SelectChannels";
import { __ } from "@octobots/ui/src/utils";
import { loadDynamicComponent } from "@octobots/ui/src/utils/core";
import { Flex } from "@octobots/ui/src/styles/main";

type CommonTypes = {
  name: string;
  brandId: string;
  channelIds: string[];
  webhookData: any;
  isSubmitted: boolean;
  details: any;
};

type Props = {
  integrationId: string;
  integrationKind: string;
  name: string;
  brandId: string;
  channelIds: string[];
  webhookData: any;
  details: any;
  onSubmit: (
    id: string,
    { name, brandId, channelIds, details }: IntegrationMutationVariables,
    callback: () => void
  ) => void;
  // closeModal: () => void;
};

class CommonFieldForm extends React.PureComponent<Props, CommonTypes> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: props.name || "",
      brandId: props.brandId || "",
      channelIds: props.channelIds || [],
      webhookData: props.webhookData || {},
      details: props.details || {},
      isSubmitted: false,
    };
  }

  renderScript = () => {
    const { integrationKind } = this.props;

    if (integrationKind !== INTEGRATION_KINDS.WEBHOOK) {
      return null;
    }

    const { webhookData } = this.state;

    const onChangeWebhookData = (e) => {
      this.setState({
        webhookData: { ...webhookData, [e.target.name]: e.target.value },
      });
    };

    return (
      <>
        <FormGroup>
          <ControlLabel required={false}>Token</ControlLabel>
          <FormControl
            name="token"
            required={false}
            autoFocus={false}
            defaultValue={webhookData.token}
            onChange={onChangeWebhookData}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={false}>Origin</ControlLabel>
          <FormControl
            name="origin"
            required={false}
            autoFocus={false}
            defaultValue={webhookData.origin}
            onChange={onChangeWebhookData}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={false}>{__("Script")}</ControlLabel>
          <FormControl
            name="script"
            componentclass="textarea"
            required={true}
            defaultValue={webhookData.script}
            onChange={onChangeWebhookData}
          />
        </FormGroup>
      </>
    );
  };

  render() {
    const { integrationId, onSubmit } = this.props;
    const { name, brandId, channelIds, webhookData, details } = this.state;

    const onBrandChange = (e) => {
      this.setState({ brandId: e.target.value });
    };

    const onChannelChange = (values: string[]) => {
      this.setState({ channelIds: values });
    };

    const onDetailsChange = (key: string, value: any) => {
      this.setState({ details: { ...details, [key]: value } });
    };

    const onNameBlur = (e) => {
      this.setState({ name: e.target.value });
    };

    const saveIntegration = (e) => {
      e.preventDefault();

      this.setState({ isSubmitted: true });

      let data: any;

      switch (this.props.integrationKind) {
        case "webhook": {
          data = webhookData;
          break;
        }
      }

      onSubmit(integrationId, { name, brandId, channelIds, details: (this.props.integrationKind == "webhook") ? data : details }, () => {
        this.setState({ isSubmitted: false });
      });
    };

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>{__("Name")}</ControlLabel>
          <FormControl
            required={true}
            defaultValue={name}
            onBlur={onNameBlur}
            autoFocus={true}
          />
        </FormGroup>

        {this.renderScript()}

        {loadDynamicComponent(
          "integrationDetailsForm",
          {
            integrationKind: this.props.integrationKind,
            details: this.state.details,
            onChange: onDetailsChange,
          },
          true
        )}

        <SelectBrand
          isRequired={true}
          defaultValue={brandId}
          onChange={onBrandChange}
          description={__(
            "Which specific Brand does this integration belong to?"
          )}
        />
        <SelectChannels
          defaultValue={channelIds}
          isRequired={true}
          onChange={onChannelChange}
        />
        <Flex style={{ justifyContent: "center" }}>
          <Button
            style={{ width: "160px" }}
            onClick={saveIntegration}
            type="submit"
            btnStyle="success"
            icon="check-circle"

          >
            {__("Save")}
          </Button>
        </Flex>
      </>
    );
  }
}

export default CommonFieldForm;
