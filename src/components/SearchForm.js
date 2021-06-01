import React from 'react'

const SearchForm=({onSearch,search})=>{



    return(
        <form>
            <label htmlFor="search">
                Search
                <input type="text" className="form-control" value={search} onChange={onSearch} placeholder="Search"/>
            </label>
        </form>
    )
}

export default SearchForm