import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog tests', () => {
  let component

  const blogContent = {
    title: 'Testattava',
    author: 'Testaaja',
    url: 'www.testaaja.fi',
    likes: 2,
    user : {
      name: 'Testeri'
    }
  }

  test('renders basic content', () => {
    component = render(
      <Blog blog={blogContent} />
    )
    const div = component.container.querySelector('.blogContent')

    expect(div).toHaveTextContent('Testattava')
    expect(div).toHaveTextContent('Testaaja')
    expect(div).not.toHaveTextContent('www.testaaja.fi')
    expect(div).not.toHaveTextContent(2)
  })

  test('renders all content', () => {
    component = render(
      <Blog blog={blogContent} />
    )
    const div = component.container.querySelector('.togglableBlogContent')

    expect(div).toHaveTextContent('Testattava')
    expect(div).toHaveTextContent('Testaaja')
    expect(div).toHaveTextContent('www.testaaja.fi')
    expect(div).toHaveTextContent(2)
  })

  test('Like handeler is being called twice', async () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blogContent} updateBlog={mockHandler} />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})