import { createContext, useState, useContext } from "react";

const LoadingContext = createContext()

export const useLoading = () => useContext(LoadingContext)

const LoadingContextProvider = (props) => {
    const [loading, setIsLoading] = useState(false)

    return (
        <LoadingContext.Provider value={{loading, setIsLoading}}>
            {props.children}
        </LoadingContext.Provider>
    )
}

export default LoadingContextProvider