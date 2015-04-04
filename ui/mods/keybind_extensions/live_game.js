(function() {

  //**************** pointer locked pan ************
  var panPreviousMode
  var panHolodeck

  model.toggle_pan_camera = function() {
    if (model.mode() === 'camera') {
      model.stop_pan_camera()
    } else {
      model.start_pan_camera()
    }
  }

  model.start_pan_camera = function() {
    if (model.mode() != 'camera') {
      panPreviousMode = model.mode();
      model.mode('camera');
    }
    panHolodeck = api.Holodeck.focused
    panHolodeck.beginControlCamera();
  }

  model.stop_pan_camera = function() {
    if (panHolodeck) {
      panHolodeck.endControlCamera();
      panHolodeck = null
    }
    if (model.mode() === 'camera') {
      model.mode(panPreviousMode);
    }
  }

  // **************** planet camera ****************

  model.focus_planet_1 = function() {model.focusPlanet(0)}
  model.focus_planet_2 = function() {model.focusPlanet(1)}
  model.focus_planet_3 = function() {model.focusPlanet(2)}
  model.focus_planet_4 = function() {model.focusPlanet(3)}
  model.focus_planet_5 = function() {model.focusPlanet(4)}
  model.focus_planet_6 = function() {model.focusPlanet(5)}
  model.focus_planet_7 = function() {model.focusPlanet(6)}
  model.focus_planet_8 = function() {model.focusPlanet(7)}
  model.focus_planet_9 = function() {model.focusPlanet(8)}
  model.focus_planet_10 = function() {model.focusPlanet(9)}
  model.focus_planet_11 = function() {model.focusPlanet(10)}
  model.focus_planet_12 = function() {model.focusPlanet(11)}
  model.focus_planet_13 = function() {model.focusPlanet(12)}
  model.focus_planet_14 = function() {model.focusPlanet(13)}
  model.focus_planet_15 = function() {model.focusPlanet(14)}
  model.focus_planet_16 = function() {model.focusPlanet(15)}

  // patch that makes next and previous planet always work when focused on sun
  model.changeFocusPlanet = function (delta) {
      var index = model.focusPlanet();
      var t = (index + delta) % (model.celestialViewModels().length - 1);

      if (index === -1)
          t = 0;

      // Begin change
      if (t == index) {
        model.focusPlanet.notifySubscribers()
      }
      // End change

      while (t !== index) {
          if (!model.celestialViewModels()[t].dead()) {
              model.focusPlanet(t);
              return;
          }
          t = (t + delta) % (model.celestialViewModels().length - 1);
      }
  }

  //**************** alternate esc/back ************

  model.end_fab_mode = model.endFabMode
  model.open_option_menu = function() {
    if (!model.menuIsOpen()) {
      model.toggleMenu();
    }
  };
  model.close_option_menu = model.closeMenu
  model.toggle_option_menu = model.toggleMenu
  model.clear_build_sequence = model.clearBuildSequence
  model.cancel_selection = function() {
      api.select.empty();
      model.selection(null);
  }
  model.close_chronocam = function() { model.showTimeControls(false) }
  model.end_command_mode = model.endCommandMode

  model.modal_back_no_menu = function () {
    if (model.mode() === 'fab')
      model.endFabMode();
    else if (model.chatSelected()) {
      model.chatSelected(false);
    }
    else if (model.mode() === 'default') {
      if (model.hasSelection()) {
        if (model.activeBuildGroup())
          model.clearBuildSequence();
        else {
          api.select.empty();
          model.selection(null);
        }
      }
      else if (model.showTimeControls()) {
        model.showTimeControls(false)
      }
    }
    else if (model.mode().startsWith('command_'))
      model.endCommandMode();
    else
      model.mode('default');
  }

  api.Panel.message('', 'inputmap.reload');
})()
