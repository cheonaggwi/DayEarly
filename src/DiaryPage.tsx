import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import styles from './cssfile/DiaryPage.module.css';

function ToDayWhat(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const dateNumber = Number(`${year}${month}${day}`);
    return [year, month, day, dateNumber];
}

export default function DiaryPage() {

    // 날짜 계산 및 날짜 조작 버튼

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

    function handleDirectDay(newDay:number){
        const directMonthLastDate = new Date(directYear, directMonth, 0).getDate();
        let newMonth = directMonth;
        let newYear = directYear;

        if (newDay < 1){
            newMonth--;
        }
        else if(newDay > directMonthLastDate){
            newMonth++;
        }
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
        if (newDay < 1){
            newDay = new Date(newYear, newMonth, 0).getDate();
        }
        else if(newDay > directMonthLastDate){
            newDay = 1;
        }
        setDirectDay(newDay);
        setWatchMake(0);
        
        navigate(`/diary/${newYear}-${newMonth}-${newDay}`, { replace: true });
    }

    // 메인 박스 안에 들어갈 XTML 정의

    const [watchMake , setWatchMake] = useState<number>(0);
    
    let mainBoxXTML;

    localStorage.setItem(`${directYear}${directMonth}${directDay}`, `${directYear}###${directMonth}###${directDay}`);

    let diaryText:string|null = localStorage.getItem(`${directYear}${directMonth}${directDay}`);
    let messageList = [];
    let count = 0;

    if(watchMake === 0){
        if(diaryText !== null){
            for(let i = 1; i-1 < diaryText.split("###").length; i ++){
                count ++ ;
                messageList.push(<button key={i} onClick={()=>setWatchMake(i)}>{diaryText.split("###")[i-1]}</button>);
                
            }
        }
        for(let i=count;i<10;i++){
            count ++ ;
            messageList.push(<button className={styles["MessageAddButton"]} key={count} onClick={()=>setWatchMake(-1)}>+</button>);

        }
        
        mainBoxXTML = 
            <div className={styles['MessageGrid']}>{messageList}</div>
        ;

    }else if(watchMake === -1){
        mainBoxXTML = 
        <div className={styles['NewMessageMaking']}><input></input></div>
        ;
        
    }else{
        if(diaryText !== null){
            mainBoxXTML = 
            <div className={styles['NewMessageMaking']}><input defaultValue={diaryText.split("###")[watchMake-1]}></input></div>
            ;
        }
        
    }

    // localStorage.setItem(`${directYear}${directMonth}${directDay}`, "일기 내용입니다");
    // {localStorage.getItem("diary_20260303")}
    // localStorage.removeItem("diary_20260303");
    // localStorage.clear();

    

    return (
        <div className='MainBoxGrid'>
            <header className='Top'>
                <button onClick={()=>navigate(`/main/diary-${id}`)}>메인 가는 로고</button>
                <div className={styles['Title']}>{directYear}년 {directMonth}월 {directDay}일</div>
                <div className='그리드용빈칸'></div>
            </header>
            <main className={`MainBox`}>
                {mainBoxXTML}
            </main>
            <footer className='Bottom'>
                <div className={styles['BottomGrid']}>
                    <div className='그리드용빈칸'></div>
                    <button onClick={()=>handleDirectDay(directDay-1)}>왼쪽</button>
                    <button onClick={()=>navigate(`/day/${directYear}-${directMonth}-${directDay}`)}>중앙</button>
                    <button onClick={()=>handleDirectDay(directDay+1)}>오른쪽</button>
                    <div className='그리드용빈칸'></div>
                </div>
            </footer>
        </ div>
    );
}