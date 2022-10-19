import express, {RequestHandler} from "express";
import {validate, ValidationError} from "class-validator";
import HttpStatus from "http-status";
import {plainToClass} from "class-transformer";
import HttpException from "../utils/http-exception";


export function validator(type: any): RequestHandler {
    return (req, res, next) => {
        validate(plainToClass(type, req.body)).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors.map((error: ValidationError | any) => Object.values(error.constraints)).join(', ');
                next(new HttpException(message, HttpStatus.BAD_REQUEST));
            } else {
                next();
            }
        });
    };
}