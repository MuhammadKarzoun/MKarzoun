import { FullContent, MiddleContent } from '../../styles/main';
import {
  Contents,
  HeightedWrapper,
  MainHead,
  VerticalContent
} from '../styles';

import React from 'react';
import ActionBar from './ActionBar';
import Header from './Header';
import PageContent from './PageContent';
import Sidebar from './Sidebar';

type Props = {
  header?: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  actionBar?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  transparent?: boolean;
  center?: boolean;
  shrink?: boolean;
  mainHead?: React.ReactNode;
  initialOverflow?: boolean;
  hasBorder?: boolean;
};

class Wrapper extends React.Component<Props> {
  static Header = Header;
  static Sidebar = Sidebar;
  static ActionBar = ActionBar;

  renderContent() {
    const {
      actionBar,
      content,
      footer,
      transparent = true,
      center,
      shrink,
      initialOverflow
    } = this.props;

    if (center) {
      return (
        <FullContent $center={true} $align={true}>
          <MiddleContent $shrink={shrink} $transparent={transparent}>
            <PageContent
              actionBar={actionBar}
              footer={footer}
              transparent={transparent || true}
              center={center}
              initialOverflow={initialOverflow}
            >
              {content}
            </PageContent>
          </MiddleContent>
        </FullContent>
      );
    }

    return (
      <PageContent
        actionBar={actionBar}
        footer={footer}
        transparent={transparent || false}
        initialOverflow={initialOverflow}
      >
        {content}
      </PageContent>
    );
  }

  render() {
    const { header, leftSidebar, rightSidebar, mainHead, hasBorder = false } =
      this.props;
    // Check if the pathname is '/settings'
    const isSettingsPage = window.location.pathname === '/settings';
    return (
      <VerticalContent>
        {header}
        <MainHead>{mainHead}</MainHead>
        <HeightedWrapper
          style={{
            width: '100%',
            margin: '0 auto',
            maxWidth: isSettingsPage || leftSidebar ? '98%' : '93%'
          }}
        >
          <Contents $hasBorder={hasBorder}>
            {leftSidebar}
            {this.renderContent()}
            {rightSidebar}
          </Contents>
        </HeightedWrapper>
      </VerticalContent>
    );
  }
}

export default Wrapper;
