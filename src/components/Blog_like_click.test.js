import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './OneBlogForTest'

test('Like can be clicked twice', async () => {
  const blog = {
    user: "Käyttäjä 1",
    likes: 5,
    author: "Julkaisija 1",
    title: "Otsikko 1",
    url: "url.fi"
  }

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} onClick={mockHandler} />)
    const likebutton = component.getByText('Like')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
