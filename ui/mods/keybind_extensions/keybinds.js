(function() {
  var set = 'general'
  var display_sub_group = 'General'
  var kb = function(name, def) {
    action_sets[set][name] = function () {
      if (model[name]) model[name].apply(this, arguments)
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
  kb('hold_to_pan_camera')

  set = 'camera'
  display_sub_group = 'Fixed Anchors'
  kb('look_at_north_pole')
  kb('look_at_south_pole')
  kb('look_at_equator_0')
  kb('look_at_equator_90')
  kb('look_at_equator_180')
  kb('look_at_equator_270')

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

  set = 'camera'
  display_sub_group = 'Specator Vision'
  kb('vision_all_players')
  kb('vision_previous_player')
  kb('vision_next_player')
  kb('vision_player_1')
  kb('vision_player_2')
  kb('vision_player_3')
  kb('vision_player_4')
  kb('vision_player_5')
  kb('vision_player_6')
  kb('vision_player_7')
  kb('vision_player_8')
  kb('vision_player_9')
  kb('vision_player_10')

  set = 'gameplay'
  display_sub_group = 'Selection'
  kb('select_all_bots_on_screen')
  kb('select_all_tanks_on_screen')
  kb('select_all_orbital_on_screen')
  kb('select_all_combat_orbital_on_screen')
  kb('select_all_orbital_factories_on_screen')
  kb('select_all_advanced_factories_on_screen')
  kb('select_all_fighters_on_screen')
  kb('select_all_scouts_on_screen')
  kb('select_all_radar_on_screen')
  kb('select_matching_on_screen_then_planet')

  set = 'gameplay'
  display_sub_group = 'Selection Edit'
  kb('only_one_in_selection')
  kb('halve_selection')
  kb('only_construction_in_selection')
  kb('remove_construction_from_selection')
  kb('only_bots_in_selection')
  kb('remove_bots_from_selection')
  kb('only_tanks_in_selection')
  kb('remove_tanks_from_selection')
  kb('only_heavies_in_selection')
  kb('remove_heavies_from_selection')
  kb('only_land_in_selection')
  kb('remove_land_from_selection')
  kb('only_air_in_selection')
  kb('remove_air_from_selection')
  kb('only_fighters_in_selection')
  kb('remove_fighters_from_selection')
  kb('only_scouts_in_selection')
  kb('remove_scouts_from_selection')
  kb('only_naval_in_selection')
  kb('remove_naval_from_selection')
  kb('only_orbital_in_selection')
  kb('remove_orbital_from_selection')
  kb('only_advanced_in_selection')
  kb('remove_advanced_from_selection')

  set = 'general'
  display_sub_group = 'Alternate ESC/Back'
  kb('navigate_back_no_menu')
  kb('open_option_menu')
  kb('close_option_menu')
  kb('toggle_option_menu')
  kb('close_chronocam')
  kb('cancel_selection')
  kb('clear_build_sequence')
  kb('end_fab_mode')
  kb('end_command_mode')
})()
