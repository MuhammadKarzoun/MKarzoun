import React from 'react';
import { IMessage } from '../../../../../types';
import AppMessage from './AppMessage';
import FormMessage from './FormMessage';
import MessageBot from './MessageBot';
import SimpleMessage from './SimpleMessage';

type Props = {
  message: IMessage;
  isSameUser: boolean;
  conversationFirstMessage?: IMessage;
  goToMsg: (id: string) => void;
  updateMsg: (id: string, content: string, action: string) => void;
  setReplyForMsgId: (message: IMessage) => void;
};

const Message = ({
  message,
  isSameUser,
  conversationFirstMessage,
  goToMsg,
  updateMsg,
  setReplyForMsgId,
}: Props) => {

  const handleSetReplyId = (message: IMessage) => {
    setReplyForMsgId(message);
  };

  if (message.formWidgetData) {
    return (
      <FormMessage
        message={message}
        // isSameUser={isSameUser}
      />
    );
  }

  if (message.messengerAppData) {
    return <AppMessage message={message} />;
  }

  if (message.botData) {
    return <MessageBot message={message} />;
  }

  return (
    <SimpleMessage
      message={message}
      isFirstMsg={message._id === conversationFirstMessage?._id}
      isStaff={!!message.userId}
      isSameUser={isSameUser}
      goToMsg={goToMsg}
      updateMsg={updateMsg}
      setReplyId={handleSetReplyId}
    />
  );
};

export default React.memo(Message);