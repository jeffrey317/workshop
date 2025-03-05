"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.update = exports.add = exports.getAll = exports.getById = void 0;
const db = __importStar(require("../helpers/database"));
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'Select * From articles where ID = ?';
    let value = [id];
    let data = yield db.run_query(query, value);
    return data;
});
exports.getById = getById;
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    let query = 'Select * from articles';
    let data = yield db.run_query(query, null);
    return data;
});
exports.getAll = getAll;
const add = (article) => __awaiter(void 0, void 0, void 0, function* () {
    let keys = Object.keys(article);
    let values = Object.values(article);
    let key = keys.join(',');
    let param = '';
    for (let i = 0; i < values.length; i++) {
        param += '?,';
    }
    param = param.slice(0, -1);
    let query = `Insert into articles (${key}) values (${param})`;
    try {
        yield db.run_insert(query, values);
        return { status: 201 };
    }
    catch (err) {
        return err;
    }
});
exports.add = add;
const update = (id, article) => __awaiter(void 0, void 0, void 0, function* () {
    let keys = Object.keys(article);
    let values = Object.values(article);
    let sql = 'UPDATE articles set ';
    for (let i = 0; i < keys.length; i++) {
        // Update Table_name SET col1 = val1, col2 = val2, ... where condition
        sql += `${keys[i]} = ?,`;
    }
    sql = sql.slice(0, -1);
    sql += ` where id = ${id}`;
    try {
        const status = yield db.run_update(sql, values);
        if (status[1] == 1) // Return 1 if the ID found, else 404
            return { status: 201 };
        else
            return { status: 404 };
    }
    catch (err) {
        return err;
    }
});
exports.update = update;
const deleteArticle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.run_delete('articles', 'id', id);
        return;
    }
    catch (err) {
        return err;
    }
});
exports.deleteArticle = deleteArticle;
