import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

test('<CreateForm /> returns given content', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'The_Blog' }
  })

  fireEvent.change(author, {
    target: { value: 'The_Writer' }
  })

  fireEvent.change(url, {
    target: { value: 'www.url.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('The_Writer')
  expect(createBlog.mock.calls[0][0].title).toBe('The_Blog')
  expect(createBlog.mock.calls[0][0].url).toBe('www.url.com')
})