# What is WordPress?

> WordPress is one of the most versatile open source content management systems on the market. WordPress is built for high performance and is scalable to many servers, has easy integration via REST, JSON, SOAP and other formats, and features a whopping 15,000 plugins to extend and customize the application for just about any type of website.

[https://www.wordpress.org/](https://www.wordpress.org/)

# TL;DR

## Docker Compose

```console
$ git clone https://github.com/deck-app/WordPress.git
$ docker-compose up
```

You can find the default credentials and available configuration options in the [Environment Variables](#environment-variables) section.

# Why use Bitnami Images?

* Bitnami closely tracks upstream source changes and promptly publishes new versions of this image using our automated systems.
* With Bitnami images the latest bug fixes and features are available as soon as possible.
* Bitnami containers, virtual machines and cloud images use the same components and configuration approach - making it easy to switch between formats based on your project needs.
* All our images are based on [minideb](https://github.com/bitnami/minideb) a minimalist Debian based container image which gives you a small base container image and the familiarity of a leading Linux distribution.
* All Bitnami images available in Docker Hub are signed with [Docker Content Trust (DCT)](https://docs.docker.com/engine/security/trust/content_trust/). You can use `DOCKER_CONTENT_TRUST=1` to verify the integrity of the images.
* Bitnami container images are released daily with the latest distribution packages available.

> This [CVE scan report](https://quay.io/repository/bitnami/wordpress?tab=tags) contains a security report with all open CVEs. To get the list of actionable security issues, find the "latest" tag, click the vulnerability report link under the corresponding "Security scan" field and then select the "Only show fixable" filter on the next page.

# How to deploy WordPress in Kubernetes?

Deploying Bitnami applications as Helm Charts is the easiest way to get started with our applications on Kubernetes. Read more about the installation in the [Bitnami WordPress Chart GitHub repository](https://github.com/bitnami/charts/tree/master/bitnami/wordpress).

Bitnami containers can be used with [Kubeapps](https://kubeapps.com/) for deployment and management of Helm Charts in clusters.

# Why use a non-root container?

Non-root container images add an extra layer of security and are generally recommended for production environments. However, because they run as a non-root user, privileged tasks are typically off-limits. Learn more about non-root containers [in our docs](https://docs.bitnami.com/tutorials/work-with-non-root-containers/).

# Supported tags and respective `Dockerfile` links

Learn more about the Bitnami tagging policy and the difference between rolling tags and immutable tags [in our documentation page](https://docs.bitnami.com/tutorials/understand-rolling-tags-containers/).


* [`5`, `5-debian-10`, `5.6.1`, `5.6.1-debian-10-r1`, `latest` (5/debian-10/Dockerfile)](https://github.com/bitnami/bitnami-docker-wordpress/blob/5.6.1-debian-10-r1/5/debian-10/Dockerfile)

Subscribe to project updates by watching the [bitnami/wordpress GitHub repo](https://github.com/bitnami/bitnami-docker-wordpress).

# Prerequisites

To run this application you need [Docker Engine](https://www.docker.com/products/docker-engine) >= `1.10.0`. [Docker Compose](https://www.docker.com/products/docker-compose) is recommended with a version `1.6.0` or later.

# How to use this image

WordPress requires access to a MySQL or MariaDB database to store information. We'll use our very own [MariaDB image](https://www.github.com/bitnami/bitnami-docker-mariadb) for the database requirements.

## Run the application using Docker Compose

The main folder of this repository contains a functional [`docker-compose.yml`](https://github.com/bitnami/bitnami-docker-wordpress/blob/master/docker-compose.yml) file. Run the application using it as shown below:

```console
$ git clone https://github.com/deck-app/WordPress.git
$ docker-compose up -d
```

## Using the Docker Command Line

If you want to run the application manually instead of using `docker-compose`, these are the basic steps you need to run:

### Step 1: Create a network

```console
$ docker network create wordpress-network
```

### Step 2: Create a volume for MariaDB persistence and create a MariaDB container

```console
$ docker volume create --name mariadb_data
$ docker run -d --name mariadb \
  --env ALLOW_EMPTY_PASSWORD=yes \
  --env MARIADB_USER=bn_wordpress \
  --env MARIADB_DATABASE=bitnami_wordpress \
  --network wordpress-network \
  --volume mariadb_data:/bitnami/mariadb \
  bitnami/mariadb:latest
```

### Step 3: Create volumes for WordPress persistence and launch the container

```console
$ docker volume create --name wordpress_data
$ docker run -d --name wordpress \
  -p 8080:8080 -p 8443:8443 \
  --env ALLOW_EMPTY_PASSWORD=yes \
  --env WORDPRESS_DATABASE_USER=bn_wordpress \
  --env WORDPRESS_DATABASE_NAME=bitnami_wordpress \
  --network wordpress-network \
  --volume wordpress_data:/bitnami/wordpress \
  bitnami/wordpress:latest
```

Access your application at http://your-ip/

## Persisting your application

If you remove the container all your data and configurations will be lost, and the next time you run the image the database will be reinitialized. To avoid this loss of data, you should mount a volume that will persist even after the container is removed.

For persistence you should mount a volume at the `/bitnami/wordpress` path. Additionally you should mount a volume for [persistence of the MariaDB data](https://github.com/bitnami/bitnami-docker-mariadb#persisting-your-database).

The above examples define docker volumes namely `mariadb_data` and `wordpress_data`. The Wordpress application state will persist as long as these volumes are not removed.

To avoid inadvertent removal of these volumes you can [mount host directories as data volumes](https://docs.docker.com/engine/tutorials/dockervolumes/). Alternatively you can make use of volume plugins to host the volume data.

### Mount host directories as data volumes with Docker Compose

This requires a minor change to the [`docker-compose.yml`](https://github.com/bitnami/bitnami-docker-wordpress/blob/master/docker-compose.yml) file present in this repository:

```diff
 ...
 services:
   mariadb:
     ...
     volumes:
-      - 'mariadb_data:/bitnami/mariadb'
+      - /path/to/mariadb-persistence:/bitnami/mariadb
   ...
   wordpress:
      ...
     volumes:
-      - 'wordpress_data:/bitnami/wordpress
+      - /path/to/wordpress-persistence:/bitnami/wordpress
   ...
-volumes:
-  mariadb_data:
-    driver: local
-  wordpress_data:
-    driver: local
```

> NOTE: As this is a non-root container, the mounted files and directories must have the proper permissions for the UID `1001`.

### Mount host directories as data volumes using the Docker command line

#### Step 1: Create a network (if it does not exist)

```console
$ docker network create wordpress-network
```

#### Step 2. Create a MariaDB container with host volume

```console
$ docker run -d --name mariadb \
  --env ALLOW_EMPTY_PASSWORD=yes \
  --env MARIADB_USER=bn_wordpress \
  --env MARIADB_DATABASE=bitnami_wordpress \
  --network wordpress-network \
  --volume /path/to/mariadb-persistence:/bitnami/mariadb \
  bitnami/mariadb:latest
```

> NOTE: As this is a non-root container, the mounted files and directories must have the proper permissions for the UID `1001`.

#### Step 3. Create the WordPress the container with host volumes

```console
$ docker run -d --name wordpress \
  -p 8080:8080 -p 8443:8443 \
  --env ALLOW_EMPTY_PASSWORD=yes \
  --env WORDPRESS_DATABASE_USER=bn_wordpress \
  --env WORDPRESS_DATABASE_NAME=bitnami_wordpress \
  --network wordpress-network \
  --volume /path/to/wordpress-persistence:/bitnami/wordpress \
  bitnami/wordpress:latest
```

> NOTE: As this is a non-root container, the mounted files and directories must have the proper permissions for the UID `1001`.

# Upgrading WordPress

Bitnami provides up-to-date versions of MariaDB and WordPress, including security patches, soon after they are made upstream. We recommend that you follow these steps to upgrade your container. We will cover here the upgrade of the WordPress container. For the MariaDB upgrade see https://github.com/bitnami/bitnami-docker-mariadb/blob/master/README.md#upgrade-this-image

The `bitnami/wordpress:latest` tag always points to the most recent release. To get the most recent release you can simple repull the `latest` tag from the Docker Hub with `docker pull bitnami/wordpress:latest`. However it is recommended to use [tagged versions](https://hub.docker.com/r/bitnami/wordpress/tags/).

## Step 1. Get the updated images:

```console
$ docker pull bitnami/wordpress:latest
```

## Step 2. Stop your container

* For docker-compose: `$ docker-compose stop wordpress`
* For manual execution: `$ docker stop wordpress`

## Step 3. Take a snapshot of the application state

```console
$ rsync -a /path/to/wordpress-persistence /path/to/wordpress-persistence.bkp.$(date +%Y%m%d-%H.%M.%S)
```

Additionally, [snapshot the MariaDB data](https://github.com/bitnami/bitnami-docker-mariadb#step-2-stop-and-backup-the-currently-running-container)

You can use these snapshots to restore the application state should the upgrade fail.

## Step 4. Remove the stopped container

* For docker-compose: `$ docker-compose rm wordpress`
* For manual execution: `$ docker rm wordpress`

## Step 5. Run the new image

* For docker-compose: `$ docker-compose up wordpress`
* For manual execution ([mount](#mount-persistent-folders-manually) the directories if needed): `docker run --name wordpress bitnami/wordpress:latest`

# Configuration

## Environment variables

The WordPress instance can be customized by specifying environment variables on the first run. The following environment values are provided to custom WordPress:

##### User and Site configuration

* `WORDPRESS_USERNAME`: WordPress application username. Default: **user**
* `WORDPRESS_PASSWORD`: WordPress application password. Default: **bitnami**
* `WORDPRESS_EMAIL`: WordPress application email. Default: **user@example.com**
* `WORDPRESS_FIRST_NAME`: WordPress user first name. Default: **FirstName**
* `WORDPRESS_LAST_NAME`: WordPress user last name. Default: **LastName**
* `WORDPRESS_BLOG_NAME`: WordPress blog name. Default: **User's blog**
* `WORDPRESS_SCHEME`: Scheme to generate application URLs. Default: **http**
* `WORDPRESS_HTACCESS_OVERRIDE_NONE`: Set the Apache `AllowOverride` variable to `None`. All the default directives will be loaded from `/opt/bitnami/wordpress/wordpress-htaccess.conf`. Default: **yes**.
* `WORDPRESS_HTACCESS_PERSISTENCE_ENABLED`: Persist the custom changes of the htaccess. It depends on the value of `WORDPRESS_HTACCESS_OVERRIDE_NONE`, when `yes` it will persist `/opt/bitnami/wordpress/wordpress-htaccess.conf` if `no` it will persist `/opt/bitnami/wordpress/.htaccess`. Default: **no**.
* `WORDPRESS_RESET_DATA_PERMISSIONS`: Force reseting ownership/permissions on persisted data when restarting WordPress, otherwise it assumes the ownership/permissions are correct. Ignored when running WP as non-root. Default: **no**

##### Use an existing database

* `MARIADB_HOST`: Hostname for MariaDB server. Default: **mariadb**
* `MARIADB_PORT_NUMBER`: Port used by MariaDB server. Default: **3306**
* `WORDPRESS_DATABASE_NAME`: Database name that WordPress will use to connect with the database. Default: **bitnami_wordpress**
* `WORDPRESS_TABLE_PREFIX`: Table prefix to use in WordPress. Default: **wp_**
* `WORDPRESS_DATABASE_USER`: Database user that WordPress will use to connect with the database. Default: **bn_wordpress**
* `WORDPRESS_DATABASE_PASSWORD`: Database password that WordPress will use to connect with the database. No defaults.
* `WORDPRESS_SKIP_INSTALL`: Force the container to not execute the WordPress installation wizard. This is necessary in case you use a database that already has WordPress data. Default: **no**
* `ALLOW_EMPTY_PASSWORD`: It can be used to allow blank passwords. Default: **no**

##### Create a database for WordPress using mysql-client

* `MARIADB_HOST`: Hostname for MariaDB server. Default: **mariadb**
* `MARIADB_PORT_NUMBER`: Port used by MariaDB server. Default: **3306**
* `MARIADB_ROOT_USER`: Database admin user. Default: **root**
* `MARIADB_ROOT_PASSWORD`: Database password for the `MARIADB_ROOT_USER` user. No defaults.
* `MYSQL_CLIENT_CREATE_DATABASE_NAME`: New database to be created by the mysql client module. No defaults.
* `WORDPRESS_TABLE_PREFIX`: Table prefix to use in WordPress. Default: **wp_**
* `MYSQL_CLIENT_CREATE_DATABASE_USER`: New database user to be created by the mysql client module. No defaults.
* `MYSQL_CLIENT_CREATE_DATABASE_PASSWORD`: Database password for the `MYSQL_CLIENT_CREATE_DATABASE_USER` user. No defaults.
* `ALLOW_EMPTY_PASSWORD`: It can be used to allow blank passwords. Default: **no**

##### PHP configuration

* `PHP_MEMORY_LIMIT`: Memory limit for PHP scripts. Default: **256M**
* `PHP_OPCACHE_ENABLED`: Enable opcache for PHP scripts. Default: **yes**

### Specifying Environment variables using Docker Compose

This requires a minor change to the [`docker-compose.yml`](https://github.com/bitnami/bitnami-docker-wordpress/blob/master/docker-compose.yml) file present in this repository:

```yaml
services:
  mariadb:
  ...
    environment:
      - MARIADB_USER=bn_wordpress
      - MARIADB_DATABASE=bitnami_wordpress
      - ALLOW_EMPTY_PASSWORD=yes
  ...
  wordpress:
  ...
    environment:
      - MARIADB_HOST=mariadb
      - MARIADB_PORT_NUMBER=3306
      - WORDPRESS_DATABASE_USER=bn_wordpress
      - WORDPRESS_DATABASE_NAME=bitnami_wordpress
      - ALLOW_EMPTY_PASSWORD=yes
  ...
```

### Specifying Environment variables on the Docker command line

```console
$ docker run -d --name wordpress \
  -p 8080:8080 -p 8443:8443 \
  --network wordpress-network \
  --env ALLOW_EMPTY_PASSWORD=yes \
  --env WORDPRESS_DATABASE_USER=bn_wordpress \
  --env WORDPRESS_DATABASE_NAME=bitnami_wordpress \
  --env WORDPRESS_PASSWORD=my_password \
  --volume wordpress_data:/bitnami/wordpresss \
  bitnami/wordpress:latest
```

### SMTP Configuration

To configure WordPress to send email using SMTP you can set the following environment variables:

* `SMTP_HOST`: Host for outgoing SMTP email. No defaults.
* `SMTP_PORT`: Port for outgoing SMTP email. No defaults.
* `SMTP_USER`: User of SMTP used for authentication (likely email). No defaults.
* `SMTP_PASSWORD`: Password for SMTP. No defaults.
* `SMTP_PROTOCOL`: Secure connection protocol to use for SMTP [tls, ssl, none]. No defaults.

This would be an example of SMTP configuration using a GMail account:

* Modify the [`docker-compose.yml`](https://github.com/bitnami/bitnami-docker-wordpress/blob/master/docker-compose.yml) file present in this repository:

```diff
   wordpress:
     ...
     environment:
       - MARIADB_HOST=mariadb
       - MARIADB_PORT_NUMBER=3306
       - WORDPRESS_DATABASE_USER=bn_wordpress
       - WORDPRESS_DATABASE_NAME=bitnami_wordpress
       - ALLOW_EMPTY_PASSWORD=yes
+      - SMTP_HOST=smtp.gmail.com
+      - SMTP_PORT=587
+      - SMTP_USER=your_email@gmail.com
+      - SMTP_PASSWORD=your_password
+      - SMTP_PROTOCOL=tls
    ...
```

* For manual execution:

```console
$ docker run -d --name wordpress \
  -p 8080:8080 -p 8443:8443 \
  --network wordpress-network \
  --env SMTP_HOST=smtp.gmail.com --env SMTP_PORT=587 \
  --env SMTP_USER=your_email@gmail.com --env SMTP_PASSWORD=your_password \
  --env ALLOW_EMPTY_PASSWORD=yes --env WORDPRESS_DATABASE_USER=bn_wordpress \
  --env WORDPRESS_DATABASE_NAME=bitnami_wordpress \
  --volume wordpress_data:/bitnami/wordpress \
  bitnami/wordpress:latest
```

### Connect WordPress docker container to an existing database

The Bitnami WordPress container supports connecting the WordPress application to an external database. In order to configure it, you should set the following environment variables:

* `MARIADB_HOST`: Hostname for MariaDB server. Default: **mariadb**
* `MARIADB_PORT_NUMBER`: Port used by MariaDB server. Default: **3306**
* `WORDPRESS_DATABASE_NAME`: Database name that WordPress will use to connect with the database. Default: **bitnami_wordpress**
* `WORDPRESS_DATABASE_USER`: Database user that WordPress will use to connect with the database. Default: **bn_wordpress**
* `WORDPRESS_DATABASE_PASSWORD`: Database password that WordPress will use to connect with the database. No defaults.
* `WORDPRESS_DATABASE_SSL_CA_FILE`: Certificate to connect with the database using SSL. No defaults.

This would be an example of using an external database for WordPress.

* Modify the [`docker-compose.yml`](https://github.com/bitnami/bitnami-docker-wordpress/blob/master/docker-compose.yml) file present in this repository:

```diff
   wordpress:
     ...
     environment:
-      - MARIADB_HOST=mariadb
+      - MARIADB_HOST=mariadb_host
       - MARIADB_PORT_NUMBER=3306
       - WORDPRESS_DATABASE_NAME=wordpress_db
       - WORDPRESS_DATABASE_USER=wordpress_user
-      - ALLOW_EMPTY_PASSWORD=yes
+      - WORDPRESS_DATABASE_PASSWORD=wordpress_password
     ...
```

* For manual execution:

```console
$ docker run -d --name wordpress\
  -p 8080:8080 -p 8443:8443 \
  --network wordpress-network \
  --env MARIADB_HOST=mariadb_host \
  --env MARIADB_PORT_NUMBER=3306 \
  --env WORDPRESS_DATABASE_NAME=wordpress_db \
  --env WORDPRESS_DATABASE_USER=wordpress_user \
  --env WORDPRESS_DATABASE_PASSWORD=wordpress_password \
  --volume wordpress_data:/bitnami/wordpress \
  bitnami/wordpress:latest
```

In case the database already contains data from a previous WordPress installation, you need to set the variable `WORDPRESS_SKIP_INSTALL` to `yes`. Otherwise, the container would execute the installation wizard and could modify the existing data in the database. Note that, when setting `WORDPRESS_SKIP_INSTALL` to `yes`, the values `WORDPRESS_USERNAME`, `WORDPRESS_PASSWORD`, `WORDPRESS_BLOG_NAME`, `WORDPRESS_EMAIL`, `WORDPRESS_BLOG_NAME` and `WORDPRESS_SMTP_*` variables will be ignored. Make sure that, in this imported database, the table prefix matches the one set in `WORDPRESS_TABLE_PREFIX`.

## WP-CLI tool

The Bitnami WordPress container includes the command line interface **wp-cli** that can help you to manage and interact with your WP sites. To run this tool, please note you need use the proper system user, **daemon**.

This would be an example of using **wp-cli** to display the help menu:

* Using `docker-compose` command:

```console
$ docker-compose exec wordpress wp help
```

* Using `docker` command:

```console
$ docker exec wordpress wp help
```
