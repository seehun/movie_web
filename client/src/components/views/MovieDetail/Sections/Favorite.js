import React, { useEffect, useState } from "react";
import Axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  useEffect(() => {
    let variables = {
      userFrom,
      movieId,
    };

    //얼마나 많은 사람이 이 영화를 favorite 리스트에 넣었는지 숫자정보 얻기
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("숫자 정보 가져오는데 실패");
      }
    });

    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert("정보 가져오는데 실패");
      }
    });
  }, []);

  console.log(FavoriteNumber, Favorited);

  return (
    <div>
      <button>
        {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
