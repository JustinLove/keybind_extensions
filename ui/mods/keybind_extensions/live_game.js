(function() {

  // http://stackoverflow.com/questions/596481/simulate-javascript-key-events
  var resendEvent = function(event) {
    var keyboardEvent = document.createEvent("KeyboardEvent");
    var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

    keyboardEvent[initMethod](
      "keyup", // event type : keydown, keyup, keypress
      true, // bubbles
      true, // cancelable
      event.view, // viewArg: should be window
      event.ctrlKey, // ctrlKeyArg
      event.altKey, // altKeyArg
      event.shiftKey, // shiftKeyArg
      event.metaKey, // metaKeyArg
      event.keyCode, // keyCodeArg : unsigned long the virtual key code, else 0
      event.keyIdentifier // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
    );
    document.dispatchEvent(keyboardEvent);
  }

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

  model.hold_to_pan_camera = function(downEvent) {
    model.start_pan_camera()
    input.capture(panHolodeck.div, function (event) {
      var release = ((event.type === 'keyup') && (event.keyCode === downEvent.keyCode)) 
      var escKey = ((event.type === 'keydown') && (event.keyCode === keyboard.esc));
      if (release || escKey) {
        input.release();

        // mousetrap waits for a keyup event before sending the NEXT keydown event.
        if (release) resendEvent(event)

        model.stop_pan_camera()
      }
    });
  }

  // ************** fixed anchors *************
  var lookAt = function(location) {
    api.camera.lookAt({
      location: location,
      zoom: 'orbital',
      planet_id: model.focusPlanet()
    })
    api.camera.alignToPole()
  }
  model.look_at_north_pole = function() {
    lookAt({x:0.001, y:0.001, z:500})
  }

  model.look_at_south_pole = function() {
    lookAt({x:0.001, y:0.001, z:-500})
  }

  model.look_at_equator_0 = function() {
    lookAt({x:0.001, y:-500, z:0.001})
  }

  model.look_at_equator_90 = function() {
    lookAt({x:500, y:0.001, z:0.001})
  }

  model.look_at_equator_180 = function() {
    lookAt({x:0.001, y:500, z:0.001})
  }

  model.look_at_equator_270 = function() {
    lookAt({x:-500, y:0.001, z:0.001})
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

  // ************** spectator vision ************

  model.vision_all_players = function() { model.visionSelectAll() }
  model.vision_player_1 = function(event) { model.visionSelect(0, event) }
  model.vision_player_2 = function(event) { model.visionSelect(1, event) }
  model.vision_player_3 = function(event) { model.visionSelect(2, event) }
  model.vision_player_4 = function(event) { model.visionSelect(3, event) }
  model.vision_player_5 = function(event) { model.visionSelect(4, event) }
  model.vision_player_6 = function(event) { model.visionSelect(5, event) }
  model.vision_player_7 = function(event) { model.visionSelect(6, event) }
  model.vision_player_8 = function(event) { model.visionSelect(7, event) }
  model.vision_player_9 = function(event) { model.visionSelect(8, event) }
  model.vision_player_10 = function(event) { model.visionSelect(9, event) }

  // *************** selection edit **************

  model.only_bots_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Bot', null, false) }
  model.remove_bots_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Bot', null, true) }

  model.only_tanks_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Tank', null, false) }
  model.remove_tanks_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Tank', null, true) }

  model.only_land_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Land', null, false) }
  model.remove_land_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Land', null, true) }

  model.only_air_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Air', null, false) }
  model.remove_air_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Air', null, true) }

  model.only_naval_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Naval', null, false) }
  model.remove_naval_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Naval', null, true) }

  model.only_orbital_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Orbital', null, false) }
  model.remove_orbital_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Orbital', null, true) }

  model.only_advanced_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Advanced', null, false) }
  model.remove_advanced_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Advanced', null, true) }

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

  model.navigate_back_no_menu = function () {
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
