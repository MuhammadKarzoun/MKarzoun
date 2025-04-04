import {
  Description,
  Row,
} from "@octobots/ui-inbox/src/settings/integrations/styles";
import {
  ISkillDocument,
  ISkillTypesDocument,
} from "@octobots/ui-inbox/src/settings/skills/types";
import React, { useState } from "react";

import Button from "@octobots/ui/src/components/Button";
import ControlLabel from "@octobots/ui/src/components/form/Label";
import FormControl from "@octobots/ui/src/components/form/Control";
import FormGroup from "@octobots/ui/src/components/form/Group";
import { ISkillData } from "@octobots/ui-inbox/src/settings/integrations/types";
import Icon from "@octobots/ui/src/components/Icon";
import { Link } from "react-router-dom";
import Select from "react-select";
import Tip from "@octobots/ui/src/components/Tip";
import Toggle from "@octobots/ui/src/components/Toggle";
import { __ } from "coreui/utils";
import styled from "styled-components";

type Props = {
  skillData?: ISkillData;
  onChange: (name: any, value: any) => void;
  skillTypes: ISkillTypesDocument[];
  skills: ISkillDocument[];
  handleSkillTypeSelect: (typeId: string) => void;
  loading: boolean;
};

type SkillOption = {
  label: string;
  response: string;
  skillId: string;
};

const Item = styled.div`
  padding: 12px 16px 0 16px;
  margin-bottom: 12px;
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #eee;
  position: relative;
`;

const RemoveButton = styled.div`
  position: absolute;
  inset-inline-end: 16px;
  top: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity ease 0.3s;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

function BuildSkill({
  skillData = {} as ISkillData,
  skillTypes,
  skills,
  loading,
  onChange,
  handleSkillTypeSelect,
}: Props) {
  const hasType = ((skillData || {}).typeId || "").length > 0;

  const [show, setShow] = useState<boolean>(hasType);
  const [skillType, setSkillType] = useState<string | null>(skillData.typeId);

  const generateOptions = (
    options: Array<ISkillDocument | ISkillTypesDocument>
  ) => options.map((item) => ({ label: item.name, value: item._id }));

  const getOptions = () => {
    return {
      typeId: (skillData || {}).typeId || "",
      options: (skillData || {}).options || [],
    };
  };

  const handleToggle = (e) => {
    if (!e.target.checked) {
      onChange("skillData", {});
      setSkillType(null);
    }

    setShow(e.target.checked);
  };

  const handleSkillOptionChange = (
    index: number,
    type: string,
    value: string
  ) => {
    const { typeId, options } = getOptions();

    const currentSkillOptions = [...options];

    currentSkillOptions[index][type] = value;

    onChange("skillData", { typeId, options: currentSkillOptions });
  };

  const handleRemoveOption = (index: number) => {
    const { typeId, options } = getOptions();

    const filteredOptions = options.filter((_, idx) => index !== idx);

    onChange("skillData", { typeId, options: filteredOptions });
  };

  function renderSkillOptions() {
    const { options = [] } = skillData || {};

    if (options.length === 0) {
      return null;
    }

    return options.map((option, index) => {
      const handleLabelChange = (e) =>
        handleSkillOptionChange(index, "label", e.currentTarget.value);
      const handleResponseChange = (e) =>
        handleSkillOptionChange(index, "response", e.currentTarget.value);
      const handleSkillChange = (e) =>
        handleSkillOptionChange(index, "skillId", e.value);
      const handleRemove = (e) => handleRemoveOption(index);

      return (
        <Item key={index}>
          <FormGroup>
            <ControlLabel required={true}>Select a skill</ControlLabel>
            <Select
              placeholder="Choose a select"
              value={generateOptions(skills).find(
                (o) => o.value === option.skillId
              )}
              isLoading={loading}
              options={generateOptions(skills)}
              isClearable={true}
              onChange={handleSkillChange}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel required={true}>Write a label</ControlLabel>
            <Description>
              {__("Display this text for visitors as an option")}
            </Description>
            <FormControl value={option.label} onChange={handleLabelChange} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Message response</ControlLabel>
            <FormControl
              value={option.response}
              onChange={handleResponseChange}
            />
          </FormGroup>
          <Tip text={__("Remove")} placement="top">
            <RemoveButton onClick={handleRemove}>
              <Icon icon="times" />
            </RemoveButton>
          </Tip>
        </Item>
      );
    });
  }

  function renderAddSkill() {
    return (
      <Link to={"/settings/skills"} target="_blank">
        <Button btnStyle="primary" icon="plus-circle">
          Create skill
        </Button>
      </Link>
    );
  }

  function renderContent() {
    if (!show) {
      return null;
    }

    const handleSelectChange = (option) => {
      setSkillType(option.value);
      handleSkillTypeSelect(option.value);

      onChange("skillData", {
        typeId: option.value,
        options: skillData.options,
      });
    };

    const handleAdd = () => {
      const { typeId, options } = getOptions();

      const currentSkillOptions: SkillOption[] = [
        ...options,
        {
          label: "",
          response: "",
          skillId: "",
        },
      ];

      onChange("skillData", { typeId, options: currentSkillOptions });
    };

    return (
      <>
        <FormGroup>
          <ControlLabel>Choose a skill type</ControlLabel>
          <Row>
            <Select
              placeholder="Please select a skill type"
              value={generateOptions(skillTypes).find(
                (o) => o.value === skillType
              )}
              options={generateOptions(skillTypes)}
              isClearable={true}
              onChange={handleSelectChange}
            />
            {renderAddSkill()}
          </Row>
        </FormGroup>
        {skillType ? (
          <FormGroup>
            <Button btnStyle="simple" icon="plus-circle" onClick={handleAdd}>
              Add skill option
            </Button>
          </FormGroup>
        ) : null}
        {renderSkillOptions()}
      </>
    );
  }

  return (
    <>
      <FormGroup>
        <ControlLabel>Show skill in messenger</ControlLabel>
        <Description>
          {__("Direct conversations by skills to team members")}
        </Description>

        <Toggle
          checked={show}
          onChange={handleToggle}
          icons={{
            checked: <span>{__("Yes")}</span>,
            unchecked: <span>{__("No")}</span>,
          }}
        />
      </FormGroup>
      {renderContent()}
    </>
  );
}

export default BuildSkill;
