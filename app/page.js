'use client';

import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <button type="button" onClick={() => router.push('/form')}>
        Find out now!
      </button>
    </main>
  )
}
