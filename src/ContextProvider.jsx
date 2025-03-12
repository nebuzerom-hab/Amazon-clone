import React,{useState,createContext,useContext} from "react";


const colorContext=createContext() //This allows any component in your application to access the theme (light/dark) without having to pass props manually.
export const useColor=()=>{
    return useContext(colorContext)
}
export const ThemeProvider=({children})=>{
    const [color,setColor]=useState('light');
    const colorToggler=()=>{
        setColor((pre)=>pre==='light'?'dark':'light')
    }
    return (
      <colorContext.Provider value={{ color, colorToggler }}>
        {children}
      </colorContext.Provider>
    );
};

