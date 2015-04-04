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

  set = 'camera'
  display_sub_group = 'Focus Planets'
  kb('focus_planet_1')
  kb('focus_planet_2')
  kb('focus_planet_3')
  kb('focus_planet_4')
  kb('focus_planet_5')
  kb('focus_planet_6')
  kb('focus_planet_7')
  kb('focus_planet_8')
  kb('focus_planet_9')
  kb('focus_planet_10')
  kb('focus_planet_11')
  kb('focus_planet_12')
  kb('focus_planet_13')
  kb('focus_planet_14')
  kb('focus_planet_15')
  kb('focus_planet_16')

  set = 'general'
  display_sub_group = 'Alternate ESC/Back'
  kb('modal_back_no_menu')
  kb('open_option_menu')
  kb('close_option_menu')
  kb('toggle_option_menu')
  kb('close_chronocam')
  kb('cancel_selection')
  kb('clear_build_sequence')
  kb('end_fab_mode')
  kb('end_command_mode')
})()
