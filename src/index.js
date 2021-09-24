import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<h1>Leslie here. This should help you get started on an app if you intend to host it on git Pages. <br/>
                    The most important thing to notice is that for webpack, what normally is the "dist" folder is now renamed "docs". <br/>
                    git Pages can only host from a folder named "docs" for some reason for now. <br/> Functionally they are equivalent. <br/>
                    Some other things: <br />
                    ~~~~ You will probably want to delete and add the bundle.js to gitignore until your app is ready to be hosted. <br />
                    ~~~~  .nojekyll - prevents Pages from applying site themes to your app <br />
                    ~~~~  docs/reset.css - prevents default browser css from messing with your own css. <a href="https://meyerweb.com/eric/tools/css/reset/">Source</a>
                    <br />
                    ~~~~ <a href="https://github.com/dootMaster/app-template-git-pages">Repo here.</a><br/>
                    ~~~~ <a href="https://docs.google.com/document/d/1WPxfLVLeJL16crd7BkGZYUVbkhIF9b7G53HRJr5u1ks/edit?usp=sharing">My resume.</a>
                </h1>, document.getElementById('root'));