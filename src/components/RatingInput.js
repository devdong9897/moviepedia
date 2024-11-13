import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

function RatingInput({ name, value, onChange }) {
  // 선택한 별점을 보여주거나 마우스를 올렸을 때 별점을 미리보는데 사용하는 state
  const [rating, setRating] = useState(value);

  // onChange가 ReviewForm 컴포넌트로 전달하여 반영.
  // name은 어떤 필드인지 구분하기 위해 넘기는 값으로, 여기서는 별점이니까 "rating"이 된다.
  // nextValue는 선택한 별점 값이 들어가고, 이 값을 onChange 함수에 전달.
  const handleSelect = (nextValue) => onChange(name, nextValue);

  const handleMouseOut = () => setRating(value);

  // Rating 컴포넌트에 props로 전달해준다.
  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouseOut}
    />
  );
}

export default RatingInput;
