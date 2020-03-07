# Shuttle

Social network application. Backend

## Install & setup

1. git clone https://github.com/Shilza/Shuttle
2. npm install
3. Create MySQL database
4. Create .env file with custom settings. You can find example in the root directory of Shuttle project with name .env.example
5. adonis key:generate
6. Add api key by API_IPSTACK_KEY in .env file (Optional. For location detection)
7. adonis migration:run
8. adonis seed
9. npm run start

## Stack

* AdonisJS
* Lucid ORM
* MySQL

## Services

* Cloudinary
* Ipstack
* Herkou
* Db4free

## Features

You can:
* Share posts (images, videos)
* Crop image inside application
* Add filters for images
* Comment on posts
* Like posts/comments
* Check feed
* Manage account privacy
* Add users to blacklist
* Remove blacklisted users
* Archive posts
* Edit account public data
* Get list of followers
* Get list of liked posts
* View notifications
* Manage subscription requests
* Save posts to named compilations
* Search users by nickname
* Get unique post's link
* Set custom avatar
* Send messages
* Mark a friends in photo
* Add location for posts
* Dark theme

## Shuttle inside

https://github.com/Shilza/Shuttle-frontend
