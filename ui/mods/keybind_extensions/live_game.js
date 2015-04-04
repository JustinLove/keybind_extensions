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
