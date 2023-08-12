class ReviewRequestModel{
    rating: number;
    flight_id: number;
    review_description?: string;

    constructor(rating: number, flight_id: number, review_description?: string) {
        this.rating = rating;
        this.flight_id = flight_id;
        this.review_description = review_description;
    }
}
export default ReviewRequestModel;