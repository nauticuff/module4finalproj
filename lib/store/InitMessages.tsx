'use client'

import { useEffect, useRef } from 'react';

import { IMessage, useMessage } from './messages';
import { MESSAGE_LIMIT } from '../constant';

export default function InitMessages({ messages }: { messages: IMessage[] }) {

    const initState = useRef(false);
    const hasMoreMessages = messages.length >= MESSAGE_LIMIT

    useEffect(() => {
        if (!initState.current) {
          useMessage.setState({ messages, hasMoreMessages });
        }
        initState.current = true;
    }, []);

    return <></>;    
    
}
