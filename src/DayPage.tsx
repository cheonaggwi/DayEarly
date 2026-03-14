import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import styles from './cssfile/DayPage.module.css';

function ToDayWhat(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const dateNumber = Number(`${year}${month}${day}`);
    return [year, month, day, dateNumber];
}

export default function DayPage() {

    const DayDatas: (String | number)[] = ToDayWhat()

    let { id } = useParams();
    if (id == null){
        id = `${DayDatas[0]}-${DayDatas[1]}-1`
    }
    let LastPage = id.split("-")

    if (LastPage.length < 3){
        if (LastPage.length < 2){
            LastPage[1] = String(DayDatas[1]);
        }
        LastPage[2] = String(DayDatas[2]);
    }

    const [directYear , setDirectYear] = useState<number>(Number(LastPage[0]));
    const [directMonth , setDirectMonth] = useState<number>(Number(LastPage[1]));
    const [directDay , setDirectDay] = useState<number>(Number(LastPage[2]));

    const navigate = useNavigate();

    function handleDirectMonth(newMonth:number){
        let newYear = directYear;
        let newDay = directDay;

        if (newMonth < 1){
            newMonth = 12;
            newYear = directYear-1;
            setDirectYear(directYear-1);
        }
        else if(newMonth > 12){
            newMonth = 1;
            newYear = directYear+1;
            setDirectYear(directYear+1);
        }
        setDirectMonth(newMonth);

        if(newDay > new Date(newYear, newMonth, 0).getDate()){
            newDay = new Date(newYear, newMonth, 0).getDate();
        }
        setDirectDay(newDay);
        
        navigate(`/day/${newYear}-${newMonth}-${newDay}`, { replace: true });
    }

    function handleDirectDay(newDay:number){
        if(newDay == directDay){
            navigate(`/diary/${directYear}-${directMonth}-${newDay}`);
        }
        else{
            setDirectDay(newDay)
            navigate(`/day/${directYear}-${directMonth}-${newDay}`, { replace: true });
        }
    }

    const directMonthLastDate = new Date(directYear, directMonth, 0).getDate();
    const directMonthFirstDate = new Date(directYear, directMonth-1, 1).getDay();
    

    let buttonList = [];
    for(let i=0;i<directMonthFirstDate;i++){
        buttonList.push(
            <button key={i}></button>
        )
    }
    for(let i=directMonthFirstDate;i<directMonthFirstDate+directMonthLastDate;i++){
        buttonList.push(
            <button key={i} onClick={()=>handleDirectDay(i-directMonthFirstDate+1)}>{i-directMonthFirstDate+1}</button>
        )
    }
    for(let i=directMonthFirstDate+directMonthLastDate;i<42;i++){
        buttonList.push(
            <button key={i}></button>
        )
    }

    return (
        <div className='MainBoxGrid'>
            <header className='Top'>
                <button onClick={()=>navigate(`/main/day-${LastPage.slice(0).join('-')}`)}>메인 가는 로고</button>
                <div className={styles['Title']}>{directYear}년 {directMonth}월 {directDay}일</div>
                <div className='그리드용빈칸'></div>
            </header>
            <main className={`MainBox ${styles['MainGrid']}`}>
                {buttonList}
            </main>
            <footer className='Bottom'>
                <div className={styles['BottomGrid']}>
                    <div className='그리드용빈칸'></div>
                    <button onClick={()=>handleDirectMonth(directMonth-1)}>왼쪽</button>
                    <button onClick={()=>navigate(`/month/${directYear}-${directMonth}`)}>중앙</button>
                    <button onClick={()=>handleDirectMonth(directMonth+1)}>오른쪽</button>
                    <div className='그리드용빈칸'></div>
                </div>
            </footer>
        </ div>
    );
}