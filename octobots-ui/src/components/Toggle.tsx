import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import styled from 'styled-components';
import { colors } from '../styles';

const Wrapper = styled.div`
  line-height: 10px;
  .react-toggle--checked .react-toggle-track {
    width: 48px;
    background-color: ${colors.newPrimaryColor};
  }

  .react-toggle-track:hover {
    background-color: ${colors.newPrimaryColor};
  }

  .react-toggle-track {
    width: 48px;
    // border: 3px solid ${colors.toggleBgColor};
    background-color: ${colors.toggleBgColor};
  }

  .react-toggle-track span {
    display: none;
  }

  .react-toggle-thumb {
    background: ${colors.colorWhite};
    border-color: ${colors.colorWhite};
    //border: none;
    height: 13px;
    width: 13px;
    margin: 4px;
  }

  .react-toggle--checked .react-toggle-thumb {
    background: ${colors.colorWhite};
    border-color: ${colors.colorWhite};
    height: 16px;
    width: 16px;
    margin: 3px 15px 0 0;
  }

  .react-toggle--checked:hover:not(.react-toggle--disabled)
    .react-toggle-track {
    border-color: ${colors.newPrimaryColor};
    background-color: ${colors.newPrimaryColor};
  }

  .react-toggle:hover:not(.react-toggle--disabled) .react-toggle-track {
    background-color: ${colors.colorCoreLightGray};
    border-color: ${colors.colorCoreLightGray};
  }
`;

type Props = {
  value?: string;
  name?: string;
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  'aria-labelledby'?: string;
  'aria-label'?: string;
  onFocus?: (e: React.FormEvent) => void;
  onBlur?: (e: React.FormEvent) => void;
  disabled?: boolean;
  onChange?: (e: React.FormEvent) => void;
  icons?: any;
};

export default (props: Props) => (
  <Wrapper>
    <Toggle {...props} />
  </Wrapper>
);
