import { CloudIcon } from "@heroicons/react/24/outline";
import React from "react";

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading  flex items-center gap-2 ">
                <CloudIcon className="animate-bounce" width={24}/> 
                <span className="animate-bounce text-lg">
                    Cargando...
                </span>
            </div>
        </div>
    );
};

export default Loading;