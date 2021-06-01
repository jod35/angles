import React,{useState} from 'react'



const SignUpForm=({onNewArticle})=>{
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')


    const handleUserChange =(e)=>{
        setUsername(e.target.value)
    }

    const handleEmailChange =(e)=>{
        setEmail(e.target.value)
    }


    const handleSignUp=(e)=>{
        e.preventDefault()
        
        const article={username:username,email:email}

        const requestOptions={
            method:"POST",
            headers:{
                'content-type': 'application/json',
            },
            body:JSON.stringify(article)
        }

        fetch('/articles',requestOptions)
        .then(response=>response.json())
        .then(data=>console.log(data))
        .catch(error=>console.log(error))

        onNewArticle(article)

        setUsername('')
        setEmail('')
    }
    return (
        <div className="search-form">
            <form onSubmit={handleSignUp}>
                <label htmlFor="username">
                    Username
                    <input type="text" value={username} placeholder="Username" onChange={handleUserChange}/>
                </label>
                <label htmlFor="email">
                    Email
                    <input type="text" value={email} placeholder="Email" onChange={handleEmailChange}/>
                </label>
                <button>Save</button>
            </form>
        </div>
    )
}

export default SignUpForm