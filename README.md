# Docker Stacks
Docker Stacks is a laradock GUI build on top of docker, electron.js, node-pty, xterm.js and the awesome laradock

### Why a GUI?

- Starting, stopping, re-building is pretty painful when you're working on a number of projects
- Setting up more than one project requires a bit of expert knowledge in Laradock, especially when someone is getting started, the desktop app solves this problem by using random open ports without editing any server config
- Takes away the learning curve on knowing Laradock / Docker commands so that things can be done at the click of a button
- Developers who still rely on XAMPP / WAMP gets a look how powerful Docker is as a development environment
- Supports pre-build images for running Laravel or any PHP frameworks, Wordpress or any CMS in few mins


![Image description](https://raw.githubusercontent.com/sfx101/docker-stacks/master/Docker%20Stacks%20Screenshot.png?raw=true)

#### Installation

Download the app here: https://github.com/sfx101/docker-stacks/releases/latest (Follow the instructions on the Release page)

Once the app runs go to Images on the menu to spin up a new stack.

Create your own custom images and unleash the power of Laradock and DockerStacks by editing

```
~/.docker-stacks/storage/images.json
```
Review Laradock documentation for more info on custom images, https://laradock.io/documentation/
