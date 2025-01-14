import chef_clude_logo from "/src/assets/chef-claude-icon.png"

export default function Header() {
    return(
        <nav>
            <img className="header--img" src={chef_clude_logo} alt="" />
            <h1 className="header--title" >AI Chef</h1>
        </nav>
    );
} 