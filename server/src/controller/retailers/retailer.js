const User = require("../../models/user");
const {
  getDifference,
  getTimeRemaining,
} = require("../../middleware/helperfunction");
const Lottery = require("../../models/lottery");
const Customer = require("../../models/customer");
const lottery = require("../../models/lottery");

module.exports.getRetailersList = async (req, res) => {
  const result = await User.find({ role: "retailer" }, { password: 0 }).exec();
  res.status(200).json(result);
};

module.exports.getRetailerDetail = async (req, res) => {
  const result = await User.findOne(
    { _id: req.params.retailerId },
    { password: 0 }
  ).exec();
  res.status(200).json(result);
};

module.exports.saveLottery = async (req, res) => {

  const { prize, startDate, endDate, retailerId } = req.body;

  //find the total product
  let totalPrize = 0;
  await prize.map((ele) => {
    totalPrize = totalPrize + ele.quantity;
  });

  //find the difference in start and end date
  const difference = await getDifference(endDate, startDate);

  //Update the value on req.body
  req.body.totalPrize = totalPrize;
  req.body.timeDifference = difference;

  //check lottery already existed or not
  let lottery = await Lottery.findOne({ retailerId: retailerId }).exec();

  if (lottery) {
    //if lottery exist  ,update the lottery
    Lottery.findOneAndUpdate(
      { retailerId: retailerId },
      { $set: req.body },
      { new: true },
      (error, lottery) => {
        if (error) {
          res.status(400).send("not saved");
        }

        if (lottery) {
          res.status(200).json(lottery);
        }
      }
    );
  } else {
    //create new lottery
    const _lottery = new Lottery(req.body);
    _lottery.save((error, data) => {
      if (error) {
        res.status(401).send("Lottery not saved to database");
      }
      if (data) {
        res.status(200).json(data);
      }
    });
  }


};

module.exports.getLotteryOfRetailer = async (req, res) => {
  const retailerId = req.params.retailerId;

  const lottery = await Lottery.findOne({ retailerId: retailerId }).exec();

  if (lottery) {
    res.status(200).json(lottery);
  } else {
    res.status(400);
  }
};

module.exports.addCustomer = async (req, res) => {
  try {

    const _newCustomer = new Customer(req.body);

    _newCustomer.save((error, savedcustomer) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      if (savedcustomer) {
        res.status(200).json(savedcustomer);
      }
    });
  } catch (error) {
    console.log("error saving customer----->", error.message);
  }
};

module.exports.getLotteryInfo = async (req, res) => {
  const retailerId = req.params.retailerId;

  const _lottery = await Lottery.findOne({ retailerId: retailerId }).exec();
  if (_lottery) {
    const difference = await getTimeRemaining(_lottery.endDate);
    res.status(200).json(difference);
  } else {
    res.status(401).send("Please Update Scratch Prize");
  }
};

module.exports.getLotteryPrize = async (req, res) => {
  const customerId = req.params.customerId;
  const retailerId = req.user._id;

  const _lottery = await Lottery.findOne({ retailerId: retailerId }).exec();
  if (_lottery) {
    // 1. Check the remaining prize , if prize is left go to next step else go to last step

    const prize = _lottery.prize;
    let remainingPrize = 0;
    await prize.map((singlePrize) => {
      remainingPrize = remainingPrize + singlePrize.remaining;
    });


    if (remainingPrize !== 0) {
      let frequency = _lottery.frequency;
      let totalCustomerCount = await Customer.find({}).count();
      let modulous = totalCustomerCount % frequency;

      if (modulous == 0) {
        //filter the remaining prize

        const newFilteredRemainingPrize = await prize.filter(
          (singleprize) => singleprize.remaining > 0
        );

        //will get prize
        let prizeArrrayLength = newFilteredRemainingPrize.length;
        //generate random between 0 and prizeArrayLength
        let randomNumber = Math.floor(
          Math.random() * prizeArrrayLength - 1 + 1
        );

        //get the random prize

        let randomPrize = newFilteredRemainingPrize[randomNumber];

        //check if randomprize have prize or not

        if (randomPrize.remaining > 0) {
          res.status(200).json({
            prize: randomPrize,
            coverImage: _lottery.coverImage,
          });

        } else {
          res.status(200).json({
            prize: _lottery.nextTimeImage,
            coverImage: _lottery.coverImage,
          });
        }

        //  // update thr remaining prize
        //  randomPrize.remaining=randomPrize.quantity - 1

        //  //update the won prize by count

        //  randomPrize.won=randomPrize.won+ 1;

        //send the prize and cover image
      } else {
        //send default prize
        res.status(200).json({
          prize: _lottery.nextTimeImage,
          coverImage: _lottery.coverImage,
        });
      }
    } else {
      //send default image

      res.status(200).json({
        prize: _lottery.nextTimeImage,
        coverImage: _lottery.coverImage,
      });
    }
    //2  check the end date of lottery if time is remaining go to next step ,if no go to last step
    // 3 check whether the customer receives prize or not according to frequency ,if customer receives new prize ,go to step 4 ,if no go to last step and send default prize
    //4. check the array size and randomly get prize from the array list
    //5 After getting randomly generated prize
    //6 update the remaining prize (remaining -1 ) of selected prize
    //7 increase the count of won prize by one of selected prize  (won +1 )
    //8 send the selected prize
    //last : send default prize

    //   const prize=_lottery.prize
    //   res.json({
    //     prize:prize[0],
    //     coverImage:_lottery.coverImage,

    //   })
  } else {
    res.status(401).send("Please Update Scratch Prize");
  }
};

module.exports.saveScratchPrize = (req, res) => {
  const { retailerId, customerId, scratchprize } = req.body;
  const randomPrize = scratchprize;

  let randomPrizeId = randomPrize.public_id;

  const savePrizeCustomer = async () => {
    Customer.findOneAndUpdate(
      { _id: customerId },
      { $set: { prize: randomPrize ,name:"Better Luck Next Time"} },
      { new: true }
    ).exec((error, saved) => {
      if (error) res.status(400).json({ error: "Sorry not saved" });
      if (saved) {
        res.status(200).send("saved to the database");
      }
    });
  };

  if ((randomPrize.remaining !== undefined) | "undefined" | "Nan") {
    const newRemaining = randomPrize.remaining - 1;
    const newWon = randomPrize.won + 1;

    try {
      Lottery.updateOne(
        {
          retailerId: retailerId,
          prize: { $elemMatch: { public_id: randomPrizeId } },
        },
        {
          $set: {
            "prize.$.remaining": newRemaining,
            "prize.$.won": newWon,
          },
        },
        { new: true }
      ).exec((error, updatedprize) => {
        if (error) console.log(error);
        if (updatedprize) {

          //update customer prize
          savePrizeCustomer();
        }
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    //save to customer
    savePrizeCustomer();
  }
};
