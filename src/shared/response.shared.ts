/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
  } from '@nestjs/common';
  
  type Data = any | null;
  
  abstract class ResponseObject {
    constructor(
      public success: boolean,
      public message: string,
      public data: Data = null,
    ) {}
  }
  
  export class SuccessResponseObject extends ResponseObject {
    constructor(message: string, data: Data = null) {
      super(true, message, data);
    }
  }
  
  export const ErrorResponseObject = (error: Error, defaultMessage: string) => {
    if (error instanceof ConflictException) {
      throw new ConflictException(error.message || defaultMessage);
    }
    if (error instanceof BadRequestException) {
      throw new BadRequestException(error.message || defaultMessage);
    }
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message || defaultMessage);
    }
    if (error instanceof UnprocessableEntityException) {
      throw new UnprocessableEntityException(error.message || defaultMessage);
    }
    if (error instanceof ForbiddenException) {
      throw new ForbiddenException(error.message || defaultMessage);
    }
    if (error instanceof UnauthorizedException) {
      throw new UnauthorizedException(error.message || defaultMessage);
    }
  
    throw new InternalServerErrorException(error.message || defaultMessage);
  };
  