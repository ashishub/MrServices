module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Ashindiapg@22",
    DB: "mrdata",
    dialect: "postgres",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };