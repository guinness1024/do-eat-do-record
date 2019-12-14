import React from "react";
import ReactSwipe from "react-swipe";
import Place from "../../components/Place";
import "./SearchList.scss";

const SearchList = ({viewDetail, placeList, selectedIndex, setIndex}) => {
  
  const options = {
    startSlide: selectedIndex,
    continuous: false,
    transitionEnd(index) {
      setIndex(index);
    }
  };
  
  return (
    <div className="search-list">
      <ReactSwipe swipeOptions={options}>
        {
          placeList.map(({placeId, ...rest}) => <Place key={placeId} place={{placeId, ...rest}} viewDetail={viewDetail}/>)
        }
      </ReactSwipe>
    </div>
  );
};

export default SearchList;
