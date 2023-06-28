import React, {useState} from 'react'


const TextComponent = ({ text }) => {
    const [showMore, setShowMore] = useState(false);
  
    const handleClick = () => {
      setShowMore(!showMore);
    };
  
    const renderText = () => {
      const words = text.split(' ');
  
      if (words.length <= 50 || showMore) {
        return text;
      } else {
        const truncatedText = words.slice(0, 50).join(' ');
        return (
          <>
            {truncatedText} {"..."}
            <button onClick={handleClick} className="text-sm bluetext hover:underline">  Show more</button>
          </>
        );
      }
    };
  
    return <p className="pr-2 " style={{whiteSpace:"pre-wrap"}}>{renderText()}</p>;
}

export default TextComponent