import { React, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../Api.js';

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const loadOptions = async (inputValue) => {
        try {
            
        console.log(GEO_API_URL, geoApiOptions);
            const response = await fetch(`${GEO_API_URL}?namePrefix=${inputValue}`, geoApiOptions);
            const json = await response.json(); // Assuming the response is JSON. If not, adjust accordingly.
    
            // Assuming json.data is an array of options. Adjust the path according to your actual API response structure.
            const options = json.data.map((city) => ({
                value: `${city.latitude} ${city.longitude}`, // Replace 'id' with the actual property you want to use as the value
                label: `${city.name}, ${city.countryCode}` // Replace 'name' with the property you want to display in the dropdown
            }));
            return { options }; // Correctly formatted response for AsyncPaginate
        } catch (error) {
            console.error(error);
            return { options: [] }; // Return an empty array on error
        }
    };
    
    return (
        <AsyncPaginate 
            placeholder="Search for cities"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    );
}

export default Search;
