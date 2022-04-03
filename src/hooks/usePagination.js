import { useState} from 'react'

export const usePagination = (elements = [], totalElementsInDB = Infinity) => {

    const [skipBase, setSkipBase] = useState(0)
    
    const [elementsPerPage, setElementsPerPage] = useState(100)

    const indexOfLastElement = skipBase * elementsPerPage

    const indexOfFirstElement = indexOfLastElement - elementsPerPage

    const currentElements = elements.slice(indexOfFirstElement, indexOfLastElement)

    let limit = (elements.length / elementsPerPage)

    if(limit % 1 !== 0){
        limit = (Math.trunc(limit)) + 1
    }

    const firstPage = () => {
        setSkipBase(0)
    }

    const previousPage = () => {
        if(skipBase - elementsPerPage < 0)return setSkipBase(0)
        skipBase !== 0 && setSkipBase(skipBase - elementsPerPage)
    }

    const totalPages = Math.ceil(totalElementsInDB / elementsPerPage)

    const currentPage  = Math.trunc(skipBase / elementsPerPage) + 1

    const nextPage = () => {
        !(skipBase + elementsPerPage > totalElementsInDB ) && setSkipBase(skipBase + elementsPerPage)
    }

    const lastPage = () => {
        !(skipBase + elementsPerPage > totalElementsInDB ) && setSkipBase(totalElementsInDB - elementsPerPage)
    }

    return {
        limit,
        currentElements,
        firstPage,
        previousPage,
        nextPage,
        lastPage,
        skipBase,
        totalElementsInDB,
        setElementsPerPage,
        elementsPerPage,
        setSkipBase, 
        elements,
        totalPages,
        currentPage,
    }
}

