import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

import './Address.css';



const Address = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

        // const handleSubmit = () => {
        //     const description = document.getElementById('description').value;
        //     const title = document.getElementById('title').value;
        //     const date = document.getElementById('date').value;

            
        //     const newEvent = { ...loggedInUser, description,title,date}
        //     fetch('http://localhost:5000/registered', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(newEvent)

        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //         console.log(data);

        //       })

        // }
        return (
        <div className='register'>
            
            
        
            <br/>
            <form   className="registerForm">
                <h3>Address Form</h3>
                <input  className="input" name='name'  type="text" value={loggedInUser.name} placeholder="name" />
                <input  className="input" name='email'  type="text" value={loggedInUser.email} placeholder="name" />
                <input  className="input" name='date'  type="date" placeholder="date" id='date' required/>
                <input  className="input" name='Address-1'  type="text" placeholder="Address-1" id="Address-1" required />
                <input  className="input" name='Address-2'  type="text" placeholder="Address-2" id="Address-2" required  />
                <input  className="input" name='Phone'  type="" placeholder="Phone" id='phone' required/>
                <input  className="input" name='City'  type="text" placeholder="City" id="title" required />
                <input  className="input" name='description'  type="text" placeholder="description" id='description' required />
                <br/>
                <br/>
                
                    <button  className="submitBtn">
                        <Link to="">Registration</Link>
                    </button>
                
            </form>
        </div>
    );
};

export default Address;