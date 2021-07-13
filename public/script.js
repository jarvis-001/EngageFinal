// $("#dialog").dialog({
    
//     autoOpen: true,
//     buttons: {
    
//         Video_Room: function() { 
    
            
//         },
//         Chat_Room: function() { 
            
//             ChatRoom() 

//         },
        
    
//     },
//     width: "400px"
    
// });
const ChatRoom =()=>{
    $('.main__header__in__chat').css({
        "display":"inline-flex",
        "flex-direction":"row-reverse",
        "background":"#212529",
        "position": "absolute",
        "width":"100%",
        "height":"20%",
        "right": "0",
        "top": "0",
        "left": "0",
         "z-index":"1000",
        "flex":"1"
    })
    $('.meeetingName').css({
        "display":"flex",
        "padding-top":"15%",
        "position": "absolute",
        "top": "-45%",
        "left": "10",
        "font-size":"large",
        "z-index":"10000",
        "color":"white"
        
    })
    $(".main__right").css({ 
        "position": "absolute",
        "width":"100%",
        "height":"80%",
        "right": "0",
        "bottom": "0",
        "left": "0",
         "z-index":"1000",
        "flex":"1"
    });
    muteUnmute();
    playStop();
}


// if (confirm("Join Video Room")) {
    
//   } else {
//     ChatRoom();
//   }

$(".main__left").css({ 
    "position": "absolute",
    "width":"100%",
    "top": "0",
    "right": "0",
    "bottom": "0",
    "left": "0",
    "z-index":"200",
    "flex":"1"
});





var a;
do {
    a = prompt('Please enter your name: ')
} while(!a)
  

const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined,{
    path: '/peerjs',
    host: '/',
    port: '3030'
//    port: '443' //for heroku
}); 

let myVideoStream 
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: {
         echoCancellation: true,
    noiseSuppression: true
    }
}).then(stream =>{
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    // ChatRoom();
    if (confirm("Go to Chat Room Directly")) {
        ChatRoom();
  } else {
    
  }

    peer.on('call', call => {
        call.answer(stream) // Answer the call with an A/V stream.
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })

    // socket.on('user-connected',(userId)=>{
    //     connecToNewUser(userId,stream);
    // })
    socket.on("user-connected", (userId) => {
        console.log("user connected...........",userId);

        setTimeout(()=>
          {
            connecToNewUser(userId, stream);
          },1000)
    })

    socket.on("init-messages", message => {
        // console.log("in init message" + message);
        var arr= message;
        console.log(typeof(arr));
        for (let key in arr) {            
            for (let key2 in arr[key]) {
                if(arr[key][key2].user == undefined) continue;
                $('ul').append(`<li class ="message"><b>${arr[key][key2].user}</b><br/>${arr[key][key2].message}</li>`)
                 
            }
        }
        scrollToBottom()
    })



  
})
peer.on('open', id =>{
    socket.emit('join-room',ROOM_ID,id);
})






const connecToNewUser = (userId, stream)=>{
    console.log("new user",userId)
    const call = peer.call(userId,stream);
    const video = document.createElement('video');
    console.log("just")
    call.on('stream', userVideoStream =>{
        addVideoStream(video, userVideoStream)
        console.log("calling")
    })
}

const addVideoStream =(video,stream) =>{ 
    // console.log("in add1")  //true
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
  
    videoGrid.append(video);
}

 // input value
 let text = $("input");
 // when press enter send message
 $('html').keydown(function (e) {
   if (e.which == 13 && text.val().length !== 0) {
     //socket.emit('message', text.val());
     
     sendMessage(text.val())
     text.val('')
   }
 });

 function sendMessage(message) {
    let msg = {
        user: a,
        message: message.trim(),
        mid:ROOM_ID //can use roomid for this too //database for this too
    }
    // Append 
    scrollToBottom()

    socket.emit('message', msg)

}
socket.on('createMessage',(message)=>{
    $('ul').append(`<li class ="message"><b>${message.user}</b><br/>${message.message}</li>`)
    scrollToBottom()
})
const scrollToBottom =()=>{
    let d =$('.main__chat__window');
    d.scrollTop(d.prop("scrollHeight"));
}
$(".main__left").css({ 
    "position": "absolute",
    "width":"100%",
    "top": "0",
    "right": "0",
    "bottom": "0",
    "left": "0",
    "z-index":"200",
    "flex":"1"
});
var i=0;

