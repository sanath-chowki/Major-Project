import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Nav=()=>{
   
    return (
        <div>
            <ul className= 'Nav-ul'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/signin'> signin</Link></li>  
                <li><Link to='/userpage'>userpage</Link></li>
                <li><Link to='/make_convention'>make_convention</Link></li>
                <li><Link to='/make_transfer'>make_transfer</Link></li>
                <li><Link to='/landofficer'>land officer</Link></li>
                <li><Link to='/landforsale'>land_for_sale</Link></li>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/logout'>logout</Link></li>
                </ul>
               
            
        
     
           
       
           
        </div>
    )
};
export default Nav;