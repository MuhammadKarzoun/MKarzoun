import { Alert, getEnv } from "@octobots/ui/src/utils";
import {
  IIntegration,
  IntegrationMutationVariables
} from "@octobots/ui-inbox/src/settings/integrations/types";
import {
  INTEGRATION_KINDS,
  WEBHOOK_DOC_URL
} from "@octobots/ui/src/constants/integrations";
import ActionButtons from "@octobots/ui/src/components/ActionButtons";
import Button from "@octobots/ui/src/components/Button";
import CommonFieldForm from "./CommonFieldForm";
import { INTEGRATIONS_COLORS } from "../../integrationColors";
import Icon from "@octobots/ui/src/components/Icon";
import InstallCode from "../InstallCode";
import Label from "@octobots/ui/src/components/Label";
import { Link } from "react-router-dom";
import ModalTrigger from "@octobots/ui/src/components/ModalTrigger";
import React from "react";
import RefreshPermissionForm from "../facebook/RefreshPermission";
import Tip from "@octobots/ui/src/components/Tip";
import WithPermission from "@octobots/ui/src/components/WithPermission";
import { __ } from "@octobots/ui/src/utils";
import { cleanIntegrationKind } from "@octobots/ui/src/utils";
import client from "@octobots/ui/src/apolloClient";
import { gql } from "@apollo/client";
import { loadDynamicComponent } from "@octobots/ui/src/utils/core";
import { queries } from "../../graphql/index";
type Props = {
  _id?: string;
  integration: IIntegration;
  archive: (id: string, status: boolean) => void;
  repair: (id: string, kind: string) => void;
  removeIntegration: (integration: IIntegration) => void;
  disableAction?: boolean;
  editIntegration: (
    id: string,
    { name, brandId, channelIds, details }: IntegrationMutationVariables,
    callback: () => void
  ) => void;
  showExternalInfoColumn: () => void;
  showExternalInfo: boolean;
};
type State = {
  externalData: any;
};
class IntegrationListItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      externalData: null
    };
  }
  renderArchiveAction() {
    const { archive, integration, disableAction } = this.props;
    if (!archive || disableAction || !integration.isActive) {
      return null;
    }
    const onClick = () => archive(integration._id, true);
    return (
      <Tip text={__("Archive")} placement="top">
        <Button btnStyle="link" onClick={onClick} icon="archive-alt" />
      </Tip>
    );
  }
  renderUnarchiveAction() {
    const { archive, integration, disableAction } = this.props;
    if (!archive || disableAction || integration.isActive) {
      return null;
    }
    const onClick = () => archive(integration._id, false);
    return (
      <Tip text={__("Unarchive")} placement="top">
        <Button btnStyle="link" onClick={onClick} icon="redo" />
      </Tip>
    );
  }
  renderGetAction() {
    const { integration } = this.props;
    const webhookData = integration.webhookData;
    if (!webhookData) {
      return;
    }
    const showTrigger = (
      <Button btnStyle="link">
        <Tip text="Show" placement="top">
          <Icon icon="eye" />
        </Tip>
      </Button>
    );
    const content = () => {
      const { REACT_APP_API_URL } = getEnv();
      return (
        <div>
          <b>Name</b>: {integration.name} <br />
          <div>
            <b>URL</b>: {REACT_APP_API_URL}/webhooks/{integration._id} <br />
            <b>Token</b>: {webhookData.token}
          </div>
          <p>
            {"For more information, please review the "}
            <a target="_blank" rel="noopener noreferrer" href={WEBHOOK_DOC_URL}>
              documentaion.
            </a>
          </p>
        </div>
      );
    };
    return (
      <ActionButtons>
        <ModalTrigger
          title="Integration detail"
          trigger={showTrigger}
          content={content}
        />
      </ActionButtons>
    );
  }
  renderEditAction() {
    const { integration, editIntegration } = this.props;
    if (integration.kind === INTEGRATION_KINDS.MESSENGER) {
      return null;
    }
    const editTrigger = (
      <Button btnStyle="link">
        <Tip text="Edit" placement="top">
          <Icon icon="edit-3" />
        </Tip>
      </Button>
    );
    const content = props => (
      <CommonFieldForm
        {...props}
        onSubmit={editIntegration}
        name={integration.name}
        brandId={integration.brandId}
        channelIds={integration.channels.map(item => item._id) || []}
        integrationId={integration._id}
        integrationKind={integration.kind}
        webhookData={integration.webhookData}
        details={integration.details}
      />
    );
    return (
      <ActionButtons>
        <ModalTrigger
          title="Edit integration"
          trigger={editTrigger}
          content={content}
        />
      </ActionButtons>
    );
  }
  renderMessengerActions(integration) {
    const kind = integration.kind;
    if (kind === INTEGRATION_KINDS.MESSENGER) {
      const editTrigger = (
        <Button btnStyle="link">
          <Tip text="Install code" placement="top">
            <Icon icon="code" />
          </Tip>
        </Button>
      );
      const content = props => (
        <InstallCode {...props} integration={integration} />
      );
      return (
        <ActionButtons>
          <Tip text={__("Edit messenger integration")} placement="top">
            <Link
              to={`/settings/integrations/editMessenger/${integration._id}`}
            >
              <Button btnStyle="link" icon="edit-3" />
            </Link>
          </Tip>
          <ModalTrigger
            isOpen={this.props._id === integration._id}
            title="Install code"
            size="lg"
            trigger={editTrigger}
            content={content}
          />
        </ActionButtons>
      );
    }
    return null;
  }
  renderRemoveAction() {
    const { integration, removeIntegration, disableAction } = this.props;
    if (!removeIntegration || disableAction) {
      return null;
    }
    const onClick = () => removeIntegration(integration);
    return (
      <Tip text={__("Delete")} placement="top">
        <Button btnStyle="link" onClick={onClick} icon="times-circle" />
      </Tip>
    );
  }
  showDetailsAction() {
    const { integration, removeIntegration, disableAction } = this.props;
    if (!removeIntegration || disableAction) {
      return null;
    }
    return (
      <Link
        to={` /settings/whatsapp/${integration._id}`}
      >
        {/* <Link
        to={`/settings/whatsappAdvancedSettings/${integration._id}`}
      > */}

        <Tip text={__("Show_Details")} placement="top">
          <Button btnStyle="link" icon="arrow-right" />
        </Tip>
      </Link>
    );
  }

  showBotSettingsAction() {
    const { integration, removeIntegration, disableAction } = this.props;
    const { kind, _id } = integration;
    if (!removeIntegration || disableAction) {
      return null;
    }
    return (
      <Link

        to={`/settings/integrations/${_id}/${kind}/bot`}

      >
        <Tip text={__("Automation Settings")} placement="top">
          <Button btnStyle="link" icon="settings" />
        </Tip>
      </Link>
    );
  }

  renderRepairAction() {
    const { repair, integration } = this.props;
    if (
      !integration.kind.includes("facebook") &&
      !integration.kind.includes("instagram") &&
      !integration.kind.includes("whatsapp")
    ) {
      return null;
    }
    const onClick = () => repair(integration._id, integration.kind);
    if (
      integration.healthStatus &&
      integration.healthStatus.status === "account-token"
    ) {
      const editTrigger = (
        <Button btnStyle="link">
          <Tip text={__("Repair")} placement="top">
            <Icon icon="refresh" />
          </Tip>
        </Button>
      );
      const content = props => <RefreshPermissionForm {...props} />;
      return (
        <ActionButtons>
          <ModalTrigger
            title="Edit integration"
            trigger={editTrigger}
            content={content}
          />
        </ActionButtons>
      );
    } else {
      return (
        <Tip text={__("Repair")} placement="top">
          <Button btnStyle="link" onClick={onClick} icon="refresh" />
        </Tip>
      );
    }
  }
  renderExternalData(integration) {
    const { externalData } = this.state;
    const { kind } = integration;
    let value = "";
    if (!this.props.showExternalInfo) {
      return null;
    }
    if (!externalData) {
      return <td>لا يوجد بيانات</td>;
    }
    switch (kind) {
      case INTEGRATION_KINDS.CALLPRO:
        value = externalData.phoneNumber;
        break;
      case INTEGRATION_KINDS.TELNYX:
        value = externalData.telnyxPhoneNumber;
        break;
      default:
        break;
    }
    return <td>{value}</td>;
  }
  renderFetchAction(integration: IIntegration) {
    if (
      integration.kind === INTEGRATION_KINDS.MESSENGER ||
      integration.kind.includes("facebook") ||
      integration.kind.includes("instagram")
    ) {
      return null;
    }
    const onClick = () => {
      client
        .query({
          query: gql(queries.integrationsGetIntegrationDetail),
          variables: {
            octoApiId: integration._id
          }
        })
        .then(({ data }) => {
          this.setState({
            externalData: data.integrationsGetIntegrationDetail
          });
          this.props.showExternalInfoColumn();
          Alert.success("success");
        })
        .catch(e => {
          Alert.error(e.message);
        });
    };
    return (
      <Tip text={__("Fetch external data")} placement="top">
        <Button btnStyle="link" icon="download-1" onClick={onClick} />
      </Tip>
    );
  }
  render() {
    const { integration } = this.props;
    const integrationKind = cleanIntegrationKind(integration.kind);
    const healthStatus = integration.healthStatus
      ? integration.healthStatus.status
      : "";
    const error = integration.healthStatus
      ? integration.healthStatus.error
      : "";
    const labelStyle = integration.isActive ? "success" : "danger";
    const status = integration.isActive ? __("Active") : __("Archived");
    const labelStyleHealthy = healthStatus === "healthy" ? "success" : "danger";
    const healthStatusText =
      healthStatus === "healthy" ? __("Healthy") : __("Unhealthy");
    return (
      <tr key={integration._id}>
        <td>{integration.name}</td>
        <td>
          <Label lblColor={INTEGRATIONS_COLORS[integrationKind]}>
            {integrationKind}
          </Label>
        </td>
        <td>{integration.brand ? integration.brand.name : ""}</td>
        <td>
          <Label lblStyle={labelStyle}>{status}</Label>
        </td>
        <td>
          {error ? (
            <Tip text={error}>
              <Label lblStyle={labelStyleHealthy}>{healthStatusText}</Label>
            </Tip>
          ) : (
            <Label lblStyle={labelStyleHealthy}>{healthStatusText}</Label>
          )}
        </td>
        {this.renderExternalData(integration)}
        <td>
          <ActionButtons>
            {loadDynamicComponent("integrationCustomActions", {
              ...this.props
            })}
            {this.renderFetchAction(integration)}
            {this.renderMessengerActions(integration)}
            {this.renderGetAction()}
            {this.renderRepairAction()}
            {this.renderEditAction()}
            {this.renderArchiveAction()}
            {this.renderUnarchiveAction()}
            {this.renderRemoveAction()}

            {integration.kind == 'whatsapp' && this.showDetailsAction()}
            {(integration.kind == 'whatsapp' || integration.kind == 'facebook-messenger' || integration.kind == 'instagram-messenger') && this.showBotSettingsAction()}


          </ActionButtons>
        </td>
      </tr>
    );
  }
}
export default IntegrationListItem;
