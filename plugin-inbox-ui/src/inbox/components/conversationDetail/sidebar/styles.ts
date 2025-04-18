import { ActivityContent, DateContainer } from '@octobots/ui/src/styles/main';
import {
  ActivityDate,
  ActivityIcon,
  ActivityRow,
  ActivityTitle,
  AvatarWrapper,
  CenterText,
  Collapse,
  ConversationContent,
  Count,
  DeleteAction,
  EmailContent,
  FlexBody,
  FlexCenterContent,
  Header,
  IconWrapper,
  Row,
  Timeline,
  Title
} from '@octobots/ui-log/src/activityLogs/styles';
import {
  AttachmentItem,
  AttachmentsContainer,
  Content,
  Details,
  Meta,
  Reply,
  RightSide
} from '@octobots/ui-inbox/src/inbox/components/conversationDetail/workarea/mail/style';
import {
  FormTable,
  MessageBody,
  MessageContent,
  MessageItem,
  UserInfo
} from '@octobots/ui-inbox/src/inbox/components/conversationDetail/workarea/conversation/styles';
import { SectionContainer, SidebarCollapse } from '@octobots/ui/src/layout/styles';
import {
  SpaceBetweenRow,
  Subject
} from '@octobots/ui-inbox/src/settings/integrations/components/mail/styles';
import { colors, dimensions, typography } from '@octobots/ui/src/styles';

import { CardItem } from '@octobots/ui-inbox/src/inbox/components/conversationDetail/workarea/conversation/messages/bot/styles';
import { Flex } from '@octobots/ui/src/styles/main';
import styled from 'styled-components';

const FlexRow = styled(DateContainer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px ${dimensions.unitSpacing}px;
`;

const FlexItem = styled.div`
  flex: 1;
  margin-inline-start	: 5px;
`;

const NoteFormContainer = styled.div`
  border-bottom: 1px solid ${colors.borderPrimary};

  > span {
    padding: ${dimensions.coreSpacing}px ${dimensions.coreSpacing}px
      ${dimensions.unitSpacing}px;
    display: block;
  }

  .draftJsToolbar__toolbar__dNtBH button {
    width: 25px;
  }
`;

const ActivityLogContent = styled(ActivityContent)`
  padding: 0 16px;
  margin-bottom: ${dimensions.coreSpacing}px;

  img {
    max-width: 100%;
  }

  ${Timeline} {
    padding-inline-start: 0;

    &:before {
      display: none;
    }
  }

  ${Collapse} {
    padding: 16px;
  }

  ${Header} {
    font-size: 13px;
    word-break: break-word;
  }

  ${AvatarWrapper}, 
  ${MessageItem} > span, 
  ${Meta} > span,
  ${ConversationContent},
  ${Count} {
    display: none;
  }

  ${ActivityIcon} {
    inset-inline-start: -8px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    top: -8px;
    z-index: 1;
  }

  ${ActivityTitle} {
    padding: ${dimensions.coreSpacing}px 0;
    font-weight: 500;
  }

  ${ActivityRow} {
    box-shadow: none;
    background: ${colors.bgActive};
    border-radius: 4px;
    margin-bottom: 16px;

    &:hover {
      background: ${colors.bgActive};
    }
  }

  ${ActivityDate} {
    margin: 0;
    font-style: italic;
    font-size: ${typography.fontSizeUppercase}px;
  }

  ${EmailContent}, ${MessageItem} {
    padding: 0;
  }

  ${MessageContent}, ${UserInfo} {
    padding: 8px 16px;
  }

  ${MessageBody} {
    margin: 0;
    flex-direction: column;
    align-items: flex-start;

    footer {
      display: none;
    }
  }

  ${Flex} {
    flex-direction: column;
  }

  ${Row} {
    margin-inline-end: 0;
    margin-bottom: 20px;
  }

  ${FlexBody} {
    align-self: baseline;
  }

  ${Meta}, ${FlexCenterContent}, ${FlexBody} {
    flex-direction: column;
    align-items: baseline;
    width: 100%;
  }

  ${CenterText} {
    font-size: 12px;
  }

  ${DeleteAction} {
    visibility: visible;
  }

  ${Title} {
    margin: 0 0 10px;
    font-size: 14px;

    h4 {
      margin: 10px 0;
      font-size: 14px;
    }
  }

  ${IconWrapper} {
    margin-top: 10px;
  }

  //Bot
  ${CardItem} {
    width: 100%;
    margin-inline-end: 0;
  } 

  // form
  ${FormTable} {
    overflow: auto;

    td {
      white-space: nowrap;
    }
  }

  // email
  ${Meta} {
    padding: 8px;
  }

  ${Details} {
    align-self: normal;
    margin: 0;
    word-break: break-word;
  }

  ${RightSide} {
    margin-inline-start	: 0;
    padding: 0;
  }

  ${Reply} {
    padding: 8px 16px;
    display: flex;
    flex-direction: column;

    > button {
      margin: 4px 0;
    }
  }

  ${AttachmentsContainer} {
    margin: 0 16px 8px 16px
  }

  ${AttachmentItem} {
    width: 180px;
    margin: 8px 0px 0px 0px;
  }

  ${Content} {
    padding: 8px 16px;

    > div {
      min-width: 300px;
    }
  }

  //email form 
  ${SpaceBetweenRow} {
    flex-direction: column;

    > a {
      padding-inline-start: 0;
    }

    button {
      width: 100%;
      margin: 4px 0;
    }
  }

  ${Subject} {
    padding: 8px 16px;
  }
`;

const BasicInfo = styled.div`
  margin-top: 10px;
`;

const TabContent = styled.div`
  ul {
    padding: ${dimensions.unitSpacing}px 0;
  }
`;

export {
  FlexRow,
  FlexItem,
  SectionContainer,
  NoteFormContainer,
  ActivityLogContent,
  BasicInfo,
  SidebarCollapse,
  TabContent
};
