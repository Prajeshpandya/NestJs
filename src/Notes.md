<!-- # Heading 1
## Heading 2
### Heading 1

- hello
- gyyyyyyy


1. ghjkk
2. hgvbb -->

# Pipes for validation :
---
we can also pass the pipes in the controller level, router level and also can configure as per the single values 

- ParseUUIDPipe: that verify/validate the uuid with verison 3,  get by user we can also made instance and pass custom versions as well

## ParseInnumePipe :

- we can verify the get data as expected as we pass the annum of the ts.
  for that we have to made a instance of the ParseInnumePipe(ennum obj) and that accept req if that perticular data is present in the ennum.

## ParseArrayPipe :

fot that we need to packages : Class-Validator, class-transformer

- we can verify the get data as expected as we pass the value in ParseArrayPipe({items:Number}). here
  for that we have to made a instance of the ParseArrayPipe({items:Number}) and that accept req if that perticular data is present in the options .
  
- also we can specify a seprator with pass in the options  
