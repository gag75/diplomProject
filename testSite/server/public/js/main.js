/*
 * Note that this is toastr v2.1.3, the "latest" version in url has no more maintenance,
 * please go to https://cdnjs.com/libraries/toastr.js and pick a certain version you want to use,
 * make sure you copy the url from the website since the url may change between versions.
 * */
!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return g({type:O.error,iconClass:m().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=m()),v=e("#"+t.containerId),v.length?v:(n&&(v=d(t)),v)}function o(e,t,n){return g({type:O.info,iconClass:m().iconClasses.info,message:e,optionsOverride:n,title:t})}function s(e){C=e}function i(e,t,n){return g({type:O.success,iconClass:m().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return g({type:O.warning,iconClass:m().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e,t){var o=m();v||n(o),u(e,o,t)||l(o)}function c(t){var o=m();return v||n(o),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function l(t){for(var n=v.children(),o=n.length-1;o>=0;o--)u(e(n[o]),t)}function u(t,n,o){var s=!(!o||!o.force)&&o.force;return!(!t||!s&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0)}function d(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1}}function f(e){C&&C(e)}function g(t){function o(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(){c(),u(),d(),p(),g(),C(),l(),i()}function i(){var e="";switch(t.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}I.attr("aria-live",e)}function a(){E.closeOnHover&&I.hover(H,D),!E.onclick&&E.tapToDismiss&&I.click(b),E.closeButton&&j&&j.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),E.onCloseClick&&E.onCloseClick(e),b(!0)}),E.onclick&&I.click(function(e){E.onclick(e),b()})}function r(){I.hide(),I[E.showMethod]({duration:E.showDuration,easing:E.showEasing,complete:E.onShown}),E.timeOut>0&&(k=setTimeout(b,E.timeOut),F.maxHideTime=parseFloat(E.timeOut),F.hideEta=(new Date).getTime()+F.maxHideTime,E.progressBar&&(F.intervalId=setInterval(x,10)))}function c(){t.iconClass&&I.addClass(E.toastClass).addClass(y)}function l(){E.newestOnTop?v.prepend(I):v.append(I)}function u(){if(t.title){var e=t.title;E.escapeHtml&&(e=o(t.title)),M.append(e).addClass(E.titleClass),I.append(M)}}function d(){if(t.message){var e=t.message;E.escapeHtml&&(e=o(t.message)),B.append(e).addClass(E.messageClass),I.append(B)}}function p(){E.closeButton&&(j.addClass(E.closeClass).attr("role","button"),I.prepend(j))}function g(){E.progressBar&&(q.addClass(E.progressClass),I.prepend(q))}function C(){E.rtl&&I.addClass("rtl")}function O(e,t){if(e.preventDuplicates){if(t.message===w)return!0;w=t.message}return!1}function b(t){var n=t&&E.closeMethod!==!1?E.closeMethod:E.hideMethod,o=t&&E.closeDuration!==!1?E.closeDuration:E.hideDuration,s=t&&E.closeEasing!==!1?E.closeEasing:E.hideEasing;if(!e(":focus",I).length||t)return clearTimeout(F.intervalId),I[n]({duration:o,easing:s,complete:function(){h(I),clearTimeout(k),E.onHidden&&"hidden"!==P.state&&E.onHidden(),P.state="hidden",P.endTime=new Date,f(P)}})}function D(){(E.timeOut>0||E.extendedTimeOut>0)&&(k=setTimeout(b,E.extendedTimeOut),F.maxHideTime=parseFloat(E.extendedTimeOut),F.hideEta=(new Date).getTime()+F.maxHideTime)}function H(){clearTimeout(k),F.hideEta=0,I.stop(!0,!0)[E.showMethod]({duration:E.showDuration,easing:E.showEasing})}function x(){var e=(F.hideEta-(new Date).getTime())/F.maxHideTime*100;q.width(e+"%")}var E=m(),y=t.iconClass||E.iconClass;if("undefined"!=typeof t.optionsOverride&&(E=e.extend(E,t.optionsOverride),y=t.optionsOverride.iconClass||y),!O(E,t)){T++,v=n(E,!0);var k=null,I=e("<div/>"),M=e("<div/>"),B=e("<div/>"),q=e("<div/>"),j=e(E.closeHtml),F={intervalId:null,hideEta:null,maxHideTime:null},P={toastId:T,state:"visible",startTime:new Date,options:E,map:t};return s(),r(),a(),f(P),E.debug&&console&&console.log(P),I}}function m(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),w=void 0))}var v,C,w,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:c,error:t,getContainer:n,info:o,options:{},subscribe:s,success:i,version:"2.1.3",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
//# sourceMappingURL=toastr.js.map




