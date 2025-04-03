import { colors, dimensions } from '../../styles';

import { rgba } from '@octobots/ui/src/styles/ecolor';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';

const StepContainer = styledTS<{ direction?: string }>(styled.div)`
  display: flex;
  flex: 1;
  flex-direction: ${(props) => (props.direction ? 'column' : 'row')};
  align-items: ${(props) => props.direction === 'horizontal' && 'center'};
  position: relative;
  height: 100%;
  overflow: auto;
  box-shadow: ${(props) =>
    !props.direction && `0 0 4px ${colors.colorShadowGray}`};
  margin: ${(props) =>
    props.direction === 'vertical' && `0 ${dimensions.coreSpacing}px`};

  > *:nth-child(n + 2) {
    margin-inline-start	: ${(props) => !props.direction && '5px'};
  }
`;

const StepWrapper = styled.div`
  margin: ${dimensions.unitSpacing}px;
  height: 100%;
  height: calc(100% - ${dimensions.unitSpacing * 2}px);
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

const StepItem = styledTS<{
  $show: boolean;
  $active?: boolean;
  direction?: string;
}>(styled.div)`
  transition: all .3s ease;
  width: ${(props) => (props.$show ? '100%' : '60px')};
  width: ${(props) => props.direction === 'vertical' && '100%'};
  box-shadow: ${(props) =>
    !props.direction && `0 0 4px ${colors.colorShadowGray}`};
  position: relative;
  z-index: 2;

  &:before {
    position: absolute;
    border-inline-end: ${(props) =>
    props.direction === 'vertical' && `2px solid ${colors.bgActive}`};
    width: ${(props) => props.direction === 'horizontal' && '100%'};
    height: ${(props) => props.direction === 'vertical' && '100%'};
    top: 30px;
    inset-inline-start: -50%;
    z-index: 2;
  }
  &:after {
    position: absolute;
    content: "";
    border-bottom: ${(props) =>
    props.direction === 'horizontal' &&
    `2px solid ${props.$active === true ? colors.colorPrimary : colors.bgActive
    }`};
    border-inline-end: ${(props) =>
    props.direction === 'vertical' &&
    `2px solid ${props.$active === true ? colors.colorCoreGreen : colors.bgActive
    }`};
    
    height: ${(props) => props.direction === 'vertical' && '100%'};
    top: ${(props) => (props.direction === 'horizontal' ? '-30px' : '30px')};
    inset-inline-start: ${(props) => (props.direction === 'horizontal' ? '-50%' : '11px')};
    z-index: 2;
  }
  &:first-child::before {
    content: none;
  }
  &:last-child::after {
    content: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${dimensions.unitSpacing / 2}px;
  padding: ${dimensions.unitSpacing}px ${dimensions.coreSpacing}px;
  background: ${colors.bgLight};
  box-shadow: 0 0 4px ${colors.colorShadowGray};
  justify-content: space-between;
  > *:nth-child(n + 2) {
    margin-inline-start	: ${dimensions.unitSpacing}px;
  }
`;

const ControlWrapper = styled(TitleContainer)`
  margin-bottom: 0;
  margin-top: ${dimensions.unitSpacing / 2}px;
`;

const Indicator = styled.div`
  color: ${colors.colorCoreGray};
  font-size: 15px;
  font-style: italic;
  max-width: 70%;
  strong {
    color: ${colors.textPrimary};
  }
`;

const FullStep = styledTS<{ $show: boolean; direction?: string }>(styled.div)`
  justify-content: ${(props) => props.direction && 'flex-start'};
  background: ${(props) =>
    props.direction === 'horizontal' ? 'transparent' : colors.colorWhite};
  height: 100%;
  width: ${(props) => !props.direction && '100%'};
  transition: all 0.3s ease;
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  flex: ${(props) => props.direction && '1'};
`;

const StepHeaderContainer = styled.div`
  width: 100%;
  min-height: 55px;
  padding: 0 ${dimensions.coreSpacing}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: colors.bgLight;
  border-bottom: 1px solid ${colors.borderPrimary};
`;

const StepHeaderHorizontalContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0 ${dimensions.coreSpacing}px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom:1rem;
  background: ${colors.updatedBgColor};
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StepImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const StepHeaderTitle = styledTS<{ $active?: boolean }>(styled.h5)`
  margin: 0 0 0 ${dimensions.unitSpacing}px;
  color: ${(props) =>
    props.$active === true ? colors.newPrimaryColor : colors.colorCoreBlack};
`;

const StepContent = styledTS<{ direction?: string; fullWidth?: boolean }>(
  styled.div
)`
  width: ${(props) =>
    props.direction === 'vertical' ? 'calc(100% - 35px)' : '100%'};
  height: 100%;
  // height: ${(props) => props.direction === 'vertical' ? 'calc(100% - 35px)' : 'calc(100% - 55px)'};
  margin-inline-start	: ${(props) => props.direction && 'auto'};
 overflow: ${(props) => props.fullWidth && 'hidden'};
 max-width: ${(props) =>
    props.direction === 'vertical' ? 'calc(100% - 35px)' : '90%'};
     background-color: ${(props) =>
    props.direction === 'vertical' ? 'transparent' : '#ffffff'};
  margin: ${(props) =>
    props.direction === 'vertical' ? 'unset' : 'auto'};
     border-radius: ${(props) =>
    props.direction === 'vertical' ? '0px' : '12px'}; 
`;

const ShortStep = styledTS<{
  $show: boolean;
  $active?: boolean;
  direction?: string;
}>(styled.div)`
  position: relative;
  width: ${(props) =>
    props.direction === 'vertical'
      ? '100%'
      : props.direction === 'horizontal'
        ? '200px'
        : '60px'};
  height: 100%;
  background: ${(props) => !props.direction && colors.bgLight};
  border: ${(props) => !props.direction && `1px solid ${colors.bgLight}`};
  cursor: pointer;
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  align-items: center;
  padding: ${dimensions.unitSpacing}px 0;
  flex-direction: ${(props) =>
    props.direction === 'vertical' ? 'row' : 'column'};
  transition: all 0.3s ease;
  
  img {
    filter:${(props) =>
      props.direction === 'horizontal' && props.$active === true ? 'grayscale(0)': 'grayscale(100%)'};
    opacity: ${(props) =>
      props.direction === 'horizontal' && props.$active === true ? '1': '0.7'};
    transition: all 0.3s ease;
  }
  &:hover {
    border-color: ${colors.colorCoreTeal};
    img {
      filter: grayscale(0);
      opacity: 1;
    }
  }

  &:before {
    position: absolute;
    border-bottom: ${(props) =>
    props.direction === 'horizontal' && `2px solid ${colors.bgActive}`};
    width: ${(props) => props.direction === 'horizontal' && '100%'};
    top: 55px;
    inset-inline-start: -50%;
    z-index: 2;
  }

  &:after {
    position: absolute;
    content: "";
    border-bottom: ${(props) =>
    props.direction === 'horizontal' &&
    `2px solid ${props.$active === true ? colors.newPrimaryColor : colors.bgActive
    }`};
    width: ${(props) => props.direction === 'horizontal' && '100%'};
    top: ${(props) => props.direction === 'horizontal' && '32px'};
    inset-inline-start: ${(props) => props.direction === 'horizontal' && '50%'};
    z-index: 2;
  }

  &.completed {
    background-color: ${colors.colorPrimary};
    &:after {
      position: absolute;
      content: "";
      border-bottom: ${(props) =>
    props.direction === 'horizontal' && `2px solid ${colors.colorPrimary}`};
      width: ${(props) => props.direction === 'horizontal' && '100%'};
      top: 20px;
      inset-inline-start: 50%;
      z-index: 3;
    }
  }

  &:first-child::before {
    content: none;
  }

  &:last-child::after {
    content: none;
  }
`;

const StepCount = styledTS<{ $active?: boolean; direction?: string }>(
  styled.div
)`
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.direction === 'horizontal' ? '45px' : '25px')};
  height: ${(props) => (props.direction === 'horizontal' ? '45px' : '25px')};
  padding:08px;
  border-radius: 50%;
  color: ${(props) =>
    props.$active === true ? colors.colorWhite : colors.colorCoreBlack};
  background-color: ${(props) =>
    props.$active === true
      ? `${props.direction === 'horizontal'
        ? colors.colorWhite
        : colors.colorCoreGreen
      }`
      : colors.bgActive};
  border:  ${(props) =>
    props.$active === true ? `1px solid ${colors.colorPrimary}` : 'none'};
  margin-bottom: 10px;
  img{
  width:100%;
  height:100%;
  }
