import {
  RichEditorControlsRoot,
  RichEditorRoot
} from "@octobots/ui/src/components/editor/styles";
import {
  PopoverFooter as RootFooter,
  PopoverList as RootList
} from "@octobots/ui/src/components/filterableList/styles";
import { colors, dimensions } from "@octobots/ui/src/styles";
import { darken, rgba } from "@octobots/ui/src/styles/ecolor";

import { PopoverButton } from "@octobots/ui/src/styles/eindex";
import { isEnabled } from "@octobots/ui/src/utils/core";
import styled from "styled-components";
import styledTS from "styled-components-ts";

const ResponseSuggestions = styled.ul`
  position: absolute;
  inset-inline-start: 0px;
  bottom: 100%;
  bottom: calc(100% + 2px);
  margin: 0;
  padding: 0;
  z-index: 1;
  width: 480px;
  list-style-type: none;
  background: ${colors.colorWhite};
  box-shadow: 0 -3px 20px -2px ${colors.darkShadow};
  overflow: hidden;
  border-radius: 3px;
`;

const ResponseSuggestionItem = styled.li`
  margin: 0;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px 15px;
  text-overflow: ellipsis;

  :hover {
    background-color: ${rgba(colors.bgUnread, 0.5)};
  }

  strong {
    color: ${colors.colorCoreRed};
  }
`;

const RespondBoxStyled = styledTS<{
  $isInactive?: boolean;
  $isInternal?: boolean;
}>(styled.div)`
  border-top: 1px solid ${colors.borderPrimary};
  position: relative;
  transition: background 0.3s ease;
  background: ${props =>
    props.$isInternal ? colors.bgInternal : colors.colorWhite};
  filter: ${props => props.$isInactive && "blur(2px)"};
  div[data-prose-mirror-editor]{
    background: ${props =>
    props.$isInternal ? colors.bgInternal : colors.colorWhite};
    transition: background 0.3s ease;
  }
  .cm-editor{
    background: ${props =>
    props.$isInternal ? colors.bgInternal : colors.colorWhite};
    transition: background 0.3s ease;
  }
`;

const MailRespondBox = styled(RespondBoxStyled)`
  padding: ${dimensions.unitSpacing - 2}px ${dimensions.coreSpacing}px;
  display: flex;
  align-items: flex-start;
`;

const ResponseTemplateStyled = styledTS<{
  $noPadding?: boolean;
}>(styled.div)`
  // display: flex;

  button {
    margin-inline-end: ${props => !props.$noPadding && "10px"};
    margin-inline-start: 0;
    padding: ${props => !props.$noPadding && "0"};
  }

  span {
    margin: 0;
  }
`;

const EditorActions = styled.div`
  padding: 0 20px 10px 20px;
  text-align: end;
  position: relative;
  color: ${colors.colorCoreGray};
  display: flex;
  justify-content: end;
  align-items: center;

  label {
    margin: 0 10px 0 0;
    display: block;

    &:hover {
      cursor: pointer;
      color: ${darken(colors.colorCoreGray, 30)};
    }

    &:first-of-type {
      position: absolute;
      inset-inline-start: 20px;
      z-index: 11;
    }
  }

  i {
    margin: 0;
  }

  input[type="file"] {
    display: none;
  }
`;

const InlineHeader = styled.div`
  display: flex;
  flex: 2;
  font-size: 12px;
`;

const InlineColumn = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: baseline;

  &:first-child {
    margin-inline-end: 5px;
  }
`;

const InlineHeaderSpan = styled.span`
  margin: 0 8px;
`;

const PopoverHeader = styled.div`
  background-color: ${colors.bgLight};

  input[type="text"] {
    padding: 4px 8px 4px 20px;
  }
`;

const PopoverFooter = styled(RootFooter)`
  align-self: end;
  width: 100%;
`;

const PopoverList = styledTS<{ center?: boolean }>(styled(RootList))`
  position: relative;
  padding: 0;

  li {
    text-align: ${props => props.center && "center"};

    a {
      color: ${colors.colorCoreDarkGray};
    }

    &.active{
      color: rgb(55, 55, 55);
      background: ${colors.bgLight};
      outline: 0px;
    }
  }
`;

const PopoverLoadMore = styled.li`
  text-align: center;

  button {
    box-shadow: none;
    border-radius: 30px;
    font-size: 10px;
    padding: 5px 15px;
  }
