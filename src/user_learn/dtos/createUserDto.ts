import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  isObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class LocationDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Must be a string' })     //if we have to show this message as error, dissmissDefaultMessage:true,
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ValidateNested() //it take automatcally location's dto but also we have to transfer into type
  @IsObject()
  @Type(() => LocationDto)
  location: LocationDto;

  //if the locaton is array then ,
  //   @ValidateNested({each:true})
  //   @IsArray()
  //   @Type(()=>LocationDto)
  //   location: LocationDto[];
}
