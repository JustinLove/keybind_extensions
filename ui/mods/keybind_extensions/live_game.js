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

  model.currentFocusPlanetId = function() {
    return api.camera.getFocus(api.Holodeck.focused.id).planetId()
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
      planet_id: api.camera.getFocus(api.Holodeck.focused.id).planetId(),
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

  model.focus_planet_1 = function() {api.camera.focusPlanet(0)}
  model.focus_planet_2 = function() {api.camera.focusPlanet(1)}
  model.focus_planet_3 = function() {api.camera.focusPlanet(2)}
  model.focus_planet_4 = function() {api.camera.focusPlanet(3)}
  model.focus_planet_5 = function() {api.camera.focusPlanet(4)}
  model.focus_planet_6 = function() {api.camera.focusPlanet(5)}
  model.focus_planet_7 = function() {api.camera.focusPlanet(6)}
  model.focus_planet_8 = function() {api.camera.focusPlanet(7)}
  model.focus_planet_9 = function() {api.camera.focusPlanet(8)}
  model.focus_planet_10 = function() {api.camera.focusPlanet(9)}
  model.focus_planet_11 = function() {api.camera.focusPlanet(10)}
  model.focus_planet_12 = function() {api.camera.focusPlanet(11)}
  model.focus_planet_13 = function() {api.camera.focusPlanet(12)}
  model.focus_planet_14 = function() {api.camera.focusPlanet(13)}
  model.focus_planet_15 = function() {api.camera.focusPlanet(14)}
  model.focus_planet_16 = function() {api.camera.focusPlanet(15)}

  // patch that makes next and previous planet always work when focused on sun
  model.changeFocusPlanet = function (delta) {
    var planets = model.celestialViewModels(),
    oldFocus = api.camera.getFocus(api.Holodeck.focused.id).planet(),
    idx = (oldFocus != -1) ? oldFocus : (delta > 0 ? 0 : planets.length - 1),
    sentinel = idx,
    advance = function() {
      idx = (idx + delta + planets.length) % planets.length;
      return (idx === sentinel) ? null : planets[idx];
    },
    planet;

    if (delta !== -1 && delta !== 1)
      return;

    while (planet = advance()) {
      if (!planet.dead() && !planet.isSun()) {
        api.camera.focusPlanet(idx);
        api.audio.playSound('/SE/UI/UI_planet_switch_select');
        return;
      }
    }

    // Begin change
    // we wrapped around to the starting planet
    api.camera.focusPlanet(idx);
    api.audio.playSound('/SE/UI/UI_planet_switch_select');
    // End change
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

  model.vision_previous_player = function(event) {
    var current = _.indexOf(model.playerVisionFlags(), 1)
    if (current == -1) {
      model.visionSelect(0, event)
      return
    }

    model.visionSelect((current + model.playerVisionFlags().length - 1) % model.playerVisionFlags().length, event)
  }

  model.vision_next_player = function(event) {
    var current = _.indexOf(model.playerVisionFlags(), 1)
    if (current == -1) {
      model.visionSelect(0, event)
      return
    }

    model.visionSelect((current + 1) % model.playerVisionFlags().length, event)
  }

  // ************** selection ***********
  model.select_all_bots_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Bot', 'Fabber');
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Bot', 'Fabber');
  })

  model.select_all_tanks_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Tank', 'Fabber');
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Tank', 'Fabber');
  })

  model.select_all_orbital_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Orbital', 'Fabber');
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Orbital', 'Fabber');
  })

  model.select_all_combat_orbital_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Orbital', 'Fabber');
    api.select.fromSelectionWithTypeFilter('Offense', null, false)
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Orbital', 'Fabber');
    api.select.fromSelectionWithTypeFilter('Offense', null, false)
  })

  model.select_all_orbital_factories_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Orbital', 'Mobile');
    api.select.fromSelectionWithTypeFilter('Factory', null, false)
    api.select.fromSelectionWithTypeFilter('Advanced', null, false)
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Orbital', 'Mobile');
    api.select.fromSelectionWithTypeFilter('Factory', null, false)
    api.select.fromSelectionWithTypeFilter('Advanced', null, false)
  })

  model.select_all_advanced_factories_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Factory', 'Basic');
  }, function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Factory', 'Basic');
  })

  model.select_all_fighters_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Fighter', 'Fabber');
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Fighter', 'Fabber');
  })

  model.select_all_scouts_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Scout', 'Fabber');
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Scout', 'Fabber');
  })

  model.select_all_radar_on_screen = input.doubleTap(function () {
    api.select.onScreenWithTypeFilter(model.currentFocusPlanetId(), 'Recon', 'Fabber');
  }, function () {
    api.select.onPlanetWithTypeFilter(model.currentFocusPlanetId(), 'Recon', 'Fabber');
  })

  model.select_matching_on_screen_then_planet = input.doubleTap(function() {
    maybeInvoke('selectedAllMatchingCurrentSelectionOnScreen')
  }, function() {
    var selectedSpecs = model.selectionTypes()
    model.holodeck.view.getArmyUnits(
      model.armyIndex(),
      model.currentFocusPlanetId()).then(function(units) {
        var planetSpecs = Object.keys(units)
        var targets = []
        planetSpecs.forEach(function(spec) {
          if (selectedSpecs.indexOf(spec) != -1) {
            targets = targets.concat(units[spec])
          }
        })
        api.select.unitsById(targets)
      })
  })

  // *************** selection edit **************

  model.only_one_in_selection = input.doubleTap(function() {
    if (!model.selection()) return
    var unit = _.chain(model.selection().spec_ids)
      .toArray()
      .flatten()
      .sample()
      .value()
    if (!unit) return
    engine.call("select.byIds", [unit])
  }, function() {
    api.camera.track(true)
  })

  model.halve_selection = function() {
    if (!model.selection()) return
    var units = _.flatten(_.toArray(model.selection().spec_ids).map(function(units) {
      var n = Math.ceil(units.length / 2)
      return _.sample(units, n)
    }))
    engine.call("select.byIds", units)
  }

  // combat fabs
  model.only_construction_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Construction', null, false) }
  model.remove_construction_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Construction', null, true) }

  model.only_bots_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Bot', null, false) }
  model.remove_bots_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Bot', null, true) }

  // aka vehicles
  model.only_tanks_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Tank', null, false) }
  model.remove_tanks_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Tank', null, true) }

  // infernos (and vangaurds)
  model.only_heavies_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Heavy', null, false) }
  model.remove_heavies_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Heavy', null, true) }

  model.only_land_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Land', null, false) }
  model.remove_land_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Land', null, true) }

  model.only_air_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Air', null, false) }
  model.remove_air_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Air', null, true) }

  model.only_fighters_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Fighter', null, false) }
  model.remove_fighters_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Fighter', null, true) }

  model.only_scouts_in_selection = function() {
    api.select.fromSelectionWithTypeFilter('Scout', null, false) }
  model.remove_scouts_from_selection = function() {
    api.select.fromSelectionWithTypeFilter('Scout', null, true) }

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
