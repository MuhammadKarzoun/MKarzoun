import {
  IIntegration,
  IntegrationMutationVariables
} from '@octobots/ui-inbox/src/settings/integrations/types';
import { Count } from '@octobots/ui/src/styles/main';
import { EMPTY_CONTENT_MESSENGER } from '@octobots/ui-settings/src/constants';
import EmptyContent from '@octobots/ui/src/components/empty/EmptyContent';
import EmptyState from '@octobots/ui/src/components/EmptyState';
import { INTEGRATION_KINDS } from '@octobots/ui/src/constants/integrations';
import IntegrationCard from './IntegrationCard';
import React from 'react';
import { __ } from '@octobots/ui/src/utils';

type Props = {
  integrations: IIntegration[];
  removeIntegration: (integration: IIntegration, callback?: any) => void;
  archive: (id: string, status: boolean) => void;
  repair: (id: string, kind: string) => void;
  kind?: string | null;
  editIntegration: (
    id: string,
    { name, brandId, channelIds, details }: IntegrationMutationVariables,
    callback: () => void
  ) => void;
  queryParams: any;
  disableAction?: boolean;
  integrationsCount: number;
};

type State = {
  showExternalInfo: boolean;
};

class IntegrationListCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { showExternalInfo: false };
  }

  renderRows() {
    const {
      integrations,
      removeIntegration,
      archive,
      editIntegration,
      queryParams: { _id },
      disableAction,
      repair
    } = this.props;


    const showExternalInfoColumn = () => {
      this.setState({ showExternalInfo: true });
    };

    return integrations.map(i => (
      <div className='col-3 p-2' key={i._id}>
        <IntegrationCard
          _id={_id}
          integration={i}
          removeIntegration={removeIntegration}
          archive={archive}
          repair={repair}
          disableAction={disableAction}
          editIntegration={editIntegration}
        // showExternalInfoColumn={showExternalInfoColumn}
        // showExternalInfo={this.state.showExternalInfo}
        />
      </div>
    ));
  }

  render() {
    const { integrations, kind, integrationsCount } = this.props;

    if (!integrations || integrations.length < 1) {
      if (kind === INTEGRATION_KINDS.MESSENGER) {
        return <EmptyContent content={EMPTY_CONTENT_MESSENGER} />;
      }

      return (
        <EmptyState
          text="Start adding integrations now!"
          image="/images/actions/2.svg"
        />
      );
    }

    return (
      <div className="row" style={{ width: '100%' }}>
        {this.renderRows()}
      </div>
    );
  }
}

export default IntegrationListCard;
