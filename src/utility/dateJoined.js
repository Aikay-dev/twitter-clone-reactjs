export default function getJoinedMonthYear(date) {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `Joined ${month}, ${year}`;
  }
  