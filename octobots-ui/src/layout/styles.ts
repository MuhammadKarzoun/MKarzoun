import { lighten, rgba } from '../styles/ecolor';

import { TabContainer } from '@octobots/ui/src/components/tabs/styles';
import styledTS from 'styled-components-ts';
import { twinkling } from '../utils/animations';
import { getThemeItem } from '../utils/core';
import styled, { css, keyframes } from 'styled-components';
import { colors, dimensions, typography } from '../styles';

// Animation for smooth transitions
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;
const thColor = getThemeItem('text_color');

// Core Layout Components
const FlexContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 100%;
  background: ${colors.bgMain};
`;

const FlexFieldsContent = styled.div`
  display: flex;
  flex: 1;
  min-height: 100%;
  flex-direction: column;
  background: ${colors.bgMain};
`;

const WhiteBoxRoot = styled.div`
  margin-bottom: ${dimensions.coreSpacing}px;
  background: ${colors.colorWhite};
  border-radius: 12px;
  box-shadow: 0 4px 12px ${rgba(colors.shadowPrimary, 0.1)};
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px ${rgba(colors.shadowPrimary, 0.2)};
    transform: translateY(-2px);
  }
`;

const WhiteBox = styled(WhiteBoxRoot)`
  flex: 1;
  overflow: auto;
  position: relative;
  background: ${colors.colorWhite};
`;

const PageHeader = styled.div`
  height: ${dimensions.headerSpacing}px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 3;
  padding-inline-start: ${dimensions.coreSpacing * 1.5}px;
`;

const Contents = styledTS<{ $hasBorder?: boolean }>(styled.div)`
  display: flex;
  flex: 1;
  max-height: 100%;
  position: absolute;
  inset-inline-start: 0;
  inset-inline-end: 0;
  bottom: 0;
  top: 0;
  gap: 10px;
  overflow-x: auto;
  border-radius: ${(props) => props.$hasBorder && `${dimensions.unitSpacing}px`};
  animation: ${fadeIn} 0.3s ease;

  @-moz-document url-prefix() {
    overflow: hidden;
  }
`;

const VerticalContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-height: 100%;
  background: ${colors.bgMain};
  margin: 16px;
  padding: 20px 0px;
  border-radius: 12px;
`;

const HeightedWrapper = styled.div`
  flex: 1;
  position: relative;
  @media (max-width: 560px) {
    max-width: 98% !important;
  }
`;

const MainHead = styled.div`
  padding: 0 ${dimensions.coreSpacing}px;
  z-index: 2;
`;

const MainContent = styledTS<{
  $transparent?: boolean;
  $center?: boolean;
}>(styled.section)`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 480px;
  height: ${(props) => props.$center && '100%'};
`;

const ContentBox = styledTS<{
  $transparent?: boolean;
  $initialOverflow?: boolean;
}>(styled.div)`
  flex: ${(props) => (props.$initialOverflow ? 'initial' : 1)};
  overflow: ${(props) => (props.$initialOverflow ? 'initial' : 'auto')};
  position: relative;
  border-radius: 12px;
  background: ${colors.colorWhite};

  .react-flow__attribution {
    display: none;
  }
`;

const ContentHeader = styledTS<{
  background: string;
  zIndex?: number;
  $wideSpacing?: boolean;
}>(styled.div)`
  background: ${(props) =>
    props.background === 'transparent' ? 'none' : colors[props.background]};
  padding: ${(props) => (props.$wideSpacing ? '0 0 12px 0' : 0)};
  margin: ${(props) => (props.$wideSpacing ? '12px 20px 0 20px' : '10px 20px')};
  z-index: ${(props) => props.zIndex || 2};
  border-radius: 12px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContenFooter = styled.div`
  ${ContentHeader} {
    border-bottom: none;
    border-top: 1px solid ${colors.borderPrimary};
  }
