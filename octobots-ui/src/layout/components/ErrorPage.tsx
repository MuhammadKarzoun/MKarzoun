import { __ } from '../../utils';
import { NotFoundWrapper } from '../styles';
import Button from '@octobots/ui/src/components/Button';
import Icon from '@octobots/ui/src/components/Icon';
import React from 'react';

type Props = {
  message?: string;
};

function ErrorPage(props: Props) {
  const { message = "Sorry, an issue occurred while loading this page." } = props;

  return (
    <NotFoundWrapper>
      <div className="auth-content">
        <div className="container">
          <div className="auth-description not-found">
            <img src="/images/warning.svg" alt="octobots" />
            <h1>{__('Error')}</h1>
            <p>
              {__(message)}
            </p>
            <Button href="/">
              <Icon icon="arrow-left" /> {__('Back to home')}
            </Button>
          </div>
        </div>
      </div>
    </NotFoundWrapper>
  );
}

export default ErrorPage;
