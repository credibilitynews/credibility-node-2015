# credibility-2015

This is made in 2015 aimed for a revamped version of [Credibility 1.0](https://github.com/credibilitynews/credibility-webpy). However, it didn't make it to the production.


There were a few new things (in 2015) added here:
- [React 0.14](https://reactjs.org/blog/2015/10/07/react-v0.14.html)
- [Flux](https://facebook.github.io/flux/): state management
- [Falcor](https://netflix.github.io/falcor/): graphql competitor back then, made by netflix
- Server side Rendering - with ReactDOMServer and Falcor 
- [Passwordless](https://www.npmjs.com/package/passwordless): Password-free user authentication

In midst of reviving it, some of these are no longer working:
❌ Passwordless: passwordless-postgres caused package error.
❌ Server side rendering: browserify API changes and babel-node.

Added some updates as well:
- Replace gulp tasks to rollup 
- Replace ruby sass to node-sass 
- Remove bower, use npm bootstrap
- Use yarn workspace
- Use latest flux version
- Use react 15
