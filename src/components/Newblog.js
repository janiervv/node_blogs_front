import React from 'react'


const NewBlogForm =

({
  handlePost,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl
}) => {

  return(

    <div>
      <br></br>
      <b>New blog</b>
      <br></br>
      <form onSubmit={handlePost}>
        Title: <input
          id='title'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        ></input>
        <br></br>
        Author: <input
          id='author'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        ></input>
        <br></br>
        URL: <input
          id='url'
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        ></input>
        <br></br>
        <button type="submit">Save blog</button>
      </form>
    </div>
  )
}

export default NewBlogForm
