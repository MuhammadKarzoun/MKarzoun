import {
  AccountBox,
  AccountItem,
  AccountTitle,
  Content,
  ImageWrapper,
  MessengerPreview,
  TextWrapper
} from '../../styles';
import {
  ControlWrapper,
  FlexItem,
  Indicator,
  LeftItem,
  Preview,
  StepWrapper
} from '@octobots/ui/src/components/step/styles';
import { IButtonMutateProps, IFormProps } from '@octobots/ui/src/types';
import { Step, Steps } from '@octobots/ui/src/components/step';

import Accounts from '../../containers/Accounts';
import Button from '@octobots/ui/src/components/Button';
import ControlLabel from '@octobots/ui/src/components/form/Label';
import EmptyState from '@octobots/ui/src/components/EmptyState';
import Form from '@octobots/ui/src/components/form/Form';
import FormControl from '@octobots/ui/src/components/form/Control';
import FormGroup from '@octobots/ui/src/components/form/Group';
import { INTEGRATION_KINDS } from '@octobots/ui/src/constants/integrations';
import { IPages } from '../../types';
import { Link } from 'react-router-dom';
import React from 'react';
import SelectBrand from '../../containers/SelectBrand';
import SelectChannels from '../../containers/SelectChannels';
import Spinner from '@octobots/ui/src/components/Spinner';
import Wrapper from '@octobots/ui/src/layout/components/Wrapper';
import { __ } from 'coreui/utils';

type Props = {
  kind: string;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  onAccountSelect: (accountId?: string) => void;
  pages: IPages[];
  accountId?: string;
  onRemoveAccount: (accountId: string) => void;
  callBack: () => void;
  loadingPages?: boolean;
};

type State = {
  selectedPage: string;
  channelIds: string[];
};

class Facebook extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedPage: '',
      channelIds: []
    };
  }

  onSelectPages = (pageId: string) => {
    this.setState({ selectedPage: pageId });
  };

  generateDoc = (values: {
    messengerName: string;
    brandId: string;
    accountId: string;
  }) => {
    const { accountId, kind } = this.props;

    return {
      name: values.messengerName,
      brandId: values.brandId,
      kind,
      accountId: accountId ? accountId : values.accountId,
      channelIds: this.state.channelIds,
      data: {
        pageId: this.state.selectedPage
      }
    };
  };

  renderPages() {
    const { pages, loadingPages } = this.props;

    if (loadingPages) {
      return <Spinner objective={true} />;
    }

    if (pages.length === 0) {
      return <EmptyState icon="folder-2" text={__('There is no pages')} />;
    }

    return (
      <FlexItem>
        <LeftItem>
          <AccountBox>
            <AccountTitle>{__('Facebook Pages')}</AccountTitle>
            {pages.map(page => (
              <AccountItem key={page.id}>
                {page.name}

                <Button
                  disabled={page.isUsed}
                  btnStyle={
                    this.state.selectedPage == page.id
                      ? 'primary'
                      : 'simple'
                  }
                  onClick={this.onSelectPages.bind(this, page.id)}
                >
                  {this.state.selectedPage == page.id
                    ? __('Selected')
                    : __('Select')}
                </Button>
              </AccountItem>
            ))}
          </AccountBox>
        </LeftItem>
      </FlexItem>
    );
  }

  onChange = <T extends keyof State>(key: T, value: State[T]) => {
    this.setState({ [key]: value } as unknown as State);
  };

  channelOnChange = (values: string[]) => this.onChange('channelIds', values);

  renderContent = (formProps: IFormProps) => {
    const { renderButton } = this.props;
    const { values, isSubmitted } = formProps;
    const { onRemoveAccount, onAccountSelect } = this.props;

    return (
      <>
        <Steps active={1} direction='horizontal'>
          <Step img="/images/icons/octobots-01.svg" title="Connect Account">
            <FlexItem>
              <LeftItem>
                <Accounts
                  kind="facebook"
                  addLink="login"
                  onSelect={onAccountSelect}
                  onRemove={onRemoveAccount}
                />
              </LeftItem>
            </FlexItem>
          </Step>

          <Step img="/images/icons/octobots-04.svg" title="Connect Your Pages">
            {this.renderPages()}
          </Step>

          <Step
            img="/images/icons/octobots-16.svg"
            title="Integration Setup"
            noButton={true}
          >
            <FlexItem>
              <LeftItem>
                <FormGroup>
                  <ControlLabel required={true}>Integration Name</ControlLabel>
                  <p>
                    {__('Name this integration to differentiate from the rest')}
                  </p>
                  <FormControl
                    {...formProps}
                    name="messengerName"
                    required={true}
                  />
                </FormGroup>

                <SelectBrand
                  isRequired={true}
                  description={__(
                    'Which specific Brand does this integration belong to?'
                  )}
                  formProps={formProps}
                />

                <SelectChannels
                  defaultValue={this.state.channelIds}
                  isRequired={true}
                  onChange={this.channelOnChange}
                />
              </LeftItem>
            </FlexItem>
          </Step>
        </Steps>
        <ControlWrapper>
          <Indicator>
            {__('You are creating')}
            <strong> {this.props.kind}</strong> {__('integration')}
          </Indicator>
          <Button.Group>
            <Link to="/settings/integrations">
              <Button btnStyle="simple" icon="times-circle">
                الغاء
              </Button>
            </Link>
            {renderButton({
              name: 'integration',
              values: this.generateDoc(values),
              isSubmitted,
              callback: this.props.callBack
            })}
          </Button.Group>
        </ControlWrapper>
      </>
    );
  };

  renderForm = () => {
    return <Form renderContent={this.renderContent} />;
  };

  render() {
    let title = __('Facebook Posts');
    let description = __(
      'Connect your Facebook Posts to start receiving Facebook post and comments in your team inbox'
    );

    if (this.props.kind === INTEGRATION_KINDS.FACEBOOK_MESSENGER) {
      title = __('Facebook Messenger');
      description = __(
        'Connect your Facebook Messenger to start receiving Facebook messages in your team inbox'
      );
    }

    const breadcrumb = [
      { title: __('Settings'), link: '/settings' },
      { title: __('integrations'), link: '/settings/integrations' },
      { title }
    ];

    return (
      <StepWrapper>
        <Wrapper.Header title={title} breadcrumb={breadcrumb} />
        <Content>
          {this.renderForm()}

          <MessengerPreview>
            <Preview fullHeight={true}>
              <ImageWrapper>
                <TextWrapper>
                  <h1>
                    {__('Connect your')} {title}
                  </h1>
                  <p>{description}</p>
                  <img alt={title} src="/images/previews/facebook.png" />
                </TextWrapper>
              </ImageWrapper>
            </Preview>
          </MessengerPreview>
        </Content>
      </StepWrapper>
    );
  }
}

export default Facebook;