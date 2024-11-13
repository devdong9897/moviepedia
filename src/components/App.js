import { createReview, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";

const LIMIT = 6;

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");

  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 2. 매개변수로 받아서 getReviews(api)함수로 전달해서 받아온 데이터안에서 정렬한다.
  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { paging, reviews } = result;
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      // 비동기로 state를 변경할때에는 잘못된 시점에 값을 사용하는 문제가 있다.
      // 이럴땐 세터함수의 값이 아니라 콜백(prevItems)을 전달해서 해결하면 된다.
      // 그래서 비동기 상황에서 state를 변경할때 이전 state값을 사용하려면 세터함수에서 콜백을 사용해서 이전 state를 사용한다.
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    // 현재 위치(options.offset)에 방금 불러온 데이터 개수(reviews.length)를 더해서 다음 위치를 설정.
    setOffset(options.offset + reviews.length);
    // 더 이상 불러올 데이터가 없을때...
    setHasNext(paging.hasNext);
  };

  // 다음 페이지를 불러올 함수
  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
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
      <ReviewForm
        onSubmit={createReview}
        onSubmitSuccess={handleCreateSuccess}
      />
      <ReviewList
        items={sortedItems}
        onDelete={handleDelete}
        onUpdate={updateReview}
        onUpdateSuccess={handleUpdateSuccess}
      />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {/* 에러메시지 값이 있을때만 span으로 표시 */}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
