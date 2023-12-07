const mongoose = require("mongoose");

const Review = require("./review.js");

const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },  
    description: String,
    image: {
        type: String,
        default:"https://www.istockphoto.com/photo/weve-made-it-all-this-way-i-am-proud-gm904172104-249358162?phrase=free%20landscape%20images",
        set: (v)=> v=== ""? "https://www.istockphoto.com/photo/weve-made-it-all-this-way-i-am-proud-gm904172104-249358162?phrase=free%20landscape%20images":v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews }});
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;