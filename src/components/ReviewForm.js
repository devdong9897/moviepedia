import { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import { createReview } from "../api";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({ onSubmitSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(INITIAL_VALUES);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // new FormData() : 웹에서 폼을 제출할 때, 데이터를 서버로 전송할 때 주로 사용되는 방법.
    // formData.append()로 formData에 데이터 추가.
    // createReview(formData)를 호출해서 데이터를 서버로 전송.
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await createReview(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { review } = result;
    onSubmitSuccess(review);
    setValues(INITIAL_VALUES);
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
      <RatingInput value={values.rating} onChange={handleChange} />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      />
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {submittingError?.message && <span>{setIsSubmitting.message}</span>}
    </form>
  );
}

export default ReviewForm;
