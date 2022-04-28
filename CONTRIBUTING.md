# Contributing to DECK

Thank you for taking your time and contribute, we feel very generous about your suppport in making DECK a better application!

DECK is a powerful and high performant local web development studio, it is powered by Docker and all apps in Marketplace are basically docker-compose projects.
Your contributions on DECK will be listed on the in-app Marketplace which developers can download and install.

The [Open Source Guides](https://opensource.guide/) website has a collection of resources for individuals, communities, and companies. These resources help people who want to learn how to run and contribute to open source projects. Contributors and people new to open source alike will find the following guides especially useful:

* [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
* [Building Welcoming Communities](https://opensource.guide/building-community/)

## Development setup

1. Clone the repo at ~/.deck
2. Download the latest release of DECK from the GitHub releases page
3. Install & run DECK (Once the app loads, it tries to detect whether ~/.deck is a git repository, that's why #1 is required for development setup)

## Developing marketplace apps

You can create any Docker project and release it as a marketplace app, a few things to note before making it compatible

1. Create a file with the name `settings.yml`, this is for rendering the "Configure & deploy UI". 
For instance, you can collect user inputs (PHP version) and store it in `.env` as `PHP_VERSION={selected version}`

```
php_version:
  label:
    PHP version
  hint:
    Select a PHP version from the list above
  type:
    select
  values:
    - "7.0"
    - 7.1
    - 7.2
    - 7.3
    - 7.4
  target:
    PHP_VERSION
```

2. If your app needs a directory which developers can also access and edit code then use the below 

```
show_localpath_selector:
    true
```
An example use case is if you're building an app for a Framework where developers need to write their own code

3. For collecting database credentials and saving then in `.env`

```
db_credentials:
  true
```
Following are the variable auto created in `.env`
```
DB_NAME
DB_USER
DB_PASSWORD
```
4. Auto generate public ports for your containers

```
ports:
  http:
    NGINX_HOST_HTTP_PORT
  others:
    - MYSQL_PORT
    - PMA_PORT
```

`http:` is opened when users click on "Open App", the ports are generated randomly based on open ports available in host machine

Review the following files to understand how the settings.yml file works

https://github.com/deck-app/lemp-stack/blob/master/settings.yml<br>
https://github.com/deck-app/lemp-stack/blob/master/docker-compose.yml

### Adding entry to images.json
`~/.docker-stacks/storage/images.json`
```
{
  "@AppID": "lamp-20012021",
  "@AppName": "LAMP",
  "@Logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Apache_Feather_Logo.svg/100px-Apache_Feather_Logo.svg.png",
  "@Description": "Perfect web development stack built with PHP, Apache, Mysql on Alpine Linux",
  "@Tags": ["apache", "mysql", "php", "alpine"],
  "@Website": "https://get-deck.com",
  "@Github": "deck-app/lamp-stack"
},
```
`@Github` is the repo where you project is hosted<br>
`"@Website"`, is your personal or business website

Once you add your entry to `images.json` the app will show on DECK's in-app marketplace. Launch DECK and test it out to see if it's working properly.
Review the generated `.env` file to verify if it was generated with proper inputs given by you on the "Configure & deploy UI" screen.


## Pull requests

Make sure your Github repo has a README.md file like below containing a documentation on how to modify / change the Docker project

https://github.com/deck-app/lemp-stack/blob/master/README.md

Commit changes on `~/.docker-stacks/storage/images.json` and create a pull request. We'll review your PR and merge it to the latest stable branch.
