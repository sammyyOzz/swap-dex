import React from 'react'
import './header.styles.css'
import balloxLogo from '../../assets/icons/logo.jpg'
// import { Button } from '../button/button.component'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import { Sidebar } from './sidebar.component'

export function Header() {
    const { pathname } = useLocation()
    const swiftAccount = useSelector(state => state.swift.swiftAccount)
    console.log(swiftAccount?.account_ID)

    return (
        <div className="header">
            <Link to="/">
                {/* <div className="header__title">SWIFT_DEX</div> */}
                <img src={balloxLogo} alt="" className="header__logo" />
            </Link>
            {/* <div className="header__center">
                <Link to="/create-election">
                    <span className="header__center-link">Create Election</span>
                </Link>
                <Link to="/results">
                    <span className="header__center-link">Results</span>
                </Link>
            </div> */}

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
