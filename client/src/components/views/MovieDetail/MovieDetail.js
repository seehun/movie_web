import React, { useEffect ,useState} from "react";
import { API_KEY, API_URL,IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import ActorCards from '../commons/ActorCards';
import {Row} from 'antd';

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [Movie,setMovie] = useState([]);
  const [Actors, setActors]  =useState([]);
  const [toggle,setToggle]= useState(false);

  useEffect(() => {

    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    let endpointInfo =`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;

    fetch(endpointInfo)
    .then((response) => response.json())
    .then(response =>{
      console.log(response);
      setMovie(response);
    })

    
      fetch(endpointCrew)
      .then((response) => response.json())
      .then(response =>{
        setActors(response.cast)
      })
  }, []);

  const toggleActorView=()=>{
    setToggle(!toggle)
  }

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

      <div style={{display:'flex',justifyContent:'center', margin:'2rem'}}>
        <button onClick={toggleActorView}>Toggle Actor View</button>
      </div>

      {/* actors grid */}
      {toggle &&
        <Row gutter={[16,16]}> 
          {Actors && Actors.map((actor,index)=>(
              <React.Fragment key={index}>
                  <ActorCards
                      image = {actor.profile_path ?
                          `${IMAGE_BASE_URL}w500${actor.profile_path}` :null}
                      actorName = {actor.name}
                  />
              </React.Fragment>
          ))}

        </Row>
      }
      

    </div>

  </div>
  );
}

export default MovieDetail;
