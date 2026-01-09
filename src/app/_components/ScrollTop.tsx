'use client'
import { useState } from "react";
import { BsFillRocketFill } from "react-icons/bs";
import ScrollToTop from "react-scroll-up"

type onButtonClick = {
    onButtonClick: () => void;
}




const ScrollTop = () => {
    const [fly, setFly] = useState(false)

    const handleClick = () => {setFly(true); setTimeout(() => {setFly(false)}, 1000)} ;
    return (
        <>
            <ScrollToTop showUnder={160}>
                <div onClick={handleClick} className={`p-3 bg-white rounded-full shadow-md hover:shadow-lg cursor-pointer transition-transform hover:scale-110 ${console.log(fly), fly ? 'translate-y-[-10vh]' : 'translate-y-0'} translate-y-0`}>
                <BsFillRocketFill className="text-primary text-3xl" />
                </div>
            </ScrollToTop>
        </>
    )
}

export default ScrollTop;