import {
  FieldStyle,
  SidebarCounter,
  SidebarList
} from "@octobots/ui/src/layout/styles";
import { List, SkillList } from "./styles";
import { isEnabled, loadDynamicComponent } from "@octobots/ui/src/utils/core";

import Button from "@octobots/ui/src/components/Button";
import { EmptyState } from "@octobots/ui/src/components";
import { IUser } from "@octobots/ui/src/auth/types";
import Icon from "@octobots/ui/src/components/Icon";
import { Link } from "react-router-dom";
import ModalTrigger from "@octobots/ui/src/components/ModalTrigger";
import React from "react";
import Sidebar from "@octobots/ui/src/layout/components/Sidebar";
import { __ } from "@octobots/ui/src/utils";
import dayjs from "dayjs";
import CustomFieldsSection from "@octobots/ui-forms/src/forms/containers/CustomFieldsSection";
import styled from "styled-components";
import { colors } from "../../../styles";
type Props = {
  user: IUser;
  channels: any[]; //check - IChannel
  skills: any[]; //check - ISkillDocument
  excludeUserSkill: (skillId: string, userId: string) => void;
  renderSkillForm: ({
    closeModal,
    user
  }: {
    closeModal: () => void;
    user: IUser;
  }) => React.ReactNode;
};

const HeaderTitleWrapper = styled.div`
 background-color: ${colors.colorPrimary};
 width:100%;
 border-start-end-radius: 6px;
 border-start-start-radius: 6px;
 & h3 {
  margin: 0px auto !important;
  width:100%;
  color: ${colors.colorWhite} !important;
  text-align: center !important;
  border-bottom:none !important;
  justify-content:center !important;
  height: 30px !important;
 }
  & button:has(.absolute-btn-setting) {
    inset-inline-end: 0px !important;
    top:2px !important;
   }
`;


const { Section } = Sidebar;
const { Title } = Section;

function LeftSidebar({
  user,
  skills = [],
  channels,
  excludeUserSkill,
  renderSkillForm
}: Props) {
  const { details = {}, positions = [] } = user;

  const renderRow = (title: string, value: any, nowrap?: boolean) => {
    return (
      <li>
        <FieldStyle>{__(title)}:</FieldStyle>
        <SidebarCounter $nowrap={nowrap}>{value || "-"}</SidebarCounter>
      </li>
    );
  };

  const renderArrayRow = (title: string, value: any[], nowrap?: boolean) => {
    return (
      <li>
        <FieldStyle>{__(title)}:</FieldStyle>
        <SidebarCounter $nowrap={nowrap}>
          {value.length > 0
            ? value.map((v) => (
                <>
                  {v.title}
                  <br />
                </>
              ))
            : "-"}
        </SidebarCounter>
      </li>
    );
  };

  function renderUserInfo() {
    return (
      <Section>
        <SidebarList className="no-link">
          {renderRow("Primary Email", user.email)}
          {renderRow(
            "Operator Phone number",
            details ? details.operatorPhone : "-"
          )}
          {renderRow("User name", user.username)}
          {renderRow("Short name", details ? details.shortName : "-")}
          {renderRow("Location", details ? details.location : "-")}
          {renderRow(
            "Birthdate",
            details && details.birthDate
              ? dayjs(details.birthDate).format("YYYY-MM-DD")
              : "-"
          )}
          {renderRow("Position", details ? details.position : "-")}
          {renderArrayRow("Positions", positions, true)}
          {renderRow("Score", user.score)}
          {renderRow(
            "Joined date",
            details && details.workStartedDate
              ? dayjs(details.workStartedDate).format("YYYY-MM-DD")
              : "-"
          )}
          {renderRow("Description", details ? details.description : "-", true)}
        </SidebarList>
      </Section>
    );
  }

  function renderChannels() {
    return (
      <Section>
           <HeaderTitleWrapper>

        <Title>{__("Channels")}</Title>
           </HeaderTitleWrapper>
        <List>
          {channels.map(channel => {
            return (
              <li key={channel._id}>
                <Link to={`/settings/channels?id=${channel._id}`}>
                  <FieldStyle>{channel.name || ""}</FieldStyle>
                  <SidebarCounter>{channel.description || ""}</SidebarCounter>
                </Link>
              </li>
            );
          })}
        </List>
      </Section>
    );
  }

  function renderSkills() {
    const getContent = props => {
      return renderSkillForm(props);
    };

    return (
      <Section>
          <HeaderTitleWrapper>

        <Title>{__("Skills")}</Title>
        <Section.QuickButtons>
          <ModalTrigger
            title="Edit"
            trigger={<Button btnStyle="primary" size="small" icon="cog" iconLeftAlignment block className="absolute-btn-setting" />}
            content={getContent}
          />
        </Section.QuickButtons>
          </HeaderTitleWrapper>
        <SkillList>
          {skills.length > 0 ? (
            skills.map(skill => {
              const handleRemove = () => excludeUserSkill(skill._id, user._id);

              return (
                <Button
                  key={skill._id}
                  btnStyle="simple"
                  size="small"
                  onClick={handleRemove}
                >
                  {skill.name}&nbsp;
                  <Icon icon="times-circle" color="#EA475D" />
                </Button>
              );
            })
          ) : (
            <EmptyState icon="ban" text="No skills" size="small" />
          )}
        </SkillList>
      </Section>
    );
  }

  function renderForms() {
    // const content = () =>
    //   loadDynamicComponent("contactDetailLeftSidebar", {
    //     user: user,
    //     isDetail: true,
    //   });

    // const extraButton = (
    //   <ModalTrigger
    //     title="Properties"
    //     trigger={
    //       <Icon icon="expand-arrows-alt" style={{ cursor: "pointer" }} />
    //     }
    //     size="xl"
    //     content={content}
    //   />
    // );

    return <CustomFieldsSection user={user} isDetail={true} />;
  }

  return (
    <Sidebar wide={true}>
      {/* {renderUserInfo()} */}
      {isEnabled("inbox") && renderChannels()}
      {isEnabled("inbox") && renderSkills()}
      {renderForms()}
    </Sidebar>
  );
}

export default LeftSidebar;
