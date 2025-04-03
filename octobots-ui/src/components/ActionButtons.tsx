import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

export const ActionButton = styled.div`
  display: inline-flex;
  margin-inline-end: 30px;
  align-items: center;
  * {
    padding: 0;
    margin-inline-start: 8px;
    margin-inline-end: 0;

    &:first-child {
      margin-inline-start: 0;
      padding: 0;
    }
  }

  i {
    font-size: 16px;
  }

  i:hover {
    color: ${colors.colorCoreRed};
  }

  a {
    color: ${colors.colorCoreGray};
  }
`;

function ActionButtons({ children }: { children: React.ReactNode }) {
  return <ActionButton>{children}</ActionButton>;
}

ActionButtons.ActionButton = ActionButton;

export default ActionButtons;
