import * as routerUtils from '../utils/router';

import React, { forwardRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { __, router } from '../utils/core';

import Tip from '@octobots/ui/src/components/Tip';
import queryString from 'query-string';
import { Modal } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { CloseModal } from '../styles/main';
import Icon from './Icon';

type Props = {
  title: string;
  titleAlignment?: boolean | any;
  as?: string | any;
  trigger?: React.ReactNode;
  autoOpenKey?: string;
  content: any;
  size?: 'sm' | 'lg' | 'xl';
  ignoreTrans?: boolean;
  dialogClassName?: string;
  backDrop?: 'static' | boolean;
  enforceFocus?: boolean;
  hideHeader?: boolean;
  isOpen?: boolean;
  addisOpenToQueryParam?: boolean;
  paddingContent?: 'less-padding';
  centered?: boolean;
  style?: any;
  onExit?: () => void;
  tipText?: string;
  tipPlacement?:
    | 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
  isAnimate?: boolean;
};

const ModalTrigger: React.FC<Props> = forwardRef(
  (
    {
      title,
      titleAlignment = false,
      trigger,
      autoOpenKey,
      content,
      size,
      dialogClassName,
      enforceFocus,
      hideHeader = true ,
      isOpen,
      addisOpenToQueryParam,
      paddingContent,
      onExit,
      ignoreTrans,
      backDrop,
      centered,
      style,
      tipText,
      tipPlacement,
      isAnimate = false
    },
    ref
  ) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isOpenTrigger, setIsOpen] = useState(isOpen || false);
    const [autoOpenKeyState, setAutoOpenKey] = useState('');

    // const { isOpen: urlIsOpen } = useParams<{ isOpen?: string }>();

    useEffect(() => {
      if (autoOpenKey !== autoOpenKeyState) {
        if (routerUtils.checkHashKeyInURL({ location }, autoOpenKey)) {
          setIsOpen(true);
          setAutoOpenKey(autoOpenKey || '');
        }
      }
    }, [autoOpenKey, autoOpenKeyState]);

    useEffect(() => {
      const queryParams = queryString.parse(window.location.search);

      if (addisOpenToQueryParam) {
        if (isOpenTrigger && !queryParams.isOpen) {
          router.setParams(navigate, location, {
            isModalOpen: isOpenTrigger
          });
        }

        if (queryParams.isModalOpen) {
          router.removeParams(navigate, location, 'isModalOpen');
        }
      }
    }, [addisOpenToQueryParam, isOpen]);

    const openModal = () => {
      setIsOpen(true);
    };

    const closeModal = () => {
      setIsOpen(false);
      onExit && onExit();
    };

    const renderHeader = () => {
      if (hideHeader) {
        return (
          <CloseModal onClick={closeModal}>
            <Icon icon='times' size={16} />
          </CloseModal>
        );
      }

      return (
        <Modal.Header closeButton={true} className={paddingContent}>
          <Modal.Title>{ignoreTrans ? title : __(title)}</Modal.Title>
        </Modal.Header>
      );
    };

    // add onclick event to the trigger component
    const triggerComponent = trigger
      ? React.cloneElement(trigger as React.ReactElement<any>, {
          onClick: openModal
        })
      : null;

    return (
      <>
        {tipText ? (
          <Tip
            text={__(tipText)}
            placement={tipPlacement ? tipPlacement : 'bottom'}
          >
            {triggerComponent}
          </Tip>
        ) : (
          triggerComponent
        )}

        <Modal
          dialogClassName={dialogClassName}
          size={size}
          show={isOpenTrigger}
          onHide={closeModal}
          backdrop={backDrop}
          enforceFocus={enforceFocus}
          onExit={onExit}
          animation={isAnimate}
          centered={centered}
          style={style}
        >
          {renderHeader()}
          <Modal.Body className={paddingContent}>
            <Modal.Title
              style={{
                textAlign: titleAlignment ? 'left' : 'center',
                fontWeight: '600',
                margin: '16px 0'
              }}
            >
              {ignoreTrans ? title : __(title)}
            </Modal.Title>
            <CSSTransition
              in={isOpenTrigger}
              timeout={300}
              unmountOnExit={true}
            >
              {content({ closeModal })}
            </CSSTransition>
          </Modal.Body>
        </Modal>
      </>
    );
  }
);

export default ModalTrigger;
