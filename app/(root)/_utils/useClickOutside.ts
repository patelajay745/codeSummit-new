import React from "react";
import { useEffect } from "react";

type Callback = () => void;

export function useClickOutside<T extends HTMLDivElement | null>(ref: React.RefObject<T>,
    callback: Callback) {

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback])

}