////////OF

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1500",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

var callService = (function(){
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    let client = {
        nextMsg: null
    };
    //state
    let isCall = false;
    let isRejected = false; // only Admins
    client.socket = io.connect('http://localhost:8080');
    initPeer().then(()=>{
        socketEvents();

        if(client.type == 'user'){
            client.socket.emit('getMessages', {peerId: client.peer.id, pass: client.pass}, (data) => {
                client.nextMsg = data.nextMsg;
                chatModule.addMessages(data.messages, 'top');
                chatModule.chatBoxscrollToBottom();
            })
        }

        var entityMap = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
          '/': '&#x2F;',
          '`': '&#x60;',
          '=': '&#x3D;'
        };
        function escapeHtml (string) {
          return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return entityMap[s];
          });
        }

        let videoModule = (function() {
            // streams Video
            let localStream = null,
                onlineStream = null;

            //state
            let typeCall = 0;// 0-Call is Reject, 1-normal Type (it state onlu user's)

            //cacheDOM
            let $CallVideo = $('.CallService .CallVideo'),
                $btnMakeCall = $('.CallVideo__btn_makeCall'),
                $btnStopVideo = $('.CallVideo__btn_stopVideo'),
                $btnMuteVideo = $('.CallVideo__btn_muteVideo'),
                $btnResetCall = $('.CallVideo__btn_resetCall'),
                $callWindow = $('.CallVideo__phone-container'),
                $btnReciveCall = $('.CallVideo__btn_reciveCall'),
                $btnRejectCall = $('.CallVideo__btn_rejectCall');

            if (client.type == 'admin'){
                $btnMakeCall.hide();
            }
            //cache Video tags'
            let onlineVideo = document.querySelector('.CallVideo .CallVideo__online'),
                localVideo = document.querySelector('.CallVideo .CallVideo__local');

            //cache Audio tag
            let audioCall = document.querySelector('.CallVideo__phone-audio');

            //bindEvents
            $btnMakeCall.on('click', () => {
                if(isCall) return;
                client.socket.emit('getPeerAdminToServer', {peerId: client.peer.id, pass: client.pass}, data => {
                    if(!data.peerAdminId){
                        toastr.info('В данный момент свободных администраторов нет.');
                        return
                    }
                    navigator.getUserMedia({video: true, audio: true}, stream => {
                        localStream = stream;
                        isCall = true;
                        localVideo.src = URL.createObjectURL(stream);
                        console.log('Admin Id: ' + data.peerAdminId);
                        client.mediaConnection = client.peer.call(data.peerAdminId, localStream);//(It's for User mediaConnection)
                        if(!client.mediaConnection){
                            toastr.error('Ошибка сети, что-то пошло не так.');
                            localStream.getAudioTracks()[0].stop();
                            localStream.getVideoTracks()[0].stop();
                            closeStreamsVideos();
                            isCall = false;
                            return;
                        }
                        client.mediaConnection.on('stream', remoteStream => {
                            typeCall = 1;
                            onlineStream = remoteStream;
                            onlineVideo.src = URL.createObjectURL(remoteStream);
                        });
                        client.mediaConnection.on('close', () => {
                            client.mediaConnection = null;
                            switch (typeCall) {
                                case 0:
                                    toastr.info('Звонок отклонён.');
                                    break;
                                case 1:
                                    toastr.info('Разговор завершён.');
                                    break;
                                default:
                            }
                            typeCall = 0;
                            isCall = false;
                            closeStreamsVideos();
                        });
                    }, err => {
                        toastr.error('Ошибка доступа для камеры, проверьте правильность подключения видео устройства.');
                        console.log('Failed to get local stream', err);
                    });
                });
            });
            $btnStopVideo.on('click', function() {
                if(!isCall) return;
                console.log('stop localVideo');
                localStream.getVideoTracks()[0].enabled = !(localStream.getVideoTracks()[0].enabled);
                $(this).toggleClass('red success-color')
            });
            $btnMuteVideo.on('click', function() {
                if(!isCall) return;
                console.log('mute localVideo');
                localStream.getAudioTracks()[0].enabled = !(localStream.getAudioTracks()[0].enabled);
                $(this).toggleClass('red success-color')
            })
            $btnResetCall.on('click', function() {
                if(!isCall) return;
                console.log();
                client.mediaConnection.close();
            })

            //only for Admin's buttons
            $btnReciveCall.on('click', function(){
                $callWindow.toggleClass('CallVideo__phone-container_active');
                audioCall.pause();
                audioCall.currentTime = 0.0;
                navigator.getUserMedia({video: true, audio: true}, stream => {
                    localStream = stream;
                    localVideo.src = URL.createObjectURL(stream);
                    isCall = true;
                    client.mediaConnection.answer(stream);
                    client.mediaConnection.on('stream', remoteStream => {
                        onlineVideo.src = URL.createObjectURL(remoteStream);
                    });
                    summaryModule.clearListSummarys();
                    client.socket.emit('getMessages', {peerId: client.peer.id, pass: client.pass, userPeerId: client.mediaConnection.peer}, (data) => {
                        chatModule.clearChatBox()
                        client.nextMsg = data.nextMsg;
                        console.log(data.messages)
                        chatModule.addMessages(data.messages, 'top');
                        chatModule.chatBoxscrollToBottom();
                    })
                }, err => {
                    client.mediaConnection.answer(null);
                    setTimeout(function(){
                        client.mediaConnection.close();
                        toastr.error('Ошибка доступа для камеры, проверьте правильность подключения видео устройства.');
                    }, 1000);
                    console.log('Failed to get local stream', err);
                });
            })
            $btnRejectCall.on('click', function(){
                isRejected = true;
                $callWindow.toggleClass('CallVideo__phone-container_active');
                audioCall.pause();
                audioCall.currentTime = 0.0;
                client.mediaConnection.answer(null);
                setTimeout(function(){
                    client.mediaConnection.close();
                }, 1000);
            })
            //peer onCall(It's for Admin mediaConnection)
            client.peer.on('call', call => {
                audioCall.play();
                clearTimeout(client.timerId);
                client.mediaConnection = call;
                client.mediaConnection.on('close', () => {
                    $callWindow.removeClass('CallVideo__phone-container_active');
                    toastr.info('Разговор завершён.');
                    isCall = false;
                    closeStreamsVideos();

                    if(isRejected){
                        client.socket.emit('iAmFreeAdmin', {peerId: client.peer.id, pass: client.pass});
                    } else {
                        $('#modalAddSummaryForm').modal('show');
                    }
                    isRejected = false;
                });
                $callWindow.toggleClass('CallVideo__phone-container_active');
            })

            function closeStreamsVideos(){
                localVideo.src = "";
                onlineVideo.src = "";
                if(localStream){
                    localStream.getAudioTracks()[0].stop();
                    localStream.getVideoTracks()[0].stop();

                }
                if(onlineStream){
                    onlineStream.getAudioTracks()[0].stop();
                    onlineStream.getVideoTracks()[0].stop();
                }
            }

        })();

        let chatModule = (function() {
            //state
            let isScroll = false;

            //cacheDOM
            let $chatInput = $('.chat-textArea'),
                $chatMessages = $('.chat-messages');

            //bindEvents
            $chatInput.on('keydown', function(e) {
                if(!isCall) return false;
                var code = e.keyCode || e.which;
                if(code == 13 && e.ctrlKey) {
                    let value = $(this).val();
                    $(this).val(value + '\n');
                } else if(code == 13) {
                    var value = this.value;
                    value = value.replace(/^\s+/, "");
                    if(value != "") {
                        console.log({ from: client.peer.id, to: client.mediaConnection.peer, msg: value, pass: client.pass })
                        client.socket.emit('messageTo', { from: client.peer.id, to: client.mediaConnection.peer, msg: value, pass: client.pass }, (data) => {
                                addMessages([{text: value, from: 1, date: data.date}]);
                                $chatMessages.scrollTop(0);
                                $chatMessages.scrollTop($chatMessages.get(0).scrollHeight);
                                $(this).val('');
                            });
                        return false;
                    } else {
                        return false;
                    }
               }
            });
            $chatMessages.on('scroll', function(e) {
                if(client.type != 'user'){
                    if(isScroll || !isCall) return;
                }
                if(isScroll) return;
                if(this.scrollTop <= 1 && client.nextMsg > 0){
                    isScroll = true;
                    client.socket.emit('getMessages', {peerId: client.peer.id, pass: client.pass, nextMsg: client.nextMsg, userPeerId: (client.type == 'admin') ? client.mediaConnection.peer : null }, (data) => {
                        if(!data.messages) return;
                        client.nextMsg = data.nextMsg;
                        let oldScrollHeight = this.scrollHeight;
                        addMessages(data.messages, 'top');
                        $(this).animate({scrollTop:this.scrollHeight - oldScrollHeight}, 500, 'swing', function() {
                            this.scrollTop = this.scrollHeight - oldScrollHeight;
                            isScroll = false;
                        });
                        //this.scrollTop = this.scrollHeight - oldScrollHeight;
                        // isScroll = false;
                    })
                }
            })

            function addMessages(arr, to){
                to = to || 'bottom';
                arr = arr.map(el => {
                    let htmlString = `<div class="message-box-holder">
                                        <div class="message-sender message-sender-own">${escapeHtml(el.date)} </div>
                                        <div class="message-box">' ${escapeHtml(el.text)} '</div>
                                      </div>`;
                    if(el.from == 0){
                        htmlString =`<div class="message-box-holder">
                                            <div class="message-sender"> ${escapeHtml(el.date)} </div>
                                            <div class="message-box  message-partner">' ${escapeHtml(el.text)} '</div>
                                      </div>`;
                    }
                    return htmlString;
                    // $(htmlString).appendTo($chatMessages);
                });
                let htmlResultString = `<div style="width: 100%"> ${arr.join('')} </div>`;
                if (to == 'bottom'){
                    $(htmlResultString).appendTo($chatMessages);
                }
                if(to == 'top'){
                    $chatMessages.prepend(htmlResultString)
                }
            }
            function chatBoxscrollToBottom(){
                $chatMessages.scrollTop(0);
                $chatMessages.scrollTop($chatMessages.get(0).scrollHeight);
            }

            return {
                clearChatBox: function () {
                    client.nextMsg = null;
                    $chatMessages.empty();
                },
                addMessages: addMessages,
                chatBoxscrollToBottom: chatBoxscrollToBottom
            }
        })();

        let summaryModule = (function() {
            client.nextSummary = null;

            //cacheDOM
            let $listHistoryLink = $('.listHistoryLink'),
                $listSummarys = $('.CallListHistory__summarys'),
                $btnLoadMore = $('.CallListHistory__btn-more');

            //bindEvents
            $listHistoryLink.on('click', function(){
                if(!isCall) return;
                if(client.nextSummary == null){
                    $btnLoadMore.trigger('click');
                }
            })
            $btnLoadMore.on('click', function(){
                if(!isCall) return false;
                if(client.nextSummary < 0) return false;
                client.socket.emit('getSummary', { peerId: client.peer.id, pass: client.pass, userPeerId: client.mediaConnection.peer, nextSummary: client.nextSummary}, (data) => {
                    client.nextSummary = data.nextSummary;
                    console.log(data);
                    addSummarys(data.summarys.reverse())
                });
            })

            function addSummarys(arr){
                arr = arr.map(el => {
                    // let someText = el.text.slice(0,80);
                    // let btnDisabled = true;
                    // if(someText.length < el.text.length){
                        // console.log(someText.length, el.text.length);
                        // someText += '...';
                        // btnDisabled = false;
                    // }
                    return `<div class="card" style="margin-bottom: 20px;">
                       <div class="card-block">
                           <h4 class="card-title">${escapeHtml(el.title)}</h4>
                           <h5>${escapeHtml(el.date)}</h5>
                           <p class="card-text" style="font-size: 14px; word-wrap: break-word;">${escapeHtml(el.text)}</p>
                       </div>
                   </div>`;
                })
                let htmlResultString = `<div style="width: 100%"> ${arr.join('')} </div>`;
                $(htmlResultString).appendTo($listSummarys);
            }

            return {
                clearListSummarys : function() {
                    client.nextSummary = null;
                    $listSummarys.empty();
                },
                addSummarys: addSummarys
            }
        })();

        let addSummuryForm = (function(){
            //cacheDOM
            let $form = $('#modalAddSummaryForm'),
                $btnSaveSummury = $('.addSummuryForm__btnSave'),
                $inputTitleSummury = $('.addSummuryForm__titleInput'),
                $inputTextSummury = $('.addSummuryForm__textInput');

            //bindEvents
            $form.on('hide.bs.modal', function(){
                $inputTitleSummury.removeClass('invalid valid').val('');
                $inputTextSummury.removeClass('invalid valid').val('');
                client.socket.emit('iAmFreeAdmin', {peerId: client.peer.id, pass: client.pass});
            })
            $btnSaveSummury.on('click', function(){
                if(checkForm()){
                    client.socket.emit('adminOnlyGetClientId', {peerId: client.peer.id, pass: client.pass, otherPeerId: client.mediaConnection.peer}, function(data){
                        client.socket.emit('addSummary', {
                            peerId: client.peer.id,
                            pass: client.pass,
                            clientId: data.clientId,
                            text: escapeHtml($inputTextSummury.val()),
                            title: escapeHtml($inputTitleSummury.val())},
                            (data) => {
                                if(data.error){
                                    toastr.error('Ошибка сервера');
                                } else{
                                    summaryModule.addSummarys([{text: escapeHtml($inputTextSummury.val()), title: escapeHtml($inputTitleSummury.val()), date: new Date()}])
                                    toastr.info('Резюме было сохранено.');
                                }
                                $('#modalAddSummaryForm').modal('hide');
                            })
                    })
                }
            })

            function checkForm(){
                titleError=false;
                textError=false;
                title = $inputTitleSummury.val().replace(/^\s+/, "");
                text = $inputTextSummury.val().replace(/^\s+/, "");
                if(title == ""){
                    titleError = true;
                    $inputTitleSummury.addClass('invalid');
                }
                if(text == ""){
                    textError = true;
                    $inputTextSummury.addClass('invalid');
                }

                if(titleError || textError){
                    return false;
                }else {
                    return true;
                }
            }
        })()

        function socketEvents() {
            client.socket.on('willCall', res => {
                client.timerId = setTimeout(()=>{
                    client.socket.emit('iAmFreeAdmin', {peerId: peer.id, pass: pass})
                }, 120000)
            })
            client.socket.on('messageFrom', res => {
                chatModule.addMessages([{text: res.text, from: res.from, date: res.date}]);
                chatModule.chatBoxscrollToBottom();
            })

        }
    });

    client.socket.on('connect', () => {
        console.log('socket connect id: ' + client.socket.id);
    })
    function initPeer(){
        return new Promise((resolve, reject) => {
            fetch('/callServer/loginCall', {method: 'POST', credentials: 'same-origin'})
            .then(res => {
                return res.json()
            })
            .then(body => {
                client.pass = body.pass;
                client.peer = new Peer(body.peerId, { host: 'localhost', port: 8080, path: '/peerjs'});
                client.socket.emit('logIn', {peerId: body.peerId, pass: body.pass}, (data) => {
                    client.type = data.type;
                    resolve()
                });

                console.log('PeerJs Id: ' + body.peerId);

                client.peer.on('close', id => {
                    console.log('Peer is close')
                })

                client.peer.on('error', err => {
                    // console.log('Peer is error');
                    // console.log(err.type);
                    // alert('HI')
                    if (client.mediaConnection){
                        client.mediaConnection.close();
                    }
                    toastr.error('Ваше соединение было отключено от сервера. Вы больше не сомжете звонить с этого соединения.');
                })
            });
        })
    }


})()
