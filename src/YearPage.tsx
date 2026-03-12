import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import styles from './cssfile/YearPage.module.css';

function ToDayWhat(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const dateNumber = Number(`${year}${month}${day}`);
    return [year, month, day, dateNumber];
}

const ButtonCssList = [
    {fontSize: '12.5px',
    top: '-10%'},
    {fontSize: '12.5px',
    top: '-5%'},
    {fontSize: '25px',
    top: '10%'},
    {fontSize: '50px',
    top: '25%'},
    {fontSize: '100px',
    top: '50%'},
    {fontSize: '50px',
    top: '75%'},
    {fontSize: '25px',
    top: '90%'},
    {fontSize: '12.5px',
    top: '105%'},
    {fontSize: '12.5px',
    top: '110%'}]

export default function YearPage() {

    const DayDatas: (String | number)[] = ToDayWhat()

    const { id } = useParams();
    const [directYear , setDirectYear] = useState<number>(Number(id));

    const navigate = useNavigate();

    function handleDirectYear(newYear:number){
        const el = Array.from(document.querySelectorAll<HTMLElement>(".Buttons"));
        
        for(let i=0;i<el.length;i++){
            if(!(8 < i-newYear || i-newYear < 0)){
                if(i < 2 || i > 6){
                    Object.assign(el[i].style , {display: "block"});
                    setTimeout(() => {
                        Object.assign(el[i].style , ButtonCssList[i-newYear], {transition: "all 0.3s ease"});
                    }, 1);
                } else{
                    Object.assign(el[i].style , ButtonCssList[i-newYear], {transition: "all 0.3s ease"})
                }
                
            }
        }
        
        setTimeout(() => {
            for(let i=0;i<el.length;i++){
                if(i < 2 || i > 6){
                    Object.assign(el[i].style , {display: "none"});
                }
                Object.assign(el[i].style , ButtonCssList[i],{transition: "all 0s ease"});
            }
            setDirectYear(directYear+newYear);
        }, 300);

        navigate(`/year/${directYear+newYear}`, { replace: true });

        return newYear;
    };

    return (
        <div className='MainBoxGrid'>
            <header className='Top'>
                <button onClick={()=>navigate(`/main/year-${directYear}`)}>메인 가는 로고</button>
                <div className='그리드용빈칸'></div>
                <div className='그리드용빈칸'></div>
            </header>
            <main className='MainBox'>
                <div className={styles['YearButtonGrid']} style={{ overflow: "hidden" }}>
                    <button className={`${styles.YearButtonSleep} Buttons`} data-position='0'>{String(directYear-4)}</button>
                    <button className={`${styles.YearButtonSleep} Buttons`} data-position='1'>{String(directYear-3)}</button>
                    <button className={`${styles.YearButtonSmall} Buttons`} data-position='2' onClick={()=>handleDirectYear(-2)}>{String(directYear-2)}</button>
                    <button className={`${styles.YearButtonMidle} Buttons`} data-position='3' onClick={()=>handleDirectYear(-1)}>{String(directYear-1)}</button>
                    <button className={`${styles.YearButtonBig} Buttons`} data-position='4' onClick={()=>navigate(`/month/${directYear}-1`)}>{String(directYear)}</button>
                    <button className={`${styles.YearButtonMidle} Buttons`} data-position='5' onClick={()=>handleDirectYear(1)}>{String(directYear+1)}</button>
                    <button className={`${styles.YearButtonSmall} Buttons`} data-position='6' onClick={()=>handleDirectYear(2)}>{String(directYear+2)}</button>
                    <button className={`${styles.YearButtonSleep} Buttons`} data-position='7'>{String(directYear+3)}</button>
                    <button className={`${styles.YearButtonSleep} Buttons`} data-position='8'>{String(directYear+4)}</button>
                </div>
            </main>
            <footer className='Bottom'></footer>
        </ div>
    );
}