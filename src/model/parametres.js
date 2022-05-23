// links DB to projet
let db = require("./db.js");

// creat new DB
const Parametres = db.sequelize.define("parametres", {
  salinite: db.Sequelize.DataTypes.STRING,
  no3: db.Sequelize.DataTypes.STRING,
  po4: db.Sequelize.DataTypes.STRING,
  alcalinite: db.Sequelize.DataTypes.STRING,
  calcium: db.Sequelize.DataTypes.STRING,
  magnesium: db.Sequelize.DataTypes.STRING,
  ph: db.Sequelize.DataTypes.STRING,
});

// Name table title of the new DB
async () => {
  await db.sequelize.sync({ force: true });
  Parametres.create({
    salinite: "2L",
    no3: "1234",
    po4: "1234",
    alcalinite: "2L",
    calcium: "1234",
    magnesium: "1234",
    ph: "1234",
  });
};

// gets all the info from the database et les affiches
exports.getAffichage = async (req, res, next) => {
  const lesParametres = await Parametres.findAll();
  return lesParametres;
};

//activates delete button from the AFFICHAGE page to delet row of DB
exports.delete = async (p_id, req, res, next) => {
  await Parametres.destroy({
    where: {
      id: p_id,
    },
  });
};

exports.postFormulaire = async (
  p_salinite,
  p_no3,
  p_po4,
  p_alcalinite,
  p_calcium,
  p_magnesium,
  p_ph,
  req,
  res,
  next
) => {
  await db.sequelize.sync({ force: false });
  Parametres.create({
    salinite: p_salinite,
    no3: p_no3,
    po4: p_po4,
    alcalinite: p_alcalinite,
    calcium: p_calcium,
    magnesium: p_magnesium,
    ph: p_ph,
    creation: Date.now(),
  });
};
