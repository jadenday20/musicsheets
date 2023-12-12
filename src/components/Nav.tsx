import NavItem from "./NavItem"

let NavItems = ["Shop", "Cart", "About", "Contact"]

export default function Nav() {
    return (
      <nav className="flex justify-evenly gap-5">
        {NavItems.map(item => {
      return (
        <NavItem 
        LinkTitle={item}
        key={item}/>
      )
    })}
      </nav>
    );
  }