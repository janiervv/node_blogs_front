
  describe('Blog app opens', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'name',
        username: 'username',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('Log in to application')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('väärä')
      cy.get('#loginbutton').click()

      cy.contains('Wrong credentials')
    })

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('salainen')
      cy.get('#loginbutton').click()

      cy.contains('Logged in as')
    })

    it('blog can be added, liked and deleted', function() {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('salainen')
      cy.get('#loginbutton').click()

      cy.contains('New blog').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('Blog author')
      cy.get('#url').type('Blog url')

      cy.contains('Save blog').click()

      cy.contains('Blog Blog title was added')

      cy.contains('Show').click()
      cy.contains('Like').click()
      cy.contains('LIKES: 1')

      cy.contains('Delete').click()
      cy.get('Blog title').should('not.exist');
    })


  })
