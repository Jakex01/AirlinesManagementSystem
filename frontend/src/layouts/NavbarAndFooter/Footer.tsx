import {Link} from "react-router-dom";

export const Footer = () => {
    return(
      <div className='main-color'>
          <footer className='container d-flex flex-wrap
          justify-content-between align-items-center py-5 main-color'>
              <p className='col-md-4 mb-0 text-white'>© Jake</p>
              <ul className='nav navbar-dark col-md-4 justify-content-end'>
                  <li className='nav-item1 px-2'>
                      <div className='d-flex flex-column align-items-center px-10'>
                          <a href='#' className='nav-link px-10 text-white'>Contact us</a>
                          <span className='text-white'>flights@airways.com</span>
                      </div>
                  </li>
                  <li className='nav-item'>
                      <Link to='/home' className='nav-link px-2 text-white'>Home</Link>
                  </li>
                  <li className='nav-item'>
                      <Link to='/search' className='nav-link px-10 text-white'>Search Flights</Link>
                  </li>

              </ul>
          </footer>
      </div>
    );
}