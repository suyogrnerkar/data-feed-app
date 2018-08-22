# POSTS FEED APP :

The application was built using node.js as a server.

Following are the libraries used in the process
- Bootstrap - For Easy access to CSS classes
- tablesorter - A client side table sorting library.
- lodash - Utility functions toolkit
- express - As a router
- pug - Templates with express
- browserify - bundler for client side requires
- nodemon - a server hook to keep node.js server up to date with code

# Instructions to start the app.

Pretty much everything is already taken care of
and so minimal efforts are needed to get the server up and running

You must have node.js installed on your system to start serving
data feeds with the application.

Steps to follow to start the server :
- cd into the <app directory i.e. 'demo-app'> here via terminal.
- run `npm install`, this should install all the dependencies from npm
- then run  `npm run watch` which should pre-compile the app using browserify
  using the `prewatch` hook in the package.json file.
  We would need the watch command because we need the node server to serve
  the updated code every time we make some changes to data files which is how
  we are currently serving the data. In production, only `npm start` would suffice
  given we have a mechanism to reboot the server as an when it is killed.
- navigate to http://localhost:3000 in the browser and we should be served with
  data feeds if everything went well.

# Directories & files:
- client : client side code to be bundled with browserify
- server : server side code along with the data stored in
           run script, model to serve data (currently uses
           two files, articles and more_articles json files),
           views, router, etc.
- utils :  any utilities that may be required (time utils for now)
- Also, package.json and nodemon config files.

# Future refactoring :
- The code inside the routes could be moved to the respective models
  into the separate functions.
- The timeSince() utility function could has a better alternative
  Moment library but here it would have been an overkill.
