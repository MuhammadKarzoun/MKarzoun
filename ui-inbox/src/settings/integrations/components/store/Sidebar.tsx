import { __ } from '@octobots/ui/src/utils/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { INTEGRATION_FILTERS } from '@octobots/ui/src/constants/integrations';
import LeftSidebar from '@octobots/ui/src/layout/components/Sidebar';
import { SidebarList as List } from '@octobots/ui/src/layout/styles';
import { SidebarList } from '@octobots/ui-settings/src/styles';

type Props = {
  currentType: string;
};

class SideBar extends React.Component<Props> {
  renderCategory(item) {
    const className =
      (this.props.currentType || 'All integrations') === item ? 'active' : '';

    return (
      <li key={item}>
        <Link to={`?type=${item}`} className={className}>
          {item}
        </Link>
      </li>
    );
  }

  render() {
    return (
      <LeftSidebar hasBorder={true} noMargin>
        <List id="SettingsSidebar">
          {INTEGRATION_FILTERS.map((data, index) => (
            <SidebarList key={index}>
              <LeftSidebar.Header uppercase={true} noSpacing noBackground>
                {__(data.name)}
              </LeftSidebar.Header>
              {data.items.map(item => this.renderCategory(__(item)))}
            </SidebarList>
          ))}
        </List>
      </LeftSidebar>
    );
  }
}

export default SideBar;
