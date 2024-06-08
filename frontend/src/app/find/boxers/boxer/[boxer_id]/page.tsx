'use client';
import React from 'react'
import { useParams } from 'next/navigation';
import MenuBar from '@/app/components/MenuBar';


const page = () => {
    const params = useParams();

  return (
    <div>
      <MenuBar />
      {params.boxer_id}</div>
  )
}

export default page