import Menu from "../pages/Menu"
import SearchBar from "./SearchBar"

function Header(){
    return(
        <div className="flex flex-row justify-center items-center w-screen">
            <div>
                BookStore
            </div>
            <SearchBar />
            <Menu />
        </div>
    )
}

export default Header