import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs }) => {
  const [moreInfo, setMoreInfo] = useState(false)

  const handleLike = async (id, user, author, title, url, likes) => {

    const updatedBlog =
      {
        user: user,
        likes: likes + 1,
        author: author,
        title: title,
        url: url,
        id: id
      }

    await blogService.addLike(updatedBlog)
    const updated_blogs = await blogService.getAll()
    setBlogs( updated_blogs.sort((a, b) => b.likes - a.likes))

  }


  const handleDelete = (id, title) => {
    if (window.confirm(`Delete ${title}?`)) {
      blogService.deleteItem(id)
        .then(setBlogs( blogs.filter((a) => a.id !== id )))
    }
  }


  if (moreInfo === false) {
    return(
      <div>
        {blog.title}, by {blog.author} <button onClick={() => setMoreInfo(!moreInfo)}>Show</button>
      </div>
    )
  }

  else {
    return(
      <div>
        {blog.title}, by {blog.author}
        <button onClick={() => setMoreInfo(!moreInfo)}>Hide</button>
        <br></br> <b style={{ backgroundColor:'#f5fdf5', width:'200', fontSize:20 }}>URL: {blog.url}, LIKES: {blog.likes}</b>
        <button onClick={() => handleLike(blog.id, blog.user.id, blog.author, blog.title, blog.url, blog.likes) } >Like</button>
        <br></br>
        <button onClick={() => handleDelete(blog.id, blog.title) } >Delete</button>
      </div>
    )
  }

}

export default Blog