const leaveRoom=()=>{
    open(location, '_self').close();

}

const joinVideo =()=>{
    $('.main__header__in__chat').css({
        "display":"",
        "flex-direction":"",
        "background":"#212529",
        "position": "",
        "width":"",
        "height":"",
        "right": "",
        "top": "",
        "left": "",
        "z-index":""
    })
    $('.meeetingName').css({
        "display":"none",
        "padding-top":"",
        "position": "",
        "top": "",
        "left": "",
        "font-size":"",
        "z-index":"0"
        
    })
    $(".main__right").css({ 
        "position": "",
        "width":"",
        "height":"",
        "right": "",
        "bottom": "",
        "left": "",
        "z-index":"",
        "flex":""
    });
//     $(".main__left").css({
//         "position": "",
//         "width":"",
//         "top": "",
//         "right": "",
//         "bottom": "",
//         "left": "",
//         "z-index":"1000",
//         "flex":"", 
//         "display": "flex",
//         "flex-direction":"column",
//         "flex":"0.8"
//     });
//     $(".main__right__1").css({
//          "position": "absolute",
//          "width":"20%",
//         // "top": "",
//         // "right": "",
//         // "bottom": "",
//         // "left": "",
//         "z-index":"100",
//         "flex":"", 
//         "display": "flex",
//         "flex-direction":"column",
//         "flex":"0.2"
//     });
//     $(".main__right").css({
//         "position": "",
//         "width":"",
//         "height":"100%",
//        "top": "",
//        "right": "",
//        "bottom": "",
//        "left": "",
//        "z-index":"1000",
//        "flex":"", 
//        "display": "",
//        "flex-direction":"",
//        "flex":""
//    });
   $('.main__header__in__chat').css({
    "display":"none",
    
})
$('.meetingName').css({
    "display":"none",
})
    unShowing();
}




const showChat =()=>{
    i=i+1;
    console.log("Chat",i);
    document.querySelector('.main__left').style.color="red";
    $(".main__videos").css( "stretch", "fit" );
    if(i%2==0)
    {
        $(".main__left").css({ 
            "position": "absolute",
            "width":"100%",
            "top": "0",
            "right": "0",
            "bottom": "0",
            "left": "0",
            // "z-index":"200",
            "flex":"1"
        });
        showingChat();
    }
    else if(i%2!=0){
        $(".main__left").css({
            "position": "",
            "width":"",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            // "z-index":"1000",
            "flex":"", 
            "display": "flex",
            "flex-direction":"column",
            "flex":"0.8"
        });
        $(".main__right__1").css({
             "position": "absolute",
             "width":"20%",
            // "top": "",
            // "right": "",
            // "bottom": "",
            // "left": "",
            // "z-index":"",
            "flex":"", 
            "display": "flex",
            "flex-direction":"column",
            "flex":"0.2"
        });
        $(".main__right").css({
            "position": "",
            "width":"",
           "top": "",
           "right": "",
           "bottom": "",
           "left": "",
        //    "z-index":"",
           "flex":"", 
           "display": "",
           "flex-direction":"",
           "flex":""
       });
        unShowing();
    }
}
var j=0;
const showParticipants =()=>{
    j=j+1;
    console.log("Hi")
    showingChat(); //to remove chat window if present
    if(j%2==0)
    {
        $(".main__left").css({ 
            "position": "absolute",
            "width":"100%",
            "top": "0",
            "right": "0",
            "bottom": "0",
            "left": "0",
            // "z-index":"200",
            "flex":"1"
        });
        // showingChat();
    }
    else if(j%2!=0){
        $(".main__left").css({
            "position": "",
            "width":"",
            "top": "",
            "right": "",
            "bottom": "",
            "left": "",
            // "z-index":"1000",
            "flex":"", 
            "display": "flex",
            "flex-direction":"column",
            "flex":"0.8"
        });
        $(".main__right").css({
             "position": "absolute",
             "width":"20%",
            // "top": "",
            // "right": "",
            // "bottom": "",
            // "left": "",
            // "z-index":"",
            "flex":"", 
            "display": "flex",
            "flex-direction":"column",
            "flex":"0.2"
        });$(".main__right__1").css({
            "position": "",
            "width":"",
           "top": "",
           "right": "",
           "bottom": "",
           "left": "",
        //    "z-index":"",
           "flex":"", 
           "display": "",
           "flex-direction":"",
        })
           
        
}}

