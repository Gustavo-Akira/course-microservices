import Link from 'next/link';
export default ({currentUser})=>{

    const links = [
        !currentUser && {label: 'Cadastrar', href:"/auth/signup"},
        !currentUser && {label: 'Entrar', href:"/auth/signin"},
        currentUser && {label: 'Sair', href:"/auth/signout"},
    ].filter(linkConfig => linkConfig).map(({label, href})=>{
        return <li key={href} className='nav-item'> 
            <Link className='nav-link' href={href}>{label}</Link>
        </li>;
    });

    return <nav className="navbar navbar-light bg-light">
        <Link className='navbar-brand' href="/">
            Ticketing
        </Link>
        <div className='d-flex justify-content-end'>
            <ul className='nav d-flex align-items-center'>
                {links}
            </ul>
        </div>
    </nav>;
};