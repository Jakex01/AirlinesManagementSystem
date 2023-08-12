import FlightModel from "../../models/FlightModel";
import {Link} from "react-router-dom";
import {useOktaAuth} from "@okta/okta-react";
import {oktaConfig} from "../../lib/oktaConfig";
import {LeaveAReview} from "../Utils/LeaveAReview";

export const CheckOutAndReviewBox: React.FC<{ flight: FlightModel | undefined, mobile: boolean,
    currentLoansCount:number, isAuthenticated: any, isCheckedOut: boolean,
checkoutFlight:any, isReviewLeft:boolean, submitReview: any}> = (props) => {


    function buttonRender(){
        if(props.isAuthenticated){
           if(!props.isCheckedOut){
               return(
                   <button onClick={()=>props.checkoutFlight()} className='btn btn-success btn-lg'>Checkout</button>
               )
           }else if(props.isCheckedOut){
               return(<p><b>Flight Checked out. Enjoy your journey!</b></p>)
           }
        }
        return (<Link to={'/login'} className='btn btn-success btn-lg'>Sign in</Link>)
    }

    const {authState} = useOktaAuth();


    function reviewRender(){

        if(props.isAuthenticated && !props.isReviewLeft){
            return(
                <p>
               <LeaveAReview submitReview={props.submitReview}/>
            </p>)
        }else if(props.isAuthenticated && props.isReviewLeft){
            return(<p>
                <b>Thank you for your review!</b>
            </p>)
        }
        return(<div>
            <hr/>
                {reviewRender()}
        </div>
        )
    }

    return(
        <div className={props.mobile ? 'card d-flex mt-5s' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}</b>
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
                {buttonRender()}

                <hr/>
                <p className='mt-3'>
                    This number can change untl placing order gas been completed.
                </p>
                <p>
                    {reviewRender()}
                </p>
            </div>
        </div>
    )
}