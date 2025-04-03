import styled, { css } from 'styled-components';
import { darken, lighten } from '../styles/ecolor';
//import { useLocation } from 'react-router-dom';
import React from 'react';
import styledTS from 'styled-components-ts';
import { colors } from '../styles';
import { __ } from '../utils/core';
import Icon from './Icon';

// For Welcome Page
// const location = useLocation();
// const isWelcomePage = location.pathname.includes('/welcome'); 

const types = {
  default: {
    background: colors.colorPrimary
  },
  primary: {
    background: colors.colorPrimary,
    border: darken(colors.colorPrimary, 20)
  },
  secondary: {
    background: colors.colorSecondary,
    border: darken(colors.colorSecondary, 20)
  },
  success: {
    background: colors.colorCoreGreen
  },
  danger: {
    background: colors.colorCoreRed
  },
  warning: {
    background: colors.colorCoreYellow,
    border: darken(colors.colorCoreYellow, 25),
    color: colors.colorBlack
  },
  simple: {
    background: '#E6E6E6',
    color: colors.colorCoreGray,
    border: colors.colorCoreGray
  },
  link: {
    background: 'transparent',
    color: colors.colorCoreGray
  },
  white: {
    background: 'white',
    color: colors.colorPrimary
  },
  blue: {
    background: '#E6E6E6',
    color: colors.colorPrimary,
    border: colors.colorCoreGray
  },
  plain: {
    color: colors.colorBlack,
    background: 'transparent'
  },
  topic: {
    color: colors.colorPrimary,
    background: 'transparent'
  }
};

const sizes = {
  large: {
    padding: '10px 30px',
    fontSize: '13px'
  },
  medium: {
    padding: '7px 20px',
    fontSize: '12px'
  },
  small: {
    padding: '5px 15px',
    fontSize: '10px'
  }
};

// replace 'block' by 'inline-flex' to fix the button issue; @K.H
// remove background-color: ${types[props.$btnStyle].background} from .icon-section-btn ; @K.H

const ButtonStyled = styledTS<{
  hugeness: string;
  $btnStyle: string;
  $block?: boolean;
  $uppercase?: boolean;
  $leftIcon?: boolean;
  $withOutIcon?: string;
}>(styled.button)`
  border-radius: 8px;
  position: relative;
  transition: all 0.3s ease;
  outline: 0; 
  
  ${(props) => css`
    padding: ${props.$leftIcon || !props.$withOutIcon
      ? sizes[props.hugeness].padding
      : '0px'};
    background: ${types[props.$btnStyle].background};
    font-size: ${props.$uppercase
      ? sizes[props.hugeness].fontSize
      : `calc(${sizes[props.hugeness].fontSize} + 1px)`};
    text-transform: ${props.$uppercase ? 'uppercase' : 'none'};
    color: ${types[props.$btnStyle].color
      ? types[props.$btnStyle].color
      : colors.colorWhite} !important;
    border: none;
    display: ${props.$block ? 'inline-flex' : 'flex'};

    align-items: center;
    justify-content: space-between;
    width: ${props.$block && '100%'};
    font-weight: ${!props.$uppercase && '500'};

    & .icon-section-btn {
      padding: 10px 15px;
      filter: contrast(0.9);
      border-start-end-radius: 8px;
      border-end-end-radius: 8px;
    }
    & span {
      padding: ${props.$leftIcon || !props.$withOutIcon ? '0px' : '8px 20px'};
    }

    &:hover {
      cursor: pointer;
      text-decoration: none;
      color: ${types[props.$btnStyle].color &&
    darken(types[props.$btnStyle].color, 35)};
      background: ${props.$btnStyle !== 'link' &&
    `${darken(types[props.$btnStyle].background, 20)}`};
    }

    &:active,
    &:focus {
      box-shadow: ${types[props.$btnStyle].border
      ? `0 0 0 0.2rem ${lighten(types[props.$btnStyle].border, 65)}`
      : `0 0 0 0.2rem ${lighten(types[props.$btnStyle].background, 65)}`};
      box-shadow: ${props.$btnStyle === 'link' && 'none'};
    }

    &:disabled {
      cursor: not-allowed !important;
      opacity: 0.75;
    }
  `};


 

  a {
    color: ${colors.colorWhite};
  }

  & + button,
  + a,
  + span,
  + div {
    margin-inline-start: 10px;
  }

  > i + span,
  > span + i,
  > span i {
    margin-inline-start: 5px;
  }
`;

