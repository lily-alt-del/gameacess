'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function MiddleNav() {
  const [query, setQuery] = useState('');

  return (
    <div className='w-full bg-[var(--prim)]'>
      <div className='flex items-center justify-between px-[8%] py-3 lg:px-[16%]'>

        {/* Logo  */}
        <Link href='/' className='inline-block'>
          <div className='group relative h-12 w-40'>

            {/* Logo2 default */}
            <Image
              src='/logoaccess2.png'
              alt='Logo Access 2'
              width={100}
              height={100}
              className='block opacity-100 transition-opacity duration-200 group-hover:opacity-0'
            />

            {/* Logo1 Hover */}
            <Image
              src='/logoaccess1.gif'
              alt='Logo Access 1'
              width={100}
              height={100}
              className='absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
