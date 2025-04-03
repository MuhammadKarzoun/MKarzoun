import React from 'react';
import { MESSAGE_STATUSES} from '../../../../../constants'
import Tip from '@octobots/ui/src/components/Tip';
import {
    StatusMessage
  } from '../styles';
import { colors } from '@octobots/ui/src/styles';

type Props = {
    status: String | undefined;
    errorMsg: String | undefined;
  };
  
  function IconStatus(props: Props) {
    const { status, errorMsg} = props;
  
    if (status==MESSAGE_STATUSES.SENDING) {
      return ( 
      <StatusMessage>
        <i className="icon-clock"></i>
      </StatusMessage>
      )
    }
  
    if (status==MESSAGE_STATUSES.FAILED) {
      return ( 
      <Tip text={errorMsg}>
        <StatusMessage>
          <i className="icon-cancel-1" style={{color: colors.colorCoreRed}}></i>
        </StatusMessage>
      </Tip>
      )
    }
  
    if (status==MESSAGE_STATUSES.SENT) {
      return ( 
      <StatusMessage>
        <i className="icon-check"></i>
      </StatusMessage>
      )
    }
  
    if (status==MESSAGE_STATUSES.DELIVERED) {
      return ( 
      <StatusMessage>
        <i className="icon-check"></i>
        <i className="icon-check" style={{position: "absolute", right: "51px"}}></i>
      </StatusMessage>
      )
    }
  
    if (status==MESSAGE_STATUSES.SEEN) {
      return ( 
      <StatusMessage>
        <i className="icon-check" style={{color:"blue"}}></i>
        <i className="icon-check" style={{color:"blue", position: "absolute", right: "51px"}}></i>
      </StatusMessage>
      )
    }
  
    return (
        <StatusMessage>
          <i className="icon-check"></i>
        </StatusMessage>
    );
  }
  
  export default IconStatus;