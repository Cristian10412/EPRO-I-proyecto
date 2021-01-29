import { Model } from "sequelize";

export default class Configuracion extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        UidNegocio: {
          type: DataTypes.STRING(255),
          allowNull: false,
          primaryKey: true,
          references: {
            model: {
              tableName: "negocios",
              schema: "public"
            },
            key: "uid_negocio"
          },
          field: "uid_negocio"
        },
        HoraInicio: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "hora_inicio"
        },
        HoraFin: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "hora_fin"
        },
        Csc: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "csc"
        },
        Tec: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "tec"
        },
        Itc: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "itc"
        },
        Ccd: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "ccd"
        }
      },
      {
        sequelize,
        tableName: "configuracion",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "configuracion_pkey",
            unique: true,
            fields: [{ name: "uid_negocio" }]
          }
        ]
      }
    );
    return Configuracion;
  }
}
