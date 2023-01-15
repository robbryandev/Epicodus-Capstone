import NavItem, {NavItemProps} from "./navItem"

export default function Nav() {
    return (
        <div className="flex-row text-center align-middle">
            <NavItem value="Account" link="/account"/>
            <NavItem value="Home" link="/"/>
            <NavItem value="Shows" link="/shows"/>
        </div>
    )
}