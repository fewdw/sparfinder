'use client';
import MenuBar from '@/app/components/MenuBar'
import React from 'react'
import { useParams } from 'next/navigation';


const page = () => {
    const params = useParams();
  return (
    <div>
        <MenuBar />
        <p>{params.event_id}</p>
        
    </div>
  )
}

export default page