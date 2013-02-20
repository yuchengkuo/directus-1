//  global.js
//  Directus 6.0

//  (c) RANGER
//  Directus may be freely distributed under the GNU license.
//  For all details and documentation:
//  http://www.getdirectus.com

define([
  'app',
  'backbone',
  'core/ui',
  'core/directus'
],

function(app, Backbone, ui, Directus) {

  var SettingsGlobal = app.module();

  var Global = Backbone.Layout.extend({

    template: 'page',

    serialize: function() {
      return {
        breadcrumbs: [
          { title: 'Settings', anchor: '#settings'}
        ],
        title: this.options.title,
        sidebar: true
      };
    },

    events: {
      'click #save-form': function() {
        var data = this.editView.data();
        var success = function() { app.router.go('settings'); };
        this.model.save(data, {success: success});
      },
      'click #save-form-cancel': function() {
        app.router.go('settings');
      }
    },

    beforeRender: function() {
      this.setView('#page-content', this.editView);
      this.setView('#sidebar', new Backbone.Layout({template: 'module-save', attributes: {'class': 'directus-module'}, serialize: {showActive: false, showDropdown: false, showDelete: false}}));
    },

    initialize: function(options) {
      this.editView = new Directus.EditView({model: this.model, structure: options.structure});
    }

  });

  return Global;

});