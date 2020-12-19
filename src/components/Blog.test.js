import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Renders author and likes', () => {
  const blog = {
    user: "Käyttäjä 1",
    likes: 5,
    author: "Julkaisija 1",
    title: "Otsikko 1",
    url: "url.fi"
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Julkaisija 1'
  )

  expect(component.container).toHaveTextContent(
    'Otsikko 1'
  )

  expect(component.container).not.toHaveTextContent(
    'url.fi'
  )

  expect(component.container).not.toHaveTextContent(
    5
  )
})