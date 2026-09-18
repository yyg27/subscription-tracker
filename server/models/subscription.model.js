import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLentgh: 1000,
    },
    price: {
      type: Number,
      required: [true, "Subscription Price is required "],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD","EURO","TL"],
      default: "TL",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "music",
        "movies",
        "series",
        "documentary",
        "games",
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be before end date",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //We are referencing to User model created before in user.model.js ***IMPORTANT***
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//autocalculate renewal date

subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate); //make renewal date is the same as start
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); //add renewal period to renewal date ex. 30 days for monthly
  }

  //auto update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema); //We are creating a model named Subscription with the schema we created above

export default Subscription;

  