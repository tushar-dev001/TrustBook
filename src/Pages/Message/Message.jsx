import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import profile from "../../../public/assets/tushar.jpg";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import Swal from "sweetalert2";
import moment from "moment/moment";
import { BsFillImageFill } from "react-icons/bs";
import LinearProgress from "@mui/material/LinearProgress";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  getStorage,
  ref as imgref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ModalImage from "react-modal-image";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Message = () => {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  let [progress, setProgress] = useState(0);
  const userTotalInfo = useSelector((state) => state.userData.userInfo);
  const activeChat = useSelector((state) => state.activeChat.activeChat);
  const db = getDatabase();
  const storage = getStorage();

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const handleMsgSend = () => {
    if (activeChat.type == "groupMsg") {
      console.log("groupMsg");
    } else {
      if (msg !== "") {
        set(push(ref(db, "singleMsg")), {
          senderName: userTotalInfo.displayName,
          senderId: userTotalInfo.uid,
          receiverName: activeChat.name,
          receiverId: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Write something!",
        });
      }
    }

    setMsg({
      ...msg,
      message: "",
    });
  };

  useEffect(() => {
    const msgRef = ref(db, "singleMsg");
    onValue(msgRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().senderId == userTotalInfo.uid &&
            item.val().receiverId == activeChat.id) ||
          (item.val().senderId == activeChat.id &&
            item.val().receiverId == userTotalInfo.uid)
        ) {
          arr.push(item.val());
        }
      });
      setMsgList(arr);
    });
    console.log(msgList);
  }, [activeChat.id]);

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      if (activeChat.type == "groupMsg") {
        // console.log("groupMsg");
      } else {
        if (msg !== "") {
          set(push(ref(db, "singleMsg")), {
            senderName: userTotalInfo.displayName,
            senderId: userTotalInfo.uid,
            receiverName: activeChat.name,
            receiverId: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Write something!",
          });
        }
      }
      setMsg({
        ...msg,
        message: "",
      });
    }
  };

  const handleImgUplode = (e) => {
    console.log(e.target.files[0]);
    const storageRef = imgref(storage, `${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on("state_changed", (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      setProgress(progress);
    }),
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(0);
          console.log("success Uploaded");
          if (activeChat.type == "groupMsg") {
            console.log("group");
            // set(push(ref(db, "groupmsg")), {
            //   whosendname: userData.displayName,
            //   whosendid: userData.uid,
            //   whorecivename: activeChat.name,
            //   whoreciveid: activeChat.id,
            //   img: downloadURL,
            //   date: `${new Date().getFullYear()}-${
            //     new Date().getMonth() + 1
            //   }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            // });
          } else {
            set(push(ref(db, "singleMsg")), {
              senderName: userTotalInfo.displayName,
              senderId: userTotalInfo.uid,
              receiverName: activeChat.name,
              receiverId: activeChat.id,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          }
        });
      };
  };

  return (
    <div className="mt-36 md:mt-14">
      <div className="chatbox p-3 md:p-6">
        <div className="msgprofile">
          {/* <div className='signal'>
            <img width="50" src={profile} />
            
            <div className='round'></div>
        </div> */}
          <div>
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <img width="50" src={profile} alt="" />
              </StyledBadge>
            </Stack>
          </div>
          <div>
            <h3>{activeChat.name}</h3>
            <p>Online</p>
          </div>
        </div>
        <div className="msgbox">
          {/* <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div> */}

          {/* <div className="msg">
            <p className="getimg">
              <ModalImage small={registrationimg} large={registrationimg} />
            </p>
            <p className="time">Today, 2:01pm</p>
          </div>
          <div className="msg">
            <p className="sendimg">
              <ModalImage small={registrationimg} large={registrationimg} />
            </p>
            <p className="time">Today, 2:01pm</p>
          </div> */}

          {/* <div className="msg">
            <p className="getaudio">
              <audio controls></audio>
            </p>
            <p className="time">Today, 2:01pm</p>
          </div>
          <div className="msg">
            <p className="sendaudio">
              <audio controls></audio>
            </p>
            <p id="audioSend" className="time">
              Today, 2:01pm
            </p>
          </div> */}
          {/* 
          <div className="msg">
            <p className="getaudio">
              <video width="320" height="240" controls></video>
            </p>
            <p className="time">Today, 2:01pm</p>
          </div>
          <div className="msg">
            <p className="sendaudio">
              <video width="320" height="240" controls></video>
            </p>
            <p id="audioSend" className="time">
              Today, 2:01pm
            </p>
          </div> */}

          {activeChat.type == "singleMsg" ? (
            msgList.map((item) =>
              item.senderId == userTotalInfo.uid &&
              item.receiverId == activeChat.id ? (
                <div key={item.id} className="msg">
                  {item.msg ? (
                    <p className="sendmsg">{item.msg}</p>
                  ) : (
                    <p className="sendmsg">
                      <ModalImage small={item.img} large={item.img} />
                    </p>
                  )}
                  <p className="time">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ) : (
                <div key={item.id} className="msg">
                  <p className="getmsg">{item.msg}</p>
                  <p className="time">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              )
            )
          ) : (
            <p>Group</p>
          )}
        </div>
        <div className="msgcontainer">
          <div className="msgwritecon relative">
            <input
              onChange={handleMsg}
              onKeyUp={handleKeyPress}
              name="message"
              value={msg.message}
              className="msgwrite"
            />
            <label>
              <BsFillImageFill className="absolute top-4 right-8 text-2xl text-black" />
              <input onChange={handleImgUplode} type="file" hidden />
            </label>
          </div>
          <Button onClick={handleMsgSend} variant="contained">
            Send
          </Button>
        </div>
      </div>
      {progress !== 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      )}
    </div>
  );
};

export default Message;
