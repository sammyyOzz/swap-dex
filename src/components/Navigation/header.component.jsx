import React, { useEffect } from 'react'
import './header.styles.css'
import balloxLogo from '../../assets/icons/logo.jpg'
// import { Button } from '../button/button.component'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { Sidebar } from './sidebar.component'

export function Header() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const swiftAccount = useSelector(state => state.swift.swiftAccount)
    console.log(swiftAccount?.account_ID)

    useEffect(() => {
        if (swiftAccount?.account_ID) {
            navigate('/exchange')
        }
    }, [swiftAccount?.account_ID])

    return (
        <div className="header">
            <Link to="/">
                {/* <div className="header__title">SWIFT_DEX</div> */}
                <img src={balloxLogo} alt="" className="header__logo" />
            </Link>

            { swiftAccount?.account_ID && (
                <Link to="/exchange">
                    <div className="header__right">
                        Dashboard
                    </div>
                </Link>
            )}
        </div>
    )
}
