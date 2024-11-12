import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 여기서 prevValue를 사용하면 title, rating, content중 변경된 필드만 갱신되고 나머지는 유지되게 한다.
    // 예를 들어, title을 "Great Movie!"로 변경하면 [name]: value 이 부분은 title: "Great Movie!" 실질적으로 이렇게 되고,
    // values는 { title: "Great Movie!", rating: 0, content: "" }로 설정된다.
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={values.title} onChange={handleChange} />
      <input
        name="rating"
        type="number"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea name="content" value={values.content} onChange={handleChange} />
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
