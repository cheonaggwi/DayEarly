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

    let diaryText:string|null = localStorage.getItem(`${directYear}${directMonth}${directDay}`);

    let messageList = [];
    let count = 0;

    const [emotion , setEmotion] = useState<string>("Happy");
    const [emotionRate , setEmotionRate] = useState<number>(5);

    function messageEditPage(page:number){
        setWatchMake(page);

        if(page !== -1){
            if(diaryText !== null){
                setEmotion(diaryText.split("###")[page-1].split("#?#")[0]);
                setEmotionRate(Number(diaryText.split("###")[page-1].split("#?#")[1]));
            }
        }
    }

    function messageSave( rate:number, page:number, emotion:string){
        const el = document.getElementById("newMessageInput") as HTMLInputElement;
        const value = el?.value;
        if(diaryText !== null && diaryText !== ""){
            if(page === -1){
                localStorage.setItem(`${directYear}${directMonth}${directDay}`, `${diaryText}###${emotion}#?#${rate}#?#${value}`);
            } else{
                let TextList = '';
                for(let i = 1; i-1 < diaryText.split("###").length; i ++){
                    if(i === page){
                        TextList += `${emotion}#?#${rate}#?#${value}`;
                    }else{
                        TextList += `${diaryText.split("###")[i-1]}`;
                    }
                    if(i < diaryText.split("###").length){
                        TextList += "###";
                    }
                }
                localStorage.setItem(`${directYear}${directMonth}${directDay}`, `${TextList}`);
            }
        }else{
            localStorage.setItem(`${directYear}${directMonth}${directDay}`, `${emotion}#?#${rate}#?#${value}`);
        }
        setWatchMake(0);
    }

    function messageRemove(page:number){
        let TextList = '';
        if(diaryText !== null){
            for(let i = 1; i-1 < diaryText.split("###").length; i ++){
                if(i !== page){
                    TextList += `${diaryText.split("###")[i-1]}`;
                }
                if(i < diaryText.split("###").length && i !== page){
                    TextList += "###";
                }
            }
            
            if(TextList === ""){
                localStorage.removeItem(`${directYear}${directMonth}${directDay}`);
            } else{
                localStorage.setItem(`${directYear}${directMonth}${directDay}`, `${TextList}`);
            }
        }

        setWatchMake(0);
    }

    if(watchMake === 0){
        if(diaryText !== null){
            for(let i = 1; i-1 < diaryText.split("###").length; i ++){
                count ++ ;
                messageList.push(<button key={i} onClick={()=>messageEditPage(i)}>{diaryText.split("###")[i-1].split("#?#")[2]}</button>);
            }
        }
        for(let i=count;i<10;i++){
            count ++ ;
            messageList.push(<button className={styles["MessageAddButton"]} key={count} onClick={()=>messageEditPage(-1)}>+</button>);

        }
        
        mainBoxXTML = 
            <div className={styles['MessageGrid']}>{messageList}</div>
        ;

    }else{
            mainBoxXTML = 
            <div className={styles['NewMessageMaking']}>
                <button className={styles['NewMessageBackButton']} onClick={()=>setWatchMake(0)}>뒤로</button>

                <select id="newMessageSelect" className={styles['NewMessageSelect']} value={emotion} onChange={(e) => setEmotion(e.target.value)}>
                    <option value="Happy">행복</option>
                    <option value="Surprise">놀람</option>
                    <option value="Excited">설렘</option>
                    <option value="Anger">화남</option>
                    <option value="Sad">슬픔</option>
                    <option value="Confused">혼란</option>
                </select>

                <input className={styles['NewMessageRange']} id="newMessageRange" type="range" min="1" max="9" value={emotionRate} onChange={(e) => setEmotionRate(parseInt(e.target.value))} />
                <input className={styles['NewMessageNumber']} id="newMessageNumber" type="number" min="1" max="9" value={emotionRate} onChange={(e) => setEmotionRate(parseInt(e.target.value))} />
                <input className={styles['NewMessageInput']} id="newMessageInput" defaultValue={watchMake !== -1 && diaryText ? diaryText.split("###")[watchMake-1].split("#?#")[2] : ""} />
                <button className={styles['MessageSaveButton']} onClick={()=>messageSave( emotionRate, watchMake, emotion)}>저장</button>
                {watchMake !== -1 ? 
                    <button className={styles['MessageRemoveButton']} onClick={()=>messageRemove(watchMake)}>삭제</button> : null
                }
            </div>
            ;
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