import { useState, useEffect } from "react";

export default function Alert({ type, message }: { type: string; message: string }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const getColor = (type: string) => {
        switch (type) {
            case "success":
                return "bg-green-500 text-white";
            case "error":
                return "bg-red-500 text-white";
            case "warning":
                return "bg-yellow-500 text-white";
            default:
                return "bg-blue-500 text-white";
        }
    };

    return visible ? (
        <div className={`${getColor(type)} text-center p-2 rounded-md`}>
            {message}
        </div>
    ) : null;
}