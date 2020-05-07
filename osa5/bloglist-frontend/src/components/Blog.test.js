import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blogContent = {
    title: 'Testattava',
    author: 'Testaaja',
    url: 'www.testaaja.fi',
    likes: 2,
    user : {
      name: 'Testeri'
    }
  }

  const component = render(
    <Blog blog={blogContent} />
  )

  const div = component.container.querySelector('.blogContent')

  expect(div).toHaveTextContent('Testattava')
  expect(div).toHaveTextContent('Testaaja')
  expect(div).not.toHaveTextContent('www.testaaja.fi')
  expect(div).not.toHaveTextContent(2)


})