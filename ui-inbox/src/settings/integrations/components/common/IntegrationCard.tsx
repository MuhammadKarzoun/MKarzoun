import React from 'react';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { IIntegration, IntegrationMutationVariables } from '@octobots/ui-inbox/src/settings/integrations/types';
import { INTEGRATION_KINDS } from '@octobots/ui/src/constants/integrations';
import { Link } from 'react-router-dom';
import Button from '@octobots/ui/src/components/Button';
import Icon from '@octobots/ui/src/components/Icon';
import Tip from '@octobots/ui/src/components/Tip';
import { __ } from '@octobots/ui/src/utils';
import { Alert } from '@octobots/ui/src/utils';
import { INTEGRATIONS_COLORS } from '../../integrationColors';
import Label from '@octobots/ui/src/components/Label';
import ModalTrigger from '@octobots/ui/src/components/ModalTrigger';
import CommonFieldForm from './CommonFieldForm';
import InstallCode from '../InstallCode';
import { Dropdown } from 'react-bootstrap';
import colors from '@octobots/ui/src/styles/colors';


const CardContainer = styledTS<{ $corner?: string }>(styled.div)`
  background: ${colors.bgLight};
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    /* استخدام الخصائص المنطقية للحدود */
    border-block-start-width: 0;
    border-block-end-width: 40px;
    border-inline-start-width: 40px;
    border-inline-end-width: 0;
    border-block-start-color: transparent;
    border-block-end-color: ${({ $corner }) => $corner || 'transparent'};
    border-inline-start-color: transparent;
    border-inline-end-color: transparent;

    position: absolute;
    /* موقع العنصر باستخدام خاصية منطقية تُحدد البداية حسب اتجاه الكتابة */
    inset-inline-start: 0;
    bottom: 0;
    /* تحديد نصف قطر الزاوية باستخدام الخاصية المنطقية المناسبة للزاوية في الأسفل */
    border-end-inline-start-radius: 10px;
  }
`;


const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;

  .menu-icon {
    margin-inline-end: -5px;
    margin-top: -35px;
  }

  .menu-icon:hover {
    cursor: pointer;
    color: ${colors.colorPrimary};
  }
`;

const IntegrationIcon = styled.div<{ color: string; logo?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    position: absolute;
  }

  i {
    opacity: ${props => props.logo ? 0 : 1};
  }
`;

const IntegrationInfo = styled.div`
  flex: 1;
  margin-inline-start: 12px;
`;

const IntegrationName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;
`;

const IntegrationKind = styled.div`
  font-size: 14px;
  color: #666;
`;

const CardContent = styled.div`
  margin-bottom: 10px;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DropdownContainer = styled.div`
  position: relative;

  .dropdown-toggle {
    background-color: ${colors.colorPrimary} !important;
    border: none !important;
    padding: 8px 16px;
    font-size: 14px;
    color: #1A1A1A !important;
    
    &:hover, &:focus, &:active {
      background-color: ${colors.colorPrimary} !important;
      box-shadow: none !important;
    }

    &::after {
      margin-left: 8px;
    }
  }

  .dropdown-menu {
    z-index: 1001;
    padding: 8px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: none;
    border-radius: 8px;
    
    .dropdown-item {
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      
      &:hover {
        background-color: #F5F5F5;
      }
      
      &.text-danger:hover {
        background-color: #FEE2E2;
      }

      i {
        width: 16px;
      }
    }
  }
`;


interface Props {
  _id?: string;
  integration: IIntegration;
  archive?: (id: string, status: boolean) => void;
  repair?: (id: string, kind: string) => void;
  removeIntegration?: (integration: IIntegration) => void;
  disableAction?: boolean;
  editIntegration: (
    id: string,
    { name, brandId, channelIds, details }: IntegrationMutationVariables,
    callback: () => void
  ) => void;
}

