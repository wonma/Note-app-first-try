const filters = {
    searchWord : '',
    sortBy : 'byRecency'
}

const getFilters = () => filters

const setFilters = (updateInfo) => {
    if (typeof updateInfo.searchWord === 'string') {
        filters.searchWord = updateInfo.searchWord
    }
    if (typeof updateInfo.sortBy === 'string') {
        filters.sortBy = updateInfo.sortBy
    }
}

export { getFilters, setFilters }