var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "./userEntities";
let Banker = class Banker {
    id;
    name;
    // Many-to-Many Relationship: A banker can be linked to multiple users, and vice versa
    users; // List of users associated with this banker
};
__decorate([
    PrimaryGeneratedColumn() // Auto-incrementing primary key
    ,
    __metadata("design:type", Number)
], Banker.prototype, "id", void 0);
__decorate([
    Column() // Regular column for the banker's name
    ,
    __metadata("design:type", String)
], Banker.prototype, "name", void 0);
__decorate([
    ManyToMany(() => User),
    JoinTable({
        name: "banks_users", // Name of the join table
        joinColumn: {
            name: "bankerId", // Column in `banks_users` that references `Banker`
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "userId", // Column in `banks_users` that references `User`
            referencedColumnName: "id",
        }
    }),
    __metadata("design:type", Array)
], Banker.prototype, "users", void 0);
Banker = __decorate([
    Entity() // Marks this class as an Entity (a database table)
], Banker);
export { Banker };
