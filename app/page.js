'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <>
    <main className="bg-family h-screen bg-no-repeat bg-cover relative z-10">
      <div class=""></div>
      <button className="rounded-2xl text-lg text-white bg-sky-400 h-16 w-64" type="button" onClick={() => router.push('/form')}>
        GET STARTED!
      </button>
    </main>
    </>
  )
}
