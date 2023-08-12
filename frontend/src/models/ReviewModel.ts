

class ReviewModel{

    id: number;
    user_email: string;
    review_description: string;
    review_date: string;
    flight_id: number;
    review_rating: number;


    constructor(id: number, user_email: string, review_description: string, review_date: string, flight_id: number, review_rating: number) {
        this.id = id;
        this.user_email = user_email;
        this.review_description = review_description;
        this.review_date = review_date;
        this.flight_id = flight_id;
        this.review_rating = review_rating;
    }
}

export default ReviewModel;