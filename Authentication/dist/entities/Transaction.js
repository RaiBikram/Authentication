var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { User } from "./userEntities";
export var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "deposit";
    TransactionType["WITHDRAW"] = "withdraw";
})(TransactionType || (TransactionType = {}));
let Transactions = class Transactions extends BaseEntity {
    id;
    type; // ENUM for transaction type (DEPOSIT or WITHDRAW)
    amount; // Transaction amount
    // Many-to-One Relationship: Multiple transactions can belong to one user
    user;
};
__decorate([
    PrimaryGeneratedColumn() // Auto-incremented primary key
    ,
    __metadata("design:type", Number)
], Transactions.prototype, "id", void 0);
__decorate([
    Column({
        type: "enum",
        enum: TransactionType,
    }),
    __metadata("design:type", String)
], Transactions.prototype, "type", void 0);
__decorate([
    Column({
        type: "numeric",
    }),
    __metadata("design:type", Number)
], Transactions.prototype, "amount", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.transactions, {
        onDelete: "CASCADE", // If a user is deleted, all their transactions will also be deleted
    }),
    JoinColumn({
        name: "userId", // This column in the "transactions" table will store the user ID
    }),
    __metadata("design:type", User)
], Transactions.prototype, "user", void 0);
Transactions = __decorate([
    Entity("transactions") // Defining the table name as "transactions"
], Transactions);
export { Transactions };
