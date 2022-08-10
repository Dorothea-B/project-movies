import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "./Header";
import DisplayMovieList from "./DisplayMovieList";




const MovieWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

`




const MovieList = ( {movieList, setMovieList} ) => {   

      if (movieList) {

      return <main>


              <Header movieList={movieList} setMovieList = {setMovieList} />
          
              <MovieWrapper>
                
                 {movieList.map(movie => <DisplayMovieList movie = { movie } />)}
              
                 
              </MovieWrapper>
              </main>

 
                  
                          
            }
            
         return null;

}

export default MovieList