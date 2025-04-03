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
  template?: ICarouselItem;
};

export default function Template({ template }: Props) {
  if (!template) {
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

  const renderItem = (item: ICarouselItem) => {
    return (
      <CardItem>
        {item.picture && <img alt={item.title || ''} src={item.picture} />}
        <CardContent>
          {item.title && <h4>{item.title}</h4>}
          {item.subtitle && <p>{item.subtitle}</p>}
        </CardContent>
        {renderActions(item.buttons)}
      </CardItem>
    );
  };

  return <CardsWrapper>{renderItem(template)}</CardsWrapper>;
}