`;

const HeaderItems = styledTS<{
  $rightAligned?: boolean;
  $hasFlex?: boolean;
}>(styled.div)`
  align-self: center;
  flex: ${(props) => props.$hasFlex && 1};
  margin-inline-start: ${(props) => props.$rightAligned && 'auto'};
  flex-shrink: ${(props) => props.$rightAligned && '0'};
`;

const SideContent = styledTS<{
  $wide?: boolean;
  $half?: boolean;
  $full?: boolean;
  $hasBorder?: boolean;
}>(styled.section)`
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-direction: column;
  flex-shrink: 0;
  width: ${(props) => (props.$wide ? '340px' : '290px')};
  flex: ${(props) => (props.$half ? '1' : 'none')};
  background: ${(props) => (props.$full ? colors.colorWhite : colors.colorWhite)};
  margin: ${(props) => props.$hasBorder && 0};
  border-radius: 12px;
  box-shadow: 0 4px 12px ${rgba(colors.shadowPrimary, 0.1)};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px ${rgba(colors.shadowPrimary, 0.2)};
  }

  ${TabContainer} {
    position: sticky;
    top: 0;
    background: ${colors.colorWhite};
  }
`;

const SidebarHeader = styledTS<{
  spaceBottom?: boolean;
  $uppercase?: boolean;
  $bold?: boolean;
}>(styled.div)`
  height: ${dimensions.headerSpacing}px;
  align-items: center;
  text-transform: ${(props) => props.$uppercase && 'uppercase'};
  font-weight: ${(props) => (props.$bold ? 'bold' : '500')};
  display: flex;
  font-size: ${typography.fontSizeHeading8}px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${dimensions.coreSpacing}px;
  border-radius: 12px 12px 0 0;
`;

const SidebarTitle = styledTS<{
  children: any;
}>(
  styled(SidebarHeader).attrs({
    as: 'h3'
  })
)`
  padding: 0;
  margin: 0px ${dimensions.coreSpacing}px;
  text-transform: uppercase;
  position: relative;
`;

const SidebarMainContent = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  position: relative;
  border-radius: 0 0 12px 12px;
`;

const SidebarFooter = styledTS<{ children: any }>(styled(SidebarHeader))`
  border-top: 1px solid ${colors.borderPrimary};
  border-bottom: none;
`;

const SidebarMainHead = styled.div`
  & > ul {
    background-color: ${colors.colorWhite};
    padding: 20px;
  }
  & > ul li {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    background-color: ${rgba(colors.colorPrimary, 0.3)};
    transition: background 0.3s ease;

    &:hover {
      background: ${rgba(colors.colorPrimary, 0.5)};
      outline: 1px solid ${colors.newPrimaryColor};
      color: ${colors.newPrimaryColor};
    }
  }
  & > ul li a {
    padding: 6px;
    color: ${colors.colorBlack};
  }
  & > ul li a.active {
    border-radius: 4px;
    outline: 1px solid ${colors.newPrimaryColor};
  }
`;

const SidebarBox = styledTS<{
  noBackground?: boolean;
  $noShadow?: boolean;
  $collapsible?: boolean;
  $full?: boolean;
  $noMargin?: boolean;
}>(styled.div)`
  background-color: ${(props) => (props.noBackground ? '' : colors.colorWhite)};
  margin-bottom: ${(props) => !props.$noMargin && dimensions.unitSpacing}px;
  box-shadow: ${(props) =>
    props.$noShadow ? 'none' : `0 4px 12px ${rgba(colors.shadowPrimary, 0.1)}`};
  padding-bottom: ${(props) =>
    props.$collapsible ? `${dimensions.unitSpacing}px` : '0'};
  position: ${(props) => (props.$full ? 'initial' : 'relative')};
  justify-content: center;
  transition: max-height 0.4s;
  overflow: ${(props) => (props.$collapsible ? 'hidden' : 'initial')};
  display: ${(props) => props.$full && 'flex'};
  border-radius: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BoxContent = styledTS<{ noPadding?: boolean }>(styled.div)`
  flex: 1;
  ${(props) =>
    props.noPadding
      ? `
    ul {
      padding: 0 !important;
    }
  `
      : `
    ul:first-child {
      padding-top: 0;
    }
  `}
