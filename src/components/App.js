import { getReviews } from "../api";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  // 2. 매개변수로 받아서 getReviews(api)함수로 전달해서 받아온 데이터안에서 정렬한다.
  const handleLoad = async (options) => {
    const { reviews } = await getReviews(options);
    setItems(reviews);
  };

  // 1. 최신순,베스트순(order)를 handleLoad매개변수에 전달한다.
  useEffect(() => {
    // 여러 개의 설정 값을 한 번에 함수에 전달하기 위해 객체로 작성.
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;
