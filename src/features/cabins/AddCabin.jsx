import Button from '../../ui/Button.jsx';
import Modal from '../../ui/Modal.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';
import styled from 'styled-components';

const StyledAddCabin = styled.div`
  text-align: right;
`;

function AddCabin() {
  return (
    <StyledAddCabin>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </StyledAddCabin>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
//         {isOpenModal ? 'Close form' : 'Add new cabin'}
//       </Button>
//
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
