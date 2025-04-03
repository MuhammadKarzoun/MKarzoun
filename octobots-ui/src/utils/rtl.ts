import { css } from 'styled-components';

type Direction = "ltr" | "rtl";

export const getDirection = (): Direction => {
  let direction;
  (document.dir != undefined) ? direction = document.dir : direction = document.getElementsByTagName("html")[0].getAttribute("dir");
  return direction;
}

export const rtl = (ltrValue: string, rtlValue: string) => (props) =>
  props.theme.direction === 'rtl' ? rtlValue : ltrValue;

export const rtlMixin = (styles) => css`
  [dir="rtl"] & {
    ${styles}
  }
`;
