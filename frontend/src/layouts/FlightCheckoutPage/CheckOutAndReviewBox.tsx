import FlightModel from "../../models/FlightModel";
import {Link} from "react-router-dom";

export const CheckOutAndReviewBox: React.FC<{ flight: FlightModel | undefined, mobile: boolean }> = (props) => {


    return(
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>0/5</b>
                        flights checked out
                    </p>
                <hr/>
                    {props.flight && props.flight.no_seats_reserved_economy && props.flight.no_seats_reserved_business < 255?
                    <h4 className='text-success'>
                        Available
                    </h4>
                        :
                        <h4 className='tex-danger'>
                            Wait List
                        </h4>
                    }
                    <div className='row'>
                        <p className='col-6 lead'>
                            <b>{props.flight?.no_seats_reserved_economy}</b>
                            Flight's seats
                        </p>
                        <p className='col-6 lead'>
                            <b>{props.flight?.no_seats_reserved_economy}</b>
                            Available
                        </p>
                    </div>
                </div>
                <Link to='/#' className='btn btn-success btn-lg'>Sign in</Link>
                <hr/>
                <p className='mt-3'>
                    This number can change untl placing order gas been completed.
                </p>
                <p>
                    Sign in to be able to leave a review.
                </p>
            </div>
        </div>
    )
}