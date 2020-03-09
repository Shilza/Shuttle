'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CloudinaryProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/CloudinaryService', () => {
      const CloudinaryService = require('../app/Services/CloudinaryService');
      return new CloudinaryService();
    })
  }

  boot () {
    // optionally do some initial setup
  }
}

module.exports = CloudinaryProvider;