const IntegrationCard: React.FC<Props> = ({
  _id,
  integration,
  archive,
  repair,
  removeIntegration,
  disableAction,
  editIntegration,
}) => {

  // const renderArchiveAction = () => {
  //   if (!archive || disableAction || !integration.isActive) {
  //     return null;
  //   }
  //   return (
  //     <Tip text={__("Archive")} placement="top">
  //       <Button 
  //         btnStyle="link" 
  //         onClick={() => archive(integration._id, true)} 
  //         icon="archive-alt" 
  //       />
  //     </Tip>
  //   );
  // };

  // const renderUnarchiveAction = () => {
  //   if (!archive || disableAction || integration.isActive) {
  //     return null;
  //   }
  //   return (
  //     <Tip text={__("Unarchive")} placement="top">
  //       <Button 
  //         btnStyle="link" 
  //         onClick={() => archive(integration._id, false)} 
  //         icon="redo" 
  //       />
  //     </Tip>
  //   );
  // };

  // const renderEditAction = () => {
  //   if (integration.kind === INTEGRATION_KINDS.MESSENGER) {
  //     return null;
  //   }

  //   const editTrigger = (
  //     <Button btnStyle="link">
  //       <Tip text="Edit" placement="top">
  //         <Icon icon="edit-3" />
  //       </Tip>
  //     </Button>
  //   );

  //   const content = (props: any) => (
  //     <CommonFieldForm
  //       {...props}
  //       onSubmit={editIntegration}
  //       name={integration.name}
  //       brandId={integration.brandId}
  //       channelIds={integration.channels?.map(item => item._id) || []}
  //       integrationId={integration._id}
  //       integrationKind={integration.kind}
  //       webhookData={integration.webhookData}
  //       details={integration.details}
  //     />
  //   );

  //   return (
  //     <ModalTrigger
  //       title="Edit integration"
  //       trigger={editTrigger}
  //       content={content}
  //     />
  //   );
  // };

  // const renderMessengerActions = () => {
  //   if (integration.kind !== INTEGRATION_KINDS.MESSENGER) {
  //     return null;
  //   }

  //   const installTrigger = (
  //     <Button btnStyle="link">
  //       <Tip text="Install code" placement="top">
  //         <Icon icon="code" />
  //       </Tip>
  //     </Button>
  //   );

  //   return (
  //     <>
  //       <Tip text={__("Edit messenger integration")} placement="top">
  //         <Link to={`/settings/integrations/editMessenger/${integration._id}`}>
  //           <Button btnStyle="link" icon="edit-3" />
  //         </Link>
  //       </Tip>
  //       <ModalTrigger
  //         isOpen={_id === integration._id}
  //         title="Install code"
  //         size="lg"
  //         trigger={installTrigger}
  //         content={props => <InstallCode {...props} integration={integration} />}
  //       />
  //     </>
  //   );
  // };

  // const renderRemoveAction = () => {
  //   if (!removeIntegration || disableAction) {
  //     return null;
  //   }
  //   return (
  //     <Tip text={__("Delete")} placement="top">
  //       <Button 
  //         btnStyle="link" 
  //         onClick={() => removeIntegration(integration)} 
  //         icon="times-circle" 
  //       />
  //     </Tip>
  //   );
  // };

  const renderHealthStatus = () => {
    if (!integration.healthStatus) return null;
  
    return (
      <div
        className="health-icon"
        style={{
          position: "absolute",
          insetInlineEnd: "3px", // سيعمل كـ right في LTR و left في RTL
          bottom: "0px",
          zIndex: "10",
        }}
      >
        <Tip text={integration.healthStatus.status} placement="top">
          <Icon
            onClick={() => repair && repair(integration._id, integration.kind)}
            size={16}
            icon={
              integration.healthStatus.status === "healthy"
                ? "check-circle"
                : "exclamation-circle"
            }
            color={
              integration.healthStatus.status === "healthy" ? "#1d681b" : "red"
            }
          />
        </Tip>
      </div>
    );
  };
  
  const color = INTEGRATIONS_COLORS[integration.kind] || "#1F97FF";
  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));
  
  return (
    <CardContainer
      $corner={
        integration.healthStatus?.status === "healthy" ? "#bcf1ba" : "#ffdec5"
      }
    >
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IntegrationIcon color={color} logo={integration.logo}>
            <Icon size={32} icon={integration.kind} />
            {integration.logo && <img alt="logo" src={integration.logo} />}
          </IntegrationIcon>
          <IntegrationInfo>
            <IntegrationName>{integration.name}</IntegrationName>
            <IntegrationKind>{integration.kind}</IntegrationKind>
          </IntegrationInfo>
        </div>
        <div className="menu-icon">
          <DropdownContainer>
            <Dropdown drop="end">
              <Dropdown.Toggle as={CustomToggle}>
                <Icon icon="ellipsis-v" size={18} />
              </Dropdown.Toggle>
  
              <Dropdown.Menu>
                {!disableAction && integration.isActive && archive && (
                  <Dropdown.Item
                    onClick={() => archive(integration._id, true)}
                  >
                    <Icon icon="archive-alt" />
                    {__("Archive")}
                  </Dropdown.Item>
                )}
  
                {!disableAction && !integration.isActive && archive && (
                  <Dropdown.Item
                    onClick={() => archive(integration._id, false)}
                  >
                    <Icon icon="redo" />
                    {__("Unarchive")}
                  </Dropdown.Item>
                )}
  
                <Dropdown.Item
                  as={Link}
                  to={`/settings/integrations/${integration._id}/${integration.kind}/settings`}
                >
                  <Icon icon="settings" />
                  {__("Edit")}
                </Dropdown.Item>
  
                {integration.kind === INTEGRATION_KINDS.MESSENGER && (
                  <>
                    <Dropdown.Item
                      as={Link}
                      to={`/settings/integrations/editMessenger/${integration._id}`}
                    >
                      <Icon icon="edit-3" />
                      {__("Edit messenger integration")}
                    </Dropdown.Item>
  
                    <ModalTrigger
                      isOpen={_id === integration._id}
                      title="Install code"
                      size="lg"
                      trigger={
                        <Dropdown.Item>
                          <Icon icon="code" />
                          {__("Install code")}
                        </Dropdown.Item>
                      }
                      content={(props) => (
                        <InstallCode {...props} integration={integration} />
                      )}
                    />
                  </>
                )}
  
                {(integration.kind.includes("facebook") ||
                  integration.kind.includes("instagram") ||
                  integration.kind.includes("whatsapp")) &&
                  (integration.healthStatus?.status === "account-token" ? (
                    <ModalTrigger
                      title="Edit integration"
                      trigger={
                        <Dropdown.Item>
                          <Icon icon="refresh" />
                          {__("Repair")}
                        </Dropdown.Item>
                      }
                      content={(props) => <RefreshPermissionForm {...props} />}
                    />
                  ) : (
                    <Dropdown.Item
                      onClick={() =>
                        repair(integration._id, integration.kind)
                      }
                    >
                      <Icon icon="refresh" />
                      {__("Repair")}
                    </Dropdown.Item>
                  ))}
  
                {!integration.kind.includes("facebook") &&
                  !integration.kind.includes("instagram") &&
                  integration.kind !== INTEGRATION_KINDS.MESSENGER && (
                    <Dropdown.Item
                      onClick={() => {
                        client
                          .query({
                            query: gql(queries.integrationsGetIntegrationDetail),
                            variables: {
                              octoApiId: integration._id,
                            },
                          })
                          .then(({ data }) => {
                            Alert.success("success");
                          })
                          .catch((e) => {
                            Alert.error(e.message);
                          });
                      }}
                    >
                      <Icon icon="download-1" />
                      {__("Fetch external data")}
                    </Dropdown.Item>
                  )}
  
                {!disableAction && removeIntegration && (
                  <Dropdown.Item
                    onClick={() => removeIntegration(integration)}
                    className="text-danger"
                  >
                    <Icon icon="times-circle" />
                    {__("Delete")}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </DropdownContainer>
        </div>
      </CardHeader>
      <CardContent>
        <StatusContainer>
          <div>
            {__("Status")}:
            <Label lblStyle={integration.isActive ? "success" : "warning"}>
              {integration.isActive ? __("Active") : __("Archived")}
            </Label>
          </div>
  
          {integration.brand && (
            <div>
              {__("Brand")}:
              <Label>{integration.brand.name}</Label>
            </div>
          )}
        </StatusContainer>
        {renderHealthStatus()}
      </CardContent>
    </CardContainer>
  );
  
};

export default IntegrationCard;