`;

const InlineForm = styled.div`
  display: flex;
  flex-direction: row;
  > *:not(:first-child) {
    margin-inline-start	: ${dimensions.unitSpacing}px;
  }
`;

const FlexItem = styledTS<{
  count?: string;
  overflow?: string;
  v?: string;
  h?: string;
  direction?: string;
  $slimmer?: boolean;
  $thinner?: boolean;
  vh?: number;
}>(styled.div)`
  display: flex;
  height: 100%;
   
  flex: ${(props) => (props.count ? props.count : 1)};
  ${(props) => {
    if (props.vh) {
      return `
        max-height: ${props.vh}vh;
      `;
    }
    return null;
  }};
   ${(props) => {
    if (props.overflow) {
      return `
        overflow: ${props.overflow};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.v) {
      return `
        align-items: ${props.v};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.h) {
      return `
        justify-content: ${props.h};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.direction) {
      return `
        flex-direction: ${props.direction};
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.$slimmer) {
      return `
        width: 50%;
        margin: 0 auto;
      `;
    }
    return null;
  }};
  ${(props) => {
    if (props.$thinner) {
      return `
        width: 60%;
        margin: 0 auto;
      `;
    }
    return null;
  }};
  &:last-of-type {
    border: none;
  }
`;

const FlexPad = styled(FlexItem)`
  flex: 1;
  border-inline-end: ${colors.borderPrimary};
  padding: ${dimensions.coreSpacing}px;