const showingChat = ()=>{
    
    const htmle =`
    <i class="fas fa-comment-alt"></i>
    <span>Show Chats</span>`
    document.querySelector('.main__chat__button').innerHTML= htmle;
}

const unShowing = ()=>{
    console.log("sishow chat")
    const htmle =`
    <i class="fas fa-comment-alt"></i>
    <span>Hide Chats</span>`
    document.querySelector('.main__chat__button').innerHTML= htmle;
}
const setMuteButton = () =>{
    const htmle =`
    <i class = "fas fa-microphone"></i>
    <span>Mute</span>`
    document.querySelector('.main__mute__button').innerHTML = htmle;
}

const muteUnmute =()=>{
    console.log(myVideoStream);
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if(enabled){
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    } else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}



const setUnmuteButton = () =>{
    const htmle =`
    <i class = "unmute fas fa-microphone-slash"></i>
    <span>UnMute</span>`
    document.querySelector('.main__mute__button').innerHTML = htmle;
}

const playStop =()=>{
    console.log("in playstop")
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled){
        console.log(enabled);
        myVideoStream.getVideoTracks()[0].enabled =false;
        // myVideoStream.getVidioTracks()[0].enabled = false;
        setPlayVideo();
    } else {
        setStopVideo();
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}
const setPlayVideo = () =>{
    console.log("setplaybtn");
    const htmle =`
    <i class = "stop fas fa-video-slash"></i>
    <span>Stop Video</span>`
    document.querySelector('.main__video__button').innerHTML = htmle;
}
const setStopVideo = () =>{
    console.log("setstopbtn");
    const htmle =`
    <i class = "fas fa-video"></i>
    <span>Play Video</span>`
    document.querySelector('.main__video__button').innerHTML = htmle;
}
//chat tk ka ho gaya + chat wala bariya chalra



//const start = document.getElementById("start");
//const stop = document.getElementById("stop");
const videoElement = document.createElement("video");
function startCapture(){
let shareStream 
navigator.mediaDevices.getDisplayMedia({
    video:{
        cursor:'always'

    },
    audio:false
}).then(stream =>{
    shareStream = stream;
    addVideoStream(videoElement, stream);

    peer.on('call', call => {
        call.answer(stream) // Answer the call with an A/V stream.
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
          addVideoStream(video, userVideoStream)
        })
      })

    // socket.on('user-connected',(userId)=>{
    //     connecToNewUser(userId,stream);
    // })
    socket.on("user-connected", (userId) => {
        console.log("user connected...........");
        setTimeout(()=>
          {
            connecToNewUser(userId, stream);
          },1000)
    })
  
})

var displayMediaOptions = {
    video:{
        cursor:'always',
        transform: 'rotateY(180deg)'
    },
    audio:false
}
}
// start.addEventListener("click", e=>{
//     startCapture()
// },false)
// stop.addEventListener("click", e=>{
//     stopCapture()
// },false)

// async function startCapture(){
//     try{
//         videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
//     }catch(err){
//         console.log("Error"+ err)
//     }
// }

function stopCapture(e){
    let tracks = videoElement.srcObject.getTracks()
    tracks.forEach(track =>track.stop())
    videoElement.srcObject = null    
}
  


// let recorder,steam;

// const steam = navigator.mediaDevices.getDisplayMedia({
//     video:{MediaSource:"screen"}
// });

// const recorder= new MediaDevices(steam);

// const chunks=[];
// recorder.ondataavailable=e=>chunks.push(e.data);
// recorder.start();

// recorder.onstop=e=>{
//     const completeBlob= new Blob(chunks,{type:chunks[0].type})
//     video.src=URL.createObjectURL(completeBlob)
// }}
