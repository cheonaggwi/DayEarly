import { useNavigate, useParams } from "react-router-dom";

export default function DayPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    return (
        <div className='MainBoxGrid'>
            <header className='Top'>
                <button onClick={()=>navigate(`/main/day-${id}`)}>메인 가는 로고</button>
                <div className='그리드용빈칸'></div>
                <div className='그리드용빈칸'></div>
            </header>
            <main className='MainBox'>
            </main>
            <footer className='Bottom'></footer>
        </ div>
    );
}