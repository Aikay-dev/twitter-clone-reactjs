export default function getJoinedMonthYear(date) {
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `Joined ${month}, ${year}`;
  }
  

  export function getTweetDate(){
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const currentDate = new Date();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    
    const formattedDate = `${month}, ${day}`;
    
    return formattedDate
    
  }