import styled from 'styled-components';

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import { useTodayActivity } from './useTodayActivity.js';
import Spinner from '../../ui/Spinner.jsx';
import TodayItem from './TodayItem.jsx';
import { useAppCtx } from '../../context/AppCtx.jsx';

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const testActivities = [
  {
    id: 1,
    status: 'checked-in',
    'wild-oasis-guests': {
      countryFlag: 'https://flagcdn.com/de.svg',
      country: 'India',
      fullName: 'Alice Mugglestone',
    },
    numNights: 3,
  },
  {
    id: 2,
    status: 'unconfirmed',
    'wild-oasis-guests': {
      countryFlag: 'https://flagcdn.com/us.svg',
      country: 'USA',
      fullName: 'Dan Brown',
    },
    numNights: 5,
  },
  {
    id: 3,
    status: 'checked-in',
    'wild-oasis-guests': {
      countryFlag: 'https://flagcdn.com/fr.svg',
      country: 'France',
      fullName: 'Nicholas Jackson',
    },
    numNights: 2,
  },
  {
    id: 4,
    status: 'unconfirmed',
    'wild-oasis-guests': {
      countryFlag: 'https://flagcdn.com/us.svg',
      country: 'USA',
      fullName: 'Dan Brown',
    },
    numNights: 5,
  },
  {
    id: 5,
    status: 'checked-in',
    'wild-oasis-guests': {
      countryFlag: 'https://flagcdn.com/de.svg',
      country: 'India',
      fullName: 'Parvati Gandhi',
    },
    numNights: 3,
  },
];

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const { isTestMode } = useAppCtx();

  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading as='h2'>Today</Heading>
      </Row>

      {isTestMode && (
        <TodayList>
          {testActivities.map((activity) => (
            <TodayItem activity={activity} key={activity.id} />
          ))}
        </TodayList>
      )}

      {!isTestMode &&
        (!isLoading ? (
          activities?.length > 0 ? (
            <TodayList>
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </TodayList>
          ) : (
            <NoActivity>No activity today</NoActivity>
          )
        ) : (
          <Spinner />
        ))}
    </StyledToday>
  );
}

export default TodayActivity;
