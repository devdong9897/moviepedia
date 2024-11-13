import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  // 별점을 클릭했을 때 실행할 함수.
  // 별점을 보여주기만 할때는 onSelect가 필요없다. 그래서 onSelect가 존재할때만,
  // handleClick 함수를 지정해준다.
  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onSelect(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

// ReviewList에서 value전달 받음
// 마우스가 영역을 벗어났을 때 실행할 onMouseOut.
function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
