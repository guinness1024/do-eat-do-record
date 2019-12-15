import React, {useEffect} from "react";
import "./KakaoMap.scss";

const KakaoMap = ({placeList = [], markers = [], selectedIndex = 0}) => {
  // 카카오맵 초기화
  useEffect(() => {
    map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(37.288701, 127.051681),
      level: 5
    });
  }, []);
  
  // 마커와 오버레이 그리기
  useEffect(() => {
    markers.map(({marker, overlay}) => {
      marker.setMap(map);
      overlay && overlay.setMap(map);
    });
    return () => {
      markers.map(({marker, overlay}) => {
        marker.setMap(null);
        overlay && overlay.setMap(null);
      });
    }
  }, [markers]);
  
  // 표시된 장소가 보이도록 지도 반경 확대
  useEffect(() => {
    let bounds = map.getBounds();
    placeList.map(({y, x}) => {
      const position = new kakao.maps.LatLng(y, x);
      bounds.extend(position);
    });
    map.setBounds(bounds);
  }, [placeList]);
  
  // 선택한 마커가 지도의 가운데에 위치하도록 이동
  useEffect(() => {
    const selectedPlace = placeList[selectedIndex];
    if (!selectedPlace) {
      return;
    }
    
    const {y, x} = selectedPlace;
    map.setCenter(new kakao.maps.LatLng(y, x));
  }, [selectedIndex]);
  
  return <div id="map" className="map"/>;
};

export default KakaoMap;