`;

const LeftItem = styledTS<{ $deactive?: boolean }>(styled.div)`
  overflow: auto;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-width: 43.33333%;
  padding: ${dimensions.coreSpacing + 5}px;
  opacity: ${(props) => props.$deactive && '0.3'};
  cursor: ${(props) => props.$deactive && 'not-allowed'};
  input:disabled {
    cursor: not-allowed;
  }
`;

const Preview = styledTS<{ $fullHeight?: boolean }>(styled.div)`
  flex: 1;
  border-inline-start: 1px solid ${colors.borderPrimary};
  background: url('/images/previews/preview.png');
  background-repeat: repeat;
  background-position: center 20px;
  background-size: cover;
  height: ${(props) => props.$fullHeight && '100%'};
  overflow: hidden;
`;

const StyledButton = styledTS<{ next?: boolean }>(styled.button)`
  border: 1px solid ${colors.colorPrimary};
  border-radius: 8px;
  height:40px;
  width: 110px;
  padding: 10px 40px;
  font-weight: 500;
  margin-inline-end: 10px;
  color: ${(props) =>
    props.next === true ? colors.colorWhite : colors.colorPrimary};
  background: ${(props) =>
    props.next === true ? colors.colorPrimary : colors.colorWhite};
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${dimensions.coreSpacing}px;
`;

const StepButton = styledTS<{ $next?: boolean }>(styled.button)`
  border-radius: 8px;
  height: 36px;
  width: 110px;
  font-weight: 500;
  margin-inline-end: 10px;
  border: 1px solid ${colors.colorPrimary};
  color: ${(props) =>
    props.$next === true ? colors.colorWhite : colors.colorPrimary};
  background: ${(props) =>
    props.$next === true ? colors.colorPrimary : colors.colorWhite};

  &:hover {
    cursor: pointer;
  }
`;

const WidgetPreviewStyled = styled.div`
  background: ${colors.colorWhite};
  color: ${colors.colorWhite};
  border-radius: ${dimensions.unitSpacing}px;
  border-end-end-radius: 25px;
  bottom: 80px;
  box-shadow: 0 2px 16px 1px ${rgba(colors.colorBlack, 0.2)};
  display: flex;
  flex-direction: column;
  height: calc(100% - 95px);
  max-height: 660px;
  overflow: hidden;
  position: absolute;
  inset-inline-end: 8px;
  // width: 380px;
  z-index: 1;
   @media (max-width: 1300px) {
      width:auto;
    }
`;

const LogoContainer = styled.div`
  color: ${colors.colorWhite};
  line-height: 56px;
  text-align: center;
  border-radius: 28px;
  width: 56px;
  height: 56px;
  cursor: pointer;
  box-shadow: 0 0 ${dimensions.unitSpacing}px 0 ${rgba(colors.colorBlack, 0.2)};
  background-image: url('/images/octobots.png');
  background-color: ${colors.colorPrimary};
  background-position: center;
  background-size: 20px;
  background-repeat: no-repeat;
  margin-top: ${dimensions.unitSpacing}px;
  position: relative;
  float: inline-end;
  display: table;

  span {
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${colors.colorCoreRed};
    display: block;
    inset-inline-end: -2px;
    top: -5px;
    color: ${colors.colorWhite};
    border-radius: ${dimensions.unitSpacing}px;
    text-align: center;
    line-height: 20px;
    font-size: ${dimensions.unitSpacing}px;
  }

  input[type='file'] {
    display: none;
  }

  label {
    display: block;
    margin: 0;
    visibility: hidden;
    border-radius: 50%;
  }

  &:hover label {
    visibility: visible;
    cursor: pointer;
  }
`;

const LauncherContainer = styled(LogoContainer)`
  position: absolute;
  inset-inline-end: ${dimensions.unitSpacing}px;
  bottom: ${dimensions.unitSpacing}px;
`;

const WidgetPreview = styled(WidgetPreviewStyled)`
  height: auto;
  bottom: 90px;
  inset-inline-end: 20px;
  max-height: calc(100% - 95px);
  max-width: calc(100% - 40px);
`;

const WebPreview = styledTS<{ isEngage?: boolean }>(styled.div)`
  min-height: 100%;
  position: relative;
  background: linear-gradient(
    140deg,
    rgba(0, 0, 0, 0) 70%,
    rgba(0, 0, 0, 0.08) 95%,
    rgba(0, 0, 0, 0.1) 100%
  );
  width: ${(props) => props.isEngage && '100%'};

  .engage-message {
    > div:first-of-type {
      flex-shrink: 0;
      padding: 20px 20px 10px 20px;
    }
  }
`;

export {
  ButtonContainer,
  ControlWrapper,
  FlexItem,
  FlexPad,
  FullStep,
  Indicator,
  InlineForm,
  LauncherContainer,
  LeftItem,
  Preview,
  ShortStep,
  StepButton,
  StepContainer,
  StepContent,
  StepCount,
  StepHeader,
  StepHeaderContainer,
  StepHeaderHorizontalContainer,
  StepHeaderTitle,
  StepImg,
  StepItem,
  StepWrapper,
  StyledButton,
  TitleContainer,
  WebPreview,
  WidgetPreview
};
