import { IButtonMutateProps } from '@octobots/ui/src/types';
import React, { useState } from 'react';
import ChannelForm from '../components/ChannelForm';
import { assignementConfig, IChannel } from "../types";
import { ISkillDocument } from '../../skills/types';

type Props = {
  channel?: IChannel;
  skills: ISkillDocument[];
  closeModal: () => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  loading?: boolean;
};

const ChannelFormContainer = (props: Props) => {
  const { channel, renderButton, skills } = props;

  let selectedMembers: string[] = [];
  let selectedSkills: string[] = [];
  let assignementConfig: assignementConfig = {};

  if (channel) {
    selectedMembers = channel.members.map(member => member._id);
    selectedSkills = channel.skillIds.map(skill => skill);
    assignementConfig = channel.assignementConfig;
  }

  const updatedProps = {
    ...props,
    channel,
    skills,
    selectedMembers,
    selectedSkills,
    assignementConfig,
    renderButton
  };

  return <ChannelForm {...updatedProps} />;
};

export default ChannelFormContainer;
