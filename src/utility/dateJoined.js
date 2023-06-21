export default function getJoinedMonthYear(date) {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `Joined ${month}, ${year}`;
  }
  
  // Example usage:
  const currentDate = new Date();
  console.log(getJoinedMonthYear(currentDate)); // Outputs something like "June, 2023"
  