`;

const SidebarToggle = styledTS<{ inverse?: boolean }>(styled.a)`
  width: 100%;
  color: ${colors.colorCoreGray};
  position: absolute;
  bottom: 0;
  text-align: center;
  transform: ${document.dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)'};
  padding: 0;
  background: ${(props) =>
    props.inverse ? colors.colorWhite : colors.bgLight};
  border-top: 1px solid ${colors.borderPrimary};
  z-index: 2;
  transition: color 0.3s ease;

  &:hover {
    cursor: pointer;
    color: ${colors.colorPrimary};
  }

  &:focus {
    outline: 0;
  }
`;

const HelperButtons = styledTS<{ $isSidebarOpen?: boolean }>(styled.div)`
  position: absolute;
  ${(props) =>
    `inset-inline-end: ${dimensions.coreSpacing}px;
      padding-inline-end: ${props.$isSidebarOpen ? '20px' : '0'};
    `}
  top: ${(props) =>
    props.$isSidebarOpen ? `${dimensions.unitSpacing - 2}px` : '15px'};
  color: ${colors.colorCoreLightGray};
  a, button {
    color: ${colors.colorCoreLightGray};
    text-transform: none;
    cursor: pointer;
    margin-inline-start: ${dimensions.unitSpacing - 2}px;
    font-size: ${typography.fontSizeHeading8}px;
    font-weight: ${typography.fontWeightLight};
    outline: 0;
    padding: 0;
    border: none;
    background: none;
    transition: color 0.3s ease;

    > i {
      font-size: 16px;
      &:hover {
        color: ${colors.colorPrimary};
      }
    }
  }
  [id^="headlessui-menu-items-"] {
    a {
      padding: 7px;
      margin: 0;
      color: ${colors.colorCoreBlack};
    }
  }
`;

const SidebarCounter = styledTS<{ $nowrap?: boolean; $fullLength?: boolean }>(
  styled.div
)`
  font-size: ${typography.fontSizeHeading8}px;
  text-align: ${(props) => (props.$nowrap ? 'end' : 'start')};
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ${(props) => !props.$fullLength && 'ellipsis'};
  padding-inline-start: 5px;
  a {
    padding: 0 !important;
    color: ${colors.linkPrimary};
  }
  span {
    float: inline-end;
    margin-inline-start: 5px;
  }
  ${(props) =>
    props.$nowrap &&
    css`
      display: block;
      white-space: normal;
    `};
`;

const SidebarList = styledTS<{
  $capitalize?: boolean;
  $noTextColor?: boolean;
  $noBackground?: boolean;
}>(styled.ul)`
  margin: 0;
  padding: 15px;
  list-style: none;
  background: ${colors.colorWhite};
  border-radius: 12px;

  li {
    background: ${rgba(colors.colorPrimary, 0.3)};
    margin: 10px 0;
    border-radius: 5px;
    transition: background 0.3s ease;

    &:hover {
      background: ${rgba(colors.colorPrimary, 0.5)};
    }
  }

  li.child-segment {
    border-bottom: none;
    background-color: ${colors.colorWhite};
    > span {
      background-color: ${colors.bgActive};
      box-shadow: -2px 0 10px 2px ${rgba(colors.bgLight, 0.1)};
    }
  }

  &.no-link li,
  a {
    display: flex;
    padding: 6px 13px;
    color: ${colors.colorBlack};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    text-transform: ${(props) => (props.$capitalize ? 'capitalize' : 'normal')};
    outline: 0;
    border-inline-start: 2px solid transparent;
    transition: background 0.3s ease;

    > i {
      margin-inline-end: 5px;
    }

    &:hover,
    &.active {
      cursor: pointer;
      background: ${(props) => !props.$noBackground && rgba(colors.colorPrimary, 0.1)};
      text-decoration: none;
      outline: 0;
      color: ${(props) => !props.$noTextColor && lighten(colors.textPrimary, 40)};
    }

    &.active {
      background: ${colors.bgActive};
      border: 1px solid ${colors.colorPrimary};
      border-radius: 5px;
      color: ${colors.colorPrimary};
    }

    &.multiple-choice {
      flex-wrap: wrap;
      justify-content: space-between;
      white-space: normal;
      ${SidebarCounter} {
        max-width: 60%;
        word-break: break-word;
      }
    }
  }

  .icon {
    margin-inline-end: 6px;
    color: ${colors.colorCoreGray};
  }

  button {
    font-size: 11px;
    padding-bottom: 0;
  }
