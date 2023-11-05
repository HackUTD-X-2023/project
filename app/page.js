'use client';
import React, { use, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  return (
    <main className="bg-[url('/cover.jpg')] h-screen bg-no-repeat bg-cover relative z-10 flex flex-col justify-center">
      <div className='mt-40 ml-52 px-16 py-8 bg-gray-800 w-fit rounded-3xl '>
        <div className='my-10 flex flex-col gap-y-10 items-center'>
          <div className='text-white text-3xl max-w-sm font-medium leading-8'>Find out if you can buy a home in minutes, <br />super-powered with AI</div>
          <button className="rounded-2xl text-lg text-white bg-sky-400 h-16 w-64" type="button" onClick={() => router.push('/form')}>
            GET STARTED!
          </button>
        </div>
      </div>
    </main>
  )
}
