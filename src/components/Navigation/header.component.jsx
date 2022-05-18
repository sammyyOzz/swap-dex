import React, { useEffect } from 'react'
import './header.styles.css'
import balloxLogo from '../../assets/icons/logo.jpg'
// import { Button } from '../button/button.component'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../UI/Button/button'
// import { Sidebar } from './sidebar.component'
import warningImage from '../../assets/icons/error.png'

export function Header() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { data: swiftAccount } = useSelector(state => state.swift.swiftAccount)
    console.log(swiftAccount?.account_ID)

    useEffect(() => {
        if (swiftAccount?.account_ID) {
            navigate('/exchange')
        }
    }, [swiftAccount?.account_ID])

    return (
        <>
            <div className="header">
                <Link to="/">
                    {/* <div className="header__title">SWIFT_DEX</div> */}
                    <img src={balloxLogo} alt="" className="header__logo" />
                </Link>

                { swiftAccount?.account_ID ? (
                    <Link to="/exchange">
                        <div className="header__right">
                            <Button outlined>Dashboard</Button>
                        </div>
                    </Link>
                ) : <></>}
            </div>
            <div className="header__warning-container">
                <div className="header__warning">
                    <img src={warningImage} alt="" className="header__warning-image" />
                    <span>This is a testnet project, do not deposit mainnet funds!!!</span>
                </div>
                <div>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeyLZpxbeWCKxZQbqfJhwYyIUHusLhyjbF9oz1MW4gzsxbSww/viewform?usp=send_form" target="_blank">REPORT</a>
                </div>
            </div>
        </> 
    )
}
