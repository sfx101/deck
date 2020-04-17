# Docker Stacks
Docker Stacks is a laradock GUI build on top of docker, electron.js, node-pty, xterm.js and the awesome laradock

### Why a GUI?

- Starting, stopping, re-building is pretty painful when you're working on a number of projects
- Setting up more than one project requires a bit of expert knowledge in Laradock, especially when someone is getting started, the desktop app solves this problem by using random open ports without editing any server config
- Takes away the learning curve on knowing Laradock / Docker commands so that things can be done at the click of a button
- Developers who still rely on XAMPP / WAMP gets a look how powerful Docker is as a development environment
- Supports pre-build images for running Laravel or any PHP frameworks, Wordpress or any CMS in few mins


![Image description](https://github.com/softwarefreak/docker-stacks/blob/master/Screenshot%202020-04-12%20at%2011.33.41%20AM.png?raw=true)

#### Installation (MacOS)

Run in terminal, it will create a hidden data directory and pull docker images and other settings (review source by going to the GitHub page at https://github.com/softwarefreak/docker-stacks-data)

```
cd ~ && mkdir .docker-stacks && cd .docker-stacks && git clone https://github.com/softwarefreak/docker-stacks-data.git .

```

Next download the app here: https://github.com/sfx101/docker-stacks/releases/latest

MacOS will warn about the downloaded file as it's not a signed version, this is a developer preview. Before starting the app make sure you've docker running and have docker-compose installed

Once the app runs go to Images on the menu to spin up a new stack.

Create your own custom images and unleash the power of Laradock and DockerStacks by editing

```
.docker-stacks/storage/images.json
```
Review Laradock documentation for more info on custom images, https://laradock.io/documentation/
