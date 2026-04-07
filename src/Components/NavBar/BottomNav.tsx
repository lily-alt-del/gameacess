import { AlignRightIcon, Columns } from "lucide-react";
import Link from "next/link";
import { BsJustify } from "react-icons/bs";

export default function BottomNav() {
    return(
        <>
            <Link href='/login' style={styles.login}>\Login</Link>
            <Link href='/cadastro' style={styles.cadastro}>Cadastro</Link>
        </>
    )
}
const styles = {
    login:{
        display: 'flex',
        alignItems: 'right',
        gap: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        
    },
    cadastro:{
        display: 'flex',
        alignItems: 'right',
        gap: '10px',
        justifyContent: 'flex-end',
        fontSize: '16px',
        fontWeight: 'bold',
    }
}