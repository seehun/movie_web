import React, { useEffect ,useState} from "react";
import { API_KEY, API_URL,IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [Movie,setMovie] = useState([])

  useEffect(() => {

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    let endpointInfo =`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`

    fetch(endpointInfo)
    .then((response) => response.json())
    .then(response =>{
      console.log(response);
      setMovie(response);
    })
  }, []);


  return (
  <div>
    {/* Header */}

    {Movie && 
      <MainImage 
      image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
      title={Movie.original_title}
      description ={Movie.overview}
      />}

    {/* body */}
    <div style={{width:'85%', margin:'1rem auto'}}>

      {/* movie info */}
      {Movie &&
        <MovieInfo item={Movie} />
      }
      

      <br />
      {/* actors grid */}

      <div style={{display:'flex',justifyContent:'center', margin:'2rem'}}>
        <button>Toggle Actor View</button>
      </div>

    </div>

  </div>
  );
}

export default MovieDetail;
