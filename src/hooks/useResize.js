import { useState, useEffect } from "react";

export const useResize = () => {

    const [isPhone, setIsPhone] = useState(window.innerWidth < 958);

    const [phoneMenu, setPhoneMenu] = useState(window.innerWidth < 450)

    const handleResize = () => {

        if(window.innerWidth < 958) setIsPhone(true)
        else setIsPhone(false)

        if(window.innerWidth < 450) setPhoneMenu(true)
        else setPhoneMenu(false)

    }

    useEffect(() => {

        handleResize()
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

    })


    return [isPhone, phoneMenu]


}