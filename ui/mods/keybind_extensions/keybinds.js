(function() {
  var set = 'general'
  var display_sub_group = 'General'
  var kb = function(name, def) {
    action_sets[set][name] = function () {
      if (model[name]) model[name]()
    }
    api.settings.definitions.keyboard.settings[name] = {
      title: name.replace(/_/g, ' '),
      type: 'keybind',
      set: set,
      display_group: 'keyex',
      display_sub_group: display_sub_group,
      default: def || '',
    }
  }

  set = 'camera'
  display_sub_group = 'Camera'
  kb('toggle_pan_camera')
  kb('start_pan_camera')
  kb('stop_pan_camera')
})()
