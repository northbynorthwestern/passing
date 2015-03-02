### *Passing*

> **\ˈpa:siŋ\** To be accepted as or believed to be, or to represent oneself successfully as, a member of an ethnic or religious group other than one's own, esp. one having higher social status; spec. (of a person of black ancestry in a racially segregated society) to be accepted as white.

[*Passing*](http://apps.northbynorthwestern.com/passing/) was a project published by [North by Northwestern](http://northbynorthwester.com) on March 1, 2015. It explores the phenomenon of Racial Passing through the stories of four Northwestern students.

**These are the contents of this README:**

* [What's in here?](#whats-in-here) — an introduction to the directories and files
* [Getting Started](#getting-started) — how to boostrap the project
* [Running the App](#whats-in-here) — how to run the project
* [Learning More](#bootstrap-the-project) — links to more resources


#### What's in Here

This app was scaffolded with the [`generator-webapp`](https://github.com/yeoman/generator-webapp) Yeoman generator. That generator creates a bunch of files, which can seem daunting and confusing. Hopefully this explains what the important things are and how it fits together.

  * `package.json` — this tells [`npm`](https://www.npmjs.com/) (that's the Node Package Manager) how to manage the project's dependencies. When you run `npm install`, the dependencies will be downloaded into a folder titled `node_modules`.
  * `bower.json` — this is like `package.json`, but it specifies the [Bower](http://bower.io/) dependencies. We use this to install things like Bourbon, Neat, jQuery, and jPlayer.
  * `Gruntfile.js` — [Grunt](http://gruntjs.com/) is a Javascript task runner. This file tells Grunt how to automate the development and production of the project.

Now let's take a look inside of `app/`:

* `index.html` — this is the HTML file that powers the app. For this project, we just used a single HTML page, with no additional templates or frameworks.
* `styles/main.scss` — this is the main Sass file that powers the project's stylesheet. It imports all of the other stylesheets in the folder, as well as Bourbon and Neat from the `bower_components` (this happens because of [this part](https://github.com/northbynorthwestern/passing/blob/master/Gruntfile.js#L192-L202) of the Gruntfile). When the project is built, Grunt also [compiles the Sass](https://github.com/northbynorthwestern/passing/blob/master/Gruntfile.js#L152-L175) and autoprefixes the CSS.
* `scripts/main.js` — the JavaScript file that creates most of the app's interactions.

### Getting Started

Please note – this guide assumes you are using OS X. If you aren't, you hopefully know the equivalent commands to make these things happen. If you don't, find someone to help you!

First, clone this project:

```shell
git clone git@github.com:northbynorthwestern/passing.git
cd passing
```

This project was built using [`generator-webapp`](https://github.com/yeoman/generator-webapp), so it requires you to have Node installed, as well as a few other things. **If you already have Node installed, along with Bower, Grunt, and Yeoman you can skip this step.** If you don't have those things installed, that's awesome — let's install them!

To install Node, check out these [instructions by the NPR Visuals team](http://blog.apps.npr.org/2013/06/06/how-to-setup-a-developers-environment.html) to get started (it's Chapter 3 of that page, but you should really read the whole thing). Once you have Node installed, you can install the other dependencies by running these commands.

```shell
npm install -g bower
npm install -g grunt-cli
npm install -g yo
```

**Note**: The `-g` means you are installing those modules globally on your machine, which means it doesn't matter which directory you are in. Contrast this command with a couple steps from now where we will use `npm install` without the global flag, because we are installing that project's local dependencies.

You'll also need to have [Sass](http://sass-lang.com/) installed. If you don't have it installed, it's as simple as:

```shell
sudo gem install sass
```

Once you have Node (and Bower and Grunt and Yeoman and Sass) installed (phew!), we can install the project's dependencies with this command:

```shell
npm install && bower install
```

You should see two new folders in your project, `node_modules` and `bower_components` where these files have been installed.

And that should be it! You're ready to run the app on your local machine.

### Running the App

There are a few different terminal commands you can use build the app:

* `grunt serve` - preview locally
* `grunt serve:dist` - build and preview the distribution, locally
* `grunt build` - build the distribution (without tests)
* `grunt` - build the distribution (with tests)
* `grunt test` - test the app

After running one of the `serve` commands, the project will open up (automatically) in your browser at `http://localhost:9000`. If you need to deploy the app, any one of the `build` commands will create a directory in the project called `dist`. You can just copy and paste the outputted files onto your webserver. (We uploaded them to an Amazon S3 bucket using [Cyberduck](https://cyberduck.io/?l=en)).

Grunt compiles the Sass, minifies images, stylesheets and scripts, autoprefix your CSS, along with a host of other nifty little things to make the project load faster and automate development. To learn more about what each of these commands does, check `Gruntfile.js`, in the project's root directory.

### Learning More

If you want to learn more about the tools we used to build this project, here are some good links.

**Grunt**

* [http://gruntjs.com/]()
* [http://www.smashingmagazine.com/2013/10/29/get-up-running-grunt/]()
* [http://24ways.org/2013/grunt-is-not-weird-and-hard/]()

**Yeoman**

* [http://yeoman.io/]()
* [http://juristr.com/blog/2014/08/node-grunt-yeoman-bower/]()
* [http://blog.teamtreehouse.com/improving-development-workflow-yeoman]()
* [http://code.tutsplus.com/tutorials/building-apps-with-the-yeoman-workflow--net-33254]()

**Bower**

* [http://bower.io/]()
* [http://tech.pro/tutorial/1190/package-managers-an-introductory-guide-for-the-uninitiated-front-end-developer]()

**Sass, Bourbon and Neat**
* [http://sass-lang.com/]()
* [http://blog.teamtreehouse.com/the-absolute-beginners-guide-to-sass]()
* [http://alistapart.com/article/getting-started-with-sass]()
* [http://alistapart.com/article/why-sass]()
* [https://css-tricks.com/sass-vs-less/]()
* [http://bourbon.io/]()
* [http://neat.bourbon.io/]()
* [http://www.creativebloq.com/css3/create-responsive-grid-layouts-bourbon-neat-31410907]()
