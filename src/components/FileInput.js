import { useEffect, useRef, useState } from "react";

// ReviewForm컴포넌트에서 props로 받음.
function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();

  const inputRef = useRef();

  const handleChange = (e) => {
    // 파일입력은 브라우저에서 관리하는 특별한 속성이므로 제어 컴포넌트 방식으로는 사용할 수 없다.
    // 그래서 ref사용.
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  // 버튼을 클릭했을 때 실행할 함수
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  // useEffect를 사용함으로써 value가 바뀔 때만 미리보기 URL을 만들어 이미지 미리보기를 업데이트할 수 있다.
  useEffect(() => {
    // 값이 없는 경우, 즉 선택한 이미지가 없는 경우는 바로 종료.
    if (!value) return;

    // 파일을 임시로 URL 형태로 만들어 주는 기능입니다. 이 URL을 사용하면 사용자가 업로드한 파일을 브라우저에서 미리 볼 수 있다.
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    // 이 URL은 브라우저가 임시로 만든 주소라서 나중에 사용하지 않을 때 제거해 주는 것이 좋다.
    // 브라우저에서 만든 임시 URL을 해제해 메모리를 절약한다.
    // 계속해서 새로운 URL을 만들면 브라우저에 불필요한 URL이 쌓일 수 있는데, 이 함수가 그런 걸 방지해 준다.
    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        ref={inputRef}
      />
      {/* 파일 초기화 */}
      {value && <button onClick={handleClearClick}>X</button>}
    </div>
  );
}

export default FileInput;
