import React, { useState, useEffect } from 'react';
import './ModalComponent.css';
import { Modal, Button, Tab, Tabs, Form, Col, Row, Pagination, Image, Container } from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Alert } from '@octobots/ui/src/utils';
import uploadHandler from '@octobots/ui/src/utils/uploadHandler';
import { readFile } from '@octobots/ui/src/utils/core';

// GraphQL Queries and Mutations
const GET_LIBRARY_FILES = gql`
  query GetLibraryFiles($type: String!) {
    filemanagerUploadsLibraryFiles(type: $type) {
      _id
      url
      name
      info
      createdAt
    }
  }
`;

const SAVE_FILE_MUTATION = gql`
  mutation SaveFile($name: String!, $url: String!, $info: JSON!) {
    filemanagerUploadsFileCreate(name: $name, url: $url, info: $info) {
      _id
      url
      name
      info
    }
  }
`;

// Constants
const MIME_TYPES = {
  IMAGE: 'image/*',
  VIDEO: 'video/*',
  DOCUMENT: '*/*',
};

const PLACEHOLDERS = {
  IMAGE: '/images/actions/image-placeholder.svg',
  VIDEO: '/images/actions/image-placeholder.svg',
  DOCUMENT: '/images/actions/image-placeholder.svg',
};


type Props = {
  mediaType: string;
  isModalOpen: boolean;
  mediaSelected: (data: { url: string, info?: object }) => void;
  //selectedMedia?: { url: string, info: object };
  handleClose?: () => void;
};


