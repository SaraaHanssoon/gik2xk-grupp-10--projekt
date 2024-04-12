module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    len: [2, 100],
                },
            },
            body: {
                type: DataTypes.TEXT,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING(255),
            },
        },
        { underscored: true }
    );

    return Product;
};
