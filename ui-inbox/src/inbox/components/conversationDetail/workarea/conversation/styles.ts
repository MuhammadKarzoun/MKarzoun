import { AttachmentWrapper, Meta } from '@octobots/ui/src/components/Attachment';
import { colors, dimensions } from '@octobots/ui/src/styles';
import { darken, rgba } from '@octobots/ui/src/styles/ecolor';
import styled, { css } from 'styled-components';

import styledTS from 'styled-components-ts';

const MessageContent = styledTS<{ $failed?: boolean; $internal?: boolean; $staff?: boolean }>(
  styled.div,
)`
  max-width: 80%; /* added by hichem */
  position: relative; /* added by hichem */
  padding: ${dimensions.unitSpacing}px ${dimensions.coreSpacing + 5}px;
  border-radius: 20px;
  border-end-start-radius: 2px;
  background: ${colors.colorWhite};
  background: ${(props) =>
    props.$failed? colors.colorCoreRed
    : props.$internal? colors.bgInternal
    : props.$staff && colors.colorSecondary};
  word-break: break-word;
  box-shadow: 0 1px 1px 0 ${colors.darkShadow};
  color: ${(props) => props.$staff && !props.$internal && colors.colorWhite};
  text-align: start;

  ${(props) =>
    props.$staff &&
    css`
      border-bottom-end-radius: 2px;
      border-bottom-start-radius: 20px;

      ${AttachmentWrapper}, ${Meta} {
        color: ${rgba(colors.colorWhite, 0.9)};
      }
    `};

  a {
    color: ${(props) =>
      props.$staff && !props.$internal
        ? colors.colorWhite
        : colors.linkPrimary};
    text-decoration: underline;
  }

  .dropdown-item {
    color: black;
    text-decoration: none;
    padding: 3px 10px;
  }

  .dropdown-item > i{
    padding-inline-end: 5px;
  }
  
  .message-first-div>div {
    position: absolute;
    width: 100%;
    height: 0px;
  }

  p {
    margin: 0;
  }

  > span {
    display: block;
  }

  .mention {
    font-weight: bold;
    display: inline-block;
  }

  img {
    max-width: 300px;
    border-radius: 2px;
  }

  ul,
  ol {
    padding-inline-start: 25px;
    margin: 0;
  }

  h3 {
    margin-top: 0;
  }

  blockquote {
    margin-bottom: 0;
    border-color: ${colors.borderDarker};
  }

  pre {
    margin-bottom: 0;
  }
`;

const MessageBody = styledTS<{ $staff?: boolean }>(styled.div)`
  margin: ${(props) => (props.$staff ? '0 55px 0 0' : '0 0 0 55px')};
  display: flex;
  flex-direction: ${(props) => (props.$staff ? 'row-reverse' : 'row')};
  align-items: center;

  footer {
    flex-shrink: 0;
    font-size: 11px;
    display: inline-block;
    color: ${colors.colorCoreLightGray};
    margin: 0 10px;
    cursor: pointer;
  }

  > img {
    box-shadow: 0 1px 1px 0 ${colors.darkShadow};
    max-width: 100%;
  }

  /* Add hover effect for dropdown visibility */
  &:hover .dropdown-options {
    display: block;
  }

  &:hover .msg-reaction-button {
    display: block;
  }
`;

// Define dropdown options with initial hidden display
const DropdownOptions = styled.div`
  display: none; /* Hidden by default */
`;

