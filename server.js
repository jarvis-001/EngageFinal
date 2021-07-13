const express = require("express");
const Meeting = require("./models/Meeting");
const Room = require("./models/Room")
const app = express();
const mongoose = require("mongoose");
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const { ExpressPeerServer } = require("peer");
const bodyParser = require("body-parser")
const peerServer = ExpressPeerServer(server, {
  //1:26
  debug: true,
});

// MongoDB Configuration
const db =
  "mongodb+srv://ghanshyam:ghanshyam@engage.nmboa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

mongoose.set("debug", true);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.use("/peerjs", peerServer);
const rid=uuidv4()
app.get("/", (req, res) => {
  res.redirect(`/${rid}`);
});
var q =0;
app.get("/:room", (req, res) => {
  res.render('start',{ roomId: req.params.room })
  // if(q==0)
  // {
  //   q=q+1;
  //   res.render('start',{ roomId: req.params.room })
  // }
  // else {
  //  res.render("room", { roomId: req.params.room });
  // }
});

app.post("/", function(req,res){
  let newRoom = new Room({
     mid:rid,
    mname:req.body.nname,
    mpass:req.body.npass
  })
  newRoom.save();
  res.render("room", { roomId: rid });
})
app.post("/join",async function(req,res){
  let newRoom = new Room({
    mid:rid,
   mname:req.body.mname,
   mpass:req.body.mpass
 })
  var room = await Room.findOne({ mname: newRoom.mname }).catch((e)=>console.log(e));
  if (!room || newRoom.mpass!=room.mpass) {
    // window.alert("Wrong Room-Name or password")
   } else{
      res.render("room", { roomId: room.mid});}
    })

io.on("connection", (socket) => {
  socket.on("join-room", async (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    var meeting = await Meeting.findOne({ mid: roomId });
    if (!meeting) meeting = new Meeting({ mid: roomId });
    await meeting.save();

    socket.emit("init-messages", meeting);
    // console.log(meeting.mchat);

    socket.on("message", async (message) => {
      const updatedMeeting = await Meeting.findOneAndUpdate(
        { mid: message.mid },
        {
          $addToSet: {
            mchat: {
              message: message.message,
              user: message.user,
              timestamp: Date.now(),
            },
          },
        },
        { new: true }
      ).lean();

      io.to(roomId).emit("createMessage", message);
    });
  });
});
server.listen(process.env.PORT || 3030);