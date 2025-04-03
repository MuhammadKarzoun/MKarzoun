import FormControl from '@octobots/ui/src/components/form/Control';
import FormGroup from '@octobots/ui/src/components/form/Group';
import ControlLabel from '@octobots/ui/src/components/form/Label';
import { IFormProps } from '@octobots/ui/src/types';
import React from 'react';

type Props = {
  formProps: IFormProps;
};

function ImapForm({ formProps }: Props) {
  function renderField({
    label,
    type,
    name
  }: {
    label: string;
    type: string;
    name: string;
  }) {
    return (
      <FormGroup>
        <ControlLabel required={true}>{label}</ControlLabel>
        <FormControl {...formProps} type={type} name={name} required={true} />
      </FormGroup>
    );
  }

  return (
    <>
      {renderField({
        label: 'Email',
        type: 'email',
        name: 'email'
      })}
      {renderField({
        label: 'Password',
        type: 'password',
        name: 'password'
      })}
      {renderField({
        label: 'IMAP Host',
        type: 'text',
        name: 'imapHost'
      })}
      {renderField({
        label: 'IMAP PORT',
        type: 'number',
        name: 'imapPort'
      })}
      {renderField({
        label: 'SMTP Host',
        type: 'text',
        name: 'smtpHost'
      })}
      {renderField({
        label: 'SMTP PORT',
        type: 'number',
        name: 'smtpPort'
      })}
    </>
  );
}

export default ImapForm;
