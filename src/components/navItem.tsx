"use client"

import { ReactElement, useState, useEffect, useRef, useCallback } from 'react';

export interface NavItemProps {
    value: string
    link: string
}

export default function NavItem(props: NavItemProps): ReactElement {
    let [active, setActive] = useState(false)
    useEffect(() => {
        if (typeof window !== undefined)
        {
            setActive(document.location.pathname === props.link)
        }
    }, [setActive, props.link])
    let result: ReactElement = active ?
        <a href={props.link} className="btn btn-light nav_item nav_active">{props.value}</a> :
        <a href={props.link} className="btn btn-light nav_item">{props.value}</a>;
    return result;
}
