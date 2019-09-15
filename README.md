# Curlify

A one stop shop for testing REST and GraphQL APIs: https://mattamorphic.github.io/curlify

## Overview
Throughout my career I've often had to provide examples illustrating how an API should, or shouldn't work. The industry standard approach to this is to provide a curl example, that expresses the HTTP method used, any specific HTTP headers sent with the request, the destination, and, depending on the request - a payload.

Usually, providing a simple request, is relatively straight forward - a GET for example can be as simple as:

```
curl https://api.github.com/user/octocat
```

However, imagine you add a preview header, an authorization header, and you are making a POST request with GraphQL, and this little curl expression is already increasing in size and scope:

```
curl -X POST \
-H "Authorization: bearer :token" \
-d '{"query":"query { viewer { name repositories(last: 3) { nodes { name } } } } "}' \
https://api.github.com/users/octocat
```

This is a relatively simple query:
```
query {
  viewer {
    name
    repositories(last: 3) {
      nodes {
        name
      }
    }
  }
}
```

Now imagine you are looking at a query that goes deeper, this can quickly become hard to work with:

```
curl -X POST \
-H "Authorization: bearer :token" \
-d '{"query":"{ repository(owner: \"Mattamorphic\", name: \"DataCruncher\") { issues(first: 10) { nodes { number title timelineItems(first: 50) { nodes { __typename ... on LabeledEvent { label { name } } ... on IssueComment { body } } } } } }}"}' \
https://api.github.com/users/octocat
```

You can see a stray character here, a non-escaped new line here - can lead to you staring blankly at a terminal for anywhere upto twenty minutes.

Presenting, Curlify!

## Features

- On the fly translation from form input to curl and back again
- Code editor area for modifying JSON / GraphQL payloads
- Query parameter support
- Customisable HTTP headers with auto complete for common headers, and custom values
- Collapsible, mobile first, interface
- Copy button for curl / payload
- Prettier button for JSON / GraphQL payloads
- Local history (browser session) store, with search / loading capacity
- Proxying requests through a service to prevent CORs issues and provide full HTTP responses
- Full HTTP response headers returned in an easy to read table
- Raw Payload returned as a string
- JSON payload returned with syntax highlighting

## Coming soon
- Variable handling with GraphQL
- Searchable responses
- Copy response key/value on click
- Copy response http header on click
- Variable support for sanitised output / copy
- Better editor for JSON / GraphQL payloads
- History export
- Recordable queries

## Reasoning

- Fed up with trying to modify curl commands that continue growing in complexity
- Fed up with trying to dissect curl commands that continue growing in complexity
- Working with GraphQL / JSON APIs and curl
- An opportunity to visit Typescript and ReactJS


## Tutorial

Coming soon.


## Technology used
- Create react app
- Typescript
- GitHub Pages
- Heroku (Proxy)

## Contributing / Building Locally

Pull requests and changes welcome :heart: 

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run lint`

Run ESLint across the project and check to check the code.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
