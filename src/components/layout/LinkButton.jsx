import { Link } from 'react-router-dom'
import style from './LinkButton.module.css'

export default function LinkButton (props){
    return (
     <Link className={style.btn} to={props.to}>
         {props.text}
     </Link>
    )

}