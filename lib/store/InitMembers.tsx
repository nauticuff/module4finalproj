'use client'

import { useEffect, useRef } from 'react';
import { useMember } from './members';

import { IMember } from './members';

export default function InitMembers({ members }: { members: IMember[]}) {

    const initState = useRef(false);

    useEffect(() => {
        if (!initState.current) {
          useMember.setState({ members });
        }
        initState.current = true;
    }, []);

    return <></>;    
    
}
