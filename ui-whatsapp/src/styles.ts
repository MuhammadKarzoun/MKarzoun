import { colors, dimensions } from "@octobots/ui/src/styles";
import styled from "styled-components";
import styledTS from "styled-components-ts";

import { RightMenuContainer } from "@octobots/ui-sales/src/boards/styles/rightMenu";
import { SCREEN_BREAK_POINTS } from "./constants";

const Templates = styledTS<{ isSidebarOpen?: boolean }>(styled.div)`
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    gap: 15px;
    padding: 20px 20px 0 20px;
    
    @media (min-width: ${({ isSidebarOpen }) => SCREEN_BREAK_POINTS.md[isSidebarOpen ? "max" : "min"]}px) {
        grid-template-columns: repeat(2, 1fr);   
    }

    @media (min-width: ${({ isSidebarOpen }) => SCREEN_BREAK_POINTS.lg[isSidebarOpen ? "max" : "min"]}px) {
        grid-template-columns: repeat(3, 1fr);   
    }

    @media (min-width: ${({ isSidebarOpen }) => SCREEN_BREAK_POINTS.xl[isSidebarOpen ? "max" : "min"]}px) {
        grid-template-columns: repeat(4, 1fr);   
    }
`;

const TemplateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 25px 30px;
  border-radius: 6px;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TemplateActions = styled.div`
  position: relative;
`;

const TemplateTitle = styled.h5`
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;

  margin: 0 0 5px;
  line-height: 22px;
`;

const TemplateDescription = styledTS<{ limit?: number }>(styled.div)`
    color: ${colors.colorCoreGray};
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    ${({ limit }) => (limit ? `-webkit-line-clamp: ${limit};` : "")}
`;

const CategoryItem = styledTS<{ isActive?: boolean }>(styled.div)`
    font-size: 12px;
    font-weight: 500;
    padding: 6px 10px;
    border-radius: 4px;
    color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
    background-color: ${({ isActive }) => (isActive ? colors.colorPrimary : colors.bgActive)};
    transition: background-color 0.3s ease; 
    cursor: pointer;

    &:hover {
        color: #fff;
        background-color: ${colors.colorPrimary};
    }
`;

const Categories = styledTS<{ justifyContent?: string }>(styled.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: ${props => props.justifyContent || "end"};
    margin-top: 8px;

    ${CategoryItem}:last-child {
        margin: 0;
    }
`;

const RightDrawerContainer = styledTS<{ width?: number } & any>(
  styled(RightMenuContainer)
)`
    background: ${colors.colorWhite};
    width: ${props =>
    props.width ? `calc(100% - ${props.width}px)` : "500px"};
    padding: ${dimensions.unitSpacing}px;
    z-index: 10;
    top: 0;
`;

const FormContent = styled.div`
  padding: 10px 15px 0px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  height: calc(100vh - 74px);
`;

const FormEditor = styled.div`
  margin: 10px 0;
  background-color: ${colors.colorWhite};
  box-shadow: 0 0 6px 1px ${colors.shadowPrimary};
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colors.bgGray};
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const FormTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const FormActions = styled.div`
  display: flex;

  > i {
    display: flex;
    height: 32px;
    width: 32px;
    margin-inline-start	: 8px;
    border-radius: 50%;
    background-color: ${colors.bgGray};
    color: ${colors.colorCoreDarkGray};
    align-items: center;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
  }

  > i:last-child {
    color: ${colors.colorPrimary};
  }
`;

const FormFooter = styled.footer`
  display: flex;
  padding: 10px 15px;

  > button {
    width: 100%;
  }
`;

const PreviewWrapper = styled.div`
  border: 1px solid ${colors.bgGray};
  width: 100%;
  height: 200px;
  border-radius: 6px;
  margin: 20px 0;

  .react-flow__controls {
    display: flex;
    gap: 4px;
    box-shadow: none;
  }

  .react-flow__controls-button {
    border: 1px solid ${colors.bgGray};
    border-radius: 6px;
    width: 10px;
    height: 10px;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
  }
`;

