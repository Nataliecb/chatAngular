function chatCtrl(ChatService, $firebaseAuth){
    var vm = this;
    var auth = $firebaseAuth();
    
    vm.messages = ChatService.getMessages();
    vm.shownMessages = ChatService.shownMessages();
    vm.sendMessage = function(){
        if (vm.author != null) {
            var message = {
                authorName: vm.author.displayName,
                authorId: vm.author.uid,
                authorPhoto: vm.author.photoURL,
                text: vm.newMessage,
                timestamp : new Date().getTime()
                //date: firebase.database.ServerValue.TIMESTAMP
            }
        } else {
            alert('Сначала зарегестрируйтесь!');
        }
  
        if(vm.newMessage != '') {
            ChatService.sendMessage(message);
            vm.newMessage = '';            
        } else {
            alert('Введите сообщение!');
        }
    }
    vm.login = function(){
        auth.$signInWithPopup('google');    
    }
    vm.logout = function(){
        auth.$signOut();
    }
    vm.deleteThis = function(item){
        vm.shownMessages.$remove(item);
    }
    auth.$onAuthStateChanged(function(authData){
        vm.author = authData;
    })
    /*vm.deleteMessage = function(message){
        var index = vm.shownMessages.indexOf(message); 
        console.log(index);
        vm.shownMessages.splice(index, 1)
    }*/
}

angular.module("cbsChat")
.controller("chatCtrl", ['ChatService', '$firebaseAuth', chatCtrl]);
