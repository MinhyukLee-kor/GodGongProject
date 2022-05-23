import React, { useState } from "react";
import TodoModal from './TodoModal.js';
import Button from '@mui/material/Button';

function JoinStudyBtn({ task }) {

    let [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Button
                style={{ backgroundColor: '#2fbe9f ' }}
                variant="contained"
                onClick={() => setModalOpen(true)}
                sx={{ backgroundColor: '#2FBE9F'}}>
                {
                    task == 'onlyMake'
                        ? 'todo생성'
                        : '참여'
                }
            </Button>
            {
                modalOpen && <TodoModal
                    task={task}
                    open={modalOpen}
                    setOpen={setModalOpen} />
            }
        </div>
    );
}

export default JoinStudyBtn;
