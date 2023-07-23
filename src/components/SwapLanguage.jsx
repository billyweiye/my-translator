import { useState } from "react";



const SwapLanguage = ({ initInputLanguage, initOutputLanguage, setInputLanguage, setOutputLanguage }) => {
    return (
        <div >
            <button className="flex items-center justify-center rounded-full  hover:bg-klein-blue text-slate-950 hover:text-slate-100 font-semi px-4 py-2 shadow-md"
                onClick={() => {
                    setInputLanguage(initOutputLanguage);
                    setOutputLanguage(initInputLanguage);
                }}>

                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Swap
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
        </div>


    )
};


export { SwapLanguage };



