import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { DETAILS_URL } from "ultils/API_URLS";
import NotFound from "./NotFound";
import 'styles/MovieDetail.css';
import Button from "styles/Button";



const MovieDetailStyle = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background-size: cover;
    background-image: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,1)),
                      url(https://image.tmdb.org/t/p/original${( ({ background }) => background)});
    
    display: flex;
    padding: 40px;


     @media (max-width: 600px) {
        width: 100%;
        height: 100%;
        
    }

`
const MovieInfo = styled.div`
    width: 900px;
    left: 50px;
    bottom: 50px;
    display: flex;
    gap: 50px;

    @media (max-width: 600px) {
        flex-direction: column;
        width: 100%;
        
    }
`

const MovieDetailImg = styled.img`
    width: 400px;
    border: solid 5px #fff;

    @media (max-width: 600px) {
        width: 200px;
        
    }

`


const MovieDetail = ( { movieList } ) => {

    const [movieDetail, setMovieDetail] = useState({});

    const { movieId } = useParams();

    const navigate = useNavigate();

    const onBackBtnClick = () => {
        navigate(-1);
    }
    
    useEffect(() => {
        fetch(DETAILS_URL(movieId))
        .then(res => res.json())
        .then(data => {setMovieDetail(data)})
        .catch(error => console.log(error))
        
    },[movieId])

  

    const matchID = movieList.find(item => item.id === Number(movieId));

    if (!matchID) {
         return <NotFound />
    } 

    return (
        
        <MovieDetailStyle background = {movieDetail.backdrop_path}>

        <Button color='#fff' 
        left='50px' top='50px' 
        leftHover = '30px'
        gapHover ='10px' 
        fontsize = '18px'
        onClick={() => onBackBtnClick(-1)}>
            <span className="link-icon"><IoIosArrowBack /></span>
            Movies
        </Button>
        
           
        <MovieInfo>
            <MovieDetailImg src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`} alt={movieDetail.original_title}/>
            <div>

                <h3>{movieDetail.original_title}</h3>
                <span className='rating'>{movieDetail.vote_average}/10</span>
                <div className='language'>
                        Language:
                        {movieDetail?.spoken_languages?.map(language => {
                        return <span key={language.iso_639_1}>{language.iso_639_1}</span>
                    })}</div>
                    <p>{movieDetail.overview}</p>
                </div>
            </MovieInfo>

        </MovieDetailStyle>
    )
       
    }




export default MovieDetail;