const MessageItem = styledTS<{
  $isSame?: boolean;
  $staff?: boolean;
  $isBot?: boolean;
}>(styled.div)`
  margin-top: ${(props) => (props.$isSame ? dimensions.unitSpacing - 5 : 20)}px;
  padding-inline-end: 17%;
  display: flex;
  flex-direction: row;
  position: relative;
  clear: both;

  > span {
    position: absolute;
    inset-inline-end: ${(props) => props.$staff && '0'};
    bottom: 0;
  }

  ${(props) =>
    props.$isBot &&
    css`
      padding-inline-end: 0;

      ${MessageBody} {
        flex-direction: column;
        align-items: flex-start;
      }

      ${MessageContent} {
        border-radius: 20px;
      }
    `};

  ${(props) => {
    if (!props.$staff) {
      return '';
    }

    return `
      padding-inline-end: 0;
      padding-inline-start: 10%;
      text-align: end;
      flex-direction: row-reverse;
    `;
  }};

  &.same {
    ${MessageContent} {
      border-top-start-radius: ${(props) => !props.$staff && '2px'};
      border-top-end-radius: ${(props) => props.$staff && '2px'};
    }

    &:last-of-type {
      ${MessageContent} {
        border-bottom-end-radius: ${(props) => props.$staff && '20px'};
        border-bottom-start-radius: ${(props) => !props.$staff && '20px'};
      }
    }
  }

  &.attachment ${MessageContent} {
    padding: ${dimensions.coreSpacing}px;

    > span {
      margin-bottom: 5px;
    }

    br {
      display: none;
    }
  }

  &.fbpost {
    .body {
      padding: 12px;
      background: #f6f7f9;
      border: 1px solid;
      border-color: #e5e6e9 #dfe0e4 #d0d1d5;
      border-radius: 4px;
    }
  }
`;

const FormTable = styled.div`
  border: 1px solid ${colors.borderPrimary};
  border-radius: 2px;
  font-size: 12px;
  padding: 0;
  margin-bottom: ${dimensions.coreSpacing}px;
  background: ${colors.colorWhite};

  table thead th:last-child {
    text-align: center;
    color: ${colors.colorCoreBlack};
  }

  table tr td {
    word-break: break-word;
  }

  footer {
    flex-shrink: 0;
    font-size: 11px;
    float: inline-end;
    color: ${colors.colorCoreLightGray};
    margin-inline-start: 10px;
    cursor: pointer;
  }
`;

const CellWrapper = styled.div`
  display: inline-block;
  max-width: 100%;

  > a {
    display: block;

    div:first-child {
      float: inline-start;
    }
  }
`;

const CallBox = styled.div`
  border: 1px solid ${colors.borderPrimary};
  border-radius: 5px;
  background: ${colors.colorWhite};
  text-align: start;
  float: inline-end;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 6px 1px;
`;

const AppMessageBox = styled(CallBox)`
  width: 320px;
  text-align: center;
`;

const CallButton = styled.div`
  padding: ${dimensions.coreSpacing}px;
  border-top: 1px solid ${colors.borderPrimary};

  h5 {
    margin-top: 0;
    margin-bottom: 15px;
  }

  button,
  a {
    width: 100%;
    border-radius: 5px;
    background: ${colors.colorCoreBlue};
    font-size: 14px;
    padding: 10px 20px;
    text-transform: initial;
    box-shadow: none;
  }

  a {
    display: block;
    color: ${colors.colorWhite};

    &:hover {
      background: ${darken(colors.colorCoreBlue, 10)};
    }
  }
`;

const UserInfo = styled.div`
  padding: ${dimensions.coreSpacing}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 3px solid ${colors.colorCoreBlue};
  border-radius: 5px;

  h4 {
    margin: 20px 0 0 0;
    font-size: 16px;
  }

  h5 {
    margin-top: 0;
  }

  h3 {
    margin: 0;
  }
`;

const FlexItem = styled.div`
  display: flex;
  justify-content: end;
`;

const FormMessageInput = styled.div`
  padding: ${dimensions.unitSpacing - 4}px ${dimensions.coreSpacing - 5}px;
  color: ${colors.textPrimary};
  border: 1px solid ${colors.colorShadowGray};
  margin-top: ${dimensions.unitSpacing - 5}px;
  background: #faf9fb;
  border-radius: 5px;
  font-size: 14px;
  min-height: 35px;
  overflow-wrap: break-word;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.07);

  img {
    max-height: 150px !important;
  }
`;

const FieldWrapper = styledTS<{ column?: number }>(styled.div)`
  input, .Select {
    pointer-events: none;
    cursor: default;

    .Select-value {
      padding: 0;
    }

    .Select-input, .Select-clear-zone, .Select-arrow-zone, .Select-value-icon {
      display: none !important;
    }
  }

${(props) =>
  props.column &&
  css`
    width: ${100 / props.column}%;
    display: inline-block;
  `}
`;

const ProductItem = styledTS(styled.div)`
  display:flex;
  justify-content: space-between;

  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
`;

