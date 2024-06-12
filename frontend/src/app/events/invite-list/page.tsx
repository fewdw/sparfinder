'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import BoxerWaitingListView from '@/app/components/BoxerWaitingListView';
import BoxerInviteList from '@/app/components/BoxerInviteList';

const page = () => {
    const router = useRouter();
    const [isBoxer, setIsBoxer] = useState(false);

    useEffect(() => {
        const JWT = Cookies.get('jwt');
        if (!JWT) {
            router.push('/');
            return;
        }

        const decoded = JSON.parse(atob(JWT.split('.')[1])); // Decode the payload of the JWT
        if (decoded.account_type === 'boxer') {
            setIsBoxer(true);
        } else {
            router.push('/');
        }
    }, [router]);

    return (
        <div>
            {isBoxer && <BoxerInviteList></BoxerInviteList>}
        </div>
    );
};

export default page;
