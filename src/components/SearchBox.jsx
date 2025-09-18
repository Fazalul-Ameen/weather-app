import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./searchBox.css";

function SearchBox({onSearch}){
    const[city,setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(city.trim() !== ""){
            onSearch(city);
            setCity("");
        }
    };

    return(
        <form onSubmit={handleSubmit} className = "search-form">
            <input
                type = "text"
                value = {city}
                placeholder = "Search city.."
                onChange = {(e) => setCity(e.target.value)}
                className = "search-bar"
            />
            <button type = "submit" className = "search-button"> <FontAwesomeIcon icon={faSearch} /></button>
        </form>
    );
}

export default SearchBox;