const ImportInput = styled.input`
  display: none;
`;

const ImportLabel = styled.label`
  background: ${colors.bgActive};
  border-radius: 8px;
  margin: 0 10px;
  padding: 0 10px;

  cursor: pointer;
`;

// preview

const WhatsappPreview = styledTS<{ $fullHeight?: boolean }>(styled.div)`
  background: url('/images/previews/whatsapp.png');
  background-repeat: no-repeat;
  background-position: center 0px;
  background-size: cover;
  height: ${(props) => props.$fullHeight && '100%'};
  max-height: 640px;
  overflow: hidden;
`;

const EmulatorWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  margin-top: 28%;
  font-size: 80%;
`;

const PreviewBody = styled.div`
    max-height: 440px;
    overflow: auto;
    border: 1px solid rgb(204, 204, 204);
    margin-top: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 0.5px rgba(11, 20, 26, 0.13);
    padding: 8px;
    width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const MessageFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e9edef;
`;

const MessageButton = styled.a`
  display: block;
  background: #008069;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  width: 100% !important;
  transition: background 0.2s ease;
  text-align: center;
  text-decoration: none;

  &:hover {
    background: #006e5c;
    color: white;
  }
`;

const MessageTime = styled.span`
  color: #667781;
  margin-top: 4px;
  display: block;
  text-align: end;
`;

const CarouselContainer = styled.div`
  margin-top: 10px;
  img {
    width: 100%;
    border-radius: 4px;
    margin-bottom: 8px;
  }
`;

const ColumnContainer = styled.div`
  display: flex;   
  gap: 15px;             
`;

const MainColumn = styled.div`
  flex: 1;         
  min-width: 0;
  padding: 15px;             
`;

const SidebarColumn = styled.div`
  flex: 0 0 350px;       
  height: inherit;      
`;

const MediaViewItem = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    min-width: 220px;
    min-height: 60px;
    align-items: center;
    border: 1px solid #70b5f9;
    border-radius: 5px;
    margin: 5px 10px;
    justify-content: space-between;
    background-color: #f2f6fc;

    .icon {
        justify-content: center;
        width: 100px;
        border-inline-end: 1px dashed #70b5f9;
    }

    .icon img {
        width: 100%;
        height: auto;
        cursor: pointer;
        max-height: 150px;
    }

    .text {
        width: -webkit-fill-available;
    }

    .remove {
        width: 60px;
        cursor: pointer;
    }
    
    .remove:hover {
      color: #eb5038;
    }

    > div {
    background: #d1d5d;
    height: 100%;
    display: flex;
    align-items: center;
    }

    i {
    padding: 0px 15px;
    }

    p {
    margin: 0;
    padding: 0px 15px 0px 10px;
    }
`;

const ChooseMediaBox = styled.div`
  border: 3px dashed ${colors.colorCoreGray};
  border-radius: ${dimensions.unitSpacing}px;
  height: 70px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
  margin: 0px 5px 0px;
  }

  &:hover {
  border-color: ${colors.colorSecondary};
  color: ${colors.colorSecondary};
  box-shadow:
    0px 8px 20px rgba(79, 51, 175, 0.24),
    0px 2px 6px rgba(79, 51, 175, 0.16),
    0px 0px 1px rgba(79, 51, 175, 0.08);
  }

`;

export {
  Templates,
  TemplateBox,
  TemplateTitle,
  TemplateActions,
  TemplateHeader,
  FormEditor,
  TemplateDescription,
  Categories,
  CategoryItem,
  RightDrawerContainer,
  FormContent,
  FormHeader,
  FormFooter,
  FormTitle,
  FormActions,
  PreviewWrapper,
  ImportInput,
  ImportLabel,
  // preview
  ColumnContainer,
  MainColumn,
  SidebarColumn,
  WhatsappPreview,
  EmulatorWrapper,
  PreviewBody,
  MessageFooter,
  MessageButton,
  MessageTime,
  CarouselContainer,
  MediaViewItem,
  ChooseMediaBox
};
