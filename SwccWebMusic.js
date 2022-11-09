//
//  Copyright 2016 High Fidelity, Inc.
//
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

(function(){ 

    var soundURL ='https://github.com/moayyad57/SWCCVERSE-MODELS/raw/main/SWCC-web.wav';
    var webSound;

    this.preload = function(entityID) { 
        print("preload("+entityID+")");
        webSound = SoundCache.getSound(soundURL);
    }; 

    this.clickDownOnEntity = function(entityID, mouseEvent) { 
        var webPosition = Entities.getEntityProperties(entityID).position;
        print("clickDownOnEntity()...");
        Audio.playSound(webSound,  {
            position: webPosition,
            volume: 0.5
            });
    }; 

})
