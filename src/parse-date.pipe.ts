import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const date = this.convertTimeStamp(value);
    const { type, data, metatype } = metadata;          //the data is basically a object that get by body.

    if (!date || isNaN(+date)) {
      const errorMsg = data ? `${data} is Invalid ` : `Invalid date.`
      throw new BadRequestException(errorMsg);
    }

    // return date;
    // here now we directly not return the date, instead of i use the metadata, for specific return according to the datatype of the eneterd by user.


    //basically when we not provide the key when we get the data from the form, we can directly access the data from the value object.
    if (!data) {
      value = value['timeStamp'];
    }

    switch (metatype) {
      case String:
        return date.toUTCString();

      case Date:
        return date;

      case Number:
        return date.getTime();

      default:
        return date.toISOString();
    }
  }

  private convertTimeStamp(timeStamp: string | number) {
    timeStamp = +timeStamp;
    const isSecond = !(timeStamp > (Date.now() + 24 * 60 * 60 * 1000) / 1000);

    return isSecond ? new Date(timeStamp * 1000) : new Date(timeStamp);
  }
}
