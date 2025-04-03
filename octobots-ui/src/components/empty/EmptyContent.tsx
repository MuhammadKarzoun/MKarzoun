import React from 'react';
import { Link } from 'react-router-dom';
import { __ } from '../../utils/core';
import Button from '../Button';
import Icon from '../Icon';
import { ITEM_COLORS } from './constants';
import { Action, ActionWrap, Container, ItemContent, Items, ItemsCintainer, ItemsSteps } from './styles';
import { useLocation } from 'react-router-dom';

type Props = {
  content: any;
  vertical?: boolean;
  maxItemWidth?: string;
};

function EmptyContent({ content, vertical, maxItemWidth }: Props) {
  const { steps, title, description, url, urlText } = content;
  const location = useLocation();
  const isKnowledgePage = location.pathname.includes('/knowledgeBase');
  const isBroadcastPage = location.pathname.includes('/campaign');
  const isBookingPage = location.pathname.includes('/bookings');
  const isFormPage = location.pathname.includes('/forms');
  const isPipelinePage = location.pathname.includes('/deal/board');
  const isPurchasePage = location.pathname.includes('/purchase/board');
  const isScriptPage = location.pathname.includes('/settings/script');


  const renderButton = (
    buttonUrl: string,
    text: string,
    isOutside: boolean,
    target: string
  ) => {
    if (!buttonUrl) {
      return null;
    }

    const buttonText = __(text) || __('Learn More');

    if (isOutside) {
      return (
        <Button
          btnStyle='link'
          uppercase={false}
          href={buttonUrl}
          target={target}
        >
          {buttonText}
        </Button>
      );
    }

    return (
      <Button uppercase={false} btnStyle='link' style={{ textDecoration: "none" }}>
        <Link style={{ backgroundColor: '#f1b500', textDecoration: 'none', color: '#000', padding: '5px 20px', borderRadius: '6px', fontWeight: '600' }} to={buttonUrl}>{buttonText}</Link>
      </Button>
    );
  };

  return (
    <Container style={{ padding: '50px', minHeight: 'auto' }}>
      <h2>{title}</h2>
      <p>
        {description} {url && <Link to={url}>{urlText}</Link>}
      </p>
      <ItemsSteps vertical={vertical}>
        {steps.map((step, index) => (
          <ItemsCintainer
            key={step.title + index}
            style={{ width: "50%", padding: '10px' }}
          >
            <ItemContent
              style={{ maxHeight: isKnowledgePage && '250px', height: '100%', background: '#fff', margin: '0' }}
              color={ITEM_COLORS[index]}
              vertical={vertical}
              max={maxItemWidth}
            >
              <div className='icon-box-section' style={{ display: isKnowledgePage || isBookingPage ? 'none' : 'block' }}>
                {step.icon ? (
                  <img src={step.icon} style={{ width: 'fit-content' }} />
                ) : (
                  <img
                    style={{ width: 'fit-content' }}
                    src={index % 2 === 0 ? '/images/contact-type-icon.svg' : '/images/sales-icon.svg'}
                    alt={step.title}
                  />
                )}
              </div>
              <h4>{__(step.title)}</h4>
              {step.html ? (
                <p style={{ textAlign: isKnowledgePage || isBroadcastPage ? 'left' : 'inherit', color: isKnowledgePage ? '#888' : 'inherit' }} dangerouslySetInnerHTML={{ __html: step.description }} />
              ) : (
                <p>{__(step.description)}</p>
              )}
              <ActionWrap>
                {renderButton(
                  step.url,
                  step.urlText,
                  step.isOutside,
                  step.target
                )}
              </ActionWrap>
            </ItemContent>
          </ItemsCintainer>
        ))}
      </ItemsSteps>
    </Container>
  );
}

export default EmptyContent;