`;

const FieldStyle = styledTS<{ overflow?: string }>(styled.div)`
  white-space: nowrap;
  overflow: ${(props) => (props.overflow ? props.overflow : 'hidden')};
  text-overflow: ellipsis;
`;

const FieldStyleUpdated = styledTS<{ overflow?: string }>(styled.div)`
  white-space: nowrap;
  overflow: ${(props) => (props.overflow ? props.overflow : 'hidden')};
  text-overflow: ellipsis;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: end;
  width: 100%;
`;

const CenterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > a {
    border: 1px solid ${colors.colorWhite};
    color: ${colors.colorWhite};
  }
`;

const SectionContainer = styledTS<{ $hasShadow?: boolean }>(styled.div)`
  position: relative;
  margin-bottom: ${dimensions.unitSpacing}px;
  box-shadow: ${(props) =>
    props.$hasShadow && "rgb(0 0 0 / 8%) 0px 0px 6px 0px"};

  > div {
    margin-bottom: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  ${SidebarBox} {
    box-shadow: none;
  }
  ${SidebarTitle} {
    height: 40px;
    cursor: pointer;
    transition: all ease 0.3s;

    &:hover {
      color: ${colors.colorSecondary};
    }
  }
`;

const SidebarCollapse = styled.a`
  color: ${colors.colorCoreGray};
  position: absolute;
  top: ${dimensions.unitSpacing - 2}px;
  font-size: 14px;
  ${(props) => css`inset-inline-end: ${dimensions.coreSpacing - 3}px;`}
  transition: color 0.3s ease;

  &:hover {
    cursor: pointer;
    color: ${colors.colorPrimary};
  }

  &:focus {
    outline: 0;
  }
`;

const BarItems = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  [id^='headlessui-listbox-options-'] {
    min-width: 200px;
  }
  > * + * {
    margin-block-start: 5px;
    margin-inline-end: 0;
    margin-block-end: 5px;
    margin-inline-start: ${dimensions.unitSpacing}px;
  }
  .Select {
    min-width: 200px;
  }
  input[type='text'] {
    width: auto;
    display: inline-block;
  }
  @media (max-width: 768px) {
    > * + * {
      margin-block-start: 3px;
      margin-inline-end: 0;
      margin-block-end: 3px;
      margin-inline-start: ${dimensions.unitSpacing / 2}px;
    }
  }
`;

const SidebarFlexRow = styled.li`
  white-space: inherit !important;
  display: flex !important;
  justify-content: space-between;
  span {
    color: ${colors.colorCoreGray};
    overflow: hidden;
    max-height: 140px;
    padding-inline-start: ${dimensions.coreSpacing}px;
    text-align: end;
  }
`;

const FlexItem = styledTS<{ count?: number; $hasSpace?: boolean }>(styled.div)`
  flex: ${(props) => (props.count ? props.count : 1)};
  position: relative;
  ${(props) =>
    props.$hasSpace &&
    css`
      margin-inline-start: ${dimensions.coreSpacing}px;
    `};
`;

const FlexRightItem = styled.div`
  margin-inline-start: auto;
`;

const SectionBodyItem = styled.div`
  border-bottom: 1px solid ${colors.borderPrimary};
  word-break: break-word;
  > a {
    padding: 10px 20px;
    display: flex;
    width: 100%;
    color: ${colors.textSecondary};
    transition: color 0.3s ease;

    &:hover {
      text-decoration: underline;
      color: ${colors.colorPrimary};
    }
  }
  > span {
    display: block;
    padding: 0px 20px 10px 20px;
    margin-top: -10px;
  }
  ul li {
    margin-inline-start: ${dimensions.coreSpacing}px;
  }
