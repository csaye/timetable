import BaseModal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';

export default function Modal(props) {
  return (
    <BaseModal>
      <div>
        <button>
          <ClearIcon />
        </button>
        {props.children}
      </div>
    </BaseModal>
  );
}
