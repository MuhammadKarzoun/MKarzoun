import styled, { css } from 'styled-components';
import { colors, dimensions, typography } from '../../styles';
import { FormLabel, Input } from '../form/styles';

import styledTS from 'styled-components-ts';

const tableHoverColor = '#f5f5f5';

const StyledTable = styledTS<{
  $whiteSpace?: string;
  $alignTop?: boolean;
  $hover?: boolean;
  $bordered?: boolean;
  $striped?: boolean;
  $wideHeader?: boolean;
}>(styled.table)`
  ${(props) => css`
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    white-space: ${props.$whiteSpace || ''};
    background-color: ${colors.colorWhite};
    tr {
      margin: 0 20px;
    }

    th,
    td {
      border-top: 1px solid ${colors.borderPrimary};
      color: ${colors.textPrimary};
      padding: ${dimensions.unitSpacing - 2}px;
      display: table-cell;
      vertical-align: ${props.$alignTop && 'top'};

      & ${FormLabel}, & ${Input} {
        margin: 0px;
      }

      &:first-child {
        padding-inline-start: 0;
      }
    }

    thead {
      th,
      td {
        text-transform: uppercase;
        font-size: ${typography.fontSizeUppercase}px;
      }

      th {
        color: #959595;
        background-color: ${colors.colorWhite};
        margin-inline-start	: 20px;
        position: sticky;
        z-index: 1;
        top: 0;
        font-weight:400;
        text-align: start;
      }
    }

    ${props.$hover
      ? `tr:hover td { background-color: ${tableHoverColor}; }`
      : null} ${props.$bordered
      ? `th, td { border-bottom: 1px solid ${colors.borderPrimary}; }`
      : null} ${props.$striped
      ? `tr:nth-of-type(odd) td { background-color: ${colors.bgLightPurple}; }`
      : null} th {
      border-top: none;
    }

    th:first-child,
    td:first-child {
      border-inline-start: none;
    }

    th:last-child,
    td:last-child {
      border-inline-end: none;
      text-align: end;
    }

    td.with-input {
      text-align: center;
    }

    .with-input input {
      width: 40px;
      text-align: center;
      outline: 0;
      border: 1px solid ${colors.borderDarker};
      border-radius: 2px;
      font-size: 12px;
      height: 24px;
    }

    @media (min-width: 1170px) {
      th,
      td {
        padding: ${props.$wideHeader
            ? `${dimensions.unitSpacing + 2}px`
            : `${dimensions.unitSpacing - 2}px`}
          ${dimensions.coreSpacing - 2}px;
      }
    }
  `};
`;

const TableWrapper = styled.div`
  padding: 30px ${dimensions.coreSpacing}px;
`;

export { StyledTable, TableWrapper };
