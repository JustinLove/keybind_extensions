(function() {
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

  api.Panel.message('', 'inputmap.reload');
})()
