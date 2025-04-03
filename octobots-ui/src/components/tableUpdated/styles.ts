import styled, { css } from 'styled-components';
import { colors } from '../../styles';

// Modern styled components for the table
export const TableContainer = styled.div<{ $responsive?: boolean }>`
  overflow: ${props => props.$responsive ? 'auto' : 'visible'};
  max-width: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(31, 151, 255, 0.1);
  background: white;
  overflow: hidden;
`;

export const TableWrapper = styled.div`
  position: relative;
  min-width: ${props => props.minWidth ? props.minWidth : '100%'};
`;

export const StyledTable = styled.table<{
  $striped?: boolean;
  $bordered?: boolean;
  $condensed?: boolean;
  $hover?: boolean;
  $whiteSpace?: string;
  $alignTop?: boolean;
  $wideHeader?: boolean;
}>`
  width: 100%;
  border-collapse: collapse;
  empty-cells: show;
  
  thead {
    tr {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      padding: 1rem 1.5rem;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-bottom: 1px solid rgba(31, 151, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    th {
      padding: 0;
      text-align: right;
      color: #64748b;
      font-size: 0.875rem;
      font-weight: 500;
      position: sticky;
      top: 0;
      z-index: 1;
    }
  }

  tbody {
    tr {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      padding: 1rem 1.5rem;
      align-items: center;
      border-bottom: 1px solid rgba(31, 151, 255, 0.1);

      &:last-child {
        border-bottom: none;
      }

      ${props => props.$hover && `
        &:hover {
          background: rgba(31, 151, 255, 0.02);
        }
      `}

      ${props => props.$striped && `
        &:nth-of-type(odd) {
          background: rgba(31, 151, 255, 0.02);
        }
      `}
    }

    td {
      padding: 0;
    }
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1F97FF 0%, #1a85e3 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const UserName = styled.div`
  font-weight: 500;
  color: #1a202c;
`;

export const UserEmail = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

export const RoleBadge = styled.span<{ $role: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => 
    props.$role === 'admin' ? 'rgba(31, 151, 255, 0.1)' :
    props.$role === 'owner' ? 'rgba(46, 162, 76, 0.1)' :
    'rgba(100, 116, 139, 0.1)'
  };
  color: ${props => 
    props.$role === 'admin' ? '#1F97FF' :
    props.$role === 'owner' ? '#2ca24c' :
    '#64748b'
  };
`;

export const StatusIndicator = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => props.$status === 'active' ? '#2ca24c' : '#f97316'};
`;

export const StatusDot = styled.span<{ $status: string }>`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${props => props.$status === 'active' ? '#2ca24c' : '#f97316'};
`;

export const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(31, 151, 255, 0.1);
    color: #1F97FF;
  }
`;
