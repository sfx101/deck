# DockerStacks
DockerStacks is a laradock GUI build on top of docker, electron.js, node-pty, xterm.js and the awesome laradock

### Why a GUI?

- Starting, stopping, re-building is pretty painful when you're working on a number of projects
- Setting up more than one project requires a bit of expert knowledge in Laradock, especially when someone is getting started, the desktop app solves this problem by using random open ports without editing any server config
- Takes away the learning curve on knowing Laradock / Docker commands so that things can be done at the click of a button
- Developers who still rely on XAMPP / WAMP gets a look how powerful Docker is as a development environment
- Supports pre-build images for running Laravel or any PHP frameworks, Wordpress or any CMS in few mins
- Built-in support for HTTPS with SSL certificates, zero configuration needed
- Advanced networking features to connect multiple stack containers



![Image description](https://github.com/sfx101/docker-stacks/blob/master/Kapture%202020-05-09%20at%2022.31.46.gif)

Download the app here: https://github.com/sfx101/docker-stacks/releases (Follow the instructions on the Release page)

#### Installation

https://docker-stacks.com/getting-started/installation/

#### Creating and starting stacks

https://docker-stacks.com/getting-started/creating-and-starting-stacks/

#### Opening codes and connecting to a stack

https://docker-stacks.com/getting-started/opening-codes-and-connecting-to-a-stack/


Create your own custom images and unleash the power of Laradock and DockerStacks by editing

```
~/.docker-stacks/storage/images.json
```
Review Laradock documentation for more info on custom images, https://laradock.io/documentation/