`;

const PopoverBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 0;

  ${PopoverList} {
    max-height: none;
    display: flex;
    flex-direction: column;
    min-height: 100%;

    li {
      white-space: normal;
      font-size: 12px;
      padding: 10px 20px;
      border-bottom: 1px solid ${colors.borderPrimary};

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const TemplateTitle = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

const TemplateContent = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: normal;
`;

const AttachmentIndicator = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 15px 10px 15px;
  color: ${rgba(colors.colorWhite, 0.7)};
`;

const Attachment = styled.div`
  display: flex;
  max-width: 250px;
  padding: 5px;
  margin: 0 0 5px 5px;
  font-size: 12px;
  background-color: ${colors.colorSecondary};
  align-items: center;

  > div {
    margin-inline-end: 8px;
  }

  i {
    color: ${colors.colorWhite};
    opacity: 0.7;
    margin: 0 3px;
    font-size: 13px;
    transition: all ease 0.3s;

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }
`;

const AttachmentThumb = styled.div`
  margin-inline-end: 5px;
`;

const PreviewImg = styled.div`
  width: 26px;
  height: 26px;
  background-size: cover;
  background-position: 50%;
`;

const FileName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-inline-end: 5px;
  color: ${colors.colorWhite};
`;

const MaskWrapper = styled.div`
  position: relative;
`;



const Mask = styled.div`
  position: absolute;
  padding: 10px;
  inset-inline-start: 0;
  bottom: 0;
  inset-inline-end: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const RecordMask = styled(Mask)`
  z-index: 1000;
  background-color: #e5e5e5;
`;

const MaskText = styled.div`
  background: #fff;
  width: 100%;
`;

const NoHeight = styled.div`
  height: auto;
`;

const SmallEditor = styled.div`
  flex: 1;
  background: ${colors.colorWhite};
  border: 1px solid ${colors.borderPrimary};
  border-radius: ${dimensions.coreSpacing}px;
  margin-inline-start: ${dimensions.unitSpacing}px;
  padding: ${dimensions.unitSpacing - 2}px 110px ${dimensions.unitSpacing - 2}px
    0;
  position: relative;

  ${RichEditorRoot} {
    padding-top: 0;

    .RichEditor-editor {
      border: 0;

      .public-DraftEditor-content,
      .public-DraftEditorPlaceholder-root {
        min-height: auto;
        padding: 0px 15px;
      }

      .public-DraftEditorPlaceholder-inner {
        max-height: 20px;
        overflow: hidden;
      }
    }
  }

  ${RichEditorControlsRoot} {
    display: none;
  }

  ${EditorActions} {
    position: absolute;
    inset-inline-end: 0;
    bottom: 0;
    padding: 5px 10px;

    label:first-of-type {
      position: initial;
    }
  }

  ${AttachmentIndicator} {
    margin: 5px ${dimensions.unitSpacing}px 0;
  }

  ${PreviewImg} {
    width: 13px;
    height: 13px;
  }
`;

const CallLabel = styledTS<{ type: string }>(styled.span)`
  color: ${props => (props.type === "answered" ? "green" : "red")};
`;

const ModalWrapper = styledTS<{ $show?: boolean }>(styled.div)`
${({ $show }) =>
    $show
      ? `
      position: fixed;
      top: 0;
      bottom: 0;
      inset-inline-start: 0;
      inset-inline-end: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 300;

      .cke_contents {
        min-height: 450px !important;
      }
  `
      : `z-index: 3;`}`;

export {
  PopoverButton,
  RespondBoxStyled,
  ResponseSuggestions,
  ResponseSuggestionItem,
  EditorActions,
  ResponseTemplateStyled,
  PopoverHeader,
  InlineHeader,
  InlineColumn,
  InlineHeaderSpan,
  PopoverBody,
  PopoverList,
  PopoverLoadMore,
  TemplateTitle,
  TemplateContent,
  PopoverFooter,
  Attachment,
  AttachmentThumb,
  AttachmentIndicator,
  PreviewImg,
  FileName,
  Mask,
  RecordMask,
  MaskText,
  MaskWrapper,
  NoHeight,
  SmallEditor,
  CallLabel,
  MailRespondBox,
  ModalWrapper
};