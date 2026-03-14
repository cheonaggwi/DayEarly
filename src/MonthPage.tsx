import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import styles from './cssfile/MonthPage.module.css';

function ToDayWhat(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const dateNumber = Number(`${year}${month}${day}`);
    return [year, month, day, dateNumber];
}

export default function MonthPage() {

    const DayDatas: (String | number)[] = ToDayWhat()

    let { id } = useParams();
    if (id == null){
        id = `${DayDatas[0]}-1`
    }
    let LastPage = id.split("-")
    if (LastPage.length < 2){
        LastPage[1] = String(DayDatas[1]);
    }

    const [directYear , setDirectYear] = useState<number>(Number(LastPage[0]));
    const [directMonth , setDirectMonth] = useState<number>(Number(LastPage[1]));

    const navigate = useNavigate();

    function handleDirectYear(newYear:number){
        setDirectYear(newYear);
        navigate(`/month/${newYear}-${directMonth}`, { replace: true });
    }

    function handleDirectMonth(newMonth:number){
        if(directMonth == newMonth){
            navigate(`/day/${directYear}-${newMonth}-1`)
        }
        else{
            setDirectMonth(newMonth);
            navigate(`/month/${directYear}-${newMonth}`, { replace: true });
        }
    }

    let buttonList = [];
    for(let i=0;i<12;i++){
        buttonList.push(
            <button className="Buttons" onClick={()=>handleDirectMonth(i+1)} key={i}>{i+1}월</button>
        );
    }

    return (
        <div className='MainBoxGrid'>
            <header className='Top'>
                <button onClick={()=>navigate(`/main/month-${LastPage.slice(0).join('-')}`)}>메인 가는 로고</button>
                <div className={styles['Title']}>{directYear}년 {directMonth}월</div>
                <div className='그리드용빈칸'></div>
            </header>
            <main className={`MainBox ${styles['MainGrid']}`}>
                {buttonList}
            </main>
            <footer className='Bottom'>
                <div className={styles['BottomGrid']}>
                <div className='그리드용빈칸'></div>
                <button onClick={()=>handleDirectYear(directYear-1)}>왼쪽</button>
                <button onClick={()=>navigate(`/year/${directYear}`)}>중앙</button>
                <button onClick={()=>handleDirectYear(directYear+1)}>오른쪽</button>
                <div className='그리드용빈칸'></div>
                </div>
            </footer>
        </ div>
    );
}