'use strict';
(function() {
    var CONFIG_WIZARD_WEB_URL = 'https://github.com/moayyad57/SWCCVERSE-MODELS/blob/main/WizardLoaderFile/index.html';

    var loaderEntityID;
    var configWizardEntityID;

    function onWebAppEventReceived(sendingEntityID, event) {
        if (sendingEntityID === configWizardEntityID) {
            var eventJSON = JSON.parse(event);

            if (eventJSON.command === 'first-run-wizard-ready') {
                var objectToSend = {
                    command: 'script-to-web-initialize',
                    data: {
                        performancePreset: Performance.getPerformancePreset(),
                        refreshRateProfile: Performance.getRefreshRateProfile(),
                        displayName: MyAvatar.displayName
                    }
                };
                
                Entities.emitScriptEvent(configWizardEntityID, JSON.stringify(objectToSend));
            }

            if (eventJSON.command === 'complete-wizard') {
                Performance.setPerformancePreset(eventJSON.data.performancePreset);
                Performance.setRefreshRateProfile(eventJSON.data.refreshRateProfile);
                MyAvatar.displayName = eventJSON.data.displayName;

                Entities.deleteEntity(configWizardEntityID);
                Entities.webEventReceived.disconnect(onWebAppEventReceived);
            }
        }
    }

    this.preload = function (entityID) {
        loaderEntityID = entityID;
        var loaderEntityProps = Entities.getEntityProperties(loaderEntityID, ['position', 'rotation']);

        configWizardEntityID = Entities.addEntity({
            type: 'Web',
            sourceUrl: CONFIG_WIZARD_WEB_URL,
            maxFPS: 60,
            dpi: 20,
            useBackground: false,
            grab: {
                grabbable: false
            },
            position: loaderEntityProps.position,
            rotation: loaderEntityProps.rotation,
            dimensions: { x: 1.4, y: 0.75, z: 0 }
        }, 'local');

        Entities.webEventReceived.connect(onWebAppEventReceived);
    }

    this.unload = function () {
        if (configWizardEntityID) {
            Entities.deleteEntity(configWizardEntityID);
            Entities.webEventReceived.disconnect(onWebAppEventReceived);
        }
    }

})
