function chatService($firebaseArray) {
    var messagesRef = firebase.database().ref().child("messages");
    var chat = {};
    chat.getMessages = function(){
        return $firebaseArray(messagesRef);
    }
    
    chat.shownMessages = function(){
        return $firebaseArray(messagesRef.limitToLast(15));
    }
    chat.sendMessage = function(message){
        chat.getMessages().$add(message);
    }
    
    return chat;
}

angular.module('cbsChat')
.factory('ChatService', ['$firebaseArray', chatService])