import Image from 'next/image'
import React from 'react';
export default function Home() {

  return (
    <main>
      <form>
        <label htmlFor="email">Email: </label><br/>
        <input type="email" name="email"/>

      </form>
    </main>
  )
}
