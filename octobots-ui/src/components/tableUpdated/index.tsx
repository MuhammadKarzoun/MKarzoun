import React from 'react';
import { 
  StyledTable, 
  TableWrapper, 
  TableContainer,
  UserInfo,
  Avatar,
  UserDetails,
  UserName,
  UserEmail,
  RoleBadge,
  StatusIndicator,
  StatusDot,
  ActionButton
} from './styles';
import { MoreVertical } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  $striped?: boolean;
  $bordered?: boolean;
  $condensed?: boolean;
  $hover?: boolean;
  $responsive?: boolean;
  $whiteSpace?: string;
  $alignTop?: boolean;
  $wideHeader?: boolean;
};

class Table extends React.Component<Props> {
  static defaultProps = {
    required: false,
    $striped: false,
    $bordered: false,
    $condensed: false,
    $hover: false,
    $responsive: false,
    $alignTop: false,
  };

  render() {
    const { $responsive, ...tableProps } = this.props;
    
    return (
      <TableContainer $responsive={$responsive}>
        <TableWrapper>
          <StyledTable {...tableProps} />
        </TableWrapper>
      </TableContainer>
    );
  }
}

export default Table;
