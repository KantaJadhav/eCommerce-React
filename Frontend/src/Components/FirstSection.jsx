import React from 'react'
import Button from './Button'

const FirstSection = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row bg-[#FAF4F4] pb-4 lg:pb-0'>
                <div className='md:relative w-full md:w-1/2 pr-16 md:pl-4'>
                    <img src='/GraniteSquareSideTable.png'alt="" className='md:relative mt-5' />
                    <div className='relative lg:bottom-48  pl-12'>
                        <h1 className='font-semibold text-2xl md:text-3xl'>Side table</h1>
                        <Button text={"View More"} />
                    </div>

                </div>
                <div className='md:relative w-full md:w-1/2 pr-16 md:pr-8'>
                    <img src='/CloudSofaThreeSeaterOttoman.png' alt="" className='md:relative ' />
                    <div className='relative lg:bottom-36 pl-12 lg:left-32 inline-block'>
                        <h1 className='font-semibold text-2xl md:text-3xl inline-block'>Side table</h1>
                        <Button text={"View More"} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default FirstSection