import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MAIN, GREYS } from '../../styles/variables';
export default function Bookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <>
      <FontAwesomeIcon
        style={{
          color: isBookmarked ? MAIN.MEDIUM : GREYS.MEDIUM,
          cursor: 'pointer',
          animation: isBookmarked ? 'bounce 0.75s' : '',
          fontSize: isBookmarked ?? '2rem',
        }}
        onClick={handleBookmark}
        icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
        size='xl'
      />
    </>
  );
}