function MediaSelectionModal(props: Props) {
  const {
    isModalOpen,
    mediaType,
    mediaSelected,
    handleClose
  } = props;

  const [activeTab, setActiveTab] = useState('upload');
  const [selectedMedia, setSelectedMedia] = useState({ url: '', info: null });
  const [hoveredMedia, setHoveredMedia] = useState(null);
  const [uploadedMedia, setUploadedMedia] = useState(null);
  const [binaryFile, setBinaryFile] = useState(null);
  const [url, setUrl] = useState('');
  const [activePage, setActivePage] = useState(1);
  const mediasPerPage = 12;
  const { data, loading, error } = useQuery(GET_LIBRARY_FILES, {
    variables: { type: mediaType.toLowerCase() },
    skip: !isModalOpen,
  });

  const [saveFileMutation] = useMutation(SAVE_FILE_MUTATION);


  const VideoPlayer = ({ src }) => (
    <Container className="my-4">
      <video controls width="100%" className="rounded" poster={PLACEHOLDERS.VIDEO}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Container>
  );

  const MediaUploader = ({ mediaType, uploadedMedia, handleMediaChange, binaryFile }) => (
    <div className="text-center uploader-container hover-blue-dashed">
      <input
        type="file"
        accept={MIME_TYPES[mediaType]}
        id="mediaUpload"
        style={{ display: 'none' }}
        onChange={handleMediaChange}
      />
      {!uploadedMedia && (
        <label htmlFor="mediaUpload">
          <Image
            src={PLACEHOLDERS[mediaType]}
            alt="Upload"
            style={{ width: '200px', height: '200px', cursor: 'pointer' }}
            rounded
          />
        </label>
      )}
      {uploadedMedia && mediaType === 'VIDEO' && <VideoPlayer src={uploadedMedia} />}
      {uploadedMedia && mediaType === 'IMAGE' && (
        <Image
          src={uploadedMedia}
          alt="Uploaded Media"
          style={{ width: '200px', height: '200px' }}
          rounded
        />
      )}
      {binaryFile && <div>{binaryFile.name}</div>}
    </div>
  );

  const MediaPreview = ({ mediaType, url, mediaDetails }) => {
    if (mediaType === 'VIDEO' && url) {
      return (
        <div>
          <VideoPlayer src={url} />
          {mediaDetails && (
            <div className="media-details">
              <p><strong>اسم الملف:</strong> {mediaDetails.name}</p>
              <p><strong>الصيغة:</strong> {mediaDetails.type}</p>
              <p><strong>الحجم:</strong> {mediaDetails.size} KB</p>
            </div>
          )}
        </div>
      );
    }
    return (
      <div>
        <Image
          src={url || PLACEHOLDERS[mediaType]}
          alt="Preview"
          style={{ width: '100%', height: 'auto', cursor: 'pointer', maxHeight: '300px' }}
        />
        {mediaDetails && (
          <div className="media-details">
            <p><strong>اسم الصورة:</strong> {mediaDetails.name}</p>
            <p><strong>الصيغة:</strong> {mediaDetails.type}</p>
            <p><strong>الحجم:</strong> {mediaDetails.size} كيلو بايت</p>
          </div>
        )}
      </div>
    );
  };

  const MediaLibrary = ({ medias, onHover, onSelect, hoveredMedia, selectedMedia, mediaType }) => (
    <Row>
      <Col md={8} className="media-library-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {medias.map((media) => {
          const isSelected = media.url === selectedMedia.url;
          const handleSelect = () => onSelect(media);
          const handleHover = () => onHover(media._id);
          return (
            <div key={media._id} className={`media-item ${isSelected ? 'selected' : ''}`} onMouseOver={handleHover} onClick={handleSelect}>
              {media.info.type.startsWith('image/') && (
                <img src={media.url} alt={media.name} className="media-thumbnail" style={{ width: '100%', height: 'auto', cursor: 'pointer' }} />
              )}
              {media.info.type.startsWith('video/') && (
                <video controls className="media-thumbnail">
                  <source src={media.url} type={media.info.type} />
                </video>
              )}
            </div>
          );
        })}
      </Col>
      <Col md={4}>
        <div style={{ border: '1px solid #ccc', padding: '10px', height: 'fit-content' }}>
          <MediaPreview url={selectedMedia.url} mediaType={mediaType} mediaDetails={selectedMedia.info} />
        </div>
      </Col>
    </Row>
  );

  const saveMedia = async () => {
    // console.log('full modal state', state);
    if (activeTab === 'upload' && binaryFile) {
      try {
        const fileInfo = { size: binaryFile.size, type: binaryFile.type, name: binaryFile.name };

        if (uploadedMedia) {
          mediaSelected({ url: uploadedMedia, info: fileInfo });
        }

        await saveFileMutation({
          variables: {
            name: binaryFile.name,
            url: uploadedMedia,
            info: { size: binaryFile.size, type: binaryFile.type, name: binaryFile.name },
          },
        });
        // resetSelection();
      } catch (error) {
        Alert.error('فشل حفظ الملف للمكتبة, بكل الأحوال يمكنك المتابعة.');
      }
    } else if (activeTab === 'url' && url) {
      // handleModalSave(url, url, '');
      mediaSelected({ url, info: {} });
      // resetSelection();
    }
    else if (activeTab === 'library' && selectedMedia.url) {
      mediaSelected({ url: selectedMedia.url, info: selectedMedia.info || {} });
      // resetSelection();
    }
    resetSelection();

  };

  const resetSelection = () => {
    setUploadedMedia(null);
    setBinaryFile(null);
    setSelectedMedia({ url: '', info: null });
    setUrl('');
  };

  const handleMediaUpload = async (e) => {
    const files = e.target.files;
    if (files?.length) {
      const params = {
        files: Array.from(files),
        afterUpload: async ({ response, fileInfo }) => {
          const uploadedFileUrl = readFile(response);
          setUploadedMedia(uploadedFileUrl);
          // mediaSelected({ url: uploadedFileUrl, fileInfo });
          // updateMediaData(uploadedFileUrl, fileInfo);
          setBinaryFile(fileInfo);
        },
      };
      await uploadHandler(params);
    }
  };

  const medias = data?.filemanagerUploadsLibraryFiles || [];
  const pageCount = Math.ceil(medias.length / mediasPerPage);
  const displayedMedias = medias.slice((activePage - 1) * mediasPerPage, activePage * mediasPerPage);

  const selectMedia = (media) => {
    console.log('selected media', media);
    setSelectedMedia(media);
    // setUploadedMedia(media.url);
  }

  return (
    <Modal show={isModalOpen} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>الملفات والوسائط</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs activeKey={activeTab} onSelect={setActiveTab} className="mb-3">
          <Tab eventKey="upload" title="رفع ملف">
            <MediaUploader
              mediaType={mediaType}
              uploadedMedia={uploadedMedia}
              handleMediaChange={handleMediaUpload}
              binaryFile={binaryFile}
            />
          </Tab>
          <Tab eventKey="url" title="رفع عبر رابط">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter media URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Form.Group>
              <MediaPreview url={url} mediaType={mediaType} />
            </Form>
          </Tab>
          <Tab eventKey="library" title="مكتبة الوسائط">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error.message}</p>
            ) : (
              <MediaLibrary
                medias={displayedMedias}
                onHover={setHoveredMedia}
                onSelect={(media) => selectMedia(media)}
                // onDelete={(id) => setMedias(medias.filter((media) => media._id !== id))}
                hoveredMedia={hoveredMedia}
                selectedMedia={selectedMedia}
                mediaType={mediaType}
              />
            )}
            <Pagination className="mt-2">
              {Array.from({ length: pageCount }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === activePage} onClick={() => setActivePage(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <div className="w-100 d-flex justify-content-between">
          <Button variant="danger" onClick={resetSelection}>تراجع</Button>
          <div>
            <Button className='mx-1' variant="secondary" onClick={handleClose}>إغلاق</Button>
            <Button className='mx-1' variant="primary" onClick={saveMedia}>حفظ</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MediaSelectionModal;
