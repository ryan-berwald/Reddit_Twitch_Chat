import { Injectable } from '@angular/core';

export interface ExampleComments {
  author: string;
  body: string;
}

export interface ExampleClass {
  name: string;
  comments: ExampleComments[]
}

export class ExampleClassBuilder implements ExampleClass {
  name: string ='';
  comments: ExampleComments[] = [];
}

@Injectable({
  providedIn: 'root'
})
export class DummyServiceService {
  makeBuilder(name: string, comment: ExampleComments) {
    const builder: ExampleClass = new ExampleClassBuilder();
    builder.name = name;
    builder.comments = [comment];

    console.log(builder.name, builder.comments);
    return builder;
  }
}
