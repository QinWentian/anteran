module.exports = function (sequelize, DataTypes) {
    return sequelize.define('mst_users', {
      id: {
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      hash: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      created_by: {
        type: DataTypes.STRING(200),
        allowNull: true
      },
      updated_by: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    }, {
      tableName: 'mst_users',
      timestamps: true,
      paranoid: true,
      underscored: true
    })
  }
  