`;

const AuthBox = styled.div`
  position: relative;
  margin: auto;
  display: flex;
  flex: 1;
  min-height: 100vh;
  box-shadow:
    0px 24px 32px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  padding: 20px 0;
  border-radius: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const AuthItem = styledTS<{ order?: number; isMobile?: boolean }>(styled.div)`
  position: relative;
  width: 50%;
  border-radius: 32px;
  display: flex;
  align-items: center;
  margin-inline-start: ${(props) => (props.order === 1 ? '100px' : '0px')};
  z-index: ${(props) => (props.order === 1 ? '999' : '99')};

  @media (max-width: 768px) {
    width: 100%;
    order: ${(props) => (props.order ? props.order : 0)};
    display: ${(props) => (props.isMobile == false ? 'none' : 'block')};
    margin-inline-start: 0px;
    padding: 15px;
  }
`;

const AuthContent = styled.div`
  width: 90%;
  height: 90%;
  position: relative;
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
  border-radius: 32px;
  margin-inline-start: auto;
  margin-inline-end: -30px;
  box-shadow:
    0px 24px 32px rgba(0, 0, 0, 0.04),
    0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 4px 8px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  background: ${colors.colorWhite};

  @media (max-width: 768px) {
    width: 100%;
    margin-inline-end: 0px;
  }
`;

const AuthCustomDescription = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.colorPrimaryDark} url('/images/stars.png') repeat top center;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent url('/images/twinkling.png') repeat top center;
    animation: ${twinkling} 200s linear infinite;
  }

  @media (max-width: 768px) {
    padding: 40px;
    overflow: hidden;
    padding-bottom: ${dimensions.coreSpacing * 5}px;
  }

  img {
    position: absolute;
    width: 100px;
    top: 100px;
  }

  h1 {
    position: relative;
    font-weight: bold;
    font-size: 48px;
    color: ${colors.colorWhite};
    margin: 0px;

    @media (max-width: 768px) {
      font-size: 38px;
    }
  }

  h2 {
    position: relative;
    font-size: 18px;
    color: ${colors.colorWhite};
    line-height: 1.5em;
    font-weight: 900;
    margin: 1.75em 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  p {
    position: relative;
    color: ${colors.colorWhite};
    margin-bottom: 50px;
    font-size: 18px;
    line-height: 1.8em;
  }
`;

const AuthDescription = styledTS<{
  backgroundColor?: string;
  textColor?: string;
}>(styled.div)`
  width: 100%;
  height: 100%;
  background: #1f97ff;
  border-radius: ${(props) => (props.updatedDesign ? '32px' : '0px')};
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 70px;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    animation: ${twinkling} 200s linear infinite;
  }

  @media (max-width: 768px) {
    padding: 40px;
    overflow: hidden;
    padding-bottom: ${dimensions.coreSpacing * 5}px;
  }

  img {
    position: relative;
    width: 100px;
    margin-bottom: 5%;
  }

  h1 {
    position: relative;
    font-weight: bold;
    font-size: 48px;
    color: ${(props) => props.textColor || colors.colorWhite};
    margin: 0px;

    @media (max-width: 768px) {
      font-size: 38px;
    }
  }

  h2 {
    position: relative;
    font-size: 28px;
    font-weight: 400;
    line-height: 1.5em;
    color: ${thColor || colors.colorWhite};

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  p {
    position: relative;
    color: ${thColor || colors.colorWhite};
    margin-bottom: 50px;
    font-size: 20px;
    line-height: 1.8em;
  }

  .octobot-login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .octobot-login-container img {
    margin-bottom: 2%;
    width: 200px;
  }
  .octobot-login-container h3 {
    line-height: 1px;
    color: ${thColor || colors.colorWhite};
  }
  .octobot-login-container h2 {
    line-height: 1px;
    color: #f1b500;
  }
  .octobot-login-container .end-section-para {
    color: #f1b500;
    position: absolute;
    bottom: 0;
  }
`;

const MobileRecommend = styled.div`
  position: fixed;
  inset-inline-start: 0;
  inset-inline-end: 0;
  bottom: 0;
  font-size: 12px;
  background: linear-gradient(
    to right,
    ${colors.colorSecondary},
    ${colors.colorCoreTeal}
  );
  color: ${colors.colorWhite};
  transition: all ease 0.3s;
  padding: 15px ${dimensions.coreSpacing}px;
  box-shadow: 0 -5px ${dimensions.unitSpacing}px 0 ${rgba(colors.colorBlack, 0.2)};
`;

const NotFoundWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .not-found {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-weight: bold;
    }

    p {
      margin-bottom: ${dimensions.coreSpacing}px;
    }

    i {
      margin-inline-end: 5px;
    }

    img {
      width: 250px;
    }
  }
`;

const CustomBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  margin-bottom: 10px;
  background: ${colors.colorWhite};
  box-shadow: 0 4px 12px ${rgba(colors.shadowPrimary, 0.1)};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px ${rgba(colors.shadowPrimary, 0.2)};
  }
