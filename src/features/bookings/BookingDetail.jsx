import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking.js';
import Spinner from '../../ui/Spinner.jsx';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout.js';
import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
import Modal from '../../ui/Modal.jsx';
import { useDeleteBooking } from './useDeleteBooking.js';
import Empty from '../../ui/Empty.jsx';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { booking, isLoading } = useBooking();
  const { status, id: bookingId } = booking;
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;
  if (!booking || !status) return <Empty resourceName='booking' />;

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            onClick={() => {
              checkout(bookingId);
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens='delete'>
            <Button $variation='danger'>Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate('/bookings'),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
