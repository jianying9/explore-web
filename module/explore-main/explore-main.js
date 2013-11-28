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
            //初始化position-list
            var positionList = yy.findInModule('position-list');
            positionList.init({
                key: 'positionId',
                dataToHtml: function(data) {
                    var result = '<div class="h20"></div>'
                            + '<div class="yy_ignore box">'
                            + '<div class="box_header">' + data.positionName + '</div>'
                            + '<div class="yy_ignore box_content">'
                            + '<canvas class="yy_image position_ad" id="' + data.positionId + '-position" yyHeight="250" yyWidth="250" yyMessageListener="explore-main.positionMessageListener" yyEventListener="explore-main.positionListener"></canvas>'
                            + '</div>'
                            + '</div>';
                    return result;
                }
            });
            //
            var listData = [
                {positionId: 0, positionName: '0号'},
                {positionId: 1, positionName: '1号'},
                {positionId: 2, positionName: '2号'},
                {positionId: 3, positionName: '3号'},
                {positionId: 4, positionName: '4号'},
                {positionId: 5, positionName: '5号'},
                {positionId: 6, positionName: '6号'},
                {positionId: 7, positionName: '7号'},
                {positionId: 8, positionName: '8号'},
                {positionId: 9, positionName: '9号'}
            ];
            positionList.loadData(listData);
            //加载广告位信息
            var msg = {
                act: 'INQUIRE_POSITION_AD'
            };
            for (var index = 0; index < listData.length; index++) {
                msg.positionId = listData[index].positionId;
                msg.server = 'rtbServer';
                yy.sendMessage(msg);
            }
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
        },
        positionListener: {
            click: function(yy) {
                var data = yy.getContext(yy.key);
                if (data) {
                    var url = data.url;
                    if (url.indexOf('http://') === -1) {
                        url = 'http://' + url;
                    }
                    window.open(url);
                    //记录点击
                    var msg = {
                        server: 'rtbServer',
                        act: 'CLICK_AD',
                        positionId: data.positionId,
                        adId: data.adId,
                        bid: data.bid
                    };
                    yy.sendMessage(msg);
                }
            }
        }
    },
    messageListener: {
        positionMessageListener: {
            INQUIRE_POSITION_AD: function(yy, message) {
                var data = message.data;
                var listItem = yy.group;
                var itemData = listItem.getData();
                if (data.positionId === itemData.positionId) {
                    if (message.flag === 'SUCCESS') {
                        var context = {};
                        context[data.positionId + '-position'] = data;
                        yy.setContext(context);
                        //
                        var image = new Image();
                        image.src = data.dataUrl;
                        yy.drawImage(image, 0, 0, 250, 250);
                    }
                }
            }
        }
    }
});