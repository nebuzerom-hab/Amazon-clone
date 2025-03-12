import React,{createContext} from 'react';
import {useReducer} from 'react'
export const DataContent=createContext()// object with provider and consumer
 export const DataProvider=({children,reducer,initialState})=>{

    return(

        <DataContent.Provider value={useReducer(reducer,initialState)}>   
            {children}
            </DataContent.Provider>
    )
//      <DataProvider reducer={reducer} initialState={initialState}>
//       <App />
//     </DataProvider>
// 
 }