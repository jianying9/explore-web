/**
 * User: aladdin
 * Date: 11/11/13
 * Time: 4:12 PM
 */
$.yyLoadListener('explore-main', {
    finishedListener: {
        initListener: function(yy) {
            var mainPanel = yy.findInModule('explore-main-panel');
            mainPanel.loadModule('explore-list');
            yy.setSession({mainState: 'explore-list'});
            //
            var bottomPanel = yy.findInModule('explore-bottom-panel');
            bottomPanel.loadModule('explore-bottom');
            //
        }
    },
    eventListener: {
        logoutListener: {
            click: function(yy) {
                var mainModule = yy.findInModule('explore-main');
                mainModule.remove();
                $.yyLoadModule('explore-login');
            }
        },
        firstPageListener: {
            click: function(yy) {
                var mainState = yy.getSession('mainState');
                if (!mainState || mainState !== 'explore-list') {
                    var mainPanel = yy.findInModule('explore-main-panel');
                    mainPanel.removeChildren();
                    mainPanel.loadModule('explore-list');
                    yy.setSession({mainState: 'explore-list'});
                }
            }
        },
        toPublishListener: {
            click: function(yy) {
                var mainState = yy.getSession('mainState');
                if (!mainState || mainState !== 'explore-publish') {
                    var mainPanel = yy.findInModule('explore-main-panel');
                    mainPanel.removeChildren();
                    mainPanel.loadModule('explore-publish');
                    yy.setSession({mainState: 'explore-publish'});
                }
            }
        },
        toRtbListener: {
            click: function(yy) {
                window.open('http://192.168.213.52/rtb-web');
            }
        }
    },
    messageListener: {
    }
});