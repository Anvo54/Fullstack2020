describe('Blog app, not logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', { username: 'testaaja', name: 'Testi Testaaja', password: 'salaisuus' })
    cy.request('POST', 'http://localhost:3000/api/users', { username: 'testaajakin', name: 'Testi Testaaja 2', password: 'salaisuus' })
    cy.visit('http://localhost:3000')
  })
  
  it('Login is shown', function() {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })
  it('Login fails', function() {
    cy.contains('login').click()
    cy.get('#username').type('123')
    cy.get('#password').type('123')
    cy.get('#login-button').click()
    cy.get('.errorMessage').should('contain', 'wrong credentials')
    cy.get('.errorMessage').should('have.css', 'color', 'rgb(169, 68, 66)')
  })
})

describe('When user is logged in', function() {
  it('Succeeds with correct credentials', function(){
    cy.login({username: 'testaaja', password: 'salaisuus' })
    cy.contains('Testi Testaaja logged in')
  })
  
  it('A new blog can be created', function() {
    cy.contains('New Blog').click()
    cy.get('#title').type('A great new blog!')
    cy.get('#author').type('The Blogger!')
    cy.get('#url').type('www.blogspotter5000.com')
    cy.get('#submit-button').click()
    cy.contains('A great new blog!')
    cy.contains('View')
  })
  
  it('Blog can be liked', function() {
    cy.contains('View').click()
    cy.contains('like').click()
    cy.contains('likes 1')
    cy.contains('Hide').click()
  })
  
  it('Blog cant be removed if another user', function() {
    cy.contains('logout').click()
    cy.login({username: 'testaajakin', password: 'salaisuus' })
    cy.contains('View').click()
    cy.get('#delete-button').should('not.exist')
    cy.contains('logout').click()
  })
  
  it('Blog can be removed', function() {
    cy.login({username: 'testaaja', password: 'salaisuus' })
    cy.contains('View').click()
    cy.contains('delete').click()
    cy.contains('Blog A great new blog! has been removed!')
    cy.contains('logout').click()
  })
})

describe('Blogs are sorted by must likes', function() {
  it('Working?', function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3000/api/users', { username: 'testaaja', name: 'Testi Testaaja', password: 'salaisuus' })
    cy.login({ username: 'testaaja', password: 'salaisuus' })
    
    // Create blogs

    cy.createBlog({
      author: 'dude',
      title: 'The blog 1',
      url: 'www.www.www',
      likes: 1
    })
    cy.createBlog({
      author: 'dude',
      title: 'The blog 2',
      url: 'www.www.www',
      likes: 5
    })
    cy.createBlog({
      author: 'dude',
      title: 'The blog 3',
      url: 'www.www.www',
      likes: 159
    })
    cy.createBlog({
      author: 'dude',
      title: 'The blog 4',
      url: 'www.www.www',
      likes: 0
    })
    cy.createBlog({
      author: 'dude',
      title: 'The blog 5',
      url: 'www.www.www',
      likes: 2000
    })
  })

  it('Sort test', function() {
    cy.get('.likes').then( likes => {
      cy.wrap(likes.text()).should('eq', '2000 159 5 1 0 ')
    })
  })
})