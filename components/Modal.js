import BaseModal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';

export default function Modal(props) {
  const { open, setOpen } = props;

  // called on modal close
  function onClose() {
    setOpen(false);
  }

  return (
    <BaseModal
      open={open}
      onClose={onClose}
    >
      <div>
        <button onClick={onClose}>
          <ClearIcon />
        </button>
        {props.children}
      </div>
    </BaseModal>
  );
}
