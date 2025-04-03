import React from 'react';
import BreadCrumb from '@octobots/ui/src/components/breadcrumb/BreadCrumb';
import Filter from '@octobots/ui/src/components/filter/Filter';
import Submenu from '@octobots/ui/src/components/subMenu/Submenu';
import { IBreadCrumbItem } from '@octobots/ui/src/types';
import { __, setTitle } from '@octobots/ui/src/utils/core';
import { PageHeader } from '../styles';

type Props = {
  breadcrumb?: IBreadCrumbItem[];
  submenu?: IBreadCrumbItem[];
  queryParams?: any;
  title: string;
  additionalMenuItem?: React.ReactNode;
  filterTitle?: string;
  extraFilterParams?: { param: string, bool: boolean, title?: string }[];
  extraFilterWithData?: { paramKey: string, type: string, fields?: string }[];
};

class Header extends React.Component<Props> {
  setTitle() {
    const { title } = this.props;

    setTitle(
      title,
      title === `${__('Team Inbox')}` && document.title.startsWith('(1)')
    );
  }

  componentDidUpdate() {
    this.setTitle();
  }

  componentDidMount() {
    this.setTitle();
  }

  render() {
    const {
      breadcrumb,
      submenu,
      queryParams,
      additionalMenuItem,
      filterTitle,
      extraFilterParams,
      extraFilterWithData
    } = this.props;

    return (
      <PageHeader>
        {breadcrumb && <BreadCrumb breadcrumbs={breadcrumb} />}
        {submenu && (
          <Submenu items={submenu} additionalMenuItem={additionalMenuItem} />
        )}
        {queryParams && (
          <Filter 
          queryParams={queryParams} 
          filterTitle={filterTitle} 
          extraFilterParams={extraFilterParams} 
          extraFilterWithData={extraFilterWithData}
           />
        )}
      </PageHeader>
    );
  }
}

export default Header;
