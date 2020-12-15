import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/Newblog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './services/togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(null)

  const [notification, setNotification] = useState("")
  const [errorNotification, setErrorNotification] = useState("")

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setUsername(user.name)
      blogService.setToken(user.token)
    }
  }, [])

  const emptyUser = () => {
    window.localStorage.clear()
    setUser(null)
  }



  const handlePost = (event) => {
    event.preventDefault()

     fetch('/api/users') //first get userId of the user who has logged in
      .then((response) => response.json())
      .then((responseData) => {
        const blogUser = ((responseData.find(n => n.name === username))) //find user who has same name than user who is logged in
        setUserId(blogUser.id)
        const newBlog = {title: title, author: author, url: url, userId: userId}
        blogService.create(newBlog)
        .then(response => {
          console.log(response)
          setBlogs(blogs.concat(response))
        })
        setTitle("")
        setAuthor("")
        setUrl("")

        setNotification("Blog " + title + " was added! Author: " + author)
        setTimeout(() => {
          setNotification("")
        }, 4000)


      })

      .catch((err) => {
        console.error(err);
        setErrorNotification("User not found")
        setTimeout(() => {
          setNotification("")
        }, 4000)
      });
    }


    


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername(user.name)
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification("")
      }, 4000)
    }
  }



  if (user === null) {
    return (
      <div>
        
        <h2>Log in to application</h2>

        <p style={{backgroundColor:"red", width:"400px", color:"white"}}>{notification}</p>

          <div className="login">

              <form onSubmit={handleLogin}>
                <div>
                  username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </div>
                <div>
                  password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
                <button type="submit">login</button>
              </form>
          
          </div>
        
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <br></br>
      <p>Logged in as {username} </p> <button onClick={() => emptyUser()}>Log out</button>
      <br></br>
      <p style={{backgroundColor:"green", width:"400px", color:"white"}}>{notification}</p>
      <p style={{backgroundColor:"red", width:"400px", color:"white"}}>{errorNotification}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      )}

    <Togglable buttonLabel='New blog'>
      <NewBlog
            handlePost={handlePost}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </Togglable>
    </div>
  )
}

export default App