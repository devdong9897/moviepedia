import { useState } from "react";
import Rating from "./Rating";
import "./ReviewList.css";
import ReviewForm from "./ReviewForm";

function formatDate(value) {
  const data = new Date();
  return `${data.getFullYear()}. ${data.getMonth() + 1}. ${data.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const handleDeleteClick = () => {
    onDelete(item.id);
  };

  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating} />
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
        {/* ReviewListItem 컴포넌트에서 수정 버튼이 클릭되면 onEdit 함수가 호출된다.
          이 함수는 수정할 리뷰의 ID를 ReviewList 컴포넌트로 전달한다.
        */}
        <button onClick={handleEditClick}>수정</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  // 현재 수정중인 요소에 Id를 저장할 state
  // ReviewList 컴포넌트는 editingId 상태를 사용해 현재 수정 중인 리뷰의 ID를 추적한다.
  // 이 ID에 맞는 리뷰만 ReviewForm에서 수정할 수 있게 된다.
  const [editingId, setEditingId] = useState(null); // 수정 중인 리뷰 ID 관리.

  const handleCancel = () => setEditingId(null); // 수정 취소
  return (
    <ul>
      {items.map((item) => {
        // item.id (현재 리스트에서 반복문으로 돌고 있는 리뷰의 ID)가 editingId와 일치하면,
        // 그 리뷰를 수정할 수 있도록 ReviewForm 컴포넌트를 렌더링하겠다는 의미.
        if (item.id === editingId) {
          const { imgUrl, title, rating, content } = item;
          // initialValues는 ReviewForm 컴포넌트에 전달할 초기값 객체. ReviewForm에 전달해야되기 때문에 변수를 만들어 할당.
          const initialValues = { title, rating, content };
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues} // 수정할 초기 값
                initialPreview={imgUrl} // 이미지 미리보기 URL
                onCancel={handleCancel} // 수정 취소 시 호출되는 함수
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId} // 수정할 아이템의 ID를 editingId에 설정한다.
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewList;
