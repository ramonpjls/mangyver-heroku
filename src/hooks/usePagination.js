import { useState} from 'react'

export const usePagination = (elements = [], totalElementsInDB) => {

    const [skipBase, setSkipBase] = useState(0)
    
    const [elementsPerPage, setElementsPerPage] = useState(40)

    const indexOfLastElement = skipBase * elementsPerPage

    const indexOfFirstElement = indexOfLastElement - elementsPerPage

    const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement)

    let limit = (elements.length / elementsPerPage)

    if(limit % 1 !== 0){
        limit = (Math.trunc(limit)) + 1
    }

    const nextPage = () => {
        !(skipBase + elementsPerPage > totalElementsInDB ) && setSkipBase(skipBase + elementsPerPage)
    }
    
    const previousPage = () => {
        if(skipBase - elementsPerPage < 0)return setSkipBase(0)
        skipBase !== 0 && setSkipBase(skipBase - elementsPerPage)
    }

    return {
        limit,
        currentElements,
        previousPage,
        nextPage,
        skipBase,
        totalElementsInDB,
        setElementsPerPage,
        elementsPerPage,
        setSkipBase, 
        elements
    }
}

