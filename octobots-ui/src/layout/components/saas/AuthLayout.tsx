import {
  AuthCustomDescription,
  AuthDescription,
  AuthWrapper,
  RightPanel,
  LeftPanel,
  ContentWrapper,
  MobileHeader
} from '../../styles';
import withCurrentOrganization from '@octobots/ui-settings/src/general/saas/containers/withCurrentOrganization';

import React from 'react';
import { __, bustIframe } from '../../../utils';


type Props = {
  content: React.ReactNode;
  description?: React.ReactNode;
  currentOrganization: any;
};

class AuthLayout extends React.Component<Props> {
  componentDidMount() {
    bustIframe();
  }
  renderDesciption() {
    const { description, currentOrganization } = this.props;
    const { backgroundColor, textColor } = currentOrganization;
    if (description) {
      return (
        <AuthCustomDescription>
          <img src="/images/logo.png" alt="octobots" />
          {description}
        </AuthCustomDescription>
      );
    }

    return (
      <AuthDescription backgroundColor={backgroundColor} textColor={textColor}>
        <h1>{__('Grow your business better and faster')}</h1>
        {currentOrganization.description ? (
          <h2>{currentOrganization.description}</h2>
        ) : (
          <h2>
            Single <b>experience operating system (XOS)</b> to align your entire
            business
          </h2>
        )}
      </AuthDescription>
    );
  }

  render() {
    const { content, currentOrganization } = this.props;
    const { logo } = currentOrganization;

    return (
      <AuthWrapper>
        <LeftPanel>
          {this.renderDesciption()}
        </LeftPanel>
        <RightPanel>
          <ContentWrapper>
            <MobileHeader>
              <img src={logo || '/images/logo-dark.png'} alt="logo" />
              <h2>{__('Welcome back!')}</h2>
              <p>{__('Please sign in to your account to continue')}</p>
            </MobileHeader>
            {content}
          </ContentWrapper>
        </RightPanel>
      </AuthWrapper>
    );
  }
}

export default withCurrentOrganization(AuthLayout);
