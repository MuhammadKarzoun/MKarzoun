import { Box, IntegrationItem, Ribbon, Type } from "./styles";

import { INTEGRATION_KINDS } from "@octobots/ui/src/constants/integrations";
import Icon from "@octobots/ui/src/components/Icon";
import IntegrationForm from "../../containers/common/IntegrationForm";
// import LineForm from "../../containers/line/Form";
import { Link } from "react-router-dom";
import ModalTrigger from "@octobots/ui/src/components/ModalTrigger";
import NylasForm from "../../containers/mail/Form";
import React from "react";
// import TelnyxForm from "../../containers/telnyx/TelnyxForm";
// import Twitter from "../../containers/twitter/Twitter";
import { __ } from "coreui/utils";
import { formatText } from "@octobots/ui-log/src/activityLogs/utils";

type TotalCount = {
  messenger: number;
  form: number;
  facebook: number;
  instagram: number;
  callpro: number;
  chatfuel: number;
  gmail: number;
  imap: number;
  office365: number;
  outlook: number;
  yahoo: number;
  line: number;
  telegram: number;
  viber: number;
  twilio: number;
  whatsapp: number;
  tiktok: number;
  exchange: number;
  telnyx: number;
};

type Props = {
  integration: any;
  getClassName: (selectedKind: string) => string;
  toggleBox: (kind: string) => void;
  customLink?: (kind: string, addLink: string) => void;
  queryParams: any;
  totalCount: TotalCount;
};

function getCount(kind: string, totalCount: TotalCount) {
  const countByKind = totalCount[kind];

  if (typeof countByKind === "undefined") {
    return null;
  }

  return <span>({countByKind})</span>;
}

function renderType(type: string) {
  if (!type) {
    return null;
  }

  return (
    <Type>
      <Icon icon="comment-alt-lines" /> {__("Works with messenger")}
    </Type>
  );
}

function renderCreate(createUrl, kind, isAvailable) {
  if ((!createUrl && !kind) || !isAvailable) {
    return null;
  }

  const trigger = <button>+ {__("Add")}</button>;

  if (kind === INTEGRATION_KINDS.FACEBOOK_MESSENGER) {
    return (
      <Link to={`${createUrl}?kind=${INTEGRATION_KINDS.FACEBOOK_MESSENGER}`}>
        + {__("Add")}
      </Link>
    );
  }

  if (kind === INTEGRATION_KINDS.INSTAGRAM_MESSENGER) {
    return (
      <Link to={`${createUrl}?kind=${INTEGRATION_KINDS.INSTAGRAM_MESSENGER}`}>
        + {__("Add")}
      </Link>
    );
  }
  if (kind === INTEGRATION_KINDS.FACEBOOK_POST) {
    return (
      <Link to={`${createUrl}?kind=${INTEGRATION_KINDS.FACEBOOK_POST}`}>
        + {__("Add")}
      </Link>
    );
  }
  if (kind === INTEGRATION_KINDS.INSTAGRAM_MESSENGER) {
    return (
      <Link to={`${createUrl}?kind=${INTEGRATION_KINDS.INSTAGRAM_MESSENGER}`}>
        + {__("Add")}
      </Link>
    );
  }

  if (kind === INTEGRATION_KINDS.MESSENGER) {
    return <Link to={createUrl}>+ {__("Add")}</Link>;
  }

  // if (
  //   kind === INTEGRATION_KINDS.NYLAS_OFFICE365 ||
  //   kind === INTEGRATION_KINDS.NYLAS_GMAIL
  // ) {
  //   const content = (props) => <NylasForm kind={kind} {...props} />;

  //   return (
  //     <ModalTrigger
  //       title={`Add ${formatText(kind)}`}
  //       content={content}
  //       autoOpenKey={`show${formatText(kind, true)}Modal`}
  //     />
  //   );
  // }

  // if (
  //   kind === INTEGRATION_KINDS.NYLAS_IMAP ||
  //   kind === INTEGRATION_KINDS.NYLAS_EXCHANGE ||
  //   kind === INTEGRATION_KINDS.NYLAS_OUTLOOK ||
  //   kind === INTEGRATION_KINDS.NYLAS_YAHOO
  // ) {
  //   const content = (props) => <NylasForm kind={kind} {...props} />;

  //   return (
  //     <ModalTrigger
  //       title={`Add ${formatText(kind)}`}
  //       trigger={trigger}
  //       content={content}
  //       autoOpenKey={`show${formatText(kind)}Modal`}
  //     />
  //   );
  // }

  // if (kind === INTEGRATION_KINDS.GMAIL) {
  //   return <Link to={createUrl}>+ {__("Add")}</Link>;
  // }

  // if (kind === "twitter") {
  //   const content = (props) => <Twitter {...props} />;

  //   return (
  //     <ModalTrigger title="Add twitter" trigger={trigger} content={content} />
  //   );
  // }

  // if (kind === INTEGRATION_KINDS.SMOOCH_LINE) {
  //   const content = (props) => <LineForm {...props} />;

  //   return (
  //     <ModalTrigger title="Add Line" trigger={trigger} content={content} />
  //   );
  // }

  // if (kind === INTEGRATION_KINDS.TELNYX) {
  //   const content = (props) => <TelnyxForm {...props} />;

  //   return (
  //     <ModalTrigger title="Add telnyx" trigger={trigger} content={content} />
  //   );
  // }

  const formContent = (props) => <IntegrationForm {...props} type={kind} />;

  return (
    <ModalTrigger
      title={`Add ${formatText(kind)}`}
      trigger={trigger}
      content={formContent}
    />
  );
}

function Entry({
  integration,
  getClassName,
  toggleBox,
  totalCount,
  customLink,
}: Props) {
  const { kind, isAvailable, createUrl } = integration;

  const handleLink = () => {
    return customLink && customLink(kind, createUrl);
  };

  function renderCustomLink(isAvailable) {
    if (
      ![
        INTEGRATION_KINDS.NYLAS_GMAIL,
        INTEGRATION_KINDS.NYLAS_OFFICE365,
      ].includes(kind) ||
      !isAvailable
    ) {
      return null;
    }

    return <button onClick={handleLink}>+{__("Add")}</button>;
  }

  return (
    <IntegrationItem key={integration.name} className={getClassName(kind)}>
      <Box
        onClick={() => toggleBox(kind)}
        $isInMessenger={integration.inMessenger}
      >
        <img alt="logo" src={integration.logo} />
        <h5>
          {integration.name} {getCount(kind, totalCount)}
        </h5>
        <p>
          {__(integration.description)}
          {renderType(integration.inMessenger)}
        </p>
        {!isAvailable && (
          <Ribbon>
            <span>{__("Coming soon")}</span>
          </Ribbon>
        )}
      </Box>
      {renderCustomLink(isAvailable)}
      {renderCreate(createUrl, kind, isAvailable)}
    </IntegrationItem>
  );
}

export default Entry;
