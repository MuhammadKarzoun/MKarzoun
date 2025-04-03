import { IUser } from '@octobots/ui/src/auth/types';
import Button from '@octobots/ui/src/components/Button';
import FormControl from '@octobots/ui/src/components/form/Control';
import FormGroup from '@octobots/ui/src/components/form/Group';
import ControlLabel from '@octobots/ui/src/components/form/Label';
import { FlexCenter, ModalFooter } from '@octobots/ui/src/styles/main';
import { __ } from '@octobots/ui/src/utils';
import React from 'react';

type Props = {
  object: IUser;
  save: ({
    _id,
    newPassword,
    repeatPassword
  }: {
    _id: string;
    newPassword: string;
    repeatPassword: string;
  }) => void;
  closeModal: () => void;
};

class UserResetPasswordForm extends React.Component<Props> {
  generateDoc = () => {
    return {
      _id: this.props.object._id,
      newPassword: (document.getElementById('new-password') as HTMLInputElement)
        .value,
      repeatPassword: (document.getElementById(
        'repeat-password'
      ) as HTMLInputElement).value
    };
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.save(this.generateDoc());
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel>New Password</ControlLabel>

          <FormControl
            type="password"
            placeholder={__('Enter new password')}
            id="new-password"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Repeat Password</ControlLabel>

          <FormControl
            type="password"
            placeholder={__('Repeat password')}
            id="repeat-password"
          />
        </FormGroup>

        <ModalFooter>
        <FlexCenter>


          <Button
            btnStyle="simple"
            onClick={this.props.closeModal}
            icon="times-circle"
          >
            Close
          </Button>

          <Button btnStyle="warning" type="submit" icon="check-circle">
            Save
          </Button>
        </FlexCenter>
        </ModalFooter>
      </form>
    );
  }
}

export default UserResetPasswordForm;
