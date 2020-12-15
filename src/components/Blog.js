import React, {useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs, blogs }) => {
  
  const [moreInfo, setMoreInfo] = useState(false)


  const handleLike = (id, user, author, title, url, likes) => {

     console.log("Please like " + id, user, author, title, url, likes)

     const updatedBlog = 
      {
        user: user,
        likes: likes + 1,
        author: author,
        title: title,
        url: url,
        id: id
      }

     blogService.addLike(updatedBlog)
     .then(blogService.getAll().then(blogs =>
      setBlogs( blogs )
    ) 

     )
     .catch((err) => {
      console.error(err);
    });
    }

    const handleDelete = (id) => {
      blogService.deleteItem(id)
      .then(blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
      )
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
        <br></br> <b style={{backgroundColor:"#f5fdf5", width:"200", fontSize:20}}>URL: {blog.url}, LIKES: {blog.likes}</b> 
        <button onClick={() => handleLike(blog.id, blog.user.id, blog.author, blog.title, blog.url, blog.likes) } >Like</button> 
        <br></br>
        <button onClick={() => handleDelete(blog.id) } >Delete</button> 
      </div>
    )
  }

}

export default Blog

