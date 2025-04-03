import { colors, dimensions, typography } from '../../styles';

import styled from 'styled-components';
import styledTS from 'styled-components-ts';

const TabContainer = styledTS<{ $grayBorder?: boolean; $full?: boolean }>(
  styled.div
)`
  border-bottom: 1px solid
    ${(props) => (props.$grayBorder ? colors.borderDarker : colors.borderPrimary)};
  margin-bottom: -1px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: ${(props) => props.$full? 'space-evenly' : 'center'};
  flex-shrink: 0;
  height: ${dimensions.headerSpacing}px;
`;

const UpdatedTabContainer = styledTS<{
  $grayBorder?: boolean;
  $full?: boolean;
}>(styled.div)`
  border: 1px solid
    ${(props) => (props.$grayBorder ? colors.borderDarker : colors.borderPrimary)};
  margin-bottom: -1px;
  border-radius: 6px;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: ${(props) => props.$full && 'space-evenly'};
  flex-shrink: 0;
  height: ${dimensions.headerSpacing}px;
  width: 80%;
  margin: 20px auto;
`;

const TabCaption = styled.span`
  cursor: pointer;
  display: flex;
  color: ${colors.textSecondary};
  font-weight: ${typography.fontWeightRegular};
  padding: 10px ${dimensions.coreSpacing}px;
  margin: 10px;
  position: relative;
  transition: all ease 0.3s;
  line-height: 18px;
  text-align: center;
  align-items: center;
  border-radius: 6px;
  background: #e6e6e6e6;

  &:hover {
    color: ${colors.textPrimary};
  }

  i {
    margin-inline-end: 3px;
  }

  &.active {
    color: ${colors.textPrimary};
    font-weight: 500;
    background: #f1b500;

    
  }
`;

const UpdatedTabCaption = styled.span`
  cursor: pointer;
  display: flex;
  color: ${colors.textSecondary};
  font-weight: ${typography.fontWeightRegular};
  padding: 15px ${dimensions.coreSpacing}px;
  position: relative;
  transition: all ease 0.3s;
  line-height: 18px;
  text-align: center;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: center;
  &:hover {
    color: ${colors.textPrimary};
  }

  i {
    margin-inline-end: 3px;
  }

  &.active {
    background-color: ${colors.yellowishCore};
    color: ${colors.colorBlack};
    font-weight: 500;
  }
`;

export { TabCaption, TabContainer, UpdatedTabCaption, UpdatedTabContainer };
