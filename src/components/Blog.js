import React, {useState} from 'react'

const Blog = ({ blog }) => {
  const [moreInfo, setMoreInfo] = useState(false)

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
        {blog.title}, by {blog.author} <br></br> <b style={{backgroundColor:"#f5fdf5", width:"200", fontSize:20}}>URL: {blog.url}, LIKES: {blog.likes}</b> <button onClick={() => setMoreInfo(!moreInfo)}>Hide</button>
      </div>
    )
  }

}

export default Blog

