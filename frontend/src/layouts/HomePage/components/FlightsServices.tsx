export const FlightsServices = () => {
    return(

        <div className='container my-5'>
            <div className='row p-4 align-items-center border shadow-lg'>
                <div className='col-lg-7 p-3'>
                    <h1 className='display-4 fw-bold'>
                        Can't find the flight you're looking for?
                    </h1>
                    <p className='lead'>
                        If you cannot find the flight you are looking for,
                        please contact us via email!
                    </p>
                    <div className='d-grid gap-2 justify-content-md-start mb-4 mb-lg-3'>
                        <a href='#' className='btn main-color btn-lg text-white'>
                            Sign up
                        </a>
                    </div>
                </div>
                <div className='col-lg-4 offset-lg-1 shadow-lg lost-image'></div>
            </div>
        </div>

    );
}