import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import profile from "../../../public/assets/tushar.jpg"
import registrationimg from "../../../public/assets/cover.jpg"
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
import { Stack } from "@mui/material";

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


const Message = () => {
  return (
    <div className="mt-36 md:mt-14">
    <div className='chatbox p-3 md:p-6'>

    <div className='msgprofile'>
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
              <img width='50' src={profile} alt="" />
            </StyledBadge>
          </Stack>
        </div>
        <div>
            <h3>Tushar Imran</h3>
        <p>Online</p>
        </div>
    </div>
    <div className='msgbox'>
        {/* <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div> */}
        <div className='msg'>
            <p className='getimg'>

                <ModalImage
                small={registrationimg}
                large={registrationimg}
                />
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendimg'>
                
                <ModalImage
                small={registrationimg}
                large={registrationimg}
                />
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getaudio'>
                <audio controls></audio>
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendaudio'>
                <audio controls></audio>
            </p>
            <p id="audioSend" className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getaudio'>
               <video width="320" height="240" controls></video>
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendaudio'>
               <video width="320" height="240" controls></video>
            </p>
            <p id="audioSend" className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        
    </div>
    <div className='msgcontainer'>
       <div className='msgwritecon'>
        <input className='msgwrite'/>
       </div>
       <Button variant="contained">Send</Button>
    </div>




    </div>
    </div>
  )
}

export default Message