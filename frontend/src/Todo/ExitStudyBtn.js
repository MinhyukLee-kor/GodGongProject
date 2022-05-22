import React, {useState} from "react";
import TodoModal from './TodoModal.js';
import Button from '@mui/material/Button';

function ExitStudyBtn({task}) {

    let [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Button
                variant="contained"
                style={{ backgroundColor: 'red' }}
                onClick={() => setModalOpen(true)}>
                퇴장
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

export default ExitStudyBtn;
