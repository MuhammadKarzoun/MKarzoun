import { TabCaption, TabContainer, UpdatedTabCaption, UpdatedTabContainer } from "./styles";

import React from "react";

function Tabs(props: {
  children: React.ReactNode;
  grayBorder?: boolean;
  full?: boolean;
}) {
  return (
    <TabContainer $grayBorder={props.grayBorder} $full={props.full}>
      {props.children}
    </TabContainer>
  );
}

type TabTitleProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

function UpdatedTabs(props: {
  children: React.ReactNode;
  grayBorder?: boolean;
  full?: boolean;
}) {
  return (
    <UpdatedTabContainer $grayBorder={props.grayBorder} $full={props.full}>
      {props.children}
    </UpdatedTabContainer>
  );
}

function TabTitle(props: TabTitleProps) {
  return <TabCaption {...props} />;
}
function UpdatedTabTitle(props: TabTitleProps) {
  return <UpdatedTabCaption {...props} />;
}

export { Tabs, TabTitle, UpdatedTabTitle, UpdatedTabs };
