var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, } from "typeorm";
import { Transactions } from "./Transaction";
import { Banker } from "./Banker";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
})(UserRole || (UserRole = {}));
let User = class User {
    id;
    name;
    email;
    role;
    password;
    // One-to-Many Relationship: A user can have multiple transactions
    transactions;
    // Many-to-Many Relationship: A user can be linked to multiple bankers
    bankers;
    // Profile picture stored as a string (URL or base64)
    profilePicture;
    // Created timestamp
    createdAt;
    // Updated timestamp
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn("uuid") // Generates a unique UUID for each user
    ,
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({
        type: "varchar",
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({
        type: "varchar",
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Column({
        type: "varchar",
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    OneToMany(() => Transactions, (transaction) => transaction.user),
    __metadata("design:type", Array)
], User.prototype, "transactions", void 0);
__decorate([
    ManyToMany(() => Banker, (banker) => banker.users),
    __metadata("design:type", Array)
], User.prototype, "bankers", void 0);
__decorate([
    Column({
        type: "text",
        nullable: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    CreateDateColumn({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    Entity()
], User);
export { User };
