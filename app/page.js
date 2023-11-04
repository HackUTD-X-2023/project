'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <main className="bg-family blur-lg h-screen bg-no-repeat bg-cover relative -z-10">
      <div className="h-full w-full backdrop-blur-sm bg-black opacity-60 z-10 relative">
        <div className="bg-black z-20 absolute">
          <button className="bg-sky z-30" type="button" onClick={() => router.push('/form')}>
            Find out now!
          </button>
        </div>
      </div>
    </main>
  )
}
