import React from "react";

const OneBlog = ({ blog, onClick }) => (
  <div>
    <div>
      {blog.title} {blog.author}
    </div>
    <div>
      <button onClick={onClick}>Like</button>
    </div>
  </div>
);

export default OneBlog;