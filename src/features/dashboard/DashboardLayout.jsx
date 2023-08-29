import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings.js';
import Spinner from '../../ui/Spinner.jsx';
import { useRecentStays } from './useRecentStays.js';
import Stats from './Stats.jsx';
import { useCabins } from '../cabins/useCabins.js';
import SalesChart from './SalesChart.jsx';
import DurationChart from './DurationChart.jsx';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isRecentBookingsLoading } = useRecentBookings();
  const {
    isLoading: isRecentStaysLoading,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useCabins();

  const isLoading =
    isRecentBookingsLoading || isRecentStaysLoading || isCabinsLoading;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