`;

const CustomBoxTable = styled.div`
  width: 100%;
  height: 100%;
  background: #f2f2f291;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const CustomBoxRow = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-bottom: 1px solid #e1e1e1;
`;

const CustomBoxTitle = styled.span`
  font-family: Inter;
  font-size: 12px;
  font-weight: 500;
  line-height: 14.52px;
  text-align: start;
  color: #303030;
`;

const CustomBoxTitleInner = styled.span`
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.52px;
  text-align: start;
  color: #959595;
`;

const AuthWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const LeftPanel = styled.div`
  background: linear-gradient(135deg, ${colors.colorPrimary} 0%, ${colors.colorPrimaryDark} 100%);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: -50%;
    left: -50%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
    animation: rotate 30s linear infinite;
  }

  h1 {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    margin-bottom: 24px;
    line-height: 1.2;
    position: relative;
    z-index: 1;
  }

  h2 {
    font-size: clamp(18px, 3vw, 24px);
    line-height: 1.5;
    opacity: 0.9;
    font-weight: 400;
    position: relative;
    z-index: 1;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const RightPanel = styled.div`
  padding: clamp(20px, 5vw, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const MobileHeader = styled.div`
  display: none;
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 1024px) {
    display: block;
  }

  img {
    width: clamp(120px, 30vw, 140px);
    margin-bottom: 24px;
  }

  h2 {
    color: ${colors.colorPrimary};
    font-size: clamp(24px, 5vw, 28px);
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    color: ${colors.colorSecondary};
    font-size: clamp(14px, 4vw, 16px);
    line-height: 1.5;
  }
`;

export {
  AuthBox,
  AuthContent,
  AuthCustomDescription,
  AuthDescription,
  AuthItem,
  AuthWrapper,
  BarItems,
  BoxContent,
  CenterContent,
  ContenFooter,
  ContentBox,
  ContentHeader,
  Contents,
  FieldStyle,
  FieldStyleUpdated,
  FlexContent,
  FlexFieldsContent,
  FlexItem,
  FlexRightItem,
  HeaderContent,
  HeaderItems,
  HeightedWrapper,
  HelperButtons,
  MainContent,
  MainHead,
  MobileRecommend,
  NotFoundWrapper,
  PageHeader,
  SectionBodyItem,
  SectionContainer,
  SideContent,
  SidebarBox,
  SidebarCollapse,
  SidebarCounter,
  SidebarFlexRow,
  SidebarFooter,
  SidebarHeader,
  SidebarList,
  SidebarMainContent,
  SidebarMainHead,
  SidebarTitle,
  SidebarToggle,
  VerticalContent,
  WhiteBox,
  WhiteBoxRoot,
  CustomBox,
  CustomBoxRow,
  CustomBoxTitle,
  CustomBoxTitleInner,
  CustomBoxTable,
  LeftPanel,
  RightPanel,
  ContentWrapper,
  MobileHeader
};