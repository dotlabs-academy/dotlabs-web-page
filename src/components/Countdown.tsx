import Image from 'next/image'
import React from 'react'

const Countdown = () => {
    return (
        <section
            className="bg-main text-white flex justify-center items-center h-11 sticky top-16 z-40"
        >
            <div className="flex gap-x-3">
                <Image src="assets/icons/timer.svg" alt="Instagram" width={20} height={20} />
                <p className="text-yellow-custom font-semibold">
                    Coming soon
                </p>
            </div>
        </section>
    )
}

export default Countdown