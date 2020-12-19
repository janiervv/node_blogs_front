import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('Renders url and likes after open', async () => {
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

  const button = component.getByText('Show')
  fireEvent.click(button)

  component.debug()

  expect(component.container).toHaveTextContent(
    'Julkaisija 1'
  )

  expect(component.container).toHaveTextContent(
    'Otsikko 1'
  )

  expect(component.container).toHaveTextContent(
    'url.fi'
  )

  expect(component.container).toHaveTextContent(
    5
  )
})