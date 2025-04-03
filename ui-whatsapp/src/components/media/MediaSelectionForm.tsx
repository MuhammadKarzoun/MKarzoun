import React, { useEffect, useState } from 'react';
import Icon from '@octobots/ui/src/components/Icon';
import { __ } from '@octobots/ui/src/utils/core';
import MediaSelectionModal from './ModalComponent';
import { ChooseMediaBox, MediaViewItem } from '../../styles';


type Props = {
  mediaType: string;
  withPreview: boolean;
  mediaSelected: (data: { url: string, info?: object }) => void;
  selectedMedia?: { url: string, info?: object };
  onClose?: () => void;
};

function MediaSelectionForm(props: Props) {

  const {
    mediaType,
    withPreview,
    mediaSelected,
    selectedMedia: resetMedia,
    onClose
  } = props;
  // State initialization with props
  const [state, setState] = useState(() => ({
    selectedMedia: resetMedia || { url: '', info: {} },
    isModalOpen: false
  }));


  // Node management handlers
  const handleClose = () => {
    setState({ ...state, isModalOpen: false });
    if (onClose) onClose();
  };

  // Node management handlers
  const handleSelectMedia = (data) => {
    setState({ selectedMedia: data, isModalOpen: false });
    mediaSelected(data);
  };

  const handleRemove = () => {
    setState({ ...state, selectedMedia: { url: '', info: {} } });
    mediaSelected({ url: '', info: {} });
  };

  const PLACEHOLDERS = {
    IMAGE: '/images/actions/image-placeholder.svg',
    VIDEO: '/images/actions/image-placeholder.svg',
    DOCUMENT: '/images/actions/image-placeholder.svg',
  };

  const RenderMedia = ({ mediaType, url }) => {
    if (mediaType === 'IMAGE') {
      return (
        <div className="icon">
          <img src={url || PLACEHOLDERS[mediaType]} alt="Preview" />
        </div>
      );
    } else if (mediaType === 'DOCUMENT') {
      return (
        <div className="icon">
          <Icon icon={"file-alt"} size={22} />
        </div>
      );
    } else if (mediaType === 'VIDEO') {
      return (
        <div className="icon">
          <Icon icon={"video"} size={22} />
        </div>
      );
    }
  }

  const MediaPreview = ({ mediaType, url, mediaDetails }) => {
    return (
      <div>
        {RenderMedia({ mediaType, url })}
        <div className="text">
          {mediaDetails && (
            <p>
              <b><strong>اسم الملف:</strong> {mediaDetails.name}</b>
              <br />
              <strong>الصيغة:</strong> {mediaDetails.type}
              <br />
              <strong>الحجم:</strong> {mediaDetails.size} كيلو بايت
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderSelectedMedia = () => {
    if (!withPreview) return null;

    return (
      <MediaViewItem>
        {MediaPreview({ mediaType, url: state.selectedMedia.url, mediaDetails: state.selectedMedia.info })}
        <div className="remove" onClick={handleRemove}>
          <Icon size={20} icon="trash-alt" />
        </div>
      </MediaViewItem>
    );
  };

  // Modal form components
  const renderSelectionForm = () => {
    return (
      <ChooseMediaBox onClick={() => setState({ ...state, isModalOpen: true })}>
        {mediaType === 'IMAGE' && <Icon icon="image-v" size={35} />}
        {mediaType === 'VIDEO' && <Icon icon="video" size={35} />}
        {mediaType === 'DOCUMENT' && <Icon icon="file-alt" size={35} />}
      </ChooseMediaBox>
    );
  };


  return (
    <>
      <MediaSelectionModal isModalOpen={state.isModalOpen} mediaType={mediaType} mediaSelected={handleSelectMedia} handleClose={handleClose} />
      {state.selectedMedia.url == '' ? renderSelectionForm() : renderSelectedMedia()}
    </>
  )
};

export default MediaSelectionForm;