import { IBotData, IMessage } from '../../../../../types';
import { MessageBody, MessageContent, MessageItem } from '../styles';

import Carousel from './bot/Carousel';
import Template from './bot/Template';
import CustomMessage from './bot/CustomMessage';
import ImageWithPreview from '@octobots/ui/src/components/ImageWithPreview';
import NameCard from '@octobots/ui/src/components/nameCard/NameCard';
import React from 'react';
import Tip from '@octobots/ui/src/components/Tip';
import dayjs from 'dayjs';
import { urlify } from '@octobots/ui/src/utils/urlParser';
import xss from 'xss';

type Props = {
  message: IMessage;
};

export default class SimpleMessage extends React.Component<Props, {}> {
  renderAvatar() {
    return (
      <NameCard.Avatar
        user={{ _id: 'karzoun_bot', username: 'bot', email: 'info@karzoun.chat' }}
      />
    );
  }

  renderTextMessage = (message: IBotData, index: number) => {
    return (
      <MessageContent staff={true} key={index}>
        <span
          dangerouslySetInnerHTML={{ __html: xss(urlify(message.text || '')) }}
        />
      </MessageContent>
    );
  };

  renderFileMessage = (message: IBotData, index: number) => {
    return (
      <MessageContent staff={true} key={index}>
        <ImageWithPreview src={message.url} alt={message.title || ''} />
      </MessageContent>
    );
  };

  renderCustomMessage = (message: IBotData, index: number) => {
    return <CustomMessage key={index} botData={message} />;
  };

  renderCarouselMessage = (elements: any, index: number) => {
    return <Carousel key={index} items={elements} />;
  };

  // // WhatsApp Template Msg
  // renderTemplateMessage = (template: any, index: number) => {
  //   return <Template key={index} template={template} />;
  // };

  renderBotMessage() {
    const { message } = this.props;
    const { botData } = message;

    return botData.map((item, index) => {
      switch (item.type) {
        case 'text':
          return this.renderTextMessage(item, index);
        case 'file':
          return this.renderFileMessage(item, index);
        case 'template':
              // return this.renderTemplateMessage(item.template, index);
        case 'card':
        case 'carousel':
          return this.renderCarouselMessage(item.elements, index);
        case 'custom':
          return this.renderCustomMessage(item, index);
        default:
          return null;
      }
    });
  }

  render() {
    const {
      message: { createdAt }
    } = this.props;

    return (
      <MessageItem $staff={true} $isBot={true}>
        {this.renderAvatar()}
        <MessageBody $staff={true}>
          <Tip text={dayjs(createdAt).format('lll')}>
            <footer>{dayjs(createdAt).format('LT')}</footer>
          </Tip>
          {this.renderBotMessage()}
        </MessageBody>
      </MessageItem>
    );
  }
}
