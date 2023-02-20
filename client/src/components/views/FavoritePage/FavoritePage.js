import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoriteMovie();
  }, []);

  const fetchFavoriteMovie = () => {
    Axios.post("api/favorite/getFavoriteMoive", { userFrom: localStorage.getItem("userId") }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorites(response.data.info);
      } else {
        alert("영화 정보 가져오는데 실패");
      }
    });
  };

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    Axios.post("api/favorite/removeFromFavorite", variables).then((response) => {
      if (response.data.success) {
        fetchFavoriteMovie();
      } else {
        alert("지우는데 실패");
      }
    });
  };

  const renderCards = Favorites.map((Favorite, index) => {
    const content = <div>{Favorite.moviePost ? <img src={`${IMAGE_BASE_URL}w500${Favorite.moviePost}`} /> : "no image"}</div>;
    return (
      <tr key={index}>
        <Popover content={content} title={`${Favorite.movieTitle}`}>
          <td>{Favorite.movieTitle}</td>
        </Popover>

        <td>{Favorite.movieRunTime} mins</td>
        <td>
          <button onClick={() => onClickDelete(Favorite.movieId, Favorite.userFrom)}>Remove</button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorite</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
