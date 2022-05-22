import React, {useState} from "react";
import TodoModal from './TodoModal.js';
import Button from '@mui/material/Button';

function JoinStudyBtn({task}) {

    let [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                onClick={() => setModalOpen(true)}>
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
                    setOpen={setModalOpen}/>
            }
        </div>
    );
}

export default JoinStudyBtn;
