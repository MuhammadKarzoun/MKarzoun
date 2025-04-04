import { IButtonMutateProps } from '@octobots/ui/src/types';

import ButtonMutate from '@octobots/ui/src/components/ButtonMutate';
import { INTEGRATION_KINDS } from '@octobots/ui/src/constants/integrations';
import React from 'react';
import TelnyxForm from '../../components/telnyx/TelnyxForm';
import { getRefetchQueries } from '../utils';
import { mutations } from '../../graphql';

type Props = {
  type?: string;
  closeModal: () => void;
};

type FinalProps = {} & Props;

class TelnyxContainer extends React.Component<FinalProps> {
  renderButton = ({
    name,
    values,
    isSubmitted,
    callback,
  }: IButtonMutateProps) => {
    return (
      <ButtonMutate
        mutation={mutations.integrationsCreateExternalIntegration}
        variables={values}
        callback={callback}
        isSubmitted={isSubmitted}
        type="submit"
        successMessage={`You successfully added a ${name}`}
        refetchQueries={getRefetchQueries(INTEGRATION_KINDS.TELNYX)}
      />
    );
  };

  render() {
    const { closeModal } = this.props;
    const updatedProps = {
      closeModal,
      renderButton: this.renderButton,
    };

    return <TelnyxForm {...updatedProps} />;
  }
}

export default TelnyxContainer;
