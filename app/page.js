'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <main className="bg-family h-screen bg-no-repeat bg-cover relative z-10">
      <div className="bg-black opacity-60 backdrop-blur-sm h-full z-20">
          <button className="absolute right-100 top-80 bg-red z-30" type="button" onClick={() => router.push('/form')}>
              Find out now!
          </button>
      </div>
      <div className="static"></div>
    </main>
  )
}
