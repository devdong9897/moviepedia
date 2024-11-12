import { useState } from "react";

// ReviewForm컴포넌트에서 props로 받음.
function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    // 파일입력은 브라우저에서 관리하는 특별한 속성이므로 제어 컴포넌트 방식으로는 사용할 수 없다.
    // 그래서 ref사용.
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  return <input type="file" onChange={handleChange} />;
}

export default FileInput;