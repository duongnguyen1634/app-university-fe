"use client";
import { useState } from 'react';
import { Dock } from 'primereact/dock';
import { RadioButton } from 'primereact/radiobutton';
import Image from 'next/image';
import { Button } from 'primereact/button';
import Link from 'next/link';

function Navigate() {

    return (
        <div className="  bg-mau1 rounded-t-xl sticky bottom-0 left-0 w-full z-50 flex px-4 py-2.5 flex-row justify-around">
            <div className='p-2.5'>
                <Link href="/"><Image alt='Home' src={'/icon/Home.svg'} width={24} height={24}/> </Link>
            </div>
            <div className='p-2.5'>
            <Link href={"/deviceGraph"}><Image alt='Home' src={'/icon/Chat.svg'} width={24} height={24}/> </Link>
            </div>
            <div className='p-2.5'>
            <Link href={"/nofication"}><Image alt='Home' src={'/icon/Bell.svg'} width={24} height={24}/> </Link>
            </div>
        </div>

    )
};

export default Navigate