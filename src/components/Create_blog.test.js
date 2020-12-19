import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Newblog from './Newblog'

//ei toimi

test('Blogform works', () => {
  const handlePost = jest.fn()

  const component = render(
    <Newblog handlePost={handlePost} />
  )

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('#form')

  fireEvent.change(author, { 
    target: { author: 'Kirjailija' } 
  })
  component.debug()


  expect(handlePost.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('Kirjailija' )

})