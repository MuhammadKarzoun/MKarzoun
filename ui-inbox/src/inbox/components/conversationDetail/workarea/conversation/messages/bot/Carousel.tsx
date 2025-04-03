import * as React from 'react';
import { ICarouselButton, ICarouselItem } from '../../../../../../types';
import {
  CardAction,
  CardContent,
  CardItem,
  CardsWrapper,
  CardUrl
} from './styles';

type Props = {
  items?: ICarouselItem[];
};

export default function Carousel({ items }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  function renderButton(button: ICarouselButton) {
    const { type, title, url } = button;

    if (type === 'openUrl') {
      return (
        <CardUrl target='_blank' href={url}>
          {title}
        </CardUrl>
      );
    }

    return <CardAction>{title}</CardAction>;
  }

  const renderActions = (buttons?: ICarouselButton[]) => {
    if (!buttons || buttons.length === 0) {
      return null;
    }

    return (
      <div>
        {buttons.map((button, idx) => (
          <div key={idx}>{renderButton(button)}</div>
        ))}
      </div>
    );
  };

  const renderItem = (item: ICarouselItem, index: number) => {
    return (
      <CardItem key={index}>
          {item.picture && <img alt={item.title || ''} src={item.picture} />}
          {item.video && <video controls style={{ maxHeight: '300px' }}>
            <source src={item.video} type="video/mp4" />
            متصفحك لا يدعم الفيديو.
          </video>}
          {item.file && <a href={item.file} download>{'تحميل الملف...'}</a>}
        <CardContent>
          {item.title && <h4>{item.title}</h4>}
          {item.subtitle && <p>{item.subtitle}</p>}
          {item.footer && <footer>{item.footer}</footer>}
        </CardContent>
        {renderActions(item.buttons)}
      </CardItem>
    );
  };

  return <CardsWrapper>{items.map(renderItem)}</CardsWrapper>;
}
