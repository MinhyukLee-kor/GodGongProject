import React, { useState, useEffect } from "react";
import Badge from '@mui/material/Badge';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import IconButton from '@mui/material/IconButton';
import { Box, SwipeableDrawer } from '@mui/material/';
import Chatting from "./Chatting";


function ChattingBox(props) {

    let [open, setOpen] = useState(false);

    let toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        if (open == false) {
            props.setBadgeNum(0); //close될 때 props.meesageNum 0으로 초기화
        }
        setOpen(open);
    };

    return (
        <div>
            <IconButton color="inherit" onClick={toggleDrawer(true)} style={{ backgroundColor: 'transparent' }}>
                <Badge badgeContent={props.badgeNum} color="error">
                    <ChatBubbleIcon sx={{ fontSize: 50 }} />
                </Badge>
            </IconButton>
            <SwipeableDrawer
                anchor='right'
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Box sx={{ width: 350 }}>
                    <Chatting />
                </Box>
            </SwipeableDrawer>
        </div>
    );
}

export default ChattingBox;