const StatusMessage = styled.div`
  margin-inline-start: 4px;
  cursor: pointer;
`;

const Forwarded = styledTS(styled.div)`
  background-color: #36363617;
  padding: 2px 10px;
  border-radius: 7px;
  text-align: center;

  i {
    transform: scaleX(-1);
    display: inline-block;
    padding: 0px 5px;
  }

  span {
    font-style: italic;
  }
`;

const ReplyTo = styledTS(styled.div)`
  background-color: #36363617;
  padding: 2px 7px;
  border-radius: 7px;
  border-inline-start: solid 4px #e542a3;
  cursor: pointer;

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

const DropdownItem = styledTS(styled.a)`
  color: black;
  text-decoration: none;
`;

const OptionsContainer = styledTS<{$staff?: boolean;}>(styled.div)`
  inset-inline-end: ${(props) => props.$staff? 'unset' : '24px'};
  inset-inline-start:  ${(props) => props.$staff? '-24px' : 'unset'};
  border-top-end-radius: ${(props) => props.$staff? 'unset' : '16px'};
  border-top-start-radius: ${(props) => props.$staff? '16px' : 'unset'};
  flex-direction: row;
  cursor: pointer;

  display: flex;
  position: absolute;
  top: -8px;
  padding: 5px;
  z-index: 2;

  .options-logo {
    display: flex;
    align-items: center;
    -webkit-box-pack: center;
    height: 16px;
    border-radius: 3px;
    text-align: start;
    justify-content: center;
    font-size: initial;
  }
`;

const FloatItem = styledTS(styled.div)`
    position: absolute;
    z-index: 10000;
    background-color: transparent;
    inset-inline-end: 180px;
    bottom: -50px;
`;

const ReactionContent = styledTS<{$staff?: boolean;}>(styled.div)`
    position: relative;
    padding: 0px 2px;
    top: -8px;
    font-size: 16px;
    background-color: white;
    border-radius: 15px;
    float:${(props) => props.$staff? 'inline-end' : 'inline-start'};
    ${(props) => props.$staff ? 'inset-inline-start: -75px' : 'inset-inline-end: -65px'};
`;

const Reactionbutton = styledTS<{$staff?: boolean;}>(styled.button)`
    margin-${(props) => props.$staff? 'inline-end: 5px' : 'inline-start: 5px'};
    border-radius: 50%;
    border: solid 1px #d7d6d6;
    background-color: transparent;
    font-size: 18px;
    color: gray;
    display: none;
`;

const DeletedMessageContent = styledTS<{ $staff?: boolean }>(
  styled.div,
)`
  max-width: 80%;
  position: relative;
  padding: ${dimensions.unitSpacing}px ${dimensions.coreSpacing}px;
  border-radius: 20px;
  border-bottom-start-radius: 2px;
  background: ${colors.colorWhite};
  word-break: break-word;
  box-shadow: 0 1px 1px 0 ${colors.darkShadow};
  color: ${(props) => props.$staff && colors.colorCoreGray};
  text-align: start;

  ${(props) =>
    props.$staff &&
    css`
      border-bottom-end-radius: 2px;
      border-bottom-start-radius: 20px;
    `};

  i {
    font-size: 16px;
    padding: 0px 5px;
  }
`;

// Container for the emoji picker
const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px;
  display: flex;
  gap: 8px;
  z-index: 10;
`;

// Individual emoji button
const EmojiButton = styled.span`
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: scale(1.2);
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.9);
  }
`;

// Container for the message reaction
const ReactionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
`;

// Individual reaction emoji
const ReactionEmoji = styled.span`
  font-size: 14px;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

export {
  MessageItem,
  MessageBody,
  MessageContent,
  FormTable,
  AppMessageBox,
  CallButton,
  UserInfo,
  FlexItem,
  CallBox,
  CellWrapper,
  FieldWrapper,
  FormMessageInput,
  ProductItem,
  StatusMessage,
  Forwarded,
  OptionsContainer,
  DropdownItem,
  FloatItem,
  Reactionbutton,
  ReactionContent,
  ReplyTo,
  DeletedMessageContent,
  DropdownOptions,
  EmojiPickerContainer,
  EmojiButton,
  ReactionContainer,
  ReactionEmoji
  
};