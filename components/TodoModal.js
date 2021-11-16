import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';

import { useState } from 'react';

import styles from '../styles/components/TodoModal.module.css';

export default function TodoModal() {
  const [newTitle, setNewTitle] = useState(title);
  const [newDate, setNewDate] = useState(date);

  return (
    <Modal open={modalOpen} setOpen={setModalOpen}>
      <h1>Editing Todo</h1>
      <form onSubmit={e => {
        e.preventDefault();
        updateTodo();
      }}>
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          required
        />
        <button className="graybutton">
          Update
        </button>
      </form>
      <button className="iconbutton" onClick={deleteTodo}>
        <DeleteIcon />
      </button>
    </Modal>
  );
}