const ButtonLink = styledTS<{ $disabled?: boolean }>(
  styled(ButtonStyled).attrs({ as: 'a' })
)`
  text-decoration: inherit;
  text-align: center;

  ${(props) =>
    props.$disabled &&
    css`
      cursor: not-allowed !important;
      opacity: 0.75;

      &:focus {
        text-decoration: none;
      }
    `};
`;

const ButtonGroup = styledTS<{ $hasGap: boolean }>(styled.div)`
  position: relative;

  button + a,
  a + button {
    margin-inline-start: ${(props) => props.$hasGap && '10px'};
  }

  ${(props) =>
    !props.$hasGap &&
    css`
      button,
      a {
        margin: 0;
      }

      > button:not(:last-child),
      > a:not(:last-child) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
        border-inline-end: 1px solid rgba(0, 0, 0, 0.13);
      }

      > button:not(:first-child),
      > a:not(:first-child) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
      }
    `};
`;

const Img = styled.img`
  height: 16px;
  margin-inline-end: 5px;
`;

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  type?: string;
  btnStyle?: string;
  size?: string;
  disabled?: boolean;
  ignoreTrans?: boolean;
  block?: boolean;
  icon?: string;
  iconSize?: number;
  style?: any;
  id?: string;
  uppercase?: boolean;
  target?: string;
  img?: string;
  iconColor?: string;
  iconLeftAlignment?: boolean;
};

export default class Button extends React.Component<ButtonProps> {
  static Group = Group;

  static defaultProps = {
    btnStyle: 'default',
    size: 'medium',
    block: false,
    type: 'button',
    $uppercase: false,
    iconLeftAlignment: false
  };

  render() {
    const {
      size,
      iconColor,
      uppercase,
      btnStyle,
      block,
      disabled,
      iconSize,
      iconLeftAlignment,
      ...sizeExcluded
    } = this.props;
    const { href, children, ignoreTrans, icon, img } = sizeExcluded;
    const props = {
      ...sizeExcluded,
      hugeness: size,
      $uppercase: uppercase,
      $btnStyle: btnStyle,
      $block: block,
      disabled: disabled,
      $leftIcon: iconLeftAlignment,
      $withOutIcon: icon
    };

    // TODO: fix
    // remove any
    const Element: any = href ? ButtonLink : ButtonStyled;

    let content = children;

    if (!ignoreTrans && typeof content === 'string' && __) {
      content = __(content);
    }

    if (icon && icon !== 'none') {
      return (
        <Element {...props}>
          {!!iconLeftAlignment && (
            <Icon icon={icon} color={iconColor} size={iconSize} />
          )}
          {content && <span>{content}</span>}
          {!iconLeftAlignment && (
            <div className='icon-section-btn' style={{ borderRadius: window.location.href.includes('/welcome') ? '100%' : '8px', padding: window.location.href.includes('/welcome') ? '10px 15px' : '10px 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '35px', height: '35px' }}>
              <Icon icon={icon} color={iconColor} size={iconSize} />
            </div>
          )}
        </Element>
      );
    }

    if (img) {
      return (
        <Element {...props}>
          <Img src={img} alt='img' />
          {content && <span>{content}</span>}
        </Element>
      );
    }

    return <Element {...props}>{content}</Element>;
  }
}

function Group({
  children,
  hasGap = true
}: {
  children: React.ReactNode;
  hasGap?: boolean;
}) {
  return <ButtonGroup $hasGap={hasGap}>{children}</ButtonGroup>;
}
