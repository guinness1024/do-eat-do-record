import React, {useState} from "react";
import moment from "moment";
import classNames from "classnames";
import Spending from "../../components/Spending";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RankedByCount from "../../organisms/diary/RankedByCount";
import RankedByScore from "../../organisms/diary/RankedByScore";
import "./Stats.scss";

const Stats = ({history, match: {params: {userId, type}}}) => {
  const [date, setDate] = useState(moment());
  
  const changeDate = isLeft => {
    const temp = moment(date);
    setDate(isLeft ? temp.subtract(1, 'month') : temp.add(1, 'month'));
  };
  
  return (
    <main className="stats">
      <section className="stats-header">
        <div>
          <button className={classNames("btn", {clicked: type === 'total'})}
                  onClick={() => history.push(`/main/diary/stats/${userId}/total`)}>
            전체
          </button>
          <button className={classNames("btn", {clicked: type === 'monthly'})}
                  onClick={() => history.push(`/main/diary/stats/${userId}/monthly`)}>
            월간
          </button>
        </div>
        {
          type === 'monthly' && (
            <div className="stats-title">
              <FontAwesomeIcon icon={faCaretLeft} onClick={() => changeDate(true)}/>
              <strong>{date.month() + 1}월</strong>
              <FontAwesomeIcon icon={faCaretRight} onClick={() => changeDate(false)}/>
            </div>
          )
        }
      </section>
      <Spending userId={userId} now={type === 'total' ? null : date}/>
      <RankedByCount userId={userId} now={type === 'total' ? null : date}/>
      <RankedByScore userId={userId} now={type === 'total' ? null : date}/>
    </main>
  );
};

export default Stats;
