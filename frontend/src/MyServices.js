import React, {useEffect, useState} from "react";
import {getServices} from "./App";

const MyServicesDom = (props) => {
    const [listItems, setListItems] = useState();

    useEffect(() => {
        async function load() {
            let _services = await getServices(props.account);


            const listItems = _services.map((service) =>
                <li>{service['service_name'] + ' ' + service['service_description']}</li>
            );
            setListItems(listItems);
        }

        load();
    }, []);

    return (
        <>
            <h3 className='sub-header'>Your services</h3>
            <ul>{listItems}</ul>
        </>

    );
}
export default MyServicesDom;