###Passing

####Getting Started

Please note – this guide assumes you are using OS X. If you aren't, you hopefully know the equivalent commands to make these things happen. If you don't, find someone to help you!

First, clone this project:

```shell
git clone git@github.com:northbynorthwestern/passing.git
cd passing
```

This project was built using [`generator-webapp`](https://github.com/yeoman/generator-webapp), so it requires you to have Node installed, as well as a few other things. **If you already have Node installed, along with Bower, Grunt, and Yeoman you can skip this step.** If you don't have those things installed, that's awesome — let's install them! To install Node, check out these [instructions by the NPR Visuals team](http://blog.apps.npr.org/2013/06/06/how-to-setup-a-developers-environment.html) to get started (it's Chapter 3 of that page, but you should really read the whole thing). Once you have Node installed, you can install the other dependencies by running these commands.

```shell
npm install -g bower
npm install -g grunt-cli
npm install -g yo
```

Once you have Node (and Bower, Grunt, and Yeoman) installed, we can install the project's dependencies with this command:

```shell
npm install && bower install
```

And that should be it! You're ready to run the app on your local machine.

#### Running the App

There are a few different commands you can build the app, each uses Grunt.

* `grunt serve` - preview locally
* `grunt serve:dist` - preview the distribution, locally
* `grunt build` - build the distribution (without tests)
* `grunt` - build the distribution (with tests)
* `grunt test` - test the app

Grunt compiles the Sass, minifies images, stylesheets and scripts, autoprefix your CSS, along with a host of other nifty little things to make the project load faster and automate development. To learn more about what each of these commands does, check `Gruntfile.js`, in the project's root directory.



