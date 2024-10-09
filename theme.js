import React from "react";
import './mystyle.css';
import { useState } from "react";
import ThemeChange from './ThemeChange';
export const ThemeContext=React.createContext
const ThemeSwitch=()=>{
    const [theme,settheme]=useState('light')
    return(
        <div className={`${theme}`} style={{width:"100%",height:"650px"}}>
            <ThemeContext.Provider value={{theme,settheme}}>
                <ThemeChange/>
            </ThemeContext.Provider>
        </div>
    )
}
export default ThemeSwitch;