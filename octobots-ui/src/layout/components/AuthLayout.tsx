import {
  AuthBox,
  AuthContent,
  AuthCustomDescription,
  AuthDescription,
  AuthItem,
  AuthWrapper,
  CenterContent,
  MobileRecommend,
} from "../styles";
import { __, bustIframe } from "../../utils";

import Button from "@octobots/ui/src/components/Button";
import React from "react";
import { getThemeItem } from "../../utils/core";

type Props = {
  content: React.ReactNode;
  description?: React.ReactNode;
  col?: { first: number; second: number };
};

class AuthLayout extends React.Component<Props, {}> {
  renderContent(desciption: string, link: string) {
    return (
      <MobileRecommend>
        <CenterContent>
          <div>
            <b>{__("Octobots Inc")}</b>
            <div>{__(desciption)}</div>
          </div>
          <Button btnStyle="link" size="small" href={link}>
            {__("Get")}
          </Button>
        </CenterContent>
      </MobileRecommend>
    );
  }

  renderRecommendMobileVersion() {
    const { userAgent } = navigator;

    if (userAgent.indexOf("Mobile") !== -1) {
      if (userAgent.match(/Android/i)) {
        // replace app link before go on production @MK #TODO
        return this.renderContent(
          "Download android app for free on the Google play",
          "https://play.google.com/store/apps/details?id=io.octobots.aioctobots_android&fbclid=IwAR1bVPBSE0pC_KUNNjOJQA4upb1AuTUfqFcDaHTHTptyke7rNvuvb2mgwb0"
        );
      }
    }

    return null;
  }

  renderDesciption() {
    const { description } = this.props;

    if (description) {
      return (
        <AuthCustomDescription>
          <img src="/images/logo.png" alt="octobots" />
          {description}
        </AuthCustomDescription>
      );
    }

    return (
      <AuthDescription updatedDesign={true}>
      <div className='octobot-login-container'>
        <img src='/images/Logo-octo.png' alt='octobots' width={300} />
        <h3>{getThemeItem('motto') || __('Welcome to Octobot')}</h3>
        <h2>Your journey starts here!</h2>
        <p>
          {getThemeItem('login_page_description') || (
            <>
              {__(
                "We're thrilled to have you on board. As we guide you through the onboarding process, we’re excited for you to explore our platform and see how it can transform your experience."
              )}
              {/* {__('Single ')}
            <b>{__('experience operating system (XOS)')}</b>
            {__(' to align your entire business')} */}
            </>
          )}
        </p>
        <p className='end-section-para'>
          Let's get started and make the most of your journey with us!
        </p>
      </div>
    </AuthDescription>
    );
  }

  componentDidMount() {
    // click-jack attack defense
    bustIframe();
  }

  render() {
    const { content } = this.props;

    return (
      <AuthWrapper>
        <div 
        // className="container"
        >
          <AuthBox>
            <AuthItem order={1}>
              <AuthContent>{content}</AuthContent>
            </AuthItem>
            <AuthItem order={0} isMobile={false}  >{this.renderDesciption()}</AuthItem>
          </AuthBox>
          {this.renderRecommendMobileVersion()}
        </div>
      </AuthWrapper>
    );
  }
}

export default AuthLayout;
