import React from 'react'
import Nav from '../Nav/Nav'
import Fotter from '../Fotter/Fotter'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Nav/>
        <Outlet/>
        <Fotter/>
    </div>
  )
}
