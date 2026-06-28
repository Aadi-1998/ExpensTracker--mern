import React,{ createContext,useState} from 'react'

export const delData = createContext("")

const ContextProvider = ({children}) => {
    const [deletedDate, setDelData]= useState("")
    
  return (
    // <div>ContextProvider</div>
    <delData.Provider  value={{deletedDate,setDelData}}>
        {children}
    </delData.Provider>
  )
}

export default ContextProvider