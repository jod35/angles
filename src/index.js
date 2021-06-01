import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import SignUpForm from './components/SignUpForm'
import SearchForm from './components/SearchForm'
import Articles from './components/Articles'



const App =()=>{

    const [searchTerm,setSearchTerm]=useState('')
    
    const [articles,setArticles]=useState([])
    

    useEffect(() => {
        fetch('/articles').then(res=>res.json())
        .then(data =>setArticles(data))
    })

    const searchedArticles = articles.filter((item) => {
        return item.email.toLowerCase().includes(searchTerm)
    })

    const handleSearch = (e)=>{

        setSearchTerm(e.target.value)

    }




    return(
        <div className="app">
            <h1>Articles</h1>
            <SignUpForm onNewArticle={
                (article)=>setArticles(currentArticles=>[...currentArticles,article])}
            />
            <SearchForm onSearch={handleSearch} search={searchTerm}/>
            <Articles list={searchedArticles} />
        </div>
    )
}


ReactDOM.render(<App/>,document.getElementById('root'));