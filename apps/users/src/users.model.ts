import { AutoIncrement, Column, DataType, Model, NotNull, PrimaryKey, Table, Unique } from "sequelize-typescript";

@Table
export class User extends Model<User>{
    @AutoIncrement
    @NotNull
    @PrimaryKey
    @Column(DataType.BIGINT)
    id: number;

    @NotNull
    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @NotNull
    @Unique
    @Column
    contactNo: number;
}