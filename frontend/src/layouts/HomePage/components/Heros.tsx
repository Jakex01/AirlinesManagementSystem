export const Heros = () => {
    return(
        <div>
            <div className='d-none d-lg-block'>
                <div className='row g-0 mt-5'>
                    <div className='col-sm-6 col-md-6'>
                    <div className='col-image-left'></div>
                    </div>

                <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
                    <div className='ml-2'>
                        <h1>Where have you been?</h1>
                        <p className='lead'>
                            The airlines team would love to know where have you been!
                            Whether it was Europe, Asia, Africa, or even North America!
                            We will be able to provide top destinations for you to visit!
                        </p>
                        <a className='button main-color btn-lg text-white' href='#'>Sign up</a>
                    </div>
                </div>
            </div>
                <div className='row g-0'>
                    <div className='col-4 col-md-4 container d-flex
                     justify-content-center align-items-center'>
                        <div className='ml-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try check in daily as our flight collection is always changing!
                                We work nonstop to provide the most accurate destinations selection possible!
                            </p>
                        </div>
                    </div>
                    <div className='col-sm-6 col-md-6'>
                        <div className='col-image-right'>

                        </div>
                    </div>
                </div>
        </div>
            {/* Mobile */}
            <div className='d-lg-none'>
                <div className='container'>
                    <div className='m-2'>
                        <div className='col-image-left'> </div>
                        <div className='mt-2'>
                            <h1>Where have you been?</h1>
                            <p className='lead'>
                                The airlines team would love to know where have you been!
                                Whether it was Europe, Asia, Africa, or even North America!
                                We will be able to provide top destinations for you to visit!
                            </p>
                            <a className='button main-color btn-lg text-white' href='#'>Sign up</a>
                        </div>
                    </div>
                    <div className='m-2'>
                        <div className='col-image-right'> </div>
                        <div className='mt-2'>
                            <h1>Our collection is always changing!</h1>
                            <p className='lead'>
                                Try check in daily as our flight collection is always changing!
                                We work nonstop to provide the most accurate destinations selection possible!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}