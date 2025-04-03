import {
  ContentBox,
  OctobotsContent,
  LeftSide,
  RightSide,
  Website,
} from "./styles";

import Button from "@octobots/ui/src/components/Button";
import { IMessengerApps } from "@octobots/ui-inbox/src/settings/integrations/types";
import Icon from "@octobots/ui/src/components/Icon";
import React from "react";
import { __ } from "@octobots/ui/src/utils/core";
import dayjs from "dayjs";

type Props = {
  activeStep?: string;
  color?: string;
  messengerApps?: IMessengerApps;
  responseRate?: string;
};

function renderWebsiteApps(websites, color) {
  if (!websites || websites.length === 0) {
    return null;
  }

  return websites.map((website, index) => (
    <ContentBox key={index}>
      <Website color={color}>
        <p>{website.description}</p>
        <Button>{website.buttonText}</Button>
      </Website>
    </ContentBox>
  ));
}

function GreetingContent(props: Props) {
  const { knowledgebases, websites } =
    props.messengerApps || ({} as IMessengerApps);

  const { responseRate } = props;

  const isTabbed =
    (knowledgebases || []).length !== 0 &&
    (knowledgebases || [])[0].topicId &&
    props.activeStep === "addon"
      ? true
      : false;
  return (
    <OctobotsContent $isTabbed={isTabbed}>
      <ContentBox>
        <h4>{__("Recent conversations")}</h4>
        <ul>
          <li>
            <LeftSide>
              <span>
                <Icon icon="plus" />
              </span>
            </LeftSide>
            <RightSide>
              <span>{__("Start new conversation")}</span>
              <p>Our usual response time</p>
              <p> {responseRate || "A few minutes"}</p>
            </RightSide>
          </li>
          <li>
            <LeftSide>
              <img src="/images/avatar-colored.jpeg" alt="avatar" />
            </LeftSide>
            <RightSide>
              <div>{dayjs(new Date()).format("LT")}</div>
              <span>{__("User")}</span>
              <p>{__("We need your help!")}</p>
            </RightSide>
          </li>
        </ul>
      </ContentBox>
      {props.activeStep === "addon" && renderWebsiteApps(websites, props.color)}
    </OctobotsContent>
  );
}

export default GreetingContent;
