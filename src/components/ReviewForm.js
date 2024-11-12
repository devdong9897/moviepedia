import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    // 여기서 prevValue를 사용하면 title, rating, content, imgFile중 변경된 필드만 갱신되고 나머지는 유지되게 한다.
    // 예를 들어, title을 "Great Movie!"로 변경하면 [name]: value 이 부분은 title: "Great Movie!" 실질적으로 이렇게 되고,
    // values는 { title: "Great Movie!", rating: 0, content: "", imgFile: null }로 설정된다.
    setValues((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  // 제어컴포넌트 : values.title이나 values.rating 같은 state 값이 화면에 표시되는 값과 항상 같도록해준다.
  // 그래서 사용자가 값을 입력할 때마다 setValues가 호출되어 state가 업데이트되며 화면에 즉시 반영.
  // input의 value값을 리액트에 지정.

  // 비제어컴포넌트 : 비제어 컴포넌트는 state가 아닌, DOM 자체에서 값을 가져오는 방식.
  // 예를 들어, <input ref={inputRef} />처럼 ref를 사용해 직접 DOM 요소를 가리킨 후 inputRef.current.value로 값을 읽어온다.
  // input의 value값을 리액트에서 지정하지 않음.
  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        name="rating"
        type="number"
        value={values.rating}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
