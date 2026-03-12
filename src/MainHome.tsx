import { useNavigate , useParams} from "react-router-dom";

import styles from "./cssfile/MainHome.module.css";

function ToDayWhat(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const dateNumber = Number(`${year}${month}${day}`);
    return [year, month, day, dateNumber];
}

export default function MainHome() {

    const DayDatas: (String | number)[] = ToDayWhat()

    let { id } = useParams();
    if (id == null){
        id = `diary-${DayDatas[0]}-${DayDatas[1]}-${DayDatas[2]}`
    }
    let LastPage = id.split("-")

    
    const navigate = useNavigate();

    return (
        <div className='MainBoxGrid'>
            <header className='Top'>
                <div className='그리드용빈칸'></div>
                <div className={styles['Title']}>제목이 들어갑니다~</div>
                <button onClick={()=>navigate(`/${LastPage[0]}/${LastPage.slice(1).join('-')}`)}>메인 나가는 로고</button>
            </header>
            <main className='MainBox'>
                <div className={styles['ToDay']}>
                    <button onClick={()=>navigate(`/year/${DayDatas[0]}`)}>{DayDatas[0]}</button>
                    <button onClick={()=>navigate(`/month/${DayDatas[0]}-${DayDatas[1]}`)}>{DayDatas[1]}</button>
                    <button onClick={()=>navigate(`/day/${DayDatas[0]}-${DayDatas[1]}-${DayDatas[2]}`)}>{DayDatas[2]}</button>
                </div>
                <button onClick={()=>navigate(`/diary/${DayDatas[0]}-${DayDatas[1]}-${DayDatas[2]}`)}>오늘의 일기 쓰기</button>
                <div className={styles['ImportExport']}>
                    <button>불러오기</button>
                    <button>내보내기</button>
                </div>
                <button>데이터 삭제</button>
            </main>
            <footer className='Bottom'></footer>
        </div>
    );
}