require('dotenv').config();
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "burgers"]
  });
  person.save((error, data) => {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,
    (error, data) => {
      if (error) {
        done(error);
      } else {
        done(null, data);
      }
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(error, data) => {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(error, data) => {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId},(error, data) => {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) {
      done(err);
      return;
    }

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        done(err);
        return;
      }

      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName }, // 查询条件
    { $set: { age: ageToSet } }, // 更新操作
    { new: true }, // 选项，确保返回更新后的文档
    (err, updatedDoc) => {
      if (err) {
        done(err);
      } else {
        done(null, updatedDoc);
      }
    }
  );
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId},(err, updatedDoc) => {
    if (err) {
      done(err);
    } else {
      done(null, updatedDoc);
    }
  } )
};

const removeManyPeople = (done) => {
  let nameToRemove = 'Mary'
  Person.remove({name: nameToRemove}, (err, response) => {
    if (err) {
      return err;
    } else {
      done(null, response);
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  let findQuery = Person.find({favoriteFoods: foodToSearch}).sort({ name: 1 }).limit(2).select({ age: 0 });
  findQuery.exec((err, response) => {
    if (err) {
      return done(err);
    } else {
      done(null, response);